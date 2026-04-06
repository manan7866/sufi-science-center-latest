import InsightInterviewsContent from '@/components/dialogues/insight-interviews-content';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Insight Interviews | Sufi Science Center',
  description: 'Transformation narratives and personal insights from individuals at the intersection of science and spirituality.',
};

export default function InsightInterviewsPage() {
  return (
    <div className="min-h-screen">
      <div className="relative py-16 px-4 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8A75E]/4 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <p className="text-xs tracking-[0.22em] text-[#C8A75E]/60 uppercase mb-2">Dialogues</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#F5F3EE] leading-tight mb-4">
            Insight Interviews
          </h1>
          <p className="text-[#AAB0D6] leading-relaxed max-w-2xl">
            Transformation narratives and personal insights from researchers, practitioners, and contemplatives
            working at the intersection of science and spiritual wisdom.
          </p>
        </div>
      </div>

      <section className="py-12 px-4 border-b border-white/5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-2xl p-7 border border-white/5">
            <div className="w-9 h-9 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center mb-4">
              <Sparkles className="w-4.5 h-4.5 text-[#C8A75E]" />
            </div>
            <h2 className="text-sm font-serif font-semibold text-[#F5F3EE] mb-3">About Insight Interviews</h2>
            <p className="text-xs text-[#AAB0D6]/60 leading-relaxed mb-3">
              These interviews explore how individuals integrate Sufi wisdom with their professional work,
              scientific research, and personal development. More than biography, each conversation investigates
              the lived experience of bridging traditions.
            </p>
            <p className="text-xs text-[#AAB0D6]/50 leading-relaxed">
              Participants share transformation narratives, methodological insights, and the challenges and
              discoveries that emerge when contemplative practice meets rigorous inquiry.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-7 border border-[#C8A75E]/15 bg-[#C8A75E]/3">
            <h3 className="text-sm font-serif font-semibold text-[#F5F3EE] mb-3">Contribute Your Perspective</h3>
            <p className="text-xs text-[#AAB0D6]/60 leading-relaxed mb-6">
              We invite researchers, practitioners, and contemplatives to share how Sufi wisdom informs
              their work and inner development.
            </p>
            <Link href="/dialogues/insight-interviews/apply" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#C8A75E] text-[#0A0C14] hover:bg-[#C8A75E]/90 transition-all">
              Apply to Participate
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <InsightInterviewsContent />
    </div>
  );
}
