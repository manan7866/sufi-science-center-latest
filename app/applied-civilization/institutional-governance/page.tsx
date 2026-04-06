'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown, ChevronRight, ArrowRight, Building2, Compass,
  Scale, Eye, Users, ShieldCheck, BarChart3, AlertCircle,
} from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';

const GOVERNANCE_PILLARS = [
  {
    id: 'structural-integrity',
    icon: Building2,
    color: '#7BAFD4',
    title: 'Structural Integrity',
    description: 'The architecture of governance determines the behavior it enables or prevents. Ethical governance requires structures that distribute power, require transparency, and enable accountability before crises occur.',
    elements: [
      { label: 'Separation of functions', detail: 'Concentration of authority in single roles without adequate oversight mechanisms is the structural prerequisite for institutional corruption. Governance structures that separate executive, oversight, and accountability functions are not bureaucratic inefficiency — they are ethical architecture.' },
      { label: 'Distributed decision-making', detail: 'Decisions affecting many parties should involve meaningful input from those affected, not merely notification after the fact. Genuine consultation is evidence of institutional integrity; performed consultation is its simulacrum.' },
      { label: 'Succession planning as ethics', detail: 'Institutions that are dependent on individual personalities rather than embedded principles are structurally fragile. Succession planning that institutionalizes values is an ethical obligation, not an administrative convenience.' },
      { label: 'Conflict of interest architecture', detail: 'Potential conflicts of interest should be identified, disclosed, and managed structurally — not resolved through individual discretion. The integrity of the structure matters more than the integrity of any individual within it.' },
    ],
  },
  {
    id: 'transparency',
    icon: Eye,
    color: '#C8A75E',
    title: 'Transparency as Obligation',
    description: 'Transparency is not a communication strategy — it is a structural condition for institutional legitimacy. Institutions that control information about their own operations cannot be held accountable for them.',
    elements: [
      { label: 'Financial transparency', detail: 'Institutions that receive public trust — whether through taxation, donation, or regulatory protection — carry proportional obligations of financial transparency. The standard is not compliance with minimum reporting requirements but genuine accessibility of information to those affected.' },
      { label: 'Decision transparency', detail: 'Significant institutional decisions should be explicable in public terms — not merely legally defensible ones. The test: can the reasoning behind this decision be communicated honestly to those most affected by it?' },
      { label: 'Limitation transparency', detail: 'Institutions that are unwilling to acknowledge what they cannot do, do not know, or have failed at cannot be trusted with what they claim to do, know, or succeed at. Honest acknowledgment of limitations is a strength, not a vulnerability.' },
      { label: 'Conflict transparency', detail: 'All material conflicts of interest — financial, relational, and institutional — should be disclosed proactively and routinely, not only when challenged.' },
    ],
  },
  {
    id: 'accountability-mechanisms',
    icon: Scale,
    color: '#8BB89A',
    title: 'Accountability Mechanisms',
    description: 'Accountability is not an event — it is a system. Institutions that deploy accountability only in response to failure have not built accountability; they have built crisis management.',
    elements: [
      { label: 'Routine audit culture', detail: 'Internal and external review of institutional behavior — financial, operational, and ethical — should be routine and welcomed, not triggered only by complaint. Institutions that resist routine audit are declaring that they prefer not to know.' },
      { label: 'Independent oversight', detail: 'Self-regulation is necessary but structurally insufficient for domains where the institution has strong interests in the outcome of oversight. Independent external oversight — with genuine authority, not only advisory status — is the structural minimum for accountability.' },
      { label: 'Whistleblower protection', detail: 'The moral courage required to report institutional wrongdoing should not need to be heroic. Institutions that require heroism to be held accountable have designed accountability out of their governance structure. Genuine whistleblower protection is evidence of institutional integrity.' },
      { label: 'Error acknowledgment culture', detail: 'Institutions that acknowledge errors promptly, correct them transparently, and address their systemic causes are demonstrating integrity. Institutions that manage the communication of errors while protecting institutional reputation are demonstrating its absence.' },
    ],
  },
  {
    id: 'ethical-leadership',
    icon: Users,
    color: '#D4A07B',
    title: 'Ethical Leadership Architecture',
    description: 'Leadership selection, development, and accountability systems determine whether institutional values are operational realities or aspirational statements.',
    elements: [
      { label: 'Selection criteria that include ethical capacity', detail: 'Leadership selection processes that evaluate only technical competence and social network position produce leadership optimized for advancement rather than service. Ethical capacity — the demonstrated ability to make principled decisions under pressure — should be a selection criterion.' },
      { label: 'Leadership development that includes inner development', detail: 'Technical training develops capability. Inner development cultivates the character that determines how capability is deployed. Institutions that invest in technical development without inner development are producing capable practitioners whose ethical capacity is untested.' },
      { label: 'Accountability for leaders proportional to authority', detail: 'The ethical obligations of leadership are proportional to its authority. Leaders who face less accountability than those they lead have governance structures that protect the institution from its most consequential ethical risks.' },
      { label: 'Leadership transition ethics', detail: 'How leaders leave their positions reveals what they actually valued in them. Graceful, accountable transitions — with honest documentation of decisions, knowledge transfer, and acknowledgment of incomplete projects — are evidence of institutional commitment over personal positioning.' },
    ],
  },
  {
    id: 'sufi-governance-framework',
    icon: ShieldCheck,
    color: '#B8A97A',
    title: 'Sufi Institutional Ethics',
    description: 'Classical Islamic governance theory developed sophisticated frameworks for institutional ethics that remain analytically powerful for contemporary institutional design.',
    elements: [
      { label: 'Shura (Consultation)', detail: 'The Quranic principle of Shura — that decisions affecting a community should involve genuine consultation with those affected — is not merely procedural. It is an acknowledgment that the knowledge required for good decisions is distributed across those who will live with the consequences.' },
      { label: 'Hisbah (Institutional oversight)', detail: 'Classical Islamic governance included the Muhtasib — an institutional oversight function with authority to identify and correct institutional departures from ethical standards. This is the classical formulation of independent oversight: not optional, not advisory, but structurally embedded.' },
      { label: 'Waqf (Endowment ethics)', detail: 'The classical institution of Waqf — endowment held in perpetual trust for public benefit — demonstrates that institutional structures can be designed to resist capture by private interest across generations. The design principle: embed the public purpose in the structure itself.' },
      { label: 'Amr bil-Maruf (Commanding the good)', detail: 'The obligation to command what is good and forbid what is wrong extends to institutional actors. Silence in the face of institutional wrongdoing — for those with knowledge and authority — is not neutrality. It is participation.' },
    ],
  },
  {
    id: 'failure-analysis',
    icon: AlertCircle,
    color: '#C97B84',
    title: 'Institutional Failure Analysis',
    description: 'Understanding why institutions fail ethically is the prerequisite for designing governance structures that prevent recurrence.',
    elements: [
      { label: 'Mission drift', detail: 'Institutions gradually optimize for survival and growth rather than the mission that justified their creation. The diagnostic question: does the institution\'s current activity pattern reflect its stated mission, or has institutional maintenance become the actual mission?' },
      { label: 'Capture dynamics', detail: 'Regulatory and governance institutions are subject to capture by the interests they are designed to regulate. Capture is not dramatic — it is incremental: board appointments, funding dependencies, personnel flows, information access. Each step individually seems reasonable; the aggregate produces complicity.' },
      { label: 'Credentialism without accountability', detail: 'Institutional authority derived from credentials and prestige without proportional accountability creates conditions where the most powerful actors face the least oversight. This is the structural dynamic behind most major institutional scandals.' },
      { label: 'Emergency normalization', detail: 'Governance structures suspended during crises rarely fully restore. Institutions that accumulate authority through emergency provisions without proportional accountability expansion are demonstrating a preference for authority over institutional integrity.' },
    ],
  },
];

function PillarCard({ pillar }: { pillar: typeof GOVERNANCE_PILLARS[0] }) {
  const [open, setOpen] = useState(false);
  const Icon = pillar.icon;

  return (
    <div
      className="border rounded-2xl overflow-hidden transition-all duration-200"
      style={{ borderColor: open ? `${pillar.color}30` : 'rgba(255,255,255,0.07)' }}
    >
      <button
        className="w-full text-left p-6 flex items-start gap-5 group"
        onClick={() => setOpen(!open)}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${pillar.color}12`, border: `1px solid ${pillar.color}25` }}
        >
          <Icon className="h-5 w-5" style={{ color: pillar.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h2
              className="text-base font-bold leading-snug mb-1.5 transition-colors"
              style={{ color: open ? pillar.color : '#F5F3EE' }}
            >
              {pillar.title}
            </h2>
            <ChevronDown
              className="h-4 w-4 flex-shrink-0 transition-transform duration-200"
              style={{ color: open ? pillar.color : 'rgba(170,176,214,0.3)', transform: open ? 'rotate(180deg)' : undefined }}
            />
          </div>
          <p className="text-[12px] text-[#AAB0D6]/55 leading-relaxed line-clamp-2">{pillar.description}</p>
        </div>
      </button>

      {open && (
        <div className="border-t border-white/6 px-6 pb-6 pt-5 bg-[#080B1A]/40">
          <p className="text-[13px] text-[#D8D4CC]/75 leading-relaxed mb-6">{pillar.description}</p>
          <div className="space-y-4">
            {pillar.elements.map((el, i) => (
              <div key={i} className="border-l-2 pl-4" style={{ borderColor: `${pillar.color}30` }}>
                <p className="text-[12px] font-semibold mb-1" style={{ color: `${pillar.color}CC` }}>{el.label}</p>
                <p className="text-[12px] text-[#AAB0D6]/60 leading-relaxed">{el.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function InstitutionalGovernancePage() {
  return (
    <div className="min-h-screen bg-[#08091A]">
      <div className="max-w-5xl mx-auto px-5 py-16 sm:px-8 lg:px-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10 text-xs text-[#AAB0D6]/40">
          <Link href="/applied-civilization" className="hover:text-[#AAB0D6] transition-colors">Applied Civilization</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#AAB0D6]/70">Institutional Integrity & Governance</span>
        </div>

        {/* Hero */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8A75E]/20 bg-[#C8A75E]/[0.06] mb-6">
            <Compass className="h-3.5 w-3.5 text-[#C8A75E]" />
            <span className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest">Applied Civilization</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#F5F3EE] leading-tight mb-4">
            Institutional Integrity<br />
            <span className="text-[#C8A75E]">&amp; Governance</span>
          </h1>
          <p className="text-[15px] text-[#AAB0D6]/75 leading-relaxed max-w-3xl mb-4">
            Institutions express the values of the societies that create them — or fail to. Understanding
            how institutions are built, corrupted, and corrected is a prerequisite for meaningful ethical
            practice within them.
          </p>
          <p className="text-[13px] text-[#AAB0D6]/50 leading-relaxed max-w-3xl">
            This module covers structural integrity, transparency obligations, accountability mechanisms,
            ethical leadership architecture, Sufi institutional ethics, and institutional failure analysis.
          </p>
        </div>

        <ScrollReveal>
          <section className="space-y-4 mb-16">
            {GOVERNANCE_PILLARS.map((pillar) => (
              <PillarCard key={pillar.id} pillar={pillar} />
            ))}
          </section>
        </ScrollReveal>

        {/* Diagnostic Framework */}
        <ScrollReveal>
          <div className="border border-[#7BAFD4]/15 rounded-2xl bg-[#7BAFD4]/[0.03] p-8 mb-12">
            <p className="text-[10px] font-bold text-[#7BAFD4]/60 uppercase tracking-widest mb-3">Diagnostic Questions</p>
            <h3 className="text-lg font-serif font-bold text-[#F5F3EE] mb-4">
              Testing Institutional Integrity
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Does the institution acknowledge errors promptly, or does it manage their communication?',
                'Are the people most affected by institutional decisions involved in making them?',
                'Does the institution protect those who report internal wrongdoing?',
                'Is the institution\'s stated mission reflected in its actual resource allocation?',
                'Do leaders face accountability proportional to their authority?',
                'Are conflicts of interest disclosed proactively, or only when challenged?',
              ].map((q, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg border border-[#7BAFD4]/10 bg-[#7BAFD4]/[0.02]">
                  <span className="text-[10px] font-bold text-[#7BAFD4]/50 mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-[12px] text-[#AAB0D6]/65 leading-relaxed">{q}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Footer Nav */}
        <div className="border-t border-white/6 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/applied-civilization"
            className="inline-flex items-center gap-2 text-xs text-[#AAB0D6]/60 hover:text-[#AAB0D6] transition-colors"
          >
            <ChevronRight className="h-3.5 w-3.5 rotate-180" />
            Applied Civilization
          </Link>
          <Link
            href="/applied-civilization/alignment-assessment"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C8A75E]/25 text-[#C8A75E] text-xs font-semibold hover:bg-[#C8A75E]/10 transition-colors"
          >
            Alignment Assessment
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
