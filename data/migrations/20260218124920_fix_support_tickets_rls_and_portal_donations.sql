/*
  # Fix Support Tickets RLS and Portal Donation Queries

  ## Problem 1 — Support Tickets SELECT Policy
  The existing SELECT policy reads session_token from a custom HTTP header
  (x-session-token) using `current_setting('request.headers')`. The frontend
  Supabase JS client never sets that header, so the policy always evaluates to
  NULL and silently filters out all rows — users see an empty list even after
  successfully submitting a ticket.

  ## Fix
  Drop the broken header-based SELECT policy and replace it with a simple
  SECURITY DEFINER function-based approach: a `get_tickets_by_token(p_token text)`
  function that bypasses RLS when called with the correct token. The frontend
  calls this function instead of querying the table directly.

  This is the standard Supabase pattern for session-token (non-auth) RLS scenarios.

  ## Problem 2 — Donation INSERT uses anon key from API route
  The `create-checkout-session` API route inserts with the anon key, and the
  INSERT policy is WITH CHECK (true) — this should work. No DB change needed here.

  ## Changes
  1. Drop broken SELECT policy on support_tickets
  2. Create SECURITY DEFINER helper function get_tickets_by_token
  3. Grant execute to anon and authenticated roles
*/

DROP POLICY IF EXISTS "Session owners can view their tickets" ON support_tickets;

CREATE OR REPLACE FUNCTION get_tickets_by_token(p_token text)
RETURNS SETOF support_tickets
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_token IS NULL OR length(trim(p_token)) < 10 THEN
    RETURN;
  END IF;
  RETURN QUERY
    SELECT * FROM support_tickets
    WHERE session_token = p_token
    ORDER BY created_at DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION get_tickets_by_token(text) TO anon, authenticated;
