import Link from 'next/link';
import { GraduationCap, Award, Check, ArrowRight, Clock, Users } from 'lucide-react';

export const metadata = {
  title: 'Apply for Membership — Sufi Science Center',
  description: 'Apply for Scholar or Fellow membership at the Sufi Science Center',
};

const tiers = [
  {
    type: 'scholar',
    label: 'Scholar Membership',
    icon: GraduationCap,
    tagline: 'Academic engagement and research contribution',
    description:
      'For students, researchers, and academics pursuing focused inquiry at the intersection of Sufi wisdom and contemporary knowledge systems.',
    highlights: [
      'Academic engagement with research community',
      'Access to working papers and research drafts',
      'Participation in dialogue series and seminars',
      'Contribution opportunities to publications',
      'Invitation to study circles and knowledge forums',
    ],
    requirements: [
      'Statement of intent (300–500 words)',
      'Academic focus area declaration',
      'Current research interest summary',
      'Brief professional biography',
      'CV or academic profile',
    ],
    duration: '2–3 weeks review',
    commitment: 'Academic contribution',
    color: 'from-[#1a2a4a] to-[#1a1b2e]',
    borderHover: 'hover:border-[#4A90D9]/50',
    accent: '#4A90D9',
    badgeBg: 'bg-[#4A90D9]/10 border-[#4A90D9]/25 text-[#4A90D9]',
    ctaClass: 'bg-[#4A90D9]/10 border-[#4A90D9]/30 text-[#4A90D9] hover:bg-[#4A90D9]/20',
  },
  {
    type: 'fellow',
    label: 'Fellow Membership',
    icon: Award,
    tagline: 'Senior scholarly contribution and advisory participation',
    description:
      'For established scholars, educators, and institutional leaders making senior-level contributions to Sufi science research, curriculum, and institutional development.',
    highlights: [
      'Senior scholarly contribution and recognition',
      'Advisory participation in research direction',
      'Institutional representation opportunities',
      'Co-authorship on publications',
      'Curriculum development participation',
      'Direct engagement with leadership and faculty',
    ],
    requirements: [
      'Statement of contribution (500–800 words)',
      'List of publications or scholarly work',
      'Years of scholarly engagement',
      'Institutional leadership roles (if applicable)',
      'CV with full academic history',
      'Optional reference contact',
    ],
    duration: '3–4 weeks review',
    commitment: 'Senior contribution',
    color: 'from-[#2a1f0a] to-[#1a1b2e]',
    borderHover: 'hover:border-[#C8A75E]/50',
    accent: '#C8A75E',
    badgeBg: 'bg-[#C8A75E]/10 border-[#C8A75E]/25 text-[#C8A75E]',
    ctaClass: 'bg-[#C8A75E]/10 border-[#C8A75E]/30 text-[#C8A75E] hover:bg-[#C8A75E]/20',
  },
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-[#0A0B14]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.22em] text-[#C8A75E]/60 uppercase mb-4">
            Membership Programme
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-5 leading-tight">
            Join the Scholarly Community
          </h1>
          <p className="text-lg text-[#AAB0D6]/70 max-w-2xl mx-auto leading-relaxed">
            Two pathways for meaningful engagement — structured applications, reviewed by our
            academic committee, with clear status tracking throughout.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-14">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.type}
                className={`bg-gradient-to-br ${tier.color} backdrop-blur-sm border border-white/8 rounded-2xl p-8 transition-all duration-300 ${tier.borderHover} flex flex-col`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${tier.accent}18` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: tier.accent }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-serif font-semibold text-white">{tier.label}</h2>
                      <p className="text-xs mt-0.5" style={{ color: tier.accent }}>
                        {tier.tagline}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#AAB0D6]/70 leading-relaxed mb-6">{tier.description}</p>

                <div className="mb-6">
                  <p className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-3">
                    Membership includes
                  </p>
                  <ul className="space-y-2.5">
                    {tier.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: tier.accent }} />
                        <span className="text-sm text-[#AAB0D6]/65">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <p className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-3">
                    Application requires
                  </p>
                  <ul className="space-y-2">
                    {tier.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-2.5">
                        <div className="w-1 h-1 rounded-full bg-white/20 mt-1.5 flex-shrink-0" />
                        <span className="text-xs text-[#AAB0D6]/50">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-4 mb-7 mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#AAB0D6]/30" />
                    <span className="text-xs text-[#AAB0D6]/40">{tier.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#AAB0D6]/30" />
                    <span className="text-xs text-[#AAB0D6]/40">{tier.commitment}</span>
                  </div>
                </div>

                <Link
                  href={`/membership/apply/${tier.type}`}
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl border font-medium text-sm transition-all duration-200 ${tier.ctaClass}`}
                >
                  Begin {tier.label} Application
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-sm text-[#AAB0D6]/40 mb-3">Already applied?</p>
          <Link
            href="/membership/status"
            className="inline-flex items-center gap-2 text-sm text-[#C8A75E]/70 hover:text-[#C8A75E] transition-colors border border-[#C8A75E]/15 hover:border-[#C8A75E]/35 px-5 py-2.5 rounded-xl"
          >
            Check Application Status
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
