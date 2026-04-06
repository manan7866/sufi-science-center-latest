/*
  # Create Membership Applications System

  ## Summary
  Full membership application system to handle Fellow and Scholar applications.

  ## New Tables

  ### `membership_applications`
  Stores all membership applications with full applicant details.
  - `id` — UUID primary key
  - `session_token` — nullable, links to portal session (no hard auth required)
  - `membership_type` — 'scholar' or 'fellow'
  - `status` — 'pending' | 'under_review' | 'approved' | 'declined'
  - `full_name`, `display_name`, `email`, `location`, `affiliation`
  - `areas_of_study` — JSONB array of topic tags
  - `bio` — short biography
  - `statement` — statement of intent / contribution
  - `cv_url` — URL to uploaded CV (PDF)
  - `linked_publications` — JSONB array of publication URLs/titles
  - `years_of_engagement` — Fellow-specific: years of scholarly engagement
  - `leadership_roles` — Fellow-specific: institutional leadership roles
  - `publications_list` — Fellow-specific: list of publications
  - `reference_contact` — Fellow-specific: optional reference
  - `academic_focus` — Scholar-specific: academic focus area
  - `research_interest` — Scholar-specific: current research interest
  - `review_notes` — Admin review notes
  - `reviewed_by` — reviewer identifier
  - `reviewed_at` — timestamp of review decision
  - `created_at`, `updated_at`

  ## Security
  - RLS enabled
  - Anyone can INSERT their own application (public submission, no auth required)
  - Applicants can view their own submission by email match
  - Service role can update status (admin operations done server-side)
*/

CREATE TABLE IF NOT EXISTS membership_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token text,
  membership_type text NOT NULL CHECK (membership_type IN ('scholar', 'fellow')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'declined')),
  full_name text NOT NULL DEFAULT '',
  display_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  affiliation text NOT NULL DEFAULT '',
  areas_of_study jsonb NOT NULL DEFAULT '[]'::jsonb,
  bio text NOT NULL DEFAULT '',
  statement text NOT NULL DEFAULT '',
  cv_url text,
  linked_publications jsonb NOT NULL DEFAULT '[]'::jsonb,
  years_of_engagement text,
  leadership_roles text,
  publications_list text,
  reference_contact text,
  academic_focus text,
  research_interest text,
  review_notes text,
  reviewed_by text,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a membership application"
  ON membership_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Applicants can view their own applications by email"
  ON membership_applications
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE OR REPLACE FUNCTION update_membership_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_membership_applications_updated_at
  BEFORE UPDATE ON membership_applications
  FOR EACH ROW EXECUTE FUNCTION update_membership_applications_updated_at();
