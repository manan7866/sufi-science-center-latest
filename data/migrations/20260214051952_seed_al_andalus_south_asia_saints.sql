/*
  # Seed Al-Andalus & South Asia Saints

  1. Al-Andalus (6 figures)
    - Ibn Arabi (1165-1240)
    - Ibn Sab'in (1217-1271)
    - Abu Madyan (1126-1197)
    - Ibn Barrajan (d. 1141)
    - Ibn al-Arif (1088-1141)
    - Ibn Masarra (883-931)

  2. South Asia (6 figures)
    - Moinuddin Chishti (1143-1236)
    - Nizamuddin Auliya (1238-1325)
    - Shah Waliullah (1703-1762)
    - Ahmad Sirhindi (1564-1624)
    - Bulleh Shah (1680-1757)
    - Waris Ali Shah (1817-1905)
*/

-- AL-ANDALUS

-- Ibn Arabi
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'ibn-arabi',
  'Ibn Arabi (Muhyiddin)',
  1165,
  1240,
  (SELECT id FROM regions WHERE slug = 'al-andalus'),
  (SELECT id FROM historical_periods WHERE slug = 'institutional-orders'),
  'male',
  'The Greatest Master (al-Shaykh al-Akbar) whose metaphysical teachings shaped Islamic mysticism',
  'Ibn Arabi is one of the most influential figures in Islamic mysticism. His doctrine of the Unity of Being (wahdat al-wujud) articulates a sophisticated metaphysics of divine manifestation. His Meccan Openings (Futuh at al-Makkiyya) and Bezels of Wisdom (Fusus al-Hikam) remain foundational texts. He traveled extensively, finally settling in Damascus. His work synthesizes philosophy, theology, poetry, and mystical experience.',
  'Arabic',
  false
);

-- Ibn Sab'in
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'ibn-sabin',
  'Ibn Sab''in',
  1217,
  1271,
  (SELECT id FROM regions WHERE slug = 'al-andalus'),
  (SELECT id FROM historical_periods WHERE slug = 'institutional-orders'),
  'male',
  'Radical philosopher-mystic who emphasized absolute unity',
  'Ibn Sab''in was a controversial Andalusian philosopher-mystic who pushed the doctrine of unity to its most radical conclusions. He corresponded with Emperor Frederick II on philosophical questions. His teachings were considered heretical by orthodox authorities, leading to persecution. He eventually settled in Mecca, where he died. His thought represents the most extreme form of monistic mysticism.',
  'Arabic',
  false
);

-- Abu Madyan
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'abu-madyan',
  'Abu Madyan',
  1126,
  1197,
  (SELECT id FROM regions WHERE slug = 'north-africa'),
  (SELECT id FROM historical_periods WHERE slug = 'institutional-orders'),
  'male',
  'The spiritual patron of North African Sufism',
  'Abu Madyan Shu''ayb was a foundational figure in Maghrebi Sufism. He studied in the East and brought back teachings that profoundly influenced North African spirituality. He emphasized love, poverty, and trust in God. His sayings and poems express the integration of mystical experience with Islamic law. He is considered the spiritual ancestor of many North African orders.',
  'Arabic',
  false
);

-- Ibn Barrajan
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'ibn-barrajan',
  'Ibn Barrajan',
  NULL,
  1141,
  (SELECT id FROM regions WHERE slug = 'al-andalus'),
  (SELECT id FROM historical_periods WHERE slug = 'institutional-orders'),
  'male',
  'Andalusian mystic known for Quranic commentary emphasizing inner meanings',
  'Ibn Barrajan was an Andalusian Sufi who wrote important commentaries on the Quran emphasizing esoteric interpretation. He was accused of claiming Mahdism and executed. His works on the divine names and Quranic symbolism influenced later Andalusian mysticism, including Ibn Arabi. He represents the integration of scholarly Quranic study with mystical insight.',
  'Arabic',
  false
);

-- Ibn al-Arif
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'ibn-al-arif',
  'Ibn al-Arif',
  1088,
  1141,
  (SELECT id FROM regions WHERE slug = 'al-andalus'),
  (SELECT id FROM historical_periods WHERE slug = 'institutional-orders'),
  'male',
  'Leading Andalusian Sufi who systematized mystical teachings',
  'Ibn al-Arif was a prominent Andalusian Sufi who led a community in Almeria. His work Mahasin al-Majalis (Beauties of the Sessions) is an important early systematization of Sufi doctrine in the West. He was summoned to Marrakech by the sultan and died mysteriously soon after. His teachings influenced the development of Andalusian mysticism.',
  'Arabic',
  false
);

-- Ibn Masarra
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'ibn-masarra',
  'Ibn Masarra',
  883,
  931,
  (SELECT id FROM regions WHERE slug = 'al-andalus'),
  (SELECT id FROM historical_periods WHERE slug = 'classical-formation'),
  'male',
  'Early Andalusian mystic-philosopher who integrated Neoplatonism with Islam',
  'Ibn Masarra was an early Andalusian thinker who combined mysticism with philosophical speculation. He established a retreat in the mountains near Cordoba where he taught a circle of disciples. His thought shows Neoplatonic influences and emphasizes contemplation of the divine names. He influenced later Andalusian intellectual traditions, though most of his works are lost.',
  'Arabic',
  false
);

-- SOUTH ASIA

-- Moinuddin Chishti
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'moinuddin-chishti',
  'Moinuddin Chishti',
  1143,
  1236,
  (SELECT id FROM regions WHERE slug = 'ajmer'),
  (SELECT id FROM historical_periods WHERE slug = 'institutional-orders'),
  'male',
  'The patron saint of India who established the Chishti order in South Asia',
  'Khwaja Moinuddin Chishti brought the Chishti order from Central Asia to India, establishing his center in Ajmer. He emphasized love, tolerance, and service to humanity. His approach integrated Sufi spirituality with the Indian context, welcoming people of all backgrounds. His shrine in Ajmer remains one of the most visited pilgrimage sites in South Asia, attracting Muslims, Hindus, and others.',
  'Persian',
  true
);

-- Nizamuddin Auliya
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'nizamuddin-auliya',
  'Nizamuddin Auliya',
  1238,
  1325,
  (SELECT id FROM regions WHERE slug = 'south-asia'),
  (SELECT id FROM historical_periods WHERE slug = 'metaphysical-expansion'),
  'male',
  'The Beloved of God, Delhi''s spiritual anchor who emphasized love over law',
  'Hazrat Nizamuddin Auliya was the most influential Chishti master in Delhi. He trained hundreds of disciples who spread throughout India. He emphasized sama (musical spiritual gatherings) and radical generosity, often giving away everything in his khangah. His relationship with Amir Khusrau, the great Persian-Urdu poet-musician, enriched South Asian spiritual culture. His teachings stress love over formal religion.',
  'Persian',
  false
);

-- Shah Waliullah
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'shah-waliullah',
  'Shah Waliullah Dehlawi',
  1703,
  1762,
  (SELECT id FROM regions WHERE slug = 'south-asia'),
  (SELECT id FROM historical_periods WHERE slug = 'global-spread'),
  'male',
  'Reformist scholar-mystic who synthesized law, theology, and Sufism',
  'Shah Waliullah was a comprehensive Islamic thinker who sought to revive and reform Muslim intellectual life in India. He combined expertise in hadith, jurisprudence, theology, and mysticism. He translated the Quran into Persian and urged Muslims to return to foundational sources while engaging with contemporary challenges. He was affiliated with multiple Sufi orders and emphasized their complementarity.',
  'Persian',
  false
);

-- Ahmad Sirhindi
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'ahmad-sirhindi',
  'Ahmad Sirhindi',
  1564,
  1624,
  (SELECT id FROM regions WHERE slug = 'south-asia'),
  (SELECT id FROM historical_periods WHERE slug = 'global-spread'),
  'male',
  'The Renewer of the Second Millennium who critiqued monistic interpretations',
  'Ahmad Sirhindi, known as Mujaddid Alf-i Thani, was a Naqshbandi master who emphasized the distinction between Creator and creation. He critiqued what he saw as excessive monistic interpretations of wahdat al-wujud. His doctrine of wahdat al-shuhud (Unity of Witnessing) maintains divine transcendence while affirming mystical experience. His letters (Maktubat) were widely influential.',
  'Persian',
  false
);

-- Bulleh Shah
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'bulleh-shah',
  'Bulleh Shah',
  1680,
  1757,
  (SELECT id FROM regions WHERE slug = 'south-asia'),
  (SELECT id FROM historical_periods WHERE slug = 'global-spread'),
  'male',
  'Punjabi Sufi poet who challenged religious orthodoxy and social hierarchies',
  'Bulleh Shah was a Punjabi Sufi poet whose verses remain immensely popular in Pakistan and North India. He was a disciple of Shah Inayat Qadiri. His poetry, written in vernacular Punjabi, challenges religious hypocrisy, caste discrimination, and rigid orthodoxy. His kafis (mystical verses) use humor, irony, and folk idiom to convey profound spiritual truths about divine love and human unity.',
  'Punjabi',
  false
);

-- Waris Ali Shah
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'waris-ali-shah',
  'Waris Ali Shah',
  1817,
  1905,
  (SELECT id FROM regions WHERE slug = 'south-asia'),
  (SELECT id FROM historical_periods WHERE slug = 'reform-renewal'),
  'male',
  'The wandering mystic who transcended religious boundaries',
  'Waris Ali Shah was a wandering Sufi who traveled extensively throughout India and beyond. He was known for his unconventional behavior, appearing sometimes as a Muslim saint, sometimes mingling with Hindu ascetics. He emphasized the universality of divine love and attracted followers from all religious backgrounds. His approach exemplifies the syncretic spirituality that developed in South Asian Sufism.',
  'Urdu',
  false
);
