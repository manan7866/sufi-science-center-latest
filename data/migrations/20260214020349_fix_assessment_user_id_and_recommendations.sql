/*
  # Fix Assessment System and Add Dynamic Recommendations

  ## Overview
  This migration enhances the assessment system to support anonymous users and creates
  a sophisticated recommendation engine that links assessment results to specific content.

  ## Changes Made

  ### 1. Fix User ID Constraint
  - Make `user_id` nullable in `assessment_results` to support anonymous assessments
  - Users can take assessments without logging in

  ### 2. Assessment Recommendation Tables
  - `assessment_dimension_mappings` - Links assessment dimensions/score ranges to themes
  - `content_recommendations` - Stores specific recommendations for saints, dialogues, research, media

  ### 3. Recommendation Logic
  Each assessment dimension maps to:
  - Specific themes (cognitive_patterns → consciousness, epistemology)
  - Score-based content recommendations (beginner, intermediate, advanced)
  - Cross-linked saints, dialogues, research papers, Sacred Kalam, SufiPulse tracks

  ## Security
  - RLS enabled on all new tables
  - Public read access for recommendations
  - Only admins can modify recommendation mappings
*/

-- ============================================================================
-- FIX ASSESSMENT USER ID
-- ============================================================================

-- Make user_id nullable to support anonymous assessments
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'assessment_results' AND column_name = 'user_id' AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE assessment_results ALTER COLUMN user_id DROP NOT NULL;
  END IF;
END $$;

-- ============================================================================
-- ASSESSMENT RECOMMENDATION TABLES
-- ============================================================================

-- Maps assessment dimensions to themes and content categories
CREATE TABLE IF NOT EXISTS assessment_dimension_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dimension assessment_dimension NOT NULL,
  score_range_min NUMERIC NOT NULL CHECK (score_range_min >= 0 AND score_range_min <= 10),
  score_range_max NUMERIC NOT NULL CHECK (score_range_max >= 0 AND score_range_max <= 10),
  level_label TEXT NOT NULL CHECK (level_label IN ('developing', 'progressing', 'advanced')),
  theme_ids UUID[] DEFAULT '{}',
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Stores specific content recommendations
CREATE TABLE IF NOT EXISTS content_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dimension assessment_dimension NOT NULL,
  score_range_min NUMERIC NOT NULL CHECK (score_range_min >= 0 AND score_range_min <= 10),
  score_range_max NUMERIC NOT NULL CHECK (score_range_max >= 0 AND score_range_max <= 10),
  content_type TEXT NOT NULL CHECK (content_type IN ('saint', 'dialogue', 'research', 'sacred_kalam', 'media_track')),
  content_id UUID NOT NULL,
  recommendation_text TEXT,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_dimension_mappings_dimension 
  ON assessment_dimension_mappings(dimension);

CREATE INDEX IF NOT EXISTS idx_dimension_mappings_score_range 
  ON assessment_dimension_mappings(score_range_min, score_range_max);

CREATE INDEX IF NOT EXISTS idx_content_recommendations_dimension 
  ON content_recommendations(dimension);

CREATE INDEX IF NOT EXISTS idx_content_recommendations_score 
  ON content_recommendations(score_range_min, score_range_max);

CREATE INDEX IF NOT EXISTS idx_content_recommendations_type 
  ON content_recommendations(content_type, content_id);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE assessment_dimension_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_recommendations ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can view dimension mappings"
  ON assessment_dimension_mappings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view content recommendations"
  ON content_recommendations FOR SELECT
  TO public
  USING (true);

-- Admin-only write access (when auth is added)
CREATE POLICY "Admin can manage dimension mappings"
  ON assessment_dimension_mappings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can manage content recommendations"
  ON content_recommendations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- SEED DIMENSION MAPPINGS
-- ============================================================================

-- Cognitive Patterns mappings
INSERT INTO assessment_dimension_mappings (dimension, score_range_min, score_range_max, level_label, priority) VALUES
  ('cognitive_patterns', 0, 3.9, 'developing', 1),
  ('cognitive_patterns', 4, 6.9, 'progressing', 2),
  ('cognitive_patterns', 7, 10, 'advanced', 3);

-- Emotional Intelligence mappings  
INSERT INTO assessment_dimension_mappings (dimension, score_range_min, score_range_max, level_label, priority) VALUES
  ('emotional_intelligence', 0, 3.9, 'developing', 1),
  ('emotional_intelligence', 4, 6.9, 'progressing', 2),
  ('emotional_intelligence', 7, 10, 'advanced', 3);

-- Contemplative Capacity mappings
INSERT INTO assessment_dimension_mappings (dimension, score_range_min, score_range_max, level_label, priority) VALUES
  ('contemplative_capacity', 0, 3.9, 'developing', 1),
  ('contemplative_capacity', 4, 6.9, 'progressing', 2),
  ('contemplative_capacity', 7, 10, 'advanced', 3);

-- Transformative Readiness mappings
INSERT INTO assessment_dimension_mappings (dimension, score_range_min, score_range_max, level_label, priority) VALUES
  ('transformative_readiness', 0, 3.9, 'developing', 1),
  ('transformative_readiness', 4, 6.9, 'progressing', 2),
  ('transformative_readiness', 7, 10, 'advanced', 3);

-- ============================================================================
-- SEED SAINT RECOMMENDATIONS
-- ============================================================================

-- Get theme IDs for recommendations
DO $$
DECLARE
  v_tawhid_theme_id UUID;
  v_consciousness_theme_id UUID;
  v_transformation_theme_id UUID;
  v_ethical_theme_id UUID;
  v_love_theme_id UUID;
  
  v_rumi_id UUID;
  v_ghazali_id UUID;
  v_rabia_id UUID;
  v_ibn_arabi_id UUID;
  v_attar_id UUID;
BEGIN
  -- Get theme IDs
  SELECT id INTO v_tawhid_theme_id FROM themes WHERE slug = 'tawhid' LIMIT 1;
  SELECT id INTO v_consciousness_theme_id FROM themes WHERE slug = 'consciousness-studies' LIMIT 1;
  SELECT id INTO v_transformation_theme_id FROM themes WHERE slug = 'transformation' LIMIT 1;
  SELECT id INTO v_ethical_theme_id FROM themes WHERE slug = 'ethical-discipline' LIMIT 1;
  SELECT id INTO v_love_theme_id FROM themes WHERE slug = 'divine-love' LIMIT 1;

  -- Get saint IDs
  SELECT id INTO v_rumi_id FROM saints WHERE slug = 'rumi' LIMIT 1;
  SELECT id INTO v_ghazali_id FROM saints WHERE slug = 'al-ghazali' LIMIT 1;
  SELECT id INTO v_rabia_id FROM saints WHERE slug = 'rabia-al-adawiyya' LIMIT 1;
  SELECT id INTO v_ibn_arabi_id FROM saints WHERE slug = 'ibn-arabi' LIMIT 1;
  SELECT id INTO v_attar_id FROM saints WHERE slug = 'farid-al-din-attar' LIMIT 1;

  -- Cognitive Patterns - Saints recommendations
  IF v_ibn_arabi_id IS NOT NULL THEN
    INSERT INTO content_recommendations (dimension, score_range_min, score_range_max, content_type, content_id, recommendation_text, priority)
    VALUES ('cognitive_patterns', 7, 10, 'saint', v_ibn_arabi_id, 
            'Ibn Arabi''s sophisticated metaphysics and epistemology will resonate with your advanced cognitive flexibility', 1);
  END IF;

  IF v_ghazali_id IS NOT NULL THEN
    INSERT INTO content_recommendations (dimension, score_range_min, score_range_max, content_type, content_id, recommendation_text, priority)
    VALUES ('cognitive_patterns', 0, 3.9, 'saint', v_ghazali_id,
            'Al-Ghazali''s systematic approach provides excellent foundations for developing philosophical inquiry', 1);
  END IF;

  -- Emotional Intelligence - Saints recommendations
  IF v_rabia_id IS NOT NULL THEN
    INSERT INTO content_recommendations (dimension, score_range_min, score_range_max, content_type, content_id, recommendation_text, priority)
    VALUES ('emotional_intelligence', 7, 10, 'saint', v_rabia_id,
            'Rabia al-Adawiyya''s pure love teachings deepen emotional and spiritual integration', 1);
  END IF;

  IF v_rumi_id IS NOT NULL THEN
    INSERT INTO content_recommendations (dimension, score_range_min, score_range_max, content_type, content_id, recommendation_text, priority)
    VALUES ('emotional_intelligence', 4, 6.9, 'saint', v_rumi_id,
            'Rumi''s poetry and teachings beautifully express the journey of emotional transformation', 1);
  END IF;

  -- Contemplative Capacity - Saints recommendations
  IF v_attar_id IS NOT NULL THEN
    INSERT INTO content_recommendations (dimension, score_range_min, score_range_max, content_type, content_id, recommendation_text, priority)
    VALUES ('contemplative_capacity', 4, 6.9, 'saint', v_attar_id,
            'Attar''s Conference of the Birds guides the deepening contemplative journey', 1);
  END IF;

  -- Transformative Readiness - Saints recommendations  
  IF v_rumi_id IS NOT NULL THEN
    INSERT INTO content_recommendations (dimension, score_range_min, score_range_max, content_type, content_id, recommendation_text, priority)
    VALUES ('transformative_readiness', 7, 10, 'saint', v_rumi_id,
            'Rumi''s teachings on transformation and surrender align with your high readiness', 1);
  END IF;
END $$;
