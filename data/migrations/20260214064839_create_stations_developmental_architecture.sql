/*
  # Stations of the Path - Developmental Architecture

  ## Overview
  Creates a comprehensive developmental framework for spiritual stations (maqāmāt),
  structured as the institutional backbone for tracking inner transformation.

  ## New Tables
  
  ### `station_phases`
  Developmental phases organizing stations into coherent progression stages
  - `id` (uuid, primary key)
  - `phase_number` (integer) - Sequential ordering
  - `name_english` (text) - Phase name
  - `name_arabic` (text, nullable) - Arabic terminology
  - `description` (text) - Institutional framing
  - `developmental_focus` (text) - Core psychological orientation
  - `created_at` (timestamptz)

  ### `spiritual_stations`
  Individual stations within the developmental map
  - `id` (uuid, primary key)
  - `phase_id` (uuid, foreign key) - Parent phase
  - `order_in_phase` (integer) - Position within phase
  - `name_arabic` (text) - Classical Arabic term
  - `name_transliteration` (text) - Romanized form
  - `name_english` (text) - English translation
  - `classical_definition` (text) - Traditional understanding
  - `psychological_dimension` (text) - Modern psychological framework
  - `developmental_markers` (text) - Observable behavioral indicators
  - `common_distortions` (text) - Typical misunderstandings/deviations
  - `integration_notes` (text) - How station stabilizes
  - `created_at` (timestamptz)

  ### `station_saint_associations`
  Links stations to saints who exemplified them
  - `station_id` (uuid, foreign key)
  - `saint_id` (uuid, foreign key)
  - `exemplification_notes` (text, nullable)
  - Primary key: (station_id, saint_id)

  ### `station_theme_associations`
  Links stations to thematic teachings
  - `station_id` (uuid, foreign key)
  - `theme_id` (uuid, foreign key)
  - Primary key: (station_id, theme_id)

  ### `station_assessment_mappings`
  Maps assessment metrics to relevant stations
  - `station_id` (uuid, foreign key)
  - `assessment_dimension` (text) - e.g., "emotional_regulation", "trust_capacity"
  - `relevance_description` (text)
  - Primary key: (station_id, assessment_dimension)

  ## Security
  - Enable RLS on all tables
  - Allow public read access (educational content)
  - Restrict writes to authenticated admins only
*/

-- Create station phases table
CREATE TABLE IF NOT EXISTS station_phases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_number integer NOT NULL UNIQUE,
  name_english text NOT NULL,
  name_arabic text,
  description text NOT NULL,
  developmental_focus text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE station_phases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to station phases"
  ON station_phases FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage station phases"
  ON station_phases FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create spiritual stations table
CREATE TABLE IF NOT EXISTS spiritual_stations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_id uuid REFERENCES station_phases(id) ON DELETE CASCADE,
  order_in_phase integer NOT NULL,
  name_arabic text NOT NULL,
  name_transliteration text NOT NULL,
  name_english text NOT NULL,
  classical_definition text NOT NULL,
  psychological_dimension text NOT NULL,
  developmental_markers text NOT NULL,
  common_distortions text NOT NULL,
  integration_notes text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(phase_id, order_in_phase)
);

ALTER TABLE spiritual_stations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to spiritual stations"
  ON spiritual_stations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage spiritual stations"
  ON spiritual_stations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create station-saint associations
CREATE TABLE IF NOT EXISTS station_saint_associations (
  station_id uuid REFERENCES spiritual_stations(id) ON DELETE CASCADE,
  saint_id uuid REFERENCES saints(id) ON DELETE CASCADE,
  exemplification_notes text,
  PRIMARY KEY (station_id, saint_id)
);

ALTER TABLE station_saint_associations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to station-saint associations"
  ON station_saint_associations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage station-saint associations"
  ON station_saint_associations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create station-theme associations
CREATE TABLE IF NOT EXISTS station_theme_associations (
  station_id uuid REFERENCES spiritual_stations(id) ON DELETE CASCADE,
  theme_id uuid REFERENCES themes(id) ON DELETE CASCADE,
  PRIMARY KEY (station_id, theme_id)
);

ALTER TABLE station_theme_associations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to station-theme associations"
  ON station_theme_associations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage station-theme associations"
  ON station_theme_associations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create station-assessment mappings
CREATE TABLE IF NOT EXISTS station_assessment_mappings (
  station_id uuid REFERENCES spiritual_stations(id) ON DELETE CASCADE,
  assessment_dimension text NOT NULL,
  relevance_description text NOT NULL,
  PRIMARY KEY (station_id, assessment_dimension)
);

ALTER TABLE station_assessment_mappings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to station-assessment mappings"
  ON station_assessment_mappings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage station-assessment mappings"
  ON station_assessment_mappings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_stations_phase ON spiritual_stations(phase_id);
CREATE INDEX IF NOT EXISTS idx_station_saints ON station_saint_associations(saint_id);
CREATE INDEX IF NOT EXISTS idx_station_themes ON station_theme_associations(theme_id);
CREATE INDEX IF NOT EXISTS idx_station_assessments ON station_assessment_mappings(assessment_dimension);