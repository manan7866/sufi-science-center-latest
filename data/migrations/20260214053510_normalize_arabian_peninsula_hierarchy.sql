/*
  # Normalize Arabian Peninsula Regional Hierarchy

  1. Problem
    - "Prophetic Arabia" and "Arabian Peninsula" exist as separate root regions
    - This creates confusion as they overlap geographically
    - "Prophetic Arabia" is temporal (7th century), not distinct geography

  2. Solution
    - Make "Prophetic Arabia" a sub-region (level 1) of "Arabian Peninsula"
    - This clarifies that Prophetic Arabia is a specific temporal subset
    - Maintains data integrity by preserving saint associations

  3. Changes
    - Update "Prophetic Arabia" parent_region_id to point to "Arabian Peninsula"
    - Update level from 0 to 1
    - Adjust display_order to appear first under Arabian Peninsula
    - Update Arabian Peninsula display_order to appear earlier (after foundational regions)
*/

-- Make Prophetic Arabia a sub-region of Arabian Peninsula
UPDATE regions
SET 
  parent_region_id = (SELECT id FROM regions WHERE slug = 'arabian-peninsula'),
  level = 1,
  display_order = 1
WHERE slug = 'prophetic-arabia';

-- Adjust Arabian Peninsula to come earlier in sort order (after core foundational regions)
UPDATE regions
SET display_order = 5
WHERE slug = 'arabian-peninsula';

-- Ensure Basra (already under Arabian Peninsula) has proper display order
UPDATE regions
SET display_order = 2
WHERE slug = 'basra' AND parent_region_id = (SELECT id FROM regions WHERE slug = 'arabian-peninsula');
