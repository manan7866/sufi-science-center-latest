-- ============================================================================
-- SUFI SCIENCE CENTER - DATABASE SCHEMA DESIGN
-- Knowledge Graph Institute Platform
-- PostgreSQL Schema with Full-Text Search and Graph Capabilities
-- ============================================================================

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE user_role AS ENUM ('user', 'researcher', 'admin');
CREATE TYPE entity_type AS ENUM ('saint', 'lineage', 'theme', 'paper', 'dialogue', 'assessment');
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
CREATE TYPE theme_category AS ENUM ('scientific', 'spiritual', 'ethical', 'interdisciplinary');
CREATE TYPE assessment_dimension AS ENUM (
  'cognitive_patterns',
  'emotional_intelligence',
  'contemplative_capacity',
  'transformative_readiness'
);

-- ============================================================================
-- CORE ENTITIES
-- ============================================================================

-- Users (Minimal - Auth Only)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role user_role DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- Saints (Core Knowledge Entity)
CREATE TABLE saints (
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

-- Lineages (Recursive Hierarchy)
CREATE TABLE lineages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  parent_lineage_id UUID REFERENCES lineages(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- Themes (Central Taxonomy Hub)
CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category theme_category DEFAULT 'interdisciplinary',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- Research Papers
CREATE TABLE research_papers (
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

-- Dialogues
CREATE TABLE dialogues (
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

-- Assessments (Versioned)
CREATE TABLE assessments (
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

-- Assessment Questions
CREATE TABLE assessment_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  dimension assessment_dimension NOT NULL,
  question_text TEXT NOT NULL,
  weight DECIMAL(3,2) DEFAULT 1.00,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Assessment Results (JSONB for Flexibility)
CREATE TABLE assessment_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  result_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- JUNCTION TABLES (Specific - For Fast Queries)
-- ============================================================================

-- Saint-Theme Relationships
CREATE TABLE saint_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  saint_id UUID NOT NULL REFERENCES saints(id) ON DELETE CASCADE,
  theme_id UUID NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(saint_id, theme_id)
);

-- Saint-Lineage Relationships
CREATE TABLE saint_lineages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  saint_id UUID NOT NULL REFERENCES saints(id) ON DELETE CASCADE,
  lineage_id UUID NOT NULL REFERENCES lineages(id) ON DELETE CASCADE,
  role TEXT, -- e.g., 'founder', 'master', 'prominent_member'
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(saint_id, lineage_id)
);

-- Paper-Theme Relationships
CREATE TABLE paper_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id UUID NOT NULL REFERENCES research_papers(id) ON DELETE CASCADE,
  theme_id UUID NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(paper_id, theme_id)
);

-- Dialogue-Theme Relationships
CREATE TABLE dialogue_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dialogue_id UUID NOT NULL REFERENCES dialogues(id) ON DELETE CASCADE,
  theme_id UUID NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(dialogue_id, theme_id)
);

-- Dialogue Participants (Saints mentioned/discussed)
CREATE TABLE dialogue_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dialogue_id UUID NOT NULL REFERENCES dialogues(id) ON DELETE CASCADE,
  saint_id UUID NOT NULL REFERENCES saints(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(dialogue_id, saint_id)
);

-- ============================================================================
-- UNIVERSAL RELATIONSHIP TABLE (Graph Ready)
-- ============================================================================

CREATE TABLE relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type_a entity_type NOT NULL,
  entity_id_a UUID NOT NULL,
  entity_type_b entity_type NOT NULL,
  entity_id_b UUID NOT NULL,
  relationship_type relationship_type NOT NULL,
  metadata JSONB, -- For flexible attributes
  created_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ============================================================================
-- INDEXES (Performance Critical)
-- ============================================================================

-- Unique slugs
CREATE INDEX idx_saints_slug ON saints(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_lineages_slug ON lineages(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_themes_slug ON themes(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_papers_slug ON research_papers(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_dialogues_slug ON dialogues(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_assessments_slug ON assessments(slug) WHERE deleted_at IS NULL;

-- Full-text search indexes (GIN)
CREATE INDEX idx_saints_search ON saints USING GIN(search_vector);
CREATE INDEX idx_papers_search ON research_papers USING GIN(search_vector);
CREATE INDEX idx_dialogues_search ON dialogues USING GIN(search_vector);

-- Date/year indexes for filtering
CREATE INDEX idx_saints_birth_year ON saints(birth_year) WHERE deleted_at IS NULL;
CREATE INDEX idx_saints_death_year ON saints(death_year) WHERE deleted_at IS NULL;
CREATE INDEX idx_saints_region ON saints(region) WHERE deleted_at IS NULL;
CREATE INDEX idx_papers_publication_date ON research_papers(publication_date) WHERE deleted_at IS NULL;
CREATE INDEX idx_dialogues_published_at ON dialogues(published_at) WHERE deleted_at IS NULL;

-- Junction table indexes
CREATE INDEX idx_saint_themes_saint ON saint_themes(saint_id);
CREATE INDEX idx_saint_themes_theme ON saint_themes(theme_id);
CREATE INDEX idx_saint_lineages_saint ON saint_lineages(saint_id);
CREATE INDEX idx_saint_lineages_lineage ON saint_lineages(lineage_id);
CREATE INDEX idx_paper_themes_paper ON paper_themes(paper_id);
CREATE INDEX idx_paper_themes_theme ON paper_themes(theme_id);
CREATE INDEX idx_dialogue_themes_dialogue ON dialogue_themes(dialogue_id);
CREATE INDEX idx_dialogue_themes_theme ON dialogue_themes(theme_id);
CREATE INDEX idx_dialogue_participants_dialogue ON dialogue_participants(dialogue_id);
CREATE INDEX idx_dialogue_participants_saint ON dialogue_participants(saint_id);

-- Relationship table indexes (graph queries)
CREATE INDEX idx_relationships_type ON relationships(relationship_type) WHERE deleted_at IS NULL;
CREATE INDEX idx_relationships_entity_a ON relationships(entity_type_a, entity_id_a) WHERE deleted_at IS NULL;
CREATE INDEX idx_relationships_entity_b ON relationships(entity_type_b, entity_id_b) WHERE deleted_at IS NULL;

-- Assessment indexes
CREATE INDEX idx_assessment_questions_assessment ON assessment_questions(assessment_id);
CREATE INDEX idx_assessment_questions_dimension ON assessment_questions(dimension);
CREATE INDEX idx_assessment_results_user ON assessment_results(user_id);
CREATE INDEX idx_assessment_results_assessment ON assessment_results(assessment_id);

-- Lineage hierarchy index
CREATE INDEX idx_lineages_parent ON lineages(parent_lineage_id) WHERE deleted_at IS NULL;

-- Theme category index
CREATE INDEX idx_themes_category ON themes(category) WHERE deleted_at IS NULL;

-- ============================================================================
-- TRIGGERS (Automatic Search Vector Updates)
-- ============================================================================

-- Saints search vector trigger
CREATE OR REPLACE FUNCTION saints_search_vector_update() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.short_summary, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.biography, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER saints_search_vector_trigger
  BEFORE INSERT OR UPDATE ON saints
  FOR EACH ROW
  EXECUTE FUNCTION saints_search_vector_update();

-- Research papers search vector trigger
CREATE OR REPLACE FUNCTION papers_search_vector_update() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.abstract, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.content, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER papers_search_vector_trigger
  BEFORE INSERT OR UPDATE ON research_papers
  FOR EACH ROW
  EXECUTE FUNCTION papers_search_vector_update();

-- Dialogues search vector trigger
CREATE OR REPLACE FUNCTION dialogues_search_vector_update() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.transcript, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER dialogues_search_vector_trigger
  BEFORE INSERT OR UPDATE ON dialogues
  FOR EACH ROW
  EXECUTE FUNCTION dialogues_search_vector_update();

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_saints_updated_at BEFORE UPDATE ON saints FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lineages_updated_at BEFORE UPDATE ON lineages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_themes_updated_at BEFORE UPDATE ON themes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_papers_updated_at BEFORE UPDATE ON research_papers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_dialogues_updated_at BEFORE UPDATE ON dialogues FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON assessments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assessment_questions_updated_at BEFORE UPDATE ON assessment_questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
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

-- Public read access for content (non-deleted)
CREATE POLICY "Public can read saints" ON saints FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Public can read lineages" ON lineages FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Public can read themes" ON themes FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Public can read papers" ON research_papers FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Public can read dialogues" ON dialogues FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Public can read assessments" ON assessments FOR SELECT USING (deleted_at IS NULL AND is_active = true);
CREATE POLICY "Public can read assessment questions" ON assessment_questions FOR SELECT USING (true);
CREATE POLICY "Public can read saint_themes" ON saint_themes FOR SELECT USING (true);
CREATE POLICY "Public can read saint_lineages" ON saint_lineages FOR SELECT USING (true);
CREATE POLICY "Public can read paper_themes" ON paper_themes FOR SELECT USING (true);
CREATE POLICY "Public can read dialogue_themes" ON dialogue_themes FOR SELECT USING (true);
CREATE POLICY "Public can read dialogue_participants" ON dialogue_participants FOR SELECT USING (true);
CREATE POLICY "Public can read relationships" ON relationships FOR SELECT USING (deleted_at IS NULL);

-- Users can read their own assessment results
CREATE POLICY "Users can read own assessment results" ON assessment_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own assessment results
CREATE POLICY "Users can insert own assessment results" ON assessment_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Admin full access (to be expanded based on role check)
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

-- ============================================================================
-- NOTES
-- ============================================================================

/*
DESIGN PRINCIPLES:
1. Minimal core entities - no overloading
2. Hybrid relationship strategy (specific junction + universal graph)
3. Full-text search built-in from day one
4. Soft delete pattern throughout
5. RLS security from the start
6. Performance indexes on all query patterns
7. Automatic search vector updates via triggers
8. Recursive lineage hierarchy support
9. JSONB for flexible schema evolution (assessment results)
10. Graph-ready architecture for future visualization

FUTURE CAPABILITIES ENABLED:
- Knowledge graph visualization
- Influence mapping between saints
- Citation networks
- AI semantic search
- Personalized learning recommendations
- Thematic clustering
- Timeline exploration
- Lineage tree visualization

SCALABILITY CONSIDERATIONS:
- Indexed for common query patterns
- Partitioning-ready (by year/date if needed)
- Soft delete allows audit trails
- JSONB allows schema flexibility
- Universal relationships table enables arbitrary connections
*/
