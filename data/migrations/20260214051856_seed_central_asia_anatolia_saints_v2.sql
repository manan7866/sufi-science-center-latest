/*
  # Seed Central Asia & Anatolia Saints

  1. Central Asia (6 figures)
    - Bahauddin Naqshband (1318-1389)
    - Ahmad Yasawi (1103-1166)
    - Hakim al-Tirmidhi (750-869)
    - Ubaydullah Ahrar (1404-1490)
    - Khoja Abdullah Ansari (1006-1088)
    - Makhdum A'zam Dahbidi (1461-1541)

  2. Anatolia (6 figures)
    - Jalal ad-Din Rumi (1207-1273)
    - Shams of Tabriz (1185-1248)
    - Yunus Emre (1238-1320)
    - Haji Bektash Veli (1209-1271)
    - Aziz Mahmud Hudayi (1541-1628)
    - Niyazi Misri (1618-1694)
*/

-- CENTRAL ASIA

-- Bahauddin Naqshband
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'bahauddin-naqshband',
  'Bahauddin Naqshband',
  1318,
  1389,
  (SELECT id FROM regions WHERE slug = 'bukhara'),
  (SELECT id FROM historical_periods WHERE slug = 'metaphysical-expansion'),
  'male',
  'Founder of the Naqshbandi order, emphasizing silent dhikr and integration with society',
  'Bahauddin Naqshband founded the Naqshbandi order in Central Asia. Unlike other orders, the Naqshbandi emphasize silent remembrance (dhikr khafi) and active participation in society rather than withdrawal. The principle of "solitude in the crowd" encourages maintaining inner awareness while engaging outwardly. The order spread globally and remains one of the most influential Sufi paths.',
  'Persian',
  true
);

-- Ahmad Yasawi
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'ahmad-yasawi',
  'Ahmad Yasawi',
  1103,
  1166,
  (SELECT id FROM regions WHERE slug = 'central-asia'),
  (SELECT id FROM historical_periods WHERE slug = 'institutional-orders'),
  'male',
  'Turkic Sufi poet who brought Islam to Central Asian nomads through Turkish poetry',
  'Ahmad Yasawi was a Turkic Sufi who spread Islam among nomadic peoples through vernacular poetry. His Divan-i Hikmat (Book of Wisdom) contains spiritual teachings in simple Turkic language accessible to ordinary people. He emphasized asceticism and retreated to an underground cell for the latter part of his life. His tomb in Kazakhstan remains a major pilgrimage site.',
  'Turkic',
  true
);

-- Hakim al-Tirmidhi
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'hakim-al-tirmidhi',
  'Hakim al-Tirmidhi',
  750,
  869,
  (SELECT id FROM regions WHERE slug = 'central-asia'),
  (SELECT id FROM historical_periods WHERE slug = 'classical-formation'),
  'male',
  'Early mystic who systematized spiritual states and stations',
  'Hakim al-Tirmidhi was an early Sufi theoretician who systematized the concepts of spiritual states (ahwal) and stations (maqamat). His works include discussions on sainthood (wilaya) and the seal of saints. He emphasized the interior dimensions of religious practice and developed sophisticated psychological and metaphysical frameworks still studied today.',
  'Arabic',
  false
);

-- Ubaydullah Ahrar
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'ubaydullah-ahrar',
  'Ubaydullah Ahrar',
  1404,
  1490,
  (SELECT id FROM regions WHERE slug = 'central-asia'),
  (SELECT id FROM historical_periods WHERE slug = 'metaphysical-expansion'),
  'male',
  'Leading Naqshbandi master who combined spiritual authority with social influence',
  'Khoja Ahrar (Ubaydullah Ahrar) was one of the most influential Naqshbandi masters. He combined spiritual leadership with economic and political influence, using his wealth to support religious institutions and the poor. He emphasized the Naqshbandi principle of being "in the world but not of it," showing how spiritual realization could manifest in active social engagement.',
  'Persian',
  false
);

-- Makhdum A'zam Dahbidi
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'makhdum-azam',
  'Makhdum A''zam Dahbidi',
  1461,
  1541,
  (SELECT id FROM regions WHERE slug = 'central-asia'),
  (SELECT id FROM historical_periods WHERE slug = 'global-spread'),
  'male',
  'Naqshbandi-Ahrari master who spread the order to South Asia',
  'Makhdum A''zam was a prominent Naqshbandi sheikh who helped establish the order in South Asia. He trained numerous disciples who carried the teachings throughout India. His synthesis of Central Asian Naqshbandi methods with South Asian religious culture helped the order take root and flourish in the Indian subcontinent.',
  'Persian',
  false
);

-- Khoja Abdullah Ansari
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'khoja-abdullah-ansari',
  'Khoja Abdullah Ansari',
  1006,
  1088,
  (SELECT id FROM regions WHERE slug = 'central-asia'),
  (SELECT id FROM historical_periods WHERE slug = 'institutional-orders'),
  'male',
  'The "Sage of Herat," renowned for intimate Persian prayers and spiritual stages',
  'Abdullah Ansari of Herat was a Sufi master and scholar known for his devotional works in Persian. His Munajat (Intimate Prayers) are masterpieces of Persian prose expressing deep longing for God. His Manazil al-Sa''irin (Stations of the Wayfarers) systematizes 100 spiritual stations on the mystical path. He combined Hanbali orthodoxy with Sufi practice.',
  'Persian',
  false
);

-- ANATOLIA

-- Jalal ad-Din Rumi
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'jalal-ad-din-rumi',
  'Jalal ad-Din Rumi',
  1207,
  1273,
  (SELECT id FROM regions WHERE slug = 'anatolia'),
  (SELECT id FROM historical_periods WHERE slug = 'institutional-orders'),
  'male',
  'The poet of divine love whose Masnavi is called the "Quran in Persian"',
  'Rumi is perhaps the most famous Sufi poet worldwide. His encounter with the wandering dervish Shams of Tabriz transformed him from a sober scholar into an ecstatic lover of God. His massive poetic work, the Masnavi, contains over 25,000 verses exploring every dimension of the spiritual path. The Mevlevi order founded by his followers practices the whirling dance (sama) as a form of moving meditation.',
  'Persian',
  true
);

-- Shams of Tabriz
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'shams-of-tabriz',
  'Shams of Tabriz',
  1185,
  1248,
  (SELECT id FROM regions WHERE slug = 'persia-iran'),
  (SELECT id FROM historical_periods WHERE slug = 'institutional-orders'),
  'male',
  'The mysterious dervish who catalyzed Rumi''s spiritual transformation',
  'Shams-i Tabrizi was a wandering mystic who became Rumi''s spiritual companion and catalyst. Their relationship, marked by intense spiritual friendship, inspired Rumi''s greatest poetry. Shams disappeared mysteriously, possibly murdered by jealous disciples. He represents the archetype of the radical, uncompromising spiritual guide who shatters conventional religiosity to reveal direct divine encounter.',
  'Persian',
  false
);

-- Yunus Emre
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'yunus-emre',
  'Yunus Emre',
  1238,
  1320,
  (SELECT id FROM regions WHERE slug = 'anatolia'),
  (SELECT id FROM historical_periods WHERE slug = 'metaphysical-expansion'),
  'male',
  'Turkish folk poet who expressed profound mysticism in simple language',
  'Yunus Emre was a Turkish Sufi poet who wrote in vernacular Turkish, making mystical teachings accessible to common people. His poems emphasize divine love, humility, and tolerance. His famous line "I am not here on Earth for strife, Love is the mission of my life" captures his message. He influenced Turkish literature and spirituality for centuries.',
  'Turkish',
  false
);

-- Haji Bektash Veli
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'haji-bektash-veli',
  'Haji Bektash Veli',
  1209,
  1271,
  (SELECT id FROM regions WHERE slug = 'anatolia'),
  (SELECT id FROM historical_periods WHERE slug = 'institutional-orders'),
  'male',
  'Founder of the Bektashi order, emphasizing love, tolerance, and syncretism',
  'Haji Bektash Veli founded the Bektashi order in Anatolia, which developed unique practices blending Islamic mysticism with pre-Islamic Turkish traditions. The order became associated with the Janissaries and emphasized tolerance, education, and ethical conduct. Bektashis have a flexible interpretation of Islamic law, focusing on inner meaning over outward form.',
  'Turkish',
  true
);

-- Aziz Mahmud Hudayi
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'aziz-mahmud-hudayi',
  'Aziz Mahmud Hudayi',
  1541,
  1628,
  (SELECT id FROM regions WHERE slug = 'ottoman-world'),
  (SELECT id FROM historical_periods WHERE slug = 'global-spread'),
  'male',
  'Ottoman scholar-saint who balanced orthodox scholarship with Sufi practice',
  'Aziz Mahmud Hudayi was a prominent Ottoman Sufi who served as both a scholar and spiritual guide in Istanbul. He wrote extensively on Islamic law, theology, and mysticism, demonstrating their compatibility. His works defend Sufism against critics while ensuring it remains grounded in orthodox practice. He represents the synthesis of scholarly and mystical traditions.',
  'Turkish',
  false
);

-- Niyazi Misri
INSERT INTO saints (slug, name, birth_year, death_year, region_id, historical_period_id, gender, short_summary, biography, primary_language, is_founder)
VALUES (
  'niyazi-misri',
  'Niyazi Misri',
  1618,
  1694,
  (SELECT id FROM regions WHERE slug = 'ottoman-world'),
  (SELECT id FROM historical_periods WHERE slug = 'global-spread'),
  'male',
  'Controversial Ottoman poet-mystic known for antinomian expressions',
  'Niyazi Misri was a mystical poet who expressed controversial views that led to his persecution. His poetry boldly proclaimed the unity of existence and criticized religious formalism. Despite imprisonment and exile, he continued teaching and writing. His works exemplify the tension between experiential mysticism and orthodox religious authority in the Ottoman period.',
  'Turkish',
  false
);
