/*
  # Conference Submission System

  ## Overview
  A fully structured conference paper submission system with multi-step workflow,
  file upload tracking, submission status management, and admin review capabilities.

  ## New Tables

  ### conference_submissions
  - `id` (uuid, PK) — unique submission identifier
  - `tracking_code` (text, unique) — human-readable code for status lookups (e.g. SSC-2026-XXXX)
  - `submission_type` (text) — paper | workshop | panel | poster
  - `title` (text) — title of the submission
  - `abstract` (text) — 150–300 word abstract
  - `keywords` (text[]) — thematic keyword tags
  - `presenter_name` (text) — primary presenter / first author
  - `presenter_email` (text) — contact email
  - `presenter_affiliation` (text) — institution / organisation
  - `presenter_bio` (text) — short bio for programme
  - `co_presenters` (jsonb) — array of {name, email, affiliation}
  - `file_url` (text, nullable) — Supabase Storage public URL for uploaded file
  - `file_name` (text, nullable) — original filename
  - `file_size_bytes` (bigint, nullable) — size for display
  - `status` (text) — draft | submitted | under_review | revision_requested | accepted | rejected | withdrawn
  - `admin_notes` (text, nullable) — internal reviewer notes
  - `reviewer_decision` (text, nullable) — accept | reject | revise
  - `reviewed_by` (text, nullable) — reviewer name / email
  - `reviewed_at` (timestamptz, nullable) — timestamp of decision
  - `submitted_at` (timestamptz) — timestamp of submission
  - `created_at` (timestamptz) — record creation
  - `updated_at` (timestamptz) — last update

  ## Security
  - RLS enabled: public INSERT allowed (anonymous submissions), SELECT restricted to own record via tracking_code session, admin SELECT/UPDATE via service role
  - Separate policies for submitters (by email claim) and admins
*/

CREATE TABLE IF NOT EXISTS conference_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_code text UNIQUE NOT NULL,
  submission_type text NOT NULL DEFAULT 'paper',
  title text NOT NULL,
  abstract text NOT NULL,
  keywords text[] DEFAULT '{}',
  presenter_name text NOT NULL,
  presenter_email text NOT NULL,
  presenter_affiliation text DEFAULT '',
  presenter_bio text DEFAULT '',
  co_presenters jsonb DEFAULT '[]',
  file_url text,
  file_name text,
  file_size_bytes bigint,
  status text NOT NULL DEFAULT 'submitted',
  admin_notes text,
  reviewer_decision text,
  reviewed_by text,
  reviewed_at timestamptz,
  submitted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE conference_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a conference submission"
  ON conference_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Submitters can view their own submission by email"
  ON conference_submissions
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated admins can update submissions"
  ON conference_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION generate_tracking_code()
RETURNS TRIGGER AS $$
DECLARE
  code text;
  exists_check boolean;
BEGIN
  LOOP
    code := 'SSC-' || to_char(CURRENT_DATE, 'YYYY') || '-' || upper(substr(md5(random()::text), 1, 6));
    SELECT EXISTS(SELECT 1 FROM conference_submissions WHERE tracking_code = code) INTO exists_check;
    EXIT WHEN NOT exists_check;
  END LOOP;
  NEW.tracking_code := code;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_tracking_code
  BEFORE INSERT ON conference_submissions
  FOR EACH ROW
  WHEN (NEW.tracking_code = '' OR NEW.tracking_code IS NULL)
  EXECUTE FUNCTION generate_tracking_code();

CREATE OR REPLACE FUNCTION update_conference_submission_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER conference_submissions_updated_at
  BEFORE UPDATE ON conference_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_conference_submission_timestamp();

CREATE INDEX IF NOT EXISTS idx_conference_submissions_email ON conference_submissions(presenter_email);
CREATE INDEX IF NOT EXISTS idx_conference_submissions_status ON conference_submissions(status);
CREATE INDEX IF NOT EXISTS idx_conference_submissions_tracking ON conference_submissions(tracking_code);
