/*
  # NextGEN Sufi Seeker Platform — Database Architecture

  ## Overview
  Establishes the professional disciplines registry and extends the users table
  for the NextGEN Sufi Seeker Platform. Enables structured professional engagement
  tracking, discipline circle membership, and badge assignment.

  ## New Tables

  ### professional_disciplines
  - `id` (uuid, PK)
  - `slug` (text, unique) — URL-safe identifier
  - `title` (text) — discipline display name
  - `category` (text) — parent category name
  - `category_slug` (text) — URL-safe category key
  - `description` (text) — professional framing
  - `ethical_tensions` (text) — unresolved moral challenges in field
  - `sufi_lens` (text) — how classical metaphysics engages those tensions
  - `reflection_prompts` (text[]) — structured reflection questions
  - `display_order` (int) — sort order within category
  - `is_active` (boolean) — visibility flag
  - `created_at` (timestamptz)

  ### nextgen_memberships
  - `id` (uuid, PK)
  - `user_id` (uuid, FK → auth.users)
  - `discipline_slug` (text)
  - `role` (text) — member | scholar | fellow
  - `joined_at`, `created_at` (timestamptz)

  ## Modified Tables

  ### users (additive only — no destructive changes)
  - `profession_category` (text)
  - `profession_slug` (text)
  - `nextgen_member` (boolean, default false)
  - `nextgen_role` (text, default 'member')

  ## Security
  - RLS enabled; disciplines are publicly readable
  - Memberships restricted to owner via auth.uid()
*/

CREATE TABLE IF NOT EXISTS professional_disciplines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  category_slug text NOT NULL,
  description text NOT NULL DEFAULT '',
  ethical_tensions text NOT NULL DEFAULT '',
  sufi_lens text NOT NULL DEFAULT '',
  reflection_prompts text[] DEFAULT '{}',
  display_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE professional_disciplines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active disciplines"
  ON professional_disciplines
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE TABLE IF NOT EXISTS nextgen_memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  discipline_slug text NOT NULL,
  role text NOT NULL DEFAULT 'member',
  joined_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, discipline_slug)
);

ALTER TABLE nextgen_memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own memberships"
  ON nextgen_memberships
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own memberships"
  ON nextgen_memberships
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own memberships"
  ON nextgen_memberships
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'profession_category'
  ) THEN
    ALTER TABLE users ADD COLUMN profession_category text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'profession_slug'
  ) THEN
    ALTER TABLE users ADD COLUMN profession_slug text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'nextgen_member'
  ) THEN
    ALTER TABLE users ADD COLUMN nextgen_member boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'nextgen_role'
  ) THEN
    ALTER TABLE users ADD COLUMN nextgen_role text DEFAULT 'member';
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_professional_disciplines_slug ON professional_disciplines(slug);
CREATE INDEX IF NOT EXISTS idx_professional_disciplines_category ON professional_disciplines(category_slug);
CREATE INDEX IF NOT EXISTS idx_nextgen_memberships_user ON nextgen_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_nextgen_memberships_slug ON nextgen_memberships(discipline_slug);
