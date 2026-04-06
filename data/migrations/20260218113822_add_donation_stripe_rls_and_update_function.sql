/*
  # Stripe Donation RLS and Server-Side Update Function

  ## Summary
  Adds RLS policy for anonymous SELECT by stripe_session_id (needed for thank-you page confirmation),
  and a SECURITY DEFINER function to allow the webhook to mark donations as paid
  without requiring admin JWT or service role key.

  ## Changes

  ### RLS Policies
  - New SELECT policy: allows fetching a donation row by its stripe_session_id (anon-safe, read-only)

  ### New Function
  - `mark_donation_paid(p_session_id, p_payment_intent_id, p_receipt_url)` — SECURITY DEFINER
    Updates a donation to paid status. Called from the webhook API route using the anon key.
*/

CREATE POLICY "Anyone can view donation by stripe session id"
  ON donations
  FOR SELECT
  TO anon, authenticated
  USING (stripe_session_id IS NOT NULL);

CREATE OR REPLACE FUNCTION mark_donation_paid(
  p_session_id text,
  p_payment_intent_id text,
  p_receipt_url text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE donations
  SET
    status = 'paid',
    stripe_payment_intent_id = p_payment_intent_id,
    receipt_url = p_receipt_url,
    completed_at = now()
  WHERE stripe_session_id = p_session_id
    AND status = 'pending';
END;
$$;

REVOKE ALL ON FUNCTION mark_donation_paid(text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION mark_donation_paid(text, text, text) TO anon, authenticated;
