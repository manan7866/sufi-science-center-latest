export type ImpactLevel = 'Foundational' | 'Significant' | 'Formative';
export type HeritageField =
  | 'Mathematics'
  | 'Astronomy'
  | 'Medicine'
  | 'Philosophy'
  | 'Optics'
  | 'Chemistry'
  | 'Geography'
  | 'Physics'
  | 'Engineering'
  | 'Logic'
  | 'Jurisprudence'
  | 'History'
  | 'Linguistics'
  | 'Architecture'
  | 'Agriculture'
  | 'Sociology'
  | 'Economics'
  | 'Political Theory'
  | 'Education'
  | 'Psychology'
  | 'Cosmology'
  | 'Navigation'
  | 'Cartography';

export type HeritageRegion =
  | 'Arabian Peninsula'
  | 'Persia & Iran'
  | 'Central Asia'
  | 'Al-Andalus'
  | 'North Africa'
  | 'South Asia'
  | 'Anatolia'
  | 'Mesopotamia'
  | 'Levant';

export interface IntellectualEntry {
  id: string;
  name: string;
  knownAs?: string;
  century: string;
  region: HeritageRegion;
  field: HeritageField[];
  impactLevel: ImpactLevel;
  summary: string;
  contributions: string[];
  institutionalLegacy: string;
}

export interface IntellectualEra {
  id: string;
  label: string;
  range: string;
  description: string;
  entries: IntellectualEntry[];
}

export type SufiRole = 'Shaykh' | 'Scholar' | 'Poet' | 'Reformer' | 'Jurist' | 'Philosopher';
export type SufiOrder =
  | 'Qadiriyya'
  | 'Naqshbandiyya'
  | 'Chishtiyya'
  | 'Shadhiliyya'
  | 'Mevleviyya'
  | 'Suhrawardiyya'
  | 'Tijaniyya'
  | 'Rifaiyya'
  | 'Multiple';

export interface SpiritualEntry {
  id: string;
  name: string;
  title?: string;
  century: string;
  region: HeritageRegion;
  order: SufiOrder;
  roles: SufiRole[];
  summary: string;
  methodology: string;
  transmissionContribution: string;
  keyWorks?: string[];
}

export interface SpiritualEra {
  id: string;
  label: string;
  range: string;
  description: string;
  entries: SpiritualEntry[];
}

// ─── INTELLECTUAL HERITAGE DATA ───────────────────────────────────────────────

export const INTELLECTUAL_ERAS: IntellectualEra[] = [
  {
    id: 'foundational',
    label: 'Foundational Era',
    range: '7th – 9th Century CE',
    description: 'The formative period of Islamic intellectual civilization. Translation movements, early jurisprudence, and the first systematized sciences.',
    entries: [
      {
        id: 'jabir-ibn-hayyan',
        name: 'Jabir ibn Hayyan',
        knownAs: 'Geber',
        century: '8th Century',
        region: 'Mesopotamia',
        field: ['Chemistry'],
        impactLevel: 'Foundational',
        summary: 'Regarded as the father of early chemistry. His methodological approach to experimental inquiry prefigured modern laboratory practice.',
        contributions: [
          'Systematic classification of chemical substances',
          'Early development of distillation, sublimation, and crystallization procedures',
          'Introduction of controlled experimentation into natural philosophy',
          'Corpus of alchemical texts that shaped European medieval science',
        ],
        institutionalLegacy: 'His Latin translations formed the basis of European alchemical and chemical study through the 17th century.',
      },
      {
        id: 'al-kindi',
        name: 'Abu Yusuf al-Kindi',
        knownAs: 'Alkindus',
        century: '9th Century',
        region: 'Mesopotamia',
        field: ['Philosophy', 'Mathematics', 'Optics', 'Astronomy'],
        impactLevel: 'Foundational',
        summary: 'First systematic philosopher in the Islamic tradition. Synthesized Greek philosophy with Islamic thought and produced foundational works across multiple disciplines.',
        contributions: [
          'First major synthesis of Aristotelian philosophy with Islamic theological framework',
          'Treatise on geometric optics predating Alhazen by a century',
          'Mathematical theory of music and acoustics',
          'Works on cryptography and frequency analysis',
        ],
        institutionalLegacy: 'Established the model of the Islamic polymath and the legitimacy of philosophical inquiry within Islamic scholarship.',
      },
      {
        id: 'al-khwarizmi',
        name: 'Muhammad ibn Musa al-Khwarizmi',
        century: '9th Century',
        region: 'Central Asia',
        field: ['Mathematics', 'Astronomy', 'Geography'],
        impactLevel: 'Foundational',
        summary: 'His treatise on algebra established a new mathematical discipline. His name gave the English language the word "algorithm."',
        contributions: [
          'Formalized algebra as a systematic discipline (Kitab al-Mukhtasar fi Hisab al-Jabr wal-Muqabala)',
          'Introduction of Hindu-Arabic numerals to the Islamic world and subsequently to Europe',
          'Astronomical tables that informed European observatories',
          'Revised Ptolemaic geography with superior measurements',
        ],
        institutionalLegacy: 'Algebra as a discipline traces directly to his systematization. His works were translated into Latin and taught in European universities for five centuries.',
      },
      {
        id: 'al-farabi',
        name: 'Abu Nasr al-Farabi',
        knownAs: 'Alpharabius',
        century: '9th–10th Century',
        region: 'Central Asia',
        field: ['Philosophy', 'Logic', 'Political Theory', 'Psychology'],
        impactLevel: 'Foundational',
        summary: 'Known as the Second Teacher (after Aristotle). His political philosophy and logic shaped the curriculum of Islamic intellectual institutions for centuries.',
        contributions: [
          'Systematic commentary on Aristotelian logic and its Islamic application',
          'Political philosophy (Ara\' Ahl al-Madina al-Fadila) influencing Islamic governance theory',
          'Classification of the sciences that became the standard medieval curriculum',
          'Theory of the intellect that structured subsequent philosophical psychology',
        ],
        institutionalLegacy: 'His educational and logical frameworks formed the basis of madrasa curriculum design.',
      },
      {
        id: 'al-razi-physician',
        name: 'Muhammad ibn Zakariya al-Razi',
        knownAs: 'Rhazes',
        century: '9th–10th Century',
        region: 'Persia & Iran',
        field: ['Medicine', 'Chemistry', 'Philosophy'],
        impactLevel: 'Foundational',
        summary: 'Regarded as the greatest physician of the medieval world. His clinical records and diagnostic methodology were unprecedented in their empirical rigor.',
        contributions: [
          'First clinical distinction between smallpox and measles',
          'Systematic use of case studies in clinical teaching',
          'Kitab al-Mansuri and al-Hawi — encyclopedic medical references used in Europe until the 17th century',
          'Contributions to pharmaceutical chemistry and surgical technique',
        ],
        institutionalLegacy: 'His works were standard medical texts at European universities for over five hundred years.',
      },
    ],
  },
  {
    id: 'golden-age',
    label: 'Golden Age & Synthesis',
    range: '10th – 12th Century CE',
    description: 'Peak of Islamic intellectual production. Major encyclopedists, optical scientists, and medical systematizers emerge across Persia, Al-Andalus, and Central Asia.',
    entries: [
      {
        id: 'ibn-sina',
        name: 'Abu Ali ibn Sina',
        knownAs: 'Avicenna',
        century: '10th–11th Century',
        region: 'Central Asia',
        field: ['Medicine', 'Philosophy', 'Psychology', 'Astronomy', 'Mathematics'],
        impactLevel: 'Foundational',
        summary: 'His Canon of Medicine remained the standard medical textbook in European and Islamic institutions for six centuries. His philosophical system integrated Aristotelian and Neoplatonic frameworks.',
        contributions: [
          'Canon of Medicine (al-Qanun fi al-Tibb) — systematic codification of Greco-Islamic medicine',
          'Theory of the floating man — precursor to Cartesian arguments for the self',
          'Contributions to pharmacology, psychiatry, and surgical procedure',
          'Philosophical system (al-Shifa) covering logic, natural science, mathematics, and metaphysics',
        ],
        institutionalLegacy: 'Avicenna\'s Canon was the primary medical textbook at European universities until the 17th century. His philosophical works were standard in European scholasticism.',
      },
      {
        id: 'ibn-al-haytham',
        name: 'Hasan ibn al-Haytham',
        knownAs: 'Alhazen',
        century: '10th–11th Century',
        region: 'Mesopotamia',
        field: ['Optics', 'Physics', 'Mathematics', 'Astronomy'],
        impactLevel: 'Foundational',
        summary: 'Founder of modern optics. His Book of Optics revolutionized the understanding of light, vision, and the scientific method.',
        contributions: [
          'Intromission theory of vision — light travels from objects to the eye, not the reverse',
          'Experimental methodology using the camera obscura',
          'Geometric analysis of reflection and refraction',
          'Foundations of the scientific method through controlled experimentation',
        ],
        institutionalLegacy: 'His Book of Optics, translated as De Aspectibus, influenced Bacon, Kepler, and Descartes. Modern optics traces its methodological foundations to his work.',
      },
      {
        id: 'al-biruni',
        name: 'Abu Rayhan al-Biruni',
        century: '10th–11th Century',
        region: 'Central Asia',
        field: ['Astronomy', 'Mathematics', 'Geography', 'History', 'Sociology'],
        impactLevel: 'Foundational',
        summary: 'The first systematic comparative anthropologist. His study of India established a model of scholarly inquiry based on direct observation and cultural non-judgment.',
        contributions: [
          'Kitab al-Hind — the first systematic ethnographic study of a non-Islamic civilization',
          'Precise calculation of the Earth\'s circumference',
          'Comparative study of calendrical systems across cultures',
          'Contributions to geodesy and mathematical geography',
        ],
        institutionalLegacy: 'His ethnographic methodology prefigures modern anthropology by seven centuries. Regarded as founding a comparative approach to human knowledge systems.',
      },
      {
        id: 'ibn-rushd',
        name: 'Abu al-Walid ibn Rushd',
        knownAs: 'Averroes',
        century: '12th Century',
        region: 'Al-Andalus',
        field: ['Philosophy', 'Medicine', 'Logic', 'Jurisprudence'],
        impactLevel: 'Foundational',
        summary: 'The Commentator on Aristotle. His detailed expositions of Aristotelian logic and philosophy shaped European Scholasticism more than any other Islamic thinker.',
        contributions: [
          'Comprehensive commentaries on Aristotle that became standard texts in European universities',
          'Defense of rational inquiry in Fasl al-Maqal',
          'Medical contributions to Kulliyat (Colliget)',
          'Jurisprudential methodology in Bidayat al-Mujtahid',
        ],
        institutionalLegacy: 'Averroism as a philosophical school dominated European universities in the 13th–15th centuries. Thomas Aquinas directly engaged his commentaries.',
      },
      {
        id: 'al-idrisi',
        name: 'Muhammad al-Idrisi',
        century: '12th Century',
        region: 'Al-Andalus',
        field: ['Geography', 'Cartography', 'Agriculture'],
        impactLevel: 'Significant',
        summary: 'His world map (Tabula Rogeriana) was the most accurate map of the world produced in the 12th century and remained in use for three centuries.',
        contributions: [
          'Tabula Rogeriana — comprehensive world map for King Roger II of Sicily',
          'Detailed description of European, African, and Asian geography',
          'Agricultural survey of the Mediterranean world',
          'Systematic integration of Arab, Greek, and Viking geographical knowledge',
        ],
        institutionalLegacy: 'His map and geographical compendium influenced European exploration planning for centuries.',
      },
      {
        id: 'omar-khayyam',
        name: 'Omar Khayyam',
        century: '11th–12th Century',
        region: 'Persia & Iran',
        field: ['Mathematics', 'Astronomy', 'Philosophy'],
        impactLevel: 'Significant',
        summary: 'His algebraic work on cubic equations and his calendar reform (the Jalali calendar) demonstrated mathematical precision applied to institutional timekeeping.',
        contributions: [
          'Geometric solutions to cubic equations',
          'Reform of the Persian solar calendar — more accurate than the Gregorian calendar of 1582',
          'Contributions to parallel postulate discussions in geometry',
          'Philosophical poetry (Rubaiyat) synthesizing doubt, reason, and observation',
        ],
        institutionalLegacy: 'The Jalali calendar he designed in 1079 CE remains in use in Iran and Afghanistan today.',
      },
    ],
  },
  {
    id: 'institutional-era',
    label: 'Institutional & Reform Era',
    range: '13th – 16th Century CE',
    description: 'Period of institutional consolidation, encyclopedic scholarship, and regional civilizational achievements including the Timbuktu manuscript tradition and Ottoman scientific institutions.',
    entries: [
      {
        id: 'ibn-khaldun',
        name: 'Abd al-Rahman ibn Khaldun',
        century: '14th–15th Century',
        region: 'North Africa',
        field: ['Sociology', 'History', 'Economics', 'Political Theory'],
        impactLevel: 'Foundational',
        summary: 'Founder of sociology, historiography, and early economic theory. The Muqaddimah articulated a scientific theory of society, history, and civilizational cycles that preceded comparable European work by four centuries.',
        contributions: [
          'Muqaddimah — systematic theory of historical causation and social dynamics',
          'Concept of asabiyyah (social cohesion) as the engine of political history',
          'Economic analysis of labor, value, and trade cycles',
          'Theory of civilizational rise and decline based on empirical historical analysis',
        ],
        institutionalLegacy: 'Regarded by modern scholars (including Arnold Toynbee) as the founding work of sociology and historiography as scientific disciplines.',
      },
      {
        id: 'nasir-al-din-tusi',
        name: 'Nasir al-Din al-Tusi',
        century: '13th Century',
        region: 'Persia & Iran',
        field: ['Astronomy', 'Mathematics', 'Philosophy', 'Logic'],
        impactLevel: 'Foundational',
        summary: 'Director of the Maragha Observatory. His planetary models corrected Ptolemaic errors and directly influenced Copernicus\'s heliocentric model.',
        contributions: [
          'The Tusi couple — geometric device resolving Ptolemaic inconsistencies, later used by Copernicus',
          'Direction of the Maragha Observatory, the most advanced astronomical institution of its era',
          'Zij-i Ilkhani — astronomical tables used across the Islamic world',
          'Foundational work in trigonometry as an independent mathematical discipline',
        ],
        institutionalLegacy: 'Copernicus\'s heliocentric model employed mathematical devices developed by Tusi and Ibn al-Shatir. The Maragha school was the most advanced astronomical institution of the 13th century.',
      },
      {
        id: 'ibn-al-nafis',
        name: 'Ala al-Din ibn al-Nafis',
        century: '13th Century',
        region: 'Levant',
        field: ['Medicine'],
        impactLevel: 'Foundational',
        summary: 'Discovered pulmonary blood circulation three centuries before William Harvey\'s European account.',
        contributions: [
          'First accurate description of pulmonary circulation — blood travels from heart to lungs and back',
          'Refutation of Avicenna\'s and Galen\'s anatomical errors regarding the cardiac septum',
          'Commentary on Avicenna\'s Canon expanding and correcting anatomical understanding',
        ],
        institutionalLegacy: 'His discovery of pulmonary circulation, made around 1242 CE, preceded Harvey\'s 1628 account by nearly four centuries.',
      },
      {
        id: 'ulugh-beg',
        name: 'Ulugh Beg',
        century: '15th Century',
        region: 'Central Asia',
        field: ['Astronomy', 'Mathematics'],
        impactLevel: 'Significant',
        summary: 'Ruler-astronomer whose Samarkand Observatory produced the most accurate star catalogue of the pre-telescopic age.',
        contributions: [
          'Zij-i Sultani — star catalogue with coordinates for 1,018 stars, more accurate than Ptolemy\'s',
          'Direction of the Samarkand Observatory, the most advanced of its era',
          'Accurate measurement of the solar year to within 58 seconds of modern values',
          'Patronage of a major astronomical and mathematical school in Samarkand',
        ],
        institutionalLegacy: 'His star catalogue was the most accurate produced before Tycho Brahe\'s European work in the 16th century.',
      },
      {
        id: 'ibn-battuta',
        name: 'Abu Abdullah ibn Battuta',
        century: '14th Century',
        region: 'North Africa',
        field: ['Geography', 'History', 'Sociology'],
        impactLevel: 'Significant',
        summary: 'The most extensively traveled person of the pre-modern world. His Rihla constitutes the most comprehensive ethnographic and geographic record of 14th-century civilizations.',
        contributions: [
          'Rihla — record of travels spanning over 117,000 km across the Islamic world, Africa, and Asia',
          'Systematic documentation of legal, political, and social structures across diverse civilizations',
          'Comparative account of governance structures from Mali to China',
          'First detailed account of many sub-Saharan African and Central Asian polities',
        ],
        institutionalLegacy: 'His Rihla remains the primary historical record of many 14th-century civilizations and institutions.',
      },
    ],
  },
  {
    id: 'modern-era',
    label: 'Modern Scientific Era',
    range: '17th Century CE – Present',
    description: 'Engagement between classical Islamic intellectual frameworks and modern scientific disciplines. Colonial disruption, institutional resilience, and contemporary rearticulation.',
    entries: [
      {
        id: 'taqi-al-din',
        name: 'Taqi al-Din Muhammad',
        century: '16th Century',
        region: 'Levant',
        field: ['Astronomy', 'Engineering', 'Optics', 'Physics'],
        impactLevel: 'Significant',
        summary: 'Chief astronomer of the Ottoman Empire. His Istanbul Observatory produced data and instruments comparable to Tycho Brahe\'s Danish observatory of the same era.',
        contributions: [
          'Istanbul Observatory (1577) — institutional scientific establishment with advanced instrumentation',
          'Mechanical clock applied to astronomical observation',
          'Steam turbine design (first recorded in Islamic scientific literature)',
          'Work on optics correcting and extending Ibn al-Haytham',
        ],
        institutionalLegacy: 'The Istanbul Observatory represented the peak of Ottoman scientific institutionalization before its demolition in 1580.',
      },
      {
        id: 'al-jabarti',
        name: 'Abd al-Rahman al-Jabarti',
        century: '18th–19th Century',
        region: 'North Africa',
        field: ['History', 'Sociology'],
        impactLevel: 'Significant',
        summary: 'The most important chronicler of the Napoleonic encounter with Egypt. His account constitutes a critical historical analysis of colonial encounter from an Islamic perspective.',
        contributions: [
          'Aja\'ib al-Athar — comprehensive chronicle of 18th-century Egyptian history',
          'Critical analysis of the French occupation of Egypt (1798–1801)',
          'Documentation of the transformation of Egyptian institutional and intellectual life',
          'Comparative account of Islamic and European epistemic frameworks',
        ],
        institutionalLegacy: 'Primary historical source for Egyptian history of the 18th and early 19th centuries.',
      },
      {
        id: 'jamal-al-din-afghani',
        name: 'Jamal al-Din al-Afghani',
        century: '19th Century',
        region: 'Persia & Iran',
        field: ['Political Theory', 'Philosophy', 'Education'],
        impactLevel: 'Significant',
        summary: 'Foundational figure in Islamic intellectual modernism. His program of rational reform and political independence shaped the trajectory of Islamic intellectual engagement with modernity.',
        contributions: [
          'Pan-Islamic intellectual framework integrating reason, political independence, and Islamic identity',
          'Critique of European colonialism on philosophical and political grounds',
          'Reform of Islamic educational institutions toward rational methodology',
          'Founding influence on Islamic modernism, Arab nationalism, and political Islam',
        ],
        institutionalLegacy: 'His students and intellectual heirs shaped the political and intellectual transformation of the Islamic world in the 20th century.',
      },
    ],
  },
];

// ─── SPIRITUAL HERITAGE DATA ──────────────────────────────────────────────────

export const SPIRITUAL_ERAS: SpiritualEra[] = [
  {
    id: 'prophetic-formative',
    label: 'Prophetic & Formative Period',
    range: '7th – 9th Century CE',
    description: 'The emergence of structured inner practice from the direct companions and their successors. Foundational frameworks for spiritual methodology are established.',
    entries: [
      {
        id: 'hasan-al-basri',
        name: 'Hasan al-Basri',
        century: '7th–8th Century',
        region: 'Mesopotamia',
        order: 'Multiple',
        roles: ['Scholar', 'Shaykh'],
        summary: 'The most authoritative early figure of Islamic asceticism. His emphasis on tawakkul (reliance on God), fear (khawf), and hope (raja) established the psychological vocabulary of Islamic spirituality.',
        methodology: 'Zuhd (renunciation) as the foundational spiritual orientation; continuous moral accountability (muhasaba) as the primary inner discipline.',
        transmissionContribution: 'His circle transmitted the foundations of Islamic ascetic practice to subsequent generations and his teachings appear in nearly every subsequent silsila.',
        keyWorks: ['Sermons and letters preserved in later collections'],
      },
      {
        id: 'rabia-al-adawiyya',
        name: "Rabi'a al-Adawiyya",
        century: '8th Century',
        region: 'Mesopotamia',
        order: 'Multiple',
        roles: ['Shaykh'],
        summary: 'The first major systematizer of the concept of divine love (mahabba) as the central orientation of spiritual life. Her reorientation of Islamic spirituality from fear to love transformed the discipline.',
        methodology: 'Pure love (mahabba) for God entirely independent of hope for reward or fear of punishment. The concept of disinterested devotion as the highest spiritual station.',
        transmissionContribution: 'Her theological reframing of the purpose of spiritual practice influenced every subsequent Sufi thinker who engaged with the concept of love.',
        keyWorks: ['Attributed prayers and poems preserved in subsequent hagiographies'],
      },
      {
        id: 'al-muhasibi',
        name: 'Harith al-Muhasibi',
        century: '8th–9th Century',
        region: 'Mesopotamia',
        order: 'Multiple',
        roles: ['Scholar', 'Shaykh'],
        summary: 'Founder of systematic Islamic psychology. His concept of muhasaba (self-accounting) established a rigorous framework for inner examination that became foundational to Sufi practice.',
        methodology: 'Muhasaba (systematic self-examination): continuous monitoring of intentions, thoughts, and states against ethical and spiritual standards.',
        transmissionContribution: 'His psychological methodology was adopted by al-Ghazali and became the structural foundation of Islamic spiritual psychology.',
        keyWorks: ['Kitab al-Riaya li Huquq Allah', 'Kitab al-Wasaya'],
      },
    ],
  },
  {
    id: 'classical-articulation',
    label: 'Classical Articulation',
    range: '9th – 11th Century CE',
    description: 'The major systematizers. Foundational doctrines, station-state frameworks, and the first formal Sufi orders emerge.',
    entries: [
      {
        id: 'al-junayd',
        name: 'Abu al-Qasim al-Junayd',
        title: 'Sayyid al-Ta\'ifa',
        century: '9th–10th Century',
        region: 'Mesopotamia',
        order: 'Multiple',
        roles: ['Shaykh', 'Scholar'],
        summary: 'The most influential systematizer of classical Sufism. His doctrine of fana (annihilation) and baqa (subsistence) in God became the cornerstone of subsequent Sufi metaphysics.',
        methodology: 'Sober Sufism: mystical experience expressed within the strict boundaries of sharia and rational articulation. Integration of inner experience with outward conduct.',
        transmissionContribution: 'Virtually every major subsequent Sufi order and thinker traces methodological influence to al-Junayd. His approach defined the normative form of Islamic mysticism.',
        keyWorks: ['Letters and treatises preserved in hagiographical collections', 'Kitab al-Fana'],
      },
      {
        id: 'al-hallaj',
        name: 'Husayn ibn Mansur al-Hallaj',
        century: '9th–10th Century',
        region: 'Persia & Iran',
        order: 'Multiple',
        roles: ['Shaykh', 'Poet'],
        summary: 'The most contested figure of classical Sufism. His declaration "Ana al-Haqq" (I am the Truth) crystallized debates about the limits of mystical expression and the relationship of the self to the divine.',
        methodology: 'Total identification with divine qualities through complete annihilation of the personal self. Public articulation of mystical states as a form of teaching.',
        transmissionContribution: 'His execution (922 CE) and the theological debates it generated forced a precise articulation of the limits of mystical language in Islamic thought.',
        keyWorks: ['Kitab al-Tawasin', 'Diwan'],
      },
      {
        id: 'al-sulami',
        name: 'Abu Abd al-Rahman al-Sulami',
        century: '10th–11th Century',
        region: 'Central Asia',
        order: 'Multiple',
        roles: ['Scholar', 'Shaykh'],
        summary: 'The first systematic historian of Sufism. His biographical dictionaries of Sufi masters established the genre and methodology for all subsequent hagiographical scholarship.',
        methodology: 'Documentary methodology: systematic collection and verification of transmitted sayings and biographical accounts of early masters.',
        transmissionContribution: 'His Tabaqat al-Sufiyya established the canonical biography of early Sufism and was the primary source for all subsequent hagiographies.',
        keyWorks: ['Tabaqat al-Sufiyya', 'Haqa\'iq al-Tafsir'],
      },
      {
        id: 'al-qushayri',
        name: 'Abu al-Qasim al-Qushayri',
        century: '10th–11th Century',
        region: 'Central Asia',
        order: 'Multiple',
        roles: ['Scholar', 'Shaykh'],
        summary: 'His Risala (Epistle) became the standard comprehensive textbook of Sufi doctrine and remained so for centuries. He systematized stations and states into a teachable framework.',
        methodology: 'Integration of Ash\'ari theology with Sufi practice; systematic defense of Sufism within orthodox Islamic scholarship.',
        transmissionContribution: 'The Risala was the primary curricular text for Sufi education across the Islamic world and remains a foundational reference.',
        keyWorks: ['al-Risala al-Qushayriyya', 'Qur\'anic commentary (Lata\'if al-Isharat)'],
      },
      {
        id: 'al-ghazali',
        name: 'Abu Hamid al-Ghazali',
        title: 'Hujjat al-Islam',
        century: '11th–12th Century',
        region: 'Persia & Iran',
        order: 'Multiple',
        roles: ['Scholar', 'Shaykh', 'Reformer'],
        summary: 'The most influential Islamic scholar after the Companions. His Ihya Ulum al-Din reconciled rational jurisprudence, theology, and Sufi practice into a comprehensive ethical system.',
        methodology: 'Practical spirituality: detailed prescriptive frameworks for purifying the self, regulating character, and integrating inner development with scholarly obligation.',
        transmissionContribution: 'The Ihya defined the normative integration of Sufi practice with Islamic law and theology. Its influence on subsequent Islamic education is unparalleled.',
        keyWorks: ['Ihya Ulum al-Din', 'Mishkat al-Anwar', 'Kimiya-yi Sa\'adat', 'al-Munqidh min al-Dalal'],
      },
    ],
  },
  {
    id: 'order-formation',
    label: 'Order Formation & Expansion',
    range: '11th – 14th Century CE',
    description: 'The major Sufi orders are established with formal institutional structures. Transmission chains (silsila) are systematized and lodges (khanqah, tekke) become civilizational institutions.',
    entries: [
      {
        id: 'abd-al-qadir-gilani',
        name: 'Abd al-Qadir al-Gilani',
        title: 'Ghawth al-A\'zam',
        century: '11th–12th Century',
        region: 'Mesopotamia',
        order: 'Qadiriyya',
        roles: ['Shaykh', 'Scholar'],
        summary: 'Founder of the Qadiriyya, the most widespread Sufi order globally. His transmission and institutional model became the template for Sufi order formation.',
        methodology: 'Balanced integration of sharia observance with spiritual development; emphasis on service and accessibility to all social classes.',
        transmissionContribution: 'The Qadiriyya order is present in over 50 countries. His silsila is one of the most widely transmitted in the Islamic world.',
        keyWorks: ['Futuh al-Ghayb', 'al-Fath al-Rabbani'],
      },
      {
        id: 'rumi',
        name: 'Jalal al-Din Rumi',
        title: 'Mawlana',
        century: '13th Century',
        region: 'Anatolia',
        order: 'Mevleviyya',
        roles: ['Shaykh', 'Poet'],
        summary: 'The most widely read Sufi poet globally. His Masnavi is a pedagogical masterpiece encoding complex metaphysical and psychological principles in narrative verse accessible across cultures.',
        methodology: 'Sama (sacred audition), poetry as vehicle for metaphysical teaching, and the discipline of complete surrender to the spiritual guide.',
        transmissionContribution: 'The Mevleviyya (Whirling Dervishes) became a civilizationally significant order in Ottoman culture. The Masnavi has been continuously studied for 750 years.',
        keyWorks: ['Masnavi-yi Ma\'navi (6 volumes)', 'Divan-i Shams-i Tabrizi', 'Fihi Ma Fihi'],
      },
      {
        id: 'ibn-arabi',
        name: 'Muhyi al-Din ibn Arabi',
        title: 'Shaykh al-Akbar',
        century: '12th–13th Century',
        region: 'Al-Andalus',
        order: 'Multiple',
        roles: ['Shaykh', 'Philosopher', 'Scholar'],
        summary: 'The most systematically complex metaphysician in the Sufi tradition. His doctrine of Wahdat al-Wujud (unity of being) transformed Islamic mystical philosophy and remains the central reference for Islamic metaphysics.',
        methodology: 'Kashf (mystical unveiling) combined with rigorous philosophical analysis. Integration of prophetic knowledge, rational analysis, and direct spiritual experience.',
        transmissionContribution: 'His 300+ works formed the intellectual foundation of subsequent Sufi metaphysical discourse. Every major subsequent Sufi thinker engaged his framework.',
        keyWorks: ['Futuhat al-Makkiyya (37 volumes)', 'Fusus al-Hikam', 'Tarjuman al-Ashwaq'],
      },
      {
        id: 'khwaja-muinuddin-chishti',
        name: 'Khwaja Muinuddin Chishti',
        century: '12th–13th Century',
        region: 'South Asia',
        order: 'Chishtiyya',
        roles: ['Shaykh'],
        summary: 'Founder of the Chishtiyya order in South Asia. His mission established the most significant Sufi presence in the Indian subcontinent, transforming the religious landscape of the region.',
        methodology: 'Radical accessibility: service to the poor regardless of religion, sama as a primary vehicle of spiritual development, and non-sectarian hospitality.',
        transmissionContribution: 'The Chishtiyya became the dominant Sufi order of South Asia with hundreds of millions of adherents. His dargah in Ajmer remains one of the most visited shrines in the world.',
        keyWorks: ['Anis al-Arwah (attributed)'],
      },
      {
        id: 'baha-ud-din-naqshband',
        name: "Baha' al-Din Naqshband",
        century: '14th Century',
        region: 'Central Asia',
        order: 'Naqshbandiyya',
        roles: ['Shaykh'],
        summary: 'Systematizer of the Naqshbandiyya, the only major Sufi order tracing its lineage to Abu Bakr al-Siddiq. Its silent dhikr methodology and integration of political engagement made it uniquely influential.',
        methodology: 'Silent dhikr (inner remembrance without vocalization); strict adherence to the prophetic example (sunna); engagement with political authority as an ethical obligation.',
        transmissionContribution: 'The Naqshbandiyya became the most politically and intellectually influential Sufi order of Central Asia, Turkey, the Caucasus, and South Asia.',
        keyWorks: ['Sayings preserved by disciples in hagiographical collections'],
      },
    ],
  },
  {
    id: 'reform-modernity',
    label: 'Reform & Modern Period',
    range: '15th Century CE – Present',
    description: 'Responses to colonial disruption, modernization, and the challenge of secular epistemology. Reform movements, synthesis thinkers, and new institutional forms.',
    entries: [
      {
        id: 'ahmad-sirhindi',
        name: 'Ahmad Sirhindi',
        title: 'Mujaddid Alf-i Thani',
        century: '16th–17th Century',
        region: 'South Asia',
        order: 'Naqshbandiyya',
        roles: ['Shaykh', 'Reformer', 'Scholar'],
        summary: 'The most significant reformer of the Naqshbandiyya. His critique of pantheistic interpretations of Sufism and his synthesis of juridical rigor with inner development shaped subsequent Islamic reform.',
        methodology: 'Wilayat-i Muhammadiyya (proximity to prophetic character) as the highest station; precise doctrinal engagement with Sufi metaphysics to correct deviations.',
        transmissionContribution: 'His Maktubat (533 letters) constitute one of the most important documents in Sufi intellectual history. His reform of the Naqshbandiyya shaped Central Asian and South Asian Islam.',
        keyWorks: ['Maktubat Imam Rabbani (3 volumes)'],
      },
      {
        id: 'shah-waliullah',
        name: 'Shah Waliullah Dehlawi',
        century: '18th Century',
        region: 'South Asia',
        order: 'Naqshbandiyya',
        roles: ['Scholar', 'Reformer', 'Shaykh'],
        summary: 'The most comprehensive Islamic reformer of 18th-century South Asia. His intellectual project integrated all major Sufi orders, reformed hadith scholarship, and articulated a systematic Islamic political economy.',
        methodology: 'Hujjat Allah al-Baligha — systematic rational justification of Islamic law and practice grounded in universal human welfare (maslaha).',
        transmissionContribution: 'His intellectual legacy shaped every subsequent South Asian Islamic reform movement including Deobandi, Barelwi, and modernist trends.',
        keyWorks: ['Hujjat Allah al-Baligha', 'Fuyud al-Haramayn', 'al-Tafhimat al-Ilahiyya'],
      },
      {
        id: 'ahmad-al-tijani',
        name: 'Ahmad al-Tijani',
        century: '18th–19th Century',
        region: 'North Africa',
        order: 'Tijaniyya',
        roles: ['Shaykh'],
        summary: 'Founder of the Tijaniyya, which became the largest Sufi order in West Africa. His simplified methodology and direct access model made Sufi practice accessible to mass populations.',
        methodology: 'Exclusive affiliation, simplified mandatory prayers (wazifa), and direct access to the founder\'s spiritual presence through the chain.',
        transmissionContribution: 'The Tijaniyya has over 100 million adherents, predominantly in West and North Africa. Its institutional form became a model for 19th-century Sufi expansion.',
        keyWorks: ['Jawahir al-Ma\'ani (compiled by disciples)'],
      },
    ],
  },
];

export type HeritageFilter<T> = T | 'all';

export function filterIntellectualEntries(
  era: string | null,
  region: HeritageRegion | null,
  field: HeritageField | null,
  impactLevel: ImpactLevel | null
): IntellectualEntry[] {
  const allEntries = INTELLECTUAL_ERAS.flatMap((e) => e.entries);
  return allEntries.filter((entry) => {
    if (era && !INTELLECTUAL_ERAS.find((e) => e.id === era)?.entries.includes(entry)) return false;
    if (region && entry.region !== region) return false;
    if (field && !entry.field.includes(field)) return false;
    if (impactLevel && entry.impactLevel !== impactLevel) return false;
    return true;
  });
}

export function filterSpiritualEntries(
  era: string | null,
  region: HeritageRegion | null,
  order: SufiOrder | null,
  role: SufiRole | null
): SpiritualEntry[] {
  const allEntries = SPIRITUAL_ERAS.flatMap((e) => e.entries);
  return allEntries.filter((entry) => {
    if (era && !SPIRITUAL_ERAS.find((e) => e.id === era)?.entries.includes(entry)) return false;
    if (region && entry.region !== region) return false;
    if (order && entry.order !== order) return false;
    if (role && !entry.roles.includes(role)) return false;
    return true;
  });
}

export const ALL_INTELLECTUAL_REGIONS: HeritageRegion[] = [
  'Arabian Peninsula', 'Persia & Iran', 'Central Asia', 'Al-Andalus',
  'North Africa', 'South Asia', 'Anatolia', 'Mesopotamia', 'Levant',
];

export const ALL_INTELLECTUAL_FIELDS: HeritageField[] = [
  'Mathematics', 'Astronomy', 'Medicine', 'Philosophy', 'Optics',
  'Chemistry', 'Geography', 'Physics', 'Engineering', 'Logic',
  'Jurisprudence', 'History', 'Linguistics', 'Architecture',
  'Agriculture', 'Sociology', 'Economics', 'Political Theory',
  'Education', 'Psychology', 'Cosmology', 'Navigation', 'Cartography',
];

export const ALL_IMPACT_LEVELS: ImpactLevel[] = ['Foundational', 'Significant', 'Formative'];

export const ALL_SUFI_ORDERS: SufiOrder[] = [
  'Qadiriyya', 'Naqshbandiyya', 'Chishtiyya', 'Shadhiliyya',
  'Mevleviyya', 'Suhrawardiyya', 'Tijaniyya', 'Rifaiyya', 'Multiple',
];

export const ALL_SUFI_ROLES: SufiRole[] = [
  'Shaykh', 'Scholar', 'Poet', 'Reformer', 'Jurist', 'Philosopher',
];
