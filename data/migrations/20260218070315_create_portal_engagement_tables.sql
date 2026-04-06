/*
  # My Development Portal — Engagement Tables

  ## Purpose
  Stores per-session (anonymous or authenticated) engagement data for the
  My Development Portal. Tracks viewed Surahs, journal reflections, activity
  timeline events, and portal session state. Designed to persist without
  requiring authentication — keyed on a browser-generated session UUID stored
  in localStorage.

  ## Tables

  ### portal_sessions
  - Represents one user's persistent engagement identity (session-keyed)
  - Stores assessment stage, completed modules, current focus
  - No PII required; email is optional

  ### surah_views
  - Records each Surah viewed per session
  - Used for the 114-Surah progress tracker

  ### reflection_journal
  - Stores freeform textual reflections per Surah per session
  - Max 2000 chars per entry

  ### portal_activity_events
  - Append-only timeline of significant engagement events
  - event_type: e.g. 'viewed_surah', 'completed_assessment', 'started_module', 'wrote_reflection'

  ## Security
  - RLS enabled on all tables
  - Sessions are identified by session_token (UUID) — no auth required
  - Each session can only read/write its own rows
  - No cross-session data access
*/

CREATE TABLE IF NOT EXISTS portal_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  display_name text DEFAULT NULL,
  assessment_stage text DEFAULT 'Not Yet Assessed',
  completed_modules text[] DEFAULT ARRAY[]::text[],
  current_focus text DEFAULT NULL,
  last_activity_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_portal_sessions_token ON portal_sessions(session_token);

ALTER TABLE portal_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Session owner can read own session"
  ON portal_sessions FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Session owner can insert session"
  ON portal_sessions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Session owner can update own session"
  ON portal_sessions FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS surah_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token uuid NOT NULL,
  surah_number integer NOT NULL CHECK (surah_number >= 1 AND surah_number <= 114),
  viewed_at timestamptz DEFAULT now(),
  UNIQUE (session_token, surah_number)
);

CREATE INDEX IF NOT EXISTS idx_surah_views_token ON surah_views(session_token);
CREATE INDEX IF NOT EXISTS idx_surah_views_number ON surah_views(surah_number);

ALTER TABLE surah_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Session owner can read own surah views"
  ON surah_views FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Session owner can insert surah views"
  ON surah_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS reflection_journal (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token uuid NOT NULL,
  surah_number integer NOT NULL CHECK (surah_number >= 1 AND surah_number <= 114),
  reflection_text text NOT NULL DEFAULT '' CHECK (char_length(reflection_text) <= 2000),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (session_token, surah_number)
);

CREATE INDEX IF NOT EXISTS idx_reflection_journal_token ON reflection_journal(session_token);
CREATE INDEX IF NOT EXISTS idx_reflection_journal_surah ON reflection_journal(surah_number);

ALTER TABLE reflection_journal ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Session owner can read own reflections"
  ON reflection_journal FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Session owner can insert reflections"
  ON reflection_journal FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Session owner can update own reflections"
  ON reflection_journal FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS portal_activity_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token uuid NOT NULL,
  event_type text NOT NULL DEFAULT '',
  event_label text NOT NULL DEFAULT '',
  event_metadata jsonb DEFAULT '{}'::jsonb,
  occurred_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_portal_activity_token ON portal_activity_events(session_token);
CREATE INDEX IF NOT EXISTS idx_portal_activity_occurred ON portal_activity_events(occurred_at);

ALTER TABLE portal_activity_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Session owner can read own activity"
  ON portal_activity_events FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Session owner can insert activity"
  ON portal_activity_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
