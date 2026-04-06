/*
  # Taxonomic Architecture for Foundations Filter System

  1. New Normalized Taxonomy Tables
    - `regions` - Hierarchical geographic taxonomy (replaces raw text regions)
    - `historical_periods` - Structured chronological classification system
    - `influence_types` - Graph relationship classifications
    
  2. Enhanced Existing Tables
    - Add `parent_lineage_id` to lineages for hierarchical modeling (already done)
    - Add normalized foreign keys to saints table
    
  3. Migration Strategy
    - Create new taxonomy tables
    - Preserve existing data
    - Add bridge columns for gradual migration
    - Enable proper relational filtering
    
  ## Geographic Taxonomy Structure
  
  Regions follow a 3-level hierarchy:
  - Top Level: Major geographic/cultural zones (includes Kashmir)
  - Regional Level: Sub-regions and historical territories  
  - Local Level: Cities and specific locations
  
  ## Chronological Structure
  
  Periods anchor to both Islamic calendar and historical significance:
  - Prophetic Era (610-632 CE)
  - Companions & Early Ascetics (632-750 CE)
  - Classical Formation (750-1000 CE)
  - Institutional Orders (1000-1300 CE)
  - Metaphysical Expansion (1300-1500 CE)
  - Global Spread (1500-1800 CE)
  - Reform & Renewal (1800-2000 CE)
  - Contemporary (2000-present)
  
  ## Security
  - Enable RLS on all new tables
  - Public read access for taxonomy data
  - Restrict write to authenticated editors only
*/

-- =====================================================
-- 1. HIERARCHICAL REGION TAXONOMY
-- =====================================================

CREATE TABLE IF NOT EXISTS regions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  parent_region_id uuid REFERENCES regions(id),
  level int NOT NULL DEFAULT 0, -- 0=top, 1=regional, 2=local
  slug text UNIQUE NOT NULL,
  description text,
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_regions_parent ON regions(parent_region_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_regions_level ON regions(level) WHERE deleted_at IS NULL;

ALTER TABLE regions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to regions"
  ON regions FOR SELECT
  TO public
  USING (deleted_at IS NULL);

CREATE POLICY "Authenticated users can manage regions"
  ON regions FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- 2. HISTORICAL PERIOD TAXONOMY
-- =====================================================

CREATE TABLE IF NOT EXISTS historical_periods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  start_year int NOT NULL,
  end_year int,
  islamic_calendar_start text,
  islamic_calendar_end text,
  description text,
  significance text,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_historical_periods_years ON historical_periods(start_year, end_year) WHERE deleted_at IS NULL;

ALTER TABLE historical_periods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to historical periods"
  ON historical_periods FOR SELECT
  TO public
  USING (deleted_at IS NULL);

CREATE POLICY "Authenticated users can manage periods"
  ON historical_periods FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- 3. INFLUENCE TYPE TAXONOMY (for graph filtering)
-- =====================================================

CREATE TABLE IF NOT EXISTS influence_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

ALTER TABLE influence_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to influence types"
  ON influence_types FOR SELECT
  TO public
  USING (deleted_at IS NULL);

CREATE POLICY "Authenticated users can manage influence types"
  ON influence_types FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- 4. ENHANCE LINEAGES WITH HIERARCHY (already has parent_lineage_id)
-- =====================================================

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'lineages' AND column_name = 'level'
  ) THEN
    ALTER TABLE lineages ADD COLUMN level int DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'lineages' AND column_name = 'display_order'
  ) THEN
    ALTER TABLE lineages ADD COLUMN display_order int DEFAULT 0;
  END IF;
END $$;

-- =====================================================
-- 5. ENHANCE SAINTS WITH NORMALIZED REFERENCES
-- =====================================================

DO $$ 
BEGIN
  -- Add region_id foreign key (maintain legacy region text during transition)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'saints' AND column_name = 'region_id'
  ) THEN
    ALTER TABLE saints ADD COLUMN region_id uuid REFERENCES regions(id);
    CREATE INDEX idx_saints_region_id ON saints(region_id) WHERE deleted_at IS NULL;
  END IF;
  
  -- Add historical_period_id foreign key
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'saints' AND column_name = 'historical_period_id'
  ) THEN
    ALTER TABLE saints ADD COLUMN historical_period_id uuid REFERENCES historical_periods(id);
    CREATE INDEX idx_saints_period_id ON saints(historical_period_id) WHERE deleted_at IS NULL;
  END IF;
  
  -- Add primary_language field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'saints' AND column_name = 'primary_language'
  ) THEN
    ALTER TABLE saints ADD COLUMN primary_language text;
  END IF;
  
  -- Add is_founder boolean
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'saints' AND column_name = 'is_founder'
  ) THEN
    ALTER TABLE saints ADD COLUMN is_founder boolean DEFAULT false;
  END IF;
END $$;

-- =====================================================
-- 6. ENHANCE RELATIONSHIPS WITH INFLUENCE TYPES
-- =====================================================

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'relationships' AND column_name = 'influence_type_id'
  ) THEN
    ALTER TABLE relationships ADD COLUMN influence_type_id uuid REFERENCES influence_types(id);
    CREATE INDEX idx_relationships_influence_type ON relationships(influence_type_id);
  END IF;
END $$;

-- =====================================================
-- 7. SEED GEOGRAPHIC TAXONOMY
-- =====================================================

-- Top Level Regions (Level 0)
INSERT INTO regions (name, slug, level, description, display_order) VALUES
  ('Prophetic Arabia', 'prophetic-arabia', 0, 'Hijaz region during the time of Prophet Muhammad', 1),
  ('Kashmir', 'kashmir', 0, 'Kashmir Valley and surrounding territories', 2),
  ('South Asia', 'south-asia', 0, 'Indian subcontinent including India, Pakistan, Bangladesh', 3),
  ('Central Asia', 'central-asia', 0, 'Turkestan, Transoxiana, and Central Asian territories', 4),
  ('Persia & Iran', 'persia-iran', 0, 'Persian Empire and modern Iran', 5),
  ('Anatolia', 'anatolia', 0, 'Asia Minor, modern Turkey', 6),
  ('Levant', 'levant', 0, 'Greater Syria, Palestine, Lebanon, Jordan', 7),
  ('Arabian Peninsula', 'arabian-peninsula', 0, 'Arabian Gulf region beyond Hijaz', 8),
  ('North Africa', 'north-africa', 0, 'Maghreb region from Egypt to Morocco', 9),
  ('Sub-Saharan Africa', 'sub-saharan-africa', 0, 'African regions south of the Sahara', 10),
  ('Al-Andalus', 'al-andalus', 0, 'Muslim Iberia, Islamic Spain', 11),
  ('Ottoman World', 'ottoman-world', 0, 'Territories under Ottoman influence', 12),
  ('Global Diaspora', 'global-diaspora', 0, 'Contemporary global Sufi presence', 13)
ON CONFLICT (slug) DO NOTHING;

-- Regional Level (Level 1) - South Asia sub-regions
INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'North India', 'north-india', 1, id, 1 FROM regions WHERE slug = 'south-asia'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Bengal', 'bengal', 1, id, 2 FROM regions WHERE slug = 'south-asia'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Sindh', 'sindh', 1, id, 3 FROM regions WHERE slug = 'south-asia'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Punjab', 'punjab', 1, id, 4 FROM regions WHERE slug = 'south-asia'
ON CONFLICT (slug) DO NOTHING;

-- Regional Level (Level 1) - Central Asia sub-regions
INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Bukhara', 'bukhara', 1, id, 1 FROM regions WHERE slug = 'central-asia'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Samarkand', 'samarkand', 1, id, 2 FROM regions WHERE slug = 'central-asia'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Khwarazm', 'khwarazm', 1, id, 3 FROM regions WHERE slug = 'central-asia'
ON CONFLICT (slug) DO NOTHING;

-- Regional Level (Level 1) - Persia sub-regions
INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Nishapur', 'nishapur', 1, id, 1 FROM regions WHERE slug = 'persia-iran'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Shiraz', 'shiraz', 1, id, 2 FROM regions WHERE slug = 'persia-iran'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Baghdad', 'baghdad', 1, id, 3 FROM regions WHERE slug = 'persia-iran'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Herat', 'herat', 1, id, 4 FROM regions WHERE slug = 'persia-iran'
ON CONFLICT (slug) DO NOTHING;

-- Regional Level (Level 1) - North Africa sub-regions
INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Morocco', 'morocco', 1, id, 1 FROM regions WHERE slug = 'north-africa'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Algeria', 'algeria', 1, id, 2 FROM regions WHERE slug = 'north-africa'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Tunisia', 'tunisia', 1, id, 3 FROM regions WHERE slug = 'north-africa'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO regions (name, slug, level, parent_region_id, display_order)
SELECT 'Egypt', 'egypt', 1, id, 4 FROM regions WHERE slug = 'north-africa'
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 8. SEED HISTORICAL PERIODS
-- =====================================================

INSERT INTO historical_periods (name, slug, start_year, end_year, islamic_calendar_start, islamic_calendar_end, description, significance, display_order) VALUES
  (
    'Prophetic Era',
    'prophetic-era',
    610,
    632,
    '1 BH',
    '11 AH',
    'The lifetime of Prophet Muhammad (peace be upon him) and the revelation of the Quran',
    'Foundation of Islamic spirituality and the beginning of the Sufi path',
    1
  ),
  (
    'Companions & Early Ascetics',
    'companions-early-ascetics',
    632,
    750,
    '11 AH',
    '132 AH',
    'The era of the Companions, Successors, and early ascetic movements',
    'Direct transmission of Prophetic wisdom and emergence of contemplative practice',
    2
  ),
  (
    'Classical Formation',
    'classical-formation',
    750,
    1000,
    '132 AH',
    '390 AH',
    'Codification of Sufi teachings, emergence of major figures like al-Hallaj, Junayd, Bayazid',
    'Intellectual foundations and establishment of Sufi terminology',
    3
  ),
  (
    'Institutional Orders',
    'institutional-orders',
    1000,
    1300,
    '390 AH',
    '700 AH',
    'Formation of formal tariqa structures including Qadiri, Suhrawardi, Chishti orders',
    'Systematization of spiritual training and establishment of global networks',
    4
  ),
  (
    'Metaphysical Expansion',
    'metaphysical-expansion',
    1300,
    1500,
    '700 AH',
    '906 AH',
    'Flowering of Sufi philosophy with Ibn Arabi, Rumi, and the school of Unity of Being',
    'Sophisticated mystical theology and integration with Islamic philosophy',
    5
  ),
  (
    'Global Spread',
    'global-spread',
    1500,
    1800,
    '906 AH',
    '1216 AH',
    'Expansion of Sufi orders across Asia, Africa, and establishment of regional centers',
    'Cultural adaptation and diverse expressions of Sufi practice',
    6
  ),
  (
    'Reform & Renewal',
    'reform-renewal',
    1800,
    2000,
    '1216 AH',
    '1421 AH',
    'Movements of revival, reform, and response to modernity',
    'Reformation of traditional practices and encounter with Western thought',
    7
  ),
  (
    'Contemporary',
    'contemporary',
    2000,
    NULL,
    '1421 AH',
    NULL,
    'Present-day Sufi practice and scholarship in global context',
    'Integration with contemporary science, psychology, and universal spirituality',
    8
  )
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 9. SEED INFLUENCE TYPE TAXONOMY
-- =====================================================

INSERT INTO influence_types (name, slug, description, display_order) VALUES
  ('Teacher', 'teacher', 'Direct spiritual teacher and guide', 1),
  ('Student', 'student', 'Direct disciple or student', 2),
  ('Influenced By', 'influenced-by', 'Indirectly influenced through writings or teachings', 3),
  ('Contemporary', 'contemporary', 'Lived and worked in the same era and region', 4),
  ('Founder', 'founder', 'Established a spiritual order or movement', 5),
  ('Reviver', 'reviver', 'Renewed or reformed an existing tradition', 6),
  ('Successor', 'successor', 'Designated spiritual successor or khalifa', 7),
  ('Correspondent', 'correspondent', 'Maintained written or intellectual exchange', 8)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 10. CREATE HELPER FUNCTIONS
-- =====================================================

-- Function to get all descendants of a region
CREATE OR REPLACE FUNCTION get_region_descendants(parent_id uuid)
RETURNS TABLE (region_id uuid, region_name text, region_level int) AS $$
  WITH RECURSIVE region_tree AS (
    SELECT id, name, level, parent_region_id
    FROM regions
    WHERE parent_region_id = parent_id AND deleted_at IS NULL
    
    UNION ALL
    
    SELECT r.id, r.name, r.level, r.parent_region_id
    FROM regions r
    INNER JOIN region_tree rt ON r.parent_region_id = rt.id
    WHERE r.deleted_at IS NULL
  )
  SELECT id, name, level FROM region_tree;
$$ LANGUAGE sql STABLE;

-- Function to get all ancestors of a region
CREATE OR REPLACE FUNCTION get_region_ancestors(child_id uuid)
RETURNS TABLE (region_id uuid, region_name text, region_level int) AS $$
  WITH RECURSIVE region_tree AS (
    SELECT id, name, level, parent_region_id
    FROM regions
    WHERE id = child_id AND deleted_at IS NULL
    
    UNION ALL
    
    SELECT r.id, r.name, r.level, r.parent_region_id
    FROM regions r
    INNER JOIN region_tree rt ON r.id = rt.parent_region_id
    WHERE r.deleted_at IS NULL
  )
  SELECT id, name, level FROM region_tree WHERE id != child_id;
$$ LANGUAGE sql STABLE;
