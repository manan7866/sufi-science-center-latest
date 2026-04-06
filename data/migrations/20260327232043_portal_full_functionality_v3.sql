/*
  # Portal Full Functionality Migration v3

  ## Summary
  - Drops and recreates get_tickets_by_token with correct explicit return columns
  - Creates all remaining portal tables and RPCs
  - Handles existing functions safely
*/

-- Drop existing function that returns SETOF support_tickets (wrong return type)
DROP FUNCTION IF EXISTS get_tickets_by_token(text);

-- ============================================================
-- TABLE: portal_profiles
-- ============================================================
CREATE TABLE IF NOT EXISTS portal_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token uuid NOT NULL UNIQUE REFERENCES portal_sessions(session_token) ON DELETE CASCADE,
  full_name text DEFAULT '',
  display_name text DEFAULT '',
  location text DEFAULT '',
  bio text DEFAULT '',
  interests text[] DEFAULT '{}',
  avatar_url text DEFAULT '',
  email text DEFAULT '',
  phone text DEFAULT '',
  address_line1 text DEFAULT '',
  address_line2 text DEFAULT '',
  city text DEFAULT '',
  country text DEFAULT '',
  postal_code text DEFAULT '',
  completed_modules text[] DEFAULT '{}',
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portal_profiles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'portal_profiles' AND policyname = 'Portal profile select') THEN
    CREATE POLICY "Portal profile select" ON portal_profiles FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'portal_profiles' AND policyname = 'Portal profile insert') THEN
    CREATE POLICY "Portal profile insert" ON portal_profiles FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'portal_profiles' AND policyname = 'Portal profile update') THEN
    CREATE POLICY "Portal profile update" ON portal_profiles FOR UPDATE USING (true) WITH CHECK (true);
  END IF;
END $$;

-- ============================================================
-- TABLE: membership_enrollments
-- ============================================================
CREATE TABLE IF NOT EXISTS membership_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token uuid NOT NULL REFERENCES portal_sessions(session_token) ON DELETE CASCADE,
  tier text NOT NULL DEFAULT 'seeker' CHECK (tier IN ('seeker', 'fellow', 'scholar')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'pending_review')),
  applied_at timestamptz DEFAULT now(),
  activated_at timestamptz DEFAULT now(),
  cancelled_at timestamptz,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE membership_enrollments ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'membership_enrollments' AND policyname = 'Membership enrollment select') THEN
    CREATE POLICY "Membership enrollment select" ON membership_enrollments FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'membership_enrollments' AND policyname = 'Membership enrollment insert') THEN
    CREATE POLICY "Membership enrollment insert" ON membership_enrollments FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'membership_enrollments' AND policyname = 'Membership enrollment update') THEN
    CREATE POLICY "Membership enrollment update" ON membership_enrollments FOR UPDATE USING (true) WITH CHECK (true);
  END IF;
END $$;

-- ============================================================
-- TABLE: support_ticket_replies
-- ============================================================
CREATE TABLE IF NOT EXISTS support_ticket_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  author_type text NOT NULL DEFAULT 'admin' CHECK (author_type IN ('admin', 'user')),
  author_name text DEFAULT 'SSC Support Team',
  body text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE support_ticket_replies ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'support_ticket_replies' AND policyname = 'Ticket replies select') THEN
    CREATE POLICY "Ticket replies select" ON support_ticket_replies FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'support_ticket_replies' AND policyname = 'Ticket replies insert') THEN
    CREATE POLICY "Ticket replies insert" ON support_ticket_replies FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- ============================================================
-- RPC: get_tickets_by_token
-- ============================================================
CREATE OR REPLACE FUNCTION get_tickets_by_token(p_token text)
RETURNS TABLE (
  id uuid,
  ticket_number text,
  subject text,
  description text,
  category text,
  priority text,
  status text,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT id, ticket_number, subject, description, category, priority, status, created_at, updated_at
  FROM support_tickets
  WHERE session_token = p_token
  ORDER BY created_at DESC;
$$;

-- ============================================================
-- RPC: get_portal_profile
-- ============================================================
CREATE OR REPLACE FUNCTION get_portal_profile(p_token uuid)
RETURNS TABLE (
  full_name text, display_name text, location text, bio text,
  interests text[], avatar_url text, email text, phone text,
  address_line1 text, address_line2 text, city text, country text,
  postal_code text, completed_modules text[]
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT full_name, display_name, location, bio, interests, avatar_url,
         email, phone, address_line1, address_line2, city, country, postal_code,
         completed_modules
  FROM portal_profiles
  WHERE session_token = p_token
  LIMIT 1;
$$;

-- ============================================================
-- RPC: upsert_portal_profile
-- ============================================================
CREATE OR REPLACE FUNCTION upsert_portal_profile(
  p_token uuid,
  p_full_name text DEFAULT '',
  p_display_name text DEFAULT '',
  p_location text DEFAULT '',
  p_bio text DEFAULT '',
  p_interests text[] DEFAULT '{}',
  p_email text DEFAULT '',
  p_phone text DEFAULT '',
  p_address_line1 text DEFAULT '',
  p_address_line2 text DEFAULT '',
  p_city text DEFAULT '',
  p_country text DEFAULT '',
  p_postal_code text DEFAULT '',
  p_completed_modules text[] DEFAULT '{}'
)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  INSERT INTO portal_profiles (
    session_token, full_name, display_name, location, bio, interests,
    email, phone, address_line1, address_line2, city, country, postal_code,
    completed_modules, updated_at
  ) VALUES (
    p_token, p_full_name, p_display_name, p_location, p_bio, p_interests,
    p_email, p_phone, p_address_line1, p_address_line2, p_city, p_country, p_postal_code,
    p_completed_modules, now()
  )
  ON CONFLICT (session_token) DO UPDATE SET
    full_name = EXCLUDED.full_name, display_name = EXCLUDED.display_name,
    location = EXCLUDED.location, bio = EXCLUDED.bio, interests = EXCLUDED.interests,
    email = EXCLUDED.email, phone = EXCLUDED.phone,
    address_line1 = EXCLUDED.address_line1, address_line2 = EXCLUDED.address_line2,
    city = EXCLUDED.city, country = EXCLUDED.country, postal_code = EXCLUDED.postal_code,
    completed_modules = EXCLUDED.completed_modules, updated_at = now();
$$;

-- ============================================================
-- RPC: get_ticket_with_replies
-- ============================================================
CREATE OR REPLACE FUNCTION get_ticket_with_replies(p_ticket_id uuid, p_token text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'ticket', row_to_json(t),
    'replies', COALESCE(
      (SELECT json_agg(r ORDER BY r.created_at ASC) FROM support_ticket_replies r WHERE r.ticket_id = t.id),
      '[]'::json
    )
  )
  INTO result
  FROM support_tickets t
  WHERE t.id = p_ticket_id AND t.session_token = p_token;
  RETURN result;
END;
$$;

-- ============================================================
-- RPC: cancel_membership
-- ============================================================
CREATE OR REPLACE FUNCTION cancel_membership(p_token uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  UPDATE membership_enrollments
  SET status = 'cancelled', cancelled_at = now(), updated_at = now()
  WHERE session_token = p_token AND status = 'active';
$$;

-- ============================================================
-- RPC: enroll_membership_tier
-- ============================================================
CREATE OR REPLACE FUNCTION enroll_membership_tier(p_token uuid, p_tier text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE membership_enrollments
  SET status = 'cancelled', cancelled_at = now(), updated_at = now()
  WHERE session_token = p_token AND status = 'active';
  INSERT INTO membership_enrollments (session_token, tier, status, applied_at, activated_at)
  VALUES (p_token, p_tier, 'active', now(), now());
END;
$$;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_portal_profiles_session_token ON portal_profiles(session_token);
CREATE INDEX IF NOT EXISTS idx_membership_enrollments_session_token ON membership_enrollments(session_token);
CREATE INDEX IF NOT EXISTS idx_support_ticket_replies_ticket_id ON support_ticket_replies(ticket_id);
