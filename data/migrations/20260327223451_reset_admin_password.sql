
/*
  # Reset admin user password
  Updates the encrypted password for the admin user to SSCAdmin2026!
*/
UPDATE auth.users 
SET 
  encrypted_password = crypt('SSCAdmin2026!', gen_salt('bf')),
  updated_at = now()
WHERE email = 'admin@sufisciencecenter.org';
