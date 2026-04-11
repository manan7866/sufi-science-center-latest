import Link from 'next/link';
import { Users, AlertCircle, Heart, ArrowRight, BookOpen, Mic } from 'lucide-react';
import { ObservatoryHero } from '@/components/observatory-hero';

export const metadata = {
  title: 'Dialogues | Sufi Science Center',
  description: 'Curated conversations exploring consciousness, transformation, and the integration of wisdom traditions with contemporary understanding.',
};

const FORMATS = [
  {
    icon: Users,
    title: 'Dialogic Inquiry Series',
    description: 'Multi-session collaborative explorations bringing together scholars, practitioners, and researchers for in-depth inquiry at the intersection of science and spirituality.',
    href: '/dialogues/series',
    accent: '#C8A75E',
    count: '4 Series · 20 Episodes',
  },
  {
    icon: AlertCircle,
    title: 'Critical Inquiry Dialogues',
    description: 'Rigorous evidence-based debate on contentious questions in consciousness research and the interface between scientific and spiritual epistemologies.',
    href: '/dialogues/hard-inquiry',
    accent: '#6B9BD1',
    count: '3 Sessions · Full Transcripts',
  },
  {
    icon: Heart,
    title: 'Applied Practices & Wisdom',
    description: 'Deep exploration of lived Sufi systems and transformative practice frameworks: dhikr, muraqaba, khidma, and other disciplines examined through both tradition and contemporary psychology.',
    href: '/dialogues/applied-practices',
    accent: '#27AE60',
    count: '6 Practices · Methodology Guides',
  },
];

export default function DialoguesPage() {
  return (
    <div className="min-h-screen">
      {/* <div className="relative py-16 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8A75E]/4 via-transparent to-[#6B9BD1]/4 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <p className="text-xs tracking-[0.22em] text-[#C8A75E]/60 uppercase mb-3">Sufi Science Center</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#F5F3EE] leading-tight mb-5">
            Dialogues
          </h1>
          <p className="text-[#AAB0D6] text-lg leading-relaxed max-w-2xl">
            Curated conversations exploring consciousness, transformation, and the integration
            of wisdom traditions with contemporary understanding. Four formats. One inquiry.
          </p>
        </div>
      </div> */}
      <ObservatoryHero subtitle='Sufi Science Center' title='Dialogues' description='Curated conversations exploring consciousness, transformation, and the integration
            of wisdom traditions with contemporary understanding. Four formats. One inquiry.' />

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-10">
            <h2 className="text-[10px] tracking-[0.2em] text-[#AAB0D6]/40 uppercase">Dialogue Formats</h2>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {FORMATS.map((fmt) => {
              const Icon = fmt.icon;
              return (
                <Link key={fmt.href} href={fmt.href}>
                  <div className="group glass-panel rounded-2xl p-6 border border-white/5 hover:border-white/12 transition-all h-full flex flex-col cursor-pointer">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                      style={{ background: `${fmt.accent}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: fmt.accent }} />
                    </div>
                    <h3 className="text-base font-serif font-bold text-[#F5F3EE] mb-2 group-hover:text-[#C8A75E] transition-colors">
                      {fmt.title}
                    </h3>
                    <p className="text-xs text-[#AAB0D6]/70 leading-relaxed flex-1 mb-4">
                      {fmt.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-[10px] text-[#AAB0D6]/30 tracking-wide">{fmt.count}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#AAB0D6]/25 group-hover:text-[#C8A75E] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-10">
            <h2 className="text-[10px] tracking-[0.2em] text-[#AAB0D6]/40 uppercase">Insight Interviews</h2>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <div className="glass-panel rounded-2xl p-8 border border-[#C8A75E]/10">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C8A75E]/12 border border-[#C8A75E]/20 flex items-center justify-center mb-5">
                  <Mic className="w-6 h-6 text-[#C8A75E]" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#F5F3EE] mb-3">Insight Interviews</h3>
                <p className="text-sm text-[#AAB0D6] leading-relaxed mb-5">
                  In-depth conversations with researchers, practitioners, and contemplatives working at the intersection
                  of science and Sufi wisdom. Each conversation investigates the lived experience of integrating two
                  epistemologies: scientific rigour and contemplative depth.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/dialogues/insight-interviews">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#C8A75E]/12 border border-[#C8A75E]/25 text-[#C8A75E] hover:bg-[#C8A75E]/18 hover:border-[#C8A75E]/40 transition-all">
                      <BookOpen className="w-4 h-4" />
                      Read Interviews
                    </button>
                  </Link>
                  <Link href="/dialogues/insight-interviews/apply">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/8 text-[#AAB0D6]/60 hover:border-white/15 hover:text-[#AAB0D6] transition-all">
                      Apply to Participate
                    </button>
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Dr. Amina Hassan', role: 'MIT, Contemplative Neuroscience', topic: 'Bridging Neuroscience and Contemplative Practice' },
                  { name: 'Omar Farid', role: 'Community Organizer, Former VP Engineering', topic: 'From Silicon Valley to Sacred Service' },
                  { name: 'Prof. Sarah Chen', role: 'Santa Fe Institute', topic: 'Complexity Science and Spiritual Emergence' },
                ].map((person) => (
                  <div key={person.name} className="flex items-start gap-3 p-4 rounded-xl bg-white/2 border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-[#C8A75E]/12 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-[#C8A75E]">{person.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#F5F3EE]">{person.name}</p>
                      <p className="text-[10px] text-[#AAB0D6]/40 mb-0.5">{person.role}</p>
                      <p className="text-[10px] text-[#C8A75E]/60 italic">{person.topic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel rounded-2xl p-8 border border-white/5">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                { value: '4', label: 'Dialogue Series', sub: 'Multi-episode explorations' },
                { value: '3', label: 'Critical Sessions', sub: 'Hard inquiry debates' },
                { value: '6', label: 'Practice Guides', sub: 'Applied wisdom frameworks' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-serif font-bold text-[#C8A75E] mb-1">{stat.value}</p>
                  <p className="text-sm font-semibold text-[#F5F3EE] mb-0.5">{stat.label}</p>
                  <p className="text-xs text-[#AAB0D6]/40">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
