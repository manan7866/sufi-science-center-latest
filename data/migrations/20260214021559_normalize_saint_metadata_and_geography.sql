/*
  # Normalize Saint Metadata and Geography Structure

  ## Overview
  Enterprise-grade restructuring of saint data to support:
  - Multi-layered geographic classification (civilizational region, country, city)
  - Gender representation
  - Role types (mystic, philosopher, poet, etc.)
  - Influence scope (local, regional, civilizational, global)
  - Kashmir as first-class independent region
  - Dynamic century generation from birth_year
  - Multi-lineage support

  ## New Columns Added to Saints Table
  - `gender` (male, female, other)
  - `civilizational_region` (Kashmir, Persia, Indian Subcontinent, etc.)
  - `modern_country` (Iran, India, Pakistan, etc.)
  - `city` (specific city of birth/primary residence)
  - `influence_scope` (local, regional, civilizational, global)

  ## New Tables
  - `saint_roles` - Junction table for multiple role types per saint
  - `civilizational_regions` - Master list of regions with hierarchy

  ## Changes
  - Deprecate old `region` column in favor of structured geography
  - Enable multi-select filtering
  - Support Kashmir-first architecture

  ## Security
  - RLS enabled on all new tables
  - Public read access for content
*/

-- ============================================================================
-- ENUMS
-- ============================================================================

-- Gender representation
DO $$ BEGIN
  CREATE TYPE gender_type AS ENUM ('male', 'female', 'other', 'unknown');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Role types for saints (multiple roles possible)
DO $$ BEGIN
  CREATE TYPE saint_role_type AS ENUM (
    'mystic',
    'philosopher',
    'jurist',
    'poet',
    'founder',
    'reformist',
    'scholar',
    'teacher',
    'political_figure',
    'social_reformer'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Influence scope
DO $$ BEGIN
  CREATE TYPE influence_scope_type AS ENUM (
    'local',
    'regional',
    'civilizational',
    'global'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- CIVILIZATIONAL REGIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS civilizational_regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  parent_region_id UUID REFERENCES civilizational_regions(id),
  description TEXT,
  geographic_notes TEXT,
  display_priority INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- ADD NEW COLUMNS TO SAINTS TABLE
-- ============================================================================

-- Add gender
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'saints' AND column_name = 'gender'
  ) THEN
    ALTER TABLE saints ADD COLUMN gender gender_type DEFAULT 'male';
  END IF;
END $$;

-- Add civilizational_region (replaces old region)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'saints' AND column_name = 'civilizational_region'
  ) THEN
    ALTER TABLE saints ADD COLUMN civilizational_region TEXT;
  END IF;
END $$;

-- Add modern_country
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'saints' AND column_name = 'modern_country'
  ) THEN
    ALTER TABLE saints ADD COLUMN modern_country TEXT;
  END IF;
END $$;

-- Add city
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'saints' AND column_name = 'city'
  ) THEN
    ALTER TABLE saints ADD COLUMN city TEXT;
  END IF;
END $$;

-- Add influence_scope
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'saints' AND column_name = 'influence_scope'
  ) THEN
    ALTER TABLE saints ADD COLUMN influence_scope influence_scope_type DEFAULT 'regional';
  END IF;
END $$;

-- ============================================================================
-- SAINT ROLES JUNCTION TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS saint_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  saint_id UUID NOT NULL REFERENCES saints(id) ON DELETE CASCADE,
  role saint_role_type NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(saint_id, role)
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_saints_gender 
  ON saints(gender) WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_saints_civilizational_region 
  ON saints(civilizational_region) WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_saints_modern_country 
  ON saints(modern_country) WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_saints_influence_scope 
  ON saints(influence_scope) WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_saint_roles_saint 
  ON saint_roles(saint_id);

CREATE INDEX IF NOT EXISTS idx_saint_roles_role 
  ON saint_roles(role);

CREATE INDEX IF NOT EXISTS idx_civilizational_regions_slug 
  ON civilizational_regions(slug);

CREATE INDEX IF NOT EXISTS idx_civilizational_regions_parent 
  ON civilizational_regions(parent_region_id);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE saint_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE civilizational_regions ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  DROP POLICY IF EXISTS "Public can view saint roles" ON saint_roles;
  CREATE POLICY "Public can view saint roles"
    ON saint_roles FOR SELECT
    TO public
    USING (true);

  DROP POLICY IF EXISTS "Public can view civilizational regions" ON civilizational_regions;
  CREATE POLICY "Public can view civilizational regions"
    ON civilizational_regions FOR SELECT
    TO public
    USING (true);
END $$;

-- ============================================================================
-- SEED CIVILIZATIONAL REGIONS
-- ============================================================================

-- Top-level civilizational regions
INSERT INTO civilizational_regions (slug, name, description, display_priority) VALUES
  ('kashmir', 'Kashmir', 'Independent Sufi tradition of Kashmir with unique synthesis of Islamic and Vedantic thought', 1),
  ('indian-subcontinent', 'Indian Subcontinent', 'Broad region covering India, Pakistan, Bangladesh', 2),
  ('persia', 'Persia', 'Historical Persian cultural sphere, center of classical Sufism', 3),
  ('central-asia', 'Central Asia', 'Transoxiana, Khorasan, and Silk Road Sufi centers', 4),
  ('middle-east', 'Middle East', 'Arab heartlands, Levant, and Arabian Peninsula', 5),
  ('al-andalus', 'Al-Andalus', 'Islamic Spain and Iberian mystical traditions', 6),
  ('north-africa', 'North Africa', 'Maghreb region including Morocco, Algeria, Tunisia, Libya, Egypt', 7),
  ('sub-saharan-africa', 'Sub-Saharan Africa', 'West and East African Sufi traditions', 8),
  ('anatolia', 'Anatolia', 'Turkish regions and Ottoman Sufi heritage', 9),
  ('southeast-asia', 'Southeast Asia', 'Indonesia, Malaysia, and regional adaptations', 10)
ON CONFLICT (slug) DO NOTHING;

-- Sub-regions (examples for key areas)
DO $$
DECLARE
  v_persia_id UUID;
  v_central_asia_id UUID;
  v_middle_east_id UUID;
BEGIN
  SELECT id INTO v_persia_id FROM civilizational_regions WHERE slug = 'persia';
  SELECT id INTO v_central_asia_id FROM civilizational_regions WHERE slug = 'central-asia';
  SELECT id INTO v_middle_east_id FROM civilizational_regions WHERE slug = 'middle-east';

  IF v_persia_id IS NOT NULL THEN
    INSERT INTO civilizational_regions (slug, name, parent_region_id, display_priority) VALUES
      ('iran', 'Iran', v_persia_id, 1),
      ('afghanistan', 'Afghanistan', v_persia_id, 2)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  IF v_central_asia_id IS NOT NULL THEN
    INSERT INTO civilizational_regions (slug, name, parent_region_id, display_priority) VALUES
      ('uzbekistan', 'Uzbekistan', v_central_asia_id, 1),
      ('tajikistan', 'Tajikistan', v_central_asia_id, 2)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  IF v_middle_east_id IS NOT NULL THEN
    INSERT INTO civilizational_regions (slug, name, parent_region_id, display_priority) VALUES
      ('iraq', 'Iraq', v_middle_east_id, 1),
      ('syria', 'Syria', v_middle_east_id, 2)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END $$;

-- ============================================================================
-- MIGRATE EXISTING SAINT DATA
-- ============================================================================

-- Normalize existing saint regions to new structure
DO $$
BEGIN
  -- Rumi
  UPDATE saints SET 
    civilizational_region = 'persia',
    modern_country = 'Afghanistan',
    city = 'Balkh',
    influence_scope = 'global',
    gender = 'male'
  WHERE slug = 'rumi';

  -- Al-Ghazali
  UPDATE saints SET 
    civilizational_region = 'persia',
    modern_country = 'Iran',
    city = 'Tus',
    influence_scope = 'civilizational',
    gender = 'male'
  WHERE slug = 'al-ghazali';

  -- Ibn Arabi
  UPDATE saints SET 
    civilizational_region = 'al-andalus',
    modern_country = 'Spain',
    city = 'Murcia',
    influence_scope = 'global',
    gender = 'male'
  WHERE slug = 'ibn-arabi';

  -- Rabia al-Adawiyya
  UPDATE saints SET 
    civilizational_region = 'middle-east',
    modern_country = 'Iraq',
    city = 'Basra',
    influence_scope = 'civilizational',
    gender = 'female'
  WHERE slug = 'rabia-al-adawiyya';

  -- Farid al-Din Attar
  UPDATE saints SET 
    civilizational_region = 'persia',
    modern_country = 'Iran',
    city = 'Nishapur',
    influence_scope = 'civilizational',
    gender = 'male'
  WHERE slug = 'farid-al-din-attar';

  -- Data al-Din Mushtaq
  UPDATE saints SET 
    civilizational_region = 'persia',
    modern_country = 'Iran',
    influence_scope = 'regional',
    gender = 'male'
  WHERE slug = 'data-al-din-mushtaq';

  -- Bayazid Bastami
  UPDATE saints SET 
    civilizational_region = 'persia',
    modern_country = 'Iran',
    city = 'Bastam',
    influence_scope = 'civilizational',
    gender = 'male'
  WHERE slug = 'bayazid-bastami';

  -- Abdul Qadir Jilani
  UPDATE saints SET 
    civilizational_region = 'middle-east',
    modern_country = 'Iraq',
    city = 'Baghdad',
    influence_scope = 'global',
    gender = 'male'
  WHERE slug = 'abdul-qadir-jilani';
END $$;

-- ============================================================================
-- SEED SAINT ROLES
-- ============================================================================

DO $$
DECLARE
  v_rumi_id UUID;
  v_ghazali_id UUID;
  v_ibn_arabi_id UUID;
  v_rabia_id UUID;
  v_attar_id UUID;
  v_bayazid_id UUID;
  v_jilani_id UUID;
BEGIN
  SELECT id INTO v_rumi_id FROM saints WHERE slug = 'rumi';
  SELECT id INTO v_ghazali_id FROM saints WHERE slug = 'al-ghazali';
  SELECT id INTO v_ibn_arabi_id FROM saints WHERE slug = 'ibn-arabi';
  SELECT id INTO v_rabia_id FROM saints WHERE slug = 'rabia-al-adawiyya';
  SELECT id INTO v_attar_id FROM saints WHERE slug = 'farid-al-din-attar';
  SELECT id INTO v_bayazid_id FROM saints WHERE slug = 'bayazid-bastami';
  SELECT id INTO v_jilani_id FROM saints WHERE slug = 'abdul-qadir-jilani';

  -- Rumi: poet, mystic, founder
  IF v_rumi_id IS NOT NULL THEN
    INSERT INTO saint_roles (saint_id, role, is_primary) VALUES
      (v_rumi_id, 'poet', true),
      (v_rumi_id, 'mystic', true),
      (v_rumi_id, 'founder', false)
    ON CONFLICT DO NOTHING;
  END IF;

  -- Al-Ghazali: jurist, philosopher, mystic, reformist
  IF v_ghazali_id IS NOT NULL THEN
    INSERT INTO saint_roles (saint_id, role, is_primary) VALUES
      (v_ghazali_id, 'philosopher', true),
      (v_ghazali_id, 'jurist', true),
      (v_ghazali_id, 'mystic', true),
      (v_ghazali_id, 'reformist', false)
    ON CONFLICT DO NOTHING;
  END IF;

  -- Ibn Arabi: mystic, philosopher
  IF v_ibn_arabi_id IS NOT NULL THEN
    INSERT INTO saint_roles (saint_id, role, is_primary) VALUES
      (v_ibn_arabi_id, 'mystic', true),
      (v_ibn_arabi_id, 'philosopher', true),
      (v_ibn_arabi_id, 'poet', false)
    ON CONFLICT DO NOTHING;
  END IF;

  -- Rabia: mystic, poet
  IF v_rabia_id IS NOT NULL THEN
    INSERT INTO saint_roles (saint_id, role, is_primary) VALUES
      (v_rabia_id, 'mystic', true),
      (v_rabia_id, 'poet', false)
    ON CONFLICT DO NOTHING;
  END IF;

  -- Attar: poet, mystic
  IF v_attar_id IS NOT NULL THEN
    INSERT INTO saint_roles (saint_id, role, is_primary) VALUES
      (v_attar_id, 'poet', true),
      (v_attar_id, 'mystic', true)
    ON CONFLICT DO NOTHING;
  END IF;

  -- Bayazid: mystic
  IF v_bayazid_id IS NOT NULL THEN
    INSERT INTO saint_roles (saint_id, role, is_primary) VALUES
      (v_bayazid_id, 'mystic', true)
    ON CONFLICT DO NOTHING;
  END IF;

  -- Abdul Qadir Jilani: founder, mystic, scholar
  IF v_jilani_id IS NOT NULL THEN
    INSERT INTO saint_roles (saint_id, role, is_primary) VALUES
      (v_jilani_id, 'founder', true),
      (v_jilani_id, 'mystic', true),
      (v_jilani_id, 'scholar', false)
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- ============================================================================
-- HELPER FUNCTION: GET CENTURY FROM BIRTH YEAR
-- ============================================================================

CREATE OR REPLACE FUNCTION get_century_label(birth_year INTEGER)
RETURNS TEXT AS $$
BEGIN
  IF birth_year IS NULL THEN
    RETURN 'Unknown';
  END IF;
  
  RETURN CASE
    WHEN birth_year < 0 THEN 'BCE'
    ELSE ((birth_year / 100) + 1)::TEXT || 'th Century'
  END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================================================
-- VIEW: SAINTS WITH COMPUTED CENTURY
-- ============================================================================

CREATE OR REPLACE VIEW saints_with_metadata AS
SELECT 
  s.*,
  get_century_label(s.birth_year) as century,
  array_agg(DISTINCT sr.role) FILTER (WHERE sr.role IS NOT NULL) as roles,
  array_agg(DISTINCT l.name) FILTER (WHERE l.name IS NOT NULL) as lineage_names,
  array_agg(DISTINCT t.name) FILTER (WHERE t.name IS NOT NULL) as theme_names
FROM saints s
LEFT JOIN saint_roles sr ON s.id = sr.saint_id
LEFT JOIN saint_lineages sl ON s.id = sl.saint_id
LEFT JOIN lineages l ON sl.lineage_id = l.id
LEFT JOIN saint_themes st ON s.id = st.saint_id
LEFT JOIN themes t ON st.theme_id = t.id
WHERE s.deleted_at IS NULL
GROUP BY s.id;
