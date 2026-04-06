export interface Discipline {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  description: string;
  ethicalTensions: string;
  sufiLens: string;
  reflectionPrompts: string[];
}

export interface DisciplineCategory {
  label: string;
  slug: string;
  disciplines: Discipline[];
}

export const DISCIPLINE_CATEGORIES: DisciplineCategory[] = [
  {
    label: 'Pure & Fundamental Sciences',
    slug: 'pure-sciences',
    disciplines: [
      {
        slug: 'physics',
        title: 'Physics',
        category: 'Pure & Fundamental Sciences',
        categorySlug: 'pure-sciences',
        description: 'The study of matter, energy, and the fundamental laws governing the physical universe — from subatomic particles to cosmological structure.',
        ethicalTensions: 'Physics confronts questions its own methods cannot resolve: the observer problem in quantum mechanics, the nature of consciousness as distinct from matter, the implications of determinism for moral agency, and the ethical governance of dual-use research.',
        sufiLens: 'Classical Sufi metaphysics posits a hierarchy of existence — from dense matter to pure intellect — that parallels modern physics\' spectrum from particle to field to consciousness. The concept of wujud (being) in Ibn Arabi\'s tradition offers a framework for understanding non-local correlations and the relationship between observer and observed.',
        reflectionPrompts: [
          'Where does physical law end and consciousness begin, and why does this boundary matter professionally?',
          'How does your theoretical framework shape what questions you are permitted to ask?',
          'What would it mean for scientific practice if consciousness were irreducible to physical process?',
        ],
      },
      {
        slug: 'theoretical-physics',
        title: 'Theoretical Physics',
        category: 'Pure & Fundamental Sciences',
        categorySlug: 'pure-sciences',
        description: 'The mathematical and conceptual foundations of physical reality — unified field theories, quantum gravity, and the structure of space-time.',
        ethicalTensions: 'Theoretical physics navigates the tension between mathematical elegance and empirical accountability. The pursuit of a "theory of everything" raises questions about whether comprehensiveness is achievable, and whether our categories of explanation are adequate to reality.',
        sufiLens: 'The Sufi tradition\'s concept of the Unity of Being (Wahdat al-Wujud) resonates with theoretical physics\' search for unification. Al-Ghazali\'s critique of causal necessity — that observed regularities are habitual rather than logically necessary — anticipates modern discussions of emergence and underdetermination.',
        reflectionPrompts: [
          'Is mathematical beauty a reliable guide to physical truth? What does this assumption reveal about the relationship between mind and reality?',
          'How do you navigate the limits of formalization without abandoning rigor?',
        ],
      },
      {
        slug: 'astrophysics',
        title: 'Astrophysics & Space Science',
        category: 'Pure & Fundamental Sciences',
        categorySlug: 'pure-sciences',
        description: 'The physics of celestial objects and the large-scale structure of the universe, including cosmology, stellar evolution, and exoplanetary science.',
        ethicalTensions: 'Astrophysics raises foundational questions about human significance, the ethics of space exploration and resource extraction, the search for extraterrestrial intelligence, and existential risk from cosmic events.',
        sufiLens: 'The Sufi cosmological tradition — particularly the works of Ibn Arabi and Mulla Sadra — situates the physical cosmos within a larger ontological hierarchy. The heavens in classical Islamic thought are not merely objects of observation but are integrated into a framework of contingency, purpose, and divine creativity.',
        reflectionPrompts: [
          'Does the vastness of the cosmos diminish or heighten the moral weight of human choices?',
          'How does contemplation of deep time affect your understanding of professional responsibility?',
        ],
      },
      {
        slug: 'mathematics',
        title: 'Mathematics',
        category: 'Pure & Fundamental Sciences',
        categorySlug: 'pure-sciences',
        description: 'The study of abstract structure, quantity, and relationship — the language through which physical and social sciences formalize their claims.',
        ethicalTensions: 'Mathematics confronts questions of platonic reality versus construction, the ethics of algorithmic systems, the use of mathematics to justify unjust policies through apparent objectivity, and the accessibility of mathematical knowledge.',
        sufiLens: 'Islamic civilization\'s contribution to mathematics — from algebra to combinatorics — was embedded in a worldview that saw number and proportion as ontological, not merely instrumental. The concept of mizan (balance and proportion) in Quranic tradition offers an ethical frame for mathematical application.',
        reflectionPrompts: [
          'When mathematical models are used to justify political or economic decisions, who bears responsibility for the assumptions embedded in the formalism?',
          'What is the relationship between mathematical certainty and epistemic humility?',
        ],
      },
      {
        slug: 'chemistry',
        title: 'Chemistry',
        category: 'Pure & Fundamental Sciences',
        categorySlug: 'pure-sciences',
        description: 'The science of matter at the molecular and atomic scale — its composition, transformation, and applications across industry, medicine, and materials.',
        ethicalTensions: 'Chemistry is inseparable from dual-use concerns: the same processes that produce life-saving pharmaceuticals can synthesize weapons. Questions of environmental contamination, intellectual property, and access to essential medicines are structurally embedded in the discipline.',
        sufiLens: 'The Islamic alchemical tradition — particularly in Jabir ibn Hayyan — integrated laboratory practice with metaphysical inquiry. The transformation of matter (istihala) was understood as a mirror of inner transformation. This lineage invites chemists to reflect on what is being transformed, and toward what end.',
        reflectionPrompts: [
          'How do you evaluate the moral weight of a discovery whose harm is probabilistic and diffuse?',
          'What obligations does professional expertise create in public policy contexts?',
        ],
      },
      {
        slug: 'earth-sciences',
        title: 'Earth Sciences',
        category: 'Pure & Fundamental Sciences',
        categorySlug: 'pure-sciences',
        description: 'The study of the Earth\'s structure, processes, and history — including geology, geochemistry, and the mechanisms of natural hazards.',
        ethicalTensions: 'Earth sciences are now inseparable from climate and extraction ethics: who owns geological resources, who bears the risk of natural hazards, and how scientific knowledge informs — or is suppressed by — industrial interests.',
        sufiLens: 'The Quranic concept of khalifa (stewardship) provides a framework for earth sciences that transcends both extractivism and passive preservation. The earth is entrusted, not owned — a position with substantive implications for professional practice.',
        reflectionPrompts: [
          'What does professional stewardship mean when your findings have direct extractive economic implications?',
          'How do you communicate scientific uncertainty to policymakers without being co-opted by either side?',
        ],
      },
      {
        slug: 'materials-science',
        title: 'Materials Science',
        category: 'Pure & Fundamental Sciences',
        categorySlug: 'pure-sciences',
        description: 'The design and characterization of new materials — from nanomaterials to biomaterials — with applications across engineering, medicine, and technology.',
        ethicalTensions: 'Materials science operates at the intersection of innovation and unknown risk. Novel materials often enter widespread use before their long-term toxicological, environmental, and social implications are understood.',
        sufiLens: 'The Sufi tradition\'s ethics of mastery (itqan) — doing work with excellence and precision — applies with particular force to materials design, where the consequences of professional decisions accumulate quietly across supply chains and ecosystems.',
        reflectionPrompts: [
          'What precautionary obligations does a materials scientist bear when long-term effects are genuinely unknown?',
          'How does the principle of professional excellence (itqan) change your approach to characterization and disclosure?',
        ],
      },
    ],
  },
  {
    label: 'Biological & Health Sciences',
    slug: 'health-sciences',
    disciplines: [
      {
        slug: 'medicine',
        title: 'Medicine',
        category: 'Biological & Health Sciences',
        categorySlug: 'health-sciences',
        description: 'The clinical practice and science of diagnosing, treating, and preventing human illness — at the intersection of biological science, ethics, and human relationship.',
        ethicalTensions: 'Medicine confronts structural inequity in access and outcomes, the commodification of care, end-of-life decisions, the limits of informed consent in conditions of cognitive impairment, and the erosion of therapeutic relationship under institutional pressure.',
        sufiLens: 'The physician-patient relationship in classical Islamic medicine — rooted in adab (disciplined relational ethics) — was understood as a sacred trust, not a commercial transaction. The physician\'s inner state was considered inseparable from clinical effectiveness. Avicenna\'s Canon embedded medicine within a philosophy of the soul.',
        reflectionPrompts: [
          'What does it mean to treat the patient rather than the disease, and what institutional forces work against this?',
          'How do you sustain ethical clarity when the system you work within is designed to undermine it?',
          'What is the relationship between your inner state and your clinical judgment?',
        ],
      },
      {
        slug: 'neuroscience',
        title: 'Neuroscience',
        category: 'Biological & Health Sciences',
        categorySlug: 'health-sciences',
        description: 'The scientific study of the nervous system — from molecular mechanisms to cognition, consciousness, and behavior.',
        ethicalTensions: 'Neuroscience sits at the edge of the hardest problem in science: the nature of consciousness. It raises questions about free will, criminal responsibility, cognitive enhancement, neuromarketing, and the privacy of mental states.',
        sufiLens: 'Sufi epistemology distinguishes between levels of knowing: sensory (hiss), rational (\'aql), and direct experiential knowing (kashf/dhawq). This hierarchy maps productively onto neuroscientific questions about the relationship between neural correlates and subjective experience — and highlights what the correlational method structurally cannot access.',
        reflectionPrompts: [
          'What does the "hard problem of consciousness" reveal about the limits of your methodological framework?',
          'How does understanding the neural basis of emotion change your ethical obligations in applied contexts?',
        ],
      },
      {
        slug: 'public-health',
        title: 'Public Health',
        category: 'Biological & Health Sciences',
        categorySlug: 'health-sciences',
        description: 'The science and practice of protecting and improving the health of communities through policy, education, and research.',
        ethicalTensions: 'Public health navigates tensions between individual liberty and collective welfare, between evidence-based intervention and community trust, and between global health equity and national resource allocation.',
        sufiLens: 'The concept of maslaha (public welfare) in Islamic jurisprudence offers a sophisticated framework for collective decision-making under uncertainty. The Sufi tradition\'s emphasis on the health of the community as inseparable from the health of the individual provides a relational rather than aggregate understanding of population health.',
        reflectionPrompts: [
          'How do you ethically justify policies that impose costs on individuals for collective benefit?',
          'What does trust require, and how is it rebuilt once broken?',
        ],
      },
      {
        slug: 'bioethics',
        title: 'Bioethics',
        category: 'Biological & Health Sciences',
        categorySlug: 'health-sciences',
        description: 'The philosophical examination of ethical questions arising from biology, medicine, and biotechnology.',
        ethicalTensions: 'Bioethics must integrate multiple frameworks — autonomy, beneficence, justice, non-maleficence — that frequently conflict. It operates in contexts of genuine moral uncertainty, where reasonable people disagree based on differing foundational commitments.',
        sufiLens: 'Classical Islamic ethics provides one of the world\'s most developed traditions of applied moral reasoning under uncertainty. The maqasid al-shariah (objectives of Islamic law) — preservation of life, reason, progeny, wealth, and dignity — offers a structured framework for bioethical analysis that operates from principle rather than case-by-case intuition.',
        reflectionPrompts: [
          'What foundational commitments do you bring to bioethical analysis, and how explicit are they?',
          'How do you engage genuinely with ethical frameworks rooted in traditions other than your own?',
        ],
      },
      {
        slug: 'psychiatry',
        title: 'Psychiatry',
        category: 'Biological & Health Sciences',
        categorySlug: 'health-sciences',
        description: 'The medical specialty addressing mental, emotional, and behavioral disorders — bridging biological, psychological, and social dimensions of suffering.',
        ethicalTensions: 'Psychiatry confronts the boundary between pathology and existential suffering, the use of diagnosis as social control, involuntary treatment, the limitations of biological reductionism, and the politics of psychiatric classification.',
        sufiLens: 'The Sufi tradition offers one of history\'s most sophisticated frameworks for working with inner states — distinguishing between states (ahwal) that are passing and stations (maqamat) that are stable; between normal grief and spiritual transformation; between ego dissolution as pathology and as developmental threshold.',
        reflectionPrompts: [
          'Where is the boundary between clinical disorder and profound suffering that does not require pathologizing?',
          'What does your diagnostic framework make visible, and what does it structurally exclude?',
        ],
      },
    ],
  },
  {
    label: 'Applied Sciences & Engineering',
    slug: 'engineering',
    disciplines: [
      {
        slug: 'artificial-intelligence',
        title: 'Artificial Intelligence',
        category: 'Applied Sciences & Engineering',
        categorySlug: 'engineering',
        description: 'The development of computational systems capable of performing tasks that require intelligence — from pattern recognition to reasoning, language, and autonomous decision-making.',
        ethicalTensions: 'AI development confronts questions of bias encoded in training data, accountability for algorithmic decisions, displacement of human labour, autonomous weapons, and the concentration of AI power in a small number of entities.',
        sufiLens: 'The Sufi tradition\'s concept of \'aql (intellect) as a faculty that transcends computation — that knows through presence rather than processing — raises fundamental questions about what AI can and cannot replicate. The ethics of khalifa (stewardship) applies with force: the engineer who builds systems that affect millions bears fiduciary responsibility that cannot be diffused across a team.',
        reflectionPrompts: [
          'What is the difference between intelligence and wisdom, and does your system\'s design reflect this distinction?',
          'How do you build accountability into systems whose decision processes are opaque even to their designers?',
          'What would it mean to build AI that serves human flourishing rather than engagement metrics?',
        ],
      },
      {
        slug: 'software-engineering',
        title: 'Software Engineering',
        category: 'Applied Sciences & Engineering',
        categorySlug: 'engineering',
        description: 'The systematic design, development, and maintenance of software systems — the infrastructure of modern institutional, commercial, and social life.',
        ethicalTensions: 'Software engineering embeds values in code that becomes invisible infrastructure. Questions of privacy by design, accessibility, security, and the ethics of addictive design patterns are structurally embedded in professional practice.',
        sufiLens: 'The principle of itqan — professional excellence done with full awareness of consequence — applies directly to software engineering. Code is not neutral; it encodes assumptions about users, relationships, and power. The Sufi tradition\'s emphasis on intentionality (niyyah) challenges the fiction of purely technical work.',
        reflectionPrompts: [
          'What values are embedded in the systems you build, and were they chosen deliberately?',
          'What is your professional responsibility when your employer\'s objectives conflict with user welfare?',
        ],
      },
      {
        slug: 'environmental-engineering',
        title: 'Environmental Engineering',
        category: 'Applied Sciences & Engineering',
        categorySlug: 'engineering',
        description: 'Engineering solutions to environmental challenges — water treatment, air quality, waste management, and remediation of contaminated systems.',
        ethicalTensions: 'Environmental engineers navigate tensions between cost-effective solutions and thoroughness, between client interests and community welfare, and between technical optimization and environmental justice.',
        sufiLens: 'The Quranic concept of khalifa — human stewardship of the earth — has direct implications for environmental engineering practice. The tradition\'s emphasis on not causing harm (la darar) and proportionality between intervention and need provides an ethical framework that precedes and supplements regulatory compliance.',
        reflectionPrompts: [
          'When technical feasibility and environmental justice diverge, what framework do you use to resolve the tension?',
          'How do you engage affected communities as more than stakeholders to be managed?',
        ],
      },
      {
        slug: 'cybersecurity',
        title: 'Cybersecurity',
        category: 'Applied Sciences & Engineering',
        categorySlug: 'engineering',
        description: 'The protection of digital systems, networks, and data from attack, damage, and unauthorized access.',
        ethicalTensions: 'Cybersecurity professionals hold knowledge that is inherently dual-use. Questions of surveillance, state-sponsored intrusion, the privacy-security tradeoff, and responsible disclosure create persistent ethical tensions without easy resolution.',
        sufiLens: 'The Sufi tradition\'s concept of amanah (trust and trustworthiness) is central to cybersecurity practice. The professional who holds access to others\' systems holds a fiduciary trust. The tradition\'s emphasis on transparency (sadiq) and its prohibition of deception structures a professional ethics beyond mere compliance.',
        reflectionPrompts: [
          'How do you navigate the ethical obligations of responsible disclosure when disclosure may cause harm?',
          'What does trustworthiness require of professionals who hold access to systems that affect millions?',
        ],
      },
      {
        slug: 'data-science',
        title: 'Data Science',
        category: 'Applied Sciences & Engineering',
        categorySlug: 'engineering',
        description: 'The extraction of knowledge from structured and unstructured data — integrating statistics, computation, and domain expertise.',
        ethicalTensions: 'Data science raises questions of privacy, consent, inferential harm, the reproduction of historical bias through predictive models, and the conversion of human behavior into extractable value without corresponding accountability.',
        sufiLens: 'The Islamic tradition\'s concept of \'ilm (knowledge) as carrying moral obligation — that to know is to be responsible — applies directly to data science. The practitioner who can infer sensitive facts from innocuous data bears a burden of restraint that data availability alone does not resolve.',
        reflectionPrompts: [
          'What is the relationship between what you can infer and what you are permitted to act on?',
          'How do you evaluate the ethics of a dataset that was legally obtained but whose subjects were unaware of its eventual use?',
        ],
      },
    ],
  },
  {
    label: 'Environmental & Sustainability Sciences',
    slug: 'environmental',
    disciplines: [
      {
        slug: 'climate-science',
        title: 'Climate Science',
        category: 'Environmental & Sustainability Sciences',
        categorySlug: 'environmental',
        description: 'The study of Earth\'s climate system — its drivers, variability, and the consequences of anthropogenic forcing.',
        ethicalTensions: 'Climate science navigates tensions between scientific communication and political pressure, between urgency and epistemic honesty about uncertainty, and between global responsibility and national self-interest.',
        sufiLens: 'The Quranic frame of mizan (cosmic balance) and fasad (corruption of the natural order) provides a theological basis for climate ethics that predates and complements modern environmental science. The tradition\'s concept of intergenerational responsibility — obligations to those not yet born — is structurally embedded in Islamic inheritance and stewardship ethics.',
        reflectionPrompts: [
          'How do you communicate risk under genuine uncertainty without either overstating or understating?',
          'What obligations do you bear to future generations who cannot consent to present decisions?',
        ],
      },
      {
        slug: 'sustainability-studies',
        title: 'Sustainability Studies',
        category: 'Environmental & Sustainability Sciences',
        categorySlug: 'environmental',
        description: 'The interdisciplinary study of sustainable development — integrating environmental, social, and economic systems in long-term frameworks.',
        ethicalTensions: 'Sustainability discourse can be co-opted by greenwashing, depoliticized into technocratic optimization, or deployed to defer justice claims. The concept of sustainability itself is contested between growth-oriented and steady-state interpretations.',
        sufiLens: 'Sufi thought offers a critique of consumption as an end in itself that is grounded in ontology rather than scarcity. The tradition\'s concept of zuhd (renunciation of excess, not of life) is not asceticism but proportionality — a professional ethics of sufficiency rather than maximization.',
        reflectionPrompts: [
          'What does professional integrity require when sustainability claims are more marketing than substance?',
          'How do you define sufficiency in a professional context structured around growth metrics?',
        ],
      },
      {
        slug: 'urban-planning',
        title: 'Urban Planning',
        category: 'Environmental & Sustainability Sciences',
        categorySlug: 'environmental',
        description: 'The design and regulation of land use, infrastructure, and spatial development in urban and regional contexts.',
        ethicalTensions: 'Urban planning decisions shape who can live where, under what conditions, and with access to what resources. Questions of displacement, gentrification, environmental justice, and the politics of participation are embedded in planning practice.',
        sufiLens: 'The Islamic city — with its integration of the mosque, market, court, and bath — embodied a theory of urban life as structured community, not mere aggregation. The concept of \'umran (civilizational order) in Ibn Khaldun provides a sociological and ethical framework for thinking about urban flourishing.',
        reflectionPrompts: [
          'Whose vision of the good city are you implementing, and whose has been excluded from the planning process?',
          'How do you navigate the gap between technical expertise and democratic legitimacy in planning decisions?',
        ],
      },
    ],
  },
  {
    label: 'Social Sciences',
    slug: 'social-sciences',
    disciplines: [
      {
        slug: 'economics',
        title: 'Economics',
        category: 'Social Sciences',
        categorySlug: 'social-sciences',
        description: 'The study of how individuals, institutions, and societies allocate scarce resources — encompassing markets, policy, development, and behavioral dimensions.',
        ethicalTensions: 'Economics operates under assumptions about human motivation and rationality that are empirically contestable and morally consequential. Questions of distributional justice, the commodification of essential goods, and the relationship between economic growth and human flourishing are built into the discipline\'s structure.',
        sufiLens: 'Islamic economic thought — particularly the prohibition of riba (interest) and the institution of zakat — reflects a coherent alternative theory of value, obligation, and circulation. The Sufi tradition\'s critique of hubb al-dunya (attachment to the world) is not anti-economic but rather a challenge to the conflation of wealth with worth.',
        reflectionPrompts: [
          'What theory of human motivation underlies your economic models, and what does it exclude?',
          'How do you evaluate the justice of market outcomes that are efficient but deeply unequal?',
          'What would economic practice look like if sufficiency rather than maximization were the operative norm?',
        ],
      },
      {
        slug: 'political-science',
        title: 'Political Science',
        category: 'Social Sciences',
        categorySlug: 'social-sciences',
        description: 'The study of political systems, power, governance, and the conditions for legitimate authority.',
        ethicalTensions: 'Political science navigates the tension between descriptive and normative work, between explaining power and challenging it. Questions of democratic legitimacy, the ethics of political violence, and the relationship between expertise and democratic accountability are structurally embedded.',
        sufiLens: "The Sufi tradition developed a sophisticated analysis of the corruption of political power and the conditions for just leadership. The concept of 'adl (justice) as a cosmological principle — not merely a social arrangement — provides a foundation for political ethics that transcends proceduralism.",
        reflectionPrompts: [
          'What obligations does political expertise create in contexts of democratic dysfunction?',
          'How do you maintain analytical integrity when your findings could be weaponized by actors you oppose?',
        ],
      },
      {
        slug: 'sociology',
        title: 'Sociology',
        category: 'Social Sciences',
        categorySlug: 'social-sciences',
        description: 'The study of social structure, institutions, and the dynamics of group life — from micro-interactions to macro-level systems.',
        ethicalTensions: 'Sociology confronts the tension between studying society and transforming it, between maintaining professional distance and bearing witness to structural harm. Questions of positionality, the ethics of research on vulnerable populations, and the use of sociological knowledge in policy are persistent challenges.',
        sufiLens: 'The Sufi tradition\'s understanding of social reality as shaped by the inner states of its members — that outer corruption is a reflection of inner disorder — provides a complementary frame to structural sociology. The concept of islah (social reform) in Islamic thought is grounded in personal and communal transformation, not merely systemic redesign.',
        reflectionPrompts: [
          'What does your methodological framework systematically exclude from view?',
          'What obligations does sociological knowledge create with respect to the communities you study?',
        ],
      },
      {
        slug: 'anthropology',
        title: 'Anthropology',
        category: 'Social Sciences',
        categorySlug: 'social-sciences',
        description: 'The comparative study of human societies, cultures, and evolution — across time and across the full range of human diversity.',
        ethicalTensions: 'Anthropology carries a colonial inheritance in its methods, institutions, and assumptions. Questions of representation, intellectual property of cultural knowledge, the ethics of studying communities without redistributing benefit, and the politics of indigeneity are unresolved.',
        sufiLens: 'The Sufi tradition\'s concept of fitra (primordial human nature) and its affirmation of cultural diversity as a sign (ayat) of divine creativity provides a framework for anthropology that is neither relativist nor universalist in the conventional sense. Ibn Battuta\'s intellectual openness to diverse Muslim cultures models an engaged comparative approach.',
        reflectionPrompts: [
          'What does epistemic humility require in the face of knowledge systems different from your own?',
          'How do you navigate between cultural relativism and universal ethical commitments in your research?',
        ],
      },
      {
        slug: 'international-relations',
        title: 'International Relations',
        category: 'Social Sciences',
        categorySlug: 'social-sciences',
        description: 'The study of relations between states and non-state actors in the international system — including diplomacy, security, development, and international law.',
        ethicalTensions: 'International relations confronts the tension between state interest and global justice, between sovereignty and humanitarian intervention, between realism as description and realism as prescription.',
        sufiLens: 'The classical Islamic concept of the ummah — a community that transcends political borders while acknowledging legitimate differences in law and custom — provides an alternative to both state-centric realism and abstract cosmopolitanism. The Sufi tradition\'s emphasis on dialogue (sohbet) as a form of civilizational exchange models international engagement as more than negotiation.',
        reflectionPrompts: [
          'What obligations does professional expertise in international relations create toward populations affected by state decisions?',
          'How do you engage with ethical frameworks rooted in non-Western political traditions without instrumentalizing them?',
        ],
      },
      {
        slug: 'development-studies',
        title: 'Development Studies',
        category: 'Social Sciences',
        categorySlug: 'social-sciences',
        description: 'The interdisciplinary study of development — economic, social, and political — in the Global South, with attention to poverty, inequality, and structural transformation.',
        ethicalTensions: 'Development studies must confront its own history as a discipline implicated in neo-colonial interventions. Questions of measurement, whose conception of development is operative, and the ethics of conditionality are foundational, not peripheral.',
        sufiLens: 'The Sufi tradition\'s concept of karama (dignity) as intrinsic to the human being — not contingent on economic status or productivity — challenges the metrics of development. The tradition\'s emphasis on self-sufficiency (isti\'na) and community mutual aid (ta\'awun) models development grounded in relational capacity rather than external transfer.',
        reflectionPrompts: [
          'Whose definition of flourishing is operative in the development frameworks you use?',
          'What does professional integrity require when institutional incentives conflict with community benefit?',
        ],
      },
    ],
  },
  {
    label: 'Law & Governance',
    slug: 'law-governance',
    disciplines: [
      {
        slug: 'legal-studies',
        title: 'Legal Studies',
        category: 'Law & Governance',
        categorySlug: 'law-governance',
        description: 'The academic study of law — its foundations, systems, interpretation, and relationship to justice, power, and society.',
        ethicalTensions: 'Law confronts the gap between legality and justice, between the letter and spirit of rules, between professional obligation to clients and broader social responsibility.',
        sufiLens: 'Islamic jurisprudence (fiqh) represents one of the world\'s most sophisticated traditions of systematic ethical reasoning under uncertainty. The Sufi tradition\'s engagement with the inner dimensions of law — its spirit (ruh) beyond its form — offers a corrective to the reduction of professional legal practice to technical compliance.',
        reflectionPrompts: [
          'What is the relationship between your professional obligation to a client and your broader obligation to justice?',
          'When the law as written produces unjust outcomes, what does professional integrity require?',
        ],
      },
      {
        slug: 'human-rights',
        title: 'Human Rights',
        category: 'Law & Governance',
        categorySlug: 'law-governance',
        description: 'The study and practice of rights inherent to all human beings — their philosophical foundations, legal codification, and enforcement mechanisms.',
        ethicalTensions: 'Human rights discourse navigates tensions between universalism and cultural particularity, between civil-political and social-economic rights, between state sovereignty and international accountability.',
        sufiLens: 'The Islamic tradition\'s concept of haqq (truth, right, claim) — which simultaneously names divine reality and human entitlement — provides a foundation for human rights that is grounded in ontology rather than convention. The Sufi emphasis on recognizing the divine presence in every human being (tajalli) provides a basis for unconditional human dignity.',
        reflectionPrompts: [
          'What grounds the universality of human rights in a world of genuine moral pluralism?',
          'How do you engage with non-Western frameworks for rights and dignity without dismissing or domesticating them?',
        ],
      },
      {
        slug: 'ethics-governance',
        title: 'Ethics & Governance',
        category: 'Law & Governance',
        categorySlug: 'law-governance',
        description: 'The study of ethical frameworks as applied to institutional governance — in corporate, public, and international contexts.',
        ethicalTensions: 'Governance ethics must navigate the gap between formal accountability structures and real responsibility, between compliance and integrity, between institutional self-interest and public trust.',
        sufiLens: 'The Sufi concept of muhasaba (rigorous self-accounting) has direct application to governance ethics. The tradition\'s emphasis on the alignment between inner state and outer action — that governance without inner refinement produces corruption regardless of structural design — challenges purely proceduralist approaches to institutional ethics.',
        reflectionPrompts: [
          'What is the relationship between personal ethical formation and institutional ethical culture?',
          'How do you create accountability structures that survive the departure of ethical individuals?',
        ],
      },
    ],
  },
  {
    label: 'Humanities & Intellectual Traditions',
    slug: 'humanities',
    disciplines: [
      {
        slug: 'philosophy',
        title: 'Philosophy',
        category: 'Humanities & Intellectual Traditions',
        categorySlug: 'humanities',
        description: 'The rigorous examination of fundamental questions about reality, knowledge, value, reason, and existence.',
        ethicalTensions: 'Philosophy confronts its own institutional tendencies toward insularity, the question of whether philosophical reasoning is culturally universal or tradition-dependent, and the relationship between professional philosophy and wisdom.',
        sufiLens: 'The Islamic philosophical tradition — from Al-Kindi and Al-Farabi through Ibn Rushd and Mulla Sadra — represents a continuous and substantive engagement with Greek, Persian, and Indian thought. Sufi metaphysics constitutes one of the world\'s most developed traditions of experiential epistemology, challenging the reduction of philosophy to conceptual analysis.',
        reflectionPrompts: [
          'What would it mean to philosophize from within a living tradition rather than analyzing traditions from outside?',
          'How does experiential knowing relate to — and challenge — propositional philosophical knowledge?',
        ],
      },
      {
        slug: 'comparative-religion',
        title: 'Comparative Religion',
        category: 'Humanities & Intellectual Traditions',
        categorySlug: 'humanities',
        description: 'The academic study of religious traditions — their origins, doctrines, practices, and mutual relationships.',
        ethicalTensions: 'Comparative religion navigates tensions between academic objectivity and personal commitment, between insider and outsider perspectives, between descriptive accuracy and normative evaluation.',
        sufiLens: 'The Sufi tradition has a long history of serious cross-tradition engagement — from Rumi\'s universal symbolism to Ibn Arabi\'s doctrine of the perennial wisdom (hikmah). This is not relativism but a sophisticated epistemology that distinguishes between universal principles and particular forms, inviting rigorous comparative work grounded in genuine encounter.',
        reflectionPrompts: [
          'How do you maintain scholarly integrity while respecting the lived significance of traditions you study?',
          'What does genuine encounter with another tradition require, beyond accurate description?',
        ],
      },
      {
        slug: 'ethics',
        title: 'Ethics',
        category: 'Humanities & Intellectual Traditions',
        categorySlug: 'humanities',
        description: 'The philosophical study of moral values, principles, and the foundations of right action.',
        ethicalTensions: 'Applied ethics must navigate the gap between theoretical frameworks and the complexity of actual decisions — where frameworks conflict, interests are entangled, and consequences are uncertain.',
        sufiLens: 'The Sufi tradition distinguishes between exoteric ethics (akhlaq al-zahir) — conduct — and the deeper cultivation of character (akhlaq al-batin). This integration of virtue, law, and inner transformation produces an ethical framework that is simultaneously rigorous and alive, avoiding both antinomianism and legalism.',
        reflectionPrompts: [
          'What is the relationship between knowing what is right and being able to do it consistently?',
          'How does the cultivation of inner character relate to the reliability of ethical judgment?',
        ],
      },
    ],
  },
  {
    label: 'Business & Leadership',
    slug: 'business-leadership',
    disciplines: [
      {
        slug: 'corporate-governance',
        title: 'Corporate Governance',
        category: 'Business & Leadership',
        categorySlug: 'business-leadership',
        description: 'The systems and processes by which corporations are directed, controlled, and held accountable.',
        ethicalTensions: 'Corporate governance navigates the gap between shareholder primacy and stakeholder obligations, between formal accountability and real responsibility, and between compliance culture and genuine ethical commitment.',
        sufiLens: 'The Sufi concept of amanah (trust) applied to institutional governance means that directors and executives are trustees of interests that extend beyond shareholders — to employees, communities, and future generations. The tradition\'s critique of israf (excess and waste) applies directly to executive compensation and resource allocation decisions.',
        reflectionPrompts: [
          'Who are the genuine beneficiaries of corporate governance, and how is this reflected in your accountability structures?',
          'What does professional integrity require when governance systems incentivize behavior you believe is wrong?',
        ],
      },
      {
        slug: 'organizational-leadership',
        title: 'Organizational Leadership',
        category: 'Business & Leadership',
        categorySlug: 'business-leadership',
        description: 'The study and practice of leading organizations — cultivating vision, culture, and the conditions for human flourishing in institutional contexts.',
        ethicalTensions: 'Leadership practice confronts questions about the ethics of influence, the relationship between effectiveness and manipulation, and the obligations of those who hold authority over others\' working lives.',
        sufiLens: 'The Sufi tradition\'s model of the shaykh — not as authoritarian controller but as one who has cultivated inner refinement and guides through exemplary presence — provides an alternative to both transactional and charismatic leadership models. The emphasis on khidma (service) as the foundation of authority inverts conventional hierarchical assumptions.',
        reflectionPrompts: [
          'What is the source of your authority as a leader, and what obligations does it create?',
          'How do you cultivate organizational cultures that are genuinely ethical rather than merely compliant?',
        ],
      },
      {
        slug: 'finance',
        title: 'Finance',
        category: 'Business & Leadership',
        categorySlug: 'business-leadership',
        description: 'The study and practice of capital allocation, risk management, and the financial systems through which economies function.',
        ethicalTensions: 'Finance confronts structural incentives toward short-termism, risk externalization, and the systematic extraction of value from productive to financial activity. Questions of systemic risk and the socialization of losses while profits are privatized are built into the profession\'s structure.',
        sufiLens: 'Islamic finance — built on the prohibition of riba and the requirement of risk-sharing — represents a systematic attempt to align financial practice with ethical principle. The Sufi tradition\'s understanding of wealth as amana (trust) rather than property reframes financial decisions as stewardship obligations.',
        reflectionPrompts: [
          'What is the purpose of capital allocation, and how does your professional practice advance or undermine it?',
          'How do you evaluate financial products whose risks and rewards are distributed across parties with unequal information?',
        ],
      },
    ],
  },
  {
    label: 'Interdisciplinary & Emerging Fields',
    slug: 'interdisciplinary',
    disciplines: [
      {
        slug: 'consciousness-studies',
        title: 'Consciousness Studies',
        category: 'Interdisciplinary & Emerging Fields',
        categorySlug: 'interdisciplinary',
        description: 'The interdisciplinary investigation of subjective experience — integrating neuroscience, philosophy, psychology, and contemplative traditions.',
        ethicalTensions: 'Consciousness studies confronts the inadequacy of purely third-person methods for a fundamentally first-person phenomenon, the risk of co-opting contemplative traditions for secular therapeutic purposes, and the implications of different theories of consciousness for moral status.',
        sufiLens: 'The Sufi tradition represents one of the world\'s most systematic empirical traditions of consciousness investigation — with a developed cartography of states, stages, and the conditions for their cultivation. This is not metaphor but a disciplined methodology that takes first-person evidence seriously as a category of knowledge.',
        reflectionPrompts: [
          'What methodologies are adequate to the study of consciousness, and what do third-person methods structurally exclude?',
          'What does genuine integration of contemplative and scientific approaches require — beyond terminology borrowing?',
        ],
      },
      {
        slug: 'systems-theory',
        title: 'Systems Theory',
        category: 'Interdisciplinary & Emerging Fields',
        categorySlug: 'interdisciplinary',
        description: 'The study of complex systems — how components interact to produce emergent properties, and how such systems self-organize, adapt, and transform.',
        ethicalTensions: 'Systems thinking must navigate the tension between holistic analysis and actionable intervention, between acknowledging complexity and providing guidance for decision-makers, and between descriptive systems analysis and normative systems design.',
        sufiLens: 'Ibn Khaldun\'s theory of \'asabiyya (social cohesion) represents one of history\'s first systematic social systems theories. The Sufi understanding of the cosmos as a hierarchically integrated whole — in which each level reflects the properties of higher and lower levels — provides a metaphysical framework for systems thinking that precedes modern complexity science.',
        reflectionPrompts: [
          'How does working with complex systems change your relationship to prediction and control?',
          'What ethical obligations does systems-level understanding create with respect to unintended consequences?',
        ],
      },
      {
        slug: 'ai-governance',
        title: 'AI Governance',
        category: 'Interdisciplinary & Emerging Fields',
        categorySlug: 'interdisciplinary',
        description: 'The emerging field of policy, regulation, and institutional design for artificial intelligence — addressing safety, accountability, and the alignment of AI systems with human values.',
        ethicalTensions: 'AI governance must navigate the gap between technical expertise and democratic legitimacy, between the pace of development and the pace of institutional adaptation, and between national competitive interests and global safety.',
        sufiLens: 'The Sufi tradition\'s concept of \'aql (intellect) as a faculty that must be cultivated through discipline — not merely deployed — applies to AI governance with particular force. The tradition\'s understanding of knowledge as carrying obligation (\'ilm yujib al-\'amal) challenges governance frameworks that separate capability from responsibility.',
        reflectionPrompts: [
          'How do you design governance for capabilities that neither regulators nor developers fully understand?',
          'What does a genuinely multi-civilizational approach to AI ethics and governance require?',
        ],
      },
      {
        slug: 'digital-ethics',
        title: 'Digital Ethics',
        category: 'Interdisciplinary & Emerging Fields',
        categorySlug: 'interdisciplinary',
        description: 'The ethical examination of digital technologies — social media, surveillance, algorithmic systems, and the reshaping of information environments.',
        ethicalTensions: 'Digital ethics confronts the systematic erosion of privacy as a social norm, the weaponization of attention, the amplification of extremism through engagement optimization, and the concentration of informational power.',
        sufiLens: 'The Sufi tradition\'s ethics of speech (adab al-kalam) — the understanding that what is communicated carries moral weight beyond its content — provides a framework for digital communication ethics grounded in character rather than compliance. The concept of fitna (social disruption and harm) as a category of moral analysis is directly applicable to platform design decisions.',
        reflectionPrompts: [
          'What does responsibility require when your platform\'s design has predictable harmful effects at scale?',
          'How do you evaluate the ethics of systems that aggregate individually minor harms into structural damage?',
        ],
      },
    ],
  },
];

export function getAllDisciplines(): Discipline[] {
  return DISCIPLINE_CATEGORIES.flatMap((cat) => cat.disciplines);
}

export function getDisciplineBySlug(slug: string): Discipline | undefined {
  return getAllDisciplines().find((d) => d.slug === slug);
}

export function getCategoryBySlug(slug: string): DisciplineCategory | undefined {
  return DISCIPLINE_CATEGORIES.find((c) => c.slug === slug);
}
