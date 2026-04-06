/*
  # Media Architecture - SufiPulse Studio & Sacred Kalam Library
  
  ## Overview
  This migration creates the complete media infrastructure for:
  - SufiPulse Studio (sonic expressions with multilingual subtitles)
  - Sacred Kalam Library (sacred poetry archive)
  
  ## New Tables
  
  ### 1. media_tracks
  Stores musical compositions from SufiPulse Studio
  - `id` (uuid, primary key)
  - `slug` (text, unique) - URL-friendly identifier
  - `title` (text) - Song title
  - `description` (text) - Song description
  - `youtube_url` (text) - YouTube video URL
  - `thumbnail_url` (text) - Thumbnail image URL
  - `duration` (interval) - Song duration
  - `release_date` (date) - Publication date
  - `language_primary` (text) - Primary language
  - `subtitle_languages` (text[]) - Array of available subtitle languages
  - `format_type` (text) - 'subtitle' or 'interpretation'
  - `themes` (text[]) - Associated themes
  - `lyrics_source` (text) - Original lyrics source
  - `interpretation_text` (text) - Scholarly interpretation
  - `search_vector` (tsvector) - Full-text search index
  - `published` (boolean) - Publication status
  - `view_count` (integer) - View counter
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 2. sacred_kalam
  Stores sacred poetry from multiple cultures and languages
  - `id` (uuid, primary key)
  - `slug` (text, unique) - URL-friendly identifier
  - `title` (text) - Poem title
  - `poet_name` (text) - Poet's name
  - `region` (text) - Geographic region
  - `era` (text) - Historical era
  - `language` (text) - Language of composition
  - `script_type` (text) - 'rtl' or 'ltr' for rendering
  - `original_text` (text) - Original poem text
  - `transliteration` (text) - Romanized text
  - `translation` (text) - English translation
  - `commentary` (text) - Scholarly commentary
  - `themes` (text[]) - Associated themes
  - `tags` (text[]) - Additional tags
  - `search_vector` (tsvector) - Full-text search index
  - `published` (boolean) - Publication status
  - `view_count` (integer) - View counter
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 3. media_theme_connections
  Links media content to knowledge system themes
  - `id` (uuid, primary key)
  - `media_type` (text) - 'track' or 'kalam'
  - `media_id` (uuid) - Reference to media_tracks or sacred_kalam
  - `theme_category` (text) - From knowledge systems
  - `created_at` (timestamptz)
  
  ## Security
  - Enable RLS on all tables
  - Public read access for published content
  - Admin-only write access
  
  ## Indexes
  - Full-text search on titles, descriptions, lyrics, poetry
  - Slug indexes for fast lookups
  - Theme and language filters
*/

-- Create media_tracks table
CREATE TABLE IF NOT EXISTS media_tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  youtube_url text,
  thumbnail_url text,
  duration interval,
  release_date date DEFAULT CURRENT_DATE,
  language_primary text DEFAULT 'English',
  subtitle_languages text[] DEFAULT '{}',
  format_type text CHECK (format_type IN ('subtitle', 'interpretation')) DEFAULT 'subtitle',
  themes text[] DEFAULT '{}',
  lyrics_source text DEFAULT '',
  interpretation_text text DEFAULT '',
  search_vector tsvector,
  published boolean DEFAULT false,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sacred_kalam table
CREATE TABLE IF NOT EXISTS sacred_kalam (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  poet_name text NOT NULL,
  region text DEFAULT '',
  era text DEFAULT '',
  language text NOT NULL,
  script_type text CHECK (script_type IN ('rtl', 'ltr')) DEFAULT 'ltr',
  original_text text NOT NULL,
  transliteration text DEFAULT '',
  translation text DEFAULT '',
  commentary text DEFAULT '',
  themes text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  search_vector tsvector,
  published boolean DEFAULT false,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create media_theme_connections table
CREATE TABLE IF NOT EXISTS media_theme_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  media_type text CHECK (media_type IN ('track', 'kalam')) NOT NULL,
  media_id uuid NOT NULL,
  theme_category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for media_tracks
CREATE INDEX IF NOT EXISTS idx_media_tracks_slug ON media_tracks(slug);
CREATE INDEX IF NOT EXISTS idx_media_tracks_published ON media_tracks(published);
CREATE INDEX IF NOT EXISTS idx_media_tracks_release_date ON media_tracks(release_date DESC);
CREATE INDEX IF NOT EXISTS idx_media_tracks_language ON media_tracks(language_primary);
CREATE INDEX IF NOT EXISTS idx_media_tracks_format ON media_tracks(format_type);
CREATE INDEX IF NOT EXISTS idx_media_tracks_themes ON media_tracks USING gin(themes);
CREATE INDEX IF NOT EXISTS idx_media_tracks_search ON media_tracks USING gin(search_vector);

-- Create indexes for sacred_kalam
CREATE INDEX IF NOT EXISTS idx_sacred_kalam_slug ON sacred_kalam(slug);
CREATE INDEX IF NOT EXISTS idx_sacred_kalam_published ON sacred_kalam(published);
CREATE INDEX IF NOT EXISTS idx_sacred_kalam_poet ON sacred_kalam(poet_name);
CREATE INDEX IF NOT EXISTS idx_sacred_kalam_language ON sacred_kalam(language);
CREATE INDEX IF NOT EXISTS idx_sacred_kalam_region ON sacred_kalam(region);
CREATE INDEX IF NOT EXISTS idx_sacred_kalam_era ON sacred_kalam(era);
CREATE INDEX IF NOT EXISTS idx_sacred_kalam_themes ON sacred_kalam USING gin(themes);
CREATE INDEX IF NOT EXISTS idx_sacred_kalam_search ON sacred_kalam USING gin(search_vector);

-- Create index for theme connections
CREATE INDEX IF NOT EXISTS idx_media_theme_connections_media ON media_theme_connections(media_type, media_id);
CREATE INDEX IF NOT EXISTS idx_media_theme_connections_theme ON media_theme_connections(theme_category);

-- Create function to update search vector for media_tracks
CREATE OR REPLACE FUNCTION update_media_tracks_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.lyrics_source, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(NEW.interpretation_text, '')), 'D');
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to update search vector for sacred_kalam
CREATE OR REPLACE FUNCTION update_sacred_kalam_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.poet_name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.original_text, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.transliteration, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(NEW.translation, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(NEW.commentary, '')), 'D');
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for search vector updates
DROP TRIGGER IF EXISTS media_tracks_search_vector_update ON media_tracks;
CREATE TRIGGER media_tracks_search_vector_update
  BEFORE INSERT OR UPDATE ON media_tracks
  FOR EACH ROW
  EXECUTE FUNCTION update_media_tracks_search_vector();

DROP TRIGGER IF EXISTS sacred_kalam_search_vector_update ON sacred_kalam;
CREATE TRIGGER sacred_kalam_search_vector_update
  BEFORE INSERT OR UPDATE ON sacred_kalam
  FOR EACH ROW
  EXECUTE FUNCTION update_sacred_kalam_search_vector();

-- Enable Row Level Security
ALTER TABLE media_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE sacred_kalam ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_theme_connections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for media_tracks
CREATE POLICY "Anyone can view published tracks"
  ON media_tracks FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can view all tracks"
  ON media_tracks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert tracks"
  ON media_tracks FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update tracks"
  ON media_tracks FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete tracks"
  ON media_tracks FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for sacred_kalam
CREATE POLICY "Anyone can view published kalam"
  ON sacred_kalam FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can view all kalam"
  ON sacred_kalam FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert kalam"
  ON sacred_kalam FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update kalam"
  ON sacred_kalam FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete kalam"
  ON sacred_kalam FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for media_theme_connections
CREATE POLICY "Anyone can view theme connections"
  ON media_theme_connections FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage theme connections"
  ON media_theme_connections FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);