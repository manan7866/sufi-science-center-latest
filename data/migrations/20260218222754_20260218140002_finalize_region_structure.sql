/*
  # Finalize Region Hierarchical Structure

  ## Summary
  Aligns the regions table with the final locked region taxonomy.

  ## Level 1 — Civilizational Regions (parent regions)
  Early Islamic World, Persia & Greater Iran, Central Asia, South Asia, Kashmir,
  Anatolia, North Africa, Al-Andalus, Sub-Saharan Africa, Ottoman World,
  Balkans, Caucasus, Southeast Asia, China, Levant (Bilad al-Sham), Arabian Peninsula

  ## Level 2 — Nested Historical Centers
  Under Early Islamic World: Hijaz (Mecca & Medina), Basra, Kufa, Baghdad
  Under Persia & Greater Iran: Nishapur, Herat, Isfahan, Shiraz
  Under Central Asia: Bukhara, Samarkand, Khwarezm
  Under South Asia: Ajmer, Delhi, Lahore, Multan
  Under Kashmir: Srinagar, Charar-e-Sharif
  Under Anatolia: Konya, Bursa
  Under North Africa: Fez, Tunis, Cairo
  Under Al-Andalus: Cordoba, Seville
  Under Ottoman World: Istanbul, Edirne

  ## Changes
  - Adds "Early Islamic World" as a new civilizational region
  - Renames "Arabian Peninsula" context to nest under Early Islamic World
  - Adds missing level-2 centers
  - Adds missing level-1 civilizational regions (Balkans, Caucasus, Southeast Asia, China)
  - Renames existing regions to match final nomenclature
  - Reorganizes Baghdad from Persia & Iran to Early Islamic World
*/

-- Step 1: Add "Early Islamic World" as a new civilizational region (level 0)
INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Early Islamic World', 'early-islamic-world', 0, NULL, 1
WHERE NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'early-islamic-world');

-- Step 2: Fix display orders for existing level-0 regions
UPDATE regions SET display_order = 2  WHERE slug = 'arabian-peninsula' AND level = 0;
UPDATE regions SET display_order = 3  WHERE slug = 'persia-iran' AND level = 0;
UPDATE regions SET display_order = 4  WHERE slug = 'central-asia' AND level = 0;
UPDATE regions SET display_order = 5  WHERE slug = 'south-asia' AND level = 0;
UPDATE regions SET display_order = 6  WHERE slug = 'kashmir' AND level = 0;
UPDATE regions SET display_order = 7  WHERE slug = 'anatolia' AND level = 0;
UPDATE regions SET display_order = 8  WHERE slug = 'north-africa' AND level = 0;
UPDATE regions SET display_order = 9  WHERE slug = 'al-andalus' AND level = 0;
UPDATE regions SET display_order = 10 WHERE slug = 'sub-saharan-africa' AND level = 0;
UPDATE regions SET display_order = 11 WHERE slug = 'ottoman-world' AND level = 0;
UPDATE regions SET display_order = 12 WHERE slug = 'levant' AND level = 0;
UPDATE regions SET display_order = 13 WHERE slug = 'global-diaspora' AND level = 0;

-- Rename "Persia & Iran" to "Persia & Greater Iran"
UPDATE regions SET name = 'Persia & Greater Iran' WHERE slug = 'persia-iran' AND deleted_at IS NULL;

-- Step 3: Add missing level-1 civilizational regions
INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Balkans', 'balkans', 0, NULL, 14
WHERE NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'balkans');

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Caucasus', 'caucasus', 0, NULL, 15
WHERE NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'caucasus');

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Southeast Asia', 'southeast-asia', 0, NULL, 16
WHERE NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'southeast-asia');

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'China', 'china', 0, NULL, 17
WHERE NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'china');

-- Step 4: Add level-2 historical centers under Early Islamic World
-- First get the Early Islamic World id inline via subquery
INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Hijaz (Mecca & Medina)', 'hijaz', 1, id, 1
FROM regions WHERE slug = 'early-islamic-world'
AND NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'hijaz');

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Kufa', 'kufa', 1, id, 3
FROM regions WHERE slug = 'early-islamic-world'
AND NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'kufa');

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Baghdad', 'baghdad-eiw', 1, id, 4
FROM regions WHERE slug = 'early-islamic-world'
AND NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'baghdad-eiw');

-- Move existing Basra under Early Islamic World
UPDATE regions
SET parent_region_id = (SELECT id FROM regions WHERE slug = 'early-islamic-world'), display_order = 2
WHERE slug = 'basra' AND deleted_at IS NULL;

-- Add level-2 centers under Persia & Greater Iran
INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Isfahan', 'isfahan', 1, id, 3
FROM regions WHERE slug = 'persia-iran'
AND NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'isfahan');

-- Baghdad (Persia context) already exists as id 6ee85466 — rename for clarity if needed
UPDATE regions SET name = 'Baghdad (Iraq)', display_order = 3
WHERE slug = 'baghdad' AND deleted_at IS NULL;

-- Add level-2 centers under South Asia
INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Delhi', 'delhi', 1, id, 6
FROM regions WHERE slug = 'south-asia'
AND NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'delhi');

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Lahore', 'lahore', 1, id, 7
FROM regions WHERE slug = 'south-asia'
AND NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'lahore');

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Multan', 'multan', 1, id, 8
FROM regions WHERE slug = 'south-asia'
AND NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'multan');

-- Add level-2 centers under Kashmir
INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Srinagar', 'srinagar', 1, id, 1
FROM regions WHERE slug = 'kashmir'
AND NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'srinagar');

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Charar-e-Sharif', 'charar-e-sharif', 1, id, 2
FROM regions WHERE slug = 'kashmir'
AND NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'charar-e-sharif');

-- Add level-2 centers under Anatolia
INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Konya', 'konya', 1, id, 1
FROM regions WHERE slug = 'anatolia'
AND NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'konya');

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Bursa', 'bursa', 1, id, 2
FROM regions WHERE slug = 'anatolia'
AND NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'bursa');

-- Add level-2 centers under North Africa
INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Fez', 'fez', 1, id, 1
FROM regions WHERE slug = 'north-africa'
AND NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'fez');

-- Rename Morocco -> Fez context if needed; add Cairo
INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Cairo', 'cairo', 1, id, 4
FROM regions WHERE slug = 'north-africa'
AND NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'cairo');

-- Rename Tunisia to Tunis for historical-center naming
UPDATE regions SET name = 'Tunis' WHERE slug = 'tunisia' AND deleted_at IS NULL;

-- Add level-2 centers under Al-Andalus
INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Cordoba', 'cordoba', 1, id, 1
FROM regions WHERE slug = 'al-andalus'
AND NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'cordoba');

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Seville', 'seville', 1, id, 2
FROM regions WHERE slug = 'al-andalus'
AND NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'seville');

-- Add level-2 centers under Ottoman World
INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Istanbul', 'istanbul', 1, id, 1
FROM regions WHERE slug = 'ottoman-world'
AND NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'istanbul');

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Edirne', 'edirne', 1, id, 2
FROM regions WHERE slug = 'ottoman-world'
AND NOT EXISTS (SELECT 1 FROM regions WHERE slug = 'edirne');
