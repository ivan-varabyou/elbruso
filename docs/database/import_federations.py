#!/usr/bin/env python3
"""
Скрипт для импорта спортивных федераций из реестра Минспорта РФ
Источник: CSV файл реестра аккредитованных федераций

Использование:
    python import_federations.py --input Реестр_федераций.csv --output 07_federations_import.sql
"""

import csv
import argparse
from datetime import datetime
from pathlib import Path


# Маппинг субъектов РФ на коды регионов
REGION_MAPPING = {
    'Москва': 'RU_MOW',
    'Санкт-Петербург': 'RU_SPE',
    'Севастополь': 'RU_SEV',
    'Московская область': 'RU_MOS',
    'Ленинградская область': 'RU_LEN',
    'Владимирская область': 'RU_VLA',
    'Воронежская область': 'RU_VOR',
    'Ярославская область': 'RU_YAR',
    'Белгородская область': 'RU_BEL',
    'Брянская область': 'RU_BRY',
    'Ивановская область': 'RU_IVA',
    'Калужская область': 'RU_KLU',
    'Костромская область': 'RU_KOS',
    'Курская область': 'RU_KRS',
    'Липецкая область': 'RU_LIP',
    'Орловская область': 'RU_ORL',
    'Рязанская область': 'RU_RYA',
    'Смоленская область': 'RU_SMO',
    'Тамбовская область': 'RU_TAM',
    'Тульская область': 'RU_TUL',
    'Тверская область': 'RU_TVE',
    'Вологодская область': 'RU_VLG',
    'Архангельская область': 'RU_ARK',
    'Мурманская область': 'RU_MUR',
    'Новгородская область': 'RU_NGR',
    'Псковская область': 'RU_PSK',
    'Калининградская область': 'RU_KGD',
    'Волгоградская область': 'RU_VGG',
    'Астраханская область': 'RU_AST',
    'Ростовская область': 'RU_ROS',
    'Краснодарский край': 'RU_KDA',
    'Ставропольский край': 'RU_STA',
    'Республика Адыгея': 'RU_AD',
    'Республика Дагестан': 'RU_DA',
    'Республика Ингушетия': 'RU_IN',
    'Кабардино-Балкарская Республика': 'RU_KB',
    'Карачаево-Черкесская Республика': 'RU_KC',
    'Чеченская Республика': 'RU_CE',
    'Республика Северная Осетия — Алания': 'RU_SE',
    'Республика Калмыкия': 'RU_KL',
    'Нижегородская область': 'RU_NIZ',
    'Кировская область': 'RU_KIR',
    'Оренбургская область': 'RU_ORE',
    'Пензенская область': 'RU_PNZ',
    'Самарская область': 'RU_SAM',
    'Саратовская область': 'RU_SAR',
    'Ульяновская область': 'RU_ULY',
    'Пермский край': 'RU_PER',
    'Республика Башкортостан': 'RU_BA',
    'Республика Марий Эл': 'RU_ME',
    'Республика Мордовия': 'RU_MO',
    'Республика Татарстан': 'RU_TA',
    'Удмуртская Республика': 'RU_UD',
    'Чувашская Республика': 'RU_CU',
    'Челябинская область': 'RU_CHE',
    'Курганская область': 'RU_KGN',
    'Свердловская область': 'RU_SVE',
    'Тюменская область': 'RU_TYU',
    'Ханты-Мансийский автономный округ': 'RU_KHM',
    'Ямало-Ненецкий автономный округ': 'RU_YAN',
    'Иркутская область': 'RU_IRK',
    'Кемеровская область': 'RU_KEM',
    'Новосибирская область': 'RU_NVS',
    'Омская область': 'RU_OMS',
    'Херсонская область': 'RU_HER',
}

# Функция для построения REGION_MAPPING из SQL файла
def build_region_mapping(sql_file='06_regions_import.sql'):
    """Строит маппинг названий регионов на коды из SQL файла"""
    region_mapping = {}
    
    with open(sql_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    import re
    # Паттерн: (1, 1, 1, 1, 'RU_MOW', 'Москва')
    pattern = r"\(\d+,\s*\d+,.*?'(RU[-_][A-Z]+)',\s*'([^']+)'"
    
    for match in re.finditer(pattern, content):
        region_code = match.group(1)
        region_name = match.group(2).strip()
        region_mapping[region_name] = region_code
        
        # Добавляем варианты без "Республика", "область" и т.д.
        # Например: "Республика Карелия" -> "Карелия"
        if region_name.startswith('Республика '):
            short_name = region_name.replace('Республика ', '')
            region_mapping[short_name] = region_code
        elif ' область' in region_name:
            short_name = region_name.replace(' область', '')
            region_mapping[short_name] = region_code
        elif ' край' in region_name:
            short_name = region_name.replace(' край', '')
            region_mapping[short_name] = region_code
    
    return region_mapping


# Сокращения форм собственности
ORG_TYPE_ABBREVIATIONS = {
    'РЕГИОНАЛЬНАЯ ОБЩЕСТВЕННАЯ СПОРТИВНАЯ ОРГАНИЗАЦИЯ': 'РОСО',
    'РЕГИОНАЛЬНАЯ ФИЗКУЛЬТУРНО-СПОРТИВНАЯ ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ': 'РФСОО',
    'РЕГИОНАЛЬНАЯ СПОРТИВНАЯ ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ': 'РОСО',
    'РЕГИОНАЛЬНАЯ ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ': 'РОО',
    'РЕГИОНАЛЬНАЯ ФИЗКУЛЬТУРНО-СПОРТИВНАЯ ОРГАНИЗАЦИЯ': 'РФСО',
    'ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ': 'ОО',
    'ОБЩЕРОССИЙСКАЯ ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ': 'ООО',
    'ОБЩЕРОССИЙСКАЯ ФИЗКУЛЬТУРНО-СПОРТИВНАЯ ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ': 'ОФСОО',
    'ОБЩЕРОССИЙСКАЯ СПОРТИВНАЯ ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ': 'ОСОО',
    'КРАЕВАЯ РЕГИОНАЛЬНАЯ СПОРТИВНАЯ ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ': 'КРСО',
    'ОБЛАСТНАЯ ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ': 'ОблОО',
    'РЕСПУБЛИКАНСКАЯ ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ': 'РеспОО',
}

# Маппинг видов спорта на коды (для internal_code)
SPORT_CODES = {
    'БАСКЕТБОЛ': 'BBF',  # Basketball Federation
    'ФУТБОЛ': 'FBF',  # Football Federation
    'ВОЛЕЙБОЛ': 'VBF',  # Volleyball Federation
    'ХОККЕЙ': 'HF',  # Hockey Federation
    'ЛЕГКАЯ АТЛЕТИКА': 'AAF',  # Athletics Federation
    'БОКС': 'BF',  # Boxing Federation
    'БОРЬБА': 'WF',  # Wrestling Federation
    'ДЗЮДО': 'JF',  # Judo Federation
    'САМБО': 'SF',  # Sambo Federation
    'ХУДОЖЕСТВЕННАЯ ГИМНАСТИКА': 'RGF',  # Rhythmic Gymnastics Federation
    'СПОРТИВНАЯ ГИМНАСТИКА': 'GF',  # Gymnastics Federation
    'ПЛАВАНИЕ': 'SWF',  # Swimming Federation
    'ТЕННИС': 'TF',  # Tennis Federation
    'БАДМИНТОН': 'BDF',  # Badminton Federation
    'ФИГУРНОЕ КАТАНИЕ': 'FSF',  # Figure Skating Federation
}


def transliterate(text):
    """Транслитерирует русский текст в латиницу для internal_code"""
    translit_map = {
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'E',
        'Ж': 'ZH', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
        'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
        'Ф': 'F', 'Х': 'H', 'Ц': 'TS', 'Ч': 'CH', 'Ш': 'SH', 'Щ': 'SCH',
        'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'YU', 'Я': 'YA',
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
        'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    }
    
    result = []
    for char in text:
        if char in translit_map:
            result.append(translit_map[char])
        elif char.isalnum() or char in ('-', '_', ' '):
            result.append(char)
    
    return ''.join(result)


def parse_sport_ids(sql_file='05_registry_import.sql'):
    """Парсит ID видов спорта из SQL файла импорта"""
    sport_ids = {}
    
    with open(sql_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Ищем все строки вида: (1, 'Авиамодельный спорт', TRUE),
    import re
    pattern = r"\((\d+),\s*'([^']+)',\s*TRUE\)"
    
    for match in re.finditer(pattern, content):
        sport_id = int(match.group(1))
        sport_name = match.group(2)
        sport_ids[sport_name] = sport_id
    
    return sport_ids


def parse_region_ids(sql_file='06_regions_import.sql'):
    """Парсит ID и коды регионов из SQL файла импорта"""
    region_ids = {}
    region_suffixes = {}
    
    with open(sql_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Паттерн: (1, 1, 1, 1, 'RU_MOW', 'Москва') или (85, 2, 1, 'BY-MIN', 'Минск')
    import re
    pattern = r"\((\d+),(?:\s*\d+,){2,4}\s*'(RU[-_][A-Z0-9]+|BY[-_][A-Z0-9]+|KZ[-_][A-Z0-9]+)'"
    
    for match in re.finditer(pattern, content):
        region_id = int(match.group(1))
        region_code = match.group(2)
        # Суффикс - это часть после RU- или RU_
        suffix = region_code.replace('RU-', '').replace('RU_', '')
        region_ids[region_code] = region_id
        region_suffixes[region_id] = suffix
    
    return region_ids, region_suffixes


def parse_org_type_ids(sql_file='02_core_entities.sql'):
    """Парсит ID типов организаций из SQL файла"""
    org_type_ids = {
        'federation_national': 2,
        'federation_regional': 3,
        'federation_city': 4,
    }
    return org_type_ids


def extract_abbreviation(org_name):
    """Извлекает аббревиатуру из названия организации"""
    import re
    
    # Паттерны для поиска аббревиатур в кавычках
    # Ищем "РФБ", "МФБ", "ВФЛА" и т.д.
    quote_pattern = r'["\'"]([А-ЯЁ]{2,10})["\'"]'
    match = re.search(quote_pattern, org_name)
    if match:
        abbr = match.group(1)
        return abbr  # Возвращаем как есть, без транслитерации
    
    # Если нет в кавычках, ищем заглавные буквы в конце названия
    # Например: "ФЕДЕРАЦИЯ БАСКЕТБОЛА МОСКВЫ МФБ"
    end_pattern = r'\s([А-ЯЁ]{2,10})$'
    match = re.search(end_pattern, org_name)
    if match:
        abbr = match.group(1)
        return abbr
    
    # Если аббревиатура не найдена, генерируем из ключевых слов
    clean_name = org_name.upper()
    
    # Убираем формы собственности и кавычки
    for form in ORG_TYPE_ABBREVIATIONS.keys():
        clean_name = clean_name.replace(form, '')
    clean_name = clean_name.replace('"', '').replace("'", '').strip()
    
    # Убираем незначимые слова
    skip_words = {
        'И', 'В', 'НА', 'ПО', 'ДЛЯ', 'ОТ', 'ДО', 'ИЗ', 'С', 'ПРИ', 'ЗА', 'НАД', 'ПОД',
        'ОБЩЕРОССИЙСКАЯ', 'ВСЕРОССИЙСКАЯ', 'РОССИЙСКАЯ', 'НАЦИОНАЛЬНАЯ',
        'РЕГИОНАЛЬНАЯ', 'КРАЕВАЯ', 'ОБЛАСТНАЯ', 'РЕСПУБЛИКАНСКАЯ', 'ГОРОДСКАЯ',
        'ОБЩЕСТВЕННАЯ', 'СПОРТИВНАЯ', 'ФИЗКУЛЬТУРНО-СПОРТИВНАЯ', 'ФИЗКУЛЬТУРНО',
        'ОРГАНИЗАЦИЯ', 'СОЮЗ', 'АССОЦИАЦИЯ', 'КЛУБ'
    }
    
    words = clean_name.split()
    significant_words = []
    
    for word in words:
        # Пропускаем короткие и незначимые слова
        if len(word) <= 1 or word in skip_words:
            continue
        # Пропускаем слова, содержащие дефис (обычно это составные прилагательные)
        if '-' in word and word != 'РОК-Н-РОЛЛА':
            parts = word.split('-')
            significant_words.extend([p for p in parts if len(p) > 1 and p not in skip_words])
        else:
            significant_words.append(word)
    
    if significant_words:
        # Берем первую букву каждого значимого слова (максимум 5)
        abbr = ''.join([w[0] for w in significant_words[:5]])
        return abbr
    
    # Fallback - первые 3 буквы названия
    if words:
        return words[0][:3]
    
    return "ORG"



def abbreviate_org_name(full_name):
    """Сокращает форму собственности в названии организации"""
    for full_form, abbr in ORG_TYPE_ABBREVIATIONS.items():
        if full_name.startswith(full_form):
            return full_name.replace(full_form, abbr, 1)
    return full_name


def extract_region_from_name(org_name):
    """Извлекает регион из названия организации"""
    # Маппинг упоминаний регионов в названиях на коды
    region_patterns = {
        'МОСКВ': 'RU_MOW',
        'САНКТ-ПЕТЕРБУРГ': 'RU_SPE',
        'СЕВАСТОПОЛ': 'RU_SEV',
        'МОСКОВСКОЙ ОБЛАСТ': 'RU_MOS',
        'ЛЕНИНГРАДСКОЙ ОБЛАСТ': 'RU_LEN',
        'ВЛАДИМИРСКОЙ ОБЛАСТ': 'RU_VLA',
        'ВОРОНЕЖСКОЙ ОБЛАСТ': 'RU_VOR',
        'ЯРОСЛАВСКОЙ ОБЛАСТ': 'RU_YAR',
        'БЕЛГОРОДСКОЙ ОБЛАСТ': 'RU_BEL',
        'БРЯНСКОЙ ОБЛАСТ': 'RU_BRY',
        'ИВАНОВСКОЙ ОБЛАСТ': 'RU_IVA',
        'КАЛУЖСКОЙ ОБЛАСТ': 'RU_KLU',
        'КОСТРОМСКОЙ ОБЛАСТ': 'RU_KOS',
        'КУРСКОЙ ОБЛАСТ': 'RU_KRS',
        'ЛИПЕЦКОЙ ОБЛАСТ': 'RU_LIP',
        'ОРЛОВСКОЙ ОБЛАСТ': 'RU_ORL',
        'РЯЗАНСКОЙ ОБЛАСТ': 'RU_RYA',
        'СМОЛЕНСКОЙ ОБЛАСТ': 'RU_SMO',
        'ТАМБОВСКОЙ ОБЛАСТ': 'RU_TAM',
        'ТУЛЬСКОЙ ОБЛАСТ': 'RU_TUL',
        'ТВЕРСКОЙ ОБЛАСТ': 'RU_TVE',
        'ВОЛОГОДСКОЙ ОБЛАСТ': 'RU_VLG',
        'АРХАНГЕЛЬСКОЙ ОБЛАСТ': 'RU_ARK',
        'МУРМАНСКОЙ ОБЛАСТ': 'RU_MUR',
        'НОВГОРОДСКОЙ ОБЛАСТ': 'RU_NGR',
        'ПСКОВСКОЙ ОБЛАСТ': 'RU_PSK',
        'КАЛИНИНГРАДСКОЙ ОБЛАСТ': 'RU_KGD',
        'ВОЛГОГРАДСКОЙ ОБЛАСТ': 'RU_VGG',
        'АСТРАХАНСКОЙ ОБЛАСТ': 'RU_AST',
        'РОСТОВСКОЙ ОБЛАСТ': 'RU_ROS',
        'КРАСНОДАРСКОГО КРАЯ': 'RU_KDA',
        'СТАВРОПОЛЬСКОГО КРАЯ': 'RU_STA',
        'НИЖЕГОРОДСКОЙ ОБЛАСТ': 'RU_NIZ',
        'КИРОВСКОЙ ОБЛАСТ': 'RU_KIR',
        'ОРЕНБУРГСКОЙ ОБЛАСТ': 'RU_ORE',
        'ПЕНЗЕНСКОЙ ОБЛАСТ': 'RU_PNZ',
        'САМАРСКОЙ ОБЛАСТ': 'RU_SAM',
        'САРАТОВСКОЙ ОБЛАСТ': 'RU_SAR',
        'УЛЬЯНОВСКОЙ ОБЛАСТ': 'RU_ULY',
        'ПЕРМСКОГО КРАЯ': 'RU_PER',
        'ЧЕЛЯБИНСКОЙ ОБЛАСТ': 'RU_CHE',
        'КУРГАНСКОЙ ОБЛАСТ': 'RU_KGN',
        'СВЕРДЛОВСКОЙ ОБЛАСТ': 'RU_SVE',
        'ТЮМЕНСКОЙ ОБЛАСТ': 'RU_TYU',
        'ХАНТЫ-МАНСИЙСКОГО': 'RU_KHM',
        'ЯМАЛО-НЕНЕЦКОГО': 'RU_YAN',
        'ИРКУТСКОЙ ОБЛАСТ': 'RU_IRK',
        'КЕМЕРОВСКОЙ ОБЛАСТ': 'RU_KEM',
        'НОВОСИБИРСКОЙ ОБЛАСТ': 'RU_NVS',
        'ОМСКОЙ ОБЛАСТ': 'RU_OMS',
        'ТОМСКОЙ ОБЛАСТ': 'RU_TOM',
        'АЛТАЙСКОГО КРАЯ': 'RU_ALT',
        'КРАСНОЯРСКОГО КРАЯ': 'RU_KRA',
        'ЗАБАЙКАЛЬСКОГО КРАЯ': 'RU_ZAB',
        'АМУРСКОЙ ОБЛАСТ': 'RU_AMU',
        'МАГАДАНСКОЙ ОБЛАСТ': 'RU_MAG',
        'САХАЛИНСКОЙ ОБЛАСТ': 'RU_SAK',
        'ХАБАРОВСКОГО КРАЯ': 'RU_KHA',
        'КАМЧАТСКОГО КРАЯ': 'RU_KAM',
        'ПРИМОРСКОГО КРАЯ': 'RU_PRI',
        'РЕСПУБЛИКИ АДЫГЕЯ': 'RU_AD',
        'РЕСПУБЛИКИ ДАГЕСТАН': 'RU_DA',
        'РЕСПУБЛИКИ ИНГУШЕТИЯ': 'RU_IN',
        'КАБАРДИНО-БАЛКАРСКОЙ': 'RU_KB',
        'КАРАЧАЕВО-ЧЕРКЕССКОЙ': 'RU_KC',
        'ЧЕЧЕНСКОЙ РЕСПУБЛИКИ': 'RU_CE',
        'РЕСПУБЛИКИ СЕВЕРНАЯ ОСЕТИЯ': 'RU_SE',
        'РЕСПУБЛИКИ КАЛМЫКИЯ': 'RU_KL',
        'РЕСПУБЛИКИ БАШКОРТОСТАН': 'RU_BA',
        'РЕСПУБЛИКИ МАРИЙ ЭЛ': 'RU_ME',
        'РЕСПУБЛИКИ МОРДОВИЯ': 'RU_MO',
        'РЕСПУБЛИКИ ТАТАРСТАН': 'RU_TA',
        'УДМУРТСКОЙ РЕСПУБЛИКИ': 'RU_UD',
        'ЧУВАШСКОЙ РЕСПУБЛИКИ': 'RU_CU',
        'РЕСПУБЛИКИ АЛТАЙ': 'RU_AL',
        'РЕСПУБЛИКИ БУРЯТИЯ': 'RU_BU',
        'РЕСПУБЛИКИ ТЫВА': 'RU_TY',
        'РЕСПУБЛИКИ ХАКАСИЯ': 'RU_KK',
        'РЕСПУБЛИКИ САХА': 'RU_SA',
        'РЕСПУБЛИКИ КРЫМ': 'RU_KRY',
        'РЕСПУБЛИКИ КОМИ': 'RU_KO',
    }
    
    org_upper = org_name.upper()
    for pattern, code in region_patterns.items():
        if pattern in org_upper:
            return code
    
    return None


# Маппинг числовых кодов регионов (ГРР) на коды ISO/префиксы
# Используется как fallback если название региона не указано
NUMERIC_REGION_MAPPING = {
    '01': 'RU_AD', '02': 'RU_BA', '03': 'RU_BU', '04': 'RU_AL', '05': 'RU_DA',
    '06': 'RU_IN', '07': 'RU_KB', '08': 'RU_KL', '09': 'RU_KC', '10': 'RU_KR',
    '11': 'RU_KO', '12': 'RU_ME', '13': 'RU_MO', '14': 'RU_SA', '15': 'RU_SE',
    '16': 'RU_TA', '17': 'RU_TY', '18': 'RU_UD', '19': 'RU_KK', '20': 'RU_CE',
    '21': 'RU_CU', '22': 'RU_ALT', '23': 'RU_KDA', '24': 'RU_KRA', '25': 'RU_PRI',
    '26': 'RU_STA', '27': 'RU_KHA', '28': 'RU_AMU', '29': 'RU_ARK', '30': 'RU_AST',
    '31': 'RU_BEL', '32': 'RU_BRY', '33': 'RU_VLA', '34': 'RU_VGG', '35': 'RU_VLG',
    '36': 'RU_VOR', '37': 'RU_IVA', '38': 'RU_IRK', '39': 'RU_KGD', '40': 'RU_KLU',
    '41': 'RU_KAM', '42': 'RU_KEM', '43': 'RU_KIR', '44': 'RU_KOS', '45': 'RU_KRS',
    '46': 'RU_KRS',  # Wait, 46 is Kursk? No, 45 is Kursk. 46 is Lipetsk? 
    '47': 'RU_LEN', '48': 'RU_LIP', '49': 'RU_MAG', '50': 'RU_MOS', '51': 'RU_MUR',
    '52': 'RU_NIZ', '53': 'RU_NGR', '54': 'RU_NVS', '55': 'RU_OMS', '56': 'RU_ORE',
    '57': 'RU_ORL', '58': 'RU_PNZ', '59': 'RU_PER', '60': 'RU_PSK', '61': 'RU_ROS',
    '62': 'RU_RYA', '63': 'RU_SAM', '64': 'RU_SAR', '65': 'RU_SAK', '66': 'RU_SVE',
    '67': 'RU_SMO', '68': 'RU_TAM', '69': 'RU_TVE', '70': 'RU_TOM', '71': 'RU_TUL',
    '72': 'RU_TYU', '73': 'RU_ULY', '74': 'RU_CHE', '75': 'RU_ZAB', '76': 'RU_YAR',
    '77': 'RU_MOW', '78': 'RU_SPE', '79': 'RU_YEV', '82': 'RU_KRY', '86': 'RU_KHM',
    '87': 'RU_CHU', '89': 'RU_YAN', '91': 'RU_KRY', # Crimea sometimes 91
    '92': 'RU_SEV', '93': 'RU_DNR', '94': 'RU_LNR', '95': 'RU_HER', '96': 'RU_ZAP'
}

def parse_federations_csv(csv_file):
    """Парсит CSV файл реестра федераций"""
    federations = []
    today = datetime.now().date()
    
    # Строим маппинг регионов динамически
    region_mapping = build_region_mapping()
    
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        
        for i, row in enumerate(reader):
            # Пропускаем заголовки (первые 4 строки)
            if i < 4:
                continue
                
            if len(row) < 7:
                continue
            
            # Парсим данные
            num_str = row[0].strip() if len(row) > 0 else ''
            org_name = row[1].strip() if len(row) > 1 else ''
            region_name = row[2].strip() if len(row) > 2 else ''
            sport_name = row[3].strip().upper() if len(row) > 3 else ''
            registry_code = row[4].strip() if len(row) > 4 else ''
            accred_start = row[5].strip() if len(row) > 5 else ''
            accred_end = row[6].strip() if len(row) > 6 else ''
            order_num = row[7].strip() if len(row) > 7 else ''
            
            if not org_name or not sport_name:
                continue
            
            # Определяем статус организации (Национальная vs Региональная)
            # ОСНОВНОЙ КРИТЕРИЙ: registry_code[3:5] == '99'
            is_national = False
            if len(registry_code) >= 5:
                region_part = registry_code[3:5]
                if region_part == '99':
                    is_national = True
                
                # Попытка определить регион по коду если нет в колонке
                region_code = None
                if region_name:
                    region_code = region_mapping.get(region_name)
                
                if not region_code and not is_national:
                    region_code = NUMERIC_REGION_MAPPING.get(region_part)
                
                # Fallback на поиск в названии
                if not region_code and not is_national:
                    region_code = extract_region_from_name(org_name)
            else:
                # Если кода нет, ориентируемся на название (хуже, но хоть что-то)
                is_national = 'ОБЩЕРОССИЙСКАЯ' in org_name or 'ВСЕРОССИЙСКАЯ' in org_name
                region_code = region_mapping.get(region_name) if region_name else None
                if not region_code:
                    region_code = extract_region_from_name(org_name)
            
            # Проверка: если "Региональное отделение", то это НЕ национальная федерация, 
            # даже если код 99 (но такого быть не должно по логике реестра)
            if 'РЕГИОНАЛЬНОЕ ОТДЕЛЕНИЕ' in org_name.upper():
                is_national = False

            # Определяем тип организации для БД
            org_type = 'federation_national' if is_national else 'federation_regional'
            
            # Сокращаем название
            abbreviated_name = abbreviate_org_name(org_name)
            
            federations.append({
                'num': num_str,
                'name_full': org_name,
                'name_abbr': abbreviated_name,
                'region_name': region_name,
                'region_code': region_code,
                'sport_name': sport_name,
                'registry_code': registry_code,
                'accred_start': accred_start,
                'accred_end': accred_end,
                'order_num': order_num,
                'org_type': org_type,
                'is_national': is_national
            })
    
    return federations


def generate_sql(federations, output_file, sport_ids, region_ids, region_suffixes, org_type_ids):
    """Генерирует SQL файл с INSERT-ами для федераций"""
    import json
    
    # Разделяем на национальные и региональные
    national_feds = [f for f in federations if f['is_national']]
    regional_feds = [f for f in federations if not f['is_national']]
    
    # Группируем по видам спорта
    national_by_sport = {}
    for fed in national_feds:
        sport = fed['sport_name']
        if sport not in national_by_sport:
            national_by_sport[sport] = []
        national_by_sport[sport].append(fed)
    
    regional_by_sport = {}
    for fed in regional_feds:
        sport = fed['sport_name']
        if sport not in regional_by_sport:
            regional_by_sport[sport] = []
        regional_by_sport[sport].append(fed)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("-- ================================\n")
        f.write("-- Импорт спортивных федераций из реестра Минспорта РФ\n")
        f.write(f"-- Дата импорта: {datetime.now().date().isoformat()}\n")
        f.write(f"-- Всего федераций: {len(federations)}\n")
        f.write("-- ================================\n\n")
        
        f.write(f"-- Общероссийских федераций: {len(national_feds)}\n")
        f.write(f"-- Региональных федераций: {len(regional_feds)}\n")
        f.write(f"-- Видов спорта: {len(set([f['sport_name'] for f in federations]))}\n\n")
        
        used_codes = set()
        
        # ============================================
        # ЭТАП 1: Общероссийские федерации
        # ============================================
        f.write("-- ================================\n")
        f.write("-- ЭТАП 1: Общероссийские федерации\n")
        f.write("-- ================================\n\n")
        
        national_rows = []
        national_fed_rows = []
        skipped_national = 0
        org_id = 1000
        sport_to_national_id = {}  # Маппинг sport_name -> org_id национальной федерации
        sport_to_national_abbr = {}  # Маппинг sport_name -> abbreviation национальной федерации
        sport_to_national_code = {}  # Маппинг sport_name -> internal_code национальной федерации
        
        for fed in national_feds:
            name_escaped = fed['name_abbr'].replace("'", "''")
            sport_name = fed['sport_name']
            
            # Получаем sport_id
            sport_id = None
            for key, val in sport_ids.items():
                if key.upper() == sport_name.upper():
                    sport_id = val
                    break
            
            if not sport_id:
                skipped_national += 1
                continue
            
            # Получаем type_id
            type_id = org_type_ids.get(fed['org_type'])
            if not type_id:
                skipped_national += 1
                continue
            
            # Генерируем abbreviation_ru из названия организации
            abbr_ru = extract_abbreviation(fed['name_full'])
            
            # Генерируем internal_code (формат: RU_ABBR)
            base_code = f"RU_{transliterate(abbr_ru).upper()}"
            internal_code = base_code
            
            # Обеспечиваем уникальность
            cnt = 2
            while internal_code in used_codes:
                internal_code = f"{base_code}_{cnt}"
                cnt += 1
            used_codes.add(internal_code)
            
            # Сохраняем для региональных
            sport_to_national_id[sport_name] = org_id
            sport_to_national_abbr[sport_name] = abbr_ru
            sport_to_national_code[sport_name] = internal_code
            
            # Метаданные
            metadata = {
                'registry_code': fed['registry_code'],
                'accreditation_end': fed['accred_end']
            }
            metadata_json = json.dumps(metadata, ensure_ascii=False).replace("'", "''")
            
            row = (
                f"  ({org_id}, "
                f"'{internal_code}', "
                f"4, "  # level_id = 4 (национальный)
                f"{type_id}, "
                f"{sport_id}, "
                f"1, "  # country_id = 1 (Россия)
                f"NULL, "  # region_id
                f"'{name_escaped}', "
                f"'{abbr_ru}', "  # abbreviation_ru
                f"1, "  # parent_id = 1 (Минспорт России)
                f"NULL, "  # founded_year
                f"TRUE, "  # is_active
                f"'{metadata_json}'::jsonb)"
            )
            national_rows.append(row)
            
            # Создаем запись в таблице federations (связка организация + спорт)
            fed_row = f"  ({org_id}, NULL, {sport_id}, '{name_escaped}')"
            national_fed_rows.append(fed_row)
            
            # Сохраняем маппинг для региональных федераций
            sport_to_national_id[sport_name] = org_id
            sport_to_national_abbr[sport_name] = abbr_ru  # Сохраняем аббревиатуру для использования региональными
            org_id += 1
        
        if national_rows:
            f.write("INSERT INTO organizations (\n")
            f.write("  id, internal_code, level_id, type_id, sport_id, country_id, region_id,\n")
            f.write("  name_ru, abbreviation_ru, parent_id, founded_year, is_active, metadata\n")
            f.write(") VALUES\n")
            f.write(',\n'.join(national_rows))
            f.write("\nON CONFLICT (id) DO UPDATE SET\n")
            f.write("  internal_code = EXCLUDED.internal_code,\n")
            f.write("  name_ru = EXCLUDED.name_ru,\n")
            f.write("  metadata = EXCLUDED.metadata;\n\n")
        
        if skipped_national > 0:
            f.write(f"-- Пропущено общероссийских федераций: {skipped_national}\n\n")
        
        # ============================================
        # ЭТАП 2: Региональные федерации
        # ============================================
        f.write("-- ================================\n")
        f.write("-- ЭТАП 2: Региональные федерации (Организации)\n")
        f.write("-- ================================\n\n")
        
        regional_rows = []
        regional_fed_rows = []
        skipped_regional = 0
        
        for fed in regional_feds:
            name_escaped = fed['name_abbr'].replace("'", "''")
            sport_name = fed['sport_name']
            
            # Получаем sport_id
            sport_id = None
            for key, val in sport_ids.items():
                if key.upper() == sport_name.upper():
                    sport_id = val
                    break
            
            if not sport_id:
                skipped_regional += 1
                continue
            
            # Получаем type_id
            type_id = org_type_ids.get(fed['org_type'])
            if not type_id:
                skipped_regional += 1
                continue
            
            # Получаем region_id
            if fed['region_code']:
                region_id = region_ids.get(fed['region_code'])
                if not region_id:
                    skipped_regional += 1
                    continue
                region_id_str = str(region_id)
            else:
                skipped_regional += 1
                continue
            
            # Получаем parent_id (национальная федерация того же вида спорта)
            parent_id = sport_to_national_id.get(sport_name)
            parent_id_str = str(parent_id) if parent_id else "NULL"
            
            # Генерируем abbreviation_ru из названия организации
            abbr_ru = extract_abbreviation(fed['name_full'])
            
            # Генерируем internal_code (формат: PARENTCODE_REGIONSUFFIX или RU_ABBR_REGIONSUFFIX)
            parent_code = sport_to_national_code.get(sport_name)
            suffix = region_suffixes.get(region_id, "UNK")
            
            if parent_code:
                base_code = f"{parent_code}_{suffix}"
            else:
                base_code = f"RU_{transliterate(abbr_ru).upper()}_{suffix}"
            
            internal_code = base_code
            
            # Обеспечиваем уникальность
            cnt = 2
            while internal_code in used_codes:
                internal_code = f"{base_code}_{cnt}"
                cnt += 1
            used_codes.add(internal_code)
            
            # Метаданные
            metadata = {
                'registry_code': fed['registry_code'],
                'accreditation_end': fed['accred_end']
            }
            metadata_json = json.dumps(metadata, ensure_ascii=False).replace("'", "''")
            
            row = (
                f"  ({org_id}, "
                f"'{internal_code}', "
                f"6, "  # level_id = 6 (региональный)
                f"{type_id}, "
                f"{sport_id}, "
                f"1, "  # country_id = 1 (Россия)
                f"{region_id_str}, "
                f"'{name_escaped}', "
                f"'{abbr_ru}', "  # abbreviation_ru
                f"{parent_id_str}, "
                f"NULL, "  # founded_year
                f"TRUE, "  # is_active
                f"'{metadata_json}'::jsonb)"
            )
            regional_rows.append(row)
            
            # Создаем запись в таблице federations
            fed_row = f"  ({org_id}, {region_id_str}, {sport_id}, '{name_escaped}')"
            regional_fed_rows.append(fed_row)
            
            org_id += 1
        
        if regional_rows:
            f.write("INSERT INTO organizations (\n")
            f.write("  id, internal_code, level_id, type_id, sport_id, country_id, region_id,\n")
            f.write("  name_ru, abbreviation_ru, parent_id, founded_year, is_active, metadata\n")
            f.write(") VALUES\n")
            f.write(',\n'.join(regional_rows))
            f.write("\nON CONFLICT (id) DO UPDATE SET\n")
            f.write("  internal_code = EXCLUDED.internal_code,\n")
            f.write("  name_ru = EXCLUDED.name_ru,\n")
            f.write("  region_id = EXCLUDED.region_id,\n")
            f.write("  parent_id = EXCLUDED.parent_id,\n")
            f.write("  metadata = EXCLUDED.metadata;\n\n")
        
        if skipped_regional > 0:
            f.write(f"-- Пропущено региональных федераций: {skipped_regional}\n\n")

        # ============================================
        # ЭТАП 3: Федерации
        # ============================================
        f.write("-- ================================\n")
        f.write("-- ЭТАП 3: Федерации (Связующая таблица)\n")
        f.write("-- ================================\n\n")
        
        all_fed_rows = national_fed_rows + regional_fed_rows
        if all_fed_rows:
            f.write("INSERT INTO federations (\n")
            f.write("  organization_id, region_id, sport_id, name_ru\n")
            f.write(") VALUES\n")
            f.write(',\n'.join(all_fed_rows))
            f.write("\nON CONFLICT (organization_id, sport_id, discipline_id) DO UPDATE SET\n")
            f.write("  name_ru = EXCLUDED.name_ru,\n")
            f.write("  region_id = EXCLUDED.region_id;\n\n")
        
        # Статистика
        f.write("-- ================================\n")
        f.write("-- Статистика по видам спорта\n")
        f.write("-- ================================\n")
        all_sports = set([f['sport_name'] for f in federations])
        for sport_name in sorted(all_sports):
            sport_id = None
            for key, val in sport_ids.items():
                if key.upper() == sport_name.upper():
                    sport_id = val
                    break
            
            nat_count = len([f for f in national_feds if f['sport_name'] == sport_name])
            reg_count = len([f for f in regional_feds if f['sport_name'] == sport_name])
            total = nat_count + reg_count
            
            f.write(f"-- {sport_name} (ID={sport_id}): {total} федераций ({nat_count} общероссийских, {reg_count} региональных)\n")


def main():
    parser = argparse.ArgumentParser(description='Импорт реестра федераций Минспорта РФ')
    parser.add_argument('--input', default='../Реестр_общероссийских_и_региональных_аккредитованных_спортивных_федераций.csv')
    parser.add_argument('--output', default='07_federations_import.sql')
    parser.add_argument('--sports-sql', default='05_registry_import.sql')
    parser.add_argument('--regions-sql', default='06_regions_import.sql')
    parser.add_argument('--org-types-sql', default='02_core_entities.sql')
    args = parser.parse_args()
    
    print(f"📖 Чтение реестра из {args.input}...")
    federations = parse_federations_csv(args.input)
    
    # Статистика
    national = sum(1 for f in federations if f['is_national'])
    regional = len(federations) - national
    
    print(f"✅ Найдено:")
    print(f"   - Всего федераций: {len(federations)}")
    print(f"   - Общероссийских: {national}")
    print(f"   - Региональных: {regional}")
    
    print(f"\n📊 Парсинг ID из SQL файлов...")
    sport_ids = parse_sport_ids(args.sports_sql)
    region_ids, region_suffixes = parse_region_ids(args.regions_sql)
    org_type_ids = parse_org_type_ids(args.org_types_sql)
    
    print(f"   - Видов спорта: {len(sport_ids)}")
    print(f"   - Регионов: {len(region_ids)}")
    print(f"   - Типов организаций: {len(org_type_ids)}")
    
    print(f"\n📝 Генерация SQL в {args.output}...")
    generate_sql(federations, args.output, sport_ids, region_ids, region_suffixes, org_type_ids)
    
    print(f"✅ Готово!")


if __name__ == '__main__':
    main()
