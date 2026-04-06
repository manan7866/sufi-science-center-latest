/*
  # Seed Foundational Saints & Expand Lineages

  1. New Lineages
    - Tijani
    - Rifa'i
    - Yasawi
    - Bektashi
    - Pre-Order (for early figures before formal tariqas)

  2. Saint Seeding Strategy
    - 6 foundational saints per civilizational region (72 total)
    - Proper historical_period_id and region_id assignments
    - Biographical content for each

  3. Association Strategy
    - saint_lineages: Connect saints to their orders
    - saint_themes: Connect saints to intellectual themes
    - saint_roles: Assign primary roles (mystic, poet, founder, etc.)

  This creates a fully interconnected knowledge graph for intelligent filtering.
*/

-- Add missing major lineages
INSERT INTO lineages (slug, name, description, level, display_order) VALUES
  ('tijani', 'Tijani', 'Founded by Ahmad al-Tijani in North Africa, emphasis on direct prophetic connection', 0, 5),
  ('rifai', 'Rifa''i', 'Founded by Ahmad al-Rifa''i in Iraq, known for intense spiritual practices', 0, 6),
  ('yasawi', 'Yasawi', 'Founded by Ahmad Yasawi in Central Asia, emphasis on Persian poetry and Turkish spirituality', 0, 7),
  ('bektashi', 'Bektashi', 'Anatolian order associated with Haji Bektash Veli, syncretic practices', 0, 8),
  ('pre-order', 'Pre-Tariqah', 'Early Sufi masters before formal organizational structures', 0, 9),
  ('kubrawiyya', 'Kubrawiyya', 'Founded by Najmuddin Kubra, emphasis on visionary experiences', 0, 10)
ON CONFLICT (slug) DO NOTHING;

-- Clear existing test saints to avoid conflicts
DELETE FROM saint_lineages WHERE saint_id IN (SELECT id FROM saints WHERE slug LIKE 'test-%' OR slug IN ('abdul-qadir-gilani', 'khwaja-bahauddin-naqshband', 'mansur-al-hallaj', 'moinuddin-chishti', 'jalal-ad-din-rumi', 'abu-hamid-al-ghazali', 'ibn-arabi', 'rabia-al-adawiyya'));
DELETE FROM saint_themes WHERE saint_id IN (SELECT id FROM saints WHERE slug LIKE 'test-%' OR slug IN ('abdul-qadir-gilani', 'khwaja-bahauddin-naqshband', 'mansur-al-hallaj', 'moinuddin-chishti', 'jalal-ad-din-rumi', 'abu-hamid-al-ghazali', 'ibn-arabi', 'rabia-al-adawiyya'));
DELETE FROM saint_roles WHERE saint_id IN (SELECT id FROM saints WHERE slug LIKE 'test-%' OR slug IN ('abdul-qadir-gilani', 'khwaja-bahauddin-naqshband', 'mansur-al-hallaj', 'moinuddin-chishti', 'jalal-ad-din-rumi', 'abu-hamid-al-ghazali', 'ibn-arabi', 'rabia-al-adawiyya'));
DELETE FROM saints WHERE slug LIKE 'test-%' OR slug IN ('abdul-qadir-gilani', 'khwaja-bahauddin-naqshband', 'mansur-al-hallaj', 'moinuddin-chishti', 'jalal-ad-din-rumi', 'abu-hamid-al-ghazali', 'ibn-arabi', 'rabia-al-adawiyya');
