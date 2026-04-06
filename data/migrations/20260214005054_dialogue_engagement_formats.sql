/*
  # Dialogue Engagement Formats

  1. New Tables
    - `dialogue_series`
      - Curated conversation series with multi-perspective discussions
      - Fields: title, description, transcript, participants, video_url, themes, published_at
    
    - `hard_talk_sessions`
      - Critical inquiry dialogues with rigorous debate
      - Fields: title, description, transcript, participants, video_url, controversial_points, citations
    
    - `practices_profiles`
      - Applied wisdom and practice frameworks
      - Fields: title, description, methodology, steps, practice_type, related_saints
    
    - `inspiring_interviews`
      - Individual insight interviews with transformation narratives
      - Fields: title, description, transcript, interviewee, video_url, key_clips, themes
    
    - `interview_applications`
      - Application submissions for insight interview participation
      - Fields: name, email, affiliation, field_of_work, summary, themes, status

  2. Security
    - Enable RLS on all tables
    - Public read access for published dialogues
    - Authenticated admin-only write access
    - Applications table requires authentication to submit
*/

-- Dialogue Series Table
CREATE TABLE IF NOT EXISTS dialogue_series (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  transcript text,
  participants jsonb DEFAULT '[]'::jsonb,
  video_url text,
  audio_url text,
  themes jsonb DEFAULT '[]'::jsonb,
  related_saints jsonb DEFAULT '[]'::jsonb,
  related_research jsonb DEFAULT '[]'::jsonb,
  published_at timestamptz DEFAULT now(),
  featured boolean DEFAULT false,
  search_vector tsvector,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Hard Talk Sessions Table
CREATE TABLE IF NOT EXISTS hard_talk_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  transcript text,
  participants jsonb DEFAULT '[]'::jsonb,
  video_url text,
  audio_url text,
  controversial_points jsonb DEFAULT '[]'::jsonb,
  citations jsonb DEFAULT '[]'::jsonb,
  themes jsonb DEFAULT '[]'::jsonb,
  published_at timestamptz DEFAULT now(),
  featured boolean DEFAULT false,
  search_vector tsvector,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Practices Profiles Table
CREATE TABLE IF NOT EXISTS practices_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  methodology text NOT NULL,
  steps jsonb DEFAULT '[]'::jsonb,
  practice_type text NOT NULL,
  duration_minutes integer,
  difficulty_level text,
  related_saints jsonb DEFAULT '[]'::jsonb,
  themes jsonb DEFAULT '[]'::jsonb,
  tags jsonb DEFAULT '[]'::jsonb,
  featured boolean DEFAULT false,
  search_vector tsvector,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Inspiring Interviews Table
CREATE TABLE IF NOT EXISTS inspiring_interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  transcript text,
  interviewee_name text NOT NULL,
  interviewee_affiliation text,
  interviewee_bio text,
  video_url text,
  audio_url text,
  key_clips jsonb DEFAULT '[]'::jsonb,
  themes jsonb DEFAULT '[]'::jsonb,
  related_saints jsonb DEFAULT '[]'::jsonb,
  published_at timestamptz DEFAULT now(),
  featured boolean DEFAULT false,
  search_vector tsvector,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Interview Applications Table
CREATE TABLE IF NOT EXISTS interview_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  affiliation text,
  field_of_work text NOT NULL,
  summary text NOT NULL,
  themes jsonb DEFAULT '[]'::jsonb,
  links jsonb DEFAULT '[]'::jsonb,
  availability jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'pending',
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create search indexes
CREATE INDEX IF NOT EXISTS dialogue_series_search_idx ON dialogue_series USING gin(search_vector);
CREATE INDEX IF NOT EXISTS hard_talk_sessions_search_idx ON hard_talk_sessions USING gin(search_vector);
CREATE INDEX IF NOT EXISTS practices_profiles_search_idx ON practices_profiles USING gin(search_vector);
CREATE INDEX IF NOT EXISTS inspiring_interviews_search_idx ON inspiring_interviews USING gin(search_vector);

-- Create theme indexes for filtering
CREATE INDEX IF NOT EXISTS dialogue_series_themes_idx ON dialogue_series USING gin(themes);
CREATE INDEX IF NOT EXISTS hard_talk_sessions_themes_idx ON hard_talk_sessions USING gin(themes);
CREATE INDEX IF NOT EXISTS practices_profiles_themes_idx ON practices_profiles USING gin(themes);
CREATE INDEX IF NOT EXISTS inspiring_interviews_themes_idx ON inspiring_interviews USING gin(themes);

-- Enable Row Level Security
ALTER TABLE dialogue_series ENABLE ROW LEVEL SECURITY;
ALTER TABLE hard_talk_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE practices_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspiring_interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_applications ENABLE ROW LEVEL SECURITY;

-- Public read policies for published content
CREATE POLICY "Anyone can view published dialogue series"
  ON dialogue_series FOR SELECT
  USING (published_at <= now());

CREATE POLICY "Anyone can view published hard talk sessions"
  ON hard_talk_sessions FOR SELECT
  USING (published_at <= now());

CREATE POLICY "Anyone can view published practices"
  ON practices_profiles FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view published interviews"
  ON inspiring_interviews FOR SELECT
  USING (published_at <= now());

-- Authenticated users can submit applications
CREATE POLICY "Authenticated users can submit applications"
  ON interview_applications FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own applications"
  ON interview_applications FOR SELECT
  TO authenticated
  USING (email = auth.jwt()->>'email');

-- Functions to update search vectors
CREATE OR REPLACE FUNCTION update_dialogue_series_search_vector()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', 
    COALESCE(NEW.title, '') || ' ' || 
    COALESCE(NEW.description, '') || ' ' || 
    COALESCE(NEW.transcript, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_hard_talk_search_vector()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', 
    COALESCE(NEW.title, '') || ' ' || 
    COALESCE(NEW.description, '') || ' ' || 
    COALESCE(NEW.transcript, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_practices_search_vector()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', 
    COALESCE(NEW.title, '') || ' ' || 
    COALESCE(NEW.description, '') || ' ' || 
    COALESCE(NEW.methodology, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_interviews_search_vector()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', 
    COALESCE(NEW.title, '') || ' ' || 
    COALESCE(NEW.description, '') || ' ' || 
    COALESCE(NEW.transcript, '') || ' ' ||
    COALESCE(NEW.interviewee_name, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
DROP TRIGGER IF EXISTS dialogue_series_search_update ON dialogue_series;
CREATE TRIGGER dialogue_series_search_update
  BEFORE INSERT OR UPDATE ON dialogue_series
  FOR EACH ROW EXECUTE FUNCTION update_dialogue_series_search_vector();

DROP TRIGGER IF EXISTS hard_talk_search_update ON hard_talk_sessions;
CREATE TRIGGER hard_talk_search_update
  BEFORE INSERT OR UPDATE ON hard_talk_sessions
  FOR EACH ROW EXECUTE FUNCTION update_hard_talk_search_vector();

DROP TRIGGER IF EXISTS practices_search_update ON practices_profiles;
CREATE TRIGGER practices_search_update
  BEFORE INSERT OR UPDATE ON practices_profiles
  FOR EACH ROW EXECUTE FUNCTION update_practices_search_vector();

DROP TRIGGER IF EXISTS interviews_search_update ON inspiring_interviews;
CREATE TRIGGER interviews_search_update
  BEFORE INSERT OR UPDATE ON inspiring_interviews
  FOR EACH ROW EXECUTE FUNCTION update_interviews_search_vector();
