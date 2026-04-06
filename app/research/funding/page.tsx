import Link from 'next/link';
import { ObservatoryHero } from '@/components/observatory-hero';
import { Award, ArrowLeft, CheckCircle2, Clock, DollarSign, FileText } from 'lucide-react';

const CURRENT_FUNDING = [
  {
    title: 'Consciousness Cartography Initiative',
    funder: 'Dr. Kumar Foundation USA',
    type: 'Institutional Grant',
    period: '2023–2026',
    status: 'Active',
    description:
      'Primary research grant supporting the three-year consciousness cartography programme, including research fellowships, neuroimaging costs, and participant coordination.',
  },
  {
    title: 'Sufi Manuscript Digitisation and Preservation',
    funder: 'National Endowment for the Humanities',
    type: 'Preservation Grant',
    period: '2024–2027',
    status: 'Active',
    description:
      'Federal preservation grant supporting digitisation, cataloguing, and scholarly annotation of rare Sufi manuscripts held in partner library collections.',
  },
  {
    title: 'Developmental Psychology of the Spiritual Path',
    funder: 'Fetzer Institute',
    type: 'Research Grant',
    period: '2024–2028',
    status: 'Active',
    description:
      'Multi-year research grant supporting the longitudinal study of developmental stage progression in committed spiritual practitioners.',
  },
];

const PAST_FUNDING = [
  {
    title: 'Ethics of Inner Knowledge: Cross-Traditional Study',
    funder: 'Henry Luce Foundation',
    period: '2021–2023',
    output: 'Edited volume + international symposium',
  },
  {
    title: 'Platform Development: Sufi Science Center',
    funder: 'Dr. Kumar Foundation USA',
    period: '2022–2024',
    output: 'Digital knowledge platform',
  },
  {
    title: 'Sufi Psychology and Developmental Stage Theory',
    funder: 'Templeton Foundation (Pilot)',
    period: '2020–2022',
    output: '2 journal papers + research methodology',
  },
];

const GRANT_OPPORTUNITIES = [
  {
    title: 'Research Fellowship Award',
    amount: 'Up to $40,000 / year',
    description:
      'Full-time research fellowships for doctoral and post-doctoral scholars pursuing integrative research at the intersection of Sufi knowledge traditions and contemporary science.',
    eligibility: [
      'Doctoral or post-doctoral level',
      'Demonstrated expertise in relevant field',
      'Clear integrative research proposal',
      'Commitment to 12-month engagement',
    ],
    deadline: 'Rolling applications — reviewed quarterly',
  },
  {
    title: 'Collaborative Research Seed Grant',
    amount: 'Up to $15,000',
    description:
      'Seed funding for institutional collaborations in early stages of development, supporting feasibility studies, preliminary research, and partnership establishment.',
    eligibility: [
      'Institutional partnership required',
      'Clear research question',
      'Feasibility study design',
      'Demonstrated alignment with centre values',
    ],
    deadline: 'Biannual cycle — January and July',
  },
  {
    title: 'Translation and Archival Project Grant',
    amount: 'Up to $25,000',
    description:
      'Targeted funding for high-priority translation and archival projects involving classical Sufi texts with significant scholarly value and limited existing scholarship.',
    eligibility: [
      'Qualified translator or team',
      'Scholarly annotation plan',
      'Open access publication commitment',
      'Institutional affiliation preferred',
    ],
    deadline: 'Annual cycle — March',
  },
];

export const metadata = {
  title: 'Grants and Funding — Sufi Science Center',
  description: 'Research grants, funding opportunities, and institutional support from the Sufi Science Center.',
};

export default function ResearchFundingPage() {
  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Research Funding"
        title="Grants and Funding"
        description="Information on current research funding, completed grants, and available funding opportunities for scholars and institutional partners."
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

          <div className="mb-14">
            <p className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-6">
              Current Funding
            </p>
            <div className="space-y-4">
              {CURRENT_FUNDING.map((grant, i) => (
                <div
                  key={i}
                  className="glass-panel rounded-2xl p-6 border border-white/5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-base font-serif font-bold text-[#F5F3EE]">{grant.title}</h3>
                      <p className="text-sm text-[#C8A75E]/70 mt-0.5">{grant.funder}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C8A75E]/8 border border-[#C8A75E]/15 text-[#C8A75E]/70">
                        {grant.type}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Active
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#AAB0D6]/40 mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    {grant.period}
                  </div>
                  <p className="text-sm text-[#AAB0D6]/65">{grant.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-14">
            <p className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-6">
              Completed Grants
            </p>
            <div className="space-y-3">
              {PAST_FUNDING.map((grant, i) => (
                <div
                  key={i}
                  className="glass-panel rounded-xl p-5 border border-white/5 opacity-80"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-[#F5F3EE]">{grant.title}</h4>
                      <p className="text-xs text-[#AAB0D6]/50 mt-0.5">{grant.funder} · {grant.period}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-3 h-3 text-[#AAB0D6]/30" />
                      <span className="text-xs text-[#AAB0D6]/40">{grant.output}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-2">
              Available Funding Opportunities
            </p>
            <p className="text-sm text-[#AAB0D6]/55 mb-6">
              The Sufi Science Center offers several funding mechanisms to support aligned research.
              All awards are subject to available resources and competitive review.
            </p>
            <div className="space-y-5">
              {GRANT_OPPORTUNITIES.map((opp, i) => (
                <div
                  key={i}
                  className="glass-panel rounded-2xl p-7 border border-[#C8A75E]/10"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-[#F5F3EE]">{opp.title}</h3>
                    </div>
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-[#C8A75E] flex-shrink-0">
                      <DollarSign className="w-4 h-4" />
                      {opp.amount}
                    </span>
                  </div>
                  <p className="text-sm text-[#AAB0D6]/70 leading-relaxed mb-5">{opp.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-[#AAB0D6]/30 mb-2">
                        Eligibility
                      </p>
                      <ul className="space-y-1.5">
                        {opp.eligibility.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-[#AAB0D6]/60">
                            <div className="w-1 h-1 rounded-full bg-[#C8A75E]/50 mt-1.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-[#AAB0D6]/30 mb-2">
                        Application Deadline
                      </p>
                      <p className="text-sm text-[#AAB0D6]/60">{opp.deadline}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-8 border border-[#C8A75E]/10 text-center">
            <Award className="w-10 h-10 text-[#C8A75E] mx-auto mb-4" />
            <h3 className="text-lg font-serif font-semibold text-[#F5F3EE] mb-2">
              Apply for Research Funding
            </h3>
            <p className="text-sm text-[#AAB0D6]/60 mb-5 max-w-xl mx-auto">
              All funding applications begin with a collaboration proposal. Submit your research
              concept and we will guide you through the appropriate funding mechanism.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/institute/collaborations"
                className="inline-flex items-center gap-2 text-sm text-[#C8A75E] font-semibold bg-[#C8A75E]/10 border border-[#C8A75E]/25 px-5 py-2.5 rounded-lg hover:bg-[#C8A75E]/16 transition-all"
              >
                Submit a Proposal
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm text-[#AAB0D6]/60 border border-white/10 px-5 py-2.5 rounded-lg hover:border-[#C8A75E]/25 hover:text-[#C8A75E] transition-all"
              >
                Contact the Research Office
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
