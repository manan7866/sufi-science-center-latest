/*
  # Finalize Lineage Structure

  ## Summary
  Aligns the lineages table with the final locked lineage taxonomy:
  - Formative Period (pre-tariqa)
  - Major Classical Orders: Qadiriyya, Naqshbandiyya, Chishtiyya, Shadhiliyya,
    Suhrawardiyya, Rifaʿiyya, Kubrawiyya, Mevleviyya, Yasawiyya, Bektashiyya,
    Tijaniyya, Sanusiyya
  - Sub-Branches: Mujaddidiyya, Khalidiyya (under Naqshbandiyya);
    Nizamiyya, Sabiriyya (under Chishtiyya)

  ## Changes
  - Renames existing lineages to their formal Arabic/academic names
  - Adds missing Sanusiyya order
  - Renames Pre-Tariqah to Formative Sufi Era (non-tariqa)
  - Removes sub-branches that don't match the final spec
    (Shadhili sub-branches, Qadiri-Barkati) — soft delete
  - Updates display_order for clean presentation
*/

-- Rename major classical orders to formal names
UPDATE lineages SET name = 'Naqshbandiyya', slug = 'naqshbandiyya', display_order = 2
  WHERE slug = 'naqshbandi' AND deleted_at IS NULL;

UPDATE lineages SET name = 'Qadiriyya', slug = 'qadiriyya', display_order = 1
  WHERE slug = 'qadiri' AND deleted_at IS NULL;

UPDATE lineages SET name = 'Chishtiyya', slug = 'chishtiyya', display_order = 3
  WHERE slug = 'chishti' AND deleted_at IS NULL;

UPDATE lineages SET name = 'Shadhiliyya', slug = 'shadhiliyya', display_order = 4
  WHERE slug = 'shadhili' AND deleted_at IS NULL;

UPDATE lineages SET name = 'Suhrawardiyya', slug = 'suhrawardiyya', display_order = 5
  WHERE slug = 'suhrawardi' AND deleted_at IS NULL;

UPDATE lineages SET name = 'Rifaʿiyya', slug = 'rifaiyya', display_order = 6
  WHERE slug = 'rifai' AND deleted_at IS NULL;

UPDATE lineages SET name = 'Kubrawiyya', display_order = 7
  WHERE slug = 'kubrawiyya' AND deleted_at IS NULL;

UPDATE lineages SET name = 'Mevleviyya', slug = 'mevleviyya', display_order = 8
  WHERE slug = 'mevlevi' AND deleted_at IS NULL;

UPDATE lineages SET name = 'Yasawiyya', slug = 'yasawiyya', display_order = 9
  WHERE slug = 'yasawi' AND deleted_at IS NULL;

UPDATE lineages SET name = 'Bektashiyya', slug = 'bektashiyya', display_order = 10
  WHERE slug = 'bektashi' AND deleted_at IS NULL;

UPDATE lineages SET name = 'Tijaniyya', slug = 'tijaniyya', display_order = 11
  WHERE slug = 'tijani' AND deleted_at IS NULL;

-- Rename Pre-Tariqah to Formative Sufi Era
UPDATE lineages SET name = 'Formative Sufi Era (non-tariqa)', slug = 'formative-sufi-era', display_order = 0
  WHERE slug = 'pre-order' AND deleted_at IS NULL;

-- Add Sanusiyya if not already present
INSERT INTO lineages (name, slug, description, level, display_order)
SELECT 'Sanusiyya', 'sanusiyya',
  'A reformist Sufi order founded in 19th-century Libya by Muhammad ibn Ali al-Sanusi, emphasizing return to Quranic and hadith sources while maintaining the Sufi path.',
  0, 12
WHERE NOT EXISTS (SELECT 1 FROM lineages WHERE slug = 'sanusiyya');

-- Rename sub-branches to formal academic names
UPDATE lineages SET name = 'Mujaddidiyya', slug = 'mujaddidiyya', display_order = 21
  WHERE slug = 'naqshbandi-mujaddidi' AND deleted_at IS NULL;

UPDATE lineages SET name = 'Khalidiyya', slug = 'khalidiyya', display_order = 22
  WHERE slug = 'naqshbandi-khalidi' AND deleted_at IS NULL;

UPDATE lineages SET name = 'Nizamiyya', slug = 'nizamiyya', display_order = 31
  WHERE slug = 'chishti-nizami' AND deleted_at IS NULL;

UPDATE lineages SET name = 'Sabiriyya', slug = 'sabiriyya', display_order = 32
  WHERE slug = 'chishti-sabiri' AND deleted_at IS NULL;

-- Soft-delete sub-branches not in final spec (Shadhili sub-branches, Qadiri-Barkati)
UPDATE lineages SET deleted_at = now()
  WHERE slug IN ('shadhili-darqawi', 'shadhili-alawi', 'qadiri-barkati')
    AND deleted_at IS NULL;
