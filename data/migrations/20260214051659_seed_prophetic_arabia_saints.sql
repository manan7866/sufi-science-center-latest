/*
  # Seed Prophetic Arabia Saints (6 foundational figures)

  1. Saints
    - Prophet Muhammad (570-632)
    - Hasan al-Basri (642-728)
    - Rabia al-Adawiyya (717-801)
    - Uways al-Qarani (d. 657)
    - Ali ibn Abi Talib (600-661)
    - Salman al-Farsi (d. 656)

  2. Themes
    - Asceticism, Divine Love, Spiritual Ethics, Prophecy

  3. Historical Context
    - Prophetic Era and Companions & Early Ascetics periods
*/

-- Prophet Muhammad
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'prophet-muhammad',
  'Prophet Muhammad ﷺ',
  570,
  632,
  (SELECT id FROM regions WHERE slug = 'prophetic-arabia'),
  (SELECT id FROM historical_periods WHERE slug = 'prophetic-era'),
  'male',
  'The Prophet of Islam and the foundational source of Sufi spirituality',
  'Prophet Muhammad (peace be upon him) is the central figure of Islam and the ultimate exemplar for all Sufis. His life, teachings, and spiritual states form the foundation of Islamic mysticism. The Quran and Hadith are the primary sources for Sufi practice, and the Prophet''s night journey (Isra and Mi''raj) serves as the archetypal mystical experience.',
  'Arabic',
  true
);

-- Hasan al-Basri
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'hasan-al-basri',
  'Hasan al-Basri',
  642,
  728,
  (SELECT id FROM regions WHERE slug = 'arabian-peninsula'),
  (SELECT id FROM historical_periods WHERE slug = 'companions-early-ascetics'),
  'male',
  'Early ascetic and theologian who shaped Islamic spirituality',
  'Hasan al-Basri was one of the most prominent scholars and ascetics of the early Islamic period. Known for his eloquent sermons on fear of God, renunciation of worldly attachments, and the importance of sincerity, he influenced generations of Sufis. His emphasis on inner purity and ethical conduct became foundational to Sufi thought.',
  'Arabic',
  false
);

-- Rabia al-Adawiyya
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'rabia-al-adawiyya',
  'Rabia al-Adawiyya',
  717,
  801,
  (SELECT id FROM regions WHERE slug = 'basra'),
  (SELECT id FROM historical_periods WHERE slug = 'classical-formation'),
  'female',
  'The first great female Sufi mystic, renowned for her doctrine of selfless divine love',
  'Rabia al-Adawiyya of Basra is celebrated as one of the earliest and most influential female Sufis. She articulated a theology of pure love for God, untainted by fear of Hell or desire for Paradise. Her famous prayer—"O Lord, if I worship You from fear of Hell, burn me in Hell; if from hope of Paradise, exclude me from it"—epitomizes disinterested love. She lived as an ascetic and became a spiritual authority in her time.',
  'Arabic',
  false
);

-- Uways al-Qarani
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'uways-al-qarani',
  'Uways al-Qarani',
  NULL,
  657,
  (SELECT id FROM regions WHERE slug = 'prophetic-arabia'),
  (SELECT id FROM historical_periods WHERE slug = 'companions-early-ascetics'),
  'male',
  'The archetype of the spiritual seeker who never met the Prophet physically yet was connected spiritually',
  'Uways al-Qarani lived in Yemen during the Prophet''s lifetime but never met him in person due to caring for his ill mother. Despite this, he is considered one of the most devoted followers, and the Prophet spoke of him with great respect. He represents the concept of spiritual transmission beyond physical presence (uwaysi transmission), which became an important theme in Sufism.',
  'Arabic',
  false
);

-- Ali ibn Abi Talib
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'ali-ibn-abi-talib',
  'Ali ibn Abi Talib',
  600,
  661,
  (SELECT id FROM regions WHERE slug = 'prophetic-arabia'),
  (SELECT id FROM historical_periods WHERE slug = 'companions-early-ascetics'),
  'male',
  'The fourth Caliph and spiritual exemplar, considered the fountainhead of esoteric knowledge',
  'Ali ibn Abi Talib, cousin and son-in-law of Prophet Muhammad, is revered across Sufism as the transmitter of inner knowledge. Many Sufi orders trace their spiritual lineage back to him. His sayings on spiritual wisdom, ethics, and metaphysics are collected in works like Nahj al-Balagha. He represents the synthesis of outward authority and inward realization.',
  'Arabic',
  false
);

-- Salman al-Farsi
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'salman-al-farsi',
  'Salman al-Farsi',
  NULL,
  656,
  (SELECT id FROM regions WHERE slug = 'persia-iran'),
  (SELECT id FROM historical_periods WHERE slug = 'companions-early-ascetics'),
  'male',
  'Persian companion who represents the universality of Islamic spirituality',
  'Salman al-Farsi was a Persian who converted to Islam after a lifelong spiritual quest. He is celebrated for bringing the idea of digging a trench to defend Medina (Battle of the Trench) and for embodying the principle that spiritual nobility transcends ethnic origins. The Prophet said, "Salman is from us, the People of the House," indicating his deep spiritual kinship.',
  'Persian',
  false
);
