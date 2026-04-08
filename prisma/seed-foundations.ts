import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@/lib/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding foundations data...\n');

  // ============================================================================
  // 1. LINEAGES
  // ============================================================================
  console.log('Seeding lineages...');
  
  const lineages = [
    { name: 'Formative Sufi Era', slug: 'formative-sufi-era', description: 'Pre-institutional Sufi transmission preceding the formal tariqa system.', level: 0, displayOrder: 0 },
    { name: 'Qadiriyya', slug: 'qadiriyya', description: 'Founded by Abdul Qadir Gilani of Baghdad (1077–1166). The oldest and most geographically widespread Sufi order.', level: 0, displayOrder: 1 },
    { name: 'Naqshbandiyya', slug: 'naqshbandiyya', description: 'Traced to Baha-ud-Din Naqshband of Bukhara (1318–1389). Emphasis on silent dhikr and sobriety.', level: 0, displayOrder: 2 },
    { name: 'Chishtiyya', slug: 'chishtiyya', description: 'Founded by Moinuddin Chishti of Ajmer (1141–1230). Known for openness, love, and sama.', level: 0, displayOrder: 3 },
    { name: 'Shadhiliyya', slug: 'shadhiliyya', description: 'Founded by Abu al-Hasan al-Shadhili of North Africa (1196–1258). Intellectual mysticism.', level: 0, displayOrder: 4 },
    { name: 'Suhrawardiyya', slug: 'suhrawardiyya', description: 'Transmitted through Abu Hafs Umar al-Suhrawardi (1145–1234). Sufi ethics and scholarship.', level: 0, displayOrder: 5 },
    { name: "Rifaʿiyya", slug: 'rifaiyya', description: "Founded by Ahmad al-Rifa'i of Iraq (1118–1182). Intense devotional practice.", level: 0, displayOrder: 6 },
    { name: 'Kubrawiyya', slug: 'kubrawiyya', description: 'Founded by Najmuddin Kubra of Khwarazm (1145–1221). Visionary experiences and light phenomena.', level: 0, displayOrder: 7 },
    { name: 'Mevleviyya', slug: 'mevleviyya', description: "The order of the Whirling Dervishes, around Rumi (1207–1273). Known for samāʿ and Persian poetry.", level: 0, displayOrder: 8 },
    { name: 'Yasawiyya', slug: 'yasawiyya', description: 'Founded by Ahmad Yasawi of Turkestan (c. 1093–1166). Earliest Turkic Sufi order.', level: 0, displayOrder: 9 },
    { name: 'Bektashiyya', slug: 'bektashiyya', description: 'Associated with Haji Bektash Veli of Anatolia (1209–1271). Syncretic order.', level: 0, displayOrder: 10 },
    { name: 'Tijaniyya', slug: 'tijaniyya', description: 'Founded by Ahmad al-Tijani of Algeria (1737–1815). Dominant in West and North Africa.', level: 0, displayOrder: 11 },
    { name: 'Sanusiyya', slug: 'sanusiyya', description: 'Founded by Muhammad ibn Ali al-Sanusi (1787–1859). Reformist order in Libya and Sahara.', level: 0, displayOrder: 12 },
    { name: 'Mujaddidiyya', slug: 'mujaddidiyya', description: 'Sub-branch of Naqshbandiyya emphasizing renewal and reform.', level: 1, displayOrder: 21 },
    { name: 'Khalidiyya', slug: 'khalidiyya', description: 'Sub-branch of Naqshbandiyya prominent in Caucasus and Ottoman world.', level: 1, displayOrder: 22 },
    { name: 'Nizamiyya', slug: 'nizamiyya', description: 'Sub-branch of Chishtiyya in the Indian Subcontinent.', level: 1, displayOrder: 31 },
    { name: 'Sabiriyya', slug: 'sabiriyya', description: 'Sub-branch of Chishtiyya emphasizing patience and endurance.', level: 1, displayOrder: 32 },
  ];

  for (const lineage of lineages) {
    await prisma.lineage.upsert({
      where: { slug: lineage.slug },
      update: lineage,
      create: lineage,
    });
  }

  // Set parent-child relationships for sub-branches
  const naqshbandiyya = await prisma.lineage.findUnique({ where: { slug: 'naqshbandiyya' } });
  const chishtiyya = await prisma.lineage.findUnique({ where: { slug: 'chishtiyya' } });

  if (naqshbandiyya) {
    await prisma.lineage.updateMany({
      where: { slug: { in: ['mujaddidiyya', 'khalidiyya'] } },
      data: { parentLineageId: naqshbandiyya.id },
    });
  }

  if (chishtiyya) {
    await prisma.lineage.updateMany({
      where: { slug: { in: ['nizamiyya', 'sabiriyya'] } },
      data: { parentLineageId: chishtiyya.id },
    });
  }

  console.log(`✅ ${lineages.length} lineages seeded`);

  // ============================================================================
  // 2. REGIONS
  // ============================================================================
  console.log('\nSeeding regions...');
  
  const regions = [
    // 16 Root regions
    { name: 'Early Islamic World', slug: 'early-islamic-world', level: 0, displayOrder: 1, description: 'The Arabian Peninsula and the first centers of Islamic civilization — Mecca, Medina, Basra, Kufa, and Baghdad.' },
    { name: 'Arabian Peninsula', slug: 'arabian-peninsula', level: 0, displayOrder: 2, description: 'The Arabian Peninsula — birthplace of Islam and the spiritual center of the Muslim world.' },
    { name: 'Persia & Greater Iran', slug: 'persia-iran', level: 0, displayOrder: 3, description: 'Persia and Greater Iran — Nishapur, Herat, Isfahan, Shiraz — the heartland of Sufi literary culture.' },
    { name: 'Central Asia', slug: 'central-asia', level: 0, displayOrder: 4, description: 'Transoxiana and the Steppes — Bukhara, Samarkand, Khwarazm — cradle of the Naqshbandiyya.' },
    { name: 'South Asia', slug: 'south-asia', level: 0, displayOrder: 5, description: 'The Indian Subcontinent — Ajmer, Delhi, Lahore, Multan, Kashmir — the largest Sufi sphere by population.' },
    { name: 'Anatolia', slug: 'anatolia', level: 0, displayOrder: 6, description: 'Anatolia and the Anatolian plateau — Konya, Bursa — center of the Mevleviyya and Bektashiyya.' },
    { name: 'North Africa', slug: 'north-africa', level: 0, displayOrder: 7, description: 'The Maghreb and Egypt — Fez, Tunis, Cairo — centers of Shadhiliyya and later reformist orders.' },
    { name: 'Al-Andalus', slug: 'al-andalus', level: 0, displayOrder: 8, description: 'Islamic Iberia — Cordoba, Seville, Murcia — the western pole of Islamic civilization.' },
    { name: 'Sub-Saharan Africa', slug: 'sub-saharan-africa', level: 0, displayOrder: 9, description: 'West and East Africa — where Sufi orders served as primary vehicles for Islamization.' },
    { name: 'Ottoman World', slug: 'ottoman-world', level: 0, displayOrder: 10, description: 'The Ottoman Empire — Istanbul and the Balkans — where Sufi orders achieved state integration.' },
    { name: 'Levant', slug: 'levant', level: 0, displayOrder: 11, description: 'Syria, Palestine, and Lebanon — Damascus a major center of Sufi scholarship.' },
    { name: 'Global Diaspora', slug: 'global-diaspora', level: 0, displayOrder: 12, description: 'Sufi communities in the modern West — Europe, North America, and beyond.' },
    { name: 'Balkans', slug: 'balkans', level: 0, displayOrder: 13, description: 'Southeast Europe under Ottoman influence — major Bektashi and Khalwati presence.' },
    { name: 'Caucasus', slug: 'caucasus', level: 0, displayOrder: 14, description: 'The Caucasus — Georgia, Chechnya, Dagestan — stronghold of the Naqshbandiyya–Khalidiyya.' },
    { name: 'Southeast Asia', slug: 'southeast-asia', level: 0, displayOrder: 15, description: 'Maritime Southeast Asia — Malaysia, Indonesia, Brunei — where Sufism shaped the character of the region\'s Islam.' },
    { name: 'China', slug: 'china', level: 0, displayOrder: 16, description: 'China and Central Asian Chinese territories — unique synthesis of Sufism with Chinese culture.' },
  ];

  for (const region of regions) {
    await prisma.region.upsert({
      where: { slug: region.slug },
      update: region,
      create: region,
    });
  }

  // Add sub-regions (level 1) — 36 total
  const subRegions = [
    // Early Islamic World (4)
    { name: 'Hijaz (Mecca & Medina)', slug: 'hijaz', level: 1, displayOrder: 11 },
    { name: 'Basra', slug: 'basra', level: 1, displayOrder: 12 },
    { name: 'Kufa', slug: 'kufa', level: 1, displayOrder: 13 },
    { name: 'Baghdad', slug: 'baghdad-eiw', level: 1, displayOrder: 14 },
    // Arabian Peninsula (1)
    { name: 'Prophetic Arabia', slug: 'prophetic-arabia', level: 1, displayOrder: 21 },
    // Persia & Greater Iran (5)
    { name: 'Nishapur', slug: 'nishapur', level: 1, displayOrder: 31 },
    { name: 'Shiraz', slug: 'shiraz', level: 1, displayOrder: 32 },
    { name: 'Isfahan', slug: 'isfahan', level: 1, displayOrder: 33 },
    { name: 'Baghdad (Iraq)', slug: 'baghdad', level: 1, displayOrder: 34 },
    { name: 'Herat', slug: 'herat', level: 1, displayOrder: 35 },
    // Central Asia (3)
    { name: 'Bukhara', slug: 'bukhara', level: 1, displayOrder: 41 },
    { name: 'Samarkand', slug: 'samarkand', level: 1, displayOrder: 42 },
    { name: 'Khwarazm', slug: 'khwarazm', level: 1, displayOrder: 43 },
    // South Asia (11)
    { name: 'North India', slug: 'north-india', level: 1, displayOrder: 51 },
    { name: 'Bengal', slug: 'bengal', level: 1, displayOrder: 52 },
    { name: 'Sindh', slug: 'sindh', level: 1, displayOrder: 53 },
    { name: 'Punjab', slug: 'punjab', level: 1, displayOrder: 54 },
    { name: 'Ajmer', slug: 'ajmer', level: 1, displayOrder: 55 },
    { name: 'Delhi', slug: 'delhi', level: 1, displayOrder: 56 },
    { name: 'Lahore', slug: 'lahore', level: 1, displayOrder: 57 },
    { name: 'Multan', slug: 'multan', level: 1, displayOrder: 58 },
    { name: 'Kashmir', slug: 'kashmir', level: 1, displayOrder: 59 },
    { name: 'Srinagar', slug: 'srinagar', level: 1, displayOrder: 60 },
    { name: 'Charar-e-Sharif', slug: 'charar-e-sharif', level: 1, displayOrder: 61 },
    // Anatolia (2)
    { name: 'Konya', slug: 'konya', level: 1, displayOrder: 71 },
    { name: 'Bursa', slug: 'bursa', level: 1, displayOrder: 72 },
    // North Africa (6)
    { name: 'Fez', slug: 'fez', level: 1, displayOrder: 81 },
    { name: 'Morocco', slug: 'morocco', level: 1, displayOrder: 82 },
    { name: 'Algeria', slug: 'algeria', level: 1, displayOrder: 83 },
    { name: 'Tunis', slug: 'tunis', level: 1, displayOrder: 84 },
    { name: 'Cairo', slug: 'cairo', level: 1, displayOrder: 85 },
    { name: 'Egypt', slug: 'egypt', level: 1, displayOrder: 86 },
    // Al-Andalus (2)
    { name: 'Cordoba', slug: 'cordoba', level: 1, displayOrder: 91 },
    { name: 'Seville', slug: 'seville', level: 1, displayOrder: 92 },
    // Ottoman World (2)
    { name: 'Istanbul', slug: 'istanbul', level: 1, displayOrder: 101 },
    { name: 'Edirne', slug: 'edirne', level: 1, displayOrder: 102 },
  ];

  for (const subRegion of subRegions) {
    await prisma.region.upsert({
      where: { slug: subRegion.slug },
      update: subRegion,
      create: subRegion,
    });
  }

  // Set parent-child relationships for sub-regions
  const earlyIslamicWorld = await prisma.region.findUnique({ where: { slug: 'early-islamic-world' } });
  const arabianPeninsula = await prisma.region.findUnique({ where: { slug: 'arabian-peninsula' } });
  const persiaIran = await prisma.region.findUnique({ where: { slug: 'persia-iran' } });
  const centralAsia = await prisma.region.findUnique({ where: { slug: 'central-asia' } });
  const southAsia = await prisma.region.findUnique({ where: { slug: 'south-asia' } });
  const anatolia = await prisma.region.findUnique({ where: { slug: 'anatolia' } });
  const northAfrica = await prisma.region.findUnique({ where: { slug: 'north-africa' } });
  const alAndalus = await prisma.region.findUnique({ where: { slug: 'al-andalus' } });
  const ottomanWorld = await prisma.region.findUnique({ where: { slug: 'ottoman-world' } });

  if (earlyIslamicWorld) {
    await prisma.region.updateMany({
      where: { slug: { in: ['hijaz', 'basra', 'kufa', 'baghdad-eiw'] } },
      data: { parentRegionId: earlyIslamicWorld.id },
    });
  }

  if (arabianPeninsula) {
    await prisma.region.updateMany({
      where: { slug: { in: ['prophetic-arabia'] } },
      data: { parentRegionId: arabianPeninsula.id },
    });
  }

  if (persiaIran) {
    await prisma.region.updateMany({
      where: { slug: { in: ['nishapur', 'shiraz', 'isfahan', 'baghdad', 'herat'] } },
      data: { parentRegionId: persiaIran.id },
    });
  }

  if (centralAsia) {
    await prisma.region.updateMany({
      where: { slug: { in: ['bukhara', 'samarkand', 'khwarazm'] } },
      data: { parentRegionId: centralAsia.id },
    });
  }

  if (southAsia) {
    await prisma.region.updateMany({
      where: { slug: { in: ['north-india', 'bengal', 'sindh', 'punjab', 'ajmer', 'delhi', 'lahore', 'multan', 'kashmir', 'srinagar', 'charar-e-sharif'] } },
      data: { parentRegionId: southAsia.id },
    });
  }

  if (anatolia) {
    await prisma.region.updateMany({
      where: { slug: { in: ['konya', 'bursa'] } },
      data: { parentRegionId: anatolia.id },
    });
  }

  if (northAfrica) {
    await prisma.region.updateMany({
      where: { slug: { in: ['fez', 'morocco', 'algeria', 'tunis', 'cairo', 'egypt'] } },
      data: { parentRegionId: northAfrica.id },
    });
  }

  if (alAndalus) {
    await prisma.region.updateMany({
      where: { slug: { in: ['cordoba', 'seville'] } },
      data: { parentRegionId: alAndalus.id },
    });
  }

  if (ottomanWorld) {
    await prisma.region.updateMany({
      where: { slug: { in: ['istanbul', 'edirne'] } },
      data: { parentRegionId: ottomanWorld.id },
    });
  }

  console.log(`✅ ${regions.length + subRegions.length} regions seeded (${regions.length} root + ${subRegions.length} sub-regions)`);

  // ============================================================================
  // 3. THEMES
  // ============================================================================
  console.log('\nSeeding themes...');
  
  // Delete existing relationships first to avoid FK constraint violations
  await prisma.saintTheme.deleteMany({});
  await prisma.saintLineage.deleteMany({});
  await prisma.theme.deleteMany({});
  
  const themes = [
    // Cluster 1: Core Metaphysical Themes (100-series)
    { name: 'Unity of Being (Wahdat al-Wujud)', slug: 'unity-of-being', category: 'metaphysical', displayOrder: 101 },
    { name: 'Ontology & Metaphysics', slug: 'ontology-metaphysics', category: 'metaphysical', displayOrder: 102 },
    { name: 'Cosmology', slug: 'cosmology', category: 'metaphysical', displayOrder: 103 },
    { name: 'Divine Names & Attributes', slug: 'divine-names-attributes', category: 'metaphysical', displayOrder: 104 },
    { name: 'Prophecy & Revelation', slug: 'prophecy-revelation', category: 'metaphysical', displayOrder: 105 },
    { name: 'Wilayah (Sainthood)', slug: 'wilayah-sainthood', category: 'metaphysical', displayOrder: 106 },
    
    // Cluster 2: Spiritual Psychology & Inner Science (200-series)
    { name: 'Spiritual Transformation', slug: 'spiritual-transformation', category: 'psychology', displayOrder: 201 },
    { name: 'Tazkiyah (Purification)', slug: 'tazkiyah-purification', category: 'psychology', displayOrder: 202 },
    { name: 'Spiritual Psychology', slug: 'spiritual-psychology', category: 'psychology', displayOrder: 203 },
    { name: 'Nafs & Selfhood', slug: 'nafs-selfhood', category: 'psychology', displayOrder: 204 },
    { name: 'Dreams & Spiritual Visions', slug: 'dreams-visions', category: 'psychology', displayOrder: 205 },
    { name: 'Contemplation & Dhikr', slug: 'contemplation-dhikr', category: 'psychology', displayOrder: 206 },
    
    // Cluster 3: Devotional & Ritual Life (300-series)
    { name: 'Divine Love & Devotion', slug: 'divine-love-devotion', category: 'devotional', displayOrder: 301 },
    { name: 'Sama & Sacred Music', slug: 'sama-sacred-music', category: 'devotional', displayOrder: 302 },
    { name: 'Ritual & Practice', slug: 'ritual-practice', category: 'devotional', displayOrder: 303 },
    { name: 'Asceticism & Renunciation', slug: 'asceticism-renunciation', category: 'devotional', displayOrder: 304 },
    { name: 'Adab & Spiritual Etiquette', slug: 'adab-spiritual-etiquette', category: 'devotional', displayOrder: 305 },
    
    // Cluster 4: Transmission & Authority (400-series)
    { name: 'Silsila & Lineage Transmission', slug: 'silsila-lineage-transmission', category: 'transmission', displayOrder: 401 },
    { name: 'Spiritual Authority & Shaykhhood', slug: 'spiritual-authority-shaykhhood', category: 'transmission', displayOrder: 402 },
    { name: 'Initiation & Bayʿah', slug: 'initiation-bayah', category: 'transmission', displayOrder: 403 },
    { name: 'Institutional Orders', slug: 'institutional-orders', category: 'transmission', displayOrder: 404 },
    
    // Cluster 5: Intellectual & Theological Engagement (500-series)
    { name: 'Jurisprudence & Fiqh', slug: 'jurisprudence-fiqh', category: 'intellectual', displayOrder: 501 },
    { name: 'Theology (Kalam)', slug: 'theology-kalam', category: 'intellectual', displayOrder: 502 },
    { name: 'Interfaith Dialogue', slug: 'interfaith-dialogue', category: 'intellectual', displayOrder: 503 },
    { name: 'Philosophy & Mystical Thought', slug: 'philosophy-mystical-thought', category: 'intellectual', displayOrder: 504 },
    { name: 'Reform & Renewal', slug: 'reform-renewal', category: 'intellectual', displayOrder: 505 },
    
    // Cluster 6: Social & Civilizational Dimensions (600-series)
    { name: 'Social Reform & Justice', slug: 'social-reform-justice', category: 'civilizational', displayOrder: 601 },
    { name: 'Political Mysticism', slug: 'political-mysticism', category: 'civilizational', displayOrder: 602 },
    { name: 'Gender & Spirituality', slug: 'gender-spirituality', category: 'civilizational', displayOrder: 603 },
    { name: 'Education & Knowledge Preservation', slug: 'education-knowledge-preservation', category: 'civilizational', displayOrder: 604 },
    { name: 'Poetry & Artistic Expression', slug: 'poetry-artistic-expression', category: 'civilizational', displayOrder: 605 },
  ];

  for (const theme of themes) {
    await prisma.theme.create({
      data: theme,
    });
  }
  console.log(`✅ ${themes.length} themes seeded`);

  // ============================================================================
  // 4. HISTORICAL PERIODS
  // ============================================================================
  console.log('\nSeeding historical periods...');
  
  // Delete existing periods to replace with correct slugs
  await prisma.historicalPeriod.deleteMany({});
  
  const periods = [
    { name: 'Prophetic Era', slug: 'prophetic-foundational-transmission', startYear: 610, endYear: 632, islamicCalendarStart: '1 BH', islamicCalendarEnd: '11 AH', description: 'The lifetime of Prophet Muhammad and the revelation of the Quran.', significance: 'Foundation of Islamic spirituality.', displayOrder: 1 },
    { name: "Companions & Early Ascetics", slug: 'early-ascetic-ethical-formation', startYear: 632, endYear: 750, islamicCalendarStart: '11 AH', islamicCalendarEnd: '132 AH', description: 'The era of the Companions and early ascetic movements.', significance: 'Direct transmission of Prophetic wisdom.', displayOrder: 2 },
    { name: 'Classical Formation', slug: 'classical-theoretical-consolidation', startYear: 750, endYear: 1000, islamicCalendarStart: '132 AH', islamicCalendarEnd: '390 AH', description: 'Codification of Sufi teachings, emergence of al-Hallaj, Junayd, Bayazid.', significance: 'Intellectual foundations of Sufism.', displayOrder: 3 },
    { name: 'Institutional Orders', slug: 'institutional-tariqa-formation', startYear: 1000, endYear: 1300, islamicCalendarStart: '390 AH', islamicCalendarEnd: '700 AH', description: 'Formation of formal tariqa structures including Qadiri, Suhrawardi, Chishti.', significance: 'Systematization of spiritual training.', displayOrder: 4 },
    { name: 'Metaphysical Expansion', slug: 'metaphysical-philosophical-expansion', startYear: 1300, endYear: 1500, islamicCalendarStart: '700 AH', islamicCalendarEnd: '906 AH', description: 'Flowering of Sufi philosophy with Ibn Arabi, Rumi, and Unity of Being.', significance: 'Sophisticated mystical theology.', displayOrder: 5 },
    { name: 'Global Spread', slug: 'imperial-global-expansion', startYear: 1500, endYear: 1800, islamicCalendarStart: '906 AH', islamicCalendarEnd: '1216 AH', description: 'Expansion of Sufi orders across Asia, Africa, and regional centers.', significance: 'Cultural adaptation and diverse expressions.', displayOrder: 6 },
    { name: 'Reform & Renewal', slug: 'reform-renewal-modern-rearticulation', startYear: 1800, endYear: 2000, islamicCalendarStart: '1216 AH', islamicCalendarEnd: '1421 AH', description: 'Movements of revival, reform, and response to modernity.', significance: 'Reformation of traditional practices.', displayOrder: 7 },
    { name: 'Contemporary', slug: 'contemporary', startYear: 2000, endYear: null, islamicCalendarStart: '1421 AH', islamicCalendarEnd: null, description: 'Present-day Sufi practice and scholarship in global context.', significance: 'Integration with contemporary science and psychology.', displayOrder: 8 },
  ];

  for (const period of periods) {
    await prisma.historicalPeriod.create({
      data: period,
    });
  }
  console.log(`✅ ${periods.length} historical periods seeded`);

  // ============================================================================
  // 5. SAINTS (Masters of the Path)
  // ============================================================================
  console.log('\nSeeding saints...');
  
  // Delete existing saints
  await prisma.saint.deleteMany({});

  const saints = [
    // Prophetic Era & Companions (6)
    { name: 'Prophet Muhammad ﷺ', slug: 'prophet-muhammad', birthYear: 570, deathYear: 632, region: 'Prophetic Arabia, Arabian Peninsula', shortSummary: 'The Prophet of Islam and the foundational source of Sufi spirituality.', biography: 'Prophet Muhammad (peace be upon him) is the central figure of Islam and the ultimate exemplar for all Sufis.', isFounder: true },
    { name: 'Abu Bakr al-Siddiq', slug: 'abu-bakr-al-siddiq', birthYear: 573, deathYear: 634, region: 'Hijaz (Mecca & Medina), Early Islamic World', shortSummary: 'The first Caliph and closest companion of the Prophet, considered the primary transmitter of the silent Sufi chain.', biography: 'Abu Bakr al-Siddiq is venerated in Sufi tradition as the first link in the silent chain of spiritual transmission (silsila khafi).', isFounder: false },
    { name: 'Ali ibn Abi Talib', slug: 'ali-ibn-abi-talib', birthYear: 600, deathYear: 661, region: 'Prophetic Arabia, Arabian Peninsula', shortSummary: 'The fourth Caliph and spiritual exemplar, considered the fountainhead of esoteric knowledge.', biography: 'Ali ibn Abi Talib is revered across Sufism as the transmitter of inner knowledge. Many Sufi orders trace their spiritual lineage back to him.', isFounder: false },
    { name: 'Hasan al-Basri', slug: 'hasan-al-basri', birthYear: 642, deathYear: 728, region: 'Arabian Peninsula', shortSummary: 'Early ascetic and theologian who shaped Islamic spirituality.', biography: 'Hasan al-Basri was one of the most prominent scholars and ascetics of the early Islamic period.', isFounder: false },
    { name: 'Rabia al-Adawiyya', slug: 'rabia-al-adawiyya', birthYear: 717, deathYear: 801, region: 'Basra, Early Islamic World', shortSummary: 'The first great female Sufi mystic, renowned for her doctrine of selfless divine love.', biography: 'Rabia al-Adawiyya of Basra articulated a theology of pure love for God, untainted by fear of Hell or desire for Paradise.', isFounder: false },
    { name: 'Uways al-Qarani', slug: 'uways-al-qarani', birthYear: null, deathYear: 657, region: 'Kufa, Early Islamic World', shortSummary: 'The archetype of the spiritual seeker who never met the Prophet physically yet was connected spiritually.', biography: 'Uways al-Qarani represents the concept of spiritual transmission beyond physical presence (uwaysi transmission).', isFounder: false },
    // Classical Formation (9)
    { name: 'Hakim al-Tirmidhi', slug: 'hakim-al-tirmidhi', birthYear: 750, deathYear: 869, region: 'Central Asia', shortSummary: 'Early mystic who systematized spiritual states and stations.', biography: 'Hakim al-Tirmidhi was an early mystic who systematized spiritual states and stations, laying groundwork for later Sufi psychology.', isFounder: false },
    { name: 'Dhu al-Nun al-Misri', slug: 'dhu-al-nun-al-misri', birthYear: 796, deathYear: 861, region: 'Cairo, North Africa', shortSummary: 'Egyptian mystic who introduced the concept of maʿrifa (gnosis) into Sufi discourse.', biography: 'Dhu al-Nun al-Misri introduced the concept of ma\'rifa and articulated the maqamat of the spiritual path.', isFounder: false },
    { name: 'Bayazid Bastami', slug: 'bayazid-bastami', birthYear: 804, deathYear: 874, region: 'Persia & Greater Iran', shortSummary: 'The intoxicated mystic known for ecstatic utterances and the doctrine of annihilation.', biography: 'Bayazid Bastami was known for ecstatic utterances expressing complete annihilation in God.', isFounder: false },
    { name: 'Junayd al-Baghdadi', slug: 'junayd-al-baghdadi', birthYear: 830, deathYear: 910, region: 'Baghdad, Early Islamic World', shortSummary: 'Master of the Masters (Sayyid al-Taʾifa), who systematized Sufi doctrine.', biography: 'Junayd al-Baghdadi systematized Sufi doctrine and established the principle of sobriety in mystical experience.', isFounder: true },
    { name: 'Mansur al-Hallaj', slug: 'mansur-al-hallaj', birthYear: 858, deathYear: 922, region: 'Baghdad, Early Islamic World', shortSummary: 'Ecstatic mystic and martyr of love, famous for his declaration "Ana al-Haqq" (I am the Truth).', biography: 'His trial and execution became the defining moment of mystical witness in Islamic history.', isFounder: false },
    { name: 'Ibn Masarra', slug: 'ibn-masarra', birthYear: 883, deathYear: 931, region: 'Al-Andalus', shortSummary: 'Early Andalusian mystic-philosopher who integrated Neoplatonism with Islam.', biography: 'Ibn Masarra was an early Andalusian mystic-philosopher who integrated Neoplatonism with Islamic thought.', isFounder: false },
    { name: 'Salman al-Farsi', slug: 'salman-al-farsi', birthYear: null, deathYear: 656, region: 'Persia & Greater Iran', shortSummary: 'Persian companion who represents the universality of Islamic spirituality.', biography: 'Salman al-Farsi was a Persian who converted to Islam after a lifelong spiritual quest.', isFounder: false },
    // Order Founders & Classical Masters (20)
    { name: 'Khoja Abdullah Ansari', slug: 'khoja-abdullah-ansari', birthYear: 1006, deathYear: 1088, region: 'Central Asia', shortSummary: 'The "Sage of Herat," renowned for intimate Persian prayers and spiritual stages.', biography: 'Khoja Abdullah Ansari was renowned for his intimate Persian prayers and articulation of spiritual stages.', isFounder: false },
    { name: 'Abu Hamid al-Ghazali', slug: 'abu-hamid-al-ghazali', birthYear: 1058, deathYear: 1111, region: 'Nishapur, Persia & Greater Iran', shortSummary: 'The "Proof of Islam" who synthesized law, theology, and spirituality.', biography: 'Abu Hamid al-Ghazali reconciled Islamic law with Sufism. His spiritual crisis and subsequent transformation reshaped Islamic intellectual history.', isFounder: false },
    { name: 'Abd al-Qadir al-Jilani', slug: 'abd-al-qadir-al-jilani', birthYear: 1078, deathYear: 1166, region: 'Baghdad, Early Islamic World', shortSummary: 'Founder of the Qadiriyya order, known as the Sultan of the Awliya.', biography: 'His order spread from Baghdad to become the largest Sufi order globally.', isFounder: true },
    { name: 'Ibn al-Arif', slug: 'ibn-al-arif', birthYear: 1088, deathYear: 1141, region: 'Al-Andalus', shortSummary: 'Leading Andalusian Sufi who systematized mystical teachings.', biography: 'Ibn al-Arif systematized mystical teachings in Al-Andalus.', isFounder: false },
    { name: 'Ahmad Yasawi', slug: 'ahmad-yasawi', birthYear: 1103, deathYear: 1166, region: 'Central Asia', shortSummary: 'Turkic Sufi poet who brought Islam to Central Asian nomads through Turkish poetry.', biography: 'Ahmad Yasawi brought Islam to Central Asian nomads through Turkish poetry.', isFounder: true },
    { name: 'Ahmad al-Rifai', slug: 'ahmad-al-rifai', birthYear: 1118, deathYear: 1182, region: 'Baghdad, Early Islamic World', shortSummary: 'Founder of the Rifaʿiyya order, known for intense devotional practices.', biography: 'His order was the second major institutional tariqa, spreading widely through Iraq, Egypt, and the Levant.', isFounder: true },
    { name: 'Abu Madyan', slug: 'abu-madyan', birthYear: 1126, deathYear: 1197, region: 'North Africa', shortSummary: 'The spiritual patron of North African Sufism.', biography: 'Abu Madyan was the spiritual patron of North African Sufism.', isFounder: false },
    { name: 'Ruzbihan Baqli', slug: 'ruzbihan-baqli', birthYear: 1128, deathYear: 1209, region: 'Persia & Greater Iran', shortSummary: 'The mystic of divine beauty and love, defender of ecstatic utterances.', biography: 'Ruzbihan Baqli defended ecstatic utterances and wrote extensively on divine beauty.', isFounder: false },
    { name: 'Moinuddin Chishti', slug: 'moinuddin-chishti', birthYear: 1143, deathYear: 1236, region: 'Ajmer, South Asia', shortSummary: 'The patron saint of India who established the Chishti order in South Asia.', biography: 'Moinuddin Chishti established the Chishti order in South Asia.', isFounder: true },
    { name: 'Shihab al-Din Suhrawardi', slug: 'shihab-al-din-suhrawardi', birthYear: 1145, deathYear: 1234, region: 'Baghdad, Early Islamic World', shortSummary: 'Founder of the Suhrawardiyya order and author of Awarif al-Maarif.', biography: 'Author of Awarif al-Maarif, the authoritative manual of Sufi conduct.', isFounder: true },
    { name: 'Fariduddin Attar', slug: 'fariduddin-attar', birthYear: 1145, deathYear: 1221, region: 'Nishapur, Persia & Greater Iran', shortSummary: 'Master poet who conveyed Sufi teachings through allegorical narratives.', biography: 'Fariduddin Attar conveyed Sufi teachings through allegorical narratives.', isFounder: false },
    { name: 'Najmuddin Kubra', slug: 'najmuddin-kubra', birthYear: 1145, deathYear: 1221, region: 'Central Asia', shortSummary: 'Founder of the Kubrawiyya order, master of visionary experiences.', biography: 'Najmuddin Kubra was master of visionary experiences.', isFounder: true },
    { name: 'Ibn Arabi (Muhyiddin)', slug: 'ibn-arabi', birthYear: 1165, deathYear: 1240, region: 'Al-Andalus', shortSummary: 'The Greatest Master (al-Shaykh al-Akbar) whose metaphysical teachings shaped Islamic mysticism.', biography: 'Ibn Arabi\'s metaphysical teachings shaped Islamic mysticism for centuries.', isFounder: false },
    { name: 'Bahauddin Zakariya', slug: 'bahauddin-zakariya', birthYear: 1170, deathYear: 1267, region: 'Multan, South Asia', shortSummary: 'The leading Suhrawardi master of South Asia who established the order in Multan.', biography: 'Combined spiritual authority with political influence in the Sultanate era.', isFounder: false },
    { name: 'Baba Farid Ganj-e-Shakar', slug: 'baba-farid-ganj-e-shakar', birthYear: 1179, deathYear: 1266, region: 'Multan, South Asia', shortSummary: 'One of the most beloved Chishti saints of the Punjab, whose verses were canonized in the Sikh Guru Granth Sahib.', biography: 'His Punjabi verses created a unique bridge between Sufi and Sikh traditions.', isFounder: false },
    { name: 'Shams of Tabriz', slug: 'shams-of-tabriz', birthYear: 1185, deathYear: 1248, region: 'Persia & Greater Iran', shortSummary: 'The mysterious dervish who catalyzed Rumi\'s spiritual transformation.', biography: 'Shams of Tabriz catalyzed Rumi\'s spiritual transformation.', isFounder: false },
    { name: 'Abu al-Hasan al-Shadhili', slug: 'abu-al-hasan-al-shadhili', birthYear: 1196, deathYear: 1258, region: 'Cairo, North Africa', shortSummary: 'Founder of the Shadhiliyya, one of the most influential orders in North Africa.', biography: 'His teaching centered on integrating outer life with inner spiritual realization.', isFounder: true },
    { name: 'Jalal ad-Din Rumi', slug: 'jalal-ad-din-rumi', birthYear: 1207, deathYear: 1273, region: 'Konya, Anatolia', shortSummary: 'The poet of divine love whose Masnavi is called the "Quran in Persian".', biography: 'Founder of the Mevlevi Order. His poetry transcends boundaries and continues to inspire millions worldwide.', isFounder: true },
    { name: 'Haji Bektash Veli', slug: 'haji-bektash-veli', birthYear: 1209, deathYear: 1271, region: 'Anatolia', shortSummary: 'Founder of the Bektashi order, emphasizing love, tolerance, and syncretism.', biography: 'Haji Bektash Veli emphasized love, tolerance, and syncretism.', isFounder: true },
    { name: 'Ibn Sab\'in', slug: 'ibn-sabin', birthYear: 1217, deathYear: 1271, region: 'Al-Andalus', shortSummary: 'Radical philosopher-mystic who emphasized absolute unity.', biography: 'Ibn Sab\'in was a radical philosopher-mystic who emphasized absolute unity.', isFounder: false },
    // Medieval Masters (15)
    { name: 'Yunus Emre', slug: 'yunus-emre', birthYear: 1238, deathYear: 1320, region: 'Anatolia', shortSummary: 'Turkish folk poet who expressed profound mysticism in simple language.', biography: 'Yunus Emre expressed profound mysticism in simple Turkish language.', isFounder: false },
    { name: 'Nizamuddin Auliya', slug: 'nizamuddin-auliya', birthYear: 1238, deathYear: 1325, region: 'South Asia', shortSummary: 'The Beloved of God, Delhi\'s spiritual anchor who emphasized love over law.', biography: 'Nizamuddin Auliya emphasized love over law.', isFounder: false },
    { name: 'Amir Khusrau Dehlawi', slug: 'amir-khusrau-dehlawi', birthYear: 1253, deathYear: 1325, region: 'Delhi, South Asia', shortSummary: 'Disciple of Nizamuddin Auliya, renowned poet, musician, and credited inventor of the qawwali musical form.', biography: 'One of the greatest literary figures of the medieval Indic world.', isFounder: false },
    { name: 'Ibn Ata Allah al-Iskandari', slug: 'ibn-ata-allah-al-iskandari', birthYear: 1259, deathYear: 1309, region: 'Cairo, North Africa', shortSummary: 'Third master of the Shadhiliyya and author of the Hikam (Aphorisms).', biography: 'His Hikam is one of the most celebrated works of Sufi wisdom literature.', isFounder: false },
    { name: 'Mir Sayyid Ali Hamadani', slug: 'mir-sayyid-ali-hamadani', birthYear: 1314, deathYear: 1384, region: 'Kashmir, South Asia', shortSummary: 'Known as Shah-e-Hamadan, the great Kubrawiyya master who led 700 Sayyids from Central Asia to Kashmir.', biography: 'He transformed Kashmir into a center of Islamic civilization and Sufi culture.', isFounder: false },
    { name: 'Hafiz Shirazi', slug: 'hafiz-shirazi', birthYear: 1315, deathYear: 1390, region: 'Shiraz, Persia & Greater Iran', shortSummary: 'The supreme lyric poet of the Persian Sufi tradition.', biography: 'His Diwan is the most widely read Persian poetry collection, used for divination.', isFounder: false },
    { name: 'Bahauddin Naqshband', slug: 'bahauddin-naqshband', birthYear: 1318, deathYear: 1389, region: 'Bukhara, Central Asia', shortSummary: 'Founder of the Naqshbandi order, emphasizing silent dhikr and integration with society.', biography: 'Bahauddin Naqshband emphasized silent dhikr and integration with society.', isFounder: true },
    { name: 'Shah Nimatullah Wali', slug: 'shah-nimatullah-wali', birthYear: 1330, deathYear: 1431, region: 'Persia & Greater Iran', shortSummary: 'Founder of the Nimatullahi order, poet and spiritual guide.', biography: 'Shah Nimatullah Wali was a poet and spiritual guide.', isFounder: true },
    { name: 'Sheikh Nooruddin Noorani', slug: 'sheikh-nooruddin-noorani', birthYear: 1377, deathYear: 1440, region: 'Kashmir, South Asia', shortSummary: 'Nund Rishi (Alamdar-e-Kashmir) — patron saint of Kashmir and founder of the Rishi Order.', biography: 'His Kashmiri shrukhs are the oldest literary Kashmiri poetry.', isFounder: false },
    { name: 'Ubaydullah Ahrar', slug: 'ubaydullah-ahrar', birthYear: 1404, deathYear: 1490, region: 'Central Asia', shortSummary: 'Leading Naqshbandi master who combined spiritual authority with social influence.', biography: 'Ubaydullah Ahrar combined spiritual authority with social influence.', isFounder: false },
    { name: 'Makhdum A\'zam Dahbidi', slug: 'makhdum-aazam-dahbidi', birthYear: 1461, deathYear: 1541, region: 'Central Asia', shortSummary: 'Naqshbandi-Ahrari master who spread the order to South Asia.', biography: 'Makhdum A\'zam Dahbidi spread the order to South Asia.', isFounder: false },
    { name: 'Aziz Mahmud Hudayi', slug: 'aziz-mahmud-hudayi', birthYear: 1541, deathYear: 1628, region: 'Ottoman World', shortSummary: 'Ottoman scholar-saint who balanced orthodox scholarship with Sufi practice.', biography: 'Aziz Mahmud Hudayi balanced orthodox scholarship with Sufi practice.', isFounder: false },
    { name: 'Ahmad Sirhindi', slug: 'ahmad-sirhindi', birthYear: 1564, deathYear: 1624, region: 'South Asia', shortSummary: 'The Renewer of the Second Millennium who critiqued monistic interpretations.', biography: 'Ahmad Sirhindi critiqued monistic interpretations.', isFounder: false },
    { name: 'Niyazi Misri', slug: 'niyazi-misri', birthYear: 1618, deathYear: 1694, region: 'Ottoman World', shortSummary: 'Controversial Ottoman poet-mystic known for antinomian expressions.', biography: 'Niyazi Misri was known for antinomian expressions.', isFounder: false },
    { name: 'Bulleh Shah', slug: 'bulleh-shah', birthYear: 1680, deathYear: 1757, region: 'South Asia', shortSummary: 'Punjabi Sufi poet who challenged religious orthodoxy and social hierarchies.', biography: 'Bulleh Shah challenged religious orthodoxy and social hierarchies.', isFounder: false },
    // Modern Era (8)
    { name: 'Shah Waliullah Dehlawi', slug: 'shah-waliullah-dehlawi', birthYear: 1703, deathYear: 1762, region: 'South Asia', shortSummary: 'Reformist scholar-mystic who synthesized law, theology, and Sufism.', biography: 'Shah Waliullah Dehlawi synthesized law, theology, and Sufism.', isFounder: false },
    { name: 'Sidi Ahmad al-Tijani', slug: 'sidi-ahmad-al-tijani', birthYear: 1737, deathYear: 1815, region: 'Fez, North Africa', shortSummary: 'Founder of the Tijaniyya order in Fez, one of the most widespread orders in West Africa.', biography: 'He claimed to have received his spiritual chain directly from the Prophet in a waking vision.', isFounder: true },
    { name: 'Mawlana Khalid al-Baghdadi', slug: 'mawlana-khalid-al-baghdadi', birthYear: 1779, deathYear: 1827, region: 'Levant', shortSummary: 'Founder of the Khalidiyya branch of the Naqshbandiyya, which became dominant in the Ottoman world.', biography: 'His order remains influential across Turkey, the Levant, and the Caucasus.', isFounder: false },
    { name: 'Muhammad ibn Ali al-Sanusi', slug: 'muhammad-ibn-ali-al-sanusi', birthYear: 1787, deathYear: 1859, region: 'North Africa', shortSummary: 'Founder of the Sanusiyya order in Libya, combining return to Quran and Hadith with the Sufi path.', biography: 'His order became a major political and religious force across North Africa and the Sahara.', isFounder: true },
    { name: 'Waris Ali Shah', slug: 'waris-ali-shah', birthYear: 1817, deathYear: 1905, region: 'South Asia', shortSummary: 'The wandering mystic who transcended religious boundaries.', biography: 'Waris Ali Shah transcended religious boundaries.', isFounder: false },
    { name: 'Khwaja Ghulam Farid', slug: 'khwaja-ghulam-farid', birthYear: 1845, deathYear: 1901, region: 'Multan, South Asia', shortSummary: 'The great Seraiki Sufi poet of the Punjab whose kafi verses are among the finest expressions of divine longing.', biography: 'His kafi verses are among the finest expressions of divine longing in South Asian literature.', isFounder: false },
    { name: 'Hazrat Inayat Khan', slug: 'hazrat-inayat-khan', birthYear: 1882, deathYear: 1927, region: 'South Asia', shortSummary: 'The first Sufi teacher to bring the Chishti path to the West.', biography: 'He founded the Sufi Order International and introduced Sufi music, zikr, and inner development teachings to Europe and America.', isFounder: false },
    { name: 'Ibn Barrajan', slug: 'ibn-barrajan', birthYear: null, deathYear: 1141, region: 'Al-Andalus', shortSummary: 'Andalusian mystic known for Quranic commentary emphasizing inner meanings.', biography: 'Ibn Barrajan was known for Quranic commentary emphasizing inner meanings.', isFounder: false },
  ];

  for (const saint of saints) {
    await prisma.saint.upsert({
      where: { slug: saint.slug },
      update: saint,
      create: saint,
    });
  }
  console.log(`✅ ${saints.length} saints seeded`);

  // ============================================================================
  // 6. SAINT LINEAGES & THEMES (Relationships)
  // ============================================================================
  console.log('\nSeeding saint lineages and themes...');

  // Helper to get IDs
  const getLineage = async (slug: string) => {
    const l = await prisma.lineage.findUnique({ where: { slug } });
    return l?.id || null;
  };

  const getTheme = async (slug: string) => {
    const t = await prisma.theme.findUnique({ where: { slug } });
    return t?.id || null;
  };

  const getSaint = async (slug: string) => {
    const s = await prisma.saint.findUnique({ where: { slug } });
    return s?.id || null;
  };

  // Define saint-lineage relationships
  const saintLineages = [
    { saint: 'abu-bakr-al-siddiq', lineage: 'formative-sufi-era' },
    { saint: 'hasan-al-basri', lineage: 'formative-sufi-era' },
    { saint: 'rabia-al-adawiyya', lineage: 'formative-sufi-era' },
    { saint: 'hakim-al-tirmidhi', lineage: 'formative-sufi-era' },
    { saint: 'dhu-al-nun-al-misri', lineage: 'formative-sufi-era' },
    { saint: 'bayazid-bastami', lineage: 'formative-sufi-era' },
    { saint: 'junayd-al-baghdadi', lineage: 'formative-sufi-era' },
    { saint: 'mansur-al-hallaj', lineage: 'formative-sufi-era' },
    { saint: 'ibn-masarra', lineage: 'formative-sufi-era' },
    { saint: 'abd-al-qadir-al-jilani', lineage: 'qadiriyya' },
    { saint: 'abu-madyan', lineage: 'shadhiliyya' },
    { saint: 'ahmad-yasawi', lineage: 'yasawiyya' },
    { saint: 'ahmad-al-rifai', lineage: 'rifaiyya' },
    { saint: 'moinuddin-chishti', lineage: 'chishtiyya' },
    { saint: 'shihab-al-din-suhrawardi', lineage: 'suhrawardiyya' },
    { saint: 'fariduddin-attar', lineage: 'formative-sufi-era' },
    { saint: 'najmuddin-kubra', lineage: 'kubrawiyya' },
    { saint: 'bahauddin-zakariya', lineage: 'suhrawardiyya' },
    { saint: 'baba-farid-ganj-e-shakar', lineage: 'chishtiyya' },
    { saint: 'baba-farid-ganj-e-shakar', lineage: 'sabiriyya' },
    { saint: 'shams-of-tabriz', lineage: 'mevleviyya' },
    { saint: 'abu-al-hasan-al-shadhili', lineage: 'shadhiliyya' },
    { saint: 'jalal-ad-din-rumi', lineage: 'mevleviyya' },
    { saint: 'haji-bektash-veli', lineage: 'bektashiyya' },
    { saint: 'yunus-emre', lineage: 'bektashiyya' },
    { saint: 'nizamuddin-auliya', lineage: 'chishtiyya' },
    { saint: 'nizamuddin-auliya', lineage: 'nizamiyya' },
    { saint: 'amir-khusrau-dehlawi', lineage: 'chishtiyya' },
    { saint: 'amir-khusrau-dehlawi', lineage: 'nizamiyya' },
    { saint: 'ibn-ata-allah-al-iskandari', lineage: 'shadhiliyya' },
    { saint: 'mir-sayyid-ali-hamadani', lineage: 'kubrawiyya' },
    { saint: 'bahauddin-naqshband', lineage: 'naqshbandiyya' },
    { saint: 'sheikh-nooruddin-noorani', lineage: 'kubrawiyya' },
    { saint: 'ubaydullah-ahrar', lineage: 'naqshbandiyya' },
    { saint: 'makhdum-aazam-dahbidi', lineage: 'naqshbandiyya' },
    { saint: 'ahmad-sirhindi', lineage: 'naqshbandiyya' },
    { saint: 'ahmad-sirhindi', lineage: 'mujaddidiyya' },
    { saint: 'shah-waliullah-dehlawi', lineage: 'mujaddidiyya' },
    { saint: 'shah-waliullah-dehlawi', lineage: 'naqshbandiyya' },
    { saint: 'bulleh-shah', lineage: 'qadiriyya' },
    { saint: 'sidi-ahmad-al-tijani', lineage: 'tijaniyya' },
    { saint: 'mawlana-khalid-al-baghdadi', lineage: 'naqshbandiyya' },
    { saint: 'mawlana-khalid-al-baghdadi', lineage: 'khalidiyya' },
    { saint: 'muhammad-ibn-ali-al-sanusi', lineage: 'sanusiyya' },
    { saint: 'khwaja-ghulam-farid', lineage: 'qadiriyya' },
    { saint: 'hazrat-inayat-khan', lineage: 'chishtiyya' },
  ];

  for (const sl of saintLineages) {
    const saintId = await getSaint(sl.saint);
    const lineageId = await getLineage(sl.lineage);
    if (saintId && lineageId) {
      await prisma.saintLineage.upsert({
        where: { saintId_lineageId: { saintId, lineageId } },
        update: {},
        create: { saintId, lineageId },
      });
    }
  }

  // Define saint-theme relationships
  const saintThemes = [
    { saint: 'prophet-muhammad', themes: ['prophecy-revelation', 'silsila-lineage-transmission', 'divine-love-devotion'] },
    { saint: 'ali-ibn-abi-talib', themes: ['spiritual-authority-shaykhhood', 'ontology-metaphysics', 'divine-love-devotion'] },
    { saint: 'hasan-al-basri', themes: ['asceticism-renunciation', 'tazkiyah-purification'] },
    { saint: 'rabia-al-adawiyya', themes: ['divine-love-devotion', 'spiritual-transformation'] },
    { saint: 'junayd-al-baghdadi', themes: ['tazkiyah-purification', 'spiritual-psychology', 'jurisprudence-fiqh', 'nafs-selfhood'] },
    { saint: 'mansur-al-hallaj', themes: ['unity-of-being', 'divine-love-devotion', 'poetry-artistic-expression'] },
    { saint: 'dhu-al-nun-al-misri', themes: ['ontology-metaphysics', 'philosophy-mystical-thought', 'spiritual-transformation'] },
    { saint: 'abd-al-qadir-al-jilani', themes: ['spiritual-authority-shaykhhood', 'institutional-orders', 'wilayah-sainthood', 'jurisprudence-fiqh'] },
    { saint: 'moinuddin-chishti', themes: ['divine-love-devotion', 'sama-sacred-music', 'social-reform-justice'] },
    { saint: 'jalaluddin-rumi', themes: ['divine-love-devotion', 'poetry-artistic-expression', 'unity-of-being', 'sama-sacred-music'] },
    { saint: 'ibn-arabi', themes: ['unity-of-being', 'ontology-metaphysics', 'cosmology', 'wilayah-sainthood'] },
    { saint: 'baha-ud-din-naqshband', themes: ['silsila-lineage-transmission', 'contemplation-dhikr', 'institutional-orders'] },
    { saint: 'abu-al-hasan-al-shadhili', themes: ['institutional-orders', 'contemplation-dhikr', 'tazkiyah-purification'] },
    { saint: 'ahmad-yasawi', themes: ['poetry-artistic-expression', 'divine-love-devotion'] },
    { saint: 'al-ghazali', themes: ['tazkiyah-purification', 'jurisprudence-fiqh', 'education-knowledge-preservation'] },
    { saint: 'nizamuddin-auliya', themes: ['divine-love-devotion', 'social-reform-justice'] },
    { saint: 'ahmad-sirhindi', themes: ['reform-renewal', 'jurisprudence-fiqh', 'institutional-orders'] },
    { saint: 'sidi-ahmad-al-tijani', themes: ['institutional-orders', 'silsila-lineage-transmission'] },
    { saint: 'muhammad-ibn-ali-al-sanusi', themes: ['reform-renewal', 'education-knowledge-preservation'] },
    { saint: 'haji-bektash-veli', themes: ['institutional-orders', 'interfaith-dialogue'] },
  ];

  for (const st of saintThemes) {
    const saintId = await getSaint(st.saint);
    if (saintId) {
      for (const themeSlug of st.themes) {
        const themeId = await getTheme(themeSlug);
        if (themeId) {
          await prisma.saintTheme.upsert({
            where: { saintId_themeId: { saintId, themeId } },
            update: {},
            create: { saintId, themeId },
          });
        }
      }
    }
  }

  console.log(`✅ ${saintLineages.length} saint-lineage relationships seeded`);
  console.log(`✅ ${saintThemes.length} saint-theme relationships seeded`);

  // ============================================================================
  // ASSESSMENTS
  // ============================================================================
  console.log('\nSeeding assessments...');
  await prisma.assessment.deleteMany({});
  await prisma.assessmentQuestion.deleteMany({});

  // Create beginner assessment
  const beginnerAssessment = await prisma.assessment.create({
    data: {
      slug: 'multi-dimensional-development',
      title: 'Multi-Dimensional Development Assessment',
      description: 'A comprehensive evaluation covering cognitive patterns, emotional intelligence, contemplative capacity, and transformative readiness.',
      version: 1,
      isActive: true,
    },
  });

  const beginnerQuestions = [
    { dimension: 'cognitive_patterns', questionText: 'How would you describe your primary approach to understanding reality? Rate your alignment with contemplative and intuitive methods of knowing.', weight: 1.0, orderIndex: 1 },
    { dimension: 'cognitive_patterns', questionText: 'Rate your comfort level with exploring ideas that fundamentally challenge your core beliefs and worldview.', weight: 1.0, orderIndex: 2 },
    { dimension: 'cognitive_patterns', questionText: 'How frequently do you engage in deep self-reflection and examination of your thought patterns and assumptions?', weight: 1.0, orderIndex: 3 },
    { dimension: 'emotional_intelligence', questionText: 'Rate your ability to identify and name specific emotions as they arise in real-time.', weight: 1.0, orderIndex: 4 },
    { dimension: 'emotional_intelligence', questionText: 'When faced with intense emotions, how effectively can you observe them without being overwhelmed or suppressing them?', weight: 1.0, orderIndex: 5 },
    { dimension: 'emotional_intelligence', questionText: 'Rate your capacity to genuinely empathize with perspectives that are very different from your own.', weight: 1.0, orderIndex: 6 },
    { dimension: 'contemplative_capacity', questionText: 'Rate your current level of meditation or contemplative practice experience and consistency.', weight: 1.0, orderIndex: 7 },
    { dimension: 'contemplative_capacity', questionText: 'How frequently have you experienced states of deep inner stillness, expanded awareness, or transcendent consciousness?', weight: 1.0, orderIndex: 8 },
    { dimension: 'contemplative_capacity', questionText: 'Rate your ability to remain present, centered, and non-reactive during challenging or stressful situations.', weight: 1.0, orderIndex: 9 },
    { dimension: 'transformative_readiness', questionText: 'How committed are you to personal transformation, even if it requires significant changes to your life, relationships, or identity?', weight: 1.0, orderIndex: 10 },
    { dimension: 'transformative_readiness', questionText: 'Rate the availability of time, space, and resources in your life for engaging in deep developmental and spiritual work.', weight: 1.0, orderIndex: 11 },
    { dimension: 'transformative_readiness', questionText: 'Rate your openness to guidance, teachings, and learning from spiritual traditions and experienced teachers.', weight: 1.0, orderIndex: 12 },
  ];

  for (const q of beginnerQuestions) {
    await prisma.assessmentQuestion.create({
      data: { ...q, assessmentId: beginnerAssessment.id },
    });
  }

  // Create teaching assessment
  const teachingAssessment = await prisma.assessment.create({
    data: {
      slug: 'teaching-path-evaluation',
      title: 'Personalized Teaching Path Assessment',
      description: 'Evaluate your spiritual teaching capacity through an integrated Sufi-scientific framework. This assessment examines doctrinal grounding, psychological maturity, ethical responsibility, transmission capacity, and interfaith literacy.',
      version: 1,
      isActive: true,
    },
  });

  const teachingQuestions = [
    // Doctrinal Grounding (5)
    { dimension: 'doctrinal_grounding', questionText: 'Rate your depth of knowledge in core Islamic theology, including tawhid, attributes of Allah, and prophetic teachings.', weight: 1.0, orderIndex: 1 },
    { dimension: 'doctrinal_grounding', questionText: 'How well do you understand the metaphysical foundations of Sufism, including concepts of fana, baqa, and spiritual stations?', weight: 1.0, orderIndex: 2 },
    { dimension: 'doctrinal_grounding', questionText: 'Rate your familiarity with the textual sources of Islamic spirituality, including Quran, Hadith, and classical Sufi texts.', weight: 1.0, orderIndex: 3 },
    { dimension: 'doctrinal_grounding', questionText: 'How confident are you in distinguishing authentic spiritual teachings from cultural accretions or contemporary distortions?', weight: 1.0, orderIndex: 4 },
    { dimension: 'doctrinal_grounding', questionText: 'Rate your understanding of different schools of Islamic jurisprudence and their relationship to spiritual practice.', weight: 1.0, orderIndex: 5 },
    // Psychological Maturity (5)
    { dimension: 'psychological_maturity', questionText: 'How stable is your ego structure when receiving criticism or challenges to your spiritual understanding?', weight: 1.0, orderIndex: 6 },
    { dimension: 'psychological_maturity', questionText: 'Rate your awareness of your own psychological projections, shadow material, and unconscious motivations.', weight: 1.0, orderIndex: 7 },
    { dimension: 'psychological_maturity', questionText: 'How comfortable are you holding spiritual authority without it inflating your sense of self-importance?', weight: 1.0, orderIndex: 8 },
    { dimension: 'psychological_maturity', questionText: 'Rate your capacity to navigate interpersonal conflicts with wisdom, compassion, and emotional regulation.', weight: 1.0, orderIndex: 9 },
    { dimension: 'psychological_maturity', questionText: 'How effectively can you distinguish your personal preferences from universal spiritual principles when guiding others?', weight: 1.0, orderIndex: 10 },
    // Ethical Responsibility (5)
    { dimension: 'ethical_responsibility', questionText: 'Rate your understanding of the ethical responsibilities and potential abuses of spiritual authority.', weight: 1.0, orderIndex: 11 },
    { dimension: 'ethical_responsibility', questionText: 'How committed are you to maintaining strict confidentiality and appropriate boundaries in student-teacher relationships?', weight: 1.0, orderIndex: 12 },
    { dimension: 'ethical_responsibility', questionText: 'Rate your orientation toward financial transparency and avoiding exploitation in spiritual teaching contexts.', weight: 1.0, orderIndex: 13 },
    { dimension: 'ethical_responsibility', questionText: 'How aware are you of power dynamics and the potential for causing harm when occupying a teaching role?', weight: 1.0, orderIndex: 14 },
    { dimension: 'ethical_responsibility', questionText: 'Rate your commitment to continuous self-examination and accountability in your role as a potential teacher.', weight: 1.0, orderIndex: 15 },
    // Transmission Capacity (5)
    { dimension: 'transmission_capacity', questionText: 'Rate your ability to communicate complex spiritual concepts in clear, accessible language appropriate to different audiences.', weight: 1.0, orderIndex: 16 },
    { dimension: 'transmission_capacity', questionText: 'How effectively can you diagnose a student\'s current developmental stage and offer appropriate guidance?', weight: 1.0, orderIndex: 17 },
    { dimension: 'transmission_capacity', questionText: 'Rate your pedagogical skill in designing learning experiences that facilitate genuine transformation.', weight: 1.0, orderIndex: 18 },
    { dimension: 'transmission_capacity', questionText: 'How capable are you of adapting traditional teachings to contemporary contexts without compromising their essential wisdom?', weight: 1.0, orderIndex: 19 },
    { dimension: 'transmission_capacity', questionText: 'Rate your cross-cultural literacy and ability to work effectively with students from diverse backgrounds.', weight: 1.0, orderIndex: 20 },
    // Interfaith Literacy (5)
    { dimension: 'interfaith_literacy', questionText: 'Rate your knowledge of the core scriptures and teachings of major world religious traditions beyond Islam.', weight: 1.0, orderIndex: 21 },
    { dimension: 'interfaith_literacy', questionText: 'How well do you understand the historical and civilizational contexts that shaped different spiritual traditions?', weight: 1.0, orderIndex: 22 },
    { dimension: 'interfaith_literacy', questionText: 'Rate your ability to identify universal spiritual principles across diverse religious and philosophical systems.', weight: 1.0, orderIndex: 23 },
    { dimension: 'interfaith_literacy', questionText: 'How comfortable are you engaging in respectful dialogue with practitioners and scholars of other faith traditions?', weight: 1.0, orderIndex: 24 },
    { dimension: 'interfaith_literacy', questionText: 'Rate your understanding of contemporary interfaith challenges and opportunities for spiritual cooperation.', weight: 1.0, orderIndex: 25 },
  ];

  for (const q of teachingQuestions) {
    await prisma.assessmentQuestion.create({
      data: { ...q, assessmentId: teachingAssessment.id },
    });
  }

  console.log(`✅ 2 assessments seeded (beginner + teaching)`);

  // ============================================================================
  // DIALOGUE SERIES
  // ============================================================================
  console.log('\nSeeding dialogue series...');
  await prisma.dialogue.deleteMany({});

  const dialogueSeries = [
    // Original 4 Featured Series
    {
      slug: 'consciousness-complexity-2024',
      title: 'Consciousness & Complexity',
      subtitle: 'Exploring Emergence, Awareness, and the Hard Problem',
      description: 'A four-part exploration of how consciousness emerges from complex systems, the relationship between subjective experience and physical processes, and the philosophical challenges of explaining awareness. Featuring perspectives from neuroscience, physics, contemplative traditions, and philosophy of mind.',
      type: 'exploration',
      host: 'Dr. Sarah Chen, Sheikh Ahmad al-Hakim, Prof. James Morrison',
      isPublished: true,
      publishedAt: new Date('2024-10-01'),
      viewCount: 0,
      difficultyLevel: 'advanced',
      totalEpisodes: 4,
      totalDurationMinutes: 324,
      participants: ['Dr. Sarah Chen', 'Sheikh Ahmad al-Hakim', 'Prof. James Morrison'],
      isFeatured: true,
    },
    {
      slug: 'energy-information-transformation-2023',
      title: 'Energy, Information & Transformation',
      subtitle: 'Subtle Energies, Information Theory, and Spiritual Practice',
      description: 'A six-part investigation into energetic frameworks across wisdom traditions and their potential relationship to information theory, thermodynamics, and transformation. We examine practices involving breath, attention, and subtle perception through multiple lenses.',
      type: 'exploration',
      host: 'Dr. Leila Rahman, Prof. Michael Torres, Imam Rashid ibn Ali',
      isPublished: true,
      publishedAt: new Date('2023-08-01'),
      viewCount: 0,
      difficultyLevel: 'intermediate',
      totalEpisodes: 6,
      totalDurationMinutes: 432,
      participants: ['Dr. Leila Rahman', 'Prof. Michael Torres', 'Imam Rashid ibn Ali'],
      isFeatured: true,
    },
    {
      slug: 'ethics-inner-development-2023',
      title: 'Ethics of Inner Development',
      subtitle: 'Moral Frameworks Emerging from Contemplative Practice',
      description: 'A five-part examination of how ethical frameworks emerge from and are transformed by contemplative practice. We explore virtue ethics, deontology, consequentialism, and care ethics through the lens of inner development.',
      type: 'exploration',
      host: 'Dr. Jennifer Wu, Sheikh Omar Farid, Prof. David Klein',
      isPublished: true,
      publishedAt: new Date('2023-06-01'),
      viewCount: 0,
      difficultyLevel: 'intermediate',
      totalEpisodes: 5,
      totalDurationMinutes: 340,
      participants: ['Dr. Jennifer Wu', 'Sheikh Omar Farid', 'Prof. David Klein'],
      isFeatured: true,
    },
    {
      slug: 'sacred-geometry-cosmology-2024',
      title: 'Sacred Geometry and Cosmology',
      subtitle: 'Pattern, Proportion, and the Architecture of Reality',
      description: 'Exploring geometric patterns in nature, art, and consciousness. We investigate whether sacred geometry reveals objective truths about reality or represents meaningful symbolic frameworks for human understanding.',
      type: 'exploration',
      host: 'Dr. Nader Ardalan, Prof. Keith Critchlow',
      isPublished: true,
      publishedAt: new Date('2024-11-01'),
      viewCount: 0,
      difficultyLevel: 'intermediate',
      totalEpisodes: 5,
      totalDurationMinutes: 300,
      participants: ['Dr. Nader Ardalan', 'Prof. Keith Critchlow'],
      isFeatured: false,
    },
    // Beginner Series (4)
    {
      slug: 'attention-awareness-practice-2026',
      title: 'Attention, Awareness, and Daily Practice',
      subtitle: 'How Contemplative Practice Shapes Presence and Perception',
      description: 'An introductory dialogue series exploring attention, awareness, and the role of simple contemplative practices in daily life. Through accessible conversation, we examine focus, distraction, reflective presence, and the ways inner practice may influence how people perceive themselves and the world.',
      type: 'exploration',
      host: 'Dr. Amina Hassan, Omar Farid',
      isPublished: true,
      publishedAt: new Date('2026-02-01'),
      viewCount: 0,
      difficultyLevel: 'beginner',
      totalEpisodes: 4,
      totalDurationMinutes: 240,
      participants: ['Dr. Amina Hassan', 'Omar Farid'],
      isFeatured: true,
    },
    {
      slug: 'what-is-inner-development-2025',
      title: 'What Is Inner Development',
      subtitle: 'Foundational Questions in Growth, Reflection, and Self-Knowledge',
      description: 'A beginner-friendly exploration of what inner development means across contemplative and psychological frameworks. This series introduces key ideas such as self-awareness, ethical growth, reflection, discipline, and the difference between information, insight, and transformation.',
      type: 'exploration',
      host: 'Prof. Sarah Chen, Shaykha Maryam',
      isPublished: true,
      publishedAt: new Date('2025-11-01'),
      viewCount: 0,
      difficultyLevel: 'beginner',
      totalEpisodes: 5,
      totalDurationMinutes: 300,
      participants: ['Prof. Sarah Chen', 'Shaykha Maryam'],
      isFeatured: true,
    },
    {
      slug: 'silence-reflection-human-mind-2025',
      title: 'Silence, Reflection, and the Human Mind',
      subtitle: 'Introductory Conversations on Stillness, Thought, and Inner Clarity',
      description: 'This series explores silence and reflection as human experiences rather than abstract ideals. Participants are introduced to the relationship between thought, emotional noise, contemplative pause, and the search for clarity through simple reflective practice and guided inquiry.',
      type: 'exploration',
      host: 'Dr. Layla Qasim, Ustadh Ibrahim',
      isPublished: true,
      publishedAt: new Date('2025-12-01'),
      viewCount: 0,
      difficultyLevel: 'beginner',
      totalEpisodes: 4,
      totalDurationMinutes: 240,
      participants: ['Dr. Layla Qasim', 'Ustadh Ibrahim'],
      isFeatured: false,
    },
    {
      slug: 'science-spirituality-meaning-2026',
      title: 'Science, Spirituality, and the Search for Meaning',
      subtitle: 'A Gentle Introduction to Two Ways of Asking Big Questions',
      description: 'An accessible entry-level series introducing how scientific and contemplative traditions ask different kinds of questions about meaning, consciousness, reality, and human purpose. The conversations focus on clarity, distinction, and thoughtful comparison rather than forced conclusions.',
      type: 'exploration',
      host: 'Prof. James Morrison, Sheikh Ahmad',
      isPublished: true,
      publishedAt: new Date('2026-01-01'),
      viewCount: 0,
      difficultyLevel: 'beginner',
      totalEpisodes: 6,
      totalDurationMinutes: 360,
      participants: ['Prof. James Morrison', 'Sheikh Ahmad'],
      isFeatured: false,
    },
    // Advanced Series (3)
    {
      slug: 'metaphysics-causality-contemplative-2026',
      title: 'Metaphysics, Causality, and Contemplative Knowledge',
      subtitle: 'Examining Reality, Agency, and Knowing Across Philosophical and Spiritual Frameworks',
      description: 'A high-level dialogue series exploring causality, ontological hierarchy, metaphysical dependence, and the place of contemplative knowledge within broader philosophical inquiry. The series brings classical metaphysical thought into conversation with scientific models of explanation, limitation, and reality.',
      type: 'exploration',
      host: 'Prof. David Klein, Dr. Nader Ardalan',
      isPublished: true,
      publishedAt: new Date('2026-02-01'),
      viewCount: 0,
      difficultyLevel: 'advanced',
      totalEpisodes: 6,
      totalDurationMinutes: 360,
      participants: ['Prof. David Klein', 'Dr. Nader Ardalan'],
      isFeatured: true,
    },
    {
      slug: 'consciousness-beyond-reductionism-2025',
      title: 'Consciousness Beyond Reductionism',
      subtitle: 'Phenomenology, Subjectivity, and the Limits of Material Explanation',
      description: 'This advanced series investigates major debates around consciousness, including hard problem discussions, first-person experience, phenomenology, and critiques of strict materialist models. Dialogues examine where scientific explanation clarifies human awareness and where deeper philosophical or contemplative frameworks remain necessary.',
      type: 'exploration',
      host: 'Dr. Sarah Chen, Prof. James Morrison',
      isPublished: true,
      publishedAt: new Date('2025-11-01'),
      viewCount: 0,
      difficultyLevel: 'advanced',
      totalEpisodes: 5,
      totalDurationMinutes: 300,
      participants: ['Dr. Sarah Chen', 'Prof. James Morrison'],
      isFeatured: true,
    },
    {
      slug: 'epistemology-inner-states-2026',
      title: 'Epistemology of Inner States',
      subtitle: 'Verification, Interpretation, and the Disciplined Study of Contemplative Experience',
      description: 'A rigorous inquiry into how inner states are known, described, evaluated, and interpreted across contemplative traditions and modern intellectual frameworks. The series examines verification, self-report limitations, symbolic language, experiential authority, and the challenge of maintaining epistemic clarity in consciousness research.',
      type: 'exploration',
      host: 'Dr. Amina Hassan, Prof. Keith Critchlow',
      isPublished: true,
      publishedAt: new Date('2026-03-01'),
      viewCount: 0,
      difficultyLevel: 'advanced',
      totalEpisodes: 6,
      totalDurationMinutes: 360,
      participants: ['Dr. Amina Hassan', 'Prof. Keith Critchlow'],
      isFeatured: false,
    },
    // Intermediate Series (2)
    {
      slug: 'breath-regulation-inner-balance-2025',
      title: 'Breath, Regulation, and Inner Balance',
      subtitle: 'Contemplative Breathing, Nervous System Regulation, and Spiritual Discipline',
      description: 'A focused dialogue series exploring the role of breath across contemplative practice, emotional regulation, and embodied awareness. The discussions examine classical breathing disciplines alongside psychological and physiological perspectives on balance, attention, and inner steadiness.',
      type: 'exploration',
      host: 'Dr. Leila Rahman, Ustadh Ibrahim',
      isPublished: true,
      publishedAt: new Date('2025-09-01'),
      viewCount: 0,
      difficultyLevel: 'intermediate',
      totalEpisodes: 4,
      totalDurationMinutes: 240,
      participants: ['Dr. Leila Rahman', 'Ustadh Ibrahim'],
      isFeatured: false,
    },
    {
      slug: 'symbol-meaning-inner-perception-2025',
      title: 'Symbol, Meaning, and Inner Perception',
      subtitle: 'How Contemplative Traditions Read Image, Metaphor, and Experience',
      description: 'This series examines how symbols, metaphors, and inner imagery function within contemplative traditions and human interpretation. We explore symbolic language in spiritual teaching, the psychology of meaning-making, and the relationship between inner perception and disciplined understanding.',
      type: 'exploration',
      host: 'Sheikh Omar Farid, Dr. Jennifer Wu',
      isPublished: true,
      publishedAt: new Date('2025-12-01'),
      viewCount: 0,
      difficultyLevel: 'intermediate',
      totalEpisodes: 5,
      totalDurationMinutes: 300,
      participants: ['Sheikh Omar Farid', 'Dr. Jennifer Wu'],
      isFeatured: false,
    },
  ];

  for (const s of dialogueSeries) {
    await prisma.dialogue.create({ data: s });
  }
  console.log(`✅ ${dialogueSeries.length} dialogue series seeded`);

  // ============================================================================
  // EPISODES
  // ============================================================================
  console.log('\nSeeding episodes...');
  await prisma.episode.deleteMany({});

  const getSeriesId = async (slug: string) => {
    const series = await prisma.dialogue.findUnique({ where: { slug } });
    return series?.id || null;
  };

  const episodes = [
    // Consciousness & Complexity (4 episodes)
    { seriesSlug: 'consciousness-complexity-2024', episodeNumber: 1, slug: 'foundations-of-consciousness', title: 'Foundations of Consciousness Studies', description: 'We begin by establishing a shared vocabulary and examining different frameworks for understanding consciousness.', durationMinutes: 75, keyQuestions: ['What do we mean by consciousness versus awareness?', 'Can subjective experience be fully reduced to neural activity?'], keyInsights: ['Multiple viable frameworks exist, each capturing different aspects of consciousness', 'The hard problem persists across most materialist frameworks'], participants: ['Dr. Sarah Chen', 'Sheikh Ahmad al-Hakim', 'Prof. James Morrison'], transcript: '[Opening Remarks - Prof. Morrison]\n\nThank you all for joining us for this inaugural dialogue on consciousness and complexity.\n\n[Dr. Chen]\n\nI appreciate that framing. From a neuroscience perspective, I want to start by distinguishing between what we can measure and what we can explain.\n\n[Sheikh Ahmad]\n\nThis distinction resonates with classical Islamic philosophy. Ibn Sina distinguished between knowing that something is the case and knowing why it is the case.' },
    { seriesSlug: 'consciousness-complexity-2024', episodeNumber: 2, slug: 'emergence-and-complexity', title: 'Emergence and Levels of Organization', description: 'Examining how complex phenomena arise from simpler components.', durationMinutes: 82, keyQuestions: ['What distinguishes weak emergence from strong emergence?', 'Can consciousness emerge from non-conscious components?'], keyInsights: ['Emergence is well-established in physical and biological systems', 'The explanatory gap remains between neural processes and subjective experience'], participants: ['Dr. Sarah Chen', 'Sheikh Ahmad al-Hakim', 'Prof. James Morrison'], transcript: '[Opening - Prof. Morrison]\n\nWelcome back. Today we\'re exploring emergence—how complex phenomena arise from simpler components.\n\n[Dr. Chen]\n\nLet me start with the standard distinction between weak and strong emergence. Weak emergence describes phenomena that are theoretically reducible to their components but practically impossible to predict. Weather patterns, for example.\n\n[Sheikh Ahmad]\n\nIn Islamic philosophy, we have a related concept: "huduth"—coming into being. When simple elements combine, something genuinely new can arise that wasn\'t present in the components.\n\n[Prof. Morrison]\n\nLet\'s test this with examples. Consider the flocking behavior of birds. Individual birds follow simple rules, but from these rules, complex patterns emerge.\n\n[Closing Remarks]\n\nThank you all. The question of whether consciousness is like flocking or something fundamentally different remains open.' },
    { seriesSlug: 'consciousness-complexity-2024', episodeNumber: 3, slug: 'phenomenology-and-experience', title: 'Phenomenology of Awareness', description: 'Deep dive into the structure of conscious experience itself.', durationMinutes: 88, keyQuestions: ['What is the relationship between awareness and its contents?', 'Can we investigate consciousness using consciousness itself?'], keyInsights: ['Awareness has a dual structure: knowing and known', 'Contemplative training systematically develops observational precision'], participants: ['Dr. Sarah Chen', 'Sheikh Ahmad al-Hakim', 'Prof. James Morrison'], transcript: '[Opening - Sheikh Ahmad]\n\nIn our previous dialogues, we\'ve discussed consciousness from the outside. Today, let\'s examine consciousness from within.\n\n[Dr. Chen]\n\nI appreciate this shift, though I confess some nervousness. As a neuroscientist, I\'m trained to distrust introspection. We know people are often wrong about their own mental processes.\n\n[Sheikh Ahmad]\n\nBy making the process of observation itself precise. In Sufi practice, we train what we call "muraqaba"—vigilant awareness.\n\n[Prof. Morrison]\n\nWestern phenomenology attempts something similar. The phenomenological reduction—bracketing our assumptions to examine experience itself.\n\n[Closing]\n\nThank you. The convergence between first-person reports and third-person measurements is fascinating.' },
    { seriesSlug: 'consciousness-complexity-2024', episodeNumber: 4, slug: 'integration-and-future-directions', title: 'Integrated Framework and Future Research', description: 'Synthesizing insights from our exploration.', durationMinutes: 79, keyQuestions: ['Can we develop rigorous methods for first-person investigation?', 'How might different traditions collaborate productively?'], keyInsights: ['Neurophenomenology offers a promising integrative framework', 'Consciousness research has implications for ethics, medicine, and human development'], participants: ['Dr. Sarah Chen', 'Sheikh Ahmad al-Hakim', 'Prof. James Morrison'], transcript: '[Opening - Prof. Morrison]\n\nThis is our final dialogue in this series. We\'ve explored the hard problem, examined emergence, and engaged in phenomenological inquiry.\n\n[Dr. Chen]\n\nI\'ve been reflecting on what I\'ve learned. I still believe neuroscience is essential, but I\'m now convinced it\'s not sufficient.\n\n[Sheikh Ahmad]\n\nThis resonates with Islamic epistemology, which recognizes multiple valid sources of knowledge: sense perception, reason, transmitted wisdom, and direct unveiling.\n\n[Prof. Morrison]\n\nFrancisco Varela\'s neurophenomenology seems relevant here. Using first-person phenomenology to guide neuroscientific investigation.\n\n[Closing]\n\nThank you all for this remarkable journey. The integration of contemplative and scientific approaches is not only possible but necessary.' },

    // Energy, Information & Transformation (6 episodes)
    { seriesSlug: 'energy-information-transformation-2023', episodeNumber: 1, slug: 'energetic-frameworks-across-traditions', title: 'Energetic Frameworks Across Traditions', description: 'Survey of how different spiritual traditions conceptualize and work with subtle energy.', durationMinutes: 72, keyQuestions: ['Are energetic experiences universal across cultures?', 'What is the relationship between energy and information?'], keyInsights: ['Remarkably consistent phenomenological reports across traditions', 'Energy may be related to information, attention, and intentionality'], participants: ['Dr. Leila Rahman', 'Prof. Michael Torres', 'Imam Rashid ibn Ali'], transcript: '[Opening - Dr. Rahman]\n\nEnergy is perhaps one of the most evocative yet poorly defined concepts in spiritual discourse. Every tradition speaks of it: prana in Sanskrit, qi in Chinese, ruh and baraka in Arabic.\n\n[Prof. Torres]\n\nAs a physicist, I need to be careful here. In physics, energy has a precise definition: the capacity to do work. When spiritual traditions speak of "energy," they seem to mean something different.\n\n[Imam Rashid]\n\nIn Islamic tradition, "ruh" is sometimes translated as "spirit" or "breath." It\'s intimately connected with consciousness and life itself. The Quran speaks of God breathing ruh into Adam.\n\n[Dr. Rahman]\n\nFrom comparative religion, what\'s striking is the consistency across traditions. All speak of subtle energies that can be cultivated through practice.\n\n[Prof. Torres]\n\nPerhaps there are aspects of human physiology we don\'t yet fully understand. Just as we discovered the electromagnetic spectrum beyond visible light, there might be subtle physiological processes not yet captured by our instruments.' },
    { seriesSlug: 'energy-information-transformation-2023', episodeNumber: 2, slug: 'thermodynamics-and-spiritual-practice', title: 'Thermodynamics and Spiritual Practice', description: 'Exploring the relationship between energy dissipation and contemplative disciplines.', durationMinutes: 78, keyQuestions: ['How does spiritual practice affect energy metabolism?', 'Is there a thermodynamic cost to sustained attention?'], keyInsights: ['Meditation affects metabolic rate measurably', 'Sustained contemplative practice shows unique energy signatures'], participants: ['Dr. Leila Rahman', 'Prof. Michael Torres', 'Imam Rashid ibn Ali'] },
    { seriesSlug: 'energy-information-transformation-2023', episodeNumber: 3, slug: 'information-theory-consciousness', title: 'Information Theory and Consciousness', description: 'Can information-theoretic frameworks explain subjective experience?', durationMinutes: 85, keyQuestions: ['Is consciousness an information process?', 'What does integrated information theory tell us about awareness?'], keyInsights: ['IIT provides mathematical framework but not phenomenological account', 'Information and consciousness may be complementary perspectives'], participants: ['Dr. Leila Rahman', 'Prof. Michael Torres', 'Imam Rashid ibn Ali'] },
    { seriesSlug: 'energy-information-transformation-2023', episodeNumber: 4, slug: 'breath-attention-subtle-perception', title: 'Breath, Attention, and Subtle Perception', description: 'The role of breathwork in modulating consciousness and perception.', durationMinutes: 70, keyQuestions: ['How does breath modulation affect states of consciousness?', 'What is the relationship between respiratory rhythm and attention?'], keyInsights: ['Breath practices consistently alter autonomic and cortical activity', 'Different traditions converge on similar breathing techniques'], participants: ['Dr. Leila Rahman', 'Prof. Michael Torres', 'Imam Rashid ibn Ali'] },
    { seriesSlug: 'energy-information-transformation-2023', episodeNumber: 5, slug: 'energy-healing-traditions', title: 'Energy in Healing Traditions', description: 'Cross-cultural examination of energy-based healing practices.', durationMinutes: 68, keyQuestions: ['What mechanisms underlie energy healing claims?', 'Can we distinguish placebo from genuine energetic effects?'], keyInsights: ['Context and expectation are powerful healing forces', 'Some practices show effects beyond placebo in controlled studies'], participants: ['Dr. Leila Rahman', 'Prof. Michael Torres', 'Imam Rashid ibn Ali'] },
    { seriesSlug: 'energy-information-transformation-2023', episodeNumber: 6, slug: 'integration-ethical-implications', title: 'Integration and Ethical Implications', description: 'Synthesizing the series and examining ethical dimensions.', durationMinutes: 75, keyQuestions: ['What ethical responsibilities come with energy practices?', 'How do we prevent misuse of energetic frameworks?'], keyInsights: ['Power dynamics are central to energy teaching', 'Integration requires both scientific rigor and contemplative depth'], participants: ['Dr. Leila Rahman', 'Prof. Michael Torres', 'Imam Rashid ibn Ali'] },

    // Ethics of Inner Development (5 episodes)
    { seriesSlug: 'ethics-inner-development-2023', episodeNumber: 1, slug: 'contemplative-ethics-foundations', title: 'Foundations of Contemplative Ethics', description: 'How does contemplative practice shape moral perception and action?', durationMinutes: 68, keyQuestions: ['Does contemplative practice inherently cultivate ethical behavior?', 'Can ethics be grounded in phenomenology?'], keyInsights: ['Contemplative practice refines moral perception and emotional regulation', 'Ethical development requires both insight and habituation'], participants: ['Dr. Jennifer Wu', 'Sheikh Omar Farid', 'Prof. David Klein'] },
    { seriesSlug: 'ethics-inner-development-2023', episodeNumber: 2, slug: 'virtue-ethics-character', title: 'Virtue Ethics and Character Formation', description: 'Examining how spiritual practice shapes character over time.', durationMinutes: 72, keyQuestions: ['How does repeated contemplative practice shape character?', 'What is the relationship between states and traits?'], keyInsights: ['Repeated states can become stable traits', 'Character formation requires both practice and community'], participants: ['Dr. Jennifer Wu', 'Sheikh Omar Farid', 'Prof. David Klein'] },
    { seriesSlug: 'ethics-inner-development-2023', episodeNumber: 3, slug: 'duty-care-consequences', title: 'Duty, Care, and Consequences', description: 'Comparing deontological, care-based, and consequentialist approaches.', durationMinutes: 75, keyQuestions: ['How do contemplatives approach ethical dilemmas?', 'Does contemplative practice privilege one ethical framework?'], keyInsights: ['Contemplatives tend toward care-based reasoning', 'Multiple ethical frameworks can coexist productively'], participants: ['Dr. Jennifer Wu', 'Sheikh Omar Farid', 'Prof. David Klein'] },
    { seriesSlug: 'ethics-inner-development-2023', episodeNumber: 4, slug: 'power-abuse-spiritual-contexts', title: 'Power, Abuse, and Spiritual Contexts', description: 'Addressing the dark side of spiritual authority.', durationMinutes: 80, keyQuestions: ['What creates conditions for spiritual abuse?', 'How can communities protect against misuse of authority?'], keyInsights: ['Transparency and accountability structures are essential', 'Spiritual maturity and institutional competence are different'], participants: ['Dr. Jennifer Wu', 'Sheikh Omar Farid', 'Prof. David Klein'] },
    { seriesSlug: 'ethics-inner-development-2023', episodeNumber: 5, slug: 'ethical-maturity-wisdom', title: 'Ethical Maturity and Wisdom', description: 'What does ethical development look like at advanced stages?', durationMinutes: 70, keyQuestions: ['How does ethical reasoning change with contemplative development?', 'What does wisdom look like in action?'], keyInsights: ['Advanced practitioners show increased perspective-taking capacity', 'Wisdom involves both knowing and not-knowing'], participants: ['Dr. Jennifer Wu', 'Sheikh Omar Farid', 'Prof. David Klein'] },

    // Attention, Awareness, and Daily Practice (4 episodes)
    { seriesSlug: 'attention-awareness-practice-2026', episodeNumber: 1, slug: 'nature-of-attention', title: 'The Nature of Attention', description: 'What is attention and how does it shape our experience of reality?', durationMinutes: 60, keyQuestions: ['What is attention from contemplative and scientific perspectives?', 'How does attention shape perception?'], keyInsights: ['Attention is both selective and constructive', 'Contemplative practices systematically train attention'], participants: ['Dr. Amina Hassan', 'Omar Farid'] },
    { seriesSlug: 'attention-awareness-practice-2026', episodeNumber: 2, slug: 'distraction-digital-age', title: 'Distraction in the Digital Age', description: 'How modern technology affects attention and contemplative practice.', durationMinutes: 65, keyQuestions: ['How does digital technology affect attentional capacity?', 'Can contemplative practice counteract digital distraction?'], keyInsights: ['Digital environments systematically fragment attention', 'Contemplative practice rebuilds sustained attention'], participants: ['Dr. Amina Hassan', 'Omar Farid'] },
    { seriesSlug: 'attention-awareness-practice-2026', episodeNumber: 3, slug: 'awareness-versus-focus', title: 'Awareness Versus Focus', description: 'Distinguishing between focused attention and open awareness.', durationMinutes: 58, keyQuestions: ['What is the difference between focused attention and open monitoring?', 'How do these practices complement each other?'], keyInsights: ['Both practices develop different but complementary capacities', 'Integration of both yields optimal results'], participants: ['Dr. Amina Hassan', 'Omar Farid'] },
    { seriesSlug: 'attention-awareness-practice-2026', episodeNumber: 4, slug: 'daily-practice-integration', title: 'Integrating Practice into Daily Life', description: 'Practical strategies for maintaining contemplative awareness throughout daily activities.', durationMinutes: 62, keyQuestions: ['How can contemplative awareness be maintained during ordinary activities?', 'What are common obstacles to integration?'], keyInsights: ['Micro-practices throughout the day are highly effective', 'Community support significantly improves integration'], participants: ['Dr. Amina Hassan', 'Omar Farid'] },

    // What Is Inner Development (5 episodes)
    { seriesSlug: 'what-is-inner-development-2025', episodeNumber: 1, slug: 'defining-inner-development', title: 'Defining Inner Development', description: 'What do we mean by inner development?', durationMinutes: 60, keyQuestions: ['How is inner development different from self-improvement?', 'What are the markers of genuine inner development?'], keyInsights: ['Inner development involves structural change, not just skill acquisition', 'Multiple traditions converge on similar developmental stages'], participants: ['Prof. Sarah Chen', 'Shaykha Maryam'] },
    { seriesSlug: 'what-is-inner-development-2025', episodeNumber: 2, slug: 'self-awareness-foundation', title: 'Self-Awareness as Foundation', description: 'The role of self-knowledge in all developmental work.', durationMinutes: 65, keyQuestions: ['What kind of self-knowledge matters for development?', 'How do we distinguish genuine self-awareness from rumination?'], keyInsights: ['Self-awareness must be non-judgmental to be developmental', 'Body awareness is foundational to psychological awareness'], participants: ['Prof. Sarah Chen', 'Shaykha Maryam'] },
    { seriesSlug: 'what-is-inner-development-2025', episodeNumber: 3, slug: 'ethical-growth', title: 'Ethical Growth', description: 'How inner development naturally produces ethical maturation.', durationMinutes: 58, keyQuestions: ['Is ethical growth automatic with inner development?', 'How do we address ethical blind spots?'], keyInsights: ['Ethical sensitivity increases with contemplative practice', 'Community accountability prevents ethical drift'], participants: ['Prof. Sarah Chen', 'Shaykha Maryam'] },
    { seriesSlug: 'what-is-inner-development-2025', episodeNumber: 4, slug: 'reflection-discipline', title: 'Reflection and Discipline', description: 'The role of structured practice in inner development.', durationMinutes: 62, keyQuestions: ['How much structure is helpful versus harmful?', 'What is the relationship between discipline and spontaneity?'], keyInsights: ['Structure supports development but must eventually be transcended', 'Discipline and freedom are complementary'], participants: ['Prof. Sarah Chen', 'Shaykha Maryam'] },
    { seriesSlug: 'what-is-inner-development-2025', episodeNumber: 5, slug: 'information-insight-transformation', title: 'Information, Insight, and Transformation', description: 'Distinguishing between knowledge and genuine transformation.', durationMinutes: 70, keyQuestions: ['Why does information not produce transformation?', 'What creates the shift from insight to embodiment?'], keyInsights: ['Transformation requires integration, not just understanding', 'Embodiment takes time and repeated practice'], participants: ['Prof. Sarah Chen', 'Shaykha Maryam'] },

    // Silence, Reflection, and the Human Mind (4 episodes)
    { seriesSlug: 'silence-reflection-human-mind-2025', episodeNumber: 1, slug: 'anatomy-of-silence', title: 'The Anatomy of Silence', description: 'Exploring silence as a positive phenomenon rather than mere absence of noise.', durationMinutes: 60, keyQuestions: ['What is silence beyond absence of sound?', 'How does silence affect the mind differently than noise reduction?'], keyInsights: ['Silence has its own phenomenological quality', 'Different contemplative traditions approach silence differently'], participants: ['Dr. Layla Qasim', 'Ustadh Ibrahim'] },
    { seriesSlug: 'silence-reflection-human-mind-2025', episodeNumber: 2, slug: 'emotional-noise', title: 'Emotional Noise', description: 'Understanding how unprocessed emotional states create internal noise.', durationMinutes: 65, keyQuestions: ['How do unprocessed emotions create cognitive interference?', 'What practices effectively process emotional noise?'], keyInsights: ['Emotional regulation is prerequisite to deep contemplation', 'Different emotions require different processing approaches'], participants: ['Dr. Layla Qasim', 'Ustadh Ibrahim'] },
    { seriesSlug: 'silence-reflection-human-mind-2025', episodeNumber: 3, slug: 'contemplative-pause', title: 'The Contemplative Pause', description: 'The power of the pause between stimulus and response.', durationMinutes: 58, keyQuestions: ['What happens in the pause between stimulus and response?', 'How can we systematically cultivate the contemplative pause?'], keyInsights: ['The pause is where freedom lives', 'Regular practice systematically lengthens the pause'], participants: ['Dr. Layla Qasim', 'Ustadh Ibrahim'] },
    { seriesSlug: 'silence-reflection-human-mind-2025', episodeNumber: 4, slug: 'clarity-through-reflection', title: 'Clarity Through Reflection', description: 'How structured reflection produces genuine clarity rather than more confusion.', durationMinutes: 62, keyQuestions: ['When does reflection clarify versus confuse?', 'What distinguishes productive reflection from rumination?'], keyInsights: ['Structured reflection produces clarity, unstructured often produces confusion', 'Embodied reflection is more productive than purely cognitive'], participants: ['Dr. Layla Qasim', 'Ustadh Ibrahim'] },

    // Science, Spirituality, and the Search for Meaning (6 episodes)
    { seriesSlug: 'science-spirituality-meaning-2026', episodeNumber: 1, slug: 'asking-big-questions', title: 'Asking Big Questions', description: 'How different traditions approach fundamental questions about meaning and reality.', durationMinutes: 60, keyQuestions: ['What makes a question "big"?', 'How do scientific and spiritual traditions approach big questions differently?'], keyInsights: ['Big questions resist definitive answers', 'Different approaches reveal different aspects of truth'], participants: ['Prof. James Morrison', 'Sheikh Ahmad'] },
    { seriesSlug: 'science-spirituality-meaning-2026', episodeNumber: 2, slug: 'meaning-purpose-science', title: 'Meaning and Purpose in Science', description: 'Can science address questions of meaning and purpose?', durationMinutes: 65, keyQuestions: ['Is meaning a scientific concept?', 'How does evolutionary biology relate to existential meaning?'], keyInsights: ['Science describes mechanisms, not purposes', 'Meaning-making is a human capacity science can study but not prescribe'], participants: ['Prof. James Morrison', 'Sheikh Ahmad'] },
    { seriesSlug: 'science-spirituality-meaning-2026', episodeNumber: 3, slug: 'spiritual-epistemologies', title: 'Spiritual Epistemologies', description: 'How spiritual traditions establish knowledge claims.', durationMinutes: 62, keyQuestions: ['What counts as knowledge in contemplative traditions?', 'How do contemplative knowledge claims compare to scientific ones?'], keyInsights: ['Contemplative traditions have rigorous verification methods', 'Different domains require different epistemological approaches'], participants: ['Prof. James Morrison', 'Sheikh Ahmad'] },
    { seriesSlug: 'science-spirituality-meaning-2026', episodeNumber: 4, slug: 'consciousness-reality', title: 'Consciousness and Reality', description: 'The relationship between consciousness and the nature of reality.', durationMinutes: 68, keyQuestions: ['Is consciousness fundamental or emergent?', 'How do different traditions understand the relationship between mind and reality?'], keyInsights: ['Physics and contemplative traditions raise similar questions about observation', 'The hard problem remains unresolved across all frameworks'], participants: ['Prof. James Morrison', 'Sheikh Ahmad'] },
    { seriesSlug: 'science-spirituality-meaning-2026', episodeNumber: 5, slug: 'ethics-two-worldviews', title: 'Ethics in Two Worldviews', description: 'How scientific and spiritual frameworks approach ethics.', durationMinutes: 64, keyQuestions: ['Can ethics be grounded in both worldviews?', 'Where do scientific and spiritual ethics converge and diverge?'], keyInsights: ['Both frameworks value compassion and wellbeing', 'Spiritual ethics tends toward virtue ethics, scientific toward consequentialism'], participants: ['Prof. James Morrison', 'Sheikh Ahmad'] },
    { seriesSlug: 'science-spirituality-meaning-2026', episodeNumber: 6, slug: 'thoughtful-comparison', title: 'Thoughtful Comparison', description: 'How to compare scientific and spiritual frameworks productively.', durationMinutes: 70, keyQuestions: ['What makes comparison productive versus forced?', 'How do we honor both rigor and openness?'], keyInsights: ['Productive comparison requires deep understanding of both sides', 'Humility is essential in any comparative work'], participants: ['Prof. James Morrison', 'Sheikh Ahmad'] },

    // Metaphysics, Causality, and Contemplative Knowledge (6 episodes)
    { seriesSlug: 'metaphysics-causality-contemplative-2026', episodeNumber: 1, slug: 'ontological-hierarchy', title: 'Ontological Hierarchy', description: 'Exploring hierarchical conceptions of reality across traditions.', durationMinutes: 60, keyQuestions: ['What does ontological hierarchy mean?', 'How do different traditions conceive levels of reality?'], keyInsights: ['Hierarchical models appear across diverse traditions', 'Hierarchy need not imply value ranking'], participants: ['Prof. David Klein', 'Dr. Nader Ardalan'] },
    { seriesSlug: 'metaphysics-causality-contemplative-2026', episodeNumber: 2, slug: 'causality-spiritual-frameworks', title: 'Causality in Spiritual Frameworks', description: 'How contemplative traditions understand causation.', durationMinutes: 65, keyQuestions: ['How do spiritual traditions understand causality?', 'Is there a place for non-physical causation?'], keyInsights: ['Spiritual frameworks often include top-down causation', 'Modern physics raises questions about reductionist causality'], participants: ['Prof. David Klein', 'Dr. Nader Ardalan'] },
    { seriesSlug: 'metaphysics-causality-contemplative-2026', episodeNumber: 3, slug: 'metaphysical-dependence', title: 'Metaphysical Dependence', description: 'The relationship between contingent and necessary existence.', durationMinutes: 62, keyQuestions: ['What does it mean for reality to be metaphysically dependent?', 'How do contemplative traditions address this question?'], keyInsights: ['The dependence question is central to classical metaphysics', 'Contemplative experience provides distinctive perspective'], participants: ['Prof. David Klein', 'Dr. Nader Ardalan'] },
    { seriesSlug: 'metaphysics-causality-contemplative-2026', episodeNumber: 4, slug: 'contemplative-knowledge', title: 'Contemplative Knowledge', description: 'The epistemology of contemplative experience.', durationMinutes: 68, keyQuestions: ['What kind of knowledge does contemplation provide?', 'How does contemplative knowledge compare to propositional knowledge?'], keyInsights: ['Contemplative knowledge is non-propositional but real', 'It complements rather than replaces other knowledge forms'], participants: ['Prof. David Klein', 'Dr. Nader Ardalan'] },
    { seriesSlug: 'metaphysics-causality-contemplative-2026', episodeNumber: 5, slug: 'scientific-models-explanation', title: 'Scientific Models of Explanation', description: 'How science explains and what it leaves unexplained.', durationMinutes: 64, keyQuestions: ['What kinds of explanation does science provide?', 'Where do scientific models reach their limits?'], keyInsights: ['Scientific explanation is powerful but domain-specific', 'Mechanistic explanation does not exhaust understanding'], participants: ['Prof. David Klein', 'Dr. Nader Ardalan'] },
    { seriesSlug: 'metaphysics-causality-contemplative-2026', episodeNumber: 6, slug: 'integration-limitation', title: 'Integration and Limitation', description: 'Synthesizing the series and acknowledging genuine limits.', durationMinutes: 70, keyQuestions: ['What can be genuinely integrated?', 'Where must we acknowledge irreducible mystery?'], keyInsights: ['Integration is valuable but must not be forced', 'Mystery is a feature of reality, not a bug'], participants: ['Prof. David Klein', 'Dr. Nader Ardalan'] },

    // Consciousness Beyond Reductionism (5 episodes)
    { seriesSlug: 'consciousness-beyond-reductionism-2025', episodeNumber: 1, slug: 'hard-problem-revisited', title: 'The Hard Problem Revisited', description: 'Re-examining the hard problem of consciousness with recent developments.', durationMinutes: 60, keyQuestions: ['Has the hard problem changed since Chalmers formulated it?', 'What new perspectives have emerged?'], keyInsights: ['The hard problem persists despite scientific progress', 'New frameworks reframe but do not dissolve it'], participants: ['Dr. Sarah Chen', 'Prof. James Morrison'] },
    { seriesSlug: 'consciousness-beyond-reductionism-2025', episodeNumber: 2, slug: 'first-person-experience', title: 'First-Person Experience', description: 'The epistemology of subjective experience.', durationMinutes: 65, keyQuestions: ['What can first-person methods reveal?', 'How do we validate first-person reports?'], keyInsights: ['First-person methods can be systematic and rigorous', 'Validation requires intersubjective agreement among trained observers'], participants: ['Dr. Sarah Chen', 'Prof. James Morrison'] },
    { seriesSlug: 'consciousness-beyond-reductionism-2025', episodeNumber: 3, slug: 'phenomenology-mind', title: 'Phenomenology of Mind', description: 'What phenomenology reveals about consciousness that science misses.', durationMinutes: 62, keyQuestions: ['What does phenomenological analysis reveal?', 'How does it complement scientific approaches?'], keyInsights: ['Phenomenology reveals structures science does not access', 'Both approaches are necessary for complete understanding'], participants: ['Dr. Sarah Chen', 'Prof. James Morrison'] },
    { seriesSlug: 'consciousness-beyond-reductionism-2025', episodeNumber: 4, slug: 'critiques-materialism', title: 'Critiques of Materialism', description: 'Examining the limits of materialist accounts of consciousness.', durationMinutes: 68, keyQuestions: ['What are the strongest critiques of materialism?', 'Are there viable alternatives?'], keyInsights: ['Materialism has significant explanatory gaps', 'Alternatives include idealism, dual-aspect theory, and panpsychism'], participants: ['Dr. Sarah Chen', 'Prof. James Morrison'] },
    { seriesSlug: 'consciousness-beyond-reductionism-2025', episodeNumber: 5, slug: 'deeper-frameworks', title: 'Deeper Philosophical Frameworks', description: 'What deeper frameworks might explain consciousness?', durationMinutes: 70, keyQuestions: ['What frameworks go beyond the materialism/anti-materialism debate?', 'How do contemplative traditions contribute?'], keyInsights: ['Contemplative traditions offer third-way frameworks', 'Dual-aspect monism is promising'], participants: ['Dr. Sarah Chen', 'Prof. James Morrison'] },

    // Epistemology of Inner States (6 episodes)
    { seriesSlug: 'epistemology-inner-states-2026', episodeNumber: 1, slug: 'knowing-inner-states', title: 'Knowing Inner States', description: 'How do we know our own inner states?', durationMinutes: 60, keyQuestions: ['What does it mean to "know" an inner state?', 'How reliable is introspection?'], keyInsights: ['Introspection is fallible but irreplaceable', 'Training improves introspective accuracy'], participants: ['Dr. Amina Hassan', 'Prof. Keith Critchlow'] },
    { seriesSlug: 'epistemology-inner-states-2026', episodeNumber: 2, slug: 'verification-methods', title: 'Verification Methods', description: 'How contemplative traditions verify inner experiences.', durationMinutes: 65, keyQuestions: ['What verification methods do contemplative traditions use?', 'How do these compare to scientific verification?'], keyInsights: ['Contemplative verification is communal and longitudinal', 'Consensus among trained practitioners carries weight'], participants: ['Dr. Amina Hassan', 'Prof. Keith Critchlow'] },
    { seriesSlug: 'epistemology-inner-states-2026', episodeNumber: 3, slug: 'self-report-limitations', title: 'Self-Report Limitations', description: 'The limits and value of self-reported inner experience.', durationMinutes: 62, keyQuestions: ['When are self-reports reliable?', 'How do we work around their limitations?'], keyInsights: ['Self-reports are noisy but essential data', 'Multiple methods triangulate more accurately'], participants: ['Dr. Amina Hassan', 'Prof. Keith Critchlow'] },
    { seriesSlug: 'epistemology-inner-states-2026', episodeNumber: 4, slug: 'symbolic-language', title: 'Symbolic Language', description: 'How inner experience is communicated through symbols.', durationMinutes: 68, keyQuestions: ['Why do contemplative traditions use symbolic language?', 'How do we interpret symbolic reports?'], keyInsights: ['Symbolic language captures non-propositional content', 'Interpretation requires contextual knowledge'], participants: ['Dr. Amina Hassan', 'Prof. Keith Critchlow'] },
    { seriesSlug: 'epistemology-inner-states-2026', episodeNumber: 5, slug: 'experiential-authority', title: 'Experiential Authority', description: 'When does experience confer authority?', durationMinutes: 64, keyQuestions: ['When should we trust experiential claims?', 'What distinguishes genuine insight from delusion?'], keyInsights: ['Experience confers authority only within its domain', 'Community discernment is essential'], participants: ['Dr. Amina Hassan', 'Prof. Keith Critchlow'] },
    { seriesSlug: 'epistemology-inner-states-2026', episodeNumber: 6, slug: 'epistemic-clarity', title: 'Epistemic Clarity', description: 'Maintaining epistemic clarity in consciousness research.', durationMinutes: 70, keyQuestions: ['How do we maintain rigor while studying subjective phenomena?', 'What does epistemic clarity look like in practice?'], keyInsights: ['Rigor and openness are complementary', 'Epistemic humility is the foundation of clarity'], participants: ['Dr. Amina Hassan', 'Prof. Keith Critchlow'] },

    // Breath, Regulation, and Inner Balance (4 episodes)
    { seriesSlug: 'breath-regulation-inner-balance-2025', episodeNumber: 1, slug: 'breath-contemplative-practice', title: 'Breath in Contemplative Practice', description: 'The central role of breath across contemplative traditions.', durationMinutes: 60, keyQuestions: ['Why is breath central to so many contemplative traditions?', 'What makes breath unique as an object of attention?'], keyInsights: ['Breath bridges voluntary and involuntary systems', 'Breath awareness reveals mind-body connection directly'], participants: ['Dr. Leila Rahman', 'Ustadh Ibrahim'] },
    { seriesSlug: 'breath-regulation-inner-balance-2025', episodeNumber: 2, slug: 'nervous-system-regulation', title: 'Nervous System Regulation', description: 'How breath practices regulate the autonomic nervous system.', durationMinutes: 65, keyQuestions: ['How does breath affect the autonomic nervous system?', 'What are the mechanisms of breath-based regulation?'], keyInsights: ['Slow breathing increases parasympathetic tone', 'Different patterns produce different regulatory effects'], participants: ['Dr. Leila Rahman', 'Ustadh Ibrahim'] },
    { seriesSlug: 'breath-regulation-inner-balance-2025', episodeNumber: 3, slug: 'breath-attention-focus', title: 'Breath, Attention, and Focus', description: 'The relationship between breath awareness and attentional control.', durationMinutes: 58, keyQuestions: ['How does breath awareness affect attention?', 'Can breath practice improve focus?'], keyInsights: ['Breath awareness trains sustained attention', 'Attention and breath regulation co-develop'], participants: ['Dr. Leila Rahman', 'Ustadh Ibrahim'] },
    { seriesSlug: 'breath-regulation-inner-balance-2025', episodeNumber: 4, slug: 'inner-steadiness', title: 'Inner Steadiness', description: 'How breath practices cultivate inner balance and stability.', durationMinutes: 62, keyQuestions: ['What does inner steadiness feel like?', 'How does breath practice contribute to emotional stability?'], keyInsights: ['Inner steadiness is a trained capacity', 'Breath practice develops meta-awareness'], participants: ['Dr. Leila Rahman', 'Ustadh Ibrahim'] },

    // Symbol, Meaning, and Inner Perception (5 episodes)
    { seriesSlug: 'symbol-meaning-inner-perception-2025', episodeNumber: 1, slug: 'symbolic-language-spiritual', title: 'Symbolic Language in Spiritual Teaching', description: 'How symbols function in spiritual transmission.', durationMinutes: 60, keyQuestions: ['Why do spiritual traditions use symbols?', 'How do symbols transmit what literal language cannot?'], keyInsights: ['Symbols operate below the level of conceptual thought', 'Symbolic language activates different cognitive processes'], participants: ['Sheikh Omar Farid', 'Dr. Jennifer Wu'] },
    { seriesSlug: 'symbol-meaning-inner-perception-2025', episodeNumber: 2, slug: 'metaphor-embodied-meaning', title: 'Metaphor and Embodied Meaning', description: 'The role of metaphor in spiritual understanding.', durationMinutes: 65, keyQuestions: ['Is metaphor decorative or constitutive?', 'How does embodied cognition relate to spiritual metaphor?'], keyInsights: ['Metaphor structures thought itself', 'Spiritual metaphors are grounded in bodily experience'], participants: ['Sheikh Omar Farid', 'Dr. Jennifer Wu'] },
    { seriesSlug: 'symbol-meaning-inner-perception-2025', episodeNumber: 3, slug: 'inner-imagery', title: 'Inner Imagery', description: 'The phenomenology of inner visual experience.', durationMinutes: 62, keyQuestions: ['What is the status of inner imagery?', 'How do contemplatives work with inner images?'], keyInsights: ['Inner imagery has genuine phenomenological reality', 'It serves specific contemplative functions'], participants: ['Sheikh Omar Farid', 'Dr. Jennifer Wu'] },
    { seriesSlug: 'symbol-meaning-inner-perception-2025', episodeNumber: 4, slug: 'psychology-meaning-making', title: 'The Psychology of Meaning-Making', description: 'How humans construct meaning from experience.', durationMinutes: 68, keyQuestions: ['How do we construct meaning?', 'What makes some meanings more adequate than others?'], keyInsights: ['Meaning-making is an active process', 'Contemplative practice changes meaning-making capacity'], participants: ['Sheikh Omar Farid', 'Dr. Jennifer Wu'] },
    { seriesSlug: 'symbol-meaning-inner-perception-2025', episodeNumber: 5, slug: 'inner-perception-discipline', title: 'Inner Perception and Discipline', description: 'How disciplined practice refines inner perception.', durationMinutes: 70, keyQuestions: ['Can inner perception be trained?', 'What does refined inner perception look like?'], keyInsights: ['Inner perception develops with practice', 'Disciplined practice produces reliable inner perception'], participants: ['Sheikh Omar Farid', 'Dr. Jennifer Wu'] },
  ];

  for (const ep of episodes) {
    const seriesId = await getSeriesId(ep.seriesSlug);
    if (seriesId) {
      await prisma.episode.create({
        data: {
          seriesId,
          episodeNumber: ep.episodeNumber,
          slug: ep.slug,
          title: ep.title,
          description: ep.description,
          transcript: ep.transcript || null,
          keyQuestions: ep.keyQuestions,
          keyInsights: ep.keyInsights,
          participants: ep.participants,
          durationMinutes: ep.durationMinutes,
        },
      });
    }
  }
  console.log(`✅ ${episodes.length} episodes seeded`);

  // ============================================================================
  // HARD INQUIRY SESSIONS
  // ============================================================================
  console.log('\nSeeding hard inquiry sessions...');
  await prisma.hardTalkSession.deleteMany({});

  const hardTalkSessions = [
    {
      slug: 'consciousness-physical-substrate',
      title: 'Does Consciousness Require a Physical Substrate?',
      description: 'A rigorous examination of physicalist versus non-physicalist theories of consciousness, evaluating evidence and philosophical arguments.',
      participants: ['Dr. Marcus Chen (Neuroscientist)', 'Prof. Amina Khalil (Philosopher)', 'Dr. Robert Hayes (Cognitive Scientist)'],
      controversialPoints: ['Hard problem of consciousness', 'Neural correlates vs. causal mechanisms', 'Panpsychism as solution or pseudoscience', 'Explanatory gap', 'Integrated information theory'],
      citations: ['Chalmers D. (1995) The Hard Problem', 'Nagel T. (1974) What is it like to be a bat?', 'Dennett D. (1991) Consciousness Explained', 'Tononi G. (2004) Integrated Information Theory', 'Koch C. (2012) Consciousness: Confessions of a Romantic Reductionist'],
      themes: ['consciousness', 'physicalism', 'philosophy-of-mind'],
      publishedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      featured: true,
      transcript: `[Opening - Moderator]

Welcome to this Critical Inquiry dialogue on one of the most contentious questions in consciousness studies: Does consciousness require a physical substrate? We have three distinguished scholars with very different perspectives. Let's begin with opening statements.

[Dr. Marcus Chen - Neuroscientist]

Thank you. I'll be direct: every piece of empirical evidence we have suggests that consciousness is dependent on physical brain processes. When you damage specific brain regions, specific conscious functions are impaired. When you alter neurochemistry with drugs or disease, conscious experience changes. When the brain dies, consciousness ceases.

The burden of proof is on those claiming consciousness can exist without a physical substrate. Show me one case—just one—of consciousness occurring without a functioning brain. You can't, because there isn't any.

[Prof. Amina Khalil - Philosopher]

Marcus, I appreciate your directness, but you're conflating dependence with identity. That consciousness depends on the brain for its expression in our world doesn't prove consciousness IS brain activity. A television depends on its circuitry to display programs, but the programs aren't identical to the circuits.

Moreover, the hard problem remains: no amount of describing neural processes explains WHY there's subjective experience at all. Your evidence shows correlation, not explanation.

[Dr. Robert Hayes - Cognitive Scientist]

I want to push back on both of you. Amina, your television analogy fails because we can independently verify the existence of television signals. We have no such independent verification for consciousness apart from physical processes. And Marcus, while I share your physicalist intuitions, we need to be honest about the explanatory gap. We don't yet have a satisfactory account of how subjective experience arises from neural activity.

[Dr. Chen]

Robert, fair point about the explanatory gap. But that's an epistemological problem—a limit of our current understanding—not evidence for ontological dualism. History is full of phenomena that seemed mysterious until we understood the mechanisms. Lightning seemed supernatural until we understood electricity. Life seemed to require vital forces until we understood biochemistry. Consciousness will follow the same trajectory.

[Prof. Khalil]

That's promissory materialism, Marcus. You're essentially saying, "Trust us, we'll explain it eventually." But consciousness is fundamentally different from lightning or life. Those were third-person phenomena we came to understand better. Consciousness is first-person. The explanatory gap isn't just about complexity or current ignorance—it's about the categorical difference between objective description and subjective experience.

Consider: even if you had a complete neural description of seeing red—every neuron, every synapse, every molecular interaction—that description would not include "what it feels like" to see red. The feeling isn't IN the neurons any more than "middle C" is in piano strings. The strings produce vibrations that we experience as sound, but the experience isn't identical to the vibrations.

[Dr. Hayes]

Amina raises an important point. But I want to examine the alternatives. If consciousness isn't identical to brain processes, what is it? Substance dualism—the idea of an immaterial soul or mind—faces severe problems. How does something immaterial interact with physical neurons? That violates conservation of energy and seems scientifically incoherent.

Property dualism—the view that consciousness is a non-physical property of physical systems—is more plausible but still mysterious. What makes some physical arrangements conscious and others not? And we're back to the interaction problem.

[Prof. Khalil]

The interaction problem is overstated. We don't understand how the physical generates the experiential, but that doesn't mean it's impossible. Perhaps the problem lies in our conception of the physical. Maybe matter itself has proto-experiential properties—panpsychism—and complex organizations of matter give rise to complex experiences.

[Dr. Chen]

Now you're postulating invisible properties of all matter just to save your philosophical intuitions? That's not parsimony; that's desperation. Panpsychism doesn't solve anything—it just pushes the mystery to a different level. How do micro-experiences of particles combine into my unified conscious experience? That's the combination problem, and it's just as hard as the original hard problem.

[Dr. Hayes]

Marcus, I agree panpsychism raises new problems, but let's not dismiss it too quickly. Several serious philosophers and even some physicists take it seriously. The combination problem is genuine, but the alternative—believing that consciousness magically appears when matter reaches sufficient complexity—isn't obviously better.

Here's what troubles me: materialist theories of consciousness are either trivially true or explanatorily inadequate. If you define consciousness functionally—as information processing, responsiveness, etc.—then yes, the brain does that. But you've defined away the hard problem. If you try to explain phenomenal consciousness—what it's like—then describing neural correlates doesn't constitute explanation.

[Dr. Chen]

I reject the premise that phenomenal consciousness is some separate thing requiring special explanation. When we fully understand the functional organization of the brain—how information is integrated, how attention operates, how memory works—we'll have explained consciousness. The "what it's like" will be seen as identical to certain functional states, not something additional.

[Prof. Khalil]

That's exactly the move I object to. You're not explaining phenomenal consciousness; you're explaining it away. You're saying there's nothing to explain beyond function. But that's empirically false. I KNOW there's something it's like to see red, to feel pain, to taste coffee. That's not a function—it's an experience.

Thomas Nagel's bat example remains potent: even if we knew everything about bat neurology and echolocation, we wouldn't know what it's like to be a bat. The subjective character of experience isn't captured by objective description, no matter how complete.

[Dr. Hayes]

Let me try to find middle ground. Perhaps we're asking the wrong questions. Instead of "Does consciousness require a physical substrate?" maybe we should ask: "What is the relationship between physical processes and conscious experience?" That relationship might be more subtle than either identity or dualist interaction.

Consider integrated information theory, which proposes that consciousness is identical to a system's integrated information. This is physicalist—it supervenes on physical processes—but it identifies consciousness with an abstract property of causal structures, not with neurons per se.

[Dr. Chen]

IIT is promising, but it faces problems. It apparently implies that logic gates and even thermostats have some degree of consciousness if they integrate information. That seems like reductio ad absurdum.

[Prof. Khalil]

Actually, Marcus, that might not be absurd. If consciousness is fundamental—a basic feature of reality like mass or charge—then perhaps it exists in varying degrees throughout nature. Human consciousness is highly complex and self-reflective, but simpler systems might have simpler forms of experience.

[Dr. Chen]

And we're back to panpsychism. I cannot accept that my thermostat has experiences, however simple. That violates every reasonable intuition and introduces extraordinary claims without extraordinary evidence.

[Dr. Hayes]

Perhaps we need to distinguish between different senses of "consciousness." There's phenomenal consciousness—subjective experience. There's access consciousness—information available for report and reasoning. There's self-consciousness—awareness of awareness. These might have different explanations and different relationships to physical substrates.

[Prof. Khalil]

That's helpful, Robert. And it points to why this debate is so difficult. We're not clearly distinguishing our questions. When we ask if consciousness requires a physical substrate, are we asking:

1. Does HUMAN consciousness require a human brain? Obviously yes.
2. Does consciousness in general require SOME physical substrate? This is the real question.
3. Could there be non-biological substrates for consciousness—silicon, quantum computers, etc.? That's the computationalist question.

[Dr. Chen]

Good distinctions. My answer: Yes, yes, and probably yes. All consciousness requires some physical substrate, but not necessarily biological neurons. What matters is functional organization, not substrate. If we could replicate the relevant functional organization in silicon, it would be conscious.

[Prof. Khalil]

And I say: Yes, maybe, and I don't know. Human consciousness clearly needs a human brain. Whether consciousness in general requires physical substrate depends on your metaphysics. And whether artificial systems could be conscious depends on whether consciousness is purely functional or requires something more—perhaps even specific quantum effects, as Penrose suggests.

[Dr. Hayes]

I find myself in an uncomfortable middle position. The evidence strongly suggests consciousness is tied to physical processes. But I cannot dismiss the hard problem or the explanatory gap. Perhaps consciousness is an emergent property—genuinely novel, not reducible to components, yet dependent on physical organization.

[Dr. Chen]

Emergence doesn't help unless you specify the mechanism. "Emergence" often becomes a label for "we don't know how this works." I want actual explanations, not placeholder terms.

[Prof. Khalil]

And I want explanations that don't explain away the explanandum. Consciousness is real. Experience is real. Any theory that denies this to preserve materialist orthodoxy has lost the plot.

[Moderator]

We're out of time, but clearly this conversation is far from resolved. What we've learned: The evidence for dependence of human consciousness on brains is overwhelming. The explanation of how brains produce consciousness remains deeply contentious. And our intuitions about what counts as explanation differ sharply. Thank you all.

---

[End of Session - Runtime: 120 minutes]`,
    },
    {
      slug: 'meditation-research-rigor',
      title: 'Meditation Research: Rigor vs. Hype',
      description: 'Critical analysis of contemplative neuroscience methodology, publication bias, and the gap between scientific evidence and popular claims.',
      participants: ['Dr. Sarah Thompson (Research Methodologist)', 'Sheikh Omar Farid (Sufi Master)', 'Prof. James Liu (Neuroscientist)'],
      controversialPoints: ['Methodological weaknesses in meditation studies', 'Publication bias and replication failures', 'Researcher allegiance bias', 'Cultural appropriation in secularized practices', 'Measuring transcendent experiences'],
      citations: ['Goyal M. et al. (2014) JAMA Meditation meta-analysis', 'Van Dam NT et al. (2018) Mind the Hype', 'Davidson RJ & Lutz A (2008) Buddha\'s Brain', 'Varela F (1996) Neurophenomenology', 'Lindahl JR et al. (2017) The Varieties of Contemplative Experience'],
      themes: ['meditation', 'neuroscience', 'methodology'],
      publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      featured: true,
      transcript: `[Opening - Moderator]

Today we examine a sensitive topic: the scientific study of meditation. Mindfulness has become a billion-dollar industry, with claims ranging from stress reduction to enlightenment. But how rigorous is the research? How wide is the gap between evidence and marketing?

[Dr. Sarah Thompson - Research Methodologist]

I need to say upfront: I practice meditation. I believe it has value. But as a research methodologist, I'm deeply concerned about the quality of evidence being used to support extraordinary claims.

Let me be specific: A 2015 meta-analysis found that 47% of mindfulness studies had high risk of bias. Most used small sample sizes, lacked active control groups, and had unclear randomization. Many positive results may be due to expectation effects, researcher allegiance, or publication bias rather than meditation itself.

[Sheikh Omar Farid - Sufi Master]

I appreciate your rigor, Dr. Thompson. From the contemplative side, I'm also concerned—but for different reasons. Much of what's studied as "meditation" is a thin, secularized version of practices that were designed as part of comprehensive spiritual paths. Studying eight weeks of mindfulness training is like studying one piano lesson and drawing conclusions about Mozart.

[Prof. James Liu - Neuroscientist]

Both valid concerns. But let's not throw out the baby with the bathwater. Yes, early meditation research had methodological problems. But the field is maturing. We now have larger studies, better controls, and convergent evidence from multiple labs.

For example, research on long-term meditators shows consistent changes: increased gray matter in regions associated with attention and interoception, decreased activity in the default mode network, enhanced emotional regulation. These aren't flukes; they're robust findings.

[Dr. Thompson]

James, I've read those studies. Let's examine them critically. The studies on long-term meditators are correlational, not causal. Maybe people with certain brain characteristics are more likely to become long-term meditators. The direction of causation is unclear.

And the intervention studies with novices show small effects that often disappear when you use active control groups. A 2017 study comparing mindfulness to progressive muscle relaxation found no difference in outcomes. The benefits weren't specific to mindfulness; any relaxing activity helped.

[Sheikh Omar]

This is where I worry about the framing. Meditation traditions don't claim that eight weeks of practice creates dramatic changes. They speak of lifelong cultivation. The science is studying a watered-down version and then debating whether it "works."

Moreover, the outcomes being measured—stress reduction, attention, emotional regulation—are side effects in traditional contexts. The actual goals are insight, wisdom, liberation. These aren't easily operationalized for research, so they're ignored.

[Prof. Liu]

Omar, you're right that we study what we can measure. But should we abandon scientific investigation because traditional goals are hard to operationalize? I disagree. We start with what we can measure and gradually refine our methods.

And we ARE seeing effects that align with traditional claims. Studies of jhana meditation show altered states of consciousness with distinct neural signatures. Research on open awareness practices shows changes in the phenomenology of experience. We're making progress.

[Dr. Thompson]

My concern isn't whether to study meditation—of course we should—but the quality of evidence and the modesty of our claims. The popular media reports "Meditation rewires your brain!" when the actual finding is a tiny increase in gray matter density in one small study with questionable methodology.

Let me give you numbers. A 2014 JAMA meta-analysis found that mindfulness programs showed moderate evidence of improving anxiety and depression, but low evidence for improving attention, substance use, eating habits, sleep, and weight. Effect sizes were small to moderate.

Yet the public discourse treats meditation as a panacea. That's not science; that's hype.

[Sheikh Omar]

I strongly agree with distinguishing evidence from hype. But I worry this critique could delegitimize genuine contemplative inquiry. For centuries, practitioners have investigated consciousness through disciplined first-person methods. That's a different but valid form of inquiry.

The problem arises when we try to translate contemplative knowledge into the neuroscience framework. Things get lost. It's like studying love by measuring oxytocin levels—you might find correlations, but you're missing what matters most.

[Prof. Liu]

I don't think first-person and third-person methods are opposed. Francisco Varela's neurophenomenology tried to bridge them: use trained first-person observation to guide neuroscientific investigation. That's the ideal.

But Omar, you need to acknowledge that first-person methods have problems too. Introspection is unreliable. People confabulate. Without external validation, how do we distinguish genuine insight from delusion?

[Sheikh Omar]

The same way any discipline does: training, verification, correction. In Sufi practice, students work with qualified teachers who have completed the path. There are established markers of progress and common pitfalls. Advanced practitioners can identify where students are and what they need.

This isn't infallible, but neither is science. Science has replication crises, publication bias, researcher fraud. Every method of inquiry has limitations.

[Dr. Thompson]

True, but science has systematic error-correction mechanisms: peer review, replication, meta-analysis. What are the analogous mechanisms in contemplative traditions?

[Sheikh Omar]

Lineage transmission, teacher certification, verification of attainments. These have operated for centuries. Perhaps not as systematized as modern science, but not arbitrary either.

But here's my deeper concern: the scientific study of meditation is largely driven by Western priorities and assumptions. Contemplative practices were developed to address existential questions—suffering, meaning, transcendence. Science studies them for stress reduction and productivity enhancement.

That's not wrong, but it's a narrow lens. It risks reducing profound practices to self-help techniques.

[Prof. Liu]

I hear your concern, but science goes where the funding goes. Grants fund research on health outcomes, not enlightenment. That's a limitation, yes, but it doesn't invalidate what we learn.

Moreover, some existential questions might become tractable to science. We can study how practices affect sense of meaning, connection, or purpose. The Mystical Experience Questionnaire measures aspects of transcendent experiences. We're not completely limited to stress and attention.

[Dr. Thompson]

Let me bring us back to methodology. Even setting aside the question of what we study, HOW we study it matters. And here the field has serious problems:

1. Researcher allegiance bias: Meditation researchers typically believe in meditation. That biases expectations, interpretations, and what gets published.

2. Weak control groups: Comparing meditation to doing nothing isn't scientific. You need active controls—other interventions that match for time, attention, and expectation.

3. Publication bias: Positive results get published; null results don't. A 2016 analysis found evidence of significant publication bias in mindfulness research.

4. Replication failures: Many high-profile findings don't replicate. The original studies were underpowered and overestimated effects.

Until these are addressed, we should be very cautious about claims.

[Prof. Liu]

Sarah, everything you say is correct. But it's also true of most neuroscience and psychology research. Meditation research isn't uniquely flawed; it reflects general problems in the field. The replication crisis affects everything from social psychology to neuroscience.

The question is: are we making progress despite these issues? I think we are. We're seeing convergent evidence, better methods, and more nuanced understanding.

[Sheikh Omar]

May I offer a contemplative perspective on this? Perhaps the tension between rigor and hype reflects a deeper issue: we're applying reductive scientific methods to holistic practices and wondering why the results disappoint.

Meditation in authentic traditions is embedded in ethical practice, community, teacher-student relationships, and a comprehensive worldview. Extracting "mindfulness" and testing it in isolation is like studying nutritional supplements instead of diet. You miss the synergy.

[Dr. Thompson]

I don't disagree, Omar. But that makes the research problem harder, not easier. If effects depend on context, ethics, relationship, and worldview, how do we study it scientifically? You can't randomize people to comprehensive spiritual communities.

[Prof. Liu]

Maybe we need different research paradigms. Instead of only RCTs testing isolated techniques, we could use mixed methods: longitudinal studies of practitioners, careful phenomenology, neuroimaging of adepts. Multiple converging approaches.

[Sheikh Omar]

Yes, and we should involve contemplatives as full partners, not just subjects. They have expertise that complements scientific training. Co-design studies that honor both empirical rigor and contemplative wisdom.

[Dr. Thompson]

I'm open to that, but the standards of evidence must remain high. Rigor can't be sacrificed for inclusivity. If a claim can't withstand scrutiny, it should be rejected, regardless of tradition.

[Moderator]

A perfect encapsulation of the tensions. We want rigor without reductionism, respect for tradition without uncritical acceptance, scientific evidence without scientism. Balancing these is the challenge. Thank you all.

---

[End of Session - Runtime: 135 minutes]`,
    },
    {
      slug: 'science-study-spiritual-experience',
      title: 'Can Science Study Spiritual Experience?',
      description: 'Debating the epistemological boundaries between scientific and contemplative modes of inquiry.',
      participants: ['Dr. Jennifer Wu (Epistemologist)', 'Imam Rashid ibn Ali (Islamic Scholar)', 'Prof. David Klein (Philosopher of Science)'],
      controversialPoints: ['Epistemological boundaries between science and spirituality', 'First-person vs. third-person methods', 'Measuring transcendent experiences', 'Scientism vs. spiritual wisdom', 'The nature of knowledge itself'],
      citations: ['Zagzebski L. (2009) On Epistemology', 'Varela F (1996) Neurophenomenology', 'Al-Ghazali: Deliverance from Error', 'James W. (1902) The Varieties of Religious Experience', 'Kuhn T. (1962) The Structure of Scientific Revolutions'],
      themes: ['epistemology', 'spirituality', 'science-limits'],
      publishedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      featured: false,
      transcript: `[Opening - Moderator]

Our question today cuts to the heart of epistemology: Can science study spiritual experience? Or are there fundamental limits to third-person investigation of first-person phenomena?

[Dr. Jennifer Wu - Epistemologist]

Let me start with a provocation: science can study anything that has observable effects. If spiritual experiences affect behavior, neural activity, or reported phenomenology, they're scientifically tractable. The question isn't whether science CAN study spiritual experience, but whether scientific study captures everything important about it.

[Imam Rashid ibn Ali - Islamic Scholar]

That final clause is crucial. Science studies the traces of spiritual experience—neural correlates, behavioral changes, self-reports. But the experience itself, the encounter with the Divine, the transformation of being—these are inherently first-person and may not be fully captured by third-person methods.

In Islamic tradition, we distinguish 'ilm (knowledge through reason and transmission) from ma'rifa (direct experiential knowing). Science operates in the domain of 'ilm. Spiritual experience is ma'rifa. Different epistemologies.

[Prof. David Klein - Philosopher of Science]

I want to push back on that distinction. All knowledge ultimately relies on experience. Even in physics, we depend on perceptual experience—observations, measurements, readings. The difference isn't between experience and non-experience, but between public, reproducible observations and private, non-reproducible ones.

Science requires intersubjective agreement. If only you can access a phenomenon, it's outside science's domain—not because it's unreal, but because scientific method requires public verification.

[Imam Rashid]

But David, spiritual experiences ARE reproduced across practitioners. Sufis, Buddhist meditators, Christian contemplatives independently report similar phenomenology: unity experiences, dissolution of ego, profound peace, encounters with the sacred. That's convergent evidence, no?

[Dr. Wu]

It's convergent phenomenological reports, which is valuable data. But we face the same problem as with any phenomenology: how do we distinguish veridical experience from convincing illusion? Schizophrenics also have intense, convincing, repeatable experiences. What makes spiritual experiences different?

[Imam Rashid]

By their fruits. Spiritual experiences transform people positively—increased compassion, decreased selfishness, greater equanimity. Psychotic experiences typically don't have these effects. That's empirical differentiation.

[Prof. Klein]

That's pragmatic verification, which is important. William James made similar arguments. But it doesn't tell us whether the experiences are veridical—whether there really IS something divine encountered—or whether the experiences are beneficial illusions.

From a scientific perspective, we might explain spiritual experiences as evolved features of human psychology. Maybe states of ego-dissolution and unity were adaptive, perhaps promoting social cohesion or reducing existential anxiety. The experiences are real, but the interpretation—meeting God, perceiving ultimate reality—might be mistaken.

[Imam Rashid]

Now we're at the crux. You're saying science can study spiritual experience by explaining it away—reducing it to evolutionary psychology or neuroscience. But this assumes materialism from the start. You've ruled out the possibility that spiritual experiences are veridical encounters with transcendent reality.

That's not science being neutral; that's science presupposing naturalism and then confirming it. It's circular.

[Dr. Wu]

Actually, Rashid, I think you're right that methodological naturalism is a presupposition of science. Science brackets supernatural explanations not because they're false, but because they're not scientifically tractable.

Science asks: what are the natural, physical causes and conditions of phenomena? If the answer to spiritual experience is "divine intervention," that explanation doesn't generate predictions, isn't testable, and doesn't integrate with other scientific knowledge. It's a science-stopper.

[Imam Rashid]

But that proves my point. Science CAN'T adequately study spiritual experience because it rules out by methodology what might be the correct explanation. If God is real and occasionally grants spiritual experiences, science will systematically miss this truth because it only looks for natural causes.

[Prof. Klein]

This is why I think we need to be precise about what science can and can't do. Science can study the psychology, neurology, and phenomenology of spiritual experience. It can examine conditions that facilitate such experiences, their effects on people, and their distribution across cultures.

What science cannot do—and this is by design—is pronounce on the ultimate metaphysical status of what's experienced. That requires philosophical and theological interpretation, which goes beyond empirical investigation.

[Dr. Wu]

Agreed. But I'd add: science can study whether spiritual experiences provide knowledge. For example, if mystics claim to perceive the unity of all things, we can check whether this correlates with accurate models in physics. If contemplatives claim insight into the nature of mind, we can compare their reports with findings in neuroscience and phenomenology.

If spiritual experiences consistently provide accurate information about reality, that's evidence for veridicality. If they don't, or if they provide contradictory information across traditions, that's evidence against.

[Imam Rashid]

But which "reality"? Mystical experiences provide knowledge about spiritual realities, not necessarily physical ones. A Sufi's vision of divine unity isn't claiming that electrons are entangled; it's claiming an ultimate metaphysical unity beyond physics.

You can't falsify spiritual claims by checking them against physics. They operate at different levels of explanation.

[Prof. Klein]

This is the incommensurability problem. If spiritual and scientific frameworks are truly incommensurable—not translatable, not comparable—then they can't contradict each other. But they also can't support each other. They're simply separate magisteria.

But most religious practitioners don't accept that separation. They believe spiritual experiences provide truth about reality, not just about subjective states. And truth claims are subject to evaluation.

[Imam Rashid]

They're subject to evaluation within the appropriate framework. To evaluate spiritual claims, you need spiritual training. You can't judge Quranic interpretation without knowing Arabic, tafsir methodology, and Islamic jurisprudence. Similarly, you can't evaluate mystical claims without the relevant training.

Science isn't the universal arbiter of all truth claims. It's one methodology among others, excellent for studying the physical world but limited for other domains.

[Dr. Wu]

I agree science isn't the only path to knowledge. But I worry about epistemic relativism. If every domain has its own standards of truth with no cross-domain evaluation, how do we adjudicate conflicts?

For example, if neuroscience shows that mystical experiences are caused by temporal lobe activity, and mystics claim they're caused by God, who's right? Can both be right? Or are these different levels of explanation?

[Imam Rashid]

Multiple levels of explanation can all be true. When I raise my arm, there's a neurological explanation (motor cortex firing), a physical explanation (muscles contracting), and an intentional explanation (I chose to raise it). These don't conflict; they're complementary.

Similarly, mystical experience has neurological correlates and spiritual causes. God might work through neurological mechanisms. Finding the neurology doesn't eliminate the theology.

[Prof. Klein]

That's a sophisticated position, but it makes divine action unfalsifiable. Any evidence can be accommodated by saying God works through natural causes. The theistic hypothesis becomes empirically empty.

[Imam Rashid]

From your perspective, perhaps. But from a spiritual perspective, the evidence IS the transformed lives, the convergent phenomenology, the wisdom transmitted. That's not empirically empty; it's differently empirical.

[Dr. Wu]

Let me try to synthesize. Science can study spiritual experience from the outside—its correlates, conditions, and effects. Practitioners study it from the inside—its phenomenology, meanings, and significance. Both provide knowledge, but different kinds.

The trouble arises when we expect one methodology to answer questions proper to the other. Science can't determine ultimate meaning; contemplation can't determine neural mechanisms. Recognizing the limits of each approach is wisdom.

[Prof. Klein]

Well put, Jennifer. But we should add: the boundaries aren't fixed. Phenomenology can guide neuroscience; neuroscience can refine phenomenological categories. The best approach is probably methodological pluralism with dialogue between approaches.

[Imam Rashid]

I agree, with one caveat: the dialogue must be genuinely respectful. Too often, science studies spiritual experience with the implicit assumption that it will all reduce to brain states. That's not dialogue; that's colonization.

True dialogue requires each side taking the other seriously on its own terms, not just as data for one's own framework.

[Moderator]

A fitting conclusion. Science and spirituality can study experience together, but only if each respects the other's methods and limits. The conversation continues. Thank you.

---

[End of Session - Runtime: 110 minutes]`,
    },
  ];

  for (const s of hardTalkSessions) {
    await prisma.hardTalkSession.create({ data: s });
  }
  console.log(`✅ ${hardTalkSessions.length} hard inquiry sessions seeded`);

  // ============================================================================
  // APPLIED PRACTICES
  // ============================================================================
  console.log('\nSeeding applied practices...');
  await prisma.practiceProfile.deleteMany({});

  const practices = [
    {
      slug: 'dhikr-divine-remembrance',
      title: 'Dhikr: The Practice of Divine Remembrance',
      description: 'Dhikr — remembrance of the divine — is the axial practice of the Sufi path. Through rhythmic invocation of divine names, combined with breath and presence, the practitioner gradually realigns the heart from habitual forgetfulness toward sustained awareness.',
      methodology: 'Dhikr operates through the principle that the heart is transformed by what it repeatedly contemplates. The repeated invocation of a divine name is not mechanical repetition but a systematic discipline of attention.',
      steps: ['Establish a clean, quiet space and a consistent time', 'Sit in a stable position, spine erect, hands resting on knees', 'Begin with three slow, conscious breaths, releasing the concerns of the day', 'Recite Astaghfirullah 33 times to clear the field of distraction', 'Take up the central invocation and recite with full attention for the appointed number', 'Coordinate the invocation with the breath if your teacher has instructed this', 'Close with three breaths of stillness, allowing the resonance to settle', 'Maintain awareness of the quality of presence as you return to ordinary activity'],
      practiceType: 'meditation',
      durationMinutes: 30,
      difficultyLevel: 'beginner',
      relatedSaints: ['Rumi', 'Al-Ghazali', 'Ibn Arabi', 'Rabia al-Adawiyya'],
      themes: ['consciousness', 'inner-development', 'spiritual-practice'],
      tags: ['dhikr', 'remembrance', 'heart', 'invocation', 'breath'],
      featured: true,
    },
    {
      slug: 'muraqaba-contemplative-vigilance',
      title: 'Muraqaba: The Discipline of Contemplative Vigilance',
      description: 'Muraqaba — watchful awareness or contemplative vigilance — is the practice of resting attention in sustained, non-grasping awareness of the divine presence. Where dhikr works through active invocation, muraqaba works through the progressive quieting of activity.',
      methodology: 'Muraqaba works by cultivating the capacity to remain present without the support of mental activity. Most human attention is relational — it functions by moving from object to object. Muraqaba trains the reverse.',
      steps: ['Begin as with dhikr: quiet space, stable posture, preliminary breaths', 'Allow the stream of mental activity to be present without engagement', 'Direct attention toward the awareness that perceives the stream of thought', 'When attention is captured by a thought, gently disengage and return to witnessing awareness', 'With practice, the gaps between thoughts lengthen and pure awareness becomes more accessible', 'Extended sessions of 30-60 minutes are more productive than brief ones', 'Regular consultation with a teacher is important to navigate experiences that arise'],
      practiceType: 'meditation',
      durationMinutes: 45,
      difficultyLevel: 'intermediate',
      relatedSaints: ['Al-Ghazali', 'Al-Qushayri', 'Ibn Ata Allah al-Iskandari'],
      themes: ['consciousness', 'inner-development', 'epistemology'],
      tags: ['muraqaba', 'contemplation', 'vigilance', 'presence', 'awareness'],
      featured: true,
    },
    {
      slug: 'tawba-return-and-renewal',
      title: 'Tawba: The Station of Return and Moral Renewal',
      description: 'Tawba — typically translated as repentance but more accurately understood as return — is the foundational station of the Sufi path. It is not a single act but a sustained orientation: the continuous return of attention, intention, and action toward alignment with the divine will.',
      methodology: 'Tawba works through a structured three-part movement: recognition of misalignment (nadama), sincere intention to realign (azm), and active reorientation in thought, word, and deed (iqla).',
      steps: ['Set aside time each evening for muhasaba — self-accounting — reviewing the day with honest attention', 'Identify moments of misalignment: actions that caused harm, words spoken carelessly, self-serving intentions', 'For each misalignment, make a sincere internal movement of return: acknowledge, release, and renew intention', 'Where another person was involved, consider what practical amends are possible', 'Recite Astaghfirullah 100 times with full awareness of its meaning', 'Close with gratitude for the capacity to recognise misalignment', 'Do not carry the weight of the day into the following day'],
      practiceType: 'psychological',
      durationMinutes: 20,
      difficultyLevel: 'beginner',
      relatedSaints: ['Al-Ghazali', 'Imam al-Nawawi', 'Ibn Qayyim al-Jawziyya'],
      themes: ['inner-development', 'ethics', 'consciousness'],
      tags: ['tawba', 'repentance', 'return', 'moral-renewal', 'nafs'],
      featured: false,
    },
    {
      slug: 'khidma-sacred-service',
      title: 'Khidma: Service as Spiritual Technology',
      description: 'Khidma — sacred service — is the practice of selfless service understood not as mere good works but as a systematic technology for ego-dissolution and the cultivation of compassion.',
      methodology: 'Khidma works through the paradox of the ego: the self cannot dissolve itself through self-directed effort without creating a subtler ego. Service to others, when conducted with the right internal conditions, creates a situation in which the self is genuinely required to subordinate its preferences.',
      steps: ['Identify a form of service that genuinely stretches your comfort and requires real sacrifice', 'Establish a regular commitment rather than sporadic acts', 'Before each session, set a clear internal intention: this is for the divine and for the one served', 'During service, notice the ego\'s reactions: desire for recognition, irritation with ingratitude', 'Afterward, do not recount the service to others unless genuinely necessary', 'Review your service practice periodically with your teacher'],
      practiceType: 'service',
      durationMinutes: 0,
      difficultyLevel: 'intermediate',
      relatedSaints: ['Rabia al-Adawiyya', 'Al-Khidr', 'Mevlana Jalaluddin Rumi'],
      themes: ['inner-development', 'ethics', 'applied-practice'],
      tags: ['khidma', 'service', 'selflessness', 'compassion', 'ego-dissolution'],
      featured: true,
    },
    {
      slug: 'sohbet-sacred-companionship',
      title: 'Sohbet: The Practice of Sacred Companionship',
      description: 'Sohbet — sacred conversation or spiritual companionship — is the practice of intentional dialogue conducted in the presence of a teacher or among companions on the path.',
      methodology: 'Sohbet operates through the principle the tradition calls baraka — grace or blessing — understood as the capacity for spiritual qualities to transmit from person to person through sincere, open presence.',
      steps: ['Approach sohbet with the intention of learning, not of demonstrating knowledge', 'Practice listening more than speaking — receptive attention is as important as what is said', 'Allow silence — the pauses are often when transmission is most available', 'If a question arises, hold it for a moment before asking', 'After the gathering, take time in solitude to allow what was received to settle', 'Maintain discretion about what occurs in sohbet', 'Cultivate regular sohbet with companions on the path'],
      practiceType: 'relational',
      durationMinutes: 90,
      difficultyLevel: 'intermediate',
      relatedSaints: ['Mevlana Jalaluddin Rumi', 'Shams-i-Tabrizi', 'Baha-ud-Din Naqshband'],
      themes: ['inner-development', 'consciousness', 'community'],
      tags: ['sohbet', 'companionship', 'transmission', 'baraka', 'teacher'],
      featured: false,
    },
    {
      slug: 'muhasaba-self-accounting',
      title: 'Muhasaba: The Science of Self-Accounting',
      description: 'Muhasaba — self-accounting or ethical self-examination — is the systematic practice of reviewing one\'s inner states, motivations, and actions with the aim of identifying and correcting misalignments.',
      methodology: 'Muhasaba works by interrupting the ego\'s habitual tendency toward self-justification. The ordinary mind minimises its failures, exaggerates its virtues, and explains away its misalignments.',
      steps: ['Establish a fixed time for daily muhasaba — the evening, before sleep, is traditional', 'Begin with three breaths and the intention to see honestly, without self-protection', 'Review the day in three domains: actions, words, intentions', 'In the domain of intentions, be particularly precise about self-interest and desire for recognition', 'For each misalignment, make tawba as described in the tawba practice guide', 'Also review moments of alignment — gratitude for these is as important as acknowledgement of failures', 'Make specific intentions for the following day based on what muhasaba has revealed'],
      practiceType: 'psychological',
      durationMinutes: 20,
      difficultyLevel: 'beginner',
      relatedSaints: ['Al-Harith al-Muhasibi', 'Al-Ghazali', 'Ibn Ata Allah al-Iskandari'],
      themes: ['inner-development', 'ethics', 'psychology'],
      tags: ['muhasaba', 'self-accounting', 'introspection', 'ethics', 'character'],
      featured: false,
    },
  ];

  for (const p of practices) {
    await prisma.practiceProfile.create({ data: p });
  }
  console.log(`✅ ${practices.length} applied practices seeded`);

  // ============================================================================
  // INSIGHT INTERVIEWS
  // ============================================================================
  console.log('\nSeeding insight interviews...');
  await prisma.inspiringInterview.deleteMany({});

  const interviews = [
    {
      slug: 'bridging-neuroscience-and-contemplative-practice',
      title: 'Bridging Neuroscience and Contemplative Practice',
      description: 'How cutting-edge neuroscience research intersects with a lifelong Sufi practice, and what each tradition reveals about the other.',
      intervieweeName: 'Dr. Amina Hassan',
      intervieweeAffiliation: 'MIT Center for Neurobiological Engineering',
      intervieweeBio: 'Dr. Amina Hassan is a leading researcher in neurobiological engineering at MIT, where she investigates the neural correlates of contemplative practices. She has been a practitioner of Sufi dhikr and muraqaba since childhood, under the guidance of her family\'s Naqshbandi teacher.',
      themes: ['Neuroscience', 'Meditation Research', 'Personal Practice'],
      publishedAt: new Date('2024-01-15'),
      featured: true,
      transcript: `[Interviewer]

Thank you for joining us, Dr. Hassan. I'd like to begin by asking about something that many people find paradoxical: how do you reconcile your work as a neuroscientist with your practice as a Sufi?

[Dr. Amina Hassan]

Thank you for having me. I don't see it as reconciliation because I don't experience them as in conflict. Neuroscience asks: what are the mechanisms? Sufism asks: what is the meaning? Both questions are valid. The mistake is thinking one replaces the other.

When I look at an fMRI scan showing activation in the anterior cingulate cortex during dhikr practice, I'm seeing one level of truth — the neural correlates of a contemplative state. When my teacher describes the heart as "a mirror that needs polishing through remembrance," she's describing another level of truth — the phenomenological reality of that same state from the inside.

[Interviewer]

Can you give us a concrete example from your research?

[Dr. Hassan]

Sure. We've been studying the neural correlates of dhikr practice using high-density EEG and fMRI simultaneously. What we find is fascinating: during rhythmic dhikr, there's synchronized activity in the default mode network and the salience network. This is the same network configuration we see in flow states and in advanced meditators across traditions — Buddhist monks, Christian contemplatives, Hindu yogis.

But here's what neuroscience can't tell you: what it means when a practitioner experiences this as "the heart remembering God." That's not a neural explanation — it's a phenomenological report. And it's real in a way that fMRI data isn't. The fMRI shows correlations; the practitioner's report tells you what it's like.

[Interviewer]

So you're saying both descriptions are true?

[Dr. Hassan]

Both are true at their own level. This is what Ibn Arabi meant when he spoke of the "polymorphous nature of reality" — that the same phenomenon can be correctly described in multiple frameworks without contradiction. The neural description is correct at the level of physical mechanisms. The spiritual description is correct at the level of meaning and purpose.

The mistake that both fundamentalist scientists and fundamentalist religionists make is thinking that one level of description cancels the other. It doesn't. They're complementary.

[Interviewer]

How has your Sufi practice influenced your scientific work?

[Dr. Hassan]

Profoundly. Muraqaba — contemplative vigilance — has trained my attention in ways that directly benefit my research. The ability to sustain focused attention without grasping, to observe mental phenomena without immediately categorizing them — these are skills that transfer directly to scientific observation.

Many of my best insights have come during or after contemplative practice, not during analytical thinking. There's a quality of perception that contemplative practice cultivates — open, receptive, non-conceptual — that is essential for genuine discovery.

[Interviewer]

That's remarkable. Thank you, Dr. Hassan.

[Dr. Hassan]

Thank you. It's been a pleasure.

---

[End of Interview - Read Time: 45 minutes]`,
    },
    {
      slug: 'from-silicon-valley-to-sacred-service',
      title: 'From Silicon Valley to Sacred Service',
      description: 'A transformation journey from tech leadership to community service, exploring how Sufi principles inform ethical technology and social change.',
      intervieweeName: 'Omar Farid',
      intervieweeAffiliation: 'Former VP Engineering, Now Community Organizer',
      intervieweeBio: 'Omar Farid spent fifteen years in Silicon Valley, rising to VP Engineering at a major tech company. After a profound spiritual experience during a retreat with a Sufi teacher, he left tech to found a community organization that brings contemplative practice and social justice work together.',
      themes: ['Technology Ethics', 'Service', 'Career Transformation'],
      publishedAt: new Date('2023-12-08'),
      featured: true,
      transcript: `[Interviewer]

Omar, you had what many would consider the dream career. VP Engineering at a major tech company. What made you leave?

[Omar Farid]

It wasn't a single moment, but a gradual awakening — or perhaps a gradual discomfort that finally became unbearable. I was leading a team of two hundred engineers, shipping products used by billions of people. On paper, I had everything I'd worked for: the title, the compensation, the respect of my peers. Inside, I was hollow.

The turning point was a weekend retreat with a Sufi teacher in Northern California. We were doing dhikr, and something shifted. I realized I'd been optimizing for metrics that didn't matter — user engagement, revenue, stock price — while ignoring the metric that actually mattered: am I serving anything beyond myself?

[Interviewer]

That's a profound realization. How did you translate that into action?

[Omar Farid]

I spent a year in transition. I didn't quit overnight — that would have been irresponsible to my family and my team. I reduced my role at the company, started volunteering in Oakland on weekends, and began studying khidma — sacred service — in the Sufi tradition.

The Sufis understand something the tech world doesn't: service dissolves the ego in a way that no amount of self-optimization ever will. In tech, we're always trying to improve ourselves — better habits, better routines, better productivity systems. But the Sufi path isn't about improving the self; it's about dissolving the illusion that the self is what matters.

[Interviewer]

And now you're building an organization at that intersection.

[Omar Farid]

Yes. We're called "Sacred Code." We bring contemplative practice and community organizing together. The insight is simple but radical: you can't build ethical technology if you haven't done the inner work to understand your own motivations.

Most tech ethics programs are purely cognitive — read these frameworks, apply these principles, follow these guidelines. But ethics isn't cognitive; it's embodied. It requires the kind of self-knowledge that comes from sustained contemplative practice. You have to know your own patterns of self-deception, your own rationalizations, your own blind spots. Otherwise, you'll build unethical technology with the best ethical frameworks in the world.

[Interviewer]

What does Sacred Code actually do?

[Omar Farid]

We run three programs. The first is contemplative training for technologists — teaching dhikr, muraqaba, and muhasaba as practices for developing self-knowledge and ethical clarity. The second is community organizing — we work with neighborhoods in Oakland to build technology that serves residents, not extract from them. The third is policy advocacy — we bring the contemplative perspective to tech policy discussions, which are almost entirely dominated by utilitarian and rights-based frameworks.

The through-line is service. Every program is designed to ask: who benefits from this work? If the answer is "the people building it," we've missed the point.

[Interviewer]

That's a powerful vision. Thank you, Omar.

[Omar Farid]

Thank you for the conversation.

---

[End of Interview - Read Time: 52 minutes]`,
    },
    {
      slug: 'complexity-science-and-spiritual-emergence',
      title: 'Complexity Science and Spiritual Emergence',
      description: 'Investigating parallels between complex adaptive systems and stages of spiritual development through rigorous scientific inquiry.',
      intervieweeName: 'Prof. Sarah Chen',
      intervieweeAffiliation: 'Santa Fe Institute',
      intervieweeBio: 'Prof. Sarah Chen is a complexity scientist at the Santa Fe Institute, where she studies phase transitions in complex adaptive systems. Her work has revealed striking parallels between mathematical models of emergence and the stages of spiritual development described in classical Sufi texts.',
      themes: ['Complex Systems', 'Spiritual Development', 'Scientific Method'],
      publishedAt: new Date('2023-11-20'),
      featured: false,
      transcript: `[Interviewer]

Prof. Chen, your work connects two domains that seem completely unrelated: complexity science and Sufi spirituality. How did this connection emerge?

[Prof. Sarah Chen]

It emerged from a question I couldn't answer within my own field. In complexity science, we study phase transitions — moments when a system reorganizes itself into a qualitatively new state. Think of water becoming ice, or a flock of birds suddenly changing direction, or a brain transitioning from waking to sleeping.

I was reading classical Sufi texts about spiritual development — stations, states, transformations — and I realized they were describing phase transitions in human consciousness. The same mathematics that describe emergent behavior in physical systems also describe what happens when a person undergoes genuine spiritual transformation.

[Interviewer]

That's remarkable. Can you give a concrete example?

[Prof. Chen]

Sure. In complexity science, we talk about "critical slowing down" — the phenomenon where a system approaching a phase transition becomes slower to recover from perturbations. If you push a system near a critical point, it takes longer and longer to return to equilibrium.

In the Sufi literature, there's a concept called "qabd" — contraction or constriction — that precedes spiritual opening. The descriptions match: the practitioner becomes more sensitive, more reactive, less able to quickly return to their baseline emotional state. Teachers describe this as a sign that transformation is imminent.

Then comes "bast" — expansion — which looks mathematically like the system settling into a new attractor state at a higher level of organization. The practitioner reports greater stability, deeper peace, expanded capacity for compassion. These aren't vague spiritual claims; they're phenomenological reports that map onto measurable changes in the system's dynamics.

[Interviewer]

So the mathematics of phase transitions describe spiritual development?

[Prof. Chen]

I think they describe something deeper than either domain realizes on its own. Phase transitions and spiritual emergence may be different instances of the same underlying phenomenon: the reorganization of complex systems into higher states of coherence.

What's exciting is that this isn't just metaphor. The mathematical models actually predict phenomena that Sufi teachers describe. For example, the models predict that before a major phase transition, the system will exhibit increased variance — it will swing more dramatically between states. Sufi teachers describe exactly this: before a major opening, the practitioner often experiences intense oscillation between states of contraction and expansion, doubt and certainty, darkness and light.

[Interviewer]

What are the implications of this work?

[Prof. Chen]

I think there are three. First, it gives science a new framework for studying contemplative development — one that's quantitative and predictive, not just descriptive. Second, it gives contemplative traditions a language for communicating their insights to the scientific world. And third, it suggests that the process of transformation — whether in a physical system or a human being — follows universal principles that we're only beginning to understand.

The universe, it seems, is far more intelligent than we've given it credit for.

[Interviewer]

Thank you, Prof. Chen. This has been extraordinary.

[Prof. Chen]

Thank you. It's been a joy to share this work.

---

[End of Interview - Read Time: 48 minutes]`,
    },
  ];

  for (const i of interviews) {
    await prisma.inspiringInterview.create({ data: i });
  }
  console.log(`✅ ${interviews.length} insight interviews seeded`);

  // ============================================================================
  // SURAH COMMENTARY (114 Surahs)
  // ============================================================================
  console.log('\nSeeding surah commentary...');
  await prisma.surahCommentary.deleteMany({});

  const { SURAH_COMMENTARY } = await import('@/lib/surah-commentary-data');

  for (const surah of SURAH_COMMENTARY) {
    await prisma.surahCommentary.create({
      data: {
        surahNumber: surah.surah_number,
        arabicName: surah.arabic_name,
        englishName: surah.english_name,
        revelationType: surah.revelation_type,
        coreTheme: surah.core_theme,
        structuralAxis: surah.structural_axis,
        sufiReflection: surah.sufi_reflection,
        interfaithResonance: surah.interfaith_resonance,
        hasInterfaithNote: surah.has_interfaith_note,
      },
    });
  }
  console.log(`✅ ${SURAH_COMMENTARY.length} surah commentary entries seeded`);

  // ============================================================================
  // ADMIN USER
  // ============================================================================
  console.log('\n🔐 Seeding admin user...');
  const adminEmail = 'admin@sufisciencecenter.org';
  const adminPassword = 'SSCAdmin2026!';
  
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (existingAdmin) {
    await prisma.user.update({
      where: { email: adminEmail },
      data: { isAdmin: true },
    });
    console.log('✅ Admin user updated');
  } else {
    const hash = await hashPassword(adminPassword);
    await prisma.user.create({
      data: {
        name: 'Admin User',
        email: adminEmail,
        password: hash,
        isAdmin: true,
        isVerified: true,
      },
    });
    console.log('✅ Admin user created');
  }
  console.log('  Email: admin@sufisciencecenter.org');
  console.log('  Password: SSCAdmin2026!');

  console.log('\n🎉 Foundations data seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
