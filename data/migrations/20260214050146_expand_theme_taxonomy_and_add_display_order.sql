/*
  # Expand Theme Taxonomy & Add Display Order

  1. Schema Changes
    - Add `display_order` column to `themes` table for proper sorting
    - Add `parent_theme_id` column to support hierarchical themes (future use)

  2. New Themes
    Expanding from 7 to comprehensive institutional taxonomy:
    - Metaphysics & Ontology
    - Spiritual Psychology & Self-Knowledge
    - Dhikr & Remembrance
    - Poetry & Artistic Expression
    - Social Reform & Justice
    - Jurisprudence & Fiqh
    - Interfaith Dialogue
    - Prophecy & Revelation
    - Sacred Geometry & Mathematics
    - Healing & Medicine
    - Dreams & Spiritual Visions
    - Asceticism & Renunciation

  3. Updates
    - Add display_order to existing themes
    - Categorize themes properly

  This creates an institutional-grade taxonomy suitable for research filtering.
*/

-- Add display_order column to themes
ALTER TABLE themes ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0;
ALTER TABLE themes ADD COLUMN IF NOT EXISTS parent_theme_id uuid REFERENCES themes(id);

-- Update existing themes with proper display order and refined names
UPDATE themes SET display_order = 1 WHERE slug = 'unity-of-being';
UPDATE themes SET display_order = 2 WHERE slug = 'love-devotion';
UPDATE themes SET name = 'Divine Love & Devotion', display_order = 2 WHERE slug = 'love-devotion';
UPDATE themes SET display_order = 3 WHERE slug = 'contemplation';
UPDATE themes SET name = 'Contemplation & Dhikr', display_order = 3 WHERE slug = 'contemplation';
UPDATE themes SET display_order = 4 WHERE slug = 'consciousness';
UPDATE themes SET display_order = 5 WHERE slug = 'transformation';
UPDATE themes SET display_order = 6 WHERE slug = 'cosmology';
UPDATE themes SET display_order = 7 WHERE slug = 'ethics';

-- Insert new themes for comprehensive coverage
INSERT INTO themes (slug, name, description, category, display_order) VALUES
  ('metaphysics-ontology', 'Metaphysics & Ontology', 'The nature of reality, being, existence, and the relationship between Creator and creation', 'scientific', 8),
  ('spiritual-psychology', 'Spiritual Psychology', 'Self-knowledge, nafs (ego), states and stations, inner purification', 'interdisciplinary', 9),
  ('poetry-expression', 'Poetry & Artistic Expression', 'Mystical poetry, music, calligraphy, and artistic manifestations of spiritual experience', 'spiritual', 10),
  ('social-reform', 'Social Reform & Justice', 'Social transformation, justice, equity, and community development', 'ethical', 11),
  ('jurisprudence-fiqh', 'Jurisprudence & Fiqh', 'Relationship between Sufism and Islamic law, spiritual jurisprudence', 'ethical', 12),
  ('interfaith-dialogue', 'Interfaith Dialogue', 'Universal spirituality, religious pluralism, and interfaith understanding', 'interdisciplinary', 13),
  ('prophecy-revelation', 'Prophecy & Revelation', 'Prophethood, revelation, divine communication, and spiritual authority', 'spiritual', 14),
  ('sacred-geometry', 'Sacred Geometry & Mathematics', 'Mathematical patterns in creation, sacred architecture, symbolic mathematics', 'scientific', 15),
  ('healing-medicine', 'Healing & Medicine', 'Spiritual healing, medicine of the heart, therapeutic practices', 'interdisciplinary', 16),
  ('dreams-visions', 'Dreams & Spiritual Visions', 'Dream interpretation, spiritual visions, unveiling (kashf)', 'spiritual', 17),
  ('asceticism-zuhd', 'Asceticism & Renunciation', 'Detachment, poverty (faqr), renunciation, and worldly detachment', 'spiritual', 18)
ON CONFLICT (slug) DO NOTHING;

-- Create index on display_order for efficient sorting
CREATE INDEX IF NOT EXISTS idx_themes_display_order ON themes(display_order);
