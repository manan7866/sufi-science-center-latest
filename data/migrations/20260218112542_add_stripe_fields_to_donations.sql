/*
  # Add Stripe Payment Fields to Donations Table

  ## Summary
  Extends the existing donations table with Stripe-specific payment processing columns
  to support Stripe Checkout. No existing columns are removed.

  ## Modified Tables

  ### `donations`
  New columns added:
  - `processor` (text) — payment processor name, e.g. 'stripe'
  - `processing_entity` (text) — legal entity processing the payment
  - `stripe_session_id` (text, unique) — Stripe Checkout Session ID
  - `stripe_payment_intent_id` (text) — Stripe PaymentIntent ID
  - `receipt_url` (text) — URL to Stripe-generated receipt
  - `completed_at` (timestamptz) — timestamp when payment was confirmed

  Status column already exists; default remains 'pending'.
  Currency column already exists; default remains 'USD'.

  ## Notes
  - stripe_session_id has a unique index to prevent duplicate webhook processing
  - All new columns are nullable to avoid breaking existing rows
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'donations' AND column_name = 'processor'
  ) THEN
    ALTER TABLE donations ADD COLUMN processor text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'donations' AND column_name = 'processing_entity'
  ) THEN
    ALTER TABLE donations ADD COLUMN processing_entity text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'donations' AND column_name = 'stripe_session_id'
  ) THEN
    ALTER TABLE donations ADD COLUMN stripe_session_id text UNIQUE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'donations' AND column_name = 'stripe_payment_intent_id'
  ) THEN
    ALTER TABLE donations ADD COLUMN stripe_payment_intent_id text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'donations' AND column_name = 'receipt_url'
  ) THEN
    ALTER TABLE donations ADD COLUMN receipt_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'donations' AND column_name = 'completed_at'
  ) THEN
    ALTER TABLE donations ADD COLUMN completed_at timestamptz;
  END IF;
END $$;
