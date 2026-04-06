/*
  # Finalize Theme Taxonomy — Full Scholarly Maturity

  ## Summary
  Aligns the themes table with the final locked scholarly taxonomy organized into
  6 thematic clusters:

  1. Core Metaphysical Themes
     Unity of Being (Wahdat al-Wujud), Ontology & Metaphysics, Cosmology,
     Divine Names & Attributes, Prophecy & Revelation, Wilayah (Sainthood)

  2. Spiritual Psychology & Inner Science
     Spiritual Transformation, Tazkiyah (Purification), Spiritual Psychology,
     Nafs & Selfhood, Dreams & Spiritual Visions, Contemplation & Dhikr

  3. Devotional & Ritual Life
     Divine Love & Devotion, Sama & Sacred Music, Ritual & Practice,
     Asceticism & Renunciation, Adab & Spiritual Etiquette

  4. Transmission & Authority
     Silsila & Lineage Transmission, Spiritual Authority & Shaykhhood,
     Initiation & Bayʿah, Institutional Orders

  5. Intellectual & Theological Engagement
     Jurisprudence & Fiqh, Theology (Kalam), Interfaith Dialogue,
     Philosophy & Mystical Thought, Reform & Renewal

  6. Social & Civilizational Dimensions
     Social Reform & Justice, Political Mysticism, Gender & Spirituality,
     Education & Knowledge Preservation, Poetry & Artistic Expression

  ## Changes
  - Renames several existing themes to match final spec
  - Adds missing themes
  - Soft-deletes themes not in final locked spec
  - Updates display_order with cluster-grouped ordering
*/

-- Cluster 1: Core Metaphysical Themes (100-series)
UPDATE themes SET name = 'Unity of Being (Wahdat al-Wujud)', slug = 'unity-of-being', display_order = 101
  WHERE slug = 'unity-of-being' AND deleted_at IS NULL;

UPDATE themes SET name = 'Ontology & Metaphysics', slug = 'ontology-metaphysics', display_order = 102
  WHERE slug = 'metaphysics-ontology' AND deleted_at IS NULL;

UPDATE themes SET name = 'Cosmology', slug = 'cosmology', display_order = 103
  WHERE slug = 'cosmology' AND deleted_at IS NULL;

-- Add Divine Names & Attributes if not present
INSERT INTO themes (name, slug, display_order)
SELECT 'Divine Names & Attributes', 'divine-names-attributes', 104
WHERE NOT EXISTS (SELECT 1 FROM themes WHERE slug = 'divine-names-attributes');

UPDATE themes SET name = 'Prophecy & Revelation', slug = 'prophecy-revelation', display_order = 105
  WHERE slug = 'prophecy-revelation' AND deleted_at IS NULL;

-- Add Wilayah (Sainthood) if not present
INSERT INTO themes (name, slug, display_order)
SELECT 'Wilayah (Sainthood)', 'wilayah-sainthood', 106
WHERE NOT EXISTS (SELECT 1 FROM themes WHERE slug = 'wilayah-sainthood');

-- Cluster 2: Spiritual Psychology & Inner Science (200-series)
UPDATE themes SET name = 'Spiritual Transformation', slug = 'spiritual-transformation', display_order = 201
  WHERE slug = 'transformation' AND deleted_at IS NULL;

-- Add Tazkiyah (Purification) if not present
INSERT INTO themes (name, slug, display_order)
SELECT 'Tazkiyah (Purification)', 'tazkiyah-purification', 202
WHERE NOT EXISTS (SELECT 1 FROM themes WHERE slug = 'tazkiyah-purification');

UPDATE themes SET name = 'Spiritual Psychology', slug = 'spiritual-psychology', display_order = 203
  WHERE slug = 'spiritual-psychology' AND deleted_at IS NULL;

-- Add Nafs & Selfhood if not present
INSERT INTO themes (name, slug, display_order)
SELECT 'Nafs & Selfhood', 'nafs-selfhood', 204
WHERE NOT EXISTS (SELECT 1 FROM themes WHERE slug = 'nafs-selfhood');

UPDATE themes SET name = 'Dreams & Spiritual Visions', slug = 'dreams-visions', display_order = 205
  WHERE slug = 'dreams-visions' AND deleted_at IS NULL;

UPDATE themes SET name = 'Contemplation & Dhikr', slug = 'contemplation-dhikr', display_order = 206
  WHERE slug IN ('contemplation', 'contemplation-dhikr') AND deleted_at IS NULL;

-- Cluster 3: Devotional & Ritual Life (300-series)
UPDATE themes SET name = 'Divine Love & Devotion', slug = 'divine-love-devotion', display_order = 301
  WHERE slug IN ('love-devotion', 'divine-love-devotion') AND deleted_at IS NULL;

-- Add Sama & Sacred Music if not present
INSERT INTO themes (name, slug, display_order)
SELECT 'Sama & Sacred Music', 'sama-sacred-music', 302
WHERE NOT EXISTS (SELECT 1 FROM themes WHERE slug = 'sama-sacred-music');

-- Add Ritual & Practice if not present
INSERT INTO themes (name, slug, display_order)
SELECT 'Ritual & Practice', 'ritual-practice', 303
WHERE NOT EXISTS (SELECT 1 FROM themes WHERE slug = 'ritual-practice');

UPDATE themes SET name = 'Asceticism & Renunciation', slug = 'asceticism-renunciation', display_order = 304
  WHERE slug = 'asceticism-zuhd' AND deleted_at IS NULL;

-- Add Adab & Spiritual Etiquette if not present
INSERT INTO themes (name, slug, display_order)
SELECT 'Adab & Spiritual Etiquette', 'adab-spiritual-etiquette', 305
WHERE NOT EXISTS (SELECT 1 FROM themes WHERE slug = 'adab-spiritual-etiquette');

-- Cluster 4: Transmission & Authority (400-series)
-- Add Silsila & Lineage Transmission if not present
INSERT INTO themes (name, slug, display_order)
SELECT 'Silsila & Lineage Transmission', 'silsila-lineage-transmission', 401
WHERE NOT EXISTS (SELECT 1 FROM themes WHERE slug = 'silsila-lineage-transmission');

-- Add Spiritual Authority & Shaykhhood if not present
INSERT INTO themes (name, slug, display_order)
SELECT 'Spiritual Authority & Shaykhhood', 'spiritual-authority-shaykhhood', 402
WHERE NOT EXISTS (SELECT 1 FROM themes WHERE slug = 'spiritual-authority-shaykhhood');

-- Add Initiation & Bayyah if not present
INSERT INTO themes (name, slug, display_order)
SELECT 'Initiation & Bayʿah', 'initiation-bayah', 403
WHERE NOT EXISTS (SELECT 1 FROM themes WHERE slug = 'initiation-bayah');

-- Add Institutional Orders if not present
INSERT INTO themes (name, slug, display_order)
SELECT 'Institutional Orders', 'institutional-orders', 404
WHERE NOT EXISTS (SELECT 1 FROM themes WHERE slug = 'institutional-orders');

-- Cluster 5: Intellectual & Theological Engagement (500-series)
UPDATE themes SET name = 'Jurisprudence & Fiqh', slug = 'jurisprudence-fiqh', display_order = 501
  WHERE slug = 'jurisprudence-fiqh' AND deleted_at IS NULL;

-- Add Theology (Kalam) if not present
INSERT INTO themes (name, slug, display_order)
SELECT 'Theology (Kalam)', 'theology-kalam', 502
WHERE NOT EXISTS (SELECT 1 FROM themes WHERE slug = 'theology-kalam');

UPDATE themes SET name = 'Interfaith Dialogue', slug = 'interfaith-dialogue', display_order = 503
  WHERE slug = 'interfaith-dialogue' AND deleted_at IS NULL;

-- Add Philosophy & Mystical Thought if not present
INSERT INTO themes (name, slug, display_order)
SELECT 'Philosophy & Mystical Thought', 'philosophy-mystical-thought', 504
WHERE NOT EXISTS (SELECT 1 FROM themes WHERE slug = 'philosophy-mystical-thought');

-- Add Reform & Renewal if not present
INSERT INTO themes (name, slug, display_order)
SELECT 'Reform & Renewal', 'reform-renewal', 505
WHERE NOT EXISTS (SELECT 1 FROM themes WHERE slug = 'reform-renewal');

-- Cluster 6: Social & Civilizational Dimensions (600-series)
UPDATE themes SET name = 'Social Reform & Justice', slug = 'social-reform-justice', display_order = 601
  WHERE slug = 'social-reform' AND deleted_at IS NULL;

-- Add Political Mysticism if not present
INSERT INTO themes (name, slug, display_order)
SELECT 'Political Mysticism', 'political-mysticism', 602
WHERE NOT EXISTS (SELECT 1 FROM themes WHERE slug = 'political-mysticism');

-- Add Gender & Spirituality if not present
INSERT INTO themes (name, slug, display_order)
SELECT 'Gender & Spirituality', 'gender-spirituality', 603
WHERE NOT EXISTS (SELECT 1 FROM themes WHERE slug = 'gender-spirituality');

-- Add Education & Knowledge Preservation if not present
INSERT INTO themes (name, slug, display_order)
SELECT 'Education & Knowledge Preservation', 'education-knowledge-preservation', 604
WHERE NOT EXISTS (SELECT 1 FROM themes WHERE slug = 'education-knowledge-preservation');

UPDATE themes SET name = 'Poetry & Artistic Expression', slug = 'poetry-artistic-expression', display_order = 605
  WHERE slug = 'poetry-expression' AND deleted_at IS NULL;

-- Soft-delete themes not in final spec
UPDATE themes SET deleted_at = now()
WHERE slug IN ('consciousness', 'ethics', 'sacred-geometry', 'healing-medicine')
  AND deleted_at IS NULL;
