/*
  # Associate Saints with Lineages (Including Sub-Branches)

  1. Update Existing Associations
    - Ahmad Sirhindi → Naqshbandi-Mujaddidi (not just Naqshbandi)
    - Nizamuddin Auliya → Chishti-Nizami
    
  2. Add Suhrawardi Associations
    - Need to seed Suhrawardi saints in future migration

  3. Keep Parent Order Associations
    - Saints can belong to both parent and specific sub-branch
*/

-- Ahmad Sirhindi: He IS the founder of Naqshbandi-Mujaddidi branch
-- Add the sub-branch association (keep parent Naqshbandi too)
INSERT INTO saint_lineages (saint_id, lineage_id, role)
SELECT s.id, l.id, 'Founder'
FROM saints s, lineages l
WHERE s.slug = 'ahmad-sirhindi' AND l.slug = 'naqshbandi-mujaddidi'
ON CONFLICT DO NOTHING;

-- Nizamuddin Auliya: Master of Chishti-Nizami branch
INSERT INTO saint_lineages (saint_id, lineage_id, role)
SELECT s.id, l.id, 'Master'
FROM saints s, lineages l
WHERE s.slug = 'nizamuddin-auliya' AND l.slug = 'chishti-nizami'
ON CONFLICT DO NOTHING;

-- Moinuddin Chishti: Founder of Chishti order (already associated, but ensuring it's there)
-- His lineage continued through both Nizami and Sabiri branches

-- Shah Waliullah: Was Naqshbandi-Mujaddidi aligned (reformist scholar)
INSERT INTO saint_lineages (saint_id, lineage_id, role)
SELECT s.id, l.id, 'Master'
FROM saints s, lineages l
WHERE s.slug = 'shah-waliullah' AND l.slug = 'naqshbandi-mujaddidi'
ON CONFLICT DO NOTHING;

-- Also associate Shah Waliullah with parent Naqshbandi if not already
INSERT INTO saint_lineages (saint_id, lineage_id, role)
SELECT s.id, l.id, 'Master'
FROM saints s, lineages l
WHERE s.slug = 'shah-waliullah' AND l.slug = 'naqshbandi'
ON CONFLICT DO NOTHING;
