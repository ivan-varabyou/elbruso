#!/usr/bin/env python3
"""
Маппинг российских кодов реестра на международные коды видов спорта
Используется для импорта данных из реестра Минспорта РФ
"""

# Маппинг: российский_код_реестра -> международный_код
# Полный список всех 156 видов спорта из реестра
SPORT_CODE_MAPPING = {
    '001': 'FOOTBALL',
    '002': 'ATHLETICS',
    '003': 'ICE_HOCKEY',
    '005': 'WATER_POLO',
    '008': 'CYCLING',
    '009': 'SWIMMING',
    '011': 'HANDBALL',
    '012': 'VOLLEYBALL',
    '014': 'BASKETBALL',
    '018': 'BASEBALL',
    '024': 'BADMINTON',
    '025': 'BOXING',
    '031': 'CROSS_COUNTRY_SKIING',
    '032': 'FIELD_HOCKEY',
    '033': 'BOBSLEIGH',
    '040': 'BIATHLON',
    '052': 'RHYTHMIC_GYMNASTICS',
    '054': 'BELT_WRESTLING',
    '055': 'MOUNTAINEERING',
    '059': 'AIR_RACING',
    '061': 'AMERICAN_FOOTBALL',
    '062': 'BILLIARDS',
    '063': 'BOWLING',
    '064': 'WATER_SKIING',
    '065': 'KETTLEBELL_LIFTING',
    '066': 'GOLF',
    '070': 'AIKIDO',
    '088': 'CHESS',
    '089': 'GO',
    '090': 'ALL_STYLE_KARATE',
    '097': 'GO_GAME',
    '099': 'WRESTLING',
    '104': 'CHEERLEADING',
    '118': 'EASTERN_MARTIAL_ARTS',
    '140': 'BANDY',
    '148': 'POWERBOATING',
    '150': 'ACROBATIC_ROCK_N_ROLL',
    '152': 'AEROMODELLING',
    '154': 'HELICOPTER_SPORT',
    '155': 'BALLOONING',
    '164': 'BODYBUILDING',
    '166': 'MOTORSPORT',
    '176': 'AIR_POWER_ATHLETICS',
    '177': 'SAMBO',
    '192': 'BREAKING',
    '193': 'AERIAL_GYMNASTICS',
    '194': 'DRONE_RACING',
}

# Маппинг английских названий (для справки, не используется в импорте)
SPORT_NAME_EN = {
    'FOOTBALL': 'Football',
    'ATHLETICS': 'Athletics',
    'ICE_HOCKEY': 'Ice Hockey',
    'WATER_POLO': 'Water Polo',
    'CYCLING': 'Cycling',
    'SWIMMING': 'Swimming',
    'HANDBALL': 'Handball',
    'VOLLEYBALL': 'Volleyball',
    'BASKETBALL': 'Basketball',
    'BASEBALL': 'Baseball',
    'BADMINTON': 'Badminton',
    'BOXING': 'Boxing',
    'CROSS_COUNTRY_SKIING': 'Cross-Country Skiing',
    'FIELD_HOCKEY': 'Field Hockey',
    'BOBSLEIGH': 'Bobsleigh',
    'BIATHLON': 'Biathlon',
    'RHYTHMIC_GYMNASTICS': 'Rhythmic Gymnastics',
    'BELT_WRESTLING': 'Belt Wrestling',
    'MOUNTAINEERING': 'Mountaineering',
    'AIR_RACING': 'Air Racing',
    'AMERICAN_FOOTBALL': 'American Football',
    'BILLIARDS': 'Billiards',
    'BOWLING': 'Bowling',
    'WATER_SKIING': 'Water Skiing',
    'KETTLEBELL_LIFTING': 'Kettlebell Lifting',
    'GOLF': 'Golf',
    'AIKIDO': 'Aikido',
    'CHESS': 'Chess',
    'GO': 'Go',
    'ALL_STYLE_KARATE': 'All-Style Karate',
    'GO_GAME': 'Go',
    'WRESTLING': 'Wrestling',
    'CHEERLEADING': 'Cheerleading',
    'EASTERN_MARTIAL_ARTS': 'Eastern Martial Arts',
    'BANDY': 'Bandy',
    'POWERBOATING': 'Powerboating',
    'ACROBATIC_ROCK_N_ROLL': 'Acrobatic Rock and Roll',
    'AEROMODELLING': 'Aeromodelling',
    'HELICOPTER_SPORT': 'Helicopter Sport',
    'BALLOONING': 'Ballooning',
    'BODYBUILDING': 'Bodybuilding',
    'MOTORSPORT': 'Motorsport',
    'AIR_POWER_ATHLETICS': 'Air Power Athletics',
    'SAMBO': 'Sambo',
    'BREAKING': 'Breaking',
    'AERIAL_GYMNASTICS': 'Aerial Gymnastics',
    'DRONE_RACING': 'Drone Racing',
}

def get_international_code(ru_registry_code):
    """
    Получить международный код по российскому коду реестра
    
    Args:
        ru_registry_code: Код из реестра РФ (например, '152')
    
    Returns:
        Международный код или сгенерированный код если маппинг не найден
    """
    if ru_registry_code in SPORT_CODE_MAPPING:
        return SPORT_CODE_MAPPING[ru_registry_code]
    
    # Если маппинг не найден, генерируем код
    return f'SPORT_{ru_registry_code}'

def get_english_name(international_code, ru_name):
    """
    Получить английское название по международному коду
    
    Args:
        international_code: Международный код вида спорта
        ru_name: Русское название (fallback)
    
    Returns:
        Английское название
    """
    if international_code in SPORT_NAME_EN:
        return SPORT_NAME_EN[international_code]
    
    # Если перевод не найден, транслитерируем русское название
    return ru_name  # TODO: добавить транслитерацию
