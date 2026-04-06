/*
  # Associate Saints with Themes, Lineages, and Roles

  1. saint_themes: Connect saints to intellectual/spiritual themes
  2. saint_lineages: Connect saints to Sufi orders
  3. saint_roles: Assign primary roles (mystic, poet, founder, etc.)

  This creates the knowledge graph structure for dynamic filtering.
*/

-- Associate Prophetic Arabia saints with themes
INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'prophet-muhammad' AND t.slug IN ('prophecy-revelation', 'spiritual-psychology', 'ethics');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'hasan-al-basri' AND t.slug IN ('asceticism-zuhd', 'ethics', 'spiritual-psychology');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'rabia-al-adawiyya' AND t.slug IN ('love-devotion', 'asceticism-zuhd', 'spiritual-psychology');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'uways-al-qarani' AND t.slug IN ('love-devotion', 'contemplation');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'ali-ibn-abi-talib' AND t.slug IN ('metaphysics-ontology', 'ethics', 'jurisprudence-fiqh');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'salman-al-farsi' AND t.slug IN ('interfaith-dialogue', 'ethics');

-- Associate Persia & Iran saints with themes
INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'abu-hamid-al-ghazali' AND t.slug IN ('spiritual-psychology', 'jurisprudence-fiqh', 'ethics', 'transformation');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'fariduddin-attar' AND t.slug IN ('poetry-expression', 'transformation', 'spiritual-psychology');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'ruzbihan-baqli' AND t.slug IN ('love-devotion', 'metaphysics-ontology', 'poetry-expression');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'najmuddin-kubra' AND t.slug IN ('dreams-visions', 'spiritual-psychology', 'transformation');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'bayazid-bastami' AND t.slug IN ('unity-of-being', 'transformation', 'spiritual-psychology');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'shah-nimatullah-wali' AND t.slug IN ('poetry-expression', 'contemplation', 'love-devotion');

-- Associate Central Asia saints with themes
INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'bahauddin-naqshband' AND t.slug IN ('contemplation', 'social-reform', 'transformation');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'ahmad-yasawi' AND t.slug IN ('poetry-expression', 'asceticism-zuhd', 'contemplation');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'hakim-al-tirmidhi' AND t.slug IN ('spiritual-psychology', 'metaphysics-ontology');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'ubaydullah-ahrar' AND t.slug IN ('social-reform', 'ethics', 'contemplation');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'makhdum-azam' AND t.slug IN ('contemplation', 'transformation');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'khoja-abdullah-ansari' AND t.slug IN ('love-devotion', 'spiritual-psychology', 'poetry-expression');

-- Associate Anatolia saints with themes
INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'jalal-ad-din-rumi' AND t.slug IN ('love-devotion', 'poetry-expression', 'unity-of-being', 'transformation');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'shams-of-tabriz' AND t.slug IN ('love-devotion', 'transformation', 'spiritual-psychology');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'yunus-emre' AND t.slug IN ('poetry-expression', 'love-devotion', 'ethics');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'haji-bektash-veli' AND t.slug IN ('interfaith-dialogue', 'social-reform', 'ethics');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'aziz-mahmud-hudayi' AND t.slug IN ('jurisprudence-fiqh', 'spiritual-psychology', 'ethics');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'niyazi-misri' AND t.slug IN ('unity-of-being', 'poetry-expression');

-- Associate Al-Andalus saints with themes
INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'ibn-arabi' AND t.slug IN ('metaphysics-ontology', 'unity-of-being', 'spiritual-psychology', 'poetry-expression');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'ibn-sabin' AND t.slug IN ('metaphysics-ontology', 'unity-of-being');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'abu-madyan' AND t.slug IN ('love-devotion', 'spiritual-psychology', 'ethics');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'ibn-barrajan' AND t.slug IN ('metaphysics-ontology', 'prophecy-revelation');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'ibn-al-arif' AND t.slug IN ('spiritual-psychology', 'contemplation');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'ibn-masarra' AND t.slug IN ('metaphysics-ontology', 'contemplation');

-- Associate South Asia saints with themes
INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'moinuddin-chishti' AND t.slug IN ('love-devotion', 'social-reform', 'interfaith-dialogue');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'nizamuddin-auliya' AND t.slug IN ('love-devotion', 'poetry-expression', 'ethics');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'shah-waliullah' AND t.slug IN ('jurisprudence-fiqh', 'social-reform', 'spiritual-psychology');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'ahmad-sirhindi' AND t.slug IN ('metaphysics-ontology', 'jurisprudence-fiqh', 'social-reform');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'bulleh-shah' AND t.slug IN ('poetry-expression', 'social-reform', 'love-devotion');

INSERT INTO saint_themes (saint_id, theme_id)
SELECT s.id, t.id FROM saints s, themes t
WHERE s.slug = 'waris-ali-shah' AND t.slug IN ('interfaith-dialogue', 'love-devotion', 'transformation');

-- Associate saints with lineages
INSERT INTO saint_lineages (saint_id, lineage_id, role)
SELECT s.id, l.id, 'Founder' FROM saints s, lineages l
WHERE s.slug = 'bahauddin-naqshband' AND l.slug = 'naqshbandi';

INSERT INTO saint_lineages (saint_id, lineage_id, role)
SELECT s.id, l.id, 'Master' FROM saints s, lineages l
WHERE s.slug = 'ubaydullah-ahrar' AND l.slug = 'naqshbandi';

INSERT INTO saint_lineages (saint_id, lineage_id, role)
SELECT s.id, l.id, 'Master' FROM saints s, lineages l
WHERE s.slug = 'makhdum-azam' AND l.slug = 'naqshbandi';

INSERT INTO saint_lineages (saint_id, lineage_id, role)
SELECT s.id, l.id, 'Master' FROM saints s, lineages l
WHERE s.slug = 'ahmad-sirhindi' AND l.slug = 'naqshbandi';

INSERT INTO saint_lineages (saint_id, lineage_id, role)
SELECT s.id, l.id, 'Founder' FROM saints s, lineages l
WHERE s.slug = 'moinuddin-chishti' AND l.slug = 'chishti';

INSERT INTO saint_lineages (saint_id, lineage_id, role)
SELECT s.id, l.id, 'Master' FROM saints s, lineages l
WHERE s.slug = 'nizamuddin-auliya' AND l.slug = 'chishti';

INSERT INTO saint_lineages (saint_id, lineage_id, role)
SELECT s.id, l.id, 'Spiritual Ancestor' FROM saints s, lineages l
WHERE s.slug = 'abu-madyan' AND l.slug = 'shadhili';

INSERT INTO saint_lineages (saint_id, lineage_id, role)
SELECT s.id, l.id, 'Founder' FROM saints s, lineages l
WHERE s.slug = 'jalal-ad-din-rumi' AND l.slug = 'mevlevi';

INSERT INTO saint_lineages (saint_id, lineage_id, role)
SELECT s.id, l.id, 'Master' FROM saints s, lineages l
WHERE s.slug = 'shams-of-tabriz' AND l.slug = 'mevlevi';

INSERT INTO saint_lineages (saint_id, lineage_id, role)
SELECT s.id, l.id, 'Founder' FROM saints s, lineages l
WHERE s.slug = 'ahmad-yasawi' AND l.slug = 'yasawi';

INSERT INTO saint_lineages (saint_id, lineage_id, role)
SELECT s.id, l.id, 'Founder' FROM saints s, lineages l
WHERE s.slug = 'haji-bektash-veli' AND l.slug = 'bektashi';

INSERT INTO saint_lineages (saint_id, lineage_id, role)
SELECT s.id, l.id, 'Founder' FROM saints s, lineages l
WHERE s.slug = 'najmuddin-kubra' AND l.slug = 'kubrawiyya';

-- Add pre-order lineage for early figures
INSERT INTO saint_lineages (saint_id, lineage_id, role)
SELECT s.id, l.id, 'Early Master' FROM saints s, lineages l
WHERE s.slug IN ('hasan-al-basri', 'rabia-al-adawiyya', 'bayazid-bastami', 'hakim-al-tirmidhi') AND l.slug = 'pre-order';

-- Assign roles to saints
INSERT INTO saint_roles (saint_id, role, is_primary)
SELECT id, 'founder', true FROM saints WHERE slug = 'prophet-muhammad';

INSERT INTO saint_roles (saint_id, role, is_primary)
SELECT id, 'mystic', true FROM saints WHERE slug IN ('rabia-al-adawiyya', 'bayazid-bastami', 'shams-of-tabriz', 'ruzbihan-baqli');

INSERT INTO saint_roles (saint_id, role, is_primary)
SELECT id, 'poet', true FROM saints WHERE slug IN ('jalal-ad-din-rumi', 'fariduddin-attar', 'yunus-emre', 'bulleh-shah', 'ahmad-yasawi');

INSERT INTO saint_roles (saint_id, role, is_primary)
SELECT id, 'scholar', true FROM saints WHERE slug IN ('abu-hamid-al-ghazali', 'ibn-arabi', 'shah-waliullah', 'aziz-mahmud-hudayi');

INSERT INTO saint_roles (saint_id, role, is_primary)
SELECT id, 'founder', true FROM saints WHERE slug IN ('bahauddin-naqshband', 'moinuddin-chishti', 'haji-bektash-veli', 'najmuddin-kubra', 'ahmad-yasawi');

INSERT INTO saint_roles (saint_id, role, is_primary)
SELECT id, 'reformist', true FROM saints WHERE slug IN ('ahmad-sirhindi', 'shah-waliullah');

INSERT INTO saint_roles (saint_id, role, is_primary)
SELECT id, 'social_reformer', true FROM saints WHERE slug IN ('ubaydullah-ahrar', 'moinuddin-chishti', 'bulleh-shah');

INSERT INTO saint_roles (saint_id, role, is_primary)
SELECT id, 'philosopher', true FROM saints WHERE slug IN ('ibn-arabi', 'ibn-sabin', 'ibn-masarra');

INSERT INTO saint_roles (saint_id, role, is_primary)
SELECT id, 'teacher', true FROM saints WHERE slug IN ('nizamuddin-auliya', 'khoja-abdullah-ansari', 'makhdum-azam');
