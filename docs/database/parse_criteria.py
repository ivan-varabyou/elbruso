import csv
import re

def transliterate(text):
    # Simple transliteration for codes
    trans = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
        'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
        'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    }
    res = ""
    for char in text.lower():
        if char in trans:
            res += trans[char]
        elif char.isalnum():
            res += char
        else:
            res += "_"
    return res.upper()

input_file = "/home/ivan/Projects/src/sba/docs/Копия Рейтинг регионов 2022-2023.csv"
output_file = "/home/ivan/Projects/src/sba/docs/database/08_basketball_indicators_full.sql"

# Mapping to groups from 03_indicators_system.sql
groups = {
    "Региональная федерация": 1,
    "Общие критерии для региона": 2,
    "Спортивные объекты": 3,
    "Сборные команды": 4,
    "Профессиональный баскетбол": 5,
    "Резерв": 6,
    "Массовый баскетбол": 7,
    "Мероприятия": 8,
    "Судьи": 9,
    "Тренеры": 10,
    "Маркетинг": 11, # Generic Marketing Group
    "Прочее": 12
}

# Mapping subgroups
subgroups = {
    "Маркетинг федерации": 22,
    "Маркетинг профессиональных клубов": 23,
    "Участие команд в профессиональных лигах мужчины": 111,
    "Участие команд в профессиональных лигах женщины": 112,
    "Призовые места в профессиональных лигах мужчины": 113,
    "Призовые места в профессиональных лигах женщины": 114,
    "Первенство России количество команд мужчины": 120,
    "Первенство России количество команд женщины": 121,
    "Призовые места в Первенстве России мужчины": 122,
    "Призовые места в Первенстве России женщины": 123,
    "Школьный баскетбол": 130,
    "Студенческий баскетбол": 131,
    "Любительский баскетбол": 132,
    "Ветераны": 133
}

rfb_id = 1006
sql_inserts = []
current_group_id = 1
current_subgroup_id = None

with open(input_file, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    next(reader) # skip header
    
    for row in reader:
        if not any(row): continue
        
        # Check if it's a group header
        col1 = row[1].strip()
        name = row[2].strip()
        
        if not col1 and name in groups:
            current_group_id = groups[name]
            current_subgroup_id = None
            continue
            
        if not col1 and name in subgroups:
            current_subgroup_id = subgroups[name]
            continue
            
        if col1.isdigit():
            # It's an indicator
            idx = col1
            weight = row[5].replace(',', '.').strip() if len(row) > 5 else '0'
            if not weight or weight == 'да' or weight == '': weight = '0'
            
            use_pop = 'TRUE' if (len(row) > 4 and row[4].strip().lower() == 'да') else 'FALSE'
            
            group_id = current_subgroup_id if current_subgroup_id else current_group_id
            
            # Logic: Marketing indicators (groups 11, 20-23) are NOT tied to a specific sport
            is_marketing = (group_id == 11 or 20 <= group_id <= 23)
            sport_id_val = 'NULL' if is_marketing else '10'
            org_id_val = 'NULL' # System-wide directory
            
            # Generate code
            clean_name = re.sub(r'[^\w\s]', '', name)
            code_prefix = "GEN" if is_marketing else "BBL"
            code = f"{code_prefix}_{transliterate(clean_name)[:40]}_{idx}"
            
            name_esc = name.replace("'", "''")
            
            # (group_id, organization_id, sport_id, code, name_ru, weight, use_population)
            sql = f"({group_id}, {org_id_val}, {sport_id_val}, '{code}', '{name_esc}', {weight}, {use_pop})"
            sql_inserts.append(sql)

with open(output_file, 'w', encoding='utf-8') as f:
    f.write("-- Full Basketball + Generic Marketing Indicators Registry Import\n")
    f.write("INSERT INTO indicators (group_id, organization_id, sport_id, code, name_ru, weight, use_population) VALUES\n")
    f.write(",\n".join(sql_inserts))
    f.write(";\n")
