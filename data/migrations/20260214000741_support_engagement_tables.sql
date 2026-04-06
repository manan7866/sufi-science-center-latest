/*
  # Support & Engagement Tables
  
  ## Overview
  Tables to support institutional engagement including donations, volunteer applications,
  and institutional collaborations. Designed with dignity and transparency in mind.
  
  ## New Tables
  
  ### donations
  Track financial contributions to the institute
  - `id` (uuid, primary key)
  - `user_id` (uuid, nullable) - Links to authenticated users
  - `amount` (decimal) - Contribution amount
  - `currency` (text) - Currency code (USD, EUR, etc.)
  - `frequency` (enum) - one_time, monthly, annual
  - `transaction_id` (text) - External payment processor ID
  - `status` (enum) - pending, completed, failed, refunded
  - `donor_name` (text) - Name of donor
  - `donor_email` (text) - Email for receipt
  - `message` (text, optional) - Optional message from donor
  - `created_at`, `updated_at`
  
  ### volunteer_applications
  Track individuals interested in contributing to the mission
  - `id` (uuid, primary key)
  - `user_id` (uuid, nullable)
  - `role_type` (enum) - research, content, dialogue, technical, community, translation
  - `full_name` (text)
  - `email` (text)
  - `skills_json` (jsonb) - Flexible storage for role-specific skills
  - `motivation_text` (text)
  - `status` (enum) - pending, under_review, approved, declined
  - `reviewed_at` (timestamptz, nullable)
  - `reviewed_by` (uuid, nullable)
  - `notes` (text) - Internal admin notes
  - `created_at`, `updated_at`
  
  ### collaboration_proposals
  Track institutional partnership proposals
  - `id` (uuid, primary key)
  - `organization_name` (text)
  - `organization_type` (enum) - academic, research, policy, nonprofit, other
  - `contact_name` (text)
  - `contact_email` (text)
  - `contact_phone` (text, optional)
  - `proposal_summary` (text)
  - `proposal_details` (text)
  - `collaboration_type` (enum) - research, dialogue, conference, curriculum, technology, translation
  - `scope` (text)
  - `timeline` (text)
  - `attachment_urls` (jsonb) - Array of document URLs
  - `status` (enum) - submitted, under_review, approved, declined
  - `reviewed_at` (timestamptz, nullable)
  - `reviewed_by` (uuid, nullable)
  - `notes` (text) - Internal admin notes
  - `created_at`, `updated_at`
  
  ## Security
  - RLS enabled on all tables
  - Public can submit (insert) applications and proposals
  - Only authenticated admins can view and manage
  - Donors can view their own donation history if authenticated
  
  ## Indexes
  - Status indexes for admin filtering
  - Email indexes for lookup
  - Created_at indexes for sorting
*/

-- ============================================================================
-- ENUMS
-- ============================================================================

DO $$ BEGIN
  CREATE TYPE donation_frequency AS ENUM ('one_time', 'monthly', 'annual');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE volunteer_role AS ENUM ('research', 'content', 'dialogue', 'technical', 'community', 'translation');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE application_status AS ENUM ('pending', 'under_review', 'approved', 'declined');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE organization_type AS ENUM ('academic', 'research', 'policy', 'nonprofit', 'other');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE collaboration_type AS ENUM ('research', 'dialogue', 'conference', 'curriculum', 'technology', 'translation');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  frequency donation_frequency DEFAULT 'one_time',
  transaction_id TEXT,
  status transaction_status DEFAULT 'pending',
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS volunteer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  role_type volunteer_role NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  skills_json JSONB DEFAULT '{}',
  motivation_text TEXT NOT NULL,
  status application_status DEFAULT 'pending',
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS collaboration_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name TEXT NOT NULL,
  organization_type organization_type NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  proposal_summary TEXT NOT NULL,
  proposal_details TEXT NOT NULL,
  collaboration_type collaboration_type NOT NULL,
  scope TEXT NOT NULL,
  timeline TEXT NOT NULL,
  attachment_urls JSONB DEFAULT '[]',
  status application_status DEFAULT 'pending',
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_donations_user ON donations(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_created ON donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_email ON donations(donor_email);

CREATE INDEX IF NOT EXISTS idx_volunteer_applications_status ON volunteer_applications(status);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_role ON volunteer_applications(role_type);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_created ON volunteer_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_email ON volunteer_applications(email);

CREATE INDEX IF NOT EXISTS idx_collaboration_proposals_status ON collaboration_proposals(status);
CREATE INDEX IF NOT EXISTS idx_collaboration_proposals_type ON collaboration_proposals(collaboration_type);
CREATE INDEX IF NOT EXISTS idx_collaboration_proposals_org_type ON collaboration_proposals(organization_type);
CREATE INDEX IF NOT EXISTS idx_collaboration_proposals_created ON collaboration_proposals(created_at DESC);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

DROP TRIGGER IF EXISTS update_donations_updated_at ON donations;
CREATE TRIGGER update_donations_updated_at 
  BEFORE UPDATE ON donations 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_volunteer_applications_updated_at ON volunteer_applications;
CREATE TRIGGER update_volunteer_applications_updated_at 
  BEFORE UPDATE ON volunteer_applications 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_collaboration_proposals_updated_at ON collaboration_proposals;
CREATE TRIGGER update_collaboration_proposals_updated_at 
  BEFORE UPDATE ON collaboration_proposals 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_proposals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit donations" ON donations;
CREATE POLICY "Anyone can submit donations" ON donations
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view own donations" ON donations;
CREATE POLICY "Users can view own donations" ON donations
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can manage donations" ON donations;
CREATE POLICY "Admins can manage donations" ON donations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Anyone can submit volunteer applications" ON volunteer_applications;
CREATE POLICY "Anyone can submit volunteer applications" ON volunteer_applications
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view volunteer applications" ON volunteer_applications;
CREATE POLICY "Admins can view volunteer applications" ON volunteer_applications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can manage volunteer applications" ON volunteer_applications;
CREATE POLICY "Admins can manage volunteer applications" ON volunteer_applications
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Anyone can submit collaboration proposals" ON collaboration_proposals;
CREATE POLICY "Anyone can submit collaboration proposals" ON collaboration_proposals
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view collaboration proposals" ON collaboration_proposals;
CREATE POLICY "Admins can view collaboration proposals" ON collaboration_proposals
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can manage collaboration proposals" ON collaboration_proposals;
CREATE POLICY "Admins can manage collaboration proposals" ON collaboration_proposals
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );