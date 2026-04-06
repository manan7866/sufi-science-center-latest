import Link from 'next/link';
import { ObservatoryHero } from '@/components/observatory-hero';
import { Building2, ArrowLeft, Clock, Users, CheckCircle2, Circle, Loader2 } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Consciousness Cartography Initiative',
    status: 'Active',
    phase: 'Phase 2 of 3',
    lead: 'Dr. Fayaz Ahmad Khan',
    partners: ['University of California Berkeley', 'Oxford Centre for Hindu Studies'],
    description:
      'A longitudinal study mapping the experiential terrain of advanced contemplative practitioners across multiple traditions, integrating first-person phenomenological accounts with third-person neuroimaging data to build a cross-validated cartography of non-ordinary states.',
    objectives: [
      'Develop a validated phenomenological taxonomy of contemplative states',
      'Correlate subjective reports with measurable neurological markers',
      'Produce a cross-traditional comparison dataset covering 200+ practitioners',
      'Publish findings in peer-reviewed consciousness science journals',
    ],
    timeline: '2023–2026',
    output: 'Academic monograph + 4 journal papers',
  },
  {
    title: 'Sufi Lineage Preservation and Digital Archive',
    status: 'Active',
    phase: 'Phase 1 of 2',
    lead: 'Prof. Sarah Chen',
    partners: ['British Library Digital Collections', 'Al-Azhar University'],
    description:
      'Systematic digitisation, translation, and scholarly annotation of rare Sufi manuscripts from the 9th–16th centuries, with a focus on previously untranslated texts from the Chishti, Suhrawardi, and Qadiri lineages.',
    objectives: [
      'Digitise and catalogue 500+ manuscript texts',
      'Complete scholarly translation of 25 foundational texts',
      'Develop open-access research portal for academic use',
      'Train 12 early-career scholars in manuscript studies',
    ],
    timeline: '2024–2027',
    output: 'Digital archive + 3 critical editions',
  },
  {
    title: 'Developmental Psychology of the Spiritual Path',
    status: 'Active',
    phase: 'Phase 1 of 3',
    lead: 'Dr. Amina Hassan',
    partners: ['California Institute of Integral Studies', 'Fielding Graduate University'],
    description:
      'An empirical investigation into developmental stage progression in committed spiritual practitioners, examining how classical Sufi maqamat correspond to validated constructs in contemporary adult developmental psychology.',
    objectives: [
      'Develop validated assessment instruments for spiritual development',
      'Conduct longitudinal study with 150 advanced practitioners',
      'Map Sufi stations to existing developmental stage frameworks',
      'Produce practitioner-facing developmental guidance materials',
    ],
    timeline: '2024–2028',
    output: 'Assessment toolkit + 2 journal papers',
  },
  {
    title: 'Ethics of Inner Knowledge: A Cross-Traditional Study',
    status: 'Completed',
    phase: 'Complete',
    lead: 'Dr. Fayaz Ahmad Khan',
    partners: ['Georgetown University', 'The Shalom Hartman Institute'],
    description:
      'A comparative examination of ethical frameworks for transmitting inner knowledge across Jewish, Christian, and Islamic mystical traditions, exploring common structures, divergences, and implications for contemporary contemplative pedagogy.',
    objectives: [
      'Analyse ethical frameworks across 6 major mystical traditions',
      'Identify structural commonalities in knowledge transmission ethics',
      'Produce comparative philosophical framework',
      'Host international symposium with 40+ scholars',
    ],
    timeline: '2021–2023',
    output: 'Edited volume + symposium proceedings',
  },
  {
    title: 'Quantum Foundations and Contemplative Epistemology',
    status: 'Proposed',
    phase: 'Pre-launch',
    lead: 'Prof. Sarah Chen',
    partners: ['MIT Physics Department (pending)', 'Perimeter Institute (pending)'],
    description:
      'A speculative but rigorous inquiry into structural analogies between quantum mechanical phenomena and classical Sufi epistemological frameworks, with careful attention to avoiding pseudo-scientific misappropriation.',
    objectives: [
      'Map structural parallels between quantum and contemplative frameworks',
      'Identify substantive vs. metaphorical correspondences',
      'Develop responsible interdisciplinary research methodology',
      'Publish position paper establishing research standards',
    ],
    timeline: '2025–2028 (proposed)',
    output: 'Position paper + research programme',
  },
];

const STATUS_CONFIG: Record<string, { color: string; icon: React.ElementType }> = {
  Active: { color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: Loader2 },
  Completed: { color: 'bg-sky-500/10 text-sky-400 border-sky-500/20', icon: CheckCircle2 },
  Proposed: { color: 'bg-[#C8A75E]/10 text-[#C8A75E] border-[#C8A75E]/20', icon: Circle },
};

export const metadata = {
  title: 'Institute Projects — Sufi Science Center',
  description: 'Ongoing and completed research initiatives at the Sufi Science Center.',
};

export default function ResearchProjectsPage() {
  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Research Initiatives"
        title="Institute Projects"
        description="Structured research programmes advancing the integration of classical Sufi knowledge with contemporary scientific inquiry."
      />

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-sm text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Research
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { label: 'Active Projects', value: '3', color: 'text-emerald-400' },
              { label: 'Completed', value: '1', color: 'text-sky-400' },
              { label: 'Proposed', value: '1', color: 'text-[#C8A75E]' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-panel rounded-xl p-5 border border-white/5 text-center"
              >
                <p className={`text-3xl font-bold font-serif ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-[#AAB0D6]/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {PROJECTS.map((project, i) => {
              const cfg = STATUS_CONFIG[project.status];
              const Icon = cfg.icon;
              return (
                <article
                  key={i}
                  className="glass-panel rounded-2xl p-7 border border-white/5 hover:border-[#C8A75E]/15 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-4 h-4 text-[#C8A75E]" />
                        <span className="text-[10px] text-[#AAB0D6]/40 tracking-widest uppercase">
                          {project.phase}
                        </span>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-[#F5F3EE]">
                        {project.title}
                      </h3>
                    </div>
                    <span
                      className={`flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full border font-medium uppercase tracking-wider flex-shrink-0 ${cfg.color}`}
                    >
                      <Icon className="w-3 h-3" />
                      {project.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-[#AAB0D6]/50 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      Lead: {project.lead}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {project.timeline}
                    </span>
                  </div>

                  <p className="text-sm text-[#AAB0D6]/70 leading-relaxed mb-5">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-[#AAB0D6]/30 mb-3">
                        Objectives
                      </p>
                      <ul className="space-y-1.5">
                        {project.objectives.map((obj, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-[#AAB0D6]/60">
                            <div className="w-1 h-1 rounded-full bg-[#C8A75E]/50 mt-1.5 flex-shrink-0" />
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-[#AAB0D6]/30 mb-3">
                        Partner Institutions
                      </p>
                      <ul className="space-y-1.5">
                        {project.partners.map((p, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-[#AAB0D6]/60">
                            <div className="w-1 h-1 rounded-full bg-[#C8A75E]/50 mt-1.5 flex-shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <p className="text-[10px] tracking-widest uppercase text-[#AAB0D6]/30 mt-4 mb-1">
                        Expected Output
                      </p>
                      <p className="text-xs text-[#AAB0D6]/60">{project.output}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12 glass-panel rounded-2xl p-8 border border-[#C8A75E]/10 text-center">
            <h3 className="text-lg font-serif font-semibold text-[#F5F3EE] mb-2">
              Propose a Research Collaboration
            </h3>
            <p className="text-sm text-[#AAB0D6]/60 mb-5 max-w-xl mx-auto">
              We welcome institutional partnerships and research collaborations aligned with our
              commitment to rigorous, integrative inquiry.
            </p>
            <Link
              href="/institute/collaborations"
              className="inline-flex items-center gap-2 text-sm text-[#C8A75E] font-semibold bg-[#C8A75E]/10 border border-[#C8A75E]/25 px-5 py-2.5 rounded-lg hover:bg-[#C8A75E]/16 transition-all"
            >
              Submit a Collaboration Proposal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
