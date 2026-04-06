import Link from 'next/link';
import { ObservatoryHero } from '@/components/observatory-hero';
import { FlaskConical, ExternalLink, Calendar, Users, BookOpen, ArrowLeft } from 'lucide-react';

const PAPERS = [
  {
    title: 'Consciousness and the Sufi Concept of Fana: A Phenomenological Investigation',
    authors: ['Dr. Fayaz Ahmad Khan', 'Dr. Amina Hassan'],
    journal: 'Journal of Consciousness Studies',
    year: '2024',
    volume: '31(4)',
    pages: '112–138',
    abstract:
      'This paper examines the Sufi doctrine of fana (annihilation of the ego) through the lens of contemporary phenomenological methodology, drawing parallels with third-person neuroscientific accounts of non-dual states and exploring their implications for consciousness theory.',
    themes: ['Consciousness Studies', 'Phenomenology', 'Sufi Psychology'],
    status: 'Published',
  },
  {
    title: 'Maqam and Hal: Towards a Developmental Cartography of Contemplative States',
    authors: ['Dr. Fayaz Ahmad Khan'],
    journal: 'Contemplative Sciences',
    year: '2024',
    volume: '8(2)',
    pages: '45–72',
    abstract:
      'Distinguishing between enduring stations (maqamat) and transient states (ahwal) in Sufi developmental psychology, this paper proposes an integrative framework that bridges classical Islamic psychology with contemporary developmental stage theory.',
    themes: ['Inner Development', 'Stage Theory', 'Islamic Psychology'],
    status: 'Published',
  },
  {
    title: 'Dhikr as Attentional Training: Neurological and Contemplative Perspectives',
    authors: ['Dr. Amina Hassan', 'Prof. Sarah Chen'],
    journal: 'Frontiers in Psychology',
    year: '2023',
    volume: '14',
    pages: '889421',
    abstract:
      'An interdisciplinary analysis of the practice of dhikr (remembrance) as a structured form of attentional cultivation. This study compares first-person contemplative accounts with third-person neuroimaging data from advanced practitioners.',
    themes: ['Neuroscience', 'Contemplative Practice', 'Attention Research'],
    status: 'Published',
  },
  {
    title: 'The Epistemology of Kashf: Illuminative Knowledge and the Limits of Rational Inquiry',
    authors: ['Dr. Fayaz Ahmad Khan', 'Omar Farid'],
    journal: 'Philosophy East and West',
    year: '2023',
    volume: '73(3)',
    pages: '788–814',
    abstract:
      'This paper critically examines the epistemological status of kashf (mystical unveiling) within classical Sufi thought, arguing that it represents a coherent epistemological category that complements rather than contradicts rational modes of knowing.',
    themes: ['Epistemology', 'Islamic Philosophy', 'Knowledge Theory'],
    status: 'Published',
  },
  {
    title: 'Sacred Lineage and Transmission: A Comparative Study of Silsila in Sufi Orders',
    authors: ['Prof. Sarah Chen', 'Dr. Fayaz Ahmad Khan'],
    journal: 'Journal of Sufi Studies',
    year: '2023',
    volume: '12(1)',
    pages: '1–34',
    abstract:
      'This comparative study examines the institution of silsila (spiritual lineage) across major Sufi orders, analysing how the chain of transmission functions as both a legitimating authority and a living pedagogical relationship.',
    themes: ['Lineage Studies', 'Sufi Orders', 'Transmission'],
    status: 'Published',
  },
  {
    title: 'Integrating Complexity Theory with Sufi Systems of Knowledge: Emergent Properties of the Self',
    authors: ['Prof. Sarah Chen', 'Dr. Amina Hassan'],
    journal: 'Systems Research and Behavioral Science',
    year: '2024',
    volume: 'In Press',
    pages: '—',
    abstract:
      'Drawing on complexity science and Sufi metaphysics, this paper argues that the self can be understood as a complex adaptive system exhibiting emergent properties that conventional reductionist models cannot adequately explain.',
    themes: ['Complexity Science', 'Systems Theory', 'Self and Identity'],
    status: 'In Press',
  },
];

const STATUS_COLORS: Record<string, string> = {
  Published: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'In Press': 'bg-[#C8A75E]/10 text-[#C8A75E] border-[#C8A75E]/20',
  'Under Review': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
};

export const metadata = {
  title: 'Research Papers — Sufi Science Center',
  description: 'Original peer-reviewed research publications from the Sufi Science Center.',
};

export default function ResearchPapersPage() {
  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Peer-Reviewed Research"
        title="Research Papers"
        description="Original scholarly publications advancing understanding at the intersection of Sufi wisdom traditions and contemporary scientific inquiry."
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

          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#F5F3EE]">All Publications</h2>
              <p className="text-[#AAB0D6]/60 text-sm mt-1">{PAPERS.length} papers</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#AAB0D6]/40 bg-white/5 px-3 py-1.5 rounded-lg border border-white/8">
              <BookOpen className="w-3.5 h-3.5" />
              Sorted by recency
            </div>
          </div>

          <div className="space-y-5">
            {PAPERS.map((paper, i) => (
              <article
                key={i}
                className="glass-panel rounded-2xl p-7 border border-white/5 hover:border-[#C8A75E]/15 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-serif font-semibold text-[#F5F3EE] leading-snug group-hover:text-[#C8A75E] transition-colors">
                      {paper.title}
                    </h3>
                  </div>
                  <span
                    className={`text-[10px] px-2.5 py-1 rounded-full border font-medium uppercase tracking-wider flex-shrink-0 ${STATUS_COLORS[paper.status] ?? ''}`}
                  >
                    {paper.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#AAB0D6]/50 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    {paper.authors.join(', ')}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5" />
                    {paper.journal}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {paper.year} · Vol. {paper.volume}, pp. {paper.pages}
                  </span>
                </div>

                <p className="text-sm text-[#AAB0D6]/70 leading-relaxed mb-5">{paper.abstract}</p>

                <div className="flex flex-wrap items-center gap-2">
                  {paper.themes.map((theme) => (
                    <span
                      key={theme}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-[#C8A75E]/8 border border-[#C8A75E]/15 text-[#C8A75E]/70"
                    >
                      {theme}
                    </span>
                  ))}
                  <button className="ml-auto flex items-center gap-1 text-[11px] text-[#AAB0D6]/40 hover:text-[#C8A75E] transition-colors">
                    <ExternalLink className="w-3 h-3" />
                    View Full Paper
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 glass-panel rounded-2xl p-8 border border-[#C8A75E]/10 text-center">
            <h3 className="text-lg font-serif font-semibold text-[#F5F3EE] mb-2">
              Submit a Research Contribution
            </h3>
            <p className="text-sm text-[#AAB0D6]/60 mb-5 max-w-xl mx-auto">
              Scholars working at the intersection of Sufi knowledge traditions and contemporary
              inquiry are invited to submit original research for consideration.
            </p>
            <Link
              href="/contribute/submit"
              className="inline-flex items-center gap-2 text-sm text-[#C8A75E] font-semibold bg-[#C8A75E]/10 border border-[#C8A75E]/25 px-5 py-2.5 rounded-lg hover:bg-[#C8A75E]/16 transition-all"
            >
              Submit Your Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
