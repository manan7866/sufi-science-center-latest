import Link from 'next/link';
import { Eye, Keyboard, Volume2, MonitorSmartphone, CheckCircle2, Mail } from 'lucide-react';

export const metadata = {
  title: 'Accessibility — Sufi Science Center',
  description: 'Accessibility commitment and support information for the Sufi Science Center platform.',
};

const COMMITMENTS = [
  {
    icon: Eye,
    title: 'Visual Accessibility',
    items: [
      'Sufficient colour contrast ratios across all text and background combinations',
      'Text is resizable up to 200% without loss of content or functionality',
      'All images include descriptive alternative text',
      'No content depends solely on colour to convey meaning',
      'Focus indicators are visible on all interactive elements',
    ],
  },
  {
    icon: Keyboard,
    title: 'Keyboard Navigation',
    items: [
      'All functionality is accessible via keyboard without requiring a mouse',
      'Logical tab order throughout all pages and forms',
      'Keyboard shortcuts for primary navigation functions',
      'Focus is managed appropriately in modal dialogs and dynamic content',
      'Skip navigation links allow users to bypass repetitive content',
    ],
  },
  {
    icon: Volume2,
    title: 'Screen Reader Support',
    items: [
      'Semantic HTML elements used throughout the platform',
      'ARIA labels and roles applied to complex interactive components',
      'Dynamic content updates announced to screen reader users',
      'Form fields include clear, programmatically associated labels',
      'Error messages are associated with the relevant form controls',
    ],
  },
  {
    icon: MonitorSmartphone,
    title: 'Responsive and Adaptive Design',
    items: [
      'Platform is fully functional on mobile, tablet, and desktop devices',
      'Content reflows appropriately at different viewport sizes',
      'Touch targets meet minimum size requirements for motor accessibility',
      'Zoom and pinch gestures are supported on touch devices',
      'Orientation changes do not cause loss of content or functionality',
    ],
  },
];

const STANDARDS = [
  {
    standard: 'WCAG 2.1',
    level: 'Level AA',
    description: 'We target conformance with the Web Content Accessibility Guidelines 2.1 at Level AA, which represents the international standard for accessible web content.',
  },
  {
    standard: 'Section 508',
    level: 'Compliance',
    description: 'Our platform is designed with reference to Section 508 of the Rehabilitation Act, applicable to digital content accessed by users in the United States.',
  },
];

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-[#0A0B14]">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center">
              <Eye className="w-5 h-5 text-[#C8A75E]" />
            </div>
            <span className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase">
              Commitment
            </span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-[#F5F3EE] mb-3">Accessibility</h1>
          <p className="text-sm text-[#AAB0D6]/50">Last reviewed: February 2026</p>
          <p className="text-[#AAB0D6]/70 mt-4 leading-relaxed">
            The Sufi Science Center is committed to ensuring our platform is accessible to all
            users, regardless of disability or the technology they use to access the web. We believe
            that knowledge of the inner path should be available to everyone, and our accessibility
            commitments reflect that conviction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {STANDARDS.map((s, i) => (
            <div key={i} className="glass-panel rounded-xl p-6 border border-[#C8A75E]/10">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-[#F5F3EE]">{s.standard}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  {s.level}
                </span>
              </div>
              <p className="text-xs text-[#AAB0D6]/60 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6 mb-12">
          {COMMITMENTS.map((commitment, i) => {
            const Icon = commitment.icon;
            return (
              <div key={i} className="glass-panel rounded-2xl p-7 border border-white/5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#C8A75E]" />
                  </div>
                  <h2 className="text-lg font-serif font-bold text-[#F5F3EE]">{commitment.title}</h2>
                </div>
                <ul className="space-y-2.5">
                  {commitment.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-[#AAB0D6]/70 leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C8A75E]/40 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="glass-panel rounded-2xl p-7 border border-white/5 mb-6">
          <h2 className="text-lg font-serif font-bold text-[#F5F3EE] mb-4">Known Limitations</h2>
          <p className="text-sm text-[#AAB0D6]/70 leading-relaxed mb-4">
            While we strive for full accessibility, we acknowledge that some areas of the platform
            may not yet fully meet our targets:
          </p>
          <ul className="space-y-2.5">
            {[
              'Some older PDF documents in the research library may not have full accessibility metadata.',
              'The canvas-based particle animations in hero sections are decorative and do not convey information, but may cause issues with certain screen reader modes.',
              'Audio content in the Sacred Kalam and SufiPulse sections is being progressively captioned.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#AAB0D6]/60 leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40 mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel rounded-2xl p-7 border border-[#C8A75E]/10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-[#C8A75E]" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#F5F3EE] mb-2">
                Report an Accessibility Issue
              </h2>
              <p className="text-sm text-[#AAB0D6]/70 mb-3">
                If you encounter an accessibility barrier on our platform, we want to hear from you.
                Please describe the issue and, if possible, the assistive technology or browser you
                are using.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm text-[#C8A75E] font-semibold bg-[#C8A75E]/10 border border-[#C8A75E]/25 px-4 py-2 rounded-lg hover:bg-[#C8A75E]/16 transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                Contact Us
              </Link>
              <p className="text-xs text-[#AAB0D6]/40 mt-3">
                We aim to respond to accessibility reports within 2 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
