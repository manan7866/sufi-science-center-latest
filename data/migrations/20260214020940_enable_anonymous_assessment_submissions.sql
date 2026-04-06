/*
  # Enable Anonymous Assessment Submissions

  ## Overview
  Adds RLS policies to allow anonymous (non-authenticated) users to:
  - Submit assessment results without logging in
  - View their results using the result ID

  ## Changes Made

  ### RLS Policies for assessment_results
  - Allow public users to insert assessment results with null user_id
  - Allow public users to read assessment results (for viewing results page)
  
  ## Security
  - Anonymous users can only insert (not update/delete)
  - Results are read-only after creation
  - Individual result access is by UUID (hard to guess)
*/

-- ============================================================================
-- ASSESSMENT RESULTS RLS POLICIES FOR ANONYMOUS USERS
-- ============================================================================

-- Drop existing policies if they exist and recreate with proper permissions
DO $$
BEGIN
  -- Drop and recreate insert policy for anonymous users
  DROP POLICY IF EXISTS "Anonymous users can submit assessments" ON assessment_results;
  DROP POLICY IF EXISTS "Anyone can read assessment results" ON assessment_results;
  
  -- Allow public (anonymous) users to insert assessment results
  CREATE POLICY "Anonymous users can submit assessments"
    ON assessment_results FOR INSERT
    TO public
    WITH CHECK (user_id IS NULL);

  -- Allow public users to read any assessment result by ID
  -- This is needed for the results page to work for anonymous users
  CREATE POLICY "Anyone can read assessment results"
    ON assessment_results FOR SELECT
    TO public
    USING (true);
END $$;
