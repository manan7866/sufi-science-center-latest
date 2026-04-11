import HardInquiryContent from '@/components/dialogues/hard-inquiry-content';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ObservatoryHero } from '@/components/observatory-hero';

export const metadata = {
  title: 'Critical Inquiry Dialogues | Sufi Science Center',
  description: 'Rigorous critical discussions on complex scientific and spiritual questions with evidence-based debate.',
};

export default function HardInquiryPage() {
  return (
    <div className="min-h-screen">
      {/* <div className="relative py-16 px-4 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6B9BD1]/4 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <p className="text-xs tracking-[0.22em] text-[#C8A75E]/60 uppercase mb-2">Dialogues</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#F5F3EE] leading-tight mb-4">
            Critical Inquiry Dialogues
          </h1>
          <p className="text-[#AAB0D6] leading-relaxed max-w-2xl">
            Rigorous evidence-based debate on contentious questions bridging consciousness research,
            contemplative science, and the interface of scientific and spiritual epistemologies.
          </p>
        </div>
      </div> */}
      <ObservatoryHero subtitle='Dialogues'
      title='Critical Inquiry Dialogues'
      description='Rigorous evidence-based debate on contentious questions bridging consciousness research,
            contemplative science, and the interface of scientific and spiritual epistemologies.'
      />

      <HardInquiryContent />
    </div>
  );
}
