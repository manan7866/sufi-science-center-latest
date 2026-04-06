/*
  # Add Atomic View Count Increment Functions

  ## Summary
  Creates SECURITY DEFINER functions for incrementing view counts on
  media_tracks and sacred_kalam. These functions execute with elevated
  privileges, bypassing RLS for this specific operation only.

  This is necessary because client-facing write policies on these tables
  are now restricted to admin role only (Phase 1 hardening).

  ## New Functions
  - `increment_media_track_view(track_id UUID)` — increments view_count on media_tracks
  - `increment_sacred_kalam_view(kalam_id UUID)` — increments view_count on sacred_kalam

  ## Security Notes
  - Both functions are SECURITY DEFINER (run as function owner, not caller)
  - Both are granted to the `anon` role (callable from client without auth)
  - They only increment view_count — no other fields can be modified via these functions
  - Functions validate that the record exists and is published before incrementing
*/

CREATE OR REPLACE FUNCTION increment_media_track_view(track_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE media_tracks
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE id = track_id AND published = true;
END;
$$;

GRANT EXECUTE ON FUNCTION increment_media_track_view(UUID) TO anon;
GRANT EXECUTE ON FUNCTION increment_media_track_view(UUID) TO authenticated;

CREATE OR REPLACE FUNCTION increment_sacred_kalam_view(kalam_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE sacred_kalam
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE id = kalam_id AND published = true;
END;
$$;

GRANT EXECUTE ON FUNCTION increment_sacred_kalam_view(UUID) TO anon;
GRANT EXECUTE ON FUNCTION increment_sacred_kalam_view(UUID) TO authenticated;
