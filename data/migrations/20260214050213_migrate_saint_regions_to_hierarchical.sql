/*
  # Migrate Saint Regions to Hierarchical System

  1. New Subregions
    - Add Basra as subregion under Arabian Peninsula
    - Add Ajmer as subregion under South Asia

  2. Data Migration
    - Map existing text-based saint.region values to proper region_id FK
    - Preserve original text in region field for reference during transition
    - Update civilizational_region values for consistency

  3. Mapping Strategy
    - "Persia/Baghdad" -> Baghdad subregion (Persia & Iran parent)
    - "Bukhara (Uzbekistan)" -> Bukhara subregion (Central Asia parent)
    - "Persia" variants -> Persia & Iran region
    - "Al-Andalus (Spain)" -> Al-Andalus region
    - "Basra (Iraq)" -> Basra subregion (Arabian Peninsula parent)
*/

-- Add missing subregions
INSERT INTO regions (slug, name, parent_region_id, level, display_order, description)
SELECT 
  'basra',
  'Basra',
  (SELECT id FROM regions WHERE slug = 'arabian-peninsula'),
  1,
  1,
  'Major early Islamic center in southern Iraq'
WHERE NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'basra');

INSERT INTO regions (slug, name, parent_region_id, level, display_order, description)
SELECT
  'ajmer',
  'Ajmer',
  (SELECT id FROM regions WHERE slug = 'south-asia'),
  1,
  5,
  'Important Sufi center in Rajasthan, India'
WHERE NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'ajmer');

-- Migrate saint region data to use region_id
-- Abdul Qadir Gilani: Persia/Baghdad -> Baghdad
UPDATE saints 
SET region_id = (SELECT id FROM regions WHERE slug = 'baghdad'),
    civilizational_region = 'persia-iraq'
WHERE name = 'Abdul Qadir Gilani';

-- Khwaja Bahauddin Naqshband: Bukhara -> Bukhara subregion
UPDATE saints
SET region_id = (SELECT id FROM regions WHERE slug = 'bukhara'),
    civilizational_region = 'central-asia'
WHERE name = 'Khwaja Bahauddin Naqshband';

-- Mansur al-Hallaj: Persia -> Persia & Iran
UPDATE saints
SET region_id = (SELECT id FROM regions WHERE slug = 'persia-iran'),
    civilizational_region = 'persia'
WHERE name = 'Mansur al-Hallaj';

-- Moinuddin Chishti: Persia/India -> South Asia (primary), with note he traveled from Persia
UPDATE saints
SET region_id = (SELECT id FROM regions WHERE slug = 'south-asia'),
    civilizational_region = 'south-asia'
WHERE name = 'Moinuddin Chishti';

-- Rumi: Persia (Afghanistan/Iran) -> Persia & Iran
UPDATE saints
SET region_id = (SELECT id FROM regions WHERE slug = 'persia-iran'),
    civilizational_region = 'persia'
WHERE name = 'Jalal ad-Din Muhammad Rumi';

-- Al-Ghazali: Persia (Iran) -> Persia & Iran (specifically Nishapur)
UPDATE saints
SET region_id = (SELECT id FROM regions WHERE slug = 'nishapur'),
    civilizational_region = 'persia'
WHERE name = 'Abu Hamid al-Ghazali';

-- Ibn Arabi: Al-Andalus -> Al-Andalus
UPDATE saints
SET region_id = (SELECT id FROM regions WHERE slug = 'al-andalus'),
    civilizational_region = 'al-andalus'
WHERE name = 'Ibn Arabi (Muhyiddin)';

-- Rabia al-Adawiyya: Basra (Iraq) -> Basra subregion
UPDATE saints
SET region_id = (SELECT id FROM regions WHERE slug = 'basra'),
    civilizational_region = 'arabian-peninsula'
WHERE name = 'Rabia al-Adawiyya';

-- Create index on region_id for efficient filtering
CREATE INDEX IF NOT EXISTS idx_saints_region_id ON saints(region_id);
CREATE INDEX IF NOT EXISTS idx_saints_historical_period_id ON saints(historical_period_id);
