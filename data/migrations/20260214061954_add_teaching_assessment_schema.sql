/*
  # Add Teaching Assessment Schema

  1. Schema Changes
    - Add `assessment_type` column to assessments table
    - Extend assessment_dimension enum with 5 new values

  2. Purpose
    - Prepare schema for dual assessment system
    - Beginner assessment: formation and entry-level evaluation
    - Teaching assessment: transmission capacity and mentorship readiness
*/

-- Add assessment_type column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'assessments' AND column_name = 'assessment_type'
  ) THEN
    ALTER TABLE assessments ADD COLUMN assessment_type text NOT NULL DEFAULT 'beginner';
    ALTER TABLE assessments ADD CONSTRAINT check_assessment_type
      CHECK (assessment_type IN ('beginner', 'teaching'));
  END IF;
END $$;

-- Extend assessment_dimension enum with new values
ALTER TYPE assessment_dimension ADD VALUE IF NOT EXISTS 'doctrinal_grounding';
ALTER TYPE assessment_dimension ADD VALUE IF NOT EXISTS 'psychological_maturity';
ALTER TYPE assessment_dimension ADD VALUE IF NOT EXISTS 'ethical_responsibility';
ALTER TYPE assessment_dimension ADD VALUE IF NOT EXISTS 'transmission_capacity';
ALTER TYPE assessment_dimension ADD VALUE IF NOT EXISTS 'interfaith_literacy';

-- Update existing assessment to be 'beginner' type
UPDATE assessments
SET assessment_type = 'beginner'
WHERE slug = 'multi-dimensional-development';
