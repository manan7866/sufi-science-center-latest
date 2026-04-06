
/*
  # Live User Data Preservation Snapshot

  This migration preserves all user-generated data that exists in the live database
  AFTER the original seed migrations. This acts as a permanent safety net — if the
  database is ever reset or migrated to a new Supabase project, running all migrations
  in order (including this one) will restore all real submissions, assessments,
  portal sessions, and donation records.

  ## Data Preserved

  1. Donations (4 records) — all pending donation attempts
  2. Portal Sessions (6 records) — anonymous visitor sessions
  3. Assessment Results (26 records) — inner development and teaching assessment responses
  4. Membership Applications (1 record) — fellow application
  5. Collaboration Proposals (2 records) — institutional partnership proposals
  6. Mentorship Applications (2 records) — program applications
  7. Conference Submissions (1 record) — paper submission SSC-2026-0E28A8

  ## Safety
  - All inserts use ON CONFLICT (id) DO NOTHING — safe to run multiple times
  - UUIDs match live database exactly to preserve referential integrity
  - keywords is text[] so uses ARRAY['value'] syntax
  - completed_modules is text[] so uses ARRAY[]::text[] for empty
*/

-- ============================================================
-- DONATIONS (4 records)
-- ============================================================
INSERT INTO donations (
  id, user_id, amount, currency, frequency,
  transaction_id, status, donor_name, donor_email, message,
  processor, processing_entity, stripe_session_id,
  stripe_payment_intent_id, receipt_url, completed_at,
  created_at, updated_at
) VALUES
(
  'a76c06f4-00df-43e3-93aa-1934fdedf744', NULL, 500, 'USD', 'annual',
  NULL, 'pending', 'Fayaz Khan', 'fk.envcal@gmail.com', 'kljklkl',
  NULL, NULL, NULL, NULL, NULL, NULL,
  '2026-02-14T03:17:58.019300+00:00', '2026-02-14T03:17:58.019300+00:00'
),
(
  '96d5f14b-ac4d-49d8-9615-81f76ca40c5d', NULL, 100, 'USD', 'one_time',
  NULL, 'pending', 'Fayaz Ahmad', 'fk.environment@gmail.com', 'hkhkjjkh',
  NULL, NULL, NULL, NULL, NULL, NULL,
  '2026-02-18T10:58:05.699386+00:00', '2026-02-18T10:58:05.699386+00:00'
),
(
  'd60a4c4c-fb01-43bf-a59d-ccbb3fd59444', NULL, 100, 'USD', 'one_time',
  'SSC-MLRXJ1SL-BW1R', 'pending', 'Fayaz Ahmad', 'fk.environment@gmail.com', 'hghb',
  NULL, NULL, NULL, NULL, NULL, NULL,
  '2026-02-18T11:09:02.654669+00:00', '2026-02-18T11:09:02.654669+00:00'
),
(
  '294fe1f6-94d0-4471-975d-c5d202443dfc', NULL, 100, 'USD', 'one_time',
  'SSC-MLRXNK0C-KLGK', 'pending', 'Fayaz Ahmad', 'fk.environment@gmail.com', 'cxsdcsad',
  NULL, NULL, NULL, NULL, NULL, NULL,
  '2026-02-18T11:12:32.996391+00:00', '2026-02-18T11:12:32.996391+00:00'
)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- PORTAL SESSIONS (6 records)
-- completed_modules is text[] — use ARRAY[]::text[] for empty arrays
-- ============================================================
INSERT INTO portal_sessions (
  id, session_token, display_name, assessment_stage,
  completed_modules, current_focus, last_activity_at, created_at
) VALUES
(
  'fc963975-240c-4fc7-9172-7b09e1677846',
  'ff287ee4-ea6e-408f-bebc-441f91071a69',
  NULL, 'Not Yet Assessed', ARRAY[]::text[], NULL,
  '2026-02-18T10:15:09.337+00:00', '2026-02-18T07:13:57.698778+00:00'
),
(
  '3117f678-24ab-48bf-bebd-a45e92ed9ea7',
  '9ad1ec25-828e-4a3f-b722-4341c45c91c8',
  NULL, 'Not Yet Assessed', ARRAY[]::text[], NULL,
  '2026-02-18T12:50:48.534434+00:00', '2026-02-18T12:50:48.534434+00:00'
),
(
  'e8e8802a-72e8-4b29-8cee-e9534d30f0d3',
  '65004608-6e83-4099-8436-c070c763efb3',
  NULL, 'Not Yet Assessed', ARRAY[]::text[], NULL,
  '2026-02-19T19:56:55.792+00:00', '2026-02-18T22:02:07.173405+00:00'
),
(
  '7c2858bc-cdbc-42ad-b5e7-5606edc038ba',
  'fcfd84b1-2b0e-49b1-ab99-96363588c36a',
  NULL, 'Not Yet Assessed', ARRAY[]::text[], NULL,
  '2026-02-20T16:44:49.694+00:00', '2026-02-20T16:43:06.381807+00:00'
),
(
  'a167d878-6868-46bc-81c1-ecde8bbcafeb',
  '0dd58220-e0aa-4dee-89ff-36a7dbee2751',
  NULL, 'Not Yet Assessed', ARRAY[]::text[], NULL,
  '2026-03-17T21:17:07.215003+00:00', '2026-03-17T21:17:07.215003+00:00'
),
(
  '1afb58d0-834a-483d-a953-26bd3976d392',
  '1bfd5d64-5bcd-4641-bee4-c35610d4e1b8',
  NULL, 'Not Yet Assessed', ARRAY[]::text[], NULL,
  '2026-03-27T17:45:20.954276+00:00', '2026-03-27T17:45:20.954276+00:00'
)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- ASSESSMENT RESULTS (26 records)
-- ============================================================
INSERT INTO assessment_results (id, user_id, assessment_id, result_json, created_at)
VALUES
('5bd7284d-99ac-4035-ac41-4971ef1f3d6b', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":7.666666666666667,"contemplative_capacity":8,"emotional_intelligence":8,"transformative_readiness":8},"responses":{"0cf5279f-9828-45c3-a845-d092e712f1b4":8,"0e80d783-c4ef-40a1-8958-7bf06629721d":8,"1e013606-647f-43c3-804e-7604720e6f48":8,"5c2126ad-de62-48c0-8cce-b4d846b27d5e":8,"623542b2-d672-49f0-a7a6-59b5bf4e61ff":8,"63faf167-72b4-463e-8614-1012d2f1942c":8,"7270f217-1899-4c38-9248-b525c193ac7e":8,"87f59840-7779-4f27-b141-f6b1f58dafca":8,"b3b0b8ad-eae4-4d8b-ab67-757e7c2f42d2":7,"bd92b285-d61f-4079-8887-81687a2ab683":8,"c5ab61d1-09f1-4101-8982-6f96d2ad239c":8,"fd2e487c-21d4-4159-b396-656fbd96acb8":8},"completed_at":"2026-02-14T02:14:04.508Z"}', '2026-02-14T02:14:05.146896+00:00'),
('8d70e9a9-7aac-4717-8c97-ba466af79cbf', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":7.666666666666667,"contemplative_capacity":8,"emotional_intelligence":8,"transformative_readiness":8.333333333333334},"responses":{"0cf5279f-9828-45c3-a845-d092e712f1b4":8,"0e80d783-c4ef-40a1-8958-7bf06629721d":8,"1e013606-647f-43c3-804e-7604720e6f48":9,"5c2126ad-de62-48c0-8cce-b4d846b27d5e":8,"623542b2-d672-49f0-a7a6-59b5bf4e61ff":8,"63faf167-72b4-463e-8614-1012d2f1942c":8,"7270f217-1899-4c38-9248-b525c193ac7e":8,"87f59840-7779-4f27-b141-f6b1f58dafca":7,"b3b0b8ad-eae4-4d8b-ab67-757e7c2f42d2":8,"bd92b285-d61f-4079-8887-81687a2ab683":8,"c5ab61d1-09f1-4101-8982-6f96d2ad239c":8,"fd2e487c-21d4-4159-b396-656fbd96acb8":8},"completed_at":"2026-02-14T02:14:58.075Z"}', '2026-02-14T02:14:58.742458+00:00'),
('4dfc1f2b-ca17-4f80-91c1-9327d84ee3f2', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":2,"contemplative_capacity":2.3333333333333335,"emotional_intelligence":2,"transformative_readiness":2.3333333333333335},"responses":{"0cf5279f-9828-45c3-a845-d092e712f1b4":2,"0e80d783-c4ef-40a1-8958-7bf06629721d":2,"1e013606-647f-43c3-804e-7604720e6f48":3,"5c2126ad-de62-48c0-8cce-b4d846b27d5e":2,"623542b2-d672-49f0-a7a6-59b5bf4e61ff":2,"63faf167-72b4-463e-8614-1012d2f1942c":2,"7270f217-1899-4c38-9248-b525c193ac7e":2,"87f59840-7779-4f27-b141-f6b1f58dafca":2,"b3b0b8ad-eae4-4d8b-ab67-757e7c2f42d2":2,"bd92b285-d61f-4079-8887-81687a2ab683":2,"c5ab61d1-09f1-4101-8982-6f96d2ad239c":2,"fd2e487c-21d4-4159-b396-656fbd96acb8":3},"completed_at":"2026-02-14T02:15:43.088Z"}', '2026-02-14T02:15:43.739258+00:00'),
('5683a106-fbf5-4f4d-98e5-4ef9f6db1799', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":10,"contemplative_capacity":10,"emotional_intelligence":10,"transformative_readiness":10},"responses":{"0cf5279f-9828-45c3-a845-d092e712f1b4":10,"0e80d783-c4ef-40a1-8958-7bf06629721d":10,"1e013606-647f-43c3-804e-7604720e6f48":10,"5c2126ad-de62-48c0-8cce-b4d846b27d5e":10,"623542b2-d672-49f0-a7a6-59b5bf4e61ff":10,"63faf167-72b4-463e-8614-1012d2f1942c":10,"7270f217-1899-4c38-9248-b525c193ac7e":10,"87f59840-7779-4f27-b141-f6b1f58dafca":10,"b3b0b8ad-eae4-4d8b-ab67-757e7c2f42d2":10,"bd92b285-d61f-4079-8887-81687a2ab683":10,"c5ab61d1-09f1-4101-8982-6f96d2ad239c":10,"fd2e487c-21d4-4159-b396-656fbd96acb8":10},"completed_at":"2026-02-14T02:17:23.460Z"}', '2026-02-14T02:17:24.14042+00:00'),
('1d3c6546-6bf9-4730-8261-b49aa36294b3', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":9,"contemplative_capacity":9,"emotional_intelligence":9,"transformative_readiness":9},"responses":{"0cf5279f-9828-45c3-a845-d092e712f1b4":9,"0e80d783-c4ef-40a1-8958-7bf06629721d":9,"1e013606-647f-43c3-804e-7604720e6f48":9,"5c2126ad-de62-48c0-8cce-b4d846b27d5e":9,"623542b2-d672-49f0-a7a6-59b5bf4e61ff":9,"63faf167-72b4-463e-8614-1012d2f1942c":9,"7270f217-1899-4c38-9248-b525c193ac7e":9,"87f59840-7779-4f27-b141-f6b1f58dafca":9,"b3b0b8ad-eae4-4d8b-ab67-757e7c2f42d2":9,"bd92b285-d61f-4079-8887-81687a2ab683":9,"c5ab61d1-09f1-4101-8982-6f96d2ad239c":9,"fd2e487c-21d4-4159-b396-656fbd96acb8":9},"completed_at":"2026-02-14T03:13:58.040Z"}', '2026-02-14T03:13:58.820574+00:00'),
('729895ff-5f5d-4651-b813-c1ccbc4d624d', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":8.333333333333334,"contemplative_capacity":8.666666666666666,"emotional_intelligence":8.666666666666666,"transformative_readiness":9},"responses":{"0cf5279f-9828-45c3-a845-d092e712f1b4":8,"0e80d783-c4ef-40a1-8958-7bf06629721d":9,"1e013606-647f-43c3-804e-7604720e6f48":9,"5c2126ad-de62-48c0-8cce-b4d846b27d5e":9,"623542b2-d672-49f0-a7a6-59b5bf4e61ff":9,"63faf167-72b4-463e-8614-1012d2f1942c":9,"7270f217-1899-4c38-9248-b525c193ac7e":9,"87f59840-7779-4f27-b141-f6b1f58dafca":9,"b3b0b8ad-eae4-4d8b-ab67-757e7c2f42d2":8,"bd92b285-d61f-4079-8887-81687a2ab683":8,"c5ab61d1-09f1-4101-8982-6f96d2ad239c":9,"fd2e487c-21d4-4159-b396-656fbd96acb8":8},"completed_at":"2026-02-14T06:11:45.971Z"}', '2026-02-14T06:11:46.829507+00:00'),
('057868ca-4920-4fa8-acd7-87fad9d79b6c', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":9.333333333333334,"contemplative_capacity":9,"emotional_intelligence":9,"transformative_readiness":9},"responses":{"0cf5279f-9828-45c3-a845-d092e712f1b4":9,"0e80d783-c4ef-40a1-8958-7bf06629721d":9,"1e013606-647f-43c3-804e-7604720e6f48":9,"5c2126ad-de62-48c0-8cce-b4d846b27d5e":9,"623542b2-d672-49f0-a7a6-59b5bf4e61ff":9,"63faf167-72b4-463e-8614-1012d2f1942c":9,"7270f217-1899-4c38-9248-b525c193ac7e":9,"87f59840-7779-4f27-b141-f6b1f58dafca":9,"b3b0b8ad-eae4-4d8b-ab67-757e7c2f42d2":9,"bd92b285-d61f-4079-8887-81687a2ab683":10,"c5ab61d1-09f1-4101-8982-6f96d2ad239c":9,"fd2e487c-21d4-4159-b396-656fbd96acb8":9},"completed_at":"2026-02-14T06:24:58.982Z"}', '2026-02-14T06:24:59.813313+00:00'),
('8ca06961-1e68-4a0c-8715-41abb5e47005', NULL, 'dc756087-a510-42f5-b227-49fa8a761a87', '{"scores":{"doctrinal_grounding":9,"interfaith_literacy":9.2,"transmission_capacity":9,"ethical_responsibility":9,"psychological_maturity":9},"responses":{"00688ac2-06db-4f3a-80cb-e258d0fcef52":9,"0474363e-46d0-4de0-ba41-881a35336183":9,"0d067680-4c57-43ab-915d-9fbb9ad7b672":9,"37258495-2e0b-41e6-ba24-7d284ed1e642":9,"4536bfc8-9372-48c6-bcb3-0bec23c67505":9,"4f42217a-cb5e-4423-81e0-702c9b19487f":10,"5d6d3709-5217-469b-a088-4a4bd917629b":9,"7934e917-7e73-496c-a304-5a2e72e30bd0":9,"8e8d6bc6-19d3-4c2f-93b3-c185cadca60f":9,"8fdeb077-be44-4a27-8f13-8a0a8a92da05":9,"922dfd0a-2a67-49a6-82d3-0f771a04186b":9,"962b8d58-38cd-42be-bfa3-625dd2a3ac0d":9,"9c1e3a21-3502-460a-bdc1-23cd0033345d":9,"a5889f16-4a73-48a7-93d8-faf3de4b897f":9,"abfda3aa-bc01-4669-8e4b-d70b78cbb882":9,"acd84b75-09eb-4b78-8111-b6262159195b":9,"bfda93a0-7fbe-49f9-927c-a98ca722bdee":9,"dd30d664-43c7-4411-a78c-f306afdc50ed":9,"e1e6c28f-9a4b-481a-b2cd-e49595690afa":9,"e5976183-e8ed-4c72-9326-32a660d974f2":9,"e729fd70-6a88-4682-b8e0-89fcad308713":9,"eef2c931-730e-408c-9284-30de18a02202":9,"f751a702-fc60-471b-9e4b-82787f95aefc":9,"fa710313-6f71-40bd-9333-24c131ae2204":9,"fabd49ad-2bf3-456a-96ca-bae560abd1ab":9},"completed_at":"2026-02-14T06:26:34.930Z"}', '2026-02-14T06:26:35.752452+00:00'),
('25813049-9a92-470b-9633-852e193d788d', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":9,"contemplative_capacity":9,"emotional_intelligence":9,"transformative_readiness":9},"responses":{"0cf5279f-9828-45c3-a845-d092e712f1b4":9,"0e80d783-c4ef-40a1-8958-7bf06629721d":9,"1e013606-647f-43c3-804e-7604720e6f48":9,"5c2126ad-de62-48c0-8cce-b4d846b27d5e":9,"623542b2-d672-49f0-a7a6-59b5bf4e61ff":9,"63faf167-72b4-463e-8614-1012d2f1942c":9,"7270f217-1899-4c38-9248-b525c193ac7e":9,"87f59840-7779-4f27-b141-f6b1f58dafca":9,"b3b0b8ad-eae4-4d8b-ab67-757e7c2f42d2":9,"bd92b285-d61f-4079-8887-81687a2ab683":9,"c5ab61d1-09f1-4101-8982-6f96d2ad239c":9,"fd2e487c-21d4-4159-b396-656fbd96acb8":9},"completed_at":"2026-02-14T06:33:18.419Z"}', '2026-02-14T06:33:19.673907+00:00'),
('6fa8eeab-4d2e-4777-9515-66892575f2d3', NULL, 'dc756087-a510-42f5-b227-49fa8a761a87', '{"scores":{"doctrinal_grounding":9,"interfaith_literacy":10,"transmission_capacity":10,"ethical_responsibility":10,"psychological_maturity":9},"contact":{"email":"fk.envcal@gmail.com","phone":"+91916699009","full_name":"Fayaz Khan"},"completed_at":"2026-02-14T06:41:48.199Z","session_type":"anonymous"}', '2026-02-14T06:41:49.068002+00:00'),
('8735c37c-fd2f-4c40-b03c-dd38018f0bb6', NULL, 'dc756087-a510-42f5-b227-49fa8a761a87', '{"scores":{"doctrinal_grounding":9,"interfaith_literacy":10,"transmission_capacity":10,"ethical_responsibility":10,"psychological_maturity":9},"contact":{"email":"fk.envcal@gmail.com","phone":"+91916699009","full_name":"Fayaz Khan"},"completed_at":"2026-02-14T06:41:49.391Z","session_type":"anonymous"}', '2026-02-14T06:41:50.200309+00:00'),
('783e2f1d-cefa-418e-8c72-9cf6283bcfd8', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":8,"contemplative_capacity":8,"emotional_intelligence":8,"transformative_readiness":8},"contact":{"email":"fk.envcal@gmail.com","phone":"916699009","full_name":"Fayaz Khan"},"completed_at":"2026-02-14T06:42:56.442Z","session_type":"anonymous"}', '2026-02-14T06:42:57.254171+00:00'),
('7f661382-bb87-4298-a79b-eafb8084d22f', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":2.3333333333333335,"contemplative_capacity":2,"emotional_intelligence":2.3333333333333335,"transformative_readiness":2},"contact":{"email":"fk.envcal@gmail.com","phone":"+91916699009","full_name":"Fayaz Khan"},"completed_at":"2026-02-14T07:38:06.156Z","session_type":"anonymous"}', '2026-02-14T07:38:07.050658+00:00'),
('a5c6bfeb-a7e6-4939-a672-cb5cb42c325e', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":9,"contemplative_capacity":8.666666666666666,"emotional_intelligence":8.333333333333334,"transformative_readiness":9},"contact":{"email":"fk.envcal@gmail.com","phone":"+91916699009","full_name":"Fayaz Khan"},"completed_at":"2026-02-14T07:42:55.754Z","session_type":"anonymous"}', '2026-02-14T07:42:56.747142+00:00'),
('b35920f9-d149-47dc-b3c5-d61881ce38b1', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":9.333333333333334,"contemplative_capacity":9,"emotional_intelligence":9,"transformative_readiness":9},"contact":{"email":"fk.envcal@gmail.com","phone":"+91916699009","full_name":"Fayaz Khan"},"completed_at":"2026-02-14T17:58:40.084Z","session_type":"anonymous"}', '2026-02-14T17:58:39.136464+00:00'),
('778920d3-065e-45f6-8cba-299ef249ee1f', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":10,"contemplative_capacity":10,"emotional_intelligence":10,"transformative_readiness":10},"contact":{"email":"fk.environment@gmail.com","phone":"9166990091","full_name":"Fayaz Ahmad"},"completed_at":"2026-02-18T06:16:30.127Z","session_type":"anonymous"}', '2026-02-18T06:16:30.275002+00:00'),
('68b64362-fd58-4f1f-b60f-1477edeab38b', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":10,"contemplative_capacity":10,"emotional_intelligence":10,"transformative_readiness":10},"contact":{"email":"fk.environment@gmail.com","phone":"9166990091","full_name":"Fayaz Ahmad"},"completed_at":"2026-02-18T06:16:35.219Z","session_type":"anonymous"}', '2026-02-18T06:16:35.228319+00:00'),
('375be2b0-4324-4b39-981f-c878aa8d4132', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":10,"contemplative_capacity":10,"emotional_intelligence":10,"transformative_readiness":10},"contact":{"email":"fk.environment@gmail.com","phone":"9166990091","full_name":"Fayaz Ahmad"},"completed_at":"2026-02-18T06:16:39.067Z","session_type":"anonymous"}', '2026-02-18T06:16:39.090002+00:00'),
('ce442d11-61e6-4118-a0e7-70c7d1799907', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":10,"contemplative_capacity":10,"emotional_intelligence":10,"transformative_readiness":10},"contact":{"email":"fk.environment@gmail.com","phone":"9166990091","full_name":"Fayaz Ahmad"},"completed_at":"2026-02-18T06:16:39.554Z","session_type":"anonymous"}', '2026-02-18T06:16:39.571786+00:00'),
('f45f357c-6e9b-4901-b6d2-398cba5c1206', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":10,"contemplative_capacity":10,"emotional_intelligence":10,"transformative_readiness":10},"contact":{"email":"fk.environment@gmail.com","phone":"9166990091","full_name":"Fayaz Ahmad"},"completed_at":"2026-02-18T06:16:39.757Z","session_type":"anonymous"}', '2026-02-18T06:16:39.774556+00:00'),
('8ad6e9b0-0a65-4c3b-9379-cd807c128db8', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":10,"contemplative_capacity":10,"emotional_intelligence":10,"transformative_readiness":10},"contact":{"email":"fk.environment@gmail.com","phone":"9166990091","full_name":"Fayaz Ahmad"},"completed_at":"2026-02-18T06:16:40.087Z","session_type":"anonymous"}', '2026-02-18T06:16:40.094495+00:00'),
('4257c56b-f083-4a5c-9570-9fc7fe5efb26', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":10,"contemplative_capacity":10,"emotional_intelligence":10,"transformative_readiness":10},"contact":{"email":"fk.environment@gmail.com","phone":"9166990091","full_name":"Fayaz Ahmad"},"completed_at":"2026-02-18T06:16:40.815Z","session_type":"anonymous"}', '2026-02-18T06:16:40.82842+00:00'),
('6d988448-8052-4af9-9ec0-c8df727d28e4', NULL, 'dc756087-a510-42f5-b227-49fa8a761a87', '{"scores":{"doctrinal_grounding":8,"interfaith_literacy":10,"transmission_capacity":10,"ethical_responsibility":10,"psychological_maturity":10},"contact":{"email":"fk.environment@gmail.com","phone":"19166990091","full_name":"Fayaz Ahmad"},"completed_at":"2026-02-18T06:41:15.274Z","session_type":"anonymous"}', '2026-02-18T06:41:15.386402+00:00'),
('ed5827e2-d631-445a-98c6-e034b699bdd3', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":6,"contemplative_capacity":8.333333333333334,"emotional_intelligence":8,"transformative_readiness":10},"contact":{"email":"fk.envcal@gmail.com","phone":"916699009","full_name":"Fayaz Khan"},"completed_at":"2026-02-18T23:21:20.898Z","session_type":"anonymous"}', '2026-02-18T23:21:22.094463+00:00'),
('558396e0-d5c4-47d9-a1f3-903e1140f21d', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":10,"contemplative_capacity":10,"emotional_intelligence":10,"transformative_readiness":10},"contact":{"email":"fk.envcal@gmail.com","phone":"+91916699009","full_name":"Fayaz Khan"},"completed_at":"2026-02-19T19:50:40.851Z","session_type":"anonymous"}', '2026-02-19T19:50:40.347971+00:00'),
('89e1c3b7-8aca-4668-9506-4fbc65927bc3', NULL, '8dd0b164-f359-42ce-a83f-6b4346961208', '{"scores":{"cognitive_patterns":10,"contemplative_capacity":10,"emotional_intelligence":10,"transformative_readiness":10},"contact":{"email":"fk.envcal@gmail.com","phone":"+91916699009","full_name":"Fayaz Khan"},"completed_at":"2026-02-20T16:43:56.947Z","session_type":"anonymous"}', '2026-02-20T16:43:56.108256+00:00')
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- MEMBERSHIP APPLICATIONS (1 record)
-- ============================================================
INSERT INTO membership_applications (
  id, session_token, membership_type, status, full_name, display_name,
  email, location, affiliation, areas_of_study, bio, statement,
  cv_url, linked_publications, years_of_engagement, leadership_roles,
  publications_list, reference_contact, academic_focus, research_interest,
  review_notes, reviewed_by, reviewed_at, created_at, updated_at
) VALUES (
  '1414126f-0fce-4b8e-9f67-af97ec591036',
  'ff287ee4-ea6e-408f-bebc-441f91071a69',
  'fellow', 'pending', 'FJGJ', 'FG',
  'fk.environment@gmail.com', 'FJH', 'FGDFG',
  '["Sufi Metaphysics"]'::jsonb,
  'FGH JHGJHG JHGJHGH GHGHJG HGHJGJH JHJGHJG JHGHJGHJ HJGJH',
  'FGJHJHGHJGHJGHJV JHJV HGHJGJGHVBV VJHHJHGJH JHGHJG JHGJHGHJ JHGJHG',
  NULL, '["FHJG"]'::jsonb, 'HG', NULL, NULL, NULL, NULL, NULL,
  NULL, NULL, NULL,
  '2026-02-18T09:53:05.963666+00:00', '2026-02-18T09:53:05.963666+00:00'
)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- COLLABORATION PROPOSALS (2 records)
-- reviewed_by is uuid type — use NULL directly
-- ============================================================
INSERT INTO collaboration_proposals (
  id, organization_name, organization_type, contact_name, contact_email,
  contact_phone, proposal_summary, proposal_details, collaboration_type,
  scope, timeline, attachment_urls, status, reviewed_at, reviewed_by,
  notes, created_at, updated_at
) VALUES
(
  '2ea4e45d-e662-46bf-9668-adea458d540b',
  'PRIME LOGIC SOLUTIONS LLC', 'research'::organization_type, 'Fayaz Khan', 'fk.envcal@gmail.com',
  '916699009', 'HGJGHJ', 'HGHJG', 'dialogue'::collaboration_type,
  'JGFJG', 'FGJHGHJG', '[]'::jsonb, 'pending'::application_status, NULL, NULL,
  NULL, '2026-02-14T01:06:47.987109+00:00', '2026-02-14T01:06:47.987109+00:00'
),
(
  '8899a196-1a95-49bb-af31-3a505930f958',
  'PRIME LOGIC SOLUTIONS LLC', 'research'::organization_type, 'Fayaz Khan', 'fk.environment@gmail.com',
  '9166990091', 'VBN', 'BBN', 'dialogue'::collaboration_type,
  'GJH', 'GH', '[]'::jsonb, 'pending'::application_status, NULL, NULL,
  NULL, '2026-02-18T09:26:13.031185+00:00', '2026-02-18T09:26:13.031185+00:00'
)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- MENTORSHIP APPLICATIONS (2 records)
-- ============================================================
INSERT INTO mentorship_applications (
  id, user_id, program_id, full_name, email, phone,
  background_summary, spiritual_goals, relevant_experience,
  why_this_program, commitment_level, availability,
  previous_mentorship_experience, status, reviewer_notes,
  reviewed_by, reviewed_at, interview_scheduled_for,
  created_at, updated_at, deleted_at
) VALUES
(
  'ef129806-64dd-4ba7-b03a-61c602f4cc12',
  NULL, '479268b0-b5a0-4f8c-b134-a6f96a0245dd',
  'Fayaz Khan', 'fk.envcal@gmail.com', '916699009',
  'jkjkhjh', 'jkhkjhkj', 'khjhjk',
  'kjhkjhk', 'ghkjgjh', 'ghhj',
  'hjkhjk', 'pending', NULL,
  NULL, NULL, NULL,
  '2026-02-14T07:25:19.310806+00:00', '2026-02-14T07:25:19.310806+00:00', NULL
),
(
  '3fa4eeeb-49d6-47e5-9e79-0161dcf10f21',
  NULL, '479268b0-b5a0-4f8c-b134-a6f96a0245dd',
  'Fayaz Khan', 'fk.envcal@gmail.com', '916699009',
  'xzx', 'zxzX', 'zx',
  'zx', 'xZX', 'zX',
  'ZXz', 'pending', NULL,
  NULL, NULL, NULL,
  '2026-02-14T07:42:06.356363+00:00', '2026-02-14T07:42:06.356363+00:00', NULL
)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- CONFERENCE SUBMISSIONS (1 record)
-- keywords is text[] — use ARRAY['value'] syntax
-- co_presenters is jsonb
-- ============================================================
INSERT INTO conference_submissions (
  id, tracking_code, submission_type, title, abstract,
  keywords, presenter_name, presenter_email, presenter_affiliation,
  presenter_bio, co_presenters, file_url, file_name, file_size_bytes,
  status, admin_notes, reviewer_decision, reviewed_by, reviewed_at,
  submitted_at, created_at, updated_at
) VALUES (
  'ce088fab-671c-442b-89b9-5da67b3d1487',
  'SSC-2026-0E28A8', 'paper',
  'jhgfhj',
  'jhkhjkb jkbjkbjkb jkggkjgjgujgg',
  ARRAY['cvvvvvv'],
  'fayaz', 'fk.environment@gmail.com', 'kgk',
  'jhkhjkb jkbjkbjkb jkggkjgjgujgg',
  '[{"name":"jhghj","email":"jhfjhq1","affiliation":"ghjg"}]'::jsonb,
  NULL, NULL, NULL,
  'submitted', NULL, NULL, NULL, NULL,
  '2026-02-18T10:10:44.362839+00:00', '2026-02-18T10:10:44.362839+00:00', '2026-02-18T10:10:44.362839+00:00'
)
ON CONFLICT (id) DO NOTHING;
