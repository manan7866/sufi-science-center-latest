/*
  # Sufi Science Center - Initial Database Schema
  
  ## Overview
  Complete knowledge graph database for the Sufi Science Center platform.
  Designed for scalability, full-text search, and future graph visualization.
  
  ## New Tables
  
  ### Core Entities
  - `users` - Authentication and role management
    - `id` (uuid, primary key)
    - `email` (text, unique)
    - `role` (enum: user, researcher, admin)
    - `created_at`, `updated_at`, `deleted_at`
  
  - `saints` - Core knowledge entity for Sufi masters
    - `id` (uuid, primary key)
    - `slug` (text, unique)
    - `name`, `birth_year`, `death_year`, `region`
    - `short_summary`, `biography`
    - `search_vector` (tsvector for full-text search)
    - Automatic search indexing via trigger
  
  - `lineages` - Spiritual lineage hierarchy (recursive)
    - `id` (uuid, primary key)
    - `slug` (text, unique)
    - `name`, `description`
    - `parent_lineage_id` (self-referencing for hierarchy)
  
  - `themes` - Central taxonomy hub
    - `id` (uuid, primary key)
    - `slug` (text, unique)
    - `name`, `description`
    - `category` (enum: scientific, spiritual, ethical, interdisciplinary)
  
  - `research_papers` - Academic publications
    - `id` (uuid, primary key)
    - `slug` (text, unique)
    - `title`, `abstract`, `content`
    - `publication_date`, `citation_format`, `pdf_url`
    - `search_vector` with automatic indexing
  
  - `dialogues` - Video dialogues and discussions
    - `id` (uuid, primary key)
    - `slug` (text, unique)
    - `title`, `description`, `transcript`
    - `video_url`, `duration_minutes`, `published_at`
    - `search_vector` with automatic indexing
  
  - `assessments` - Inner development assessments
    - `id` (uuid, primary key)
    - `slug` (text, unique)
    - `title`, `description`, `version`
    - `is_active` (boolean)
  
  - `assessment_questions` - Questions for each assessment
    - Links to assessments
    - `dimension` (enum: cognitive_patterns, emotional_intelligence, etc.)
    - `question_text`, `weight`, `order_index`
  
  - `assessment_results` - User assessment responses
    - Links users to assessments
    - `result_json` (JSONB for flexible storage)
  
  ### Junction Tables (Performance Optimized)
  - `saint_themes` - Saint-to-theme relationships
  - `saint_lineages` - Saint-to-lineage relationships with role
  - `paper_themes` - Paper-to-theme relationships
  - `dialogue_themes` - Dialogue-to-theme relationships
  - `dialogue_participants` - Saints discussed in dialogues
  
  ### Graph Table
  - `relationships` - Universal relationship table
    - Supports arbitrary entity-to-entity connections
    - `entity_type_a`, `entity_id_a`
    - `entity_type_b`, `entity_id_b`
    - `relationship_type` (teacher_of, influenced_by, etc.)
    - `metadata` (JSONB for flexible attributes)
  
  ## Security
  - RLS enabled on all tables
  - Public read access for content (non-deleted items)
  - Authenticated users can manage their own assessment results
  - Admin role required for content management
  
  ## Performance
  - 23 indexes covering all query patterns
  - GIN indexes for full-text search
  - Partial indexes for soft-delete filtering
  - Automatic search vector updates via triggers
  
  ## Future Capabilities
  - Knowledge graph visualization
  - Influence mapping between saints
  - AI semantic search
  - Citation networks
  - Personalized recommendations
*/

-- ============================================================================
-- ENUMS
-- ============================================================================

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('user', 'researcher', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE entity_type AS ENUM ('saint', 'lineage', 'theme', 'paper', 'dialogue', 'assessment');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE relationship_type AS ENUM (
    'teacher_of',
    'student_of',
    'influenced_by',
    'contemporary_with',
    'belongs_to_lineage',
    'discussed_in',
    'referenced_in',
    'related_to'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE theme_category AS ENUM ('scientific', 'spiritual', 'ethical', 'interdisciplinary');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE assessment_dimension AS ENUM (
    'cognitive_patterns',
    'emotional_intelligence',
    'contemplative_capacity',
    'transformative_readiness'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- CORE ENTITIES
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role user_role DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS saints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  birth_year INTEGER,
  death_year INTEGER,
  region TEXT,
  short_summary TEXT,
  biography TEXT,
  search_vector TSVECTOR,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS lineages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  parent_lineage_id UUID REFERENCES lineages(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category theme_category DEFAULT 'interdisciplinary',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS research_papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  abstract TEXT,
  content TEXT,
  publication_date DATE,
  citation_format TEXT,
  pdf_url TEXT,
  search_vector TSVECTOR,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS dialogues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  transcript TEXT,
  video_url TEXT,
  duration_minutes INTEGER,
  published_at TIMESTAMPTZ,
  search_vector TSVECTOR,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  version INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS assessment_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  dimension assessment_dimension NOT NULL,
  question_text TEXT NOT NULL,
  weight DECIMAL(3,2) DEFAULT 1.00,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS assessment_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  result_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- JUNCTION TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS saint_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  saint_id UUID NOT NULL REFERENCES saints(id) ON DELETE CASCADE,
  theme_id UUID NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(saint_id, theme_id)
);

CREATE TABLE IF NOT EXISTS saint_lineages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  saint_id UUID NOT NULL REFERENCES saints(id) ON DELETE CASCADE,
  lineage_id UUID NOT NULL REFERENCES lineages(id) ON DELETE CASCADE,
  role TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(saint_id, lineage_id)
);

CREATE TABLE IF NOT EXISTS paper_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id UUID NOT NULL REFERENCES research_papers(id) ON DELETE CASCADE,
  theme_id UUID NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(paper_id, theme_id)
);

CREATE TABLE IF NOT EXISTS dialogue_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dialogue_id UUID NOT NULL REFERENCES dialogues(id) ON DELETE CASCADE,
  theme_id UUID NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(dialogue_id, theme_id)
);

CREATE TABLE IF NOT EXISTS dialogue_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dialogue_id UUID NOT NULL REFERENCES dialogues(id) ON DELETE CASCADE,
  saint_id UUID NOT NULL REFERENCES saints(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(dialogue_id, saint_id)
);

-- ============================================================================
-- UNIVERSAL RELATIONSHIP TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type_a entity_type NOT NULL,
  entity_id_a UUID NOT NULL,
  entity_type_b entity_type NOT NULL,
  entity_id_b UUID NOT NULL,
  relationship_type relationship_type NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_saints_slug ON saints(slug) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_lineages_slug ON lineages(slug) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_themes_slug ON themes(slug) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_papers_slug ON research_papers(slug) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_dialogues_slug ON dialogues(slug) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_assessments_slug ON assessments(slug) WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_saints_search ON saints USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS idx_papers_search ON research_papers USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS idx_dialogues_search ON dialogues USING GIN(search_vector);

CREATE INDEX IF NOT EXISTS idx_saints_birth_year ON saints(birth_year) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_saints_death_year ON saints(death_year) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_saints_region ON saints(region) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_papers_publication_date ON research_papers(publication_date) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_dialogues_published_at ON dialogues(published_at) WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_saint_themes_saint ON saint_themes(saint_id);
CREATE INDEX IF NOT EXISTS idx_saint_themes_theme ON saint_themes(theme_id);
CREATE INDEX IF NOT EXISTS idx_saint_lineages_saint ON saint_lineages(saint_id);
CREATE INDEX IF NOT EXISTS idx_saint_lineages_lineage ON saint_lineages(lineage_id);
CREATE INDEX IF NOT EXISTS idx_paper_themes_paper ON paper_themes(paper_id);
CREATE INDEX IF NOT EXISTS idx_paper_themes_theme ON paper_themes(theme_id);
CREATE INDEX IF NOT EXISTS idx_dialogue_themes_dialogue ON dialogue_themes(dialogue_id);
CREATE INDEX IF NOT EXISTS idx_dialogue_themes_theme ON dialogue_themes(theme_id);
CREATE INDEX IF NOT EXISTS idx_dialogue_participants_dialogue ON dialogue_participants(dialogue_id);
CREATE INDEX IF NOT EXISTS idx_dialogue_participants_saint ON dialogue_participants(saint_id);

CREATE INDEX IF NOT EXISTS idx_relationships_type ON relationships(relationship_type) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_relationships_entity_a ON relationships(entity_type_a, entity_id_a) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_relationships_entity_b ON relationships(entity_type_b, entity_id_b) WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_assessment_questions_assessment ON assessment_questions(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_questions_dimension ON assessment_questions(dimension);
CREATE INDEX IF NOT EXISTS idx_assessment_results_user ON assessment_results(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_assessment ON assessment_results(assessment_id);

CREATE INDEX IF NOT EXISTS idx_lineages_parent ON lineages(parent_lineage_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_themes_category ON themes(category) WHERE deleted_at IS NULL;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE OR REPLACE FUNCTION saints_search_vector_update() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.short_summary, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.biography, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS saints_search_vector_trigger ON saints;
CREATE TRIGGER saints_search_vector_trigger
  BEFORE INSERT OR UPDATE ON saints
  FOR EACH ROW
  EXECUTE FUNCTION saints_search_vector_update();

CREATE OR REPLACE FUNCTION papers_search_vector_update() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.abstract, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.content, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS papers_search_vector_trigger ON research_papers;
CREATE TRIGGER papers_search_vector_trigger
  BEFORE INSERT OR UPDATE ON research_papers
  FOR EACH ROW
  EXECUTE FUNCTION papers_search_vector_update();

CREATE OR REPLACE FUNCTION dialogues_search_vector_update() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.transcript, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS dialogues_search_vector_trigger ON dialogues;
CREATE TRIGGER dialogues_search_vector_trigger
  BEFORE INSERT OR UPDATE ON dialogues
  FOR EACH ROW
  EXECUTE FUNCTION dialogues_search_vector_update();

CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_saints_updated_at ON saints;
CREATE TRIGGER update_saints_updated_at BEFORE UPDATE ON saints FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_lineages_updated_at ON lineages;
CREATE TRIGGER update_lineages_updated_at BEFORE UPDATE ON lineages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_themes_updated_at ON themes;
CREATE TRIGGER update_themes_updated_at BEFORE UPDATE ON themes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_papers_updated_at ON research_papers;
CREATE TRIGGER update_papers_updated_at BEFORE UPDATE ON research_papers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_dialogues_updated_at ON dialogues;
CREATE TRIGGER update_dialogues_updated_at BEFORE UPDATE ON dialogues FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_assessments_updated_at ON assessments;
CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON assessments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_assessment_questions_updated_at ON assessment_questions;
CREATE TRIGGER update_assessment_questions_updated_at BEFORE UPDATE ON assessment_questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE saints ENABLE ROW LEVEL SECURITY;
ALTER TABLE lineages ENABLE ROW LEVEL SECURITY;
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE dialogues ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE saint_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE saint_lineages ENABLE ROW LEVEL SECURITY;
ALTER TABLE paper_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE dialogue_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE dialogue_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE relationships ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read saints" ON saints;
CREATE POLICY "Public can read saints" ON saints FOR SELECT USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "Public can read lineages" ON lineages;
CREATE POLICY "Public can read lineages" ON lineages FOR SELECT USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "Public can read themes" ON themes;
CREATE POLICY "Public can read themes" ON themes FOR SELECT USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "Public can read papers" ON research_papers;
CREATE POLICY "Public can read papers" ON research_papers FOR SELECT USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "Public can read dialogues" ON dialogues;
CREATE POLICY "Public can read dialogues" ON dialogues FOR SELECT USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "Public can read assessments" ON assessments;
CREATE POLICY "Public can read assessments" ON assessments FOR SELECT USING (deleted_at IS NULL AND is_active = true);

DROP POLICY IF EXISTS "Public can read assessment questions" ON assessment_questions;
CREATE POLICY "Public can read assessment questions" ON assessment_questions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read saint_themes" ON saint_themes;
CREATE POLICY "Public can read saint_themes" ON saint_themes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read saint_lineages" ON saint_lineages;
CREATE POLICY "Public can read saint_lineages" ON saint_lineages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read paper_themes" ON paper_themes;
CREATE POLICY "Public can read paper_themes" ON paper_themes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read dialogue_themes" ON dialogue_themes;
CREATE POLICY "Public can read dialogue_themes" ON dialogue_themes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read dialogue_participants" ON dialogue_participants;
CREATE POLICY "Public can read dialogue_participants" ON dialogue_participants FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read relationships" ON relationships;
CREATE POLICY "Public can read relationships" ON relationships FOR SELECT USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "Users can read own assessment results" ON assessment_results;
CREATE POLICY "Users can read own assessment results" ON assessment_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own assessment results" ON assessment_results;
CREATE POLICY "Users can insert own assessment results" ON assessment_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins have full access to saints" ON saints;
CREATE POLICY "Admins have full access to saints" ON saints
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins have full access to lineages" ON lineages;
CREATE POLICY "Admins have full access to lineages" ON lineages
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins have full access to themes" ON themes;
CREATE POLICY "Admins have full access to themes" ON themes
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins have full access to papers" ON research_papers;
CREATE POLICY "Admins have full access to papers" ON research_papers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins have full access to dialogues" ON dialogues;
CREATE POLICY "Admins have full access to dialogues" ON dialogues
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );