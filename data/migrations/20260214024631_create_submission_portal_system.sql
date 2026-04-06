/*
  # Create Submission Portal System

  ## Overview
  Establishes a comprehensive content submission and review system for 
  community-contributed scholarly content, research, media, and proposals.

  ## New Tables
  
  ### `submissions`
  Stores all content submissions from contributors
  - `id` (uuid, primary key)
  - `submission_type` (enum) - Type of submission
  - `title` (text) - Submission title
  - `abstract` (text) - Brief summary
  - `content` (text) - Full submission content
  - `attachments_json` (jsonb) - File URLs and metadata
  - `user_id` (uuid, nullable) - Authenticated submitter
  - `contact_name` (text) - Submitter name
  - `contact_email` (text) - Contact email
  - `contact_affiliation` (text, nullable) - Institutional affiliation
  - `status` (enum) - Submission workflow status
  - `admin_notes` (text, nullable) - Internal review notes
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### `submission_reviews`
  Tracks editorial review process
  - `id` (uuid, primary key)
  - `submission_id` (uuid) - References submission
  - `reviewer_id` (uuid) - References admin/reviewer
  - `review_notes` (text) - Detailed feedback
  - `decision` (enum) - Review outcome
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on both tables
  - Submitters can read their own submissions
  - Anyone authenticated can create submissions
  - Only admins can review and approve submissions
  
  ## Notes
  - Approved submissions should be manually migrated to appropriate content tables
  - Attachments stored as JSON array with URLs and metadata
  - Email notifications handled separately
*/

-- Create submission type enum
DO $$ BEGIN
  CREATE TYPE submission_type AS ENUM (
    'research_paper',
    'dialogue_proposal',
    'interview_proposal',
    'sacred_media',
    'practice_submission',
    'article_essay',
    'conference_workshop',
    'sacred_text'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create submission status enum
DO $$ BEGIN
  CREATE TYPE submission_status AS ENUM (
    'draft',
    'submitted',
    'under_review',
    'revision_requested',
    'approved',
    'published',
    'declined',
    'archived'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create review decision enum
DO $$ BEGIN
  CREATE TYPE review_decision AS ENUM (
    'approve',
    'request_revision',
    'decline'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_type submission_type NOT NULL,
  title text NOT NULL,
  abstract text NOT NULL,
  content text NOT NULL,
  attachments_json jsonb DEFAULT '[]'::jsonb,
  user_id uuid REFERENCES users(id),
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_affiliation text,
  status submission_status DEFAULT 'submitted' NOT NULL,
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create submission reviews table
CREATE TABLE IF NOT EXISTS submission_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES submissions(id) ON DELETE CASCADE NOT NULL,
  reviewer_id uuid REFERENCES users(id) NOT NULL,
  review_notes text NOT NULL,
  decision review_decision NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE submission_reviews ENABLE ROW LEVEL SECURITY;

-- Submissions policies

-- Anyone can create a submission (even anonymous users)
CREATE POLICY "Anyone can create submissions"
  ON submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Submitters can view their own submissions
CREATE POLICY "Users can view own submissions"
  ON submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can view all submissions
CREATE POLICY "Admins can view all submissions"
  ON submissions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Admins can update submissions
CREATE POLICY "Admins can update submissions"
  ON submissions
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Submission reviews policies

-- Only admins can create reviews
CREATE POLICY "Admins can create reviews"
  ON submission_reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Admins can view all reviews
CREATE POLICY "Admins can view all reviews"
  ON submission_reviews
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Submitters can view reviews of their submissions
CREATE POLICY "Users can view reviews of own submissions"
  ON submission_reviews
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM submissions
      WHERE submissions.id = submission_reviews.submission_id
      AND submissions.user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_type ON submissions(submission_type);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submission_reviews_submission_id ON submission_reviews(submission_id);
CREATE INDEX IF NOT EXISTS idx_submission_reviews_reviewer_id ON submission_reviews(reviewer_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TRIGGER update_submissions_updated_at
    BEFORE UPDATE ON submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
