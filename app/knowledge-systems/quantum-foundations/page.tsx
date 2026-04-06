import { ObservatoryHero } from '@/components/observatory-hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Atom, Waves, Eye, Zap, Sparkles, HelpCircle } from 'lucide-react';

export const metadata = {
  title: "Quantum Foundations | Sufi Science Center",
  description: "Exploring parallels between quantum mechanics, information theory, and contemplative descriptions of reality.",
};

export default function QuantumFoundationsPage() {
  const paradoxes = [
    {
      icon: Waves,
      title: "Wave-Particle Duality",
      description: "Quantum entities exhibit both wave-like and particle-like properties depending on observation.",
      contemplative: "Contemplative traditions describe reality as having both manifest and unmanifest aspects, form and emptiness."
    },
    {
      icon: Eye,
      title: "Observer Effect",
      description: "The act of measurement fundamentally affects the quantum system being observed.",
      contemplative: "Many traditions emphasize the role of consciousness in structuring experience and reality."
    },
    {
      icon: Zap,
      title: "Quantum Entanglement",
      description: "Particles can remain connected across space such that measuring one instantly affects the other.",
      contemplative: "Mystical traditions speak of fundamental interconnection and non-local relationships."
    },
    {
      icon: HelpCircle,
      title: "Measurement Problem",
      description: "How does quantum superposition 'collapse' into definite outcomes? What role does consciousness play?",
      contemplative: "Some interpretations suggest consciousness may be fundamental to quantum measurement."
    }
  ];

  const approaches = [
    {
      title: "Rigorous Distinction",
      description: "Distinguishing between established quantum mechanics, speculative interpretations, and metaphorical uses of quantum concepts."
    },
    {
      title: "Phenomenological Investigation",
      description: "Examining contemplative experiences that may parallel quantum paradoxes while avoiding premature reduction."
    },
    {
      title: "Interpretive Frameworks",
      description: "Exploring consciousness-inclusive interpretations of quantum mechanics without forcing correspondence."
    },
    {
      title: "Epistemological Humility",
      description: "Recognizing both the power and limits of quantum mechanics while respecting contemplative epistemologies."
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <ObservatoryHero
        subtitle="Thematic Exploration"
        title="Quantum Foundations"
        description="Investigating parallels between quantum mechanics and contemplative insights while maintaining rigorous distinction between science and metaphor."
      />

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="glass-panel rounded-2xl p-8 md:p-12 mb-12">
            <div className="flex items-start space-x-4">
              <Atom className="w-8 h-8 text-[#C8A75E] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-semibold text-[#F5F3EE] mb-4">Quantum Mysteries</h2>
                <p className="text-[#AAB0D6] leading-relaxed mb-4">
                  Quantum mechanics has revolutionized physics but remains profoundly puzzling at a conceptual level.
                  The role of observation, the nature of reality before measurement, and the possibility of non-local
                  connections challenge our classical intuitions about the nature of reality.
                </p>
                <p className="text-[#AAB0D6] leading-relaxed mb-4">
                  Some physicists have noted intriguing parallels between quantum phenomena and contemplative
                  descriptions of reality. However, <strong className="text-[#F5F3EE]">we must be extremely careful</strong> to
                  distinguish between:
                </p>
                <ul className="space-y-2 text-[#AAB0D6] ml-6">
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">1.</span>
                    <span>Established quantum mechanics (well-verified mathematical framework)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">2.</span>
                    <span>Interpretations of quantum mechanics (philosophical frameworks, not empirically decided)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">3.</span>
                    <span>Metaphorical or analogical uses of quantum concepts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-[#F5F3EE] mb-8">Quantum Paradoxes and Contemplative Parallels</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {paradoxes.map((paradox, idx) => (
                <Card key={idx} className="glass-panel border-white/5">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-3">
                      <paradox.icon className="w-10 h-10 text-[#C8A75E]" />
                      <CardTitle className="text-xl text-[#F5F3EE]">{paradox.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-[#AAB0D6] uppercase tracking-wide mb-2">Quantum Physics:</p>
                      <p className="text-sm text-[#AAB0D6]">{paradox.description}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#C8A75E] uppercase tracking-wide mb-2">Contemplative Parallel:</p>
                      <p className="text-sm text-[#AAB0D6]">{paradox.contemplative}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-semibold text-[#F5F3EE] mb-6">Research Approach</h2>
            <p className="text-[#AAB0D6] mb-8">
              Our investigation maintains rigorous standards while exploring potential connections:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {approaches.map((approach, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-white/5">
                  <div className="flex items-start space-x-3">
                    <Sparkles className="w-5 h-5 text-[#C8A75E] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2">{approach.title}</h3>
                      <p className="text-sm text-[#AAB0D6]">{approach.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-semibold text-[#F5F3EE] mb-6">Important Caveats</h2>
            <div className="space-y-4 text-[#AAB0D6]">
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <HelpCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-400 mb-2">Avoiding "Quantum Mysticism"</p>
                  <p className="text-sm">
                    Popular literature often makes exaggerated or inaccurate claims about quantum mechanics supporting
                    mystical worldviews. We reject such simplistic mappings while remaining open to legitimate parallels
                    that merit careful investigation.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-400 mb-2">Respecting Both Domains</p>
                  <p className="text-sm">
                    Neither quantum mechanics nor contemplative traditions need validation from the other. Each stands
                    on its own epistemological foundation. Any connections must be investigated rigorously without
                    forcing premature synthesis.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
