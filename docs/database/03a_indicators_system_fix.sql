-- ================================
-- ИСПРАВЛЕНИЕ СХЕМЫ: Добавление полей gender_id и age_group_id
-- ================================
-- Проблема: В indicator_catalog нет полей gender_id и age_group_id,
-- но они есть в events_catalog и indicator_templates.
-- Это не позволяет создавать критерии типа "Сборная U18 (мужчины)"

ALTER TABLE indicator_catalog 
ADD COLUMN IF NOT EXISTS gender_id INTEGER REFERENCES genders(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS age_group_id INTEGER REFERENCES age_groups(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_ic_gender ON indicator_catalog(gender_id);
CREATE INDEX IF NOT EXISTS idx_ic_age_group ON indicator_catalog(age_group_id);

COMMENT ON COLUMN indicator_catalog.gender_id IS 'Привязка к полу (NULL = любой пол)';
COMMENT ON COLUMN indicator_catalog.age_group_id IS 'Привязка к возрастной группе (NULL = любой возраст)';

-- ================================
-- КОММЕНТАРИИ
-- ================================

COMMENT ON TABLE indicator_catalog IS 
'Справочник всех возможных индикаторов.
- sport_id=NULL означает универсальность для всех видов спорта
- gender_id=NULL означает применимость для любого пола
- age_group_id=NULL означает применимость для любого возраста';
