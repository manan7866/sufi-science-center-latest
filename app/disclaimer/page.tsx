import { AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Disclaimer — Sufi Science Center',
  description: 'Important disclaimers regarding content and services on the Sufi Science Center platform.',
};

const SECTIONS = [
  {
    title: 'Educational Purpose',
    content: [
      'All content on the Sufi Science Center platform is provided for educational, scholarly, and contemplative purposes only.',
      'The platform is a knowledge resource and community space, not a provider of professional services of any kind.',
      'Information presented represents the scholarly views and research of the Sufi Science Center and its contributors, not authoritative religious rulings or fatwas.',
      'Engagement with our content is a supplement to, not a replacement for, qualified personal guidance from a recognised teacher.',
    ],
  },
  {
    title: 'Not Professional Advice',
    content: [
      'Nothing on this platform constitutes psychological, psychiatric, medical, legal, financial, or therapeutic advice.',
      'Inner development content, including assessment tools and practice guides, is for educational self-reflection purposes only.',
      'If you are experiencing psychological distress, please seek qualified professional support.',
      'The Sufi Science Center does not provide clinical services, and our content should not be used to diagnose, treat, or manage any health condition.',
    ],
  },
  {
    title: 'Spiritual Guidance',
    content: [
      'The Sufi Science Center presents classical Sufi knowledge as a scholarly subject of study.',
      'We do not claim to offer formal spiritual initiation (bay\'a), transmission (tawajjuh), or authorised silsila through this digital platform.',
      'Information about spiritual practices is presented in an educational context; undertaking intensive practices without personal guidance from a qualified teacher carries inherent risks.',
      'We encourage seekers to verify the credentials and lineage of any teacher they consider following.',
    ],
  },
  {
    title: 'Research and Scholarship',
    content: [
      'Research and analysis on this platform represents the views of the individual authors and researchers, not institutional positions.',
      'Academic content is subject to revision and should be treated as scholarly work in progress.',
      'We strive for accuracy but cannot guarantee the completeness or currency of all information.',
      'Citations and references are provided where applicable; readers are encouraged to consult primary sources.',
    ],
  },
  {
    title: 'External Links and Resources',
    content: [
      'The platform may contain links to external websites for reference purposes.',
      'We do not endorse, control, or take responsibility for the content of external sites.',
      'Links to external resources do not imply institutional affiliation or endorsement.',
      'Exercise your own judgement when accessing external content linked from this platform.',
    ],
  },
  {
    title: 'Interfaith and Cross-Traditional Content',
    content: [
      'Some content on the platform engages with multiple religious and spiritual traditions in a comparative scholarly context.',
      'Such comparisons are made in a spirit of academic inquiry and do not imply doctrinal equivalence.',
      'We respect the integrity of each tradition and present comparative analysis with appropriate scholarly nuance.',
      'Readers from specific traditions are encouraged to seek guidance from qualified authorities within their own tradition.',
    ],
  },
  {
    title: 'Limitation of Liability',
    content: [
      'The Sufi Science Center shall not be held liable for any decisions made based on content available on this platform.',
      'Users access and apply content at their own discretion and risk.',
      'We make no warranties regarding outcomes from engagement with our assessments, programmes, or educational materials.',
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#0A0B14]">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[#C8A75E]" />
            </div>
            <span className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase">
              Legal
            </span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-[#F5F3EE] mb-3">Disclaimer</h1>
          <p className="text-sm text-[#AAB0D6]/50">Last updated: February 2026</p>
          <p className="text-[#AAB0D6]/70 mt-4 leading-relaxed">
            Please read this disclaimer carefully. It describes important limitations of the Sufi
            Science Center's platform and clarifies the nature and scope of the content and
            programmes we provide.
          </p>
        </div>

        <div className="space-y-8">
          {SECTIONS.map((section, i) => (
            <div key={i} className="glass-panel rounded-2xl p-7 border border-white/5">
              <h2 className="text-lg font-serif font-bold text-[#F5F3EE] mb-5">
                {i + 1}. {section.title}
              </h2>
              <ul className="space-y-3">
                {section.content.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-[#AAB0D6]/70 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C8A75E]/40 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 glass-panel rounded-2xl p-7 border border-[#C8A75E]/10">
          <h2 className="text-base font-semibold text-[#F5F3EE] mb-2">Questions</h2>
          <p className="text-sm text-[#AAB0D6]/70">
            For questions about this disclaimer, contact us at{' '}
            <a
              href="mailto:contact@sufisciencecenter.org"
              className="text-[#C8A75E] hover:underline"
            >
              contact@sufisciencecenter.org
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
