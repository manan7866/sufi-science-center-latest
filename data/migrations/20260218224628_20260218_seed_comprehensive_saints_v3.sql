/*
  # Comprehensive Saints Seed Data v3

  ## Summary
  Seeds additional Sufi masters covering all lineages, regions, eras, and theme clusters.
  Fixed: includes slug field (generated from name).
*/

DO $$
DECLARE
  v_formative_id uuid;
  v_qadiri_id uuid;
  v_naqsh_id uuid;
  v_chishti_id uuid;
  v_shadhili_id uuid;
  v_suhrawardi_id uuid;
  v_rifai_id uuid;
  v_kubra_id uuid;
  v_mevlevi_id uuid;
  v_yasawi_id uuid;
  v_bektashi_id uuid;
  v_tijani_id uuid;
  v_sanusi_id uuid;
  v_mujaddidi_id uuid;
  v_khalidi_id uuid;
  v_nizami_id uuid;
  v_sabiri_id uuid;

  r_eiw uuid; r_hijaz uuid; r_basra uuid; r_kufa uuid; r_baghdad_eiw uuid;
  r_arabian uuid; r_persia uuid; r_nishapur uuid; r_herat uuid;
  r_isfahan uuid; r_shiraz uuid; r_central_asia uuid; r_bukhara uuid;
  r_samarkand uuid; r_south_asia uuid; r_ajmer uuid; r_delhi uuid;
  r_lahore uuid; r_multan uuid; r_kashmir uuid; r_anatolia uuid;
  r_konya uuid; r_north_africa uuid; r_fez uuid; r_cairo uuid;
  r_al_andalus uuid; r_ottoman uuid; r_istanbul uuid; r_levant uuid;
  r_sub_saharan uuid;

  e1 uuid; e2 uuid; e3 uuid; e4 uuid; e5 uuid; e6 uuid; e7 uuid;

  t_unity uuid; t_ontology uuid; t_cosmology uuid; t_divine_names uuid;
  t_prophecy uuid; t_wilayah uuid; t_transformation uuid; t_tazkiyah uuid;
  t_psych uuid; t_nafs uuid; t_dreams uuid; t_dhikr uuid; t_love uuid;
  t_sama uuid; t_ritual uuid; t_asceticism uuid; t_adab uuid;
  t_silsila uuid; t_authority uuid; t_initiation uuid; t_inst_orders uuid;
  t_fiqh uuid; t_kalam uuid; t_interfaith uuid; t_philosophy uuid;
  t_reform uuid; t_social uuid; t_political uuid; t_gender uuid;
  t_education uuid; t_poetry uuid;

  s_id uuid;
BEGIN
  SELECT id INTO v_formative_id FROM lineages WHERE slug = 'formative-sufi-era';
  SELECT id INTO v_qadiri_id FROM lineages WHERE slug = 'qadiriyya';
  SELECT id INTO v_naqsh_id FROM lineages WHERE slug = 'naqshbandiyya';
  SELECT id INTO v_chishti_id FROM lineages WHERE slug = 'chishtiyya';
  SELECT id INTO v_shadhili_id FROM lineages WHERE slug = 'shadhiliyya';
  SELECT id INTO v_suhrawardi_id FROM lineages WHERE slug = 'suhrawardiyya';
  SELECT id INTO v_rifai_id FROM lineages WHERE slug = 'rifaiyya';
  SELECT id INTO v_kubra_id FROM lineages WHERE slug = 'kubrawiyya';
  SELECT id INTO v_mevlevi_id FROM lineages WHERE slug = 'mevleviyya';
  SELECT id INTO v_yasawi_id FROM lineages WHERE slug = 'yasawiyya';
  SELECT id INTO v_bektashi_id FROM lineages WHERE slug = 'bektashiyya';
  SELECT id INTO v_tijani_id FROM lineages WHERE slug = 'tijaniyya';
  SELECT id INTO v_sanusi_id FROM lineages WHERE slug = 'sanusiyya';
  SELECT id INTO v_mujaddidi_id FROM lineages WHERE slug = 'mujaddidiyya';
  SELECT id INTO v_khalidi_id FROM lineages WHERE slug = 'khalidiyya';
  SELECT id INTO v_nizami_id FROM lineages WHERE slug = 'nizamiyya';
  SELECT id INTO v_sabiri_id FROM lineages WHERE slug = 'sabiriyya';

  SELECT id INTO r_eiw FROM regions WHERE slug = 'early-islamic-world';
  SELECT id INTO r_hijaz FROM regions WHERE slug = 'hijaz';
  SELECT id INTO r_basra FROM regions WHERE slug = 'basra';
  SELECT id INTO r_kufa FROM regions WHERE slug = 'kufa';
  SELECT id INTO r_baghdad_eiw FROM regions WHERE slug = 'baghdad-eiw';
  SELECT id INTO r_arabian FROM regions WHERE slug = 'arabian-peninsula';
  SELECT id INTO r_persia FROM regions WHERE slug = 'persia-iran';
  SELECT id INTO r_nishapur FROM regions WHERE slug = 'nishapur';
  SELECT id INTO r_herat FROM regions WHERE slug = 'herat';
  SELECT id INTO r_isfahan FROM regions WHERE slug = 'isfahan';
  SELECT id INTO r_shiraz FROM regions WHERE slug = 'shiraz';
  SELECT id INTO r_central_asia FROM regions WHERE slug = 'central-asia';
  SELECT id INTO r_bukhara FROM regions WHERE slug = 'bukhara';
  SELECT id INTO r_samarkand FROM regions WHERE slug = 'samarkand';
  SELECT id INTO r_south_asia FROM regions WHERE slug = 'south-asia';
  SELECT id INTO r_ajmer FROM regions WHERE slug = 'ajmer';
  SELECT id INTO r_delhi FROM regions WHERE slug = 'delhi';
  SELECT id INTO r_lahore FROM regions WHERE slug = 'lahore';
  SELECT id INTO r_multan FROM regions WHERE slug = 'multan';
  SELECT id INTO r_kashmir FROM regions WHERE slug = 'kashmir';
  SELECT id INTO r_anatolia FROM regions WHERE slug = 'anatolia';
  SELECT id INTO r_konya FROM regions WHERE slug = 'konya';
  SELECT id INTO r_north_africa FROM regions WHERE slug = 'north-africa';
  SELECT id INTO r_fez FROM regions WHERE slug = 'fez';
  SELECT id INTO r_cairo FROM regions WHERE slug = 'cairo';
  SELECT id INTO r_al_andalus FROM regions WHERE slug = 'al-andalus';
  SELECT id INTO r_ottoman FROM regions WHERE slug = 'ottoman-world';
  SELECT id INTO r_istanbul FROM regions WHERE slug = 'istanbul';
  SELECT id INTO r_levant FROM regions WHERE slug = 'levant';
  SELECT id INTO r_sub_saharan FROM regions WHERE slug = 'sub-saharan-africa';

  SELECT id INTO e1 FROM historical_periods WHERE slug = 'prophetic-foundational-transmission';
  SELECT id INTO e2 FROM historical_periods WHERE slug = 'early-ascetic-ethical-formation';
  SELECT id INTO e3 FROM historical_periods WHERE slug = 'classical-theoretical-consolidation';
  SELECT id INTO e4 FROM historical_periods WHERE slug = 'institutional-tariqa-formation';
  SELECT id INTO e5 FROM historical_periods WHERE slug = 'metaphysical-philosophical-expansion';
  SELECT id INTO e6 FROM historical_periods WHERE slug = 'imperial-global-expansion';
  SELECT id INTO e7 FROM historical_periods WHERE slug = 'reform-renewal-modern-rearticulation';

  SELECT id INTO t_unity FROM themes WHERE slug = 'unity-of-being';
  SELECT id INTO t_ontology FROM themes WHERE slug = 'ontology-metaphysics';
  SELECT id INTO t_cosmology FROM themes WHERE slug = 'cosmology';
  SELECT id INTO t_divine_names FROM themes WHERE slug = 'divine-names-attributes';
  SELECT id INTO t_prophecy FROM themes WHERE slug = 'prophecy-revelation';
  SELECT id INTO t_wilayah FROM themes WHERE slug = 'wilayah-sainthood';
  SELECT id INTO t_transformation FROM themes WHERE slug = 'spiritual-transformation';
  SELECT id INTO t_tazkiyah FROM themes WHERE slug = 'tazkiyah-purification';
  SELECT id INTO t_psych FROM themes WHERE slug = 'spiritual-psychology';
  SELECT id INTO t_nafs FROM themes WHERE slug = 'nafs-selfhood';
  SELECT id INTO t_dreams FROM themes WHERE slug = 'dreams-visions';
  SELECT id INTO t_dhikr FROM themes WHERE slug = 'contemplation-dhikr';
  SELECT id INTO t_love FROM themes WHERE slug = 'divine-love-devotion';
  SELECT id INTO t_sama FROM themes WHERE slug = 'sama-sacred-music';
  SELECT id INTO t_ritual FROM themes WHERE slug = 'ritual-practice';
  SELECT id INTO t_asceticism FROM themes WHERE slug = 'asceticism-renunciation';
  SELECT id INTO t_adab FROM themes WHERE slug = 'adab-spiritual-etiquette';
  SELECT id INTO t_silsila FROM themes WHERE slug = 'silsila-lineage-transmission';
  SELECT id INTO t_authority FROM themes WHERE slug = 'spiritual-authority-shaykhhood';
  SELECT id INTO t_initiation FROM themes WHERE slug = 'initiation-bayah';
  SELECT id INTO t_inst_orders FROM themes WHERE slug = 'institutional-orders';
  SELECT id INTO t_fiqh FROM themes WHERE slug = 'jurisprudence-fiqh';
  SELECT id INTO t_kalam FROM themes WHERE slug = 'theology-kalam';
  SELECT id INTO t_interfaith FROM themes WHERE slug = 'interfaith-dialogue';
  SELECT id INTO t_philosophy FROM themes WHERE slug = 'philosophy-mystical-thought';
  SELECT id INTO t_reform FROM themes WHERE slug = 'reform-renewal';
  SELECT id INTO t_social FROM themes WHERE slug = 'social-reform-justice';
  SELECT id INTO t_political FROM themes WHERE slug = 'political-mysticism';
  SELECT id INTO t_gender FROM themes WHERE slug = 'gender-spirituality';
  SELECT id INTO t_education FROM themes WHERE slug = 'education-knowledge-preservation';
  SELECT id INTO t_poetry FROM themes WHERE slug = 'poetry-artistic-expression';

  -- Abu Bakr al-Siddiq
  INSERT INTO saints (name, slug, birth_year, death_year, region_id, short_summary, biography)
  SELECT 'Abu Bakr al-Siddiq', 'abu-bakr-al-siddiq', 573, 634, r_hijaz,
    'The first Caliph and closest companion of the Prophet, considered the primary transmitter of the silent Sufi chain (silsila khafi) running through the Naqshbandiyya.',
    'Abu Bakr al-Siddiq is venerated in Sufi tradition as the first link in the silent chain of spiritual transmission (silsila khafi). His closeness to the Prophet, described in the Quran as "the second of two in the cave," symbolizes the heart-to-heart transmission that defines the innermost dimension of Sufism. He is the spiritual grandfather of most Naqshbandi lineages.'
  WHERE NOT EXISTS (SELECT 1 FROM saints WHERE slug = 'abu-bakr-al-siddiq' AND deleted_at IS NULL);
  SELECT id INTO s_id FROM saints WHERE slug = 'abu-bakr-al-siddiq' AND deleted_at IS NULL LIMIT 1;
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_formative_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_formative_id);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_silsila WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_silsila);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_authority WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_authority);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_prophecy WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_prophecy);

  -- Junayd al-Baghdadi
  INSERT INTO saints (name, slug, birth_year, death_year, region_id, short_summary, biography)
  SELECT 'Junayd al-Baghdadi', 'junayd-al-baghdadi', 830, 910, r_baghdad_eiw,
    'Master of the Masters (Sayyid al-Taʾifa), who systematized Sufi doctrine and established the principle of sobriety in mystical experience, foundational to classical Sufism.',
    'Junayd al-Baghdadi is one of the most influential figures in the history of Sufism. Born in Baghdad, he synthesized ecstatic experience with legal observance, arguing that the highest mystical states must be grounded in sharia. His letters and teachings became canonical texts, and virtually every major Sufi lineage traces through him.'
  WHERE NOT EXISTS (SELECT 1 FROM saints WHERE slug = 'junayd-al-baghdadi' AND deleted_at IS NULL);
  SELECT id INTO s_id FROM saints WHERE slug = 'junayd-al-baghdadi' AND deleted_at IS NULL LIMIT 1;
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_formative_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_formative_id);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_tazkiyah WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_tazkiyah);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_psych WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_psych);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_fiqh WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_fiqh);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_nafs WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_nafs);

  -- Mansur al-Hallaj
  INSERT INTO saints (name, slug, birth_year, death_year, region_id, short_summary, biography)
  SELECT 'Mansur al-Hallaj', 'mansur-al-hallaj', 858, 922, r_baghdad_eiw,
    'Ecstatic mystic and martyr of love, famous for his declaration "Ana al-Haqq" (I am the Truth). His trial and execution became the defining moment of mystical witness in Islamic history.',
    'Al-Hallaj was a Persian mystic whose life and martyrdom in Baghdad in 922 CE became legendary. His utterance "Ana al-Haqq" was interpreted by authorities as a claim of divinity, leading to his public execution. Mystics across traditions have seen him as the supreme example of fana (annihilation) in the Divine. His poetry continues to inspire Sufi seekers globally.'
  WHERE NOT EXISTS (SELECT 1 FROM saints WHERE slug = 'mansur-al-hallaj' AND deleted_at IS NULL);
  SELECT id INTO s_id FROM saints WHERE slug = 'mansur-al-hallaj' AND deleted_at IS NULL LIMIT 1;
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_formative_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_formative_id);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_love WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_love);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_unity WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_unity);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_poetry WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_poetry);

  -- Dhu al-Nun al-Misri
  INSERT INTO saints (name, slug, birth_year, death_year, region_id, short_summary, biography)
  SELECT 'Dhu al-Nun al-Misri', 'dhu-al-nun-al-misri', 796, 861, r_cairo,
    'Egyptian mystic who introduced the concept of maʿrifa (gnosis) into Sufi discourse, and the first to systematically articulate the maqamat (stations) of the spiritual path.',
    'Dhu al-Nun al-Misri is one of the great early masters of the Sufi path, born in Upper Egypt. He was the first to use the term marifa to describe direct experiential knowledge of God, distinguishing it from mere rational or transmitted knowledge. His articulation of spiritual stations became foundational to subsequent Sufi theory.'
  WHERE NOT EXISTS (SELECT 1 FROM saints WHERE slug = 'dhu-al-nun-al-misri' AND deleted_at IS NULL);
  SELECT id INTO s_id FROM saints WHERE slug = 'dhu-al-nun-al-misri' AND deleted_at IS NULL LIMIT 1;
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_formative_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_formative_id);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_ontology WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_ontology);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_philosophy WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_philosophy);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_transformation WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_transformation);

  -- Abd al-Qadir al-Jilani
  INSERT INTO saints (name, slug, birth_year, death_year, region_id, short_summary, biography)
  SELECT 'Abd al-Qadir al-Jilani', 'abd-al-qadir-al-jilani', 1078, 1166, r_baghdad_eiw,
    'Founder of the Qadiriyya order and one of the most venerated saints in Islamic history. Known as the Sultan of the Awliya, his order spread from Baghdad to become the largest Sufi order globally.',
    'Abd al-Qadir al-Jilani was a Persian-born scholar, jurist, and mystic who settled in Baghdad. He established what became the Qadiriyya order, the first institutionalized Sufi tariqa. His sermons combine rigorous legal scholarship with mystical depth. His shrine in Baghdad remains one of the most visited in the Muslim world, drawing pilgrims from India to West Africa.'
  WHERE NOT EXISTS (SELECT 1 FROM saints WHERE slug = 'abd-al-qadir-al-jilani' AND deleted_at IS NULL);
  SELECT id INTO s_id FROM saints WHERE slug = 'abd-al-qadir-al-jilani' AND deleted_at IS NULL LIMIT 1;
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_qadiri_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_qadiri_id);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_authority WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_authority);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_inst_orders WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_inst_orders);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_wilayah WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_wilayah);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_fiqh WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_fiqh);

  -- Ahmad al-Rifai
  INSERT INTO saints (name, slug, birth_year, death_year, region_id, short_summary, biography)
  SELECT 'Ahmad al-Rifai', 'ahmad-al-rifai', 1118, 1182, r_baghdad_eiw,
    'Founder of the Rifaʿiyya order, known for its intense devotional practices. His order was the second major institutional tariqa, spreading widely through Iraq, Egypt, and the Levant.',
    'Ahmad al-Rifai was an Arab mystic born in southern Iraq who founded the Rifaiyya, one of the oldest Sufi orders. Known for ecstatic devotional practices, al-Rifai himself emphasized love, poverty, and service. His order spread rapidly through the Arab world. He is buried at Umm Abida in Iraq.'
  WHERE NOT EXISTS (SELECT 1 FROM saints WHERE slug = 'ahmad-al-rifai' AND deleted_at IS NULL);
  SELECT id INTO s_id FROM saints WHERE slug = 'ahmad-al-rifai' AND deleted_at IS NULL LIMIT 1;
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_rifai_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_rifai_id);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_inst_orders WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_inst_orders);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_love WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_love);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_ritual WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_ritual);

  -- Shihab al-Din Suhrawardi (order founder)
  INSERT INTO saints (name, slug, birth_year, death_year, region_id, short_summary, biography)
  SELECT 'Shihab al-Din Suhrawardi', 'shihab-al-din-suhrawardi', 1145, 1234, r_baghdad_eiw,
    'Founder of the Suhrawardiyya order and author of Awarif al-Maarif, the authoritative manual of Sufi conduct bridging jurisprudence and mystical practice.',
    'Abu Hafs Umar al-Suhrawardi was a Baghdad-born mystic who founded the Suhrawardiyya order and wrote Awarif al-Maarif, which became the standard reference work on Sufi ethics and practice. He was trained in Shafii law, representing the synthesizing tendency of Sufism with orthodox jurisprudence. His order spread to India, Iran, and the Arab world.'
  WHERE NOT EXISTS (SELECT 1 FROM saints WHERE slug = 'shihab-al-din-suhrawardi' AND deleted_at IS NULL);
  SELECT id INTO s_id FROM saints WHERE slug = 'shihab-al-din-suhrawardi' AND deleted_at IS NULL LIMIT 1;
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_suhrawardi_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_suhrawardi_id);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_inst_orders WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_inst_orders);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_adab WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_adab);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_education WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_education);

  -- Bahauddin Zakariya (Suhrawardiyya, Multan)
  INSERT INTO saints (name, slug, birth_year, death_year, region_id, short_summary, biography)
  SELECT 'Bahauddin Zakariya', 'bahauddin-zakariya', 1170, 1267, r_multan,
    'The leading Suhrawardi master of South Asia who established the order in Multan. Combined spiritual authority with political influence in the Sultanate era.',
    'Bahauddin Zakariya of Multan studied in Baghdad under Suhrawardi himself before establishing the Suhrawardiyya in South Asia. His khanqah in Multan accumulated considerable influence, accepting royal patronage unlike the Chishtis. His shrine in Multan remains a major pilgrimage destination today.'
  WHERE NOT EXISTS (SELECT 1 FROM saints WHERE slug = 'bahauddin-zakariya' AND deleted_at IS NULL);
  SELECT id INTO s_id FROM saints WHERE slug = 'bahauddin-zakariya' AND deleted_at IS NULL LIMIT 1;
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_suhrawardi_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_suhrawardi_id);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_inst_orders WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_inst_orders);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_political WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_political);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_silsila WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_silsila);

  -- Abu al-Hasan al-Shadhili
  INSERT INTO saints (name, slug, birth_year, death_year, region_id, short_summary, biography)
  SELECT 'Abu al-Hasan al-Shadhili', 'abu-al-hasan-al-shadhili', 1196, 1258, r_cairo,
    'Founder of the Shadhiliyya, one of the most influential orders in North Africa and the Mediterranean. His teaching centered on integrating outer life with inner spiritual realization.',
    'Abu al-Hasan al-Shadhili was a Moroccan-born mystic who founded the Shadhiliyya in North Africa and Egypt. Unlike orders emphasizing ascetic withdrawal, he advocated full engagement with worldly life while maintaining inner presence. The Shadhiliyya remains one of the most widespread orders in the Arab world, Europe, and the West.'
  WHERE NOT EXISTS (SELECT 1 FROM saints WHERE slug = 'abu-al-hasan-al-shadhili' AND deleted_at IS NULL);
  SELECT id INTO s_id FROM saints WHERE slug = 'abu-al-hasan-al-shadhili' AND deleted_at IS NULL LIMIT 1;
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_shadhili_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_shadhili_id);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_inst_orders WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_inst_orders);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_dhikr WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_dhikr);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_tazkiyah WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_tazkiyah);

  -- Baba Farid Ganj-e-Shakar
  INSERT INTO saints (name, slug, birth_year, death_year, region_id, short_summary, biography)
  SELECT 'Baba Farid Ganj-e-Shakar', 'baba-farid-ganj-e-shakar', 1179, 1266, r_multan,
    'One of the most beloved Chishti saints of the Punjab, whose Punjabi verses were canonized in the Sikh Guru Granth Sahib — a unique bridge between Sufi and Sikh traditions.',
    'Fariduddin Masud, known as Baba Farid, was a Chishti Sabiri master whose shrine at Pakpattan became one of the most sacred sites in the Punjab. His simple, deeply human Punjabi poetry expressing longing for God was preserved in the Sikh scripture — a unique instance of a Sufi saint works being canonized in another religion scripture.'
  WHERE NOT EXISTS (SELECT 1 FROM saints WHERE slug = 'baba-farid-ganj-e-shakar' AND deleted_at IS NULL);
  SELECT id INTO s_id FROM saints WHERE slug = 'baba-farid-ganj-e-shakar' AND deleted_at IS NULL LIMIT 1;
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_chishti_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_chishti_id);
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_sabiri_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_sabiri_id);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_poetry WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_poetry);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_interfaith WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_interfaith);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_love WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_love);

  -- Ibn Ata Allah al-Iskandari
  INSERT INTO saints (name, slug, birth_year, death_year, region_id, short_summary, biography)
  SELECT 'Ibn Ata Allah al-Iskandari', 'ibn-ata-allah-al-iskandari', 1259, 1309, r_cairo,
    'Third master of the Shadhiliyya and author of the Hikam (Aphorisms), one of the most celebrated works of Sufi wisdom literature, widely memorized across the Muslim world.',
    'Ibn Ata Allah al-Iskandari was an Egyptian Sufi master whose Kitab al-Hikam remains one of the most read spiritual texts in Islam. A student of Abu al-Abbas al-Mursi, he systematized Shadhili teachings while being fully trained in Maliki jurisprudence. His aphorisms distill the highest stations of spiritual realization into luminous sentences that have guided seekers for seven centuries.'
  WHERE NOT EXISTS (SELECT 1 FROM saints WHERE slug = 'ibn-ata-allah-al-iskandari' AND deleted_at IS NULL);
  SELECT id INTO s_id FROM saints WHERE slug = 'ibn-ata-allah-al-iskandari' AND deleted_at IS NULL LIMIT 1;
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_shadhili_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_shadhili_id);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_philosophy WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_philosophy);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_education WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_education);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_tazkiyah WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_tazkiyah);

  -- Amir Khusrau Dehlawi
  INSERT INTO saints (name, slug, birth_year, death_year, region_id, short_summary, biography)
  SELECT 'Amir Khusrau Dehlawi', 'amir-khusrau-dehlawi', 1253, 1325, r_delhi,
    'Disciple of Nizamuddin Auliya, renowned poet, musician, and credited inventor of the qawwali musical form — one of the greatest literary figures of the medieval Indic world.',
    'Amir Khusrau was a Chishti disciple of Nizamuddin Auliya and one of medieval India most celebrated poets, musicians, and scholars. He composed in Persian, Hindi, and early Urdu, pioneering the qawwali devotional music tradition. He is considered a founding figure of Hindustani classical music.'
  WHERE NOT EXISTS (SELECT 1 FROM saints WHERE slug = 'amir-khusrau-dehlawi' AND deleted_at IS NULL);
  SELECT id INTO s_id FROM saints WHERE slug = 'amir-khusrau-dehlawi' AND deleted_at IS NULL LIMIT 1;
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_chishti_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_chishti_id);
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_nizami_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_nizami_id);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_sama WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_sama);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_poetry WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_poetry);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_love WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_love);

  -- Hafiz Shirazi
  INSERT INTO saints (name, slug, birth_year, death_year, region_id, short_summary, biography)
  SELECT 'Hafiz Shirazi', 'hafiz-shirazi', 1315, 1390, r_shiraz,
    'The supreme lyric poet of the Persian Sufi tradition. His Diwan is the most widely read Persian poetry collection, used for divination and considered a mirror of mystical truth.',
    'Shams al-Din Muhammad Hafiz of Shiraz is regarded as the master of the ghazal form and the pinnacle of Persian lyric poetry. His verses, apparently about wine and love, are understood as both earthly and divine love poetry. His Diwan is found in virtually every Persian-speaking household and has been translated into dozens of languages.'
  WHERE NOT EXISTS (SELECT 1 FROM saints WHERE slug = 'hafiz-shirazi' AND deleted_at IS NULL);
  SELECT id INTO s_id FROM saints WHERE slug = 'hafiz-shirazi' AND deleted_at IS NULL LIMIT 1;
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_poetry WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_poetry);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_love WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_love);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_unity WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_unity);

  -- Sidi Ahmad al-Tijani
  INSERT INTO saints (name, slug, birth_year, death_year, region_id, short_summary, biography)
  SELECT 'Sidi Ahmad al-Tijani', 'sidi-ahmad-al-tijani', 1737, 1815, r_fez,
    'Founder of the Tijaniyya order in Fez, one of the most widespread orders in West Africa. He claimed to have received his spiritual chain directly from the Prophet in a waking vision.',
    'Ahmad ibn Muhammad al-Tijani was born in Algeria and received his founding vision in Fez, Morocco in 1782. The Tijaniyya spread rapidly throughout West Africa, North Africa, and Sudan, becoming one of the largest Sufi orders in the world with tens of millions of followers. He is buried in Fez.'
  WHERE NOT EXISTS (SELECT 1 FROM saints WHERE slug = 'sidi-ahmad-al-tijani' AND deleted_at IS NULL);
  SELECT id INTO s_id FROM saints WHERE slug = 'sidi-ahmad-al-tijani' AND deleted_at IS NULL LIMIT 1;
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_tijani_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_tijani_id);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_inst_orders WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_inst_orders);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_silsila WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_silsila);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_social WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_social);

  -- Muhammad ibn Ali al-Sanusi
  INSERT INTO saints (name, slug, birth_year, death_year, region_id, short_summary, biography)
  SELECT 'Muhammad ibn Ali al-Sanusi', 'muhammad-ibn-ali-al-sanusi', 1787, 1859, r_north_africa,
    'Founder of the Sanusiyya order in Libya, combining return to Quran and Hadith with the Sufi path. His order became a major political and religious force across North Africa and the Sahara.',
    'Muhammad ibn Ali al-Sanusi founded the Sanusiyya order in Libya in the 1840s. He sought to reform Sufism by grounding it firmly in Quran, Hadith, and the four legal schools. His order spread across Libya, Chad, and Sudan, becoming a significant political force that resisted colonial conquest, with the Sanusi family later ruling Libya as kings.'
  WHERE NOT EXISTS (SELECT 1 FROM saints WHERE slug = 'muhammad-ibn-ali-al-sanusi' AND deleted_at IS NULL);
  SELECT id INTO s_id FROM saints WHERE slug = 'muhammad-ibn-ali-al-sanusi' AND deleted_at IS NULL LIMIT 1;
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_sanusi_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_sanusi_id);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_reform WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_reform);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_political WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_political);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_inst_orders WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_inst_orders);

  -- Mawlana Khalid al-Baghdadi
  INSERT INTO saints (name, slug, birth_year, death_year, region_id, short_summary, biography)
  SELECT 'Mawlana Khalid al-Baghdadi', 'mawlana-khalid-al-baghdadi', 1779, 1827, r_levant,
    'Founder of the Khalidiyya branch of the Naqshbandiyya, which became dominant in the Ottoman world and remains influential across Turkey, the Levant, and the Caucasus.',
    'Mawlana Khalid al-Baghdadi was a Kurdish scholar who received the Naqshbandi path in India and returned to establish the Khalidiyya sub-branch. He settled in Damascus and worked to reform religious life in the Ottoman Empire. His students spread across Anatolia, Kurdistan, the Caucasus, and the Levant, making the Khalidiyya one of the most influential orders in 19th-century Islam.'
  WHERE NOT EXISTS (SELECT 1 FROM saints WHERE slug = 'mawlana-khalid-al-baghdadi' AND deleted_at IS NULL);
  SELECT id INTO s_id FROM saints WHERE slug = 'mawlana-khalid-al-baghdadi' AND deleted_at IS NULL LIMIT 1;
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_naqsh_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_naqsh_id);
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_khalidi_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_khalidi_id);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_silsila WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_silsila);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_inst_orders WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_inst_orders);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_reform WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_reform);

  -- Khwaja Ghulam Farid
  INSERT INTO saints (name, slug, birth_year, death_year, region_id, short_summary, biography)
  SELECT 'Khwaja Ghulam Farid', 'khwaja-ghulam-farid', 1845, 1901, r_multan,
    'The great Seraiki Sufi poet of the Punjab whose kafi verses are among the finest expressions of divine longing in South Asian literature.',
    'Khwaja Ghulam Farid of Chachran Sharif was a Qadiri master and the greatest Seraiki poet of mystical love. His kafis express the pain of separation and longing for the Beloved in imagery drawn from the desert landscape of the Punjab. His verses became widely memorized folk classics and his shrine draws pilgrims from across Pakistan.'
  WHERE NOT EXISTS (SELECT 1 FROM saints WHERE slug = 'khwaja-ghulam-farid' AND deleted_at IS NULL);
  SELECT id INTO s_id FROM saints WHERE slug = 'khwaja-ghulam-farid' AND deleted_at IS NULL LIMIT 1;
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_qadiri_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_qadiri_id);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_poetry WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_poetry);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_love WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_love);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_nafs WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_nafs);

  -- Inayat Khan (Chishtiyya — brought to West)
  INSERT INTO saints (name, slug, birth_year, death_year, region_id, short_summary, biography)
  SELECT 'Hazrat Inayat Khan', 'hazrat-inayat-khan', 1882, 1927, r_south_asia,
    'The first Sufi teacher to bring the Chishti path to the West, founding the Sufi Order International and introducing Sufi music, zikr, and inner development teachings to Europe and America.',
    'Hazrat Inayat Khan was an Indian classical musician and Chishti Sufi master who traveled to the West in 1910. Born in Baroda, he was trained in the four major South Asian orders. His universal approach emphasized the mystical dimensions common to all religions, attracting students across Europe and America. He died in Delhi in 1927.'
  WHERE NOT EXISTS (SELECT 1 FROM saints WHERE slug = 'hazrat-inayat-khan' AND deleted_at IS NULL);
  SELECT id INTO s_id FROM saints WHERE slug = 'hazrat-inayat-khan' AND deleted_at IS NULL LIMIT 1;
  INSERT INTO saint_lineages (saint_id, lineage_id) SELECT s_id, v_chishti_id WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_lineages WHERE saint_id = s_id AND lineage_id = v_chishti_id);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_sama WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_sama);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_interfaith WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_interfaith);
  INSERT INTO saint_themes (saint_id, theme_id) SELECT s_id, t_reform WHERE s_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM saint_themes WHERE saint_id = s_id AND theme_id = t_reform);

  -- Update Rumi's region to Konya
  UPDATE saints SET region_id = r_konya WHERE name = 'Jalal ad-Din Rumi' AND region_id = r_anatolia AND deleted_at IS NULL;

  -- Update Uwais al-Qarani region to Kufa
  UPDATE saints SET region_id = r_kufa WHERE name = 'Uways al-Qarani' AND deleted_at IS NULL;

END $$;
