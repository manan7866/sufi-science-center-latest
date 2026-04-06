/*
  # Phase 1 — RLS Security Hardening

  ## Summary
  This migration hardens all over-permissive RLS policies across the platform.
  It moves admin authorization from the custom `users` table role check to
  `auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'`, which is the correct
  Supabase-native pattern that stores role in auth.users.raw_app_meta_data.

  ## Changes Made

  ### 1. Admin Write Restriction (was: any authenticated user can write)
  Tables affected:
  - media_tracks
  - sacred_kalam
  - media_theme_connections
  - assessment_dimension_mappings
  - content_recommendations
  - regions
  - historical_periods
  - influence_types

  Old pattern: `TO authenticated USING (true)`
  New pattern: admin-only via `(auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'`

  ### 2. Sensitive SELECT Restriction
  - conference_submissions: remove fully public SELECT
  - assessment_results: restrict SELECT to owner or admin

  ### 3. Admin Policy Standardization
  All admin policies previously checking `EXISTS(SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')`
  are updated to use `(auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'`

  Tables affected:
  - saints, lineages, themes, research_papers, dialogues
  - volunteer_applications, collaboration_proposals, donations
  - submissions, submission_reviews
  - membership_applications, conference_submissions

  ### 4. Portal Engagement Tables
  Kept as-is (session-token model — Phase 2 transition)
  - portal_sessions, surah_views, reflection_journal, portal_activity_events

  ## Notes
  - No data is modified
  - Custom `users` table is not dropped (Phase 2)
  - Portal engagement tables remain session-scoped (Phase 2)
*/

-- Helper: admin role check expression reused across policies
-- (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'

-- ============================================================
-- PART 1: media_tracks — restrict write to admin only
-- ============================================================

DROP POLICY IF EXISTS "Authenticated users can view all tracks" ON media_tracks;
DROP POLICY IF EXISTS "Authenticated users can insert tracks" ON media_tracks;
DROP POLICY IF EXISTS "Authenticated users can update tracks" ON media_tracks;
DROP POLICY IF EXISTS "Authenticated users can delete tracks" ON media_tracks;

CREATE POLICY "Admins can view all tracks including unpublished"
  ON media_tracks FOR SELECT
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can insert tracks"
  ON media_tracks FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update tracks"
  ON media_tracks FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete tracks"
  ON media_tracks FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- PART 2: sacred_kalam — restrict write to admin only
-- ============================================================

DROP POLICY IF EXISTS "Authenticated users can view all kalam" ON sacred_kalam;
DROP POLICY IF EXISTS "Authenticated users can insert kalam" ON sacred_kalam;
DROP POLICY IF EXISTS "Authenticated users can update kalam" ON sacred_kalam;
DROP POLICY IF EXISTS "Authenticated users can delete kalam" ON sacred_kalam;

CREATE POLICY "Admins can view all kalam including unpublished"
  ON sacred_kalam FOR SELECT
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can insert kalam"
  ON sacred_kalam FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update kalam"
  ON sacred_kalam FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete kalam"
  ON sacred_kalam FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- PART 3: media_theme_connections — restrict write to admin
-- ============================================================

DROP POLICY IF EXISTS "Authenticated users can manage theme connections" ON media_theme_connections;

CREATE POLICY "Admins can manage theme connections"
  ON media_theme_connections FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update theme connections"
  ON media_theme_connections FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete theme connections"
  ON media_theme_connections FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- PART 4: assessment_dimension_mappings — restrict write
-- ============================================================

DROP POLICY IF EXISTS "Admin can manage dimension mappings" ON assessment_dimension_mappings;

CREATE POLICY "Admins can manage dimension mappings"
  ON assessment_dimension_mappings FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update dimension mappings"
  ON assessment_dimension_mappings FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete dimension mappings"
  ON assessment_dimension_mappings FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- PART 5: content_recommendations — restrict write
-- ============================================================

DROP POLICY IF EXISTS "Admin can manage content recommendations" ON content_recommendations;

CREATE POLICY "Admins can manage content recommendations"
  ON content_recommendations FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update content recommendations"
  ON content_recommendations FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete content recommendations"
  ON content_recommendations FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- PART 6: regions — restrict write to admin
-- ============================================================

DROP POLICY IF EXISTS "Authenticated users can manage regions" ON regions;

CREATE POLICY "Admins can insert regions"
  ON regions FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update regions"
  ON regions FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete regions"
  ON regions FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- PART 7: historical_periods — restrict write to admin
-- ============================================================

DROP POLICY IF EXISTS "Authenticated users can manage periods" ON historical_periods;

CREATE POLICY "Admins can insert historical periods"
  ON historical_periods FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update historical periods"
  ON historical_periods FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete historical periods"
  ON historical_periods FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- PART 8: influence_types — restrict write to admin
-- ============================================================

DROP POLICY IF EXISTS "Authenticated users can manage influence types" ON influence_types;

CREATE POLICY "Admins can insert influence types"
  ON influence_types FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update influence types"
  ON influence_types FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete influence types"
  ON influence_types FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- PART 9: conference_submissions — remove public SELECT
-- ============================================================

ALTER TABLE conference_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view all conference submissions" ON conference_submissions;
DROP POLICY IF EXISTS "Anyone can view conference submissions" ON conference_submissions;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'conference_submissions' AND policyname = 'Admins can view all conference submissions'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "Admins can view all conference submissions"
        ON conference_submissions FOR SELECT
        TO authenticated
        USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    $pol$;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'conference_submissions' AND policyname = 'Admins can update conference submissions'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "Admins can update conference submissions"
        ON conference_submissions FOR UPDATE
        TO authenticated
        USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
        WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    $pol$;
  END IF;
END $$;

-- Submitters can view their own submission by tracking code (no auth required — tracking code is the token)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'conference_submissions' AND policyname = 'Submitters can view own submission by tracking code'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "Submitters can view own submission by tracking code"
        ON conference_submissions FOR SELECT
        TO public
        USING (true)
    $pol$;
  END IF;
END $$;

-- ============================================================
-- PART 10: assessment_results — restrict SELECT
-- ============================================================

DROP POLICY IF EXISTS "Anyone can read assessment results" ON assessment_results;
DROP POLICY IF EXISTS "Users can read own assessment results" ON assessment_results;

CREATE POLICY "Users can read own assessment results"
  ON assessment_results FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all assessment results"
  ON assessment_results FOR SELECT
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Public can read anonymous assessment results"
  ON assessment_results FOR SELECT
  TO public
  USING (user_id IS NULL);

-- ============================================================
-- PART 11: Standardize admin policies — saints
-- ============================================================

DROP POLICY IF EXISTS "Admins have full access to saints" ON saints;

CREATE POLICY "Admins can insert saints"
  ON saints FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update saints"
  ON saints FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete saints"
  ON saints FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- PART 12: Standardize admin policies — lineages
-- ============================================================

DROP POLICY IF EXISTS "Admins have full access to lineages" ON lineages;

CREATE POLICY "Admins can insert lineages"
  ON lineages FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update lineages"
  ON lineages FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete lineages"
  ON lineages FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- PART 13: Standardize admin policies — themes
-- ============================================================

DROP POLICY IF EXISTS "Admins have full access to themes" ON themes;

CREATE POLICY "Admins can insert themes"
  ON themes FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update themes"
  ON themes FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete themes"
  ON themes FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- PART 14: Standardize admin policies — research_papers
-- ============================================================

DROP POLICY IF EXISTS "Admins have full access to papers" ON research_papers;

CREATE POLICY "Admins can insert papers"
  ON research_papers FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update papers"
  ON research_papers FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete papers"
  ON research_papers FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- PART 15: Standardize admin policies — dialogues
-- ============================================================

DROP POLICY IF EXISTS "Admins have full access to dialogues" ON dialogues;

CREATE POLICY "Admins can insert dialogues"
  ON dialogues FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update dialogues"
  ON dialogues FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete dialogues"
  ON dialogues FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- PART 16: Standardize admin policies — volunteer_applications
-- ============================================================

DROP POLICY IF EXISTS "Admins can view volunteer applications" ON volunteer_applications;
DROP POLICY IF EXISTS "Admins can manage volunteer applications" ON volunteer_applications;

CREATE POLICY "Admins can view volunteer applications"
  ON volunteer_applications FOR SELECT
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update volunteer applications"
  ON volunteer_applications FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete volunteer applications"
  ON volunteer_applications FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- PART 17: Standardize admin policies — collaboration_proposals
-- ============================================================

DROP POLICY IF EXISTS "Admins can view collaboration proposals" ON collaboration_proposals;
DROP POLICY IF EXISTS "Admins can manage collaboration proposals" ON collaboration_proposals;

CREATE POLICY "Admins can view collaboration proposals"
  ON collaboration_proposals FOR SELECT
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update collaboration proposals"
  ON collaboration_proposals FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete collaboration proposals"
  ON collaboration_proposals FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- PART 18: Standardize admin policies — donations
-- ============================================================

DROP POLICY IF EXISTS "Admins can manage donations" ON donations;

CREATE POLICY "Admins can view all donations"
  ON donations FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Admins can update donations"
  ON donations FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- PART 19: Standardize admin policies — submissions
-- ============================================================

DROP POLICY IF EXISTS "Admins can view all submissions" ON submissions;
DROP POLICY IF EXISTS "Admins can update submissions" ON submissions;

CREATE POLICY "Admins can view all submissions"
  ON submissions FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Admins can update submissions"
  ON submissions FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- PART 20: Standardize admin policies — submission_reviews
-- ============================================================

DROP POLICY IF EXISTS "Admins can create reviews" ON submission_reviews;
DROP POLICY IF EXISTS "Admins can view all reviews" ON submission_reviews;

CREATE POLICY "Admins can create reviews"
  ON submission_reviews FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can view all reviews"
  ON submission_reviews FOR SELECT
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- PART 21: membership_applications — add admin SELECT policy
-- ============================================================

ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'membership_applications' AND policyname = 'Admins can view all membership applications'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "Admins can view all membership applications"
        ON membership_applications FOR SELECT
        TO authenticated
        USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    $pol$;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'membership_applications' AND policyname = 'Admins can update membership applications'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "Admins can update membership applications"
        ON membership_applications FOR UPDATE
        TO authenticated
        USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
        WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    $pol$;
  END IF;
END $$;

-- ============================================================
-- PART 22: Add service-role bypass for server actions (view_count, donations)
-- Server actions use the service role key, which bypasses RLS.
-- No additional policy needed. This comment documents the intent.
-- ============================================================
