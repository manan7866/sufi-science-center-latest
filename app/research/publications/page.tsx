import Link from 'next/link';
import { ObservatoryHero } from '@/components/observatory-hero';
import { BookOpen, ArrowLeft, ExternalLink, Calendar } from 'lucide-react';

const BOOKS = [
  {
    type: 'Book',
    title: 'The Architecture of Inner Knowledge: A Sufi Science of the Self',
    authors: 'Dr. Fayaz Ahmad Khan',
    publisher: 'Routledge Studies in Islamic Philosophy',
    year: '2023',
    isbn: '978-1-032-45678-9',
    description:
      'A comprehensive scholarly treatment of the epistemological and psychological architecture of the Sufi path, examining how classical Sufi frameworks constitute a rigorous system of inner knowledge with direct implications for contemporary consciousness science.',
    pages: 342,
  },
  {
    type: 'Edited Volume',
    title: 'Sacred Science and Secular Inquiry: Dialogues at the Boundary',
    authors: 'Dr. Fayaz Ahmad Khan & Prof. Sarah Chen (Eds.)',
    publisher: 'Oxford University Press',
    year: '2022',
    isbn: '978-0-198-87654-3',
    description:
      'A landmark edited collection bringing together fourteen scholars from across the sciences and humanities to explore the methodological and philosophical challenges of integrative inquiry between sacred knowledge traditions and contemporary scientific frameworks.',
    pages: 418,
  },
  {
    type: 'Book',
    title: 'Stations and States: A Contemporary Reading of Classical Sufi Psychology',
    authors: 'Dr. Amina Hassan',
    publisher: 'Palgrave Macmillan',
    year: '2021',
    isbn: '978-3-030-76543-2',
    description:
      'Drawing on the classical Sufi literature and contemporary developmental psychology, this monograph offers a systematic reinterpretation of the doctrine of maqamat and ahwal as a sophisticated empirical psychology of inner development.',
    pages: 287,
  },
];

const ARTICLES = [
  {
    title: 'Consciousness, Contemplation, and the Challenge of Verification',
    authors: 'Dr. Fayaz Ahmad Khan',
    publication: 'Religion, Brain and Behavior',
    year: '2024',
    volume: '14(1)',
    doi: '10.1080/2153599X.2024.001',
  },
  {
    title: 'The Sufi Doctrine of the Heart: Towards a Cognitive Science of Qalb',
    authors: 'Dr. Amina Hassan & Dr. Fayaz Ahmad Khan',
    publication: 'Journal of the American Academy of Religion',
    year: '2023',
    volume: '91(4)',
    doi: '10.1093/jaarel/lfad054',
  },
  {
    title: 'Emergence and the Sacred: Complexity Theory Meets Sufi Cosmology',
    authors: 'Prof. Sarah Chen',
    publication: 'Zygon: Journal of Religion and Science',
    year: '2023',
    volume: '58(2)',
    doi: '10.1111/zygo.12854',
  },
  {
    title: 'Muraqaba and Meta-Awareness: Phenomenological Analysis of Sufi Watchfulness',
    authors: 'Omar Farid & Dr. Amina Hassan',
    publication: 'Mindfulness',
    year: '2022',
    volume: '13(7)',
    doi: '10.1007/s12671-022-01893-5',
  },
  {
    title: 'Digital Sufism: Challenges and Opportunities in Online Transmission',
    authors: 'Prof. Sarah Chen',
    publication: 'Contemporary Islam',
    year: '2022',
    volume: '16(3)',
    doi: '10.1007/s11562-022-00476-0',
  },
  {
    title: 'Baqa After Fana: Reintegration and the Psychology of Post-Annihilation States',
    authors: 'Dr. Fayaz Ahmad Khan',
    publication: 'Sophia',
    year: '2021',
    volume: '60(4)',
    doi: '10.1007/s11841-021-00870-4',
  },
];

export const metadata = {
  title: 'Publications — Sufi Science Center',
  description: 'Books, articles, and scholarly contributions from the Sufi Science Center research community.',
};

export default function PublicationsPage() {
  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Scholarly Output"
        title="Publications"
        description="Books, edited volumes, and journal articles produced by the Sufi Science Center's research community."
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
              Books and Edited Volumes
            </p>
            <div className="space-y-5">
              {BOOKS.map((book, i) => (
                <article
                  key={i}
                  className="glass-panel rounded-2xl p-7 border border-white/5 hover:border-[#C8A75E]/15 transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                    <div className="w-14 h-20 rounded-lg bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-[#C8A75E]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C8A75E]/8 border border-[#C8A75E]/15 text-[#C8A75E]/70">
                          {book.type}
                        </span>
                        <span className="text-[10px] text-[#AAB0D6]/40">{book.year}</span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-[#F5F3EE] leading-snug group-hover:text-[#C8A75E] transition-colors mb-1">
                        {book.title}
                      </h3>
                      <p className="text-sm text-[#AAB0D6]/60 mb-1">{book.authors}</p>
                      <p className="text-xs text-[#AAB0D6]/40 mb-3">
                        {book.publisher} · {book.pages} pp · ISBN {book.isbn}
                      </p>
                      <p className="text-sm text-[#AAB0D6]/65 leading-relaxed">{book.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-6">
              Journal Articles
            </p>
            <div className="space-y-3">
              {ARTICLES.map((article, i) => (
                <article
                  key={i}
                  className="glass-panel rounded-xl p-5 border border-white/5 hover:border-[#C8A75E]/12 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-[#F5F3EE] leading-snug group-hover:text-[#C8A75E] transition-colors mb-1">
                        {article.title}
                      </h4>
                      <p className="text-xs text-[#AAB0D6]/55">{article.authors}</p>
                      <div className="flex flex-wrap gap-3 mt-1.5 text-[11px] text-[#AAB0D6]/40">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {article.publication}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {article.year} · {article.volume}
                        </span>
                      </div>
                    </div>
                    <button className="flex-shrink-0 flex items-center gap-1 text-[11px] text-[#AAB0D6]/40 hover:text-[#C8A75E] transition-colors mt-0.5">
                      <ExternalLink className="w-3 h-3" />
                      DOI
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 glass-panel rounded-2xl p-8 border border-[#C8A75E]/10 text-center">
            <h3 className="text-lg font-serif font-semibold text-[#F5F3EE] mb-2">
              View Research Papers
            </h3>
            <p className="text-sm text-[#AAB0D6]/60 mb-5 max-w-xl mx-auto">
              For full peer-reviewed papers with abstracts and download links, visit our Research Papers section.
            </p>
            <Link
              href="/research/papers"
              className="inline-flex items-center gap-2 text-sm text-[#C8A75E] font-semibold bg-[#C8A75E]/10 border border-[#C8A75E]/25 px-5 py-2.5 rounded-lg hover:bg-[#C8A75E]/16 transition-all"
            >
              Browse Research Papers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
