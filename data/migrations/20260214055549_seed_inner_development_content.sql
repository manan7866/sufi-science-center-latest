/*
  # Seed Inner Development Content
  
  Seeds comprehensive content for:
  - Practices (meditation, dhikr, contemplative exercises)
  - Transformation Stages (classical Sufi maqamat)
  - Emotional Modules (heart-centered work)
  - Study Circles (active learning communities)
  - Mentorship Programs
  - Guidance Pathways
*/

-- Seed Practices
INSERT INTO practices (title, slug, category, difficulty_level, duration_minutes, description, instructions, benefits, prerequisites, tradition_source) VALUES
(
  'Muraqaba: Sufi Meditation',
  'muraqaba-meditation',
  'meditation',
  'beginner',
  20,
  'Classical Sufi contemplative practice focusing on Divine presence. Muraqaba means "to watch over" or "to take care of" and involves maintaining conscious awareness of God.',
  E'1. Sit in a quiet space with spine straight\n2. Close your eyes and take three deep breaths\n3. Bring awareness to your heart center\n4. Silently observe thoughts without attachment\n5. Maintain presence awareness for 20 minutes\n6. End with gratitude',
  ARRAY['Enhanced concentration', 'Inner peace', 'Spiritual awareness', 'Reduced anxiety', 'Heart purification'],
  ARRAY['Basic sitting posture', 'Quiet environment'],
  'Classical Sufi tradition'
),
(
  'Dhikr: Remembrance of Allah',
  'dhikr-remembrance',
  'dhikr',
  'beginner',
  15,
  'Rhythmic invocation of Divine names and phrases. The heart of Sufi practice, designed to maintain continuous awareness of the Divine.',
  E'1. Choose a Divine name or phrase (e.g., "Allah" or "La ilaha illallah")\n2. Sit comfortably with eyes closed\n3. Synchronize the phrase with your breath\n4. Repeat 100-300 times with full presence\n5. Feel the meaning resonate in your heart\n6. Conclude with silent stillness',
  ARRAY['Heart purification', 'Divine connection', 'Emotional regulation', 'Mental clarity', 'Spiritual elevation'],
  ARRAY['None'],
  'All Sufi orders'
),
(
  'Breath of Compassion',
  'breath-of-compassion',
  'breath_work',
  'beginner',
  10,
  'Gentle breathing technique cultivating compassion toward self and others, integrating Sufi heart awareness with conscious breath.',
  E'1. Place hand on heart center\n2. Inhale deeply, imagining divine light entering\n3. Hold briefly, letting light expand in heart\n4. Exhale, sending compassion outward\n5. Repeat for 10 minutes\n6. End with prayer for all beings',
  ARRAY['Increased compassion', 'Heart opening', 'Stress reduction', 'Emotional balance'],
  ARRAY['None'],
  'Naqshbandi tradition'
),
(
  'Tazkiyah: Soul Purification',
  'tazkiyah-purification',
  'contemplation',
  'intermediate',
  30,
  'Systematic examination of character traits and intentions for spiritual purification. Based on classical texts on refinement of the self.',
  E'1. Begin with intention to purify your nafs (ego)\n2. Review the day with honest self-examination\n3. Identify moments of ego dominance vs. Divine alignment\n4. Note negative traits that emerged\n5. Make sincere tawbah (repentance)\n6. Set intentions for tomorrow\n7. Seal with gratitude and humility',
  ARRAY['Character refinement', 'Self-awareness', 'Ego reduction', 'Spiritual growth', 'Accountability'],
  ARRAY['Basic self-reflection practice', 'Understanding of nafs concept'],
  'Classical tasawwuf (Sufism)'
),
(
  'Visualization of Light',
  'visualization-light',
  'visualization',
  'intermediate',
  25,
  'Advanced practice using sacred imagination to experience Divine light manifesting through the levels of being.',
  E'1. Enter meditative state\n2. Visualize light descending from above\n3. See it enter crown of head\n4. Watch it fill each spiritual center (latifa)\n5. Feel transformation in each center\n6. Let light expand beyond body\n7. Rest in luminous awareness',
  ARRAY['Subtle body activation', 'Spiritual perception', 'Energy alignment', 'Inner vision'],
  ARRAY['Established meditation practice', 'Understanding of lataif system'],
  'Naqshbandi-Haqqani tradition'
),
(
  'Walking Meditation in Nature',
  'walking-meditation-nature',
  'meditation',
  'beginner',
  30,
  'Contemplative walking practice experiencing Divine signs in creation. Combines movement with meditative awareness.',
  E'1. Choose natural setting\n2. Walk slowly with full awareness\n3. Observe creation as Divine manifestation\n4. Notice beauty, order, wisdom in nature\n5. Allow gratitude to arise naturally\n6. Reflect on Quranic verses about signs in creation\n7. Return with renewed awareness',
  ARRAY['Connection to nature', 'Embodied spirituality', 'Gratitude', 'Physical-spiritual integration'],
  ARRAY['None'],
  'Universal Sufi practice'
);

-- Seed Transformation Stages (Maqamat)
INSERT INTO transformation_stages (title, slug, arabic_name, stage_number, category, description, characteristics, practices_associated, classical_references, challenges, signs_of_progress) VALUES
(
  'Repentance',
  'tawbah-repentance',
  'Tawbah',
  1,
  'maqam',
  'The foundational station where the seeker turns away from heedlessness toward God. Tawbah is not merely regret but a complete reorientation of being.',
  ARRAY['Recognition of separation from Divine', 'Sincere regret for past heedlessness', 'Firm resolve to change', 'Return to remembrance'],
  ARRAY['Self-examination', 'Dhikr practice', 'Seeking forgiveness'],
  ARRAY['Al-Ghazali: Ihya Ulum al-Din', 'Al-Qushayri: Risala', 'Hujwiri: Kashf al-Mahjub'],
  ARRAY['Ego resistance', 'Habitual patterns', 'False repentance', 'Despair'],
  ARRAY['Genuine remorse', 'Changed behavior', 'Increased awareness', 'Relief in heart']
),
(
  'Patience',
  'sabr-patience',
  'Sabr',
  2,
  'maqam',
  'The station of patient endurance in trials, restraint from forbidden acts, and steadfastness in worship. Sabr is active strength, not passive resignation.',
  ARRAY['Perseverance in difficulty', 'Control of reactions', 'Trust in Divine wisdom', 'Inner stability'],
  ARRAY['Dhikr in hardship', 'Gratitude practice', 'Breath awareness'],
  ARRAY['Quran 2:153 - "Allah is with the patient"', 'Ibn Qayyim: Patience and Gratitude', 'Rumi on trials as Divine gifts'],
  ARRAY['Reactive emotions', 'Impatience', 'Complaining', 'Loss of hope'],
  ARRAY['Equanimity', 'Reduced reactivity', 'Trust deepening', 'Inner peace amidst difficulty']
),
(
  'Gratitude',
  'shukr-gratitude',
  'Shukr',
  3,
  'maqam',
  'Recognition of Divine blessings and responding with thankfulness in heart, tongue, and limbs. Shukr transforms perspective and opens doors to increase.',
  ARRAY['Recognition of blessings', 'Verbal acknowledgment', 'Using blessings in service', 'Contentment'],
  ARRAY['Gratitude journaling', 'Morning/evening reflection', 'Service to others'],
  ARRAY['Quran 14:7 - "If you are grateful, I will increase you"', 'Al-Ghazali on gratitude stations'],
  ARRAY['Taking blessings for granted', 'Ingratitude', 'Entitlement', 'Comparison with others'],
  ARRAY['Increased joy', 'Recognition of abundance', 'Reduced complaint', 'Generosity']
),
(
  'Trust in God',
  'tawakkul-trust',
  'Tawakkul',
  4,
  'maqam',
  'Complete reliance on God after taking appropriate means. Tawakkul is the station where anxiety dissolves into trust, combining action with surrender.',
  ARRAY['Taking necessary action', 'Releasing attachment to outcomes', 'Trust in Divine plan', 'Inner security'],
  ARRAY['Surrender meditation', 'Uncertainty tolerance practice', 'Dhikr of Divine names related to provision'],
  ARRAY['Quran 65:3 - "Whoever relies upon Allah - He is sufficient"', 'Ibn Ata Allah: Book of Wisdom', 'Stories of Prophet Ibrahim'],
  ARRAY['Anxiety', 'Over-planning', 'False independence', 'Laziness disguised as trust'],
  ARRAY['Reduced anxiety', 'Action without attachment', 'Peace in uncertainty', 'Synchronicities']
),
(
  'Love',
  'mahabbah-love',
  'Mahabbah',
  5,
  'hal',
  'The state of Divine love where the heart becomes consumed with longing for the Beloved. Mahabbah transforms all worship from duty to ecstatic devotion.',
  ARRAY['Heart aflame with longing', 'Preference for Divine over all else', 'Joy in worship', 'Intimacy with God'],
  ARRAY['Heart-centered dhikr', 'Poetry of love', 'Contemplation of Divine beauty', 'Service as expression of love'],
  ARRAY['Rabia al-Adawiyya: "I love You for Yourself"', 'Ibn Arabi: Tarjuman al-Ashwaq', 'Rumi: Masnavi'],
  ARRAY['Confusion with emotion', 'Spiritual intoxication', 'Neglect of law', 'Attachment to states'],
  ARRAY['Spontaneous remembrance', 'Tears of longing', 'Seeing Divine in all', 'Service without burden']
),
(
  'Annihilation',
  'fana-annihilation',
  'Fana',
  6,
  'hal',
  'The state where individual consciousness dissolves into Divine consciousness. The ego-self (nafs) becomes effaced in the overwhelming presence of God.',
  ARRAY['Loss of self-awareness', 'Absorption in Divine', 'Cessation of separate will', 'Intoxication with God'],
  ARRAY['Advanced dhikr', 'Sama (spiritual audition)', 'Extended meditation', 'Guidance essential'],
  ARRAY['Al-Hallaj: "Ana al-Haqq"', 'Bayazid Bastami: "Glory be to Me"', 'Junayd: "Passing away in God"'],
  ARRAY['Spiritual pride', 'Loss of discrimination', 'Neglect of Shariah', 'Confusion with psychosis'],
  ARRAY['Moments of ego dissolution', 'Loss of time sense', 'Cosmic consciousness', 'Unity experience']
),
(
  'Subsistence',
  'baqa-subsistence',
  'Baqa',
  7,
  'hal',
  'Return to functional consciousness after fana, but now living through God rather than ego. The highest station where one acts as Divine instrument while maintaining human form.',
  ARRAY['Acting through Divine will', 'Sobriety after intoxication', 'Perfect servanthood', 'Human form, Divine content'],
  ARRAY['Integration practice', 'Service', 'Teaching', 'Living in world while not of it'],
  ARRAY['Junayd: "Return to sobriety"', 'Ibn Arabi: "Perfect Human"', 'Prophet Muhammad as exemplar'],
  ARRAY['Spiritual bypassing', 'Detachment from world', 'Confusion about dual reality', 'Incomplete integration'],
  ARRAY['Effortless virtue', 'Service flows naturally', 'Wisdom in action', 'Balance of transcendence and embodiment']
);

-- Seed Emotional Modules
INSERT INTO emotional_modules (title, slug, focus_area, description, sufi_approach, modern_psychology, practices, reflection_questions, resources) VALUES
(
  'Working with Anger: From Rage to Righteous Action',
  'working-with-anger',
  'anger',
  'Understanding and transforming anger through Sufi heart practices and modern emotional intelligence.',
  'In Sufi tradition, anger (ghadab) is seen as fire of the nafs that must be transformed rather than suppressed. Al-Ghazali teaches that anger has legitimate place when directed toward injustice, but must be purified of ego attachment. The practice involves recognizing anger arising, pausing before reaction, examining its source (ego vs. principle), and channeling energy appropriately.',
  'Modern psychology recognizes anger as a secondary emotion often masking hurt, fear, or unmet needs. Cognitive behavioral approaches teach the ABC model: Activating event, Beliefs, Consequences. Emotional regulation skills include: recognizing physical signs, pause-and-breathe techniques, cognitive reframing, and assertive communication. Research shows suppression harmful, healthy expression beneficial.',
  ARRAY['Breath of cooling (inhale calm, exhale heat)', 'Pause practice before reaction', 'Dhikr of As-Sabur (The Patient)', 'Body scan for anger signals', 'Journal: What is anger protecting?', 'Forgiveness meditation'],
  ARRAY['What situation triggered this anger?', 'What deeper feeling might anger be protecting (fear, hurt, shame)?', 'Is this anger serving Divine principle or ego?', 'What do I actually need in this situation?', 'How can I express this in a way that maintains relationship?', 'What would wisdom do here?'],
  '{"books": ["Al-Ghazali: Disciplining the Soul", "Thich Nhat Hanh: Anger"], "videos": ["Understanding the Anger Iceberg"], "articles": ["Sufi Approach to Emotional Transformation"]}'
),
(
  'Transforming Fear into Trust',
  'transforming-fear',
  'fear',
  'Moving from anxiety and fear into the station of tawakkul (trust in Divine providence).',
  'Fear (khawf) in Sufism has two forms: praiseworthy fear of Divine majesty that leads to righteousness, and blameworthy fear rooted in lack of trust. The path involves recognizing false fears arising from illusion of separation, cultivating remembrance that "Allah is sufficient for us" (Quran 3:173), and building experiential trust through small acts of surrender.',
  'Contemporary psychology distinguishes between fear (response to present threat) and anxiety (worry about future). Effective approaches include: identifying catastrophic thinking patterns, challenging cognitive distortions, gradual exposure, mindfulness of physical sensations, and building window of tolerance. Neuroscience shows amygdala can be regulated through conscious practices.',
  ARRAY['Tawakkul meditation: "I trust the process"', 'Name the fear: make it specific', 'Worst-case scenario examination', 'Dhikr of Al-Wakil (The Trustee)', 'Gratitude for past provision', 'Breath practice for nervous system regulation'],
  ARRAY['What exactly am I afraid of?', 'What is the actual evidence for this fear?', 'What is the worst that could realistically happen?', 'How have I been provided for in the past?', 'What am I being called to trust?', 'What action is mine to take, and what must I surrender?'],
  '{"books": ["When Things Fall Apart by Pema Chodron", "Tawakkul: Quranic Concept of Trust"], "videos": ["Neuroscience of Fear and Trust"], "practices": ["30-day tawakkul journal"]}'
),
(
  'Grief as Sacred Gateway',
  'grief-sacred-gateway',
  'grief',
  'Honoring loss while moving toward healing and integration.',
  'In Sufi understanding, grief (huzn) is honored as appropriate human response to loss and separation. The Prophet wept at loss. However, prolonged grief that leads to despair is discouraged. The practice involves: allowing tears as form of purification, maintaining prayer as anchor, remembering impermanence of dunya (world), cultivating patience (sabr), and recognizing grief as longing for eternal Home.',
  'Modern grief theory (Kübler-Ross, Worden) recognizes stages: denial, anger, bargaining, depression, acceptance. Contemporary approaches emphasize: grief has no timeline, it comes in waves, continuing bonds with deceased is healthy, meaning-making is essential, community support vital. Complicated grief requires specific intervention.',
  ARRAY['Permission to grieve fully', 'Prayer as container for grief', 'Writing to the departed', 'Dhikr of Al-Hayy (The Ever-Living)', 'Community ritual', 'Meaning-making reflection'],
  ARRAY['What have I lost?', 'What am I grateful for about what was?', 'What does honoring this loss look like?', 'How is this grief changing me?', 'What meaning can I make?', 'What remains eternal?'],
  '{"books": ["Its OK That Youre Not OK", "Al-Ghazali on Breaking the Two Desires"], "support": ["Grief support circles", "Spiritual counseling"], "practices": ["40-day grief prayer practice"]}'
),
(
  'Cultivating Sacred Joy',
  'cultivating-sacred-joy',
  'joy',
  'Opening to spiritual joy that is not dependent on external circumstances.',
  'Joy (surur) in Sufism is a Divine gift and also a cultivated state. The heart that remembers God tastes sweetness. Rumi spoke of joy as our natural state when veils are removed. Practices include: gratitude as gateway to joy, celebration of Divine signs, music and poetry (halal), playfulness as spiritual practice, and recognizing joy as form of worship.',
  'Positive psychology distinguishes pleasure (hedonic, temporary) from joy (eudaimonic, lasting). Research shows: gratitude practices increase wellbeing, savoring enhances joy, social connection vital, meaning-making sustains happiness, giving produces more joy than receiving. Joy is available even in difficult circumstances through perspective shifts.',
  ARRAY['Morning gratitude practice', 'Savoring beautiful moments', 'Dhikr with musical voice', 'Nature appreciation', 'Laughter as medicine', 'Celebration of small victories'],
  ARRAY['What brought me joy today?', 'What am I taking for granted?', 'Where is beauty present right now?', 'How can I share this joy?', 'What blocks my access to joy?', 'What would delight my heart?'],
  '{"books": ["The Book of Joy (Dalai Lama & Desmond Tutu)", "Rumi: Joy of Living"], "practices": ["30-day gratitude challenge", "Joy jar practice"]}'
),
(
  'Opening the Heart: Love and Compassion',
  'opening-heart-love',
  'love',
  'Expanding capacity for love toward self, others, creation, and ultimately the Divine.',
  'Mahabbah (love) is the fire that transforms the seeker. Rabia al-Adawiyya prayed to love God not from fear of hell or hope of heaven, but for God alone. Compassion (rahmah) is reflection of Divine mercy. Practices include: remembrance of Divine love, seeing Divine in all beings, service as expression of love, forgiveness practices, and sending blessings.',
  'Psychology recognizes love as fundamental need and healing force. Compassion practices (Neff, Gilbert) show measurable benefits: reduced depression, increased resilience, better relationships. Self-compassion involves: self-kindness vs. self-judgment, common humanity vs. isolation, mindfulness vs. over-identification. Loving-kindness meditation increases positive emotions and social connection.',
  ARRAY['Loving-kindness meditation (adapted Sufi style)', 'Dhikr of Al-Wadud (The Loving)', 'Heart-centered prayer for others', 'Self-compassion practice', 'Random acts of kindness', 'Forgiveness work'],
  ARRAY['Where am I withholding love from myself?', 'Who am I ready to forgive?', 'How can I be of service today?', 'What does my heart long for?', 'Where do I see Divine love manifesting?', 'How can I embody more compassion?'],
  '{"books": ["Self-Compassion by Kristin Neff", "Sufi Book of Love", "The Four Loves by CS Lewis"], "practices": ["40-day love practice", "Compassion training"]}'
);

-- Seed Study Circles
INSERT INTO study_circles (title, slug, description, focus_text, facilitator, meeting_frequency, duration_weeks, capacity, status, start_date, meeting_format, prerequisites, syllabus) VALUES
(
  'The Alchemy of Happiness: Al-Ghazali Study Circle',
  'alchemy-happiness-ghazali',
  'Deep dive into Imam Al-Ghazali''s masterwork on spiritual psychology and inner transformation. We will study the nature of the self, purification practices, and the path to lasting happiness.',
  'The Alchemy of Happiness by Abu Hamid al-Ghazali',
  'Dr. Sarah Rahman, Islamic Studies PhD',
  'weekly',
  12,
  20,
  'open',
  '2026-03-15',
  'hybrid',
  ARRAY['Basic knowledge of Islamic concepts', 'Commitment to weekly reading'],
  '{"week1": "Introduction to Ghazali and his context", "week2": "The nature of the self (nafs)", "week3": "Knowledge of oneself", "week4": "Knowledge of God", "week5": "The purpose of creation", "week6": "Purification of the heart", "week7": "Spiritual diseases and their cure", "week8": "The path of virtue", "week9": "Remembrance and worship", "week10": "Love and longing", "week11": "Death and the hereafter", "week12": "Integration and commitment"}'
),
(
  'Rumi''s Masnavi: Poetry as Spiritual Teaching',
  'rumi-masnavi-circle',
  'Explore Rumi''s mystical poetry as practical guide to spiritual awakening. Each week we examine stories and teachings, discussing application to contemporary life.',
  'The Masnavi by Jalal al-Din Rumi',
  'Imam Khalid Hassan, Sufi teacher',
  'biweekly',
  16,
  15,
  'upcoming',
  '2026-04-01',
  'online',
  ARRAY['Open heart', 'Willingness to engage with poetry'],
  '{"session1": "Introduction to Rumi and the Masnavi", "session2": "The Reed Flute Song - Longing for home", "session3": "Stories of transformation", "session4": "Love as path to Divine"}'
),
(
  'Women Mystics: Voices of Feminine Wisdom',
  'women-mystics-circle',
  'Study the teachings of Rabia al-Adawiyya, Fatima of Nishapur, and other women saints. Explore feminine approaches to spirituality and mysticism.',
  'Women Saints of Sufism anthology',
  'Sister Amina Farooq, spiritual guide',
  'weekly',
  8,
  12,
  'open',
  '2026-03-22',
  'online',
  ARRAY['None'],
  '{"week1": "Rabia al-Adawiyya: Love without condition", "week2": "Fatima of Nishapur: Wisdom teacher", "week3": "Attar''s Memorial of Saints", "week4": "Feminine divine attributes", "week5": "Heart-centered practice", "week6": "Integration of masculine/feminine", "week7": "Contemporary women mystics", "week8": "Embodying feminine wisdom"}'
),
(
  'The Heart of Meditation: Classical Practices',
  'heart-meditation-practices',
  'Hands-on circle learning traditional Sufi meditation techniques including muraqaba, dhikr variations, and visualization practices.',
  'Practical guide to Sufi meditation',
  'Shaykh Abdullah, Naqshbandi teacher',
  'weekly',
  6,
  10,
  'accepting',
  '2026-03-29',
  'in_person',
  ARRAY['Regular meditation practice', 'Commitment to daily practice during circle'],
  '{"week1": "Foundations of muraqaba", "week2": "Silent dhikr techniques", "week3": "Latifa activation", "week4": "Working with states and stations", "week5": "Integration of practice", "week6": "Personal practice design"}'
),
(
  'Stations of the Heart: Sufi Psychology and Inner States',
  'stations-heart-sufi-psychology',
  'Explore the classical Sufi understanding of inner stations and passing states, including repentance, trust, patience, gratitude, and presence. Each session connects traditional frameworks with contemporary questions of emotional life, self-awareness, and spiritual discipline.',
  'Classical teachings on maqamat and ahwal',
  'Ustad Hamza Qadri, teacher of spiritual psychology',
  'weekly',
  10,
  15,
  'waitlist',
  '2026-04-11',
  'online',
  ARRAY['Basic understanding of Islamic spirituality', 'Interest in inner development'],
  '{"week1": "Introduction to maqamat (stations) and ahwal (states)", "week2": "Tawbah - Repentance and return", "week3": "Sabr - Patience and perseverance", "week4": "Tawakkul - Trust in Divine", "week5": "Shukr - Gratitude and contentment", "week6": "Rida - Satisfaction with Divine decree", "week7": "Khawf and Raja - Fear and hope", "week8": "Haya - Modesty and reverence", "week9": "Presence and mindfulness", "week10": "Integration and ongoing practice"}'
),
(
  'Adab and Companionship: Ethics of the Path',
  'adab-companionship-ethics',
  'A circle devoted to the ethics of companionship, service, humility, and presence in the Sufi path. Participants studied how adab shapes the student, the circle, and the wider community through disciplined conduct and reflective practice.',
  'Readings in adab, suhba, and ethical formation',
  'Shaykha Mariam Siddiqi, guide in contemplative ethics',
  'weekly',
  8,
  12,
  'closed',
  '2026-02-08',
  'in_person',
  ARRAY['Commitment to attend all sessions', 'Previous exposure to Sufi teachings'],
  '{"week1": "Introduction to adab - sacred courtesy", "week2": "Ethics of student-teacher relationship", "week3": "Companionship (suhba) and community", "week4": "Humility and self-effacement", "week5": "Service as spiritual practice", "week6": "Truthfulness and integrity", "week7": "Generosity and self-giving", "week8": "Embodiment of adab in daily life"}'
);

-- Seed Mentorship Programs
INSERT INTO mentorship_programs (title, slug, description, mentor_name, mentor_bio, mentor_lineage, focus_areas, program_duration_months, meeting_frequency, format, capacity, status, requirements, application_process) VALUES
(
  'Foundations: One-on-One Spiritual Guidance',
  'foundations-spiritual-guidance',
  'Individualized mentorship for those beginning their conscious spiritual journey. Focus on establishing daily practice, understanding basic concepts, and navigating early stages.',
  'Ustadh Ibrahim Al-Mansuri',
  'Ustadh Ibrahim has 20+ years of experience guiding seekers on the path. Trained in both traditional Islamic sciences and modern psychology, he brings integrative approach to spiritual development.',
  'Shadhili-Darqawi lineage',
  ARRAY['Establishing prayer practice', 'Basic dhikr instruction', 'Understanding stages of the path', 'Character development', 'Integration of spiritual and worldly life'],
  6,
  'twice monthly',
  'one_on_one',
  5,
  'accepting',
  ARRAY['Sincere intention', 'Commitment to daily practice', 'Basic Islamic knowledge'],
  'Submit application form including: why you seek guidance, your current practice, your intention. Brief interview will be scheduled if preliminary match.'
),
(
  'Heart Work: Advanced Emotional-Spiritual Integration',
  'heart-work-integration',
  'For experienced practitioners ready to go deeper into heart purification and advanced emotional-spiritual work.',
  'Dr. Layla Qasim',
  'Dr. Qasim holds PhD in Clinical Psychology and Ijaza in Sufi teachings. She specializes in integration of psychological healing with spiritual development.',
  'Chishti tradition',
  ARRAY['Deep emotional healing', 'Shadow work from Islamic perspective', 'Advanced dhikr practices', 'Dreams and spiritual experiences', 'Service as practice'],
  12,
  'weekly',
  'one_on_one',
  3,
  'waitlist',
  ARRAY['Minimum 2 years consistent practice', 'Basic emotional stability', 'Therapy concurrent or completed', 'Teacher recommendation'],
  'Requires written application, interview, and recommendation from previous teacher or therapist. Sliding scale available.'
),
(
  'Teacher Training: Guiding Others on the Path',
  'teacher-training-program',
  'Intensive program preparing qualified individuals to offer spiritual guidance to others. Combines traditional transmission with modern facilitation skills.',
  'Shaykha Maryam Al-Hashimi',
  'Shaykha Maryam received authorization to teach from multiple lineages. She has trained spiritual guides for 15 years and emphasizes ethical, trauma-informed guidance.',
  'Multi-lineage: Naqshbandi, Qadiri, Shadhili',
  ARRAY['Traditional transmission', 'Ethics of guidance', 'Trauma-informed approaches', 'Group facilitation', 'Personal deepening'],
  24,
  'monthly intensives',
  'small_group',
  8,
  'closed',
  ARRAY['Minimum 10 years of practice', 'Authorization from current teacher', 'Demonstrated maturity and character', 'Completion of prerequisite studies'],
  'By invitation only. Those interested should contact institute for future cohort information.'
);

-- Seed Guidance Pathways
INSERT INTO guidance_pathways (title, description, target_audience, assessment_profile, recommended_practices, duration_weeks, recommended_stages) VALUES
(
  'Beginner''s Path: Foundation Building',
  'Structured pathway for those new to conscious spiritual practice. Emphasis on establishing sustainable daily practices and understanding basic concepts.',
  'Complete beginners, those restarting after long break, anyone wanting strong foundation',
  '{"openness_score": {"min": 0, "max": 100}, "current_practice": "none or inconsistent", "intention": "wanting to start"}',
  ARRAY[]::uuid[],
  12,
  ARRAY[]::uuid[]
),
(
  'Heart-Centered Path: Emotional Intelligence',
  'For those called to deep emotional healing integrated with spiritual development. Focus on heart purification and relationship work.',
  'Those working through trauma, seeking emotional healing, wanting to develop compassion, struggling with relationships',
  '{"emotional_awareness": "high", "heart_focus": "strong", "healing_needed": true}',
  ARRAY[]::uuid[],
  16,
  ARRAY[]::uuid[]
),
(
  'Contemplative Path: Meditation and Stillness',
  'Emphasis on meditation practices, silence, and inner contemplation. For natural introverts and those drawn to stillness.',
  'Introverts, those with meditation experience, seekers of inner peace, natural contemplatives',
  '{"personality": "introverted", "meditation_affinity": "high", "drawn_to_silence": true}',
  ARRAY[]::uuid[],
  20,
  ARRAY[]::uuid[]
),
(
  'Service Path: Love in Action',
  'For those whose spirituality expresses through service, activism, and relationship. Emphasis on seeing Divine in creation and serving humanity.',
  'Activists, caregivers, community organizers, those who find God through service',
  '{"service_oriented": true, "extroverted": true, "justice_focus": "high"}',
  ARRAY[]::uuid[],
  24,
  ARRAY[]::uuid[]
);
