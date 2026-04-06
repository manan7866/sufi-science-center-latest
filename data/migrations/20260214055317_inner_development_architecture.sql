/*
  # Inner Development Architecture

  1. New Tables
    - `practices`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `category` (text) - meditation, dhikr, contemplation, breath_work, visualization
      - `difficulty_level` (text) - beginner, intermediate, advanced
      - `duration_minutes` (integer)
      - `description` (text)
      - `instructions` (text)
      - `benefits` (text[])
      - `prerequisites` (text[])
      - `tradition_source` (text) - Sufi order or tradition
      - `video_url` (text, nullable)
      - `audio_url` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `transformation_stages`
      - `id` (uuid, primary key)
      - `title` (text) - e.g., "Tawbah (Repentance)", "Sabr (Patience)"
      - `slug` (text, unique)
      - `arabic_name` (text)
      - `stage_number` (integer) - ordering
      - `category` (text) - maqam (station) or hal (state)
      - `description` (text)
      - `characteristics` (text[])
      - `practices_associated` (text[])
      - `classical_references` (text[])
      - `challenges` (text[])
      - `signs_of_progress` (text[])
      - `created_at` (timestamptz)
    
    - `emotional_modules`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `focus_area` (text) - anger, fear, grief, joy, love, compassion
      - `description` (text)
      - `sufi_approach` (text)
      - `modern_psychology` (text)
      - `practices` (text[])
      - `reflection_questions` (text[])
      - `resources` (jsonb)
      - `created_at` (timestamptz)
    
    - `study_circles`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `focus_text` (text) - primary text being studied
      - `facilitator` (text)
      - `meeting_frequency` (text) - weekly, biweekly, monthly
      - `duration_weeks` (integer)
      - `capacity` (integer)
      - `current_enrollment` (integer, default 0)
      - `status` (text) - open, closed, upcoming, completed
      - `start_date` (date)
      - `end_date` (date, nullable)
      - `meeting_format` (text) - online, in_person, hybrid
      - `prerequisites` (text[])
      - `syllabus` (jsonb)
      - `created_at` (timestamptz)
    
    - `mentorship_programs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `mentor_name` (text)
      - `mentor_bio` (text)
      - `mentor_lineage` (text)
      - `focus_areas` (text[])
      - `program_duration_months` (integer)
      - `meeting_frequency` (text)
      - `format` (text) - one_on_one, small_group
      - `capacity` (integer)
      - `current_participants` (integer, default 0)
      - `status` (text) - accepting, waitlist, closed
      - `requirements` (text[])
      - `application_process` (text)
      - `created_at` (timestamptz)
    
    - `practice_resources`
      - `id` (uuid, primary key)
      - `practice_id` (uuid, foreign key)
      - `resource_type` (text) - video, audio, pdf, article, book
      - `title` (text)
      - `url` (text)
      - `description` (text)
      - `duration_minutes` (integer, nullable)
      - `created_at` (timestamptz)
    
    - `guidance_pathways`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `target_audience` (text)
      - `assessment_profile` (jsonb) - matching criteria from assessment
      - `recommended_practices` (uuid[]) - references practices
      - `recommended_stages` (uuid[]) - references transformation_stages
      - `duration_weeks` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for all content tables
    - Admin-only write access (future implementation)
*/

-- Practices Table
CREATE TABLE IF NOT EXISTS practices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  difficulty_level text NOT NULL DEFAULT 'beginner',
  duration_minutes integer NOT NULL DEFAULT 15,
  description text NOT NULL,
  instructions text NOT NULL,
  benefits text[] DEFAULT '{}',
  prerequisites text[] DEFAULT '{}',
  tradition_source text,
  video_url text,
  audio_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE practices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for practices"
  ON practices FOR SELECT
  TO anon, authenticated
  USING (true);

-- Transformation Stages Table
CREATE TABLE IF NOT EXISTS transformation_stages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  arabic_name text NOT NULL,
  stage_number integer NOT NULL,
  category text NOT NULL DEFAULT 'maqam',
  description text NOT NULL,
  characteristics text[] DEFAULT '{}',
  practices_associated text[] DEFAULT '{}',
  classical_references text[] DEFAULT '{}',
  challenges text[] DEFAULT '{}',
  signs_of_progress text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE transformation_stages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for transformation_stages"
  ON transformation_stages FOR SELECT
  TO anon, authenticated
  USING (true);

-- Emotional Modules Table
CREATE TABLE IF NOT EXISTS emotional_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  focus_area text NOT NULL,
  description text NOT NULL,
  sufi_approach text NOT NULL,
  modern_psychology text NOT NULL,
  practices text[] DEFAULT '{}',
  reflection_questions text[] DEFAULT '{}',
  resources jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE emotional_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for emotional_modules"
  ON emotional_modules FOR SELECT
  TO anon, authenticated
  USING (true);

-- Study Circles Table
CREATE TABLE IF NOT EXISTS study_circles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  focus_text text NOT NULL,
  facilitator text NOT NULL,
  meeting_frequency text NOT NULL,
  duration_weeks integer NOT NULL,
  capacity integer NOT NULL,
  current_enrollment integer DEFAULT 0,
  status text NOT NULL DEFAULT 'upcoming',
  start_date date NOT NULL,
  end_date date,
  meeting_format text NOT NULL DEFAULT 'online',
  prerequisites text[] DEFAULT '{}',
  syllabus jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE study_circles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for study_circles"
  ON study_circles FOR SELECT
  TO anon, authenticated
  USING (true);

-- Mentorship Programs Table
CREATE TABLE IF NOT EXISTS mentorship_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  mentor_name text NOT NULL,
  mentor_bio text NOT NULL,
  mentor_lineage text,
  focus_areas text[] DEFAULT '{}',
  program_duration_months integer NOT NULL,
  meeting_frequency text NOT NULL,
  format text NOT NULL DEFAULT 'one_on_one',
  capacity integer NOT NULL,
  current_participants integer DEFAULT 0,
  status text NOT NULL DEFAULT 'accepting',
  requirements text[] DEFAULT '{}',
  application_process text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mentorship_programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for mentorship_programs"
  ON mentorship_programs FOR SELECT
  TO anon, authenticated
  USING (true);

-- Practice Resources Table
CREATE TABLE IF NOT EXISTS practice_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id uuid REFERENCES practices(id) ON DELETE CASCADE,
  resource_type text NOT NULL,
  title text NOT NULL,
  url text NOT NULL,
  description text NOT NULL,
  duration_minutes integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE practice_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for practice_resources"
  ON practice_resources FOR SELECT
  TO anon, authenticated
  USING (true);

-- Guidance Pathways Table
CREATE TABLE IF NOT EXISTS guidance_pathways (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  target_audience text NOT NULL,
  assessment_profile jsonb DEFAULT '{}',
  recommended_practices uuid[] DEFAULT '{}',
  recommended_stages uuid[] DEFAULT '{}',
  duration_weeks integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE guidance_pathways ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for guidance_pathways"
  ON guidance_pathways FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_practices_category ON practices(category);
CREATE INDEX IF NOT EXISTS idx_practices_difficulty ON practices(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_practices_slug ON practices(slug);
CREATE INDEX IF NOT EXISTS idx_transformation_stages_number ON transformation_stages(stage_number);
CREATE INDEX IF NOT EXISTS idx_study_circles_status ON study_circles(status);
CREATE INDEX IF NOT EXISTS idx_mentorship_status ON mentorship_programs(status);
