import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding inner development data...\n');

  // ============================================================================
  // 1. PRACTICES
  // ============================================================================
  console.log('Seeding practices...');
  await prisma.practice.deleteMany({});

  const practices = [
    { title: 'Muraqaba: Sufi Meditation', slug: 'muraqaba-meditation', category: 'meditation', difficultyLevel: 'beginner', durationMinutes: 20, description: 'Classical Sufi contemplative practice focusing on Divine presence.', instructions: '1. Sit quietly with spine straight\n2. Close eyes, take three deep breaths\n3. Bring awareness to heart center\n4. Observe thoughts without attachment\n5. Maintain presence for 20 minutes\n6. End with gratitude', benefits: ['Enhanced concentration', 'Inner peace', 'Spiritual awareness', 'Reduced anxiety'], prerequisites: ['Basic sitting posture', 'Quiet environment'], traditionSource: 'Classical Sufi tradition' },
    { title: 'Dhikr: Remembrance of Allah', slug: 'dhikr-remembrance', category: 'dhikr', difficultyLevel: 'beginner', durationMinutes: 15, description: 'Rhythmic invocation of Divine names maintaining continuous awareness of the Divine.', instructions: '1. Choose a Divine name or phrase\n2. Sit comfortably with eyes closed\n3. Synchronize phrase with breath\n4. Repeat 100-300 times with presence\n5. Feel meaning resonate in heart\n6. Conclude with silent stillness', benefits: ['Heart purification', 'Divine connection', 'Emotional regulation', 'Mental clarity'], prerequisites: [], traditionSource: 'All Sufi orders' },
    { title: 'Breath of Compassion', slug: 'breath-of-compassion', category: 'breath_work', difficultyLevel: 'beginner', durationMinutes: 10, description: 'Gentle breathing technique cultivating compassion toward self and others.', instructions: '1. Place hand on heart center\n2. Inhale deeply, imagine divine light entering\n3. Hold briefly, let light expand in heart\n4. Exhale, sending compassion outward\n5. Repeat for 10 minutes\n6. End with prayer for all beings', benefits: ['Increased compassion', 'Heart opening', 'Stress reduction', 'Emotional balance'], prerequisites: [], traditionSource: 'Naqshbandi tradition' },
    { title: 'Tazkiyah: Soul Purification', slug: 'tazkiyah-purification', category: 'contemplation', difficultyLevel: 'intermediate', durationMinutes: 30, description: 'Systematic examination of character traits and intentions for spiritual purification.', instructions: '1. Begin with intention to purify nafs\n2. Review the day with honest self-examination\n3. Identify moments of ego vs Divine alignment\n4. Note negative traits that emerged\n5. Make sincere tawbah (repentance)\n6. Set intentions for tomorrow\n7. Seal with gratitude', benefits: ['Character refinement', 'Self-awareness', 'Ego reduction', 'Spiritual growth'], prerequisites: ['Basic self-reflection practice', 'Understanding of nafs concept'], traditionSource: 'Classical tasawwuf' },
    { title: 'Visualization of Light', slug: 'visualization-light', category: 'visualization', difficultyLevel: 'intermediate', durationMinutes: 25, description: 'Advanced practice using sacred imagination to experience Divine light manifesting through levels of being.', instructions: '1. Enter meditative state\n2. Visualize light descending from above\n3. See it enter crown of head\n4. Watch it fill each spiritual center\n5. Feel transformation in each center\n6. Let light expand beyond body\n7. Rest in luminous awareness', benefits: ['Subtle body activation', 'Spiritual perception', 'Energy alignment', 'Inner vision'], prerequisites: ['Established meditation practice', 'Understanding of lataif system'], traditionSource: 'Naqshbandi-Haqqani tradition' },
    { title: 'Walking Meditation in Nature', slug: 'walking-meditation-nature', category: 'meditation', difficultyLevel: 'beginner', durationMinutes: 30, description: 'Contemplative walking practice experiencing Divine signs in creation.', instructions: '1. Choose natural setting\n2. Walk slowly with full awareness\n3. Observe creation as Divine manifestation\n4. Notice beauty, order, wisdom in nature\n5. Allow gratitude to arise naturally\n6. Reflect on signs in creation\n7. Return with renewed awareness', benefits: ['Connection to nature', 'Embodied spirituality', 'Gratitude', 'Physical-spiritual integration'], prerequisites: [], traditionSource: 'Universal Sufi practice' },
  ];

  for (const p of practices) {
    await prisma.practice.create({ data: p });
  }
  console.log(`✅ ${practices.length} practices seeded`);

  // ============================================================================
  // 2. TRANSFORMATION STAGES (Maqamat)
  // ============================================================================
  console.log('\nSeeding transformation stages...');
  await prisma.transformationStage.deleteMany({});

  const stages = [
    { title: 'Repentance', slug: 'tawbah-repentance', arabicName: 'Tawbah', stageNumber: 1, category: 'maqam', description: 'The foundational station where the seeker turns away from heedlessness toward God.', characteristics: ['Recognition of separation from Divine', 'Sincere regret for past heedlessness', 'Firm resolve to change', 'Return to remembrance'], practicesAssociated: ['Self-examination', 'Dhikr practice', 'Seeking forgiveness'], classicalReferences: ['Al-Ghazali: Ihya Ulum al-Din', 'Al-Qushayri: Risala', 'Hujwiri: Kashf al-Mahjub'], challenges: ['Ego resistance', 'Habitual patterns', 'False repentance', 'Despair'], signsOfProgress: ['Genuine remorse', 'Changed behavior', 'Increased awareness', 'Relief in heart'] },
    { title: 'Patience', slug: 'sabr-patience', arabicName: 'Sabr', stageNumber: 2, category: 'maqam', description: 'The station of patient endurance in trials, restraint from forbidden acts, and steadfastness in worship.', characteristics: ['Perseverance in difficulty', 'Control of reactions', 'Trust in Divine wisdom', 'Inner stability'], practicesAssociated: ['Dhikr in hardship', 'Gratitude practice', 'Breath awareness'], classicalReferences: ['Quran 2:153', 'Ibn Qayyim: Patience and Gratitude', 'Rumi on trials as Divine gifts'], challenges: ['Reactive emotions', 'Impatience', 'Complaining', 'Loss of hope'], signsOfProgress: ['Equanimity', 'Reduced reactivity', 'Trust deepening', 'Inner peace amidst difficulty'] },
    { title: 'Gratitude', slug: 'shukr-gratitude', arabicName: 'Shukr', stageNumber: 3, category: 'maqam', description: 'Recognition of Divine blessings and responding with thankfulness in heart, tongue, and limbs.', characteristics: ['Recognition of blessings', 'Verbal acknowledgment', 'Using blessings in service', 'Contentment'], practicesAssociated: ['Gratitude journaling', 'Morning/evening reflection', 'Service to others'], classicalReferences: ['Quran 14:7', 'Al-Ghazali on gratitude stations'], challenges: ['Taking blessings for granted', 'Ingratitude', 'Entitlement', 'Comparison with others'], signsOfProgress: ['Increased joy', 'Recognition of abundance', 'Reduced complaint', 'Generosity'] },
    { title: 'Trust in God', slug: 'tawakkul-trust', arabicName: 'Tawakkul', stageNumber: 4, category: 'maqam', description: 'Complete reliance on God after taking appropriate means. Combining action with surrender.', characteristics: ['Taking necessary action', 'Releasing attachment to outcomes', 'Trust in Divine plan', 'Inner security'], practicesAssociated: ['Surrender meditation', 'Uncertainty tolerance practice', 'Dhikr of Divine names'], classicalReferences: ['Quran 65:3', 'Ibn Ata Allah: Book of Wisdom', 'Stories of Prophet Ibrahim'], challenges: ['Anxiety', 'Over-planning', 'False independence', 'Laziness disguised as trust'], signsOfProgress: ['Reduced anxiety', 'Action without attachment', 'Peace in uncertainty', 'Synchronicities'] },
    { title: 'Love', slug: 'mahabbah-love', arabicName: 'Mahabbah', stageNumber: 5, category: 'hal', description: 'The state of Divine love where the heart becomes consumed with longing for the Beloved.', characteristics: ['Heart aflame with longing', 'Preference for Divine over all else', 'Joy in worship', 'Intimacy with God'], practicesAssociated: ['Heart-centered dhikr', 'Poetry of love', 'Contemplation of Divine beauty', 'Service as expression of love'], classicalReferences: ['Rabia al-Adawiyya', 'Ibn Arabi: Tarjuman al-Ashwaq', 'Rumi: Masnavi'], challenges: ['Confusion with emotion', 'Spiritual intoxication', 'Neglect of law', 'Attachment to states'], signsOfProgress: ['Spontaneous remembrance', 'Tears of longing', 'Seeing Divine in all', 'Service without burden'] },
    { title: 'Annihilation', slug: 'fana-annihilation', arabicName: 'Fana', stageNumber: 6, category: 'hal', description: 'The state where individual consciousness dissolves into Divine consciousness.', characteristics: ['Loss of self-awareness', 'Absorption in Divine', 'Cessation of separate will', 'Intoxication with God'], practicesAssociated: ['Advanced dhikr', 'Sama (spiritual audition)', 'Extended meditation', 'Guidance essential'], classicalReferences: ['Al-Hallaj: Ana al-Haqq', 'Bayazid Bastami', 'Junayd: Passing away in God'], challenges: ['Spiritual pride', 'Loss of discrimination', 'Neglect of Shariah', 'Confusion with psychosis'], signsOfProgress: ['Moments of ego dissolution', 'Loss of time sense', 'Cosmic consciousness', 'Unity experience'] },
    { title: 'Subsistence', slug: 'baqa-subsistence', arabicName: 'Baqa', stageNumber: 7, category: 'hal', description: 'Return to functional consciousness after fana, living through God rather than ego.', characteristics: ['Acting through Divine will', 'Sobriety after intoxication', 'Perfect servanthood', 'Human form, Divine content'], practicesAssociated: ['Integration practice', 'Service', 'Teaching', 'Living in world while not of it'], classicalReferences: ['Junayd: Return to sobriety', 'Ibn Arabi: Perfect Human', 'Prophet Muhammad as exemplar'], challenges: ['Spiritual bypassing', 'Detachment from world', 'Confusion about dual reality', 'Incomplete integration'], signsOfProgress: ['Effortless virtue', 'Service flows naturally', 'Wisdom in action', 'Balance of transcendence and embodiment'] },
  ];

  for (const s of stages) {
    await prisma.transformationStage.create({ data: s });
  }
  console.log(`✅ ${stages.length} transformation stages seeded`);

  // ============================================================================
  // 3. EMOTIONAL MODULES
  // ============================================================================
  console.log('\nSeeding emotional modules...');
  await prisma.emotionalModule.deleteMany({});

  const modules = [
    { title: 'Working with Anger: From Rage to Righteous Action', slug: 'working-with-anger', focusArea: 'anger', description: 'Understanding and transforming anger through Sufi heart practices and modern emotional intelligence.', sufiApproach: 'In Sufi tradition, anger (ghadab) is seen as fire of the nafs that must be transformed rather than suppressed. Al-Ghazali teaches anger has legitimate place when directed toward injustice, but must be purified of ego attachment.', modernPsychology: 'Modern psychology recognizes anger as secondary emotion often masking hurt, fear, or unmet needs. CBT teaches ABC model: Activating event, Beliefs, Consequences.', practices: ['Breath of cooling', 'Pause practice before reaction', 'Dhikr of As-Sabur', 'Body scan for anger signals', 'Journal: What is anger protecting?', 'Forgiveness meditation'], reflectionQuestions: ['What situation triggered this anger?', 'What deeper feeling might anger be protecting?', 'Is this anger serving Divine principle or ego?', 'What do I actually need?', 'How can I express this maintaining relationship?', 'What would wisdom do here?'], resources: { books: ['Al-Ghazali: Disciplining the Soul', 'Thich Nhat Hanh: Anger'], videos: ['Understanding the Anger Iceberg'], articles: ['Sufi Approach to Emotional Transformation'] } },
    { title: 'Transforming Fear into Trust', slug: 'transforming-fear', focusArea: 'fear', description: 'Moving from anxiety and fear into the station of tawakkul (trust in Divine providence).', sufiApproach: 'Fear (khawf) in Sufism has two forms: praiseworthy fear of Divine majesty, and blameworthy fear rooted in lack of trust. Practice involves recognizing false fears, cultivating remembrance that Allah is sufficient.', modernPsychology: 'Contemporary psychology distinguishes fear from anxiety. Effective approaches include: identifying catastrophic thinking, challenging cognitive distortions, gradual exposure, mindfulness, building window of tolerance.', practices: ['Tawakkul meditation', 'Name the fear: make it specific', 'Worst-case scenario examination', 'Dhikr of Al-Wakil', 'Gratitude for past provision', 'Breath practice for nervous system'], reflectionQuestions: ['What exactly am I afraid of?', 'What is actual evidence for this fear?', 'What is worst that could realistically happen?', 'How have I been provided for in past?', 'What am I being called to trust?', 'What action is mine to take, what must I surrender?'], resources: { books: ['When Things Fall Apart by Pema Chodron', 'Tawakkul: Quranic Concept of Trust'], videos: ['Neuroscience of Fear and Trust'], practices: ['30-day tawakkul journal'] } },
    { title: 'Grief as Sacred Gateway', slug: 'grief-sacred-gateway', focusArea: 'grief', description: 'Honoring loss while moving toward healing and integration.', sufiApproach: 'In Sufi understanding, grief (huzn) is honored as appropriate response to loss. The Prophet wept at loss. Practice involves allowing tears as purification, maintaining prayer as anchor, cultivating patience.', modernPsychology: 'Modern grief theory recognizes stages: denial, anger, bargaining, depression, acceptance. Contemporary approaches: grief has no timeline, comes in waves, continuing bonds healthy, meaning-making essential.', practices: ['Permission to grieve fully', 'Prayer as container for grief', 'Writing to the departed', 'Dhikr of Al-Hayy (Ever-Living)', 'Community ritual', 'Meaning-making reflection'], reflectionQuestions: ['What have I lost?', 'What am I grateful for about what was?', 'What does honoring this loss look like?', 'How is this grief changing me?', 'What meaning can I make?', 'What remains eternal?'], resources: { books: ["It's OK That You're Not OK", 'Al-Ghazali on Breaking the Two Desires'], support: ['Grief support circles', 'Spiritual counseling'], practices: ['40-day grief prayer practice'] } },
    { title: 'Cultivating Sacred Joy', slug: 'cultivating-sacred-joy', focusArea: 'joy', description: 'Opening to spiritual joy that is not dependent on external circumstances.', sufiApproach: 'Joy (surur) in Sufism is Divine gift and cultivated state. Heart that remembers God tastes sweetness. Rumi spoke of joy as natural state when veils are removed.', modernPsychology: 'Positive psychology distinguishes pleasure (hedonic) from joy (eudaimonic). Research shows: gratitude increases wellbeing, savoring enhances joy, social connection vital, meaning sustains happiness.', practices: ['Morning gratitude practice', 'Savoring beautiful moments', 'Dhikr with musical voice', 'Nature appreciation', 'Laughter as medicine', 'Celebration of small victories'], reflectionQuestions: ['What brought me joy today?', 'What am I taking for granted?', 'Where is beauty present right now?', 'How can I share this joy?', 'What blocks my access to joy?', 'What would delight my heart?'], resources: { books: ['The Book of Joy', 'Rumi: Joy of Living'], practices: ['30-day gratitude challenge', 'Joy jar practice'] } },
    { title: 'Opening the Heart: Love and Compassion', slug: 'opening-heart-love', focusArea: 'love', description: 'Expanding capacity for love toward self, others, creation, and ultimately the Divine.', sufiApproach: 'Mahabbah (love) transforms the seeker. Rabia al-Adawiyya prayed to love God not from fear of hell but for God alone. Compassion is reflection of Divine mercy.', modernPsychology: 'Psychology recognizes love as fundamental need. Compassion practices show measurable benefits: reduced depression, increased resilience. Self-compassion involves self-kindness, common humanity, mindfulness.', practices: ['Loving-kindness meditation (Sufi style)', 'Dhikr of Al-Wadud (The Loving)', 'Heart-centered prayer for others', 'Self-compassion practice', 'Random acts of kindness', 'Forgiveness work'], reflectionQuestions: ['Where am I withholding love from myself?', 'Who am I ready to forgive?', 'How can I be of service today?', 'What does my heart long for?', 'Where do I see Divine love manifesting?', 'How can I embody more compassion?'], resources: { books: ['Self-Compassion by Kristin Neff', 'Sufi Book of Love', 'The Four Loves by CS Lewis'], practices: ['40-day love practice', 'Compassion training'] } },
  ];

  for (const m of modules) {
    await prisma.emotionalModule.create({ data: m });
  }
  console.log(`✅ ${modules.length} emotional modules seeded`);

  // ============================================================================
  // 4. STUDY CIRCLES
  // ============================================================================
  console.log('\nSeeding study circles...');
  await prisma.studyCircle.deleteMany({});

  const circles = [
    { title: "The Alchemy of Happiness: Al-Ghazali Study Circle", slug: 'alchemy-happiness-ghazali', description: "Deep dive into Imam Al-Ghazali's masterwork on spiritual psychology and inner transformation.", focusText: 'The Alchemy of Happiness by Abu Hamid al-Ghazali', facilitator: 'Dr. Sarah Rahman, Islamic Studies PhD', meetingFrequency: 'weekly', durationWeeks: 12, capacity: 20, currentEnrollment: 0, status: 'open', startDate: new Date('2026-03-15'), endDate: new Date('2026-06-07'), meetingFormat: 'hybrid', prerequisites: ['Basic knowledge of Islamic concepts', 'Commitment to weekly reading'], syllabus: { week1: 'Introduction to Ghazali', week2: 'The nature of the self (nafs)', week3: 'Knowledge of oneself', week4: 'Knowledge of God', week5: 'Purpose of creation', week6: 'Purification of the heart', week7: 'Spiritual diseases and cure', week8: 'The path of virtue', week9: 'Remembrance and worship', week10: 'Love and longing', week11: 'Death and the hereafter', week12: 'Integration and commitment' } },
    { title: "Rumi's Masnavi: Poetry as Spiritual Teaching", slug: 'rumi-masnavi-circle', description: "Explore Rumi's mystical poetry as practical guide to spiritual awakening.", focusText: 'The Masnavi by Jalal al-Din Rumi', facilitator: 'Imam Khalid Hassan, Sufi teacher', meetingFrequency: 'biweekly', durationWeeks: 16, capacity: 15, currentEnrollment: 0, status: 'upcoming', startDate: new Date('2026-04-01'), meetingFormat: 'online', prerequisites: ['Open heart', 'Willingness to engage with poetry'], syllabus: { session1: 'Introduction to Rumi and Masnavi', session2: 'The Reed Flute Song', session3: 'Stories of transformation', session4: 'Love as path to Divine' } },
    { title: 'Women Mystics: Voices of Feminine Wisdom', slug: 'women-mystics-circle', description: 'Study the teachings of Rabia al-Adawiyya, Fatima of Nishapur, and other women saints.', focusText: 'Women Saints of Sufism anthology', facilitator: 'Sister Amina Farooq, spiritual guide', meetingFrequency: 'weekly', durationWeeks: 8, capacity: 12, currentEnrollment: 0, status: 'open', startDate: new Date('2026-03-22'), meetingFormat: 'online', prerequisites: ['None'], syllabus: { week1: 'Rabia al-Adawiyya: Love without condition', week2: 'Fatima of Nishapur: Wisdom teacher', week3: "Attar's Memorial of Saints", week4: 'Feminine divine attributes', week5: 'Heart-centered practice', week6: 'Integration of masculine/feminine', week7: 'Contemporary women mystics', week8: 'Embodying feminine wisdom' } },
    { title: 'The Heart of Meditation: Classical Practices', slug: 'heart-meditation-practices', description: 'Hands-on circle learning traditional Sufi meditation techniques including muraqaba, dhikr variations, and visualization practices.', focusText: 'Practical guide to Sufi meditation', facilitator: 'Shaykh Abdullah, Naqshbandi teacher', meetingFrequency: 'weekly', durationWeeks: 6, capacity: 10, currentEnrollment: 0, status: 'accepting', startDate: new Date('2026-03-29'), meetingFormat: 'in_person', prerequisites: ['Regular meditation practice', 'Commitment to daily practice during circle'], syllabus: { week1: 'Foundations of muraqaba', week2: 'Silent dhikr techniques', week3: 'Latifa activation', week4: 'Working with states and stations', week5: 'Integration of practice', week6: 'Personal practice design' } },
    { title: 'Stations of the Heart: Sufi Psychology and Inner States', slug: 'stations-heart-sufi-psychology', description: 'Explore the classical Sufi understanding of inner stations and passing states, including repentance, trust, patience, gratitude, and presence.', focusText: 'Classical teachings on maqamat and ahwal', facilitator: 'Ustad Hamza Qadri, teacher of spiritual psychology', meetingFrequency: 'weekly', durationWeeks: 10, capacity: 15, currentEnrollment: 15, status: 'waitlist', startDate: new Date('2026-04-11'), endDate: new Date('2026-06-20'), meetingFormat: 'online', prerequisites: ['Basic understanding of Islamic spirituality', 'Interest in inner development'], syllabus: { week1: 'Introduction to maqamat and ahwal', week2: 'Tawbah - Repentance and return', week3: 'Sabr - Patience and perseverance', week4: 'Tawakkul - Trust in Divine', week5: 'Shukr - Gratitude and contentment', week6: 'Rida - Satisfaction with Divine decree', week7: 'Khawf and Raja - Fear and hope', week8: 'Haya - Modesty and reverence', week9: 'Presence and mindfulness', week10: 'Integration and ongoing practice' } },
    { title: 'Adab and Companionship: Ethics of the Path', slug: 'adab-companionship-ethics', description: 'A circle devoted to the ethics of companionship, service, humility, and presence in the Sufi path.', focusText: 'Readings in adab, suhba, and ethical formation', facilitator: 'Shaykha Mariam Siddiqi, guide in contemplative ethics', meetingFrequency: 'weekly', durationWeeks: 8, capacity: 12, currentEnrollment: 12, status: 'closed', startDate: new Date('2026-02-08'), endDate: new Date('2026-04-04'), meetingFormat: 'in_person', prerequisites: ['Commitment to attend all sessions', 'Previous exposure to Sufi teachings'], syllabus: { week1: 'Introduction to adab - sacred courtesy', week2: 'Ethics of student-teacher relationship', week3: 'Companionship (suhba) and community', week4: 'Humility and self-effacement', week5: 'Service as spiritual practice', week6: 'Truthfulness and integrity', week7: 'Generosity and self-giving', week8: 'Embodiment of adab in daily life' } },
  ];

  for (const c of circles) {
    await prisma.studyCircle.create({ data: c });
  }
  console.log(`✅ ${circles.length} study circles seeded`);

  // ============================================================================
  // 5. MENTORSHIP PROGRAMS
  // ============================================================================
  console.log('\nSeeding mentorship programs...');
  await prisma.mentorshipProgram.deleteMany({});

  const programs = [
    {
      title: 'Foundations: One-on-One Spiritual Guidance',
      slug: 'foundations-spiritual-guidance',
      description: 'Individualized mentorship for those beginning their conscious spiritual journey. Focus on establishing daily practice, understanding basic concepts, and navigating early stages.',
      mentorName: 'Ustadh Ibrahim Al-Mansuri',
      mentorBio: 'Ustadh Ibrahim has 20+ years of experience guiding seekers on the path. Trained in both traditional Islamic sciences and modern psychology, he brings integrative approach to spiritual development.',
      mentorLineage: 'Shadhili-Darqawi lineage',
      focusAreas: ['Establishing prayer practice', 'Basic dhikr instruction', 'Understanding stages of the path', 'Character development', 'Integration of spiritual and worldly life'],
      programDurationMonths: 6,
      meetingFrequency: 'twice monthly',
      format: 'one_on_one',
      capacity: 5,
      currentParticipants: 0,
      status: 'accepting',
      requirements: ['Sincere intention', 'Commitment to daily practice', 'Basic Islamic knowledge'],
      applicationProcess: 'Submit application form including: why you seek guidance, your current practice, your intention. Brief interview will be scheduled if preliminary match.',
    },
    {
      title: 'Heart Work: Advanced Emotional-Spiritual Integration',
      slug: 'heart-work-integration',
      description: 'For experienced practitioners ready to go deeper into heart purification and advanced emotional-spiritual work.',
      mentorName: 'Dr. Layla Qasim',
      mentorBio: 'Dr. Qasim holds PhD in Clinical Psychology and Ijaza in Sufi teachings. She specializes in integration of psychological healing with spiritual development.',
      mentorLineage: 'Chishti tradition',
      focusAreas: ['Deep emotional healing', 'Shadow work from Islamic perspective', 'Advanced dhikr practices', 'Dreams and spiritual experiences', 'Service as practice'],
      programDurationMonths: 12,
      meetingFrequency: 'weekly',
      format: 'one_on_one',
      capacity: 3,
      currentParticipants: 0,
      status: 'waitlist',
      requirements: ['Minimum 2 years consistent practice', 'Basic emotional stability', 'Therapy concurrent or completed', 'Teacher recommendation'],
      applicationProcess: 'Requires written application, interview, and recommendation from previous teacher or therapist. Sliding scale available.',
    },
    {
      title: 'Teacher Training: Guiding Others on the Path',
      slug: 'teacher-training-program',
      description: 'Intensive program preparing qualified individuals to offer spiritual guidance to others. Combines traditional transmission with modern facilitation skills.',
      mentorName: 'Shaykha Maryam Al-Hashimi',
      mentorBio: 'Shaykha Maryam received authorization to teach from multiple lineages. She has trained spiritual guides for 15 years and emphasizes ethical, trauma-informed guidance.',
      mentorLineage: 'Multi-lineage: Naqshbandi, Qadiri, Shadhili',
      focusAreas: ['Traditional transmission', 'Ethics of guidance', 'Trauma-informed approaches', 'Group facilitation', 'Personal deepening'],
      programDurationMonths: 24,
      meetingFrequency: 'monthly intensives',
      format: 'small_group',
      capacity: 8,
      currentParticipants: 8,
      status: 'closed',
      requirements: ['Minimum 10 years of practice', 'Authorization from current teacher', 'Demonstrated maturity and character', 'Completion of prerequisite studies'],
      applicationProcess: 'By invitation only. Those interested should contact institute for future cohort information.',
    },
  ];

  for (const p of programs) {
    await prisma.mentorshipProgram.create({ data: p });
  }
  console.log(`✅ ${programs.length} mentorship programs seeded`);

  // ============================================================================
  // 6. GUIDANCE PATHWAYS
  // ============================================================================
  console.log('\nSeeding guidance pathways...');
  await prisma.guidancePathway.deleteMany({});

  const pathways = [
    { title: 'Beginning the Journey: Foundations Pathway', description: 'A structured 12-week pathway for newcomers to establish foundational practices and understand the basics of Sufi inner development.', targetAudience: 'Beginners with little or no prior contemplative experience', assessmentProfile: { cognitive_patterns: 'exploring', emotional_intelligence: 'developing', contemplative_capacity: 'beginner', transformative_readiness: 'motivated' }, recommendedPractices: [], recommendedStages: [], durationWeeks: 12 },
    { title: 'Deepening Practice: Intermediate Pathway', description: 'For practitioners with established daily practice ready to deepen their understanding of classical stations and states.', targetAudience: 'Practitioners with 6+ months of regular contemplative practice', assessmentProfile: { cognitive_patterns: 'developing', emotional_intelligence: 'moderate', contemplative_capacity: 'intermediate', transformative_readiness: 'committed' }, recommendedPractices: [], recommendedStages: [], durationWeeks: 24 },
    { title: 'Advanced Integration: Mastery Pathway', description: 'Intensive pathway for mature practitioners working with a spiritual guide on advanced stations and emotional-spiritual integration.', targetAudience: 'Advanced practitioners with 2+ years of dedicated practice and spiritual direction', assessmentProfile: { cognitive_patterns: 'mature', emotional_intelligence: 'advanced', contemplative_capacity: 'advanced', transformative_readiness: 'fully_committed' }, recommendedPractices: [], recommendedStages: [], durationWeeks: 52 },
  ];

  for (const pw of pathways) {
    await prisma.guidancePathway.create({ data: pw });
  }
  console.log(`✅ ${pathways.length} guidance pathways seeded`);

  console.log('\n🎉 Inner development data seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
