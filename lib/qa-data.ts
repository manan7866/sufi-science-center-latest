export interface QAItem {
  question: string;
  answer: string;
}

export interface QACategory {
  category: string;
  slug: string;
  questions: QAItem[];
}

export const qaData: QACategory[] = [
  {
    category: "Institute & Foundations",
    slug: "institute-foundations",
    questions: [
      {
        question: "What is the Sufi Science Center USA?",
        answer:
          "The Sufi Science Center USA is a structured research and inquiry initiative operating under the Dr. Kumar Foundation USA. It functions as a research civilization node — a platform that integrates Sufi intellectual tradition with contemporary scientific methodologies to advance the study of consciousness, transformation, and human development.",
      },
      {
        question: "Is this a spiritual organization or an academic institution?",
        answer:
          "Neither precisely. The Center positions itself as a research civilization node — distinct from a religious body, a devotional organization, or a conventional academic department. It maintains intellectual rigor, scholarly independence, and applies systematic methodologies while drawing from Sufi epistemology and civilizational heritage.",
      },
      {
        question: "What tradition does the Center draw from?",
        answer:
          "The primary intellectual and historical foundation is the Kashmiri Sufi tradition, with research scope extending across South Asia, Central Asia, the Middle East, and sub-Saharan Africa. The Center engages the full geographic and temporal breadth of Sufi civilization as an object of serious scholarly inquiry.",
      },
      {
        question: "Who founded the Center and what is the founding vision?",
        answer:
          "The Center was founded by Dr. Kumar, whose intellectual framework integrates Sufi metaphysics, consciousness studies, and systems-based inquiry. The founding intent was to create a rigorous, non-sectarian platform for investigating inner transformation without reducing it to religious practice or dismissing it as unscientific.",
      },
      {
        question: "What does 'Foundational Studies' refer to on this site?",
        answer:
          "Foundational Studies encompasses the historical and biographical architecture of Sufi civilization — specifically the documented lineages, biographical profiles of saints and scholars, regional transmission routes, and thematic frameworks that constitute the primary scholarly record. This section is a structured reference database, not a devotional archive.",
      },
    ],
  },
  {
    category: "Research & Methodology",
    slug: "research-methodology",
    questions: [
      {
        question: "What research methodologies does the Center use?",
        answer:
          "The Center employs a multi-method approach that combines historical textual analysis, comparative religion studies, phenomenological inquiry, systems thinking, and empirical assessment. Where applicable, quantitative frameworks are integrated with qualitative depth approaches to ensure methodological integrity.",
      },
      {
        question: "Does the Center publish peer-reviewed research?",
        answer:
          "The Center produces research outputs including working papers, analytical frameworks, and structured reports. The publication standards applied are informed by academic peer-review norms. Formal journal publications, white papers, and collaborative outputs are developed through the Research Publications section of this site.",
      },
      {
        question: "How are research topics selected?",
        answer:
          "Research directions emerge from the intersection of three criteria: civilizational relevance (topics of historical and cultural significance within Sufi traditions), contemporary applicability (areas where Sufi frameworks offer productive insight into present-day questions), and methodological tractability (topics where rigorous inquiry is feasible).",
      },
      {
        question: "What is the role of Personal Assessment in the research framework?",
        answer:
          "Personal Assessment tools serve dual functions: they offer participants a structured self-diagnostic instrument for understanding their current developmental orientation, and they generate anonymized aggregate data that informs the Center's research into developmental stages and inner transformation patterns.",
      },
      {
        question: "How does the Center handle interdisciplinary scope?",
        answer:
          "The Knowledge Systems section of this site maps the interdisciplinary terrain the Center engages — spanning consciousness studies, quantum foundations, complex systems, psychology, epistemology, and advanced technology. These are not peripheral interests but structured domains of inquiry that inform the Center's theoretical architecture.",
      },
    ],
  },
  {
    category: "Inner Development",
    slug: "inner-development",
    questions: [
      {
        question: "What is the Inner Development framework?",
        answer:
          "Inner Development at the Center refers to a structured, stage-based model of psychological and spiritual transformation drawn from Sufi developmental frameworks. It is not a self-help program. It is a systematic inquiry into the stations, states, and transformations that characterize the Sufi path of consciousness development.",
      },
      {
        question: "What are the Stations of the Path?",
        answer:
          "The Stations of the Path (Maqamat) are discrete developmental thresholds documented within classical Sufi literature and mapped by scholars across multiple lineages. The Center studies these stations as a structured developmental taxonomy, examining their psychological correlates and comparative equivalents across traditions.",
      },
      {
        question: "What is the Sufi Chain Adoption pathway?",
        answer:
          "Sufi Chain Adoption refers to formal transmission of knowledge and practice within an authenticated lineage. This pathway connects participants to a living chain of teachers traceable to historical masters. The Center documents this process academically and facilitates introductions where appropriate, subject to eligibility and formal review.",
      },
      {
        question: "What does mentorship involve at the Center?",
        answer:
          "Mentorship at the Center is an applied guidance relationship designed to support serious practitioners engaged with the Inner Development framework. It is structured, not informal — involving defined orientations, developmental mapping, and periodic reflection. Mentorship is not universally available and is subject to formal application and assessment.",
      },
      {
        question: "What is Wazeefia and how does it relate to practice?",
        answer:
          "Wazeefia refers to a prescribed set of contemplative practices assigned within specific Sufi lineages. The Center contextualizes Wazeefia practices within a broader developmental framework, documenting their function, sequencing, and reported effects as part of its practice-to-research pipeline.",
      },
      {
        question: "What are Inner Development Circles?",
        answer:
          "Inner Development Circles are structured group inquiry sessions facilitated by the Center. They are designed for participants at a defined stage of engagement who wish to explore developmental frameworks in a collaborative setting. They are not open public events — participation is structured and context-dependent.",
      },
    ],
  },
  {
    category: "Scholarly Dialogues",
    slug: "scholarly-dialogues",
    questions: [
      {
        question: "What are Scholarly Dialogues at the Center?",
        answer:
          "Scholarly Dialogues are structured intellectual exchanges produced by the Center across multiple formats: Hard Inquiry sessions, Insight Interviews, Applied Practices discussions, and thematic Dialogue Series. Each format serves a distinct purpose in the broader knowledge production and dissemination architecture.",
      },
      {
        question: "What is the Hard Inquiry format?",
        answer:
          "Hard Inquiry sessions are rigorous adversarial dialogues in which foundational claims within Sufi epistemology, consciousness research, or inner development theory are subjected to structured critical examination. The format is designed to stress-test frameworks rather than affirm them.",
      },
      {
        question: "What is an Insight Interview?",
        answer:
          "Insight Interviews are long-form intellectual conversations with scholars, researchers, and practitioners whose work intersects with the Center's research domains. They are designed to surface nuanced perspectives, disciplinary expertise, and experience-based insight that cannot be captured in standard academic formats.",
      },
      {
        question: "How are dialogue participants selected?",
        answer:
          "Participants in dialogues are selected based on documented expertise, scholarly credibility, and relevance to the specific research question under examination. The Center does not invite participants on the basis of institutional affiliation or popularity. Relevance and intellectual rigor are the primary criteria.",
      },
      {
        question: "How can I apply to participate in a dialogue?",
        answer:
          "Applications for Insight Interview participation are available through the dedicated application page within the Scholarly Dialogues section. Selection is not guaranteed and is subject to editorial review. The Center evaluates applicants against the specific thematic requirements of upcoming sessions.",
      },
    ],
  },
  {
    category: "Governance & Ethics",
    slug: "governance-ethics",
    questions: [
      {
        question: "What is the governance structure of the Center?",
        answer:
          "The Sufi Science Center operates under the governance of the Dr. Kumar Foundation USA, with an independent advisory board providing oversight. The governance structure separates operational direction from editorial and research independence, ensuring that research outputs are not subject to institutional or funding pressures.",
      },
      {
        question: "How does the Center ensure intellectual independence?",
        answer:
          "Intellectual independence is maintained through a formal separation between sponsorship, governance, and research output. The Center's ethics framework explicitly prohibits the subordination of research findings to institutional, commercial, or ideological interests. This framework is documented in the Ethics section of the Institute pages.",
      },
      {
        question: "Does the Center have a formal ethics framework?",
        answer:
          "Yes. The Center maintains a written ethics framework that governs research conduct, participant engagement, data use, publication standards, and institutional representation. This framework is available through the Institute Ethics page and is reviewed periodically by the advisory board.",
      },
      {
        question: "Is the Center affiliated with any political or religious body?",
        answer:
          "No. The Center maintains strict non-affiliation with political parties, government bodies, and sectarian religious organizations. While it draws on Sufi intellectual tradition, it does not represent, promote, or affiliate with any particular Sufi order, school, or movement as an institution.",
      },
      {
        question: "Who serves on the advisory board?",
        answer:
          "The advisory board composition is detailed in the Board section of the Institute pages. Members are selected for their scholarly, professional, or civic expertise relevant to the Center's research domains. Board members serve in an advisory capacity and do not direct day-to-day operations or editorial decisions.",
      },
    ],
  },
  {
    category: "Community & Participation",
    slug: "community-participation",
    questions: [
      {
        question: "How can I engage with the Center?",
        answer:
          "Engagement pathways include: participating in dialogues (via application), contributing to research (through the Contribute section), volunteering specific skills, applying for mentorship or inner development programs, or supporting the Center through membership or donation. Each pathway has defined entry criteria.",
      },
      {
        question: "What volunteer opportunities are available?",
        answer:
          "Volunteer roles at the Center span research support, documentation, translation, event coordination, media production, and knowledge infrastructure. Volunteer positions are posted through the Institute section and are matched to specific project requirements rather than maintained as permanent open positions.",
      },
      {
        question: "How can researchers or scholars collaborate with the Center?",
        answer:
          "Institutional collaborations follow a formal process initiated through the Collaborations page. The Center evaluates partnership proposals against shared research interests, methodological compatibility, and ethical alignment. Exploratory conversations can be requested through the contact mechanism on that page.",
      },
      {
        question: "Is participation in Inner Development programs open to everyone?",
        answer:
          "Entry into structured Inner Development programs — including mentorship, circles, and chain adoption pathways — is governed by a formal application and assessment process. This is not a restriction of access for its own sake; it reflects the developmental appropriateness requirements of the frameworks themselves.",
      },
      {
        question: "How does the Master-Seeker relationship work?",
        answer:
          "The Master-Seeker relationship is a formalized developmental bond documented across Sufi lineages. The Center maps this relationship academically and, for participants in advanced programs, facilitates structured introduction where lineage context and individual readiness have been evaluated. It is not an informal arrangement.",
      },
    ],
  },
  {
    category: "Media & Publications",
    slug: "media-publications",
    questions: [
      {
        question: "What is SufiPulse Studio USA?",
        answer:
          "SufiPulse Studio USA is the Center's media production unit, responsible for audio and audio-visual content that presents Sufi musical, poetic, and contemplative traditions in a contemporary production context. It operates as a cultural documentation and creative platform, not a commercial record label.",
      },
      {
        question: "What is the Sacred Kalam Library?",
        answer:
          "The Sacred Kalam Library is a curated digital archive of sacred poetry, devotional verse, and mystical literary texts from across the Sufi tradition. Entries are documented with scholarly context — historical background, lineage attribution, and thematic classification — to maintain archival rather than merely devotional utility.",
      },
      {
        question: "What standards govern the Sacred Kalam curation process?",
        answer:
          "Entries in the Sacred Kalam Library are reviewed for historical provenance, attribution accuracy, and thematic integrity before inclusion. The curation process is informed by textual scholarship rather than popular reception. Disputed attributions are noted and unverified material is excluded.",
      },
      {
        question: "How are research publications reviewed before release?",
        answer:
          "Research publications produced by the Center undergo internal review against defined methodological and editorial standards. Collaborative publications involving external scholars are subject to co-review processes. The Center does not publish speculative content without appropriate epistemic qualification.",
      },
      {
        question: "Can I contribute to the Center's publications or media?",
        answer:
          "Submission of scholarly contributions is managed through the Contribute section of the site. The submission portal includes contribution guidelines, terms of engagement, and a formal review process. Unsolicited contributions are reviewed on a rolling basis.",
      },
    ],
  },
  {
    category: "Digital Access & Portal",
    slug: "digital-access-portal",
    questions: [
      {
        question: "What is My Portal and who is it for?",
        answer:
          "My Portal is a private, authenticated digital environment for individuals formally engaged with the Center's programs. It provides access to personal development tracking, reflection journaling, program resources, dialogue transcripts, and account management. It is not a general-access member area.",
      },
      {
        question: "How do I create a portal account?",
        answer:
          "Portal accounts are provisioned through the formal registration process on the Portal page. Account creation requires email verification. Access to specific portal features — such as mentorship resources or program materials — is gated by program enrollment status, not by account creation alone.",
      },
      {
        question: "What data does the Center collect through the Portal?",
        answer:
          "The Portal collects account credentials, program engagement data, reflection journal entries (which are private to the user), and interaction records with platform features. The Center's data use is governed by its Digital Ethics policy. Data is not shared with third parties, sold, or used for commercial purposes.",
      },
      {
        question: "Is Personal Assessment data kept confidential?",
        answer:
          "Assessment responses are treated as confidential. Individual results are accessible only to the participant. Aggregate, anonymized data drawn from assessment responses may be used for research purposes under the Center's data ethics framework. No personally identifiable information is used in research outputs.",
      },
      {
        question: "What is the Surah Progress Tracker in the Portal?",
        answer:
          "The Surah Progress Tracker is a structured study tool within the Portal that supports systematic engagement with Quranic commentary and interfaith scripture studies. It allows participants enrolled in relevant programs to log and track their progress through assigned commentary materials.",
      },
      {
        question: "Can I access Portal features without being enrolled in a program?",
        answer:
          "Basic Portal functionality — including account management, reflection journaling, and public-access resources — is available to all registered users. Advanced features tied to specific programs require formal enrollment. The Portal distinguishes clearly between open and gated content within each user's dashboard.",
      },
    ],
  },
  {
    category: "Institutional Relationships",
    slug: "institutional-relationships",
    questions: [
      {
        question: "What is the Dr. Kumar Foundation USA?",
        answer:
          "The Dr. Kumar Foundation USA is the parent institutional body under which the Sufi Science Center operates. It provides governance, legal standing, and institutional infrastructure. The Foundation's broader mission encompasses education, cultural preservation, and research into consciousness and human development.",
      },
      {
        question: "What is Purple Soul Collective by DKC?",
        answer:
          "Purple Soul Collective by DKC (PSC by DKC) is the ecommerce and creative expression platform affiliated with the Center's institutional ecosystem. It operates as a culturally grounded merchandise and artisan commerce channel, distinct from the research and educational functions of the Sufi Science Center itself.",
      },
      {
        question: "Are the Center's institutional relationships disclosed?",
        answer:
          "Yes. The Center maintains a formal Transparency and Affiliation disclosure available through the Institute section. This discloses parent body relationships, funding sources, advisory affiliations, and partnership arrangements. The Center is committed to institutional transparency as a condition of its scholarly credibility.",
      },
      {
        question: "Does the Center partner with other universities or research institutions?",
        answer:
          "The Center pursues collaborative relationships with academic institutions, research organizations, and civil society bodies where shared research interests exist. Current partnerships and collaboration frameworks are documented in the Institutional Collaborations section. New partnerships are subject to a formal due diligence process.",
      },
      {
        question: "What is the Center's relationship to global Sufi networks?",
        answer:
          "The Center maintains research relationships with Sufi intellectual and cultural networks across Kashmir, South Asia, Central Asia, the Middle East, and Africa. These are scholarly and documentary relationships, not organizational affiliations. The Center studies and documents these networks rather than representing them institutionally.",
      },
    ],
  },
];
