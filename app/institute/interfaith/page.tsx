import { ObservatoryHero } from '@/components/observatory-hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, Users, FileText, Radio } from 'lucide-react';

const civilizations = [
  {
    name: 'Islamic Mysticism',
    region: 'Global Islamic World',
    description: 'Sufi metaphysics, ethics, and contemplative practice across diverse cultural contexts',
    keyFigures: 'Al-Ghazali, Ibn Arabi, Rumi, Al-Hallaj',
    color: 'from-emerald-900/20 to-emerald-950/40'
  },
  {
    name: 'Christian Contemplative Tradition',
    region: 'Europe, Middle East, Africa',
    description: 'Desert Fathers, Orthodox Hesychasm, Catholic mysticism, and Protestant contemplative streams',
    keyFigures: 'Meister Eckhart, Teresa of Avila, John of the Cross, Thomas Merton',
    color: 'from-blue-900/20 to-blue-950/40'
  },
  {
    name: 'Jewish Mystical Thought',
    region: 'Middle East, Europe, North Africa',
    description: 'Kabbalistic metaphysics, Hasidic devotion, and philosophical mysticism',
    keyFigures: 'Moses de León, Isaac Luria, Baal Shem Tov, Abraham Joshua Heschel',
    color: 'from-violet-900/20 to-violet-950/40'
  },
  {
    name: 'Indic Spiritual Philosophy',
    region: 'South Asia',
    description: 'Vedantic non-dualism, Bhakti devotion, Tantric systems, and yogic contemplation',
    keyFigures: 'Shankara, Ramanuja, Kabir, Ramakrishna',
    color: 'from-orange-900/20 to-orange-950/40'
  },
  {
    name: 'Buddhist Contemplative Science',
    region: 'Asia, Global',
    description: 'Theravada insight practices, Mahayana emptiness philosophy, Vajrayana methods',
    keyFigures: 'Nagarjuna, Dogen, Tsongkhapa, Thich Nhat Hanh',
    color: 'from-amber-900/20 to-amber-950/40'
  },
  {
    name: 'African Spiritual Cosmologies',
    region: 'Sub-Saharan Africa, Diaspora',
    description: 'Indigenous metaphysics, ancestral wisdom, and sacred oral traditions',
    keyFigures: 'Amadou Hampâté Bâ, Cheikh Anta Diop, Various lineage holders',
    color: 'from-red-900/20 to-red-950/40'
  }
];

const thematicAxes = [
  {
    title: 'Divine Love',
    description: 'Comparative exploration of mystical love, union, and devotion across traditions',
    traditions: ['Islamic', 'Christian', 'Jewish', 'Indic'],
    icon: '💫'
  },
  {
    title: 'Silence & Contemplation',
    description: 'Methodologies of interior stillness, meditation, and contemplative practice',
    traditions: ['Buddhist', 'Christian', 'Islamic', 'Indic'],
    icon: '🧘'
  },
  {
    title: 'Unity & Being',
    description: 'Metaphysics of oneness, non-duality, and the nature of existence',
    traditions: ['Islamic', 'Indic', 'Jewish', 'Buddhist'],
    icon: '∞'
  },
  {
    title: 'Sacred Language & Poetry',
    description: 'Mystical linguistics, sacred sound, and the poetics of transcendence',
    traditions: ['Islamic', 'Jewish', 'Indic', 'African'],
    icon: '📜'
  },
  {
    title: 'Ethics & Character',
    description: 'Virtue cultivation, moral transformation, and spiritual refinement',
    traditions: ['Islamic', 'Buddhist', 'Christian', 'Jewish'],
    icon: '⚖️'
  },
  {
    title: 'Transmission & Lineage',
    description: 'Teacher-student relationships, initiation, and preservation of wisdom',
    traditions: ['Buddhist', 'Islamic', 'African', 'Indic'],
    icon: '🔗'
  }
];

const researchStreams = [
  {
    title: 'Interfaith Colloquia',
    description: 'Structured academic dialogues between scholars of different contemplative traditions',
    icon: Users,
    link: '/dialogues/series'
  },
  {
    title: 'Comparative Research Papers',
    description: 'Peer-reviewed scholarship on cross-civilizational mystical and philosophical themes',
    icon: FileText,
    link: '/research'
  },
  {
    title: 'Scholar Interviews',
    description: 'In-depth conversations with leading figures in comparative mysticism and religious studies',
    icon: Radio,
    link: '/dialogues/insight-interviews'
  },
  {
    title: 'Cross-Tradition Archive',
    description: 'Curated collection of primary texts, translations, and commentaries across traditions',
    icon: BookOpen,
    link: '/media/sacred-kalam'
  }
];

export default function InterfaithPage() {
  return (
    <div className="min-h-screen bg-[#0B0F2A] pt-32">
      <ObservatoryHero
        subtitle="Institute Pillar"
        title="Interfaith & Civilizational Dialogue"
        description="Comparative exploration of mystical, contemplative, and ethical traditions across civilizations"
      />

      <div className="max-w-[1400px] mx-auto px-8 py-20">
        {/* Introduction */}
        <section className="mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-[#AAB0D6] leading-relaxed mb-6">
              Sufism has historically operated across civilizational boundaries—in Kashmir, Persia,
              Anatolia, Al-Andalus, Central Asia, and Africa, engaging with Hindu, Buddhist, Christian,
              Jewish, Zoroastrian, Sikh, and indigenous spiritual traditions.
            </p>
            <p className="text-lg text-[#AAB0D6] leading-relaxed">
              This pillar represents structured, research-driven engagement between spiritual-intellectual
              traditions, with focus on consciousness studies, comparative metaphysics, ethics, and the
              transmission of contemplative knowledge across cultural contexts.
            </p>
          </div>
        </section>

        {/* Civilizational Scope */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#F5F3EE] mb-4">Civilizational Scope</h2>
            <p className="text-[#AAB0D6] max-w-2xl mx-auto">
              Major contemplative and mystical traditions included in our comparative research framework
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {civilizations.map((civ) => (
              <Card key={civ.name} className={`glass-panel border-white/5 bg-gradient-to-br ${civ.color}`}>
                <CardHeader>
                  <CardTitle className="text-xl text-[#F5F3EE]">{civ.name}</CardTitle>
                  <CardDescription className="text-[#AAB0D6]/80">{civ.region}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#AAB0D6] mb-4 leading-relaxed">
                    {civ.description}
                  </p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-[#AAB0D6]/60 mb-2">Key Figures</p>
                    <p className="text-xs text-[#C8A75E]">{civ.keyFigures}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Shared Thematic Axes */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#F5F3EE] mb-4">Shared Thematic Axes</h2>
            <p className="text-[#AAB0D6] max-w-2xl mx-auto">
              Cross-civilizational themes that appear across multiple contemplative traditions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {thematicAxes.map((theme) => (
              <Card key={theme.title} className="glass-panel border-white/5 hover:border-[#C8A75E]/30 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-3xl">{theme.icon}</span>
                    <Badge variant="outline" className="text-[#C8A75E] border-[#C8A75E]/30">
                      Comparative
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-[#F5F3EE]">{theme.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#AAB0D6] mb-4 leading-relaxed">
                    {theme.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {theme.traditions.map((tradition) => (
                      <Badge key={tradition} variant="secondary" className="bg-white/5 text-[#AAB0D6]/90 text-xs">
                        {tradition}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Research & Dialogue Streams */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#F5F3EE] mb-4">Research & Dialogue Streams</h2>
            <p className="text-[#AAB0D6] max-w-2xl mx-auto">
              Structured academic engagement across contemplative traditions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {researchStreams.map((stream) => {
              const Icon = stream.icon;
              return (
                <Card key={stream.title} className="glass-panel border-white/5 hover:border-[#C8A75E]/30 transition-all group">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-[#C8A75E]/10 group-hover:bg-[#C8A75E]/20 transition-colors">
                        <Icon className="w-6 h-6 text-[#C8A75E]" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl text-[#F5F3EE] mb-2">{stream.title}</CardTitle>
                        <CardDescription className="text-[#AAB0D6]">
                          {stream.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Link href={stream.link}>
                      <Button variant="outline" className="w-full border-[#C8A75E]/30 text-[#C8A75E] hover:bg-[#C8A75E]/10">
                        Explore
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Methodological Note */}
        <section>
          <Card className="glass-panel border-[#C8A75E]/30 bg-gradient-to-br from-[#C8A75E]/5 to-transparent">
            <CardHeader>
              <CardTitle className="text-2xl text-[#F5F3EE]">Methodological Approach</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[#AAB0D6] leading-relaxed">
                Our interfaith work is grounded in rigorous comparative scholarship, not ecumenical sentimentality.
                We maintain respect for doctrinal distinctiveness while exploring structural, phenomenological,
                and methodological resonances across traditions.
              </p>
              <p className="text-[#AAB0D6] leading-relaxed">
                This includes historical analysis of actual interfaith encounters, textual comparison of mystical
                literature, phenomenological study of contemplative states, and collaborative research between
                scholars rooted in different traditions.
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-[#AAB0D6]/80">
                  Research frameworks informed by: Comparative Theology, History of Religions,
                  Phenomenology of Religion, Contemplative Studies, and Cross-Cultural Philosophy
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
