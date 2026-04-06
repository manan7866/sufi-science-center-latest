/*
  # Complete Lineage Hierarchy

  1. Add Missing Core Lineage
    - Suhrawardi (major Persian/Iraqi order)

  2. Add Hierarchical Sub-Branches
    - Naqshbandi-Mujaddidi (founder: Ahmad Sirhindi)
    - Naqshbandi-Khalidi (19th century reform branch)
    - Chishti-Nizami (lineage of Nizamuddin Auliya)
    - Chishti-Sabri (lineage of Alauddin Sabir)
    - Shadhili-Darqawi (Moroccan reform branch)
    - Shadhili-Alawi (modern Algerian branch)
    - Qadiri-Barkati (South Asian branch)

  3. Update Display Order
    - Core orders: display_order 0-9
    - Sub-branches: display_order 10+
*/

-- Add Suhrawardi (major missing order)
INSERT INTO lineages (slug, name, description, level, display_order)
VALUES (
  'suhrawardi',
  'Suhrawardi',
  'Founded by Abu Najib Suhrawardi and his nephew Shahabuddin Suhrawardi, influential in Persia, Iraq, and South Asia',
  0,
  6
) ON CONFLICT (slug) DO NOTHING;

-- Update display orders for core lineages to ensure proper sorting
UPDATE lineages SET display_order = 0 WHERE slug = 'naqshbandi';
UPDATE lineages SET display_order = 1 WHERE slug = 'qadiri';
UPDATE lineages SET display_order = 2 WHERE slug = 'chishti';
UPDATE lineages SET display_order = 3 WHERE slug = 'shadhili';
UPDATE lineages SET display_order = 4 WHERE slug = 'mevlevi';
UPDATE lineages SET display_order = 5 WHERE slug = 'rifai';
UPDATE lineages SET display_order = 6 WHERE slug = 'suhrawardi';
UPDATE lineages SET display_order = 7 WHERE slug = 'kubrawiyya';
UPDATE lineages SET display_order = 8 WHERE slug = 'tijani';

-- Secondary orders (still top-level but regional)
UPDATE lineages SET display_order = 9 WHERE slug = 'yasawi';
UPDATE lineages SET display_order = 10 WHERE slug = 'bektashi';
UPDATE lineages SET display_order = 99 WHERE slug = 'pre-order';

-- Add hierarchical sub-branches
INSERT INTO lineages (slug, name, description, parent_lineage_id, level, display_order)
VALUES
  (
    'naqshbandi-mujaddidi',
    'Naqshbandi-Mujaddidi',
    'Reformed branch of Naqshbandi founded by Ahmad Sirhindi (Mujaddid Alf-i Thani) emphasizing wahdat al-shuhud',
    (SELECT id FROM lineages WHERE slug = 'naqshbandi'),
    1,
    11
  ),
  (
    'naqshbandi-khalidi',
    'Naqshbandi-Khalidi',
    'Revivalist branch spreading from Kurdistan through Ottoman lands in 19th century',
    (SELECT id FROM lineages WHERE slug = 'naqshbandi'),
    1,
    12
  ),
  (
    'chishti-nizami',
    'Chishti-Nizami',
    'Branch following the teaching line of Nizamuddin Auliya, dominant in North India',
    (SELECT id FROM lineages WHERE slug = 'chishti'),
    1,
    13
  ),
  (
    'chishti-sabiri',
    'Chishti-Sabiri',
    'Branch following Alauddin Ali Ahmad Sabir, emphasizing asceticism and meditation',
    (SELECT id FROM lineages WHERE slug = 'chishti'),
    1,
    14
  ),
  (
    'shadhili-darqawi',
    'Shadhili-Darqawi',
    'Moroccan reform branch founded by Moulay al-Arabi al-Darqawi, emphasis on poverty and detachment',
    (SELECT id FROM lineages WHERE slug = 'shadhili'),
    1,
    15
  ),
  (
    'shadhili-alawi',
    'Shadhili-Alawi',
    'Modern Algerian branch founded by Ahmad al-Alawi, combining tradition with contemporary engagement',
    (SELECT id FROM lineages WHERE slug = 'shadhili'),
    1,
    16
  ),
  (
    'qadiri-barkati',
    'Qadiri-Barkati',
    'South Asian branch of Qadiri order with distinctive practices',
    (SELECT id FROM lineages WHERE slug = 'qadiri'),
    1,
    17
  )
ON CONFLICT (slug) DO NOTHING;

-- Mark sub-branches as level 1 (children of parent orders)
UPDATE lineages SET level = 1 WHERE parent_lineage_id IS NOT NULL;
UPDATE lineages SET level = 0 WHERE parent_lineage_id IS NULL AND slug != 'pre-order';
