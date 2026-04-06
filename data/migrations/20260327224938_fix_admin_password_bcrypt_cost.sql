
/*
  # Fix admin password with correct bcrypt cost factor
  Supabase requires bcrypt cost factor 10. Previous migration used default (6).
*/
UPDATE auth.users 
SET 
  encrypted_password = crypt('SSCAdmin2026!', gen_salt('bf', 10)),
  updated_at = now()
WHERE email = 'admin@sufisciencecenter.org';
