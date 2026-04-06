'use client';

import { useState } from 'react';
import { ObservatoryHero } from '@/components/observatory-hero';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Globe2,
  Mountain,
  MapPin,
  Compass,
  BookOpen,
  Users,
  ChevronRight
} from 'lucide-react';

const REGIONAL_NETWORKS = [
  {
    id: 'kashmir',
    region: 'Kashmir',
    icon: Mountain,
    status: 'Primary Origin',
    color: 'from-[#C8A75E] via-[#E6D5A8] to-[#C8A75E]',
    description: 'The intellectual and spiritual heartland',
    significance: 'Kashmir represents our primary origin narrative and methodological foundation. The distinctive Kashmiri Sufi tradition synthesized Islamic mysticism with indigenous contemplative philosophy, creating unique approaches to consciousness inquiry that continue to inform our research frameworks.',
    currentWork: 'Documentation of living lineages, preservation of textual materials, phenomenological studies of Kashmir-derived practices',
    keyOrders: ['Rishis Tradition', 'Qalandari', 'Naqshbandi-Kubrawi'],
    historicalCenters: ['Srinagar', 'Anantnag', 'Baramulla', 'Sopore']
  },
  {
    id: 'india-pakistan',
    region: 'India and Pakistan',
    icon: MapPin,
    status: 'Core Region',
    color: 'from-[#8B7355] via-[#C8A75E] to-[#8B7355]',
    description: 'South Asian expansion and diversity',
    significance: 'The Indian subcontinent hosts extraordinary diversity of Sufi traditions, integrating with multiple regional cultures and languages. From Delhi to Lahore, Ajmer to Multan, these centers developed distinctive practices while maintaining connection to core principles.',
    currentWork: 'Comparative studies of regional traditions, linguistic analysis of devotional poetry, social dimensions of practice communities',
    keyOrders: ['Chishti', 'Suhrawardi', 'Qadiri', 'Naqshbandi', 'Rifai'],
    historicalCenters: ['Delhi', 'Ajmer', 'Lahore', 'Multan', 'Pakpattan', 'Sehwan']
  },
  {
    id: 'central-asia',
    region: 'Central Asia',
    icon: Compass,
    status: 'Historical Foundation',
    color: 'from-[#AAB0D6] via-[#C8A75E] to-[#AAB0D6]',
    description: 'Systematic codification and transmission',
    significance: 'Central Asia served as a primary center for systematic codification of Sufi practices and transmission lineages. The region produced foundational texts and methodologies that shaped the entire tradition, including structured approaches to spiritual development and teacher-student relationships.',
    currentWork: 'Textual analysis of systematic teaching materials, historical transmission studies, methodological framework research',
    keyOrders: ['Naqshbandi', 'Yasawi', 'Kubrawiyya'],
    historicalCenters: ['Bukhara', 'Samarkand', 'Turkestan', 'Khwarezm', 'Balkh']
  },
  {
    id: 'middle-east',
    region: 'Middle East',
    icon: BookOpen,
    status: 'Core Intellectual Centers',
    color: 'from-[#C8A75E] via-[#F5F3EE] to-[#C8A75E]',
    description: 'Philosophical systematization',
    significance: 'The Middle East produced foundational philosophical texts, systematic theological integration, and sophisticated conceptual frameworks. From Baghdad to Damascus, Cairo to Konya, these centers established intellectual foundations that shaped global Sufi thought.',
    currentWork: 'Philosophical analysis of classical texts, theological framework studies, conceptual model development',
    keyOrders: ['Qadiri', 'Rifai', 'Mevlevi', 'Shadhili', 'Badawi'],
    historicalCenters: ['Baghdad', 'Damascus', 'Cairo', 'Konya', 'Jerusalem', 'Basra']
  },
  {
    id: 'africa',
    region: 'North and West Africa',
    icon: Globe2,
    status: 'Largest Contemporary Presence',
    color: 'from-[#8B7355] via-[#AAB0D6] to-[#8B7355]',
    description: 'Living traditions and social transformation',
    significance: 'Africa currently hosts the largest concentration of Sufi practitioners globally. North and West African traditions developed distinctive approaches emphasizing community practice, social reform, and institutional development, while maintaining connection to core methodologies.',
    currentWork: 'Contemporary practice studies, social dimensions research, institutional development analysis',
    keyOrders: ['Tijaniyya', 'Qadiriyya', 'Muridiyya', 'Sanusiyya', 'Shadhiliyya'],
    historicalCenters: ['Fez', 'Timbuktu', 'Touba', 'Kano', 'Cairo', 'Tunis']
  },
  {
    id: 'ottoman',
    region: 'Ottoman Legacy',
    icon: BookOpen,
    status: 'Historical Importance',
    color: 'from-[#AAB0D6] via-[#8B7355] to-[#AAB0D6]',
    description: 'Institutional development and synthesis',
    significance: 'The Ottoman period saw significant institutional development, architectural expression, and synthesis of multiple traditions. Turkish Sufism developed distinctive cultural expressions while serving as a bridge between Arab, Persian, and Central Asian influences.',
    currentWork: 'Institutional history analysis, architectural symbolism studies, synthesis pattern research',
    keyOrders: ['Mevlevi', 'Bektashi', 'Naqshbandi', 'Khalwati'],
    historicalCenters: ['Istanbul', 'Konya', 'Bursa', 'Edirne']
  },
  {
    id: 'andalusia',
    region: 'Andalusian Heritage',
    icon: BookOpen,
    status: 'Historical Critical',
    color: 'from-[#C8A75E] via-[#8B7355] to-[#C8A75E]',
    description: 'Philosophical innovation and interfaith dialogue',
    significance: 'Medieval Andalusia produced groundbreaking philosophical innovations and models of interfaith intellectual exchange. Ibn Arabi and other Andalusian masters developed conceptual frameworks that profoundly influenced global Sufi thought.',
    currentWork: 'Philosophical framework analysis, interfaith dialogue models, conceptual innovation studies',
    keyOrders: ['Shadhili', 'Akbari tradition'],
    historicalCenters: ['Córdoba', 'Granada', 'Seville', 'Murcia']
  },
  {
    id: 'southeast-asia',
    region: 'Southeast Asia',
    icon: Globe2,
    status: 'Regional Adaptation',
    color: 'from-[#AAB0D6] via-[#C8A75E] to-[#AAB0D6]',
    description: 'Cultural integration and contemporary vitality',
    significance: 'Southeast Asian Sufism demonstrates remarkable cultural adaptation, integrating with local traditions in Indonesia, Malaysia, and beyond. These regions show how core Sufi principles can maintain integrity while adapting to diverse cultural contexts.',
    currentWork: 'Cultural adaptation studies, contemporary practice research, integration pattern analysis',
    keyOrders: ['Qadiriyya wa Naqshbandiyya', 'Alawiyya', 'Sammaniyya'],
    historicalCenters: ['Aceh', 'Jakarta', 'Kuala Lumpur', 'Mindanao']
  }
];

export default function NetworksPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const activeRegion = REGIONAL_NETWORKS.find(r => r.id === selectedRegion);

  return (
    <div className="min-h-screen pt-20 bg-[#0B0F2A]">
      <ObservatoryHero
        subtitle="Civilizational Scope"
        title="Global Sufi Networks"
        description="Regional focus areas across Kashmir, South Asia, Central Asia, the Middle East, and Africa, positioning our work within its proper civilizational context."
      />

      <section className="py-16 px-4 observatory-gradient">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* Global Positioning Statement */}
          <Card className="glass-panel border-[rgba(255,255,255,0.08)]">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">
                Civilizational Positioning
              </h2>
              <p className="text-[#AAB0D6] text-lg leading-relaxed mb-6">
                While rooted in the Kashmiri Sufi intellectual tradition, our research recognizes
                the <span className="text-[#C8A75E] font-semibold">global civilizational scope</span> of
                Sufi knowledge traditions. From Central Asian systematic codification to African
                community transformation, from Middle Eastern philosophical synthesis to South Asian
                devotional expression, each region contributed distinctive insights while maintaining
                connection to core methodological principles.
              </p>
              <p className="text-[#AAB0D6] leading-relaxed">
                This global perspective prevents reductive regionalism while honoring specific
                historical origins. We study Kashmir not as isolated tradition but as a node within
                vast networks of knowledge transmission spanning centuries and continents.
              </p>
            </div>
          </Card>

          {/* Regional Networks Grid */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-4 text-center">
              Regional Knowledge Networks
            </h2>
            <p className="text-[#AAB0D6] text-center mb-12 max-w-3xl mx-auto">
              Explore the geographical distribution of Sufi knowledge centers and their distinctive contributions
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {REGIONAL_NETWORKS.map((network) => {
                const Icon = network.icon;
                return (
                  <Card
                    key={network.id}
                    className={`glass-panel border-[rgba(255,255,255,0.08)] hover:border-[#C8A75E]/50 transition-all cursor-pointer group ${
                      selectedRegion === network.id ? 'ring-2 ring-[#C8A75E] glow-gold' : ''
                    }`}
                    onClick={() => setSelectedRegion(network.id === selectedRegion ? null : network.id)}
                  >
                    <div className="p-6">
                      <Icon className="h-10 w-10 text-[#C8A75E] mb-4" />
                      <h3 className="text-xl font-semibold text-[#F5F3EE] mb-2 group-hover:text-[#C8A75E] transition-colors">
                        {network.region}
                      </h3>
                      <Badge variant="secondary" className="mb-3 bg-[#C8A75E]/20 text-[#C8A75E] border border-[#C8A75E]/30">
                        {network.status}
                      </Badge>
                      <p className="text-sm text-[#AAB0D6] mb-4">
                        {network.description}
                      </p>
                      <div className="flex items-center text-sm text-[#C8A75E] font-medium group-hover:gap-2 transition-all">
                        Explore network
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Detail View */}
            {activeRegion && (
              <Card className="glass-panel border-[rgba(255,255,255,0.08)] glow-gold">
                <div className="p-8 md:p-12">
                  <div className="flex items-start gap-4 mb-8">
                    <activeRegion.icon className="h-12 w-12 text-[#C8A75E] flex-shrink-0" />
                    <div>
                      <h3 className="text-3xl font-bold text-[#F5F3EE] mb-2">{activeRegion.region}</h3>
                      <Badge variant="secondary" className="bg-[#C8A75E]/20 text-[#C8A75E] border border-[#C8A75E]/30">
                        {activeRegion.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="font-semibold text-[#F5F3EE] mb-3 text-lg">Historical Significance</h4>
                      <p className="text-[#AAB0D6] leading-relaxed">{activeRegion.significance}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#F5F3EE] mb-3 text-lg">Current Research Focus</h4>
                      <p className="text-[#AAB0D6] leading-relaxed">{activeRegion.currentWork}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-[#F5F3EE] mb-3">Major Sufi Orders</h4>
                        <div className="space-y-2">
                          {activeRegion.keyOrders.map((order, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#C8A75E]" />
                              <span className="text-[#AAB0D6]">{order}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-[#F5F3EE] mb-3">Historical Centers</h4>
                        <div className="flex flex-wrap gap-2">
                          {activeRegion.historicalCenters.map((center, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="bg-[#C8A75E]/10 text-[#AAB0D6] border border-[#C8A75E]/30"
                            >
                              {center}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Research Implications */}
          <Card className="glass-panel border-[rgba(255,255,255,0.08)]">
            <div className="p-8 md:p-12">
              <div className="flex items-start gap-4 mb-6">
                <Users className="h-10 w-10 text-[#C8A75E] flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-3xl font-bold text-[#F5F3EE] mb-4">
                    Research Implications
                  </h2>
                  <p className="text-[#AAB0D6] leading-relaxed mb-6">
                    Understanding this global scope informs our research methodology and theoretical
                    frameworks in several critical ways:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6">
                  <h3 className="font-semibold text-[#F5F3EE] mb-3">Comparative Analysis</h3>
                  <p className="text-sm text-[#AAB0D6]">
                    Studying variations across regions reveals both universal patterns and
                    context-specific adaptations in consciousness practice
                  </p>
                </div>

                <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6">
                  <h3 className="font-semibold text-[#F5F3EE] mb-3">Methodological Diversity</h3>
                  <p className="text-sm text-[#AAB0D6]">
                    Different regions developed distinctive research and teaching methodologies,
                    enriching our understanding of contemplative pedagogy
                  </p>
                </div>

                <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6">
                  <h3 className="font-semibold text-[#F5F3EE] mb-3">Cultural Integration</h3>
                  <p className="text-sm text-[#AAB0D6]">
                    Examining how core principles adapted to diverse cultural contexts informs
                    contemporary integration with scientific frameworks
                  </p>
                </div>

                <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6">
                  <h3 className="font-semibold text-[#F5F3EE] mb-3">Historical Transmission</h3>
                  <p className="text-sm text-[#AAB0D6]">
                    Understanding knowledge transmission routes reveals mechanisms of continuity
                    and transformation over centuries
                  </p>
                </div>
              </div>
            </div>
          </Card>

        </div>
      </section>
    </div>
  );
}
