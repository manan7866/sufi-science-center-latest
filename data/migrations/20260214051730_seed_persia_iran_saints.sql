/*
  # Seed Persia & Iran Saints (6 foundational figures)

  1. Saints
    - Abu Hamid al-Ghazali (1058-1111)
    - Fariduddin Attar (1145-1221)
    - Ruzbihan Baqli (1128-1209)
    - Najmuddin Kubra (1145-1221)
    - Bayazid Bastami (804-874)
    - Shah Nimatullah Wali (1330-1431)

  2. Themes
    - Metaphysics, Spiritual Psychology, Poetry, Inner Transformation
*/

-- Abu Hamid al-Ghazali
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'abu-hamid-al-ghazali',
  'Abu Hamid al-Ghazali',
  1058,
  1111,
  (SELECT id FROM regions WHERE slug = 'nishapur'),
  (SELECT id FROM historical_periods WHERE slug = 'institutional-orders'),
  'male',
  'The "Proof of Islam" who synthesized law, theology, and spirituality',
  'Al-Ghazali was one of the most influential Muslim scholars in history. After a spiritual crisis, he left his prestigious academic position to pursue the Sufi path. His masterwork, Ihya Ulum al-Din (Revival of the Religious Sciences), integrates Islamic law, theology, and Sufi practice. He defended Sufism against critics while grounding it in orthodox Islam, making spirituality accessible to the broader Muslim community.',
  'Persian',
  false
);

-- Fariduddin Attar
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'fariduddin-attar',
  'Fariduddin Attar',
  1145,
  1221,
  (SELECT id FROM regions WHERE slug = 'nishapur'),
  (SELECT id FROM historical_periods WHERE slug = 'institutional-orders'),
  'male',
  'Master poet who conveyed Sufi teachings through allegorical narratives',
  'Attar is one of the greatest Persian mystical poets. His works, including Conference of the Birds (Mantiq al-Tayr) and Divine Book (Ilahi-nama), use allegory and storytelling to convey profound spiritual truths. The Conference of the Birds describes the soul''s journey through stages of purification to union with the Divine, symbolized by the Simurgh. Rumi credited Attar as one of his inspirations.',
  'Persian',
  false
);

-- Ruzbihan Baqli
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'ruzbihan-baqli',
  'Ruzbihan Baqli',
  1128,
  1209,
  (SELECT id FROM regions WHERE slug = 'persia-iran'),
  (SELECT id FROM historical_periods WHERE slug = 'institutional-orders'),
  'male',
  'The mystic of divine beauty and love, defender of ecstatic utterances',
  'Ruzbihan Baqli of Shiraz was a visionary mystic known for his theology of divine beauty. He defended controversial Sufi figures like Hallaj and interpreted their ecstatic utterances. His works, including The Unveiling of Secrets (Kashf al-Asrar), document his visionary experiences. He emphasized the aesthetic dimension of spirituality, seeing beauty as a divine attribute that draws souls toward God.',
  'Persian',
  false
);

-- Najmuddin Kubra
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'najmuddin-kubra',
  'Najmuddin Kubra',
  1145,
  1221,
  (SELECT id FROM regions WHERE slug = 'central-asia'),
  (SELECT id FROM historical_periods WHERE slug = 'institutional-orders'),
  'male',
  'Founder of the Kubrawiyya order, master of visionary experiences',
  'Najmuddin Kubra founded the Kubrawiyya order in Central Asia, emphasizing colored lights and visionary states in spiritual development. He systematized the interpretation of mystical visions and inner experiences. He died defending his city against the Mongol invasion, earning the title of martyr. His students spread his teachings across the Islamic world.',
  'Persian',
  true
);

-- Bayazid Bastami
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'bayazid-bastami',
  'Bayazid Bastami',
  804,
  874,
  (SELECT id FROM regions WHERE slug = 'persia-iran'),
  (SELECT id FROM historical_periods WHERE slug = 'classical-formation'),
  'male',
  'The intoxicated mystic known for ecstatic utterances and the doctrine of annihilation',
  'Bayazid Bastami represents the "intoxicated" school of Sufism, characterized by ecstatic expressions of union with God. His sayings, such as "Glory be to me! How great is my majesty!" shocked contemporaries but were later understood as utterances in a state of fana (annihilation of self). He emphasized direct mystical experience over bookish knowledge.',
  'Persian',
  false
);

-- Shah Nimatullah Wali
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'shah-nimatullah-wali',
  'Shah Nimatullah Wali',
  1330,
  1431,
  (SELECT id FROM regions WHERE slug = 'persia-iran'),
  (SELECT id FROM historical_periods WHERE slug = 'metaphysical-expansion'),
  'male',
  'Founder of the Nimatullahi order, poet and spiritual guide',
  'Shah Nimatullah Wali founded one of the most prominent Sufi orders in Iran. He was both a prolific poet and a spiritual master who traveled widely, eventually settling in India. His poetry combines Persian literary excellence with deep mystical insight. The Nimatullahi order continues to be influential in Iran and globally.',
  'Persian',
  true
);
