/*
  # Quranic Thematic Commentary Tables

  ## Purpose
  Stores structured thematic commentary on all 114 Surahs of the Qur'an
  through a Sufi Metaphysical Lens. This is NOT a full tafsir — it is
  concise thematic reflection anchored in classical Sufi scholarship.

  ## Tables
  - `surah_commentary` — Core table storing one record per Surah

  ## Columns
  - `surah_number` (1–114) — Canonical Quranic ordering
  - `arabic_name` — Arabic name of the Surah
  - `english_name` — English translation of the name
  - `revelation_type` — 'meccan' or 'medinan'
  - `core_theme` — One-sentence summary of the Surah's dominant theme
  - `structural_axis` — The governing metaphysical principle (e.g., Unity, Mercy, Covenant)
  - `sufi_reflection` — Short 4–6 line thematic reflection in classical tone
  - `interfaith_resonance` — Optional note on cross-tradition parallels
  - `has_interfaith_note` — Boolean flag for filter queries

  ## Security
  - RLS enabled
  - Public read-only access (no auth required for reading commentary)
  - No write access from client side
*/

CREATE TABLE IF NOT EXISTS surah_commentary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  surah_number integer NOT NULL UNIQUE CHECK (surah_number >= 1 AND surah_number <= 114),
  arabic_name text NOT NULL DEFAULT '',
  english_name text NOT NULL DEFAULT '',
  revelation_type text NOT NULL DEFAULT 'meccan' CHECK (revelation_type IN ('meccan', 'medinan')),
  core_theme text NOT NULL DEFAULT '',
  structural_axis text NOT NULL DEFAULT '',
  sufi_reflection text NOT NULL DEFAULT '',
  interfaith_resonance text DEFAULT NULL,
  has_interfaith_note boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_surah_commentary_number ON surah_commentary(surah_number);
CREATE INDEX IF NOT EXISTS idx_surah_commentary_revelation ON surah_commentary(revelation_type);
CREATE INDEX IF NOT EXISTS idx_surah_commentary_interfaith ON surah_commentary(has_interfaith_note);
CREATE INDEX IF NOT EXISTS idx_surah_commentary_axis ON surah_commentary(structural_axis);

ALTER TABLE surah_commentary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read surah commentary"
  ON surah_commentary
  FOR SELECT
  TO anon, authenticated
  USING (true);
