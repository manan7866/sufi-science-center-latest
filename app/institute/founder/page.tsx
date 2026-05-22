import { ObservatoryHero } from '@/components/observatory-hero';
import { ObservatoryHeroWithImage } from '@/components/observatory-hero-with-image';
import { Card } from '@/components/ui/card';
import {
  BookOpen,
  Heart,
  Brain,
  Scale,
  Tv,
  Users,
  Mountain,
  Globe2,
  Compass,
  ArrowRight,
  Sparkles,
  Library,
  Microscope,
  Shield,
  MessageCircle,
  Star,
  Quote,
} from 'lucide-react';
import Link from 'next/link';

const ETHICAL_PRINCIPLES = [
  {
    icon: BookOpen,
    title: 'Knowledge Must Transform Character',
    body: 'Information without ethical refinement produces fragmentation rather than wisdom.',
  },
  {
    icon: Heart,
    title: 'Spirituality Must Remain Ethical',
    body: 'Spiritual language without humility, restraint, and conduct becomes performance.',
  },
  {
    icon: Brain,
    title: 'Science Must Remain Humane',
    body: 'Scientific advancement must remain connected to human dignity and moral responsibility.',
  },
  {
    icon: MessageCircle,
    title: 'Religion Must Not Become Hostility',
    body: 'Faith traditions must cultivate coexistence, reflection, depth, and accountability rather than hatred and polarization.',
  },
  {
    icon: Shield,
    title: 'Institutions Must Outlive Personalities',
    body: 'Sustainable institutions require principles, documentation, continuity structures, and ethical governance.',
  },
  {
    icon: Tv,
    title: 'Media Must Carry Responsibility',
    body: 'Communication systems shape civilizations and therefore carry moral consequences.',
  },
];

const INSTITUTIONAL_INITIATIVES = [
  'Sufi Science Center USA',
  'Dr. Kumar Foundation USA',
  'SufiPulse Studio USA',
  'Sacred Kalam preservation systems',
  'Consciousness and contemplative studies initiatives',
  'Interfaith educational dialogue',
  'Youth spiritual literacy systems',
  'Ethical media and communication frameworks',
  'Civilizational coherence research',
];

const CTA_LINKS = [
  { label: 'Explore Sufi Science Center', href: '/institute' },
  { label: 'View Representative Stewardship', href: '/institute/representative-stewardship' },
  { label: 'Explore SufiPulse Studio USA', href: 'https://sufipulse.studio' },
  { label: 'Research & Publications', href: '/research' },
  { label: 'Institutional Heritage', href: '/institute/heritage' },
  { label: 'Consciousness Research Initiatives', href: '/institute/purpose' },
];

const INFLUENCE_DOMAINS = [
  { domain: 'Consciousness Studies', orientation: 'Inner development and reflective inquiry' },
  { domain: 'Ethical Governance', orientation: 'Accountability and institutional continuity' },
  { domain: 'Spiritual Literacy', orientation: 'Character, discipline, humility' },
  { domain: 'Media Responsibility', orientation: 'Ethical transmission and cultural preservation' },
  { domain: 'Civilizational Research', orientation: 'Harmonization of knowledge systems' },
  { domain: 'Interfaith Dialogue', orientation: 'Respectful intellectual engagement' },
  { domain: 'Healing Orientation', orientation: 'Human-centered ethical care' },
];

export default function FounderPage() {
  return (
    <div className="min-h-screen pt-40 bg-[#0B0F2A]">
      <ObservatoryHeroWithImage
        subtitle="Founder"
        title="Dr. Gulam"
        title2="Mohammad Kumar"
        imageSrc="/dr_kumar_image.png"
        imageAlt="Dr. Gulam Mohammad Kumar - Founder"
        description="His teachings emphasized love, humility, compassion, and peaceful coexistence across cultures and faiths.

The institution believes societies heal through understanding, dignity, dialogue, and shared humanity — not hatred or domination."
        
      />

      <section className="py-20 px-4 pt-0 observatory-gradient">
        <div className="max-w-7xl mx-auto space-y-20">

          {/* Section 01 - Meaning of Founder/Bani */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">
              The Meaning of &ldquo;Founder ;
            </h2>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <div className="space-y-5 text-[#AAB0D6] leading-relaxed">
              <p>
                Within SSC USA, the term <span className="text-[#C8A75E] font-semibold">Bani</span> refers to the foundational spiritual and
                philosophical origin from which the institution&rsquo;s ethical orientation, contemplative methodology,
                and civilizational framework emerge.
              </p>
              <p>
                The term does not signify inherited authority, personality worship, or sectarian hierarchy.
              </p>
              <p>
                Rather, it acknowledges the originating source whose teachings, conduct, and intellectual-spiritual
                orientation shaped the institution&rsquo;s foundational direction.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
              <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6">
                <span className="text-[#C8A75E] font-semibold block mb-2">Spiritual and Ethical Origin</span>
                <p className="text-sm text-[#AAB0D6]">The Founder / Bani represents spiritual and ethical origin.</p>
              </div>
              <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6">
                <span className="text-[#C8A75E] font-semibold block mb-2">Representative Stewardship</span>
                <p className="text-sm text-[#AAB0D6]">Representative stewardship carries forward institutional structuring and public responsibility.</p>
              </div>
              <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-6">
                <span className="text-[#C8A75E] font-semibold block mb-2">Institutional Governance</span>
                <p className="text-sm text-[#AAB0D6]">The institution itself remains governed through documented methodology, accountability, and long-term continuity.</p>
              </div>
            </div>
          </div>

          {/* Section 02 - Kashmir, Contemplation, and Civilizational Memory */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">
              Kashmir, Contemplation, and Civilizational Memory
            </h2>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <div className="space-y-5 text-[#AAB0D6] leading-relaxed">
              <p>
                The intellectual atmosphere associated with Dr. Gulam Mohammad Kumar emerges from the broader
                contemplative and philosophical traditions of Kashmir, a region historically shaped by centuries
                of mystical inquiry, poetic philosophy, spiritual reflection, and intercultural knowledge exchange.
              </p>
              <p>
                Within this environment, contemplation was never separated from ethics, and spirituality was never
                detached from responsibility.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {['inward refinement', 'disciplined self-observation', 'humility', 'ethical conduct', 'reflective silence', 'the pursuit of truth beyond ideological spectacle'].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 bg-[#080C1E] border border-white/5 rounded-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                  <span className="text-sm text-[#AAB0D6]">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[#AAB0D6] leading-relaxed mt-6 italic border-l-2 border-[#C8A75E]/50 pl-5">
              This orientation continues to influence the institutional culture of SSC USA.
            </p>
          </div>

          {/* Section 03 - Healing, Knowledge, and Human Development */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">
              Healing, Knowledge, and Human Development
            </h2>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <div className="space-y-5 text-[#AAB0D6] leading-relaxed">
              <p>
                With a professional background shaped through medicine and human care, Dr. Kumar approached the
                human being as more than a biological or psychological system.
              </p>
              <p>
                Healing, within this orientation, involved:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {['ethical balance', 'emotional stability', 'contemplative awareness', 'inner discipline', 'community responsibility', 'spiritual grounding'].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 bg-[#C8A75E]/5 border border-[#C8A75E]/20 rounded-lg">
                  <Star className="w-4 h-4 text-[#C8A75E] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#AAB0D6]">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[#AAB0D6] leading-relaxed mt-6">
              This integrated understanding later informed the broader institutional philosophy of SSC USA, where
              consciousness research, contemplative inquiry, and human development are approached through
              interdisciplinary frameworks rather than reductionist models.
            </p>
          </div>

          {/* Section 04 - Foundational Ethical Orientation */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">
              Foundational Ethical Orientation
            </h2>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <p className="text-[#AAB0D6] leading-relaxed mb-10">
              The philosophical orientation associated with the Founder / Bani may be understood through several
              recurring principles.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {ETHICAL_PRINCIPLES.map((principle) => {
                const Icon = principle.icon;
                return (
                  <Card
                    key={principle.title}
                    className="glass-panel border-[rgba(255,255,255,0.08)] hover:border-[#C8A75E]/40 transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-3">
                        <Icon className="w-5 h-5 text-[#C8A75E] mt-0.5 flex-shrink-0" />
                        <h3 className="text-[#F5F3EE] font-semibold">{principle.title}</h3>
                      </div>
                      <p className="text-sm text-[#AAB0D6] leading-relaxed pl-9">{principle.body}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Section 05 - Banday Bagh and the Culture of Reflection */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">
              Banday Bagh and the Culture of Reflection
            </h2>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <div className="space-y-5 text-[#AAB0D6] leading-relaxed">
              <p>
                The contemplative environment associated with Banday Bagh became an important atmosphere within
                the broader continuity of Dr. Kumar&rsquo;s teachings and ethical influence.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {['quiet reflection', 'respectful dialogue', 'sacred recitation', 'moral accountability', 'disciplined conduct', 'interpersonal dignity'].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 bg-[#080C1E] border border-white/5 rounded-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                  <span className="text-sm text-[#AAB0D6]">{item}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3 text-[#AAB0D6] leading-relaxed mt-6">
              <p>
                Rather than functioning as spectacle or ideological performance, these gatherings cultivated
                inward attention, simplicity, and reflective presence.
              </p>
              <p className="italic border-l-2 border-[#C8A75E]/50 pl-5">
                This orientation continues to influence the ethical culture surrounding the institutional ecosystem
                associated with SSC USA and DKF USA.
              </p>
            </div>
          </div>

          {/* Section 06 - Influence Upon Institutional Development */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">
              Influence Upon Institutional Development
            </h2>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <p className="text-[#AAB0D6] leading-relaxed mb-8">
              The ethical and contemplative orientation associated with the Founder / Bani influenced the
              development of multiple institutional initiatives, including:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {INSTITUTIONAL_INITIATIVES.map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 bg-[#C8A75E]/5 border border-[#C8A75E]/20 rounded-lg">
                  <ArrowRight className="w-4 h-4 text-[#C8A75E] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#AAB0D6]">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[#AAB0D6] leading-relaxed mt-6 text-sm italic">
              These initiatives were later institutionally structured and publicly expanded under representative stewardship.
            </p>
          </div>

          {/* Section 07 - Founder/Bani and Representative Stewardship */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">
              Founder / Bani and Representative Stewardship
            </h2>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <p className="text-[#AAB0D6] leading-relaxed mb-8">
              SSC USA maintains a distinction between spiritual origin and institutional stewardship.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-panel border-[rgba(255,255,255,0.08)]">
                <div className="p-6">
                  <h3 className="text-[#C8A75E] font-semibold mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    The Founder / Bani
                  </h3>
                  <ul className="space-y-2">
                    {['foundational guidance', 'ethical orientation', 'contemplative methodology', 'philosophical origin'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[#AAB0D6]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
              <Card className="glass-panel border-[rgba(255,255,255,0.08)]">
                <div className="p-6">
                  <h3 className="text-[#C8A75E] font-semibold mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Representative Stewardship
                  </h3>
                  <p className="text-sm text-[#AAB0D6] mb-3">
                    Carried forward under <span className="text-[#F5F3EE]">Dr. Fayaz Khan</span>:
                  </p>
                  <ul className="space-y-2">
                    {['institutional structuring', 'research architecture', 'public systems', 'governance frameworks', 'educational expansion', 'media development'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[#AAB0D6]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
            <p className="text-[#AAB0D6] leading-relaxed mt-6 text-sm italic">
              This distinction preserves institutional continuity while preventing personality dependency and
              organizational instability.
            </p>
          </div>

          {/* Section 08 - Why This Foundation Matters Today */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">
              Why This Foundation Matters Today
            </h2>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <div className="space-y-5 text-[#AAB0D6] leading-relaxed">
              <p>
                Modern civilization possesses unprecedented technological capability, yet increasingly struggles with:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 mb-8">
              {['fragmentation of meaning', 'ethical instability', 'spiritual exhaustion', 'institutional distrust', 'ecological imbalance', 'polarization of knowledge systems'].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 bg-[#080C1E] border border-white/5 rounded-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C8A75E] mt-2 flex-shrink-0" />
                  <span className="text-sm text-[#AAB0D6] capitalize">{item}</span>
                </div>
              ))}
            </div>
            <div className="space-y-5 text-[#AAB0D6] leading-relaxed">
              <p>
                The foundational orientation associated with the Founder / Bani emphasizes that sustainable societies
                require harmony between:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {[
                { pair: 'science and ethics' },
                { pair: 'faith and responsibility' },
                { pair: 'knowledge and wisdom' },
                { pair: 'institutional structure and human dignity' },
              ].map((item) => (
                <div key={item.pair} className="flex items-center gap-3 p-4 bg-[#C8A75E]/5 border border-[#C8A75E]/20 rounded-lg">
                  <Scale className="w-4 h-4 text-[#C8A75E] flex-shrink-0" />
                  <span className="text-sm text-[#AAB0D6] capitalize">{item.pair}</span>
                </div>
              ))}
            </div>
            <p className="text-[#AAB0D6] leading-relaxed mt-6 italic border-l-2 border-[#C8A75E]/50 pl-5">
              SSC USA exists as a long-term institutional effort toward that integration.
            </p>
          </div>

          {/* Section 09 - Legacy and Continuity */}
          <div>
            <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">
              Legacy and Continuity
            </h2>
            <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
            <div className="space-y-5 text-[#AAB0D6] leading-relaxed">
              <p>
                The preservation of this legacy is not intended as nostalgia or symbolic heritage alone.
              </p>
              <p>
                Its purpose is continuity.
              </p>
              <p>
                The institutional objective is to cultivate future generations capable of:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {['disciplined inquiry', 'ethical leadership', 'contemplative literacy', 'humane scientific thinking', 'responsible media engagement', 'spiritually grounded public responsibility'].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 bg-[#C8A75E]/5 border border-[#C8A75E]/20 rounded-lg">
                  <Sparkles className="w-4 h-4 text-[#C8A75E] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#AAB0D6]">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[#AAB0D6] leading-relaxed mt-6">
              The Founder / Bani framework within SSC USA therefore functions as a long-term ethical and
              civilizational foundation for continuing institutional development.
            </p>
          </div>

          {/* Closing Quote Section */}
          <Card className="glass-panel border-[rgba(255,255,255,0.08)] overflow-hidden">
            <div className="p-8 md:p-12 xl:text-center lg:text-center md:text-center sm:text-center">
              <Quote className="w-12 h-12 text-[#C8A75E]/40 mx-auto mb-6" />
              <blockquote className="max-w-4xl mx-auto space-y-4">
                <p className="text-[#F5F3EE] text-lg md:text-xl leading-relaxed italic">
                  &ldquo;Civilizations do not decline merely from lack of information.
                </p>
                <p className="text-[#F5F3EE] text-lg md:text-xl leading-relaxed italic">
                  They decline when knowledge loses ethics, institutions lose meaning, and spirituality loses humility.&rdquo;
                </p>
              </blockquote>
              <div className="h-px bg-gradient-to-r from-transparent via-[#C8A75E]/40 to-transparent max-w-xs mx-auto my-6" />
              <p className="text-[#C8A75E] font-semibold tracking-wide">
                &mdash; Dr. Gulam Mohammad Kumar
              </p>
            </div>
          </Card>

          {/* CTA Section */}
          <div>
            <div className="xl:text-center lg:text-center md:text-center sm:text-center mb-10">
              <h2 className="text-3xl font-bold text-[#F5F3EE] mb-4">
                Continue the Journey of Conscious Inquiry
              </h2>
              <p className="text-[#AAB0D6] max-w-3xl mx-auto leading-relaxed">
                Explore the institutional, educational, contemplative, and research initiatives shaped through
                this foundational vision.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {CTA_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg text-[#C8A75E] hover:bg-[#C8A75E]/20 transition-all duration-300 text-sm font-medium"
                >
                  {link.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Optional Side Module - Foundational Areas of Influence */}
          <Card className="glass-panel border-[rgba(255,255,255,0.08)]">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-[#F5F3EE] mb-6">
                Foundational Areas of Influence
              </h2>
              <div className="h-px bg-gradient-to-r from-[#C8A75E]/60 to-transparent mb-8" />
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[rgba(255,255,255,0.08)]">
                      <th className="pb-4 text-[#C8A75E] font-semibold text-sm uppercase tracking-wider">Domain</th>
                      <th className="pb-4 text-[#C8A75E] font-semibold text-sm uppercase tracking-wider">Orientation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INFLUENCE_DOMAINS.map((item) => (
                      <tr key={item.domain} className="border-b border-[rgba(255,255,255,0.04)] last:border-0">
                        <td className="py-4 text-[#F5F3EE] font-medium pr-8">{item.domain}</td>
                        <td className="py-4 text-[#AAB0D6]">{item.orientation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

        </div>
      </section>
    </div>
  );
}
