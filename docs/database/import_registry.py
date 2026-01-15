#!/usr/bin/env python3
"""
Скрипт для импорта видов спорта и дисциплин из официального реестра Минспорта РФ
"""

import csv
import argparse
from datetime import date


def parse_registry_csv(csv_file):
    """Парсит CSV файл реестра и извлекает виды спорта и дисциплины"""
    sports = {}
    disciplines = []
    current_sport_num = None
    discipline_counter = 1
    
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        
        for row in reader:
            if len(row) < 17:
                continue
                
            # Пропускаем заголовки
            if row[1] and row[1].strip() == 'Наименование вида спорта':
                continue
            
            # Строка с цифрой в row[0] = вид спорта
            if row[0] and row[0].strip().isdigit():
                sport_num = int(row[0].strip())
                sport_name_ru = row[1].strip()
                sport_full_code = f"{row[2]}-{row[3]}-{row[4]}-{row[5]}-{row[6]}-{row[7]}"
                
                if sport_name_ru not in sports:
                    sports[sport_name_ru] = {
                        'num': sport_num,
                        'name_ru': sport_name_ru,
                        'full_code': sport_full_code
                    }
                current_sport_num = sport_num
            
            # Строка БЕЗ цифры в row[0] = дисциплина
            elif row[9] and row[9].strip() and current_sport_num:
                discipline_name_ru = row[9].strip()
                if row[10] and row[10].strip().isdigit():
                    discipline_full_code = f"{row[10]}-{row[11]}-{row[12]}-{row[13]}-{row[14]}-{row[15]}"
                    
                    disciplines.append({
                        'id': discipline_counter,
                        'sport_num': current_sport_num,
                        'name_ru': discipline_name_ru,
                        'full_code': discipline_full_code
                    })
                    discipline_counter += 1
    
    return sports, disciplines


def generate_sql(sports, disciplines, output_file):
    """Генерирует SQL файл с INSERT-ами для видов спорта и дисциплин"""
    
    COUNTRY_ID_RU = 1
    DATA_SOURCE_ID = 15
    today = date.today().isoformat()
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("-- ================================\n")
        f.write("-- Импорт реестра видов спорта Минспорта РФ\n")
        f.write(f"-- Дата импорта: {today}\n")
        f.write("-- ================================\n\n")
        
        # Виды спорта
        f.write("-- ================================\n")
        f.write(f"-- Виды спорта ({len(sports)} шт.)\n")
        f.write("-- ================================\n")
        f.write("INSERT INTO sports (id, name_ru, is_active) VALUES\n")
        
        sport_rows = []
        for name_ru, sport in sorted(sports.items(), key=lambda x: x[1]['num']):
            name_escaped = name_ru.replace("'", "''")
            sport_rows.append(f"({sport['num']}, '{name_escaped}', TRUE)")
        
        f.write(',\n'.join(sport_rows))
        f.write("\nON CONFLICT (id) DO UPDATE SET\n")
        f.write("  name_ru = EXCLUDED.name_ru,\n")
        f.write("  updated_at = CURRENT_TIMESTAMP;\n\n")
        
        # Виды спорта по странам (РФ)
        f.write("-- ================================\n")
        f.write(f"-- Российский реестр - виды спорта ({len(sports)} шт.)\n")
        f.write("-- ================================\n")
        f.write("-- ВАЖНО: id в country_sports = id вида спорта (для упрощения связи с дисциплинами)\n")
        f.write("INSERT INTO country_sports (id, sport_id, country_id, registry_code, registry_number, ")
        f.write("popularity_score, data_source_id, is_active, updated_at) VALUES\n")
        
        country_sport_rows = []
        for name_ru, sport in sorted(sports.items(), key=lambda x: x[1]['num']):
            popularity = max(10, 100 - sport['num'])
            country_sport_rows.append(
                f"({sport['num']}, {sport['num']}, {COUNTRY_ID_RU}, '{sport['full_code']}', "
                f"{sport['num']}, {popularity}, {DATA_SOURCE_ID}, TRUE, '{today}')"
            )
        
        f.write(',\n'.join(country_sport_rows))
        f.write("\nON CONFLICT (id) DO UPDATE SET\n")
        f.write("  registry_code = EXCLUDED.registry_code,\n")
        f.write("  registry_number = EXCLUDED.registry_number,\n")
        f.write("  popularity_score = EXCLUDED.popularity_score,\n")
        f.write("  updated_at = EXCLUDED.updated_at;\n\n")
        
        # Дисциплины
        f.write("-- ================================\n")
        f.write(f"-- Дисциплины ({len(disciplines)} шт.)\n")
        f.write("-- ================================\n")
        f.write("-- Привязаны к country_sports (вид спорта в РФ)\n")
        f.write("INSERT INTO disciplines (id, country_sport_id, name_ru, is_active) VALUES\n")
        
        disc_rows = []
        for disc in disciplines:
            name_escaped = disc['name_ru'].replace("'", "''")
            # country_sport_id = sport_num (т.к. мы используем одинаковые id)
            disc_rows.append(
                f"({disc['id']}, {disc['sport_num']}, '{name_escaped}', TRUE)"
            )
        
        f.write(',\n'.join(disc_rows))
        f.write("\nON CONFLICT (id) DO UPDATE SET\n")
        f.write("  name_ru = EXCLUDED.name_ru,\n")
        f.write("  updated_at = CURRENT_TIMESTAMP;\n\n")
        
        # Дисциплины по странам (РФ)
        f.write("-- ================================\n")
        f.write(f"-- Российский реестр - дисциплины ({len(disciplines)} шт.)\n")
        f.write("-- ================================\n")
        f.write("INSERT INTO country_disciplines (discipline_id, country_id, registry_code, ")
        f.write("data_source_id, is_active, updated_at) VALUES\n")
        
        country_disc_rows = []
        for disc in disciplines:
            country_disc_rows.append(
                f"({disc['id']}, {COUNTRY_ID_RU}, '{disc['full_code']}', "
                f"{DATA_SOURCE_ID}, TRUE, '{today}')"
            )
        
        f.write(',\n'.join(country_disc_rows))
        f.write("\nON CONFLICT (discipline_id, country_id) DO UPDATE SET\n")
        f.write("  registry_code = EXCLUDED.registry_code,\n")
        f.write("  updated_at = EXCLUDED.updated_at;\n\n")
        
        # Статистика
        f.write("-- ================================\n")
        f.write("-- Статистика\n")
        f.write("-- ================================\n")
        f.write(f"-- Видов спорта: {len(sports)}\n")
        f.write(f"-- Дисциплин: {len(disciplines)}\n")
        f.write(f"-- Среднее дисциплин на спорт: {len(disciplines) / len(sports):.1f}\n")


def main():
    parser = argparse.ArgumentParser(description='Импорт реестра Минспорта РФ')
    parser.add_argument('--input', default='../Reestr_b2e716479e-25-07-2025.csv')
    parser.add_argument('--output', default='05_registry_import.sql')
    args = parser.parse_args()
    
    print(f"📖 Чтение реестра из {args.input}...")
    sports, disciplines = parse_registry_csv(args.input)
    
    print(f"✅ Найдено:")
    print(f"   - Видов спорта: {len(sports)}")
    print(f"   - Дисциплин: {len(disciplines)}")
    
    print(f"📝 Генерация SQL в {args.output}...")
    generate_sql(sports, disciplines, args.output)
    
    print(f"✅ Готово!")


if __name__ == '__main__':
    main()
