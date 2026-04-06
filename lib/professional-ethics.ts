export interface ProfessionCard {
  id: string;
  title: string;
  category: string;
  description: string;
  spiritualOrientation: string;
  ethicalAxis: string[];
  psychologicalDiscipline: string;
  commonDistortions: string[];
  linkedDomains: { label: string; slug: string }[];
}

export interface ProfessionCategory {
  id: string;
  title: string;
  description: string;
  professions: ProfessionCard[];
}

export const PROFESSION_CATEGORIES: ProfessionCategory[] = [
  {
    id: 'governance',
    title: 'Governance & Public Authority',
    description: 'Power amplifies the ego faculty. Sufi ethics approaches authority as delegated trust, not personal dominion.',
    professions: [
      {
        id: 'statesman',
        title: 'The Statesman',
        category: 'governance',
        description: 'Governance as amanah (trust), not dominion. Authority delegated by society demands proportional restraint of self-interest.',
        spiritualOrientation: 'Governance is a trust (amanah) delegated by the community, not a domain of personal will. The statesman holds authority on behalf of those governed, not over them.',
        ethicalAxis: ['Justice (ʿadl)', 'Restraint of ego (qahr al-nafs)', 'Public accountability (amana)', 'Impartiality'],
        psychologicalDiscipline: 'Emotional regulation under institutional pressure; resistance to power inflation and self-justification.',
        commonDistortions: ['Authority mistaken for personal entitlement', 'Policy shaped by ego rather than principle', 'Public good subordinated to factional interest'],
        linkedDomains: [{ label: 'Law & Governance', slug: 'law-governance' }, { label: 'Social Sciences', slug: 'social-sciences' }],
      },
      {
        id: 'administrator',
        title: 'The Administrator',
        category: 'governance',
        description: 'Institutional execution of policy demands meticulous integrity in the absence of visible oversight. Competence becomes an ethical obligation.',
        spiritualOrientation: 'Administrative work is the ethics of diligence in service. Every procedural decision carries moral weight proportional to its impact on those served.',
        ethicalAxis: ['Procedural integrity', 'Diligence (itqan)', 'Consistency across constituents', 'Non-corruption'],
        psychologicalDiscipline: 'Sustained attention and impartiality across repetitive tasks; resistance to habituation and moral fatigue.',
        commonDistortions: ['Bureaucratic indifference masking as neutrality', 'Rule-following used to avoid moral responsibility', 'Institutional loyalty over justice'],
        linkedDomains: [{ label: 'Law & Governance', slug: 'law-governance' }, { label: 'Business & Leadership', slug: 'business-leadership' }],
      },
      {
        id: 'judge',
        title: 'The Judge',
        category: 'governance',
        description: 'Judicial authority requires the calibration of reason under emotional and social pressure. Impartiality is a sustained spiritual discipline, not a default state.',
        spiritualOrientation: 'Judgment is the most concentrated form of delegated authority. Its integrity depends on continuous inner calibration against personal bias and social influence.',
        ethicalAxis: ['Impartiality', 'Proportionality', 'Due process as ethical practice', 'Intellectual honesty'],
        psychologicalDiscipline: 'Active resistance to confirmation bias; detachment from social pressure while maintaining compassion.',
        commonDistortions: ['Precedent used to avoid fresh moral analysis', 'Social hierarchy influencing outcome', 'Legal correctness mistaken for ethical correctness'],
        linkedDomains: [{ label: 'Law & Governance', slug: 'law-governance' }, { label: 'Humanities & Intellectual Traditions', slug: 'humanities' }],
      },
    ],
  },
  {
    id: 'commerce',
    title: 'Commerce & Economy',
    description: 'Wealth amplifies the attachment faculty. Sufi ethics frames commerce as a domain of ethical testing where intention governs transaction.',
    professions: [
      {
        id: 'business-leader',
        title: 'The Business Leader',
        category: 'commerce',
        description: 'Commerce becomes a site of ethical testing where intention governs transaction and restraint defines integrity. Profit is permissible; exploitation is not.',
        spiritualOrientation: 'The marketplace is a domain of moral discipline. Commercial success that preserves conscience is a higher achievement than profit that erodes it.',
        ethicalAxis: ['Honest dealing (sidq)', 'Fair exchange', 'Prohibition of exploitation', 'Zakat consciousness'],
        psychologicalDiscipline: 'Detachment from accumulation as identity; capacity to forgo gain that violates principle.',
        commonDistortions: ['Profit maximization used to justify harm', 'Market norms mistaken for ethical permission', 'Wealth conflated with worth'],
        linkedDomains: [{ label: 'Business & Leadership', slug: 'business-leadership' }, { label: 'Social Sciences', slug: 'social-sciences' }],
      },
      {
        id: 'financial-steward',
        title: 'The Financial Steward',
        category: 'commerce',
        description: 'Financial management of shared resources carries custodial responsibility. Stewardship ethics precede fiduciary ethics.',
        spiritualOrientation: 'Resources under management are held in trust. The steward\'s obligation is preservation and growth within ethical constraint, not yield maximisation alone.',
        ethicalAxis: ['Custodial responsibility', 'Transparency', 'Avoidance of riba and gharar', 'Long-term orientation'],
        psychologicalDiscipline: 'Resistance to short-term incentive bias; capacity to carry risk without anxiety-driven decisions.',
        commonDistortions: ['Client interest subordinated to fee structure', 'Complexity used to obscure ethical responsibility', 'Performance metrics replacing ethical benchmarks'],
        linkedDomains: [{ label: 'Business & Leadership', slug: 'business-leadership' }, { label: 'Law & Governance', slug: 'law-governance' }],
      },
    ],
  },
  {
    id: 'knowledge-education',
    title: 'Knowledge & Education',
    description: 'Knowledge amplifies the pride faculty. The ethics of teaching require the continual restraint of intellectual authority.',
    professions: [
      {
        id: 'teacher',
        title: 'The Teacher',
        category: 'knowledge-education',
        description: 'Teaching is the transmission of structured understanding. Its ethical core is the subordination of the teacher\'s need for acknowledgment to the student\'s actual development.',
        spiritualOrientation: 'The teacher is a transmitter, not a proprietor, of knowledge. Teaching\'s highest form is the production of students who surpass their teachers.',
        ethicalAxis: ['Intellectual humility', 'Adaptation to student capacity', 'Non-coercive transmission', 'Clarity over complexity'],
        psychologicalDiscipline: 'Ego-restraint when knowledge confers authority; resistance to dependency-formation between student and teacher.',
        commonDistortions: ['Teaching structured to confirm teacher\'s views', 'Student compliance mistaken for understanding', 'Knowledge withheld to maintain authority'],
        linkedDomains: [{ label: 'Humanities & Intellectual Traditions', slug: 'humanities' }, { label: 'Social Sciences', slug: 'social-sciences' }],
      },
      {
        id: 'scholar',
        title: 'The Scholar',
        category: 'knowledge-education',
        description: 'Scholarly inquiry operates under the ethical obligation of truth-seeking above position-defending. The scholar\'s instrument is reason under discipline.',
        spiritualOrientation: 'Scholarship is a form of worship when it is genuinely truth-oriented. The scholar who defends error to protect status has abandoned the scholar\'s function.',
        ethicalAxis: ['Intellectual honesty', 'Epistemic humility', 'Acknowledgment of uncertainty', 'Public benefit orientation'],
        psychologicalDiscipline: 'Detachment from conclusions; capacity to change position under evidence without self-concept disruption.',
        commonDistortions: ['Credentialism used to close inquiry', 'Specialisation used to avoid cross-disciplinary accountability', 'Publication metrics replacing contribution quality'],
        linkedDomains: [{ label: 'Humanities & Intellectual Traditions', slug: 'humanities' }, { label: 'Interdisciplinary & Emerging Fields', slug: 'interdisciplinary' }],
      },
    ],
  },
  {
    id: 'science-technology',
    title: 'Science & Technology',
    description: 'Technical work amplifies the control faculty. The engineer and developer operate within systems that extend human agency; this extension requires proportional ethical calibration.',
    professions: [
      {
        id: 'developer',
        title: 'The Developer',
        category: 'science-technology',
        description: 'Software development is the design of decision-making infrastructure at scale. Code embeds values; the developer\'s ethical obligation extends beyond functionality.',
        spiritualOrientation: 'The developer constructs systems that affect human behaviour at mass scale. Ikhlas (sincerity of intention) in technical work means building what genuinely serves, not merely what functions.',
        ethicalAxis: ['Privacy as principle', 'Informed consent in design', 'Resistance to engagement-optimisation over wellbeing', 'Algorithmic fairness'],
        psychologicalDiscipline: 'Muraqabah (self-observation): continuous monitoring of the gap between intended and actual effect of built systems.',
        commonDistortions: ['Technical success mistaken for ethical success', 'User engagement metrics replacing user benefit metrics', 'Complexity used to diffuse responsibility'],
        linkedDomains: [{ label: 'Applied Sciences & Engineering', slug: 'engineering' }, { label: 'Interdisciplinary & Emerging Fields', slug: 'interdisciplinary' }],
      },
      {
        id: 'ai-researcher',
        title: 'The AI Researcher',
        category: 'science-technology',
        description: 'AI research operates at the boundary of human cognitive sovereignty. Its ethical implications require analytical frameworks beyond standard research ethics.',
        spiritualOrientation: 'Building systems that model or replicate aspects of cognition, reason, and judgment requires the deepest ethical scrutiny of intent, design, and deployment context.',
        ethicalAxis: ['Epistemic accountability', 'Transparency in capability representation', 'Long-range consequence analysis', 'Power concentration resistance'],
        psychologicalDiscipline: 'Resistance to the messianic narrative of technological salvation; sustained examination of whose interests are served by each capability.',
        commonDistortions: ['Capability framed as inevitability', 'Competitive pressure used to bypass ethical review', 'Complexity used to avoid consequence accountability'],
        linkedDomains: [{ label: 'Interdisciplinary & Emerging Fields', slug: 'interdisciplinary' }, { label: 'Applied Sciences & Engineering', slug: 'engineering' }],
      },
      {
        id: 'architect-engineer',
        title: 'The Architect & Engineer',
        category: 'science-technology',
        description: 'Built environments shape human experience, movement, and social interaction over generations. Design decisions are ethical decisions with long time horizons.',
        spiritualOrientation: 'Physical space structures human attention and social life. The architect operates as a steward of collective experience, not only a solver of technical problems.',
        ethicalAxis: ['Human-scale design', 'Environmental impact', 'Accessibility as standard', 'Longevity over obsolescence'],
        psychologicalDiscipline: 'Sustained consideration of those who inhabit designed spaces, particularly those with the least power to alter them.',
        commonDistortions: ['Aesthetic ambition displacing inhabitant needs', 'Client\'s budget interest replacing community interest', 'Sustainability as marketing rather than constraint'],
        linkedDomains: [{ label: 'Applied Sciences & Engineering', slug: 'engineering' }, { label: 'Environmental & Sustainability Sciences', slug: 'environmental' }],
      },
    ],
  },
  {
    id: 'health-care',
    title: 'Health & Care',
    description: 'Healing amplifies the messianic faculty. The ethics of care require the sustained subordination of the healer\'s narrative to the patient\'s reality.',
    professions: [
      {
        id: 'physician',
        title: 'The Physician',
        category: 'health-care',
        description: 'Clinical authority confers disproportionate power over vulnerable individuals. Medical ethics cannot be reduced to legal compliance; it requires active cultivation of epistemic humility.',
        spiritualOrientation: 'The physician operates where human vulnerability is most exposed. Healing is a trust, not a transaction. The patient\'s dignity is non-negotiable regardless of clinical complexity.',
        ethicalAxis: ['Informed consent as ongoing dialogue', 'Patient dignity under medical authority', 'Limits of clinical knowledge', 'Non-maleficence as primary constraint'],
        psychologicalDiscipline: 'Detachment from clinical certainty; sustained capacity to hold diagnostic uncertainty without transferring anxiety to patients.',
        commonDistortions: ['Medical authority used to override patient judgment', 'Efficiency systems reducing patients to cases', 'Over-treatment driven by liability rather than benefit'],
        linkedDomains: [{ label: 'Biological & Health Sciences', slug: 'health-sciences' }, { label: 'Social Sciences', slug: 'social-sciences' }],
      },
      {
        id: 'psychologist',
        title: 'The Psychologist',
        category: 'health-care',
        description: 'Psychological practice operates in the domain of self-narrative and meaning formation. Its ethical obligations extend to the framing structures used in intervention.',
        spiritualOrientation: 'The psychologist shapes another person\'s understanding of their own experience. This proximity to identity formation requires exceptional ethical precision and personal clarity.',
        ethicalAxis: ['Informed consent in psychological framing', 'Non-dependency cultivation', 'Cultural humility', 'Countertransference awareness'],
        psychologicalDiscipline: 'Continuous self-examination of the practitioner\'s own psychological structures and their influence on the clinical encounter.',
        commonDistortions: ['Pathologisation of culturally-specific responses', 'Therapeutic dependency maintained beyond clinical necessity', 'Practitioner\'s framework imposed on patient\'s experience'],
        linkedDomains: [{ label: 'Biological & Health Sciences', slug: 'health-sciences' }, { label: 'Humanities & Intellectual Traditions', slug: 'humanities' }],
      },
    ],
  },
  {
    id: 'environment',
    title: 'Environment & Sustainability',
    description: 'Environmental work amplifies the stewardship faculty. Sufi cosmology holds the natural world as entrusted to human custodianship, not dominion.',
    professions: [
      {
        id: 'ecologist',
        title: 'The Ecologist',
        category: 'environment',
        description: 'Ecological science carries an inherent ethical orientation — the natural world\'s integrity is not negotiable against economic metrics.',
        spiritualOrientation: 'Ecological knowledge obligates advocacy. Understanding the interdependence of living systems generates the ethical responsibility to protect it.',
        ethicalAxis: ['Intergenerational obligation', 'Non-human life as morally considerable', 'Science-policy integration', 'Anti-reductionist analysis'],
        psychologicalDiscipline: 'Sustained motivation under long-cycle consequences; resistance to nihilism in the face of systemic resistance.',
        commonDistortions: ['Ecological science used to justify inaction while "studying further"', 'Complexity used to defer responsibility', 'Techno-solutionism replacing systemic change'],
        linkedDomains: [{ label: 'Environmental & Sustainability Sciences', slug: 'environmental' }, { label: 'Pure & Fundamental Sciences', slug: 'pure-sciences' }],
      },
    ],
  },
  {
    id: 'law-justice',
    title: 'Law & Justice',
    description: 'Legal work amplifies the interpretation faculty. The law\'s ethical function requires continuous calibration against justice, not merely against precedent.',
    professions: [
      {
        id: 'lawyer',
        title: 'The Lawyer',
        category: 'law-justice',
        description: 'Advocacy ethics require the careful delineation between zealous representation and enabling harm. The legal system\'s integrity depends on practitioners who hold this distinction.',
        spiritualOrientation: 'Legal advocacy is a trust conferred by those who cannot navigate complex systems alone. It is not a commercial transaction with an adversarial party.',
        ethicalAxis: ['Candor to tribunal', 'Client confidentiality without complicity', 'Access to justice orientation', 'Conflict of interest management'],
        psychologicalDiscipline: 'Sustained distinction between client\'s interest and justice; resistance to technical success as ethical validation.',
        commonDistortions: ['Legal skill used to obstruct rather than resolve', 'Procedural manipulation mistaken for legal excellence', 'Billable hours structuring case strategy'],
        linkedDomains: [{ label: 'Law & Governance', slug: 'law-governance' }, { label: 'Social Sciences', slug: 'social-sciences' }],
      },
    ],
  },
  {
    id: 'media-narrative',
    title: 'Media & Narrative',
    description: 'Media amplifies the influence faculty. Journalists and writers operate as custodians of public epistemics; their ethical obligations are proportional to their reach.',
    professions: [
      {
        id: 'journalist',
        title: 'The Journalist',
        category: 'media-narrative',
        description: 'Journalism is custodianship of the public\'s epistemic access to reality. Its ethical core is accuracy and proportionality, not engagement.',
        spiritualOrientation: 'The journalist operates as witness (shahid). This function carries the obligation of fidelity to what is, not to what generates attention. Distortion of public reality is a civic harm.',
        ethicalAxis: ['Accuracy over speed', 'Proportionality in coverage', 'Source protection', 'Separation of fact and commentary'],
        psychologicalDiscipline: 'Resistance to narrative seduction; sustained capacity to report facts that contradict preferred framings.',
        commonDistortions: ['Outrage optimisation replacing informational value', 'Source access maintained by editorial softening', 'Speed displacing verification'],
        linkedDomains: [{ label: 'Humanities & Intellectual Traditions', slug: 'humanities' }, { label: 'Social Sciences', slug: 'social-sciences' }],
      },
      {
        id: 'writer',
        title: 'The Writer',
        category: 'media-narrative',
        description: 'Writing shapes collective imagination and frames the parameters of social possibility. Its ethical obligations extend to accuracy in representing human experience.',
        spiritualOrientation: 'Language is a vehicle of both clarity and distortion. The writer who uses language with precision and honesty performs a service to collective understanding. Manipulation through narrative is a form of corruption.',
        ethicalAxis: ['Accuracy in representing experience', 'Resistance to audience capture', 'Epistemic humility in interpretation', 'Long-term cultural consequence'],
        psychologicalDiscipline: 'Detachment from critical reception; capacity to write truthfully without seeking validation from the audience written for.',
        commonDistortions: ['Audience preferences structuring factual representation', 'Emotional impact prioritised over analytical accuracy', 'Platform pressures shaping editorial judgment'],
        linkedDomains: [{ label: 'Humanities & Intellectual Traditions', slug: 'humanities' }, { label: 'Interdisciplinary & Emerging Fields', slug: 'interdisciplinary' }],
      },
    ],
  },
];

export function getAllProfessions(): ProfessionCard[] {
  return PROFESSION_CATEGORIES.flatMap((cat) => cat.professions);
}

export function getProfessionById(id: string): ProfessionCard | undefined {
  return getAllProfessions().find((p) => p.id === id);
}
