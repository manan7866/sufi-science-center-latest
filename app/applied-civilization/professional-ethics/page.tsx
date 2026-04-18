'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown, ChevronRight, ArrowRight, Scale, Compass,
  Shield, BookOpen, Layers, AlertTriangle, CheckCircle2,
} from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';

const FRAMEWORK_MODULES = [
  {
    id: 'ethical-foundation',
    icon: Scale,
    color: '#C8A75E',
    title: 'Ethical Foundation',
    subtitle: 'Grounded in Classical Sufi Moral Philosophy',
    body: 'Every professional ethical framework in this system is grounded in the classical Sufi moral tradition — not as rhetorical ornamentation, but as a systematic analytical structure. The core concepts: Justice (Adl), Trust (Amanah), Sincerity (Ikhlas), Balance (Tawazun), and Public Benefit (Maslaha).',
    principles: [
      {
        term: 'Adl (Justice)',
        definition: 'Justice is not the outcome of correct procedure — it is the orientation that gives procedure its purpose. Every professional decision can be evaluated against this standard: does it distribute benefit and burden equitably among all affected parties?',
      },
      {
        term: 'Amanah (Trust)',
        definition: 'Every professional role is a form of delegated trust. The physician holds the trust of the patient\'s vulnerability. The judge holds the trust of those who cannot obtain justice themselves. The engineer holds the trust of the communities their structures will shelter. Trust is not a metaphor — it is a precise obligation with identifiable content.',
      },
      {
        term: 'Ikhlas (Sincerity)',
        definition: 'Professional sincerity is not performative. It is the alignment of visible action with invisible motivation. Ikhlas demands that the professional examine their actual motivations — not their stated ones — and correct the gap between them.',
      },
      {
        term: 'Tawazun (Balance)',
        definition: 'Professional ethics regularly requires holding competing obligations in tension rather than resolving them prematurely. Tawazun is the capacity to sustain that tension without collapsing it into a single value at the expense of others.',
      },
      {
        term: 'Maslaha (Public Benefit)',
        definition: 'Classical Islamic jurisprudence developed Maslaha as a principle for evaluating actions by their contribution to human flourishing. It provides a framework for professional ethics that transcends rule compliance: the question is not only whether this action is permitted but whether it serves the common good.',
      },
    ],
  },
  {
    id: 'psychological-model',
    icon: Layers,
    color: '#7BAFD4',
    title: 'Sufi Psychological Model',
    subtitle: 'How Ego Dynamics Manifest in Professional Power',
    body: 'Each profession amplifies a specific psychological faculty. Unregulated amplification produces characteristic forms of corruption. The Sufi model of the self — Nafs, Aql, Qalb, Ruh — provides a systematic framework for identifying and correcting these distortions.',
    principles: [
      {
        term: 'The Amplification Problem',
        definition: 'Power amplifies ego. Wealth amplifies attachment. Knowledge amplifies pride. Healing amplifies the messianic impulse. Technical control amplifies the illusion of mastery. These are not incidental risks — they are structurally embedded in the work itself. Recognition is the first step; systematic calibration is the practice.',
      },
      {
        term: 'Nafs al-Ammara (The Commanding Self)',
        definition: 'The self in its unregulated state — demanding, self-justifying, resistant to accountability. In professional contexts: the ego that uses institutional authority to avoid personal responsibility. The statesman who governs for survival rather than service. The physician who protects reputation over patient welfare.',
      },
      {
        term: 'Nafs al-Lawwama (The Self-Examining Self)',
        definition: 'The self capable of moral self-scrutiny — acknowledging wrongdoing without complete self-destruction. The professional capacity for genuine accountability: the ability to say "I was wrong" and correct course without institutional cover-up.',
      },
      {
        term: 'Nafs al-Mutmainna (The Tranquil Self)',
        definition: 'The self operating from integrated values rather than reactive impulse. In professional contexts: the practitioner whose authority is grounded in principle rather than status, whose decisions remain consistent under pressure, whose accountability is voluntary rather than coerced.',
      },
      {
        term: 'Qalb (The Perceptual Heart)',
        definition: 'The faculty that integrates knowledge with moral sensitivity. In professional contexts: the capacity to respond to what the situation actually requires rather than what institutional protocol specifies. The physician who hears the patient behind the diagnosis. The judge who perceives injustice behind legal compliance.',
      },
    ],
  },
  {
    id: 'professional-crisis',
    icon: AlertTriangle,
    color: '#D4A07B',
    title: 'Professional Crisis Analysis',
    subtitle: 'Systemic Failure Patterns Across Domains',
    body: 'Modern professional crises are not primarily failures of individual character — they are failures of professional architecture. Systems that incentivize behavior contrary to the stated purpose of the profession. Understanding these systemic patterns is the prerequisite for structural correction.',
    principles: [
      {
        term: 'AI: Optimization Without Ethics',
        definition: 'Artificial intelligence systems are optimized for measurable proxies of desired outcomes. The proxies systematically diverge from the actual goals. The result: systems that achieve benchmark performance while producing discriminatory, harmful, or ungovernable behavior. The solution requires ethical integration at design, not post-deployment mitigation.',
      },
      {
        term: 'Finance: Profit Without Stewardship',
        definition: 'Financial systems optimized for short-term return create structural incentives for the extraction of value from productive activity, concentration of wealth, and externalization of risk onto the less powerful. The ethical framework is present in classical economics — it has been systematically removed from professional practice.',
      },
      {
        term: 'Media: Amplification Without Truth',
        definition: 'Revenue models that reward engagement over accuracy create professional incentives for emotional amplification, outrage generation, and factional identity reinforcement. The result: an information environment that systematically degrades collective epistemic capacity.',
      },
      {
        term: 'Medicine: Authority Without Partnership',
        definition: 'Clinical authority that is not grounded in genuine patient partnership produces informed consent as documentation exercise, diagnostic certainty as emotional management strategy, and institutional reputation protection as the primary response to medical error.',
      },
      {
        term: 'Governance: Power Without Accountability',
        definition: 'Political systems that prioritize institutional survival over public service produce regulatory capture, policy optimized for electoral advantage, and accountability mechanisms designed to fail. The ethical framework is not absent — it has been deliberately weakened.',
      },
    ],
  },
  {
    id: 'operational-framework',
    icon: CheckCircle2,
    color: '#8BB89A',
    title: 'Applied Operational Framework',
    subtitle: 'Concrete Implementation Across Professional Contexts',
    body: 'Abstract ethics becomes applied ethics through operational frameworks: decision matrices, governance principles, ethical checklists, and accountability protocols. The frameworks below are applicable across professional domains with context-specific adaptation.',
    principles: [
      {
        term: 'The Stakeholder Audit',
        definition: 'Before any significant professional decision: identify every party affected by the decision, map the distribution of benefit and harm across them, and interrogate whether the distribution is just. This is not a procedure — it is a disciplined habit of moral attention.',
      },
      {
        term: 'The Transparency Test',
        definition: 'Would you be willing to explain your reasoning — including your actual motivations, not your stated ones — to the people most affected by your decision? If not: why not? The answer to that question identifies what requires correction.',
      },
      {
        term: 'The Long-Term Frame',
        definition: 'Professional decisions optimized for short-term performance metrics systematically produce long-term harm. The operational discipline: before finalizing any significant decision, extend the evaluative time horizon. What are the five-year, ten-year, and generational consequences?',
      },
      {
        term: 'The Power Differential Protocol',
        definition: 'Every professional relationship involves power differentials. The ethical obligation runs downward in the hierarchy: the more power you hold, the more proactive your accountability obligations. This is not sentiment — it is the structural logic of fiduciary responsibility.',
      },
      {
        term: 'The Correction Culture',
        definition: 'Professional error is inevitable. The ethical measure is not whether errors occur but whether they are acknowledged, corrected, and systemically addressed. Institutions that protect reputation over accountability guarantee the repetition of correctable errors.',
      },
    ],
  },
  {
    id: 'accountability-boundaries',
    icon: Shield,
    color: '#9B8DC4',
    title: 'Accountability Boundaries',
    subtitle: 'Where Misuse Begins and Oversight Safeguards',
    body: 'Accountability boundaries define the limits of professional authority and the conditions under which external oversight is not merely appropriate but required. These are not constraints on competence — they are the structural conditions for trust.',
    principles: [
      {
        term: 'Authority Requires Consent',
        definition: 'All legitimate professional authority derives from the consent of those subject to it. Authority exercised without adequate consent — informational, democratic, or contractual — is coercion regardless of technical legality.',
      },
      {
        term: 'Spiritual Authority is Especially Vulnerable to Abuse',
        definition: 'The combination of genuine expertise, institutional prestige, and the elevated trust placed in spiritual or ethical authorities creates conditions that require proportionally greater accountability structures, not less. Closed systems of spiritual transmission without external scrutiny predictably generate abuse.',
      },
      {
        term: 'Self-Regulation is Necessary But Insufficient',
        definition: 'Professional self-regulation is the first line of ethical governance. It is never the last. External oversight, public accountability, and independent audit mechanisms are not challenges to professional integrity — they are its infrastructure.',
      },
      {
        term: 'The Abuse of Methodology',
        definition: 'Sophisticated institutional actors can use ethical frameworks as legitimation tools while pursuing contrary aims. The test of an ethical framework is its application when it is costly to apply it — when the institution must sacrifice advantage to maintain principle.',
      },
      {
        term: 'Whistleblowing as Ethical Obligation',
        definition: 'The ethical practitioner who observes institutional wrongdoing bears a positive obligation to report it — not merely a right to do so. This obligation has costs. Institutions that fail to protect whistleblowers effectively prevent the accountability mechanisms their own stated values require.',
      },
    ],
  },
];

function ModulePanel({ mod }: { mod: typeof FRAMEWORK_MODULES[0] }) {
  const [open, setOpen] = useState(false);
  const Icon = mod.icon;

  return (
    <div
      className="border rounded-2xl overflow-hidden transition-all duration-200"
      style={{ borderColor: open ? `${mod.color}30` : 'rgba(255,255,255,0.07)' }}
    >
      <button
        className="w-full text-left p-6 flex items-start gap-5 group"
        onClick={() => setOpen(!open)}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
          style={{ backgroundColor: `${mod.color}12`, border: `1px solid ${mod.color}25` }}
        >
          <Icon className="h-5 w-5" style={{ color: mod.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                className="text-base font-bold leading-snug mb-1 transition-colors"
                style={{ color: open ? mod.color : '#F5F3EE' }}
              >
                {mod.title}
              </h2>
              <p className="text-[11px] text-[#AAB0D6]/50 uppercase tracking-wide">{mod.subtitle}</p>
            </div>
            <ChevronDown
              className="h-4 w-4 flex-shrink-0 mt-0.5 transition-transform duration-200"
              style={{ color: open ? mod.color : 'rgba(170,176,214,0.3)', transform: open ? 'rotate(180deg)' : undefined }}
            />
          </div>
          {!open && (
            <p className="text-[13px] text-[#AAB0D6]/55 leading-relaxed mt-2 line-clamp-2">{mod.body}</p>
          )}
        </div>
      </button>

      {open && (
        <div className="border-t border-white/6 px-6 pb-6 pt-5 bg-[#080B1A]/40">
          <p className="text-[13px] text-[#D8D4CC]/80 leading-relaxed mb-6">{mod.body}</p>
          <div className="space-y-4">
            {mod.principles.map((p, i) => (
              <div key={i} className="border-l-2 pl-4" style={{ borderColor: `${mod.color}30` }}>
                <p className="text-[12px] font-semibold mb-1" style={{ color: `${mod.color}CC` }}>{p.term}</p>
                <p className="text-[12px] text-[#AAB0D6]/65 leading-relaxed">{p.definition}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProfessionalEthicsPage() {
  return (
    <div className="min-h-screen bg-[#0B0F2A]">
      <div className="max-w-7xl mx-auto px-5 py-16 sm:px-8 lg:px-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10 text-xs text-[#AAB0D6]/40">
          <Link href="/applied-civilization" className="hover:text-[#AAB0D6] transition-colors">Applied Civilization</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#AAB0D6]/70">Professional Ethics Framework</span>
        </div>

        {/* Hero */}
        <div className="my-32">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8A75E]/20 bg-[#C8A75E]/[0.06] mb-6">
            <Compass className="h-3.5 w-3.5 text-[#C8A75E]" />
            <span className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest">Applied Civilization</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#F5F3EE] leading-tight mb-4">
            Professional Ethics<br />
            <span className="text-[#C8A75E]">Framework</span>
          </h1>
          <p className="text-[15px] text-[#AAB0D6]/75 leading-relaxed max-w-3xl mb-4">
            A systematic framework grounded in classical Sufi moral philosophy, applied to the structural
            ethical challenges of contemporary professional life. Five modules. One integrated architecture.
          </p>
          <p className="text-[13px] text-[#AAB0D6]/50 leading-relaxed max-w-3xl">
            This framework is not decorative ethics. It is operational architecture for practitioners who
            bear real authority over real human lives and require more than good intentions to exercise
            that authority responsibly.
          </p>
        </div>

        {/* Framework Modules */}
        <ScrollReveal>
          <section className="space-y-4 mb-16">
            {FRAMEWORK_MODULES.map((mod) => (
              <ModulePanel key={mod.id} mod={mod} />
            ))}
          </section>
        </ScrollReveal>

        {/* Integration Note */}
        <ScrollReveal>
          <div className="border border-[#C8A75E]/15 rounded-2xl bg-[#C8A75E]/[0.03] p-8 mb-12">
            <p className="text-[10px] font-bold text-[#C8A75E]/60 uppercase tracking-widest mb-3">Integration Note</p>
            <h3 className="text-lg font-serif font-bold text-[#F5F3EE] mb-3">
              Framework and Practice Are Not Separate
            </h3>
            <p className="text-[13px] text-[#AAB0D6]/70 leading-relaxed max-w-3xl mb-4">
              This framework is integrated with the Applied Civilization assessment instruments, the Sacred Professions
              map, and the NextGEN Platform discipline channels. Ethical frameworks that are not connected to
              measurable practice remain abstract. The goal here is integration: inner discipline grounded in
              principled framework, expressed in accountable professional action.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/applied-civilization/alignment-assessment"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C8A75E] text-[#08091A] text-xs font-bold hover:bg-[#D4B870] transition-colors"
              >
                Take Alignment Assessment
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/applied-civilization/sacred-professions"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C8A75E]/25 text-[#C8A75E] text-xs font-semibold hover:bg-[#C8A75E]/10 transition-colors"
              >
                Sacred Professions
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
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
            href="/applied-civilization/institutional-governance"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C8A75E]/25 text-[#C8A75E] text-xs font-semibold hover:bg-[#C8A75E]/10 transition-colors"
          >
            Institutional Governance
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
