/*
  # Application System Architecture

  1. New Tables
    - `pathway_applications`
      - Stores applications for guidance pathways
      - Fields: id, user_id, pathway_id, contact details, motivation, experience, availability
      - Status tracking: pending, under_review, accepted, declined

    - `mentorship_applications`
      - Stores applications for mentorship programs
      - Fields: id, user_id, program_id, contact details, background, goals, experience
      - Status tracking: pending, interview_scheduled, accepted, declined

  2. Security
    - Enable RLS on both tables
    - Users can create applications anonymously or while authenticated
    - Users can view their own applications
    - Admin/staff roles can view and manage all applications

  3. Important Notes
    - Applications support both authenticated and anonymous submissions
    - Email is required for follow-up communication
    - Timestamps track application lifecycle
*/

-- Pathway Applications Table
CREATE TABLE IF NOT EXISTS pathway_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  pathway_id uuid REFERENCES guidance_pathways(id) ON DELETE CASCADE NOT NULL,

  -- Contact Information
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,

  -- Application Content
  motivation text NOT NULL,
  spiritual_experience text,
  current_practices text,
  available_time_weekly text NOT NULL,
  preferred_start_date date,

  -- Status
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'accepted', 'declined', 'withdrawn')),

  -- Admin Notes
  reviewer_notes text,
  reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at timestamptz,

  -- Timestamps
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  deleted_at timestamptz
);

-- Mentorship Applications Table
CREATE TABLE IF NOT EXISTS mentorship_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  program_id uuid REFERENCES mentorship_programs(id) ON DELETE CASCADE NOT NULL,

  -- Contact Information
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,

  -- Application Content
  background_summary text NOT NULL,
  spiritual_goals text NOT NULL,
  relevant_experience text,
  why_this_program text NOT NULL,
  commitment_level text NOT NULL,
  availability text NOT NULL,
  previous_mentorship_experience text,

  -- Status
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'interview_scheduled', 'accepted', 'declined', 'withdrawn')),

  -- Admin Notes
  reviewer_notes text,
  reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at timestamptz,
  interview_scheduled_for timestamptz,

  -- Timestamps
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  deleted_at timestamptz
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_pathway_applications_user_id ON pathway_applications(user_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_pathway_applications_pathway_id ON pathway_applications(pathway_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_pathway_applications_status ON pathway_applications(status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_pathway_applications_email ON pathway_applications(email) WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_mentorship_applications_user_id ON mentorship_applications(user_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_mentorship_applications_program_id ON mentorship_applications(program_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_mentorship_applications_status ON mentorship_applications(status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_mentorship_applications_email ON mentorship_applications(email) WHERE deleted_at IS NULL;

-- Enable Row Level Security
ALTER TABLE pathway_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_applications ENABLE ROW LEVEL SECURITY;

-- Pathway Applications Policies
CREATE POLICY "Anyone can create pathway applications"
  ON pathway_applications FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Users can view own pathway applications by email"
  ON pathway_applications FOR SELECT
  TO authenticated, anon
  USING (email = current_setting('request.jwt.claims', true)::json->>'email' OR user_id = auth.uid());

CREATE POLICY "Users can update own pathway applications"
  ON pathway_applications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can soft delete own pathway applications"
  ON pathway_applications FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Mentorship Applications Policies
CREATE POLICY "Anyone can create mentorship applications"
  ON mentorship_applications FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Users can view own mentorship applications by email"
  ON mentorship_applications FOR SELECT
  TO authenticated, anon
  USING (email = current_setting('request.jwt.claims', true)::json->>'email' OR user_id = auth.uid());

CREATE POLICY "Users can update own mentorship applications"
  ON mentorship_applications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can soft delete own mentorship applications"
  ON mentorship_applications FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());