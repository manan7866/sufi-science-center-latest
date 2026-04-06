import Link from 'next/link';
import { ArrowRight, ExternalLink, Shield, Leaf, Heart, Hammer, Users, Star, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Purple Soul Collective by DKC | Sufi Science Center USA',
  description: 'An ethical marketplace supporting Sufi artisans, handmade craft traditions, and spiritually aligned production across the globe.',
};

const PILLARS = [
  {
    icon: Heart,
    title: 'Craft & Soul',
    body: 'Handmade objects carry intentional imprint. Machine production optimizes speed; hand production transmits presence. Time invested, intention embedded, identity preserved: each piece reflects human consciousness, not industrial automation.',
  },
  {
    icon: Hammer,
    title: 'Craft & Body',
    body: 'The artisan\'s discipline mirrors the seeker\'s discipline. Repetition refines the hand. Consistency stabilizes the mind. Embodied labor cultivates humility. Craft is not merely production. It is training.',
  },
  {
    icon: Leaf,
    title: 'Craft & Environment',
    body: 'Traditional craft practices rely on natural materials, organic dyes, sustainable sourcing, and slower production cycles. Ethical production respects ecological balance. Craft aligns body, soul, and environment.',
  },
];

const COMMITMENTS = [
  'Free of cost to verified Sufi artisan vendors',
  'Designed to support handmade production exclusively',
  'Structured to protect artisan dignity and fair exchange',
  'Built to ensure transparent representation and sourcing',
  'Non-extractive: we provide infrastructure, not profit from it',
];

const LINEAGES = [
  'Central Asia', 'Kashmir', 'Anatolia', 'North Africa', 'The Subcontinent',
];

export default function PurpleSoulCollectivePage() {
  return (
    <div className="min-h-screen">
      <div className="relative py-20 px-4 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8A75E]/5 via-transparent to-[#6B9BD1]/3 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C8A75E]/4 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <p className="text-xs tracking-[0.22em] text-[#C8A75E]/60 uppercase mb-3">Ecommerce</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#F5F3EE] leading-tight mb-4">
            Purple Soul Collective
            <span className="block text-2xl md:text-3xl mt-2 text-[#C8A75E]/80 font-normal">by DKC</span>
          </h1>
          <p className="text-[#AAB0D6]/80 leading-relaxed max-w-2xl text-base mb-10">
            An ethical marketplace supporting Sufi artisans, handmade craft traditions, and spiritually aligned production across the globe.
          </p>

          <div className="glass-panel rounded-2xl p-8 border border-white/8 max-w-2xl">
            <p className="text-lg font-serif text-[#F5F3EE]/90 leading-relaxed mb-4">
              Purple Soul Collective by DKC is not a commercial marketplace in the conventional sense.
            </p>
            <p className="text-[#C8A75E] font-serif text-xl italic mb-6">
              It is an extension of tradition.
            </p>
            <p className="text-sm text-[#AAB0D6]/65 leading-relaxed mb-4">
              Across centuries, Sufi communities were sustained by artisans: weavers, calligraphers, metalworkers,
              bookbinders, merchants, and farmers. Craft was not separate from remembrance. Trade was not separate from trust.
            </p>
            <p className="text-sm text-[#AAB0D6]/65 leading-relaxed">
              This platform exists to preserve that continuity in the digital age.
            </p>
          </div>
        </div>
      </div>

      <section className="py-14 px-4 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <p className="text-[10px] tracking-[0.2em] text-[#AAB0D6]/35 uppercase">Why Commerce Belongs Within a Sufi Framework</p>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <div className="grid md:grid-cols-2 gap-7">
            <div className="glass-panel rounded-2xl p-7 border border-white/5">
              <h2 className="text-lg font-serif font-semibold text-[#F5F3EE] mb-4">Sufism never rejected work. It dignified it.</h2>
              <p className="text-sm text-[#AAB0D6]/60 leading-relaxed mb-4">
                Many classical Sufi masters earned their living through craft and trade. Their livelihoods
                embodied discipline, integrity, and spiritual refinement. Work was remembrance. Craft was
                discipline. Trade was trust.
              </p>
              <p className="text-sm text-[#AAB0D6]/60 leading-relaxed mb-5">
                In the modern world, digital marketplaces have replaced caravan routes. If ethical institutions
                do not create aligned commerce spaces, purely profit-driven systems will dominate craft culture.
              </p>
              <p className="text-sm text-[#C8A75E]/80 font-medium">
                Purple Soul Collective exists to restore intention to exchange.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-7 border border-white/5">
              <h2 className="text-lg font-serif font-semibold text-[#F5F3EE] mb-4">Craft & Sufism: A Living Relationship</h2>
              <p className="text-sm text-[#AAB0D6]/60 leading-relaxed mb-4">
                The spiritual path refines the inner self. Craft refines material form.
              </p>
              <p className="text-sm text-[#AAB0D6]/55 leading-relaxed mb-4">
                Handmade production reflects patience, attention, discipline, and integrity, the same qualities
                cultivated on the inward path.
              </p>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-[10px] tracking-[0.15em] text-[#AAB0D6]/30 uppercase">Artisan lineages across</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {LINEAGES.map((l) => (
                  <span key={l} className="text-[10px] px-2 py-1 rounded-lg bg-[#C8A75E]/8 border border-[#C8A75E]/15 text-[#C8A75E]/60">{l}</span>
                ))}
              </div>
              <p className="text-sm text-[#C8A75E]/80 font-medium mt-4">
                Purple Soul Collective continues that lineage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <p className="text-[10px] tracking-[0.2em] text-[#AAB0D6]/35 uppercase">Three Dimensions of Ethical Craft</p>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="glass-panel rounded-2xl p-6 border border-white/5 hover:border-[#C8A75E]/15 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center mb-5">
                  <pillar.icon className="w-5 h-5 text-[#C8A75E]" />
                </div>
                <h3 className="text-base font-serif font-semibold text-[#F5F3EE] mb-3">{pillar.title}</h3>
                <p className="text-xs text-[#AAB0D6]/55 leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <p className="text-[10px] tracking-[0.2em] text-[#AAB0D6]/35 uppercase">Our Commitment to Sufi Artisans</p>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <div className="grid md:grid-cols-2 gap-7">
            <div className="glass-panel rounded-2xl p-7 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-[#27AE60]/10 border border-[#27AE60]/20 flex items-center justify-center mb-5">
                <Shield className="w-5 h-5 text-[#27AE60]" />
              </div>
              <h3 className="text-base font-serif font-semibold text-[#F5F3EE] mb-4">Platform Commitments</h3>
              <ul className="space-y-2.5">
                {COMMITMENTS.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#AAB0D6]/60">
                    <ChevronRight className="w-3.5 h-3.5 text-[#27AE60]/60 flex-shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel rounded-2xl p-7 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-[#6B9BD1]/10 border border-[#6B9BD1]/20 flex items-center justify-center mb-5">
                <Users className="w-5 h-5 text-[#6B9BD1]" />
              </div>
              <h3 className="text-base font-serif font-semibold text-[#F5F3EE] mb-4">Governance & Transparency</h3>
              <p className="text-sm text-[#AAB0D6]/60 leading-relaxed mb-5">
                Purple Soul Collective by DKC operates under institutional oversight aligned with ethical standards,
                transparent vendor criteria, clear sourcing principles, and a non-exploitative marketplace structure.
              </p>
              <p className="text-sm text-[#AAB0D6]/50 leading-relaxed mb-5">
                This initiative operates under:
              </p>
              <ul className="space-y-1.5">
                {['Sufi Science Center USA', 'Dr. Kumar Foundation USA', 'Purple Cloud Faith Collection'].map((org, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-[#F5F3EE]/50">
                    <Star className="w-3 h-3 text-[#C8A75E]/40 flex-shrink-0" />
                    {org}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="glass-panel rounded-2xl p-10 border border-[#C8A75E]/20 bg-[#C8A75E]/3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#C8A75E]/15 border border-[#C8A75E]/25 flex items-center justify-center mx-auto mb-6">
              <ExternalLink className="w-6 h-6 text-[#C8A75E]" />
            </div>

            <h2 className="text-2xl font-serif font-bold text-[#F5F3EE] mb-3">Entering the Marketplace</h2>
            <p className="text-sm text-[#AAB0D6]/60 leading-relaxed mb-8 max-w-xl mx-auto">
              You are about to enter the Purple Soul Collective marketplace, hosted on an external platform.
              While the infrastructure is independent, it remains aligned with our ethical and spiritual standards.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <p className="text-xs text-[#AAB0D6]/40 italic">Explore intentionally &nbsp;·&nbsp; Support consciously &nbsp;·&nbsp; Purchase responsibly</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://purplecloudfaith.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold bg-[#C8A75E] text-[#0A0C14] hover:bg-[#C8A75E]/90 transition-all shadow-lg shadow-[#C8A75E]/15"
              >
                Enter Purple Soul Collective
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/institute/ethics"
                className="inline-flex items-center gap-2 text-sm text-[#AAB0D6]/50 hover:text-[#AAB0D6] transition-colors"
              >
                Learn About Vendor Standards
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
