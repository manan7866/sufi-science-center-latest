/*
  # Add Conference Events and User Role Management

  ## New Tables

  ### `conference_events`
  Stores conference events created by admins that appear on the front-end submission page.
  - `id` - UUID primary key
  - `slug` - URL-friendly identifier
  - `title` - Conference display title
  - `subtitle` - Optional tagline
  - `theme` - Conference theme/topic
  - `description` - Full description
  - `start_date` / `end_date` - Event dates
  - `location` - Physical or virtual location
  - `location_detail` - Address or virtual link
  - `submission_deadline` - Deadline for paper/talk submissions
  - `registration_deadline` - Deadline for attendee registration
  - `is_active` - Whether this is the current live conference
  - `is_open_for_submissions` - Whether submissions are being accepted
  - `is_open_for_registration` - Whether registration is open
  - `max_submissions` - Optional cap on submissions
  - `submission_types` - Array of accepted submission types (paper, workshop, panel, poster)
  - `contact_email` - Conference contact email
  - `website_url` - Optional external website
  - `cover_image_url` - Hero image for front-end display
  - `status` - draft / published / archived
  - `created_at` / `updated_at`

  ### `user_role_grants`
  Tracks admin-managed role assignments and block status for portal users.
  - `id` - UUID primary key
  - `session_token` - References portal_sessions (anonymous users)
  - `email` - Email for auth users
  - `granted_role` - Role assigned: seeker, fellow, scholar, moderator, admin
  - `permissions` - JSONB for granular permissions
  - `is_blocked` - Whether user is blocked from portal access
  - `block_reason` - Reason for block
  - `blocked_at` / `blocked_by`
  - `granted_at` / `granted_by`
  - `notes` - Admin notes about the user

  ## Security
  - RLS enabled on both tables
  - conference_events: public read for published, admin write
  - user_role_grants: admin-only access
*/

CREATE TABLE IF NOT EXISTS conference_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text,
  theme text,
  description text,
  start_date date,
  end_date date,
  location text,
  location_detail text,
  submission_deadline timestamptz,
  registration_deadline timestamptz,
  is_active boolean DEFAULT false,
  is_open_for_submissions boolean DEFAULT false,
  is_open_for_registration boolean DEFAULT false,
  max_submissions integer,
  submission_types text[] DEFAULT ARRAY['paper', 'workshop', 'panel', 'poster'],
  contact_email text,
  website_url text,
  cover_image_url text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE conference_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published conference events"
  ON conference_events
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated admins can read all conference events"
  ON conference_events
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_app_meta_data->>'role') = 'admin'
    )
  );

CREATE POLICY "Authenticated admins can insert conference events"
  ON conference_events
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_app_meta_data->>'role') = 'admin'
    )
  );

CREATE POLICY "Authenticated admins can update conference events"
  ON conference_events
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_app_meta_data->>'role') = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_app_meta_data->>'role') = 'admin'
    )
  );

CREATE TABLE IF NOT EXISTS user_role_grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token uuid REFERENCES portal_sessions(session_token) ON DELETE CASCADE,
  email text,
  granted_role text NOT NULL DEFAULT 'seeker' CHECK (granted_role IN ('seeker', 'fellow', 'scholar', 'moderator', 'admin')),
  permissions jsonb DEFAULT '{}',
  is_blocked boolean DEFAULT false,
  block_reason text,
  blocked_at timestamptz,
  blocked_by text,
  granted_at timestamptz DEFAULT now(),
  granted_by text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_role_grants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated admins can read user role grants"
  ON user_role_grants
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_app_meta_data->>'role') = 'admin'
    )
  );

CREATE POLICY "Authenticated admins can insert user role grants"
  ON user_role_grants
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_app_meta_data->>'role') = 'admin'
    )
  );

CREATE POLICY "Authenticated admins can update user role grants"
  ON user_role_grants
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_app_meta_data->>'role') = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_app_meta_data->>'role') = 'admin'
    )
  );

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'portal_sessions' AND column_name = 'is_blocked'
  ) THEN
    ALTER TABLE portal_sessions ADD COLUMN is_blocked boolean DEFAULT false;
    ALTER TABLE portal_sessions ADD COLUMN block_reason text;
    ALTER TABLE portal_sessions ADD COLUMN portal_role text DEFAULT 'seeker';
  END IF;
END $$;
