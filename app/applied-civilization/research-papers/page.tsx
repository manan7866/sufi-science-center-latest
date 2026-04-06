'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight, ArrowRight, ScrollText, Compass, BookOpen,
  FlaskConical, Scale, Globe, Building2, ChevronDown,
} from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';

const RESEARCH_DOMAINS = [
  {
    id: 'governance-ethics',
    icon: Scale,
    color: '#7BAFD4',
    label: 'Governance & Ethics',
    papers: [
      {
        title: 'Authority, Accountability, and the Sufi Ethical Tradition',
        abstract: 'An examination of classical Sufi frameworks for evaluating the legitimacy of political authority, with application to contemporary institutional governance failures. Drawing on Ibn Arabi, Al-Ghazali, and Rumi\'s political writings.',
        themes: ['Political legitimacy', 'Institutional accountability', 'Amanah in governance'],
        status: 'In Development',
      },
      {
        title: 'Shura and Democratic Deliberation: Structural Parallels',
        abstract: 'A comparative analysis of the Quranic principle of Shura (consultation) and contemporary deliberative democracy theory, identifying structural convergences and divergences with implications for governance design.',
        themes: ['Democratic theory', 'Islamic governance', 'Deliberative institutions'],
        status: 'In Development',
      },
      {
        title: 'The Muhtasib Institution and Independent Oversight',
        abstract: 'Historical analysis of the Muhtasib — the classical Islamic institutional oversight function — and its relevance to contemporary regulatory design, independent ethics commissions, and anti-corruption architecture.',
        themes: ['Institutional oversight', 'Anti-corruption', 'Regulatory design'],
        status: 'Proposed',
      },
    ],
  },
  {
    id: 'professional-civilization',
    icon: Building2,
    color: '#C8A75E',
    label: 'Professional Civilization',
    papers: [
      {
        title: 'The Amplification Problem: Ego Dynamics in Professional Authority',
        abstract: 'A systematic analysis of how professional roles amplify specific psychological faculties and the characteristic corruption patterns that result when amplification is not regulated by inner discipline. Draws on Sufi Nafs psychology and contemporary organizational ethics.',
        themes: ['Professional ethics', 'Nafs psychology', 'Institutional corruption'],
        status: 'In Development',
      },
      {
        title: 'Sacred Professions: A Civilizational Typology',
        abstract: 'A comprehensive typological analysis of professional roles through the lens of Sufi ethical categories. Proposes a civilizational classification of professions by their amplification dynamics, ethical risks, and accountability requirements.',
        themes: ['Professional typology', 'Applied civilization', 'Ethics architecture'],
        status: 'In Development',
      },
      {
        title: 'Niyyah and Professional Intent: Ethics Beyond Compliance',
        abstract: 'An analysis of the Islamic concept of Niyyah (intention) as a framework for professional ethics that transcends rule compliance. Argues that ethics grounded in intention rather than constraint produces more robust professional behavior under conditions where external accountability is absent.',
        themes: ['Professional intent', 'Ethics theory', 'Islamic jurisprudence'],
        status: 'Proposed',
      },
    ],
  },
  {
    id: 'knowledge-systems',
    icon: BookOpen,
    color: '#8BB89A',
    label: 'Knowledge Systems',
    papers: [
      {
        title: 'Epistemological Humility in Scientific Practice: A Sufi Framework',
        abstract: 'Drawing on the Sufi epistemological tradition — particularly the concept of Kashf (unveiled perception) and its relationship to systematic observation — this paper proposes an epistemological framework for scientific practice that integrates rigor with humility about the limits of empirical method.',
        themes: ['Epistemology', 'Scientific practice', 'Sufi knowledge theory'],
        status: 'In Development',
      },
      {
        title: 'Ilm as Obligation: Knowledge Ethics in Islamic Thought',
        abstract: 'An examination of the classical Islamic doctrine that knowledge creates obligation — that knowing something without acting on it represents an ethical failure. Applications to contemporary knowledge professions: scientific researchers, policy analysts, journalists.',
        themes: ['Knowledge ethics', 'Professional obligation', 'Islamic epistemology'],
        status: 'Proposed',
      },
    ],
  },
  {
    id: 'applied-ethics',
    icon: FlaskConical,
    color: '#D4A07B',
    label: 'Applied Ethical Analysis',
    papers: [
      {
        title: 'AI Governance Through Sufi Moral Psychology',
        abstract: 'A systematic application of Sufi moral psychology — particularly the concepts of Nafs, Aql, Niyyah, and Hisab — to the governance challenges of artificial intelligence. Argues that AI governance frameworks that locate accountability in human principals rather than systems are more aligned with Islamic ethical principles than techno-centric approaches.',
        themes: ['AI ethics', 'Governance frameworks', 'Moral accountability'],
        status: 'In Development',
      },
      {
        title: 'Khalifa and Climate Ethics: Stewardship as Political Obligation',
        abstract: 'A theological and political analysis of the Quranic concept of Khalifa (stewardship) as a framework for climate governance. Argues that stewardship ethics produces different — and in important ways more robust — climate obligations than utilitarian or rights-based frameworks.',
        themes: ['Climate ethics', 'Khalifa framework', 'Environmental governance'],
        status: 'In Development',
      },
      {
        title: 'The Ethics of Dual-Use Research: Islamic Bioethics and Biosafety',
        abstract: 'An examination of contemporary dual-use research ethics — particularly in synthetic biology and gain-of-function research — through the lens of classical Islamic bioethical principles. Identifies significant convergences between contemporary biosafety governance recommendations and Islamic ethical obligations.',
        themes: ['Bioethics', 'Dual-use research', 'Islamic medical ethics'],
        status: 'Proposed',
      },
    ],
  },
  {
    id: 'civilizational-theory',
    icon: Globe,
    color: '#B8A97A',
    label: 'Civilizational Theory',
    papers: [
      {
        title: 'Spiritual Integrity in Public Life: A Civilizational Architecture',
        abstract: 'A comprehensive theoretical framework for the integration of inner development with public professional responsibility. Argues that sustainable ethical conduct in public life requires systematic inner discipline, not merely training in ethical rules or compliance with external accountability mechanisms.',
        themes: ['Civilizational ethics', 'Inner development', 'Public life'],
        status: 'In Development',
      },
      {
        title: 'Beyond Secularism and Theocracy: A Third Model of Ethical Governance',
        abstract: 'Drawing on the Sufi tradition\'s long practice of operating within diverse political contexts while maintaining principled ethical standards, this paper proposes a third model: ethical governance grounded in principled inner discipline rather than either secular proceduralism or religious authority.',
        themes: ['Political philosophy', 'Governance models', 'Sufi political thought'],
        status: 'Proposed',
      },
    ],
  },
];

function PaperCard({ paper, color }: { paper: typeof RESEARCH_DOMAINS[0]['papers'][0]; color: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border rounded-xl bg-white/[0.01] transition-all duration-200"
      style={{ borderColor: open ? `${color}25` : 'rgba(255,255,255,0.06)' }}
    >
      <button
        className="w-full text-left p-5 flex items-start justify-between gap-4 group"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1 min-w-0">
          <h4
            className="text-[13px] font-semibold leading-snug mb-2 transition-colors"
            style={{ color: open ? color : '#F5F3EE' }}
          >
            {paper.title}
          </h4>
          {!open && (
            <p className="text-[11px] text-[#AAB0D6]/45 leading-relaxed line-clamp-2">{paper.abstract}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <span
            className="text-[9px] px-2 py-0.5 rounded-full border uppercase tracking-wide font-bold"
            style={{
              color: paper.status === 'In Development' ? '#8BB89A' : '#AAB0D6',
              borderColor: paper.status === 'In Development' ? '#8BB89A30' : 'rgba(170,176,214,0.2)',
              backgroundColor: paper.status === 'In Development' ? '#8BB89A10' : 'rgba(170,176,214,0.05)',
            }}
          >
            {paper.status}
          </span>
          <ChevronDown
            className="h-3.5 w-3.5 transition-transform duration-200"
            style={{ color: open ? color : 'rgba(170,176,214,0.3)', transform: open ? 'rotate(180deg)' : undefined }}
          />
        </div>
      </button>
      {open && (
        <div className="border-t border-white/5 px-5 pb-5 pt-4 space-y-4">
          <p className="text-[12px] text-[#AAB0D6]/65 leading-relaxed">{paper.abstract}</p>
          <div className="flex flex-wrap gap-2">
            {paper.themes.map((t) => (
              <span
                key={t}
                className="text-[10px] px-2.5 py-1 rounded-full border"
                style={{ color: `${color}CC`, borderColor: `${color}20`, backgroundColor: `${color}08` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DomainSection({ domain }: { domain: typeof RESEARCH_DOMAINS[0] }) {
  const [collapsed, setCollapsed] = useState(false);
  const Icon = domain.icon;

  return (
    <div className="space-y-4">
      <button
        className="w-full flex items-center justify-between gap-3 group"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${domain.color}12`, border: `1px solid ${domain.color}25` }}
          >
            <Icon className="h-4 w-4" style={{ color: domain.color }} />
          </div>
          <div className="text-left">
            <h2 className="text-sm font-bold text-[#F5F3EE] group-hover:text-[#C8A75E] transition-colors uppercase tracking-wider">
              {domain.label}
            </h2>
            <p className="text-[10px] text-[#AAB0D6]/30 mt-0.5">{domain.papers.length} papers</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-white/4 w-20 hidden sm:block" />
          <ChevronDown
            className="h-4 w-4 flex-shrink-0 transition-transform duration-200"
            style={{ color: 'rgba(170,176,214,0.3)', transform: collapsed ? undefined : 'rotate(180deg)' }}
          />
        </div>
      </button>

      {!collapsed && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 ml-0 sm:ml-12">
          {domain.papers.map((paper, i) => (
            <PaperCard key={i} paper={paper} color={domain.color} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ResearchPapersPage() {
  return (
    <div className="min-h-screen bg-[#08091A]">
      <div className="max-w-6xl mx-auto px-5 py-16 sm:px-8 lg:px-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10 text-xs text-[#AAB0D6]/40">
          <Link href="/applied-civilization" className="hover:text-[#AAB0D6] transition-colors">Applied Civilization</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#AAB0D6]/70">Civilizational Research & Papers</span>
        </div>

        {/* Hero */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8A75E]/20 bg-[#C8A75E]/[0.06] mb-6">
            <Compass className="h-3.5 w-3.5 text-[#C8A75E]" />
            <span className="text-[10px] font-bold text-[#C8A75E] uppercase tracking-widest">Applied Civilization</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#F5F3EE] leading-tight mb-4">
            Civilizational<br />
            <span className="text-[#C8A75E]">Research &amp; Papers</span>
          </h1>
          <p className="text-[15px] text-[#AAB0D6]/75 leading-relaxed max-w-3xl mb-4">
            Original research at the intersection of Sufi ethics, governance science, institutional design,
            and civilizational philosophy. These papers are in development and proposed — not published archives.
          </p>
          <p className="text-[13px] text-[#AAB0D6]/50 leading-relaxed max-w-3xl">
            The research agenda of Applied Civilization is to develop systematic, peer-reviewable frameworks
            that bring the Sufi ethical tradition into direct dialogue with the most pressing questions of
            contemporary professional and institutional life.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14 border-y border-white/5 py-8">
          {[
            { value: String(RESEARCH_DOMAINS.reduce((n, d) => n + d.papers.length, 0)), label: 'Research Papers' },
            { value: String(RESEARCH_DOMAINS.length), label: 'Research Domains' },
            { value: String(RESEARCH_DOMAINS.flatMap(d => d.papers).filter(p => p.status === 'In Development').length), label: 'In Development' },
            { value: 'Open', label: 'Access Model' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-serif font-bold text-[#C8A75E]">{s.value}</p>
              <p className="text-[10px] text-[#AAB0D6]/40 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Research Domains */}
        <ScrollReveal>
          <section className="space-y-12 mb-16">
            {RESEARCH_DOMAINS.map((domain) => (
              <DomainSection key={domain.id} domain={domain} />
            ))}
          </section>
        </ScrollReveal>

        {/* Contribute */}
        <ScrollReveal>
          <div className="border border-[#8BB89A]/15 rounded-2xl bg-[#8BB89A]/[0.03] p-8 mb-12">
            <p className="text-[10px] font-bold text-[#8BB89A]/60 uppercase tracking-widest mb-3">Contribute</p>
            <h3 className="text-lg font-serif font-bold text-[#F5F3EE] mb-3">
              Research Submissions & Collaboration
            </h3>
            <p className="text-[13px] text-[#AAB0D6]/65 leading-relaxed max-w-xl mb-6">
              Applied Civilization welcomes research submissions and collaborative inquiries from scholars,
              practitioners, and institutional researchers working at the intersections of Sufi ethics,
              governance theory, professional ethics, and civilizational philosophy.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contribute/submit"
                className="inline-flex items-center gap-2 bg-[#C8A75E] text-[#08091A] font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-[#D4B870] transition-colors"
              >
                Submit Research
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contribute/conference"
                className="inline-flex items-center gap-2 border border-[#C8A75E]/25 text-[#C8A75E] font-medium px-5 py-2.5 rounded-xl text-sm hover:bg-[#C8A75E]/8 transition-colors"
              >
                Conference Submissions
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
            href="/research"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C8A75E]/25 text-[#C8A75E] text-xs font-semibold hover:bg-[#C8A75E]/10 transition-colors"
          >
            Institute Research
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
