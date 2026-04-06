import Link from 'next/link';
import { ObservatoryHero } from '@/components/observatory-hero';
import { FileText, ArrowLeft, Download, Calendar, Clock } from 'lucide-react';

const WHITE_PAPERS = [
  {
    title: 'Towards an Integrative Science of Inner Development',
    subtitle: 'A Position Paper from the Sufi Science Center',
    date: 'March 2024',
    readTime: '45 min read',
    pages: 38,
    summary:
      'This position paper argues for the legitimacy and necessity of an integrative science of inner development — one that draws on the rigorous empirical and theoretical heritage of Sufi knowledge traditions while engaging with contemporary scientific methodologies. We propose a research programme, methodological framework, and institutional agenda for advancing this agenda.',
    sections: [
      'The Crisis of Fragmentation in Consciousness Research',
      'Sufi Knowledge Traditions as Empirical Systems',
      'Methodological Pluralism and Integrative Inquiry',
      'A Proposed Research Programme',
      'Institutional Implications',
    ],
    tags: ['Consciousness', 'Methodology', 'Research Programme'],
  },
  {
    title: 'The Problem of Transmission: Authority, Lineage, and Knowledge in Sufi Pedagogy',
    subtitle: 'An Institutional Analysis',
    date: 'November 2023',
    readTime: '35 min read',
    pages: 29,
    summary:
      'This paper examines the institutional mechanisms by which authoritative knowledge is transmitted within Sufi pedagogical traditions, focusing on the roles of silsila (lineage), ijaza (authorisation), and suhba (companionship). We analyse the epistemic foundations of these mechanisms and their relevance for contemporary contemplative education.',
    sections: [
      'The Epistemics of Spiritual Authority',
      'Silsila as Living Chain: Historical and Functional Analysis',
      'Ijaza: Authorisation, Responsibility, and Accountability',
      'Suhba and the Pedagogy of Presence',
      'Implications for Contemporary Practice',
    ],
    tags: ['Pedagogy', 'Lineage', 'Epistemology', 'Transmission'],
  },
  {
    title: 'Non-Dual States and the Hard Problem: A Sufi Response',
    subtitle: 'Philosophical Analysis and Empirical Considerations',
    date: 'June 2023',
    readTime: '40 min read',
    pages: 34,
    summary:
      'David Chalmers\' formulation of the hard problem of consciousness has generated extensive philosophical debate. This white paper examines how classical Sufi accounts of non-dual states — particularly the concepts of fana and baqa — offer a distinctive and coherent contribution to this debate, challenging key assumptions in both physicalist and dualist positions.',
    sections: [
      'The Hard Problem: A Brief Survey',
      'Non-Dual States in the Sufi Literature',
      'Fana as Empirical Data: Methodological Considerations',
      'A Sufi Response to the Hard Problem',
      'Areas of Convergence and Divergence',
    ],
    tags: ['Consciousness', 'Philosophy of Mind', 'Non-Dual States'],
  },
  {
    title: 'Sacred Science and Secular Inquiry: Navigating the Boundary',
    subtitle: 'Institutional Policy Paper',
    date: 'January 2023',
    readTime: '25 min read',
    pages: 21,
    summary:
      'This institutional policy paper addresses the methodological and ethical challenges that arise when sacred knowledge traditions engage with secular scientific frameworks. We outline principles for productive engagement, identify common pitfalls, and articulate the Sufi Science Center\'s approach to maintaining intellectual integrity across these different epistemic registers.',
    sections: [
      'The Challenge of Epistemic Boundary-Crossing',
      'Common Pitfalls: Reductionism, Romanticisation, and Appropriation',
      'Principled Engagement: Our Methodological Commitments',
      'Practical Guidelines for Researchers',
      'Institutional Accountability Mechanisms',
    ],
    tags: ['Methodology', 'Ethics', 'Institutional Policy'],
  },
];

export const metadata = {
  title: 'White Papers — Sufi Science Center',
  description: 'In-depth position papers and institutional analyses from the Sufi Science Center.',
};

export default function WhitePapersPage() {
  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Institutional Analysis"
        title="White Papers"
        description="In-depth position papers, methodological analyses, and institutional frameworks advancing rigorous inquiry at the intersection of sacred knowledge and contemporary science."
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

          <div className="space-y-6">
            {WHITE_PAPERS.map((paper, i) => (
              <article
                key={i}
                className="glass-panel rounded-2xl p-8 border border-white/5 hover:border-[#C8A75E]/15 transition-all duration-300 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-[#C8A75E]" />
                      <span className="text-[10px] text-[#AAB0D6]/40 tracking-widest uppercase">
                        White Paper
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#F5F3EE] leading-snug group-hover:text-[#C8A75E] transition-colors mb-1">
                      {paper.title}
                    </h3>
                    <p className="text-sm text-[#AAB0D6]/50 italic">{paper.subtitle}</p>
                  </div>
                  <button className="flex-shrink-0 flex items-center gap-2 text-xs text-[#C8A75E] bg-[#C8A75E]/10 border border-[#C8A75E]/25 px-4 py-2 rounded-lg hover:bg-[#C8A75E]/16 transition-all">
                    <Download className="w-3.5 h-3.5" />
                    Download PDF
                  </button>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-[#AAB0D6]/50 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {paper.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {paper.readTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    {paper.pages} pages
                  </span>
                </div>

                <p className="text-sm text-[#AAB0D6]/70 leading-relaxed mb-6">{paper.summary}</p>

                <div className="mb-5">
                  <p className="text-[10px] tracking-widest uppercase text-[#AAB0D6]/30 mb-3">
                    Contents
                  </p>
                  <ol className="space-y-1">
                    {paper.sections.map((section, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-[#AAB0D6]/55">
                        <span className="text-[#C8A75E]/40 font-mono flex-shrink-0">{j + 1}.</span>
                        {section}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex flex-wrap gap-2">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-[#C8A75E]/8 border border-[#C8A75E]/15 text-[#C8A75E]/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 glass-panel rounded-2xl p-8 border border-[#C8A75E]/10 text-center">
            <h3 className="text-lg font-serif font-semibold text-[#F5F3EE] mb-2">
              Contribute a Position Paper
            </h3>
            <p className="text-sm text-[#AAB0D6]/60 mb-5 max-w-xl mx-auto">
              We publish rigorous institutional analyses and position papers addressing foundational
              questions in integrative research. Submit a proposal for consideration.
            </p>
            <Link
              href="/contribute/submit"
              className="inline-flex items-center gap-2 text-sm text-[#C8A75E] font-semibold bg-[#C8A75E]/10 border border-[#C8A75E]/25 px-5 py-2.5 rounded-lg hover:bg-[#C8A75E]/16 transition-all"
            >
              Submit a Proposal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
