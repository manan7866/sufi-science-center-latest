'use client';

import { useState } from 'react';
import { ObservatoryHero } from '@/components/observatory-hero';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Mountain,
  Compass,
  BookOpen,
  MapPin,
  ChevronRight,
  Globe2
} from 'lucide-react';

const TRANSMISSION_ROUTES = [
  {
    id: 'kashmir',
    region: 'Kashmir',
    period: '8th-21st Century',
    icon: Mountain,
    color: 'from-[#C8A75E] to-[#E6D5A8]',
    description: 'The intellectual and spiritual heartland of our tradition',
    keyFigures: ['Lal Ded (14th c.)', 'Nund Rishi (14th c.)', 'Habba Khatun (16th c.)'],
    contribution: 'Developed distinctive Kashmiri Sufi philosophy integrating Vedantic thought with Islamic mysticism',
    contemporary: 'Primary origin narrative and intellectual foundation'
  },
  {
    id: 'south-asia',
    region: 'India & Pakistan',
    period: '11th-21st Century',
    icon: MapPin,
    color: 'from-[#8B7355] to-[#C8A75E]',
    description: 'Expansion across the subcontinent',
    keyFigures: ['Data Ganj Bakhsh (11th c.)', 'Nizamuddin Auliya (13th c.)', 'Bulleh Shah (18th c.)'],
    contribution: 'Integration with diverse regional traditions, development of Qawwali and devotional poetry',
    contemporary: 'Vibrant living traditions across diverse cultural contexts'
  },
  {
    id: 'central-asia',
    region: 'Central Asia',
    period: '9th-20th Century',
    icon: Compass,
    color: 'from-[#AAB0D6] to-[#C8A75E]',
    description: 'The Silk Road transmission',
    keyFigures: ['Al-Hakim at-Tirmidhi (9th c.)', 'Khwaja Bahauddin Naqshband (14th c.)', 'Ahmad Yasawi (12th c.)'],
    contribution: 'Systematic codification of spiritual practices and transmission lineages',
    contemporary: 'Historical continuity and methodological foundations'
  },
  {
    id: 'middle-east',
    region: 'Middle East',
    period: '8th-21st Century',
    icon: BookOpen,
    color: 'from-[#C8A75E] to-[#F5F3EE]',
    description: 'Core intellectual centers',
    keyFigures: ['Rabia al-Adawiyya (8th c.)', 'Al-Ghazali (11th c.)', 'Ibn Arabi (12th c.)', 'Rumi (13th c.)'],
    contribution: 'Philosophical systematization, poetic expression, and theological integration',
    contemporary: 'Foundational texts and conceptual frameworks'
  },
  {
    id: 'africa',
    region: 'North & West Africa',
    period: '9th-21st Century',
    icon: Globe2,
    color: 'from-[#8B7355] to-[#AAB0D6]',
    description: 'African Sufi currents',
    keyFigures: ['Ahmad al-Tijani (18th c.)', 'Ahmad ibn Idris (19th c.)', 'Usman dan Fodio (19th c.)'],
    contribution: 'Community-based practices, social reform movements, and institutional development',
    contemporary: 'Largest concentration of contemporary Sufi practitioners'
  }
];

export default function HeritagePage() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const activeRoute = TRANSMISSION_ROUTES.find(r => r.id === selectedRoute);

  return (
    <div className="min-h-screen pt-20 bg-[#0B0F2A]">
      <ObservatoryHero
        subtitle="Origins & Continuity"
        title="Heritage & Intellectual"
        title2='Lineage'
        description="Tracing the civilizational roots and global transmission of Sufi knowledge traditions from Kashmir across Asia, the Middle East, and Africa."
      />

      <section className="py-16 px-4 observatory-gradient">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* Kashmir Origin Narrative */}
          <Card className="glass-panel border-[rgba(255,255,255,0.08)] overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex items-start gap-4 mb-6">
                <Mountain className="h-12 w-12 text-[#C8A75E] flex-shrink-0" />
                <div>
                  <h2 className="text-3xl font-bold text-[#F5F3EE] mb-4">
                    The Kashmiri Roots
                  </h2>
                  <p className="text-[#AAB0D6] text-lg leading-relaxed mb-6">
                    Kashmir represents not merely a geographic origin but an <span className="text-[#C8A75E] font-semibold">intellectual
                    civilization node</span> where Islamic mysticism encountered and integrated with millennia of
                    contemplative philosophy, producing a distinctive tradition of consciousness inquiry.
                  </p>
                  <p className="text-[#AAB0D6] leading-relaxed mb-6">
                    The Kashmiri Sufi tradition developed unique methodologies for inner transformation,
                    sophisticated epistemological frameworks, and poetic-philosophical expressions that
                    bridged multiple wisdom traditions. This synthesis created an approach to consciousness
                    research that was both rigorously systematic and experientially grounded.
                  </p>
                  <p className="text-[#AAB0D6] leading-relaxed">
                    From this foundation, transmission routes extended across South Asia, Central Asia,
                    the Middle East, and Africa, creating a global network of knowledge centers while
                    maintaining connection to core methodological principles.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6">
                  <h3 className="font-semibold text-[#F5F3EE] mb-3">Intellectual Integration</h3>
                  <p className="text-sm text-[#AAB0D6]">
                    Synthesis of Islamic mysticism, Vedantic philosophy, and indigenous contemplative traditions
                  </p>
                </div>
                <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6">
                  <h3 className="font-semibold text-[#F5F3EE] mb-3">Methodological Innovation</h3>
                  <p className="text-sm text-[#AAB0D6]">
                    Development of systematic practices for consciousness transformation and self-inquiry
                  </p>
                </div>
                <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6">
                  <h3 className="font-semibold text-[#F5F3EE] mb-3">Poetic-Philosophical Expression</h3>
                  <p className="text-sm text-[#AAB0D6]">
                    Unique literary forms expressing profound metaphysical insights in accessible vernacular
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Global Knowledge Routes */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-4 text-center">
              Global Knowledge Routes
            </h2>
            <p className="text-[#AAB0D6] text-center mb-12 max-w-3xl mx-auto">
              Explore the transmission of Sufi knowledge across regions and centuries,
              from Central Asian synthesis to African transformation
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {TRANSMISSION_ROUTES.map((route) => {
                const Icon = route.icon;
                return (
                  <Card
                    key={route.id}
                    className={`glass-panel border-[rgba(255,255,255,0.08)] hover:border-[#C8A75E]/50 transition-all cursor-pointer group ${
                      selectedRoute === route.id ? 'ring-2 ring-[#C8A75E] glow-gold' : ''
                    }`}
                    onClick={() => setSelectedRoute(route.id === selectedRoute ? null : route.id)}
                  >
                    <div className="p-6">
                      <Icon className="h-10 w-10 text-[#C8A75E] mb-4" />
                      <h3 className="text-xl font-semibold text-[#F5F3EE] mb-2 group-hover:text-[#C8A75E] transition-colors">
                        {route.region}
                      </h3>
                      <Badge variant="secondary" className="mb-3 bg-[#C8A75E]/20 text-[#C8A75E] border border-[#C8A75E]/30">
                        {route.period}
                      </Badge>
                      <p className="text-sm text-[#AAB0D6] mb-4">
                        {route.description}
                      </p>
                      <div className="flex items-center text-sm text-[#C8A75E] font-medium group-hover:gap-2 transition-all">
                        Explore details
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Detail View */}
            {activeRoute && (
              <Card className="glass-panel border-[rgba(255,255,255,0.08)] glow-gold">
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <activeRoute.icon className="h-10 w-10 text-[#C8A75E] flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold text-[#F5F3EE] mb-2">{activeRoute.region}</h3>
                      <Badge variant="secondary" className="bg-[#C8A75E]/20 text-[#C8A75E] border border-[#C8A75E]/30">
                        {activeRoute.period}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-[#F5F3EE] mb-3">Key Figures</h4>
                      <ul className="space-y-2">
                        {activeRoute.keyFigures.map((figure, i) => (
                          <li key={i} className="flex items-start gap-2 text-[#AAB0D6]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                            <span>{figure}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#F5F3EE] mb-3">Historical Contribution</h4>
                      <p className="text-[#AAB0D6] mb-4">{activeRoute.contribution}</p>

                      <h4 className="font-semibold text-[#F5F3EE] mb-3">Contemporary Relevance</h4>
                      <p className="text-[#AAB0D6]">{activeRoute.contemporary}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Contemporary Reinterpretation */}
          <Card className="glass-panel border-[rgba(255,255,255,0.08)]">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">
                Contemporary Scientific Reinterpretation
              </h2>
              <p className="text-[#AAB0D6] leading-relaxed mb-6">
                The Sufi Science Center's mission is to bring this vast historical inheritance into
                dialogue with contemporary consciousness research, neuroscience, psychology, and
                philosophy of mind.
              </p>
              <p className="text-[#AAB0D6] leading-relaxed mb-6">
                We do not seek to preserve traditions unchanged, nor to dissolve them into modern
                categories, but to create a <span className="text-[#C8A75E] font-semibold">rigorous research framework</span> that
                honors both the depth of contemplative wisdom and the precision of scientific inquiry.
              </p>
              <p className="text-[#AAB0D6] leading-relaxed">
                This positioning, rooted in Kashmir but extending globally, honoring tradition while
                embracing contemporary methodologies, defines our unique identity as a research
                civilization node.
              </p>
            </div>
          </Card>

        </div>
      </section>
    </div>
  );
}
