'use client';

import { useState } from 'react';
import { BadgeCheck, Star, ArrowUpRight, X, Search, Loader as Loader2, CircleCheck as CheckCircle2 } from 'lucide-react';
import { usePortalSession } from '@/hooks/use-portal-session';
import Link from 'next/link';

const BENEFITS: Record<string, string[]> = {
  seeker: [
    'Access to all curated learning pathways',
    'Scripture Commentary with Sufi metaphysical lens',
    'Inner Development framework and practice guides',
    'Participation in Study Circles',
    'Eligibility for Mentorship Programme',
    'Access to Hard Inquiry dialogue sessions',
    'Insight Interview archive',
  ],
  fellow: [
    'Everything in Seeker',
    'Mentorship programme access',
    'Priority study circle placement',
    'Certificate of engagement',
    'Advanced curriculum materials',
  ],
  scholar: [
    'Everything in Fellow',
    'Research collaboration opportunities',
    'Direct faculty access',
    'Annual recognition',
    'Institutional representation rights',
  ],
};

const TIERS = [
  {
    name: 'seeker',
    label: 'Seeker',
    price: 'Free',
    desc: 'Full access to core content and learning materials',
  },
  {
    name: 'fellow',
    label: 'Fellow',
    price: 'Free',
    desc: 'Enhanced engagement with mentorship and advanced materials',
  },
  {
    name: 'scholar',
    label: 'Scholar',
    price: 'Free',
    desc: 'Institutional-level engagement and research collaboration',
  },
];

const TIER_ACCENT: Record<string, string> = {
  seeker: '#C8A75E',
  fellow: '#6B9BD1',
  scholar: '#27AE60',
};

export default function MembershipPage() {
  const { session, membership, enrollMembership, cancelMembership, loading } = usePortalSession();
  const [enrolling, setEnrolling] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [justEnrolled, setJustEnrolled] = useState<string | null>(null);

  const currentTierName = membership?.tier || 'seeker';
  const currentTier = TIERS.find((t) => t.name === currentTierName) || TIERS[0];
  const joinDate = membership?.activatedAt
    ? new Date(membership.activatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : session?.createdAt
    ? new Date(session.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—';

  async function handleEnroll(tier: string) {
    setEnrolling(tier);
    await enrollMembership(tier);
    setJustEnrolled(tier);
    setEnrolling(null);
    setTimeout(() => setJustEnrolled(null), 3000);
  }

  async function handleCancel() {
    setCancelling(true);
    await cancelMembership();
    setCancelling(false);
    setShowCancelConfirm(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-[#C8A75E]/20 border-t-[#C8A75E] rounded-full animate-spin" />
      </div>
    );
  }

  const accent = TIER_ACCENT[currentTierName] || '#C8A75E';

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center">
          <BadgeCheck className="w-5 h-5 text-[#C8A75E]" />
        </div>
        <div>
          <h1 className="text-xl font-serif font-bold text-[#F5F3EE]">Membership Status</h1>
          <p className="text-xs text-[#AAB0D6]/50 mt-0.5">Your current tier, benefits, and upgrade options</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-panel rounded-2xl p-6" style={{ borderColor: `${accent}25`, border: `1px solid ${accent}25` }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-1.5">Current Tier</p>
              <div className="flex items-center gap-2.5">
                <Star className="w-5 h-5" style={{ color: accent }} />
                <h2 className="text-2xl font-serif font-bold" style={{ color: accent }}>{currentTier.label}</h2>
              </div>
              <p className="text-xs text-[#AAB0D6]/50 mt-1.5">Member since {joinDate}</p>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full border font-medium uppercase tracking-wider"
              style={{ color: accent, borderColor: `${accent}40`, background: `${accent}15` }}>
              {membership ? 'Active' : 'Default'}
            </span>
          </div>

          <div className="mt-5 pt-5 border-t border-white/5">
            <p className="text-[10px] tracking-[0.15em] text-[#AAB0D6]/30 uppercase mb-3">Included Benefits</p>
            <ul className="space-y-2">
              {(BENEFITS[currentTierName] || BENEFITS.seeker).map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: `${accent}60` }} />
                  <span className="text-xs text-[#AAB0D6]/60">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-4">Available Tiers</p>
          <div className="space-y-3">
            {TIERS.filter((t) => t.name !== currentTierName).map((tier) => {
              const ta = TIER_ACCENT[tier.name] || '#C8A75E';
              const isEnrolling = enrolling === tier.name;
              const isJustEnrolled = justEnrolled === tier.name;
              return (
                <div key={tier.name} className="glass-panel rounded-2xl p-5 border border-white/5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-sm font-serif font-bold text-[#F5F3EE]">{tier.label}</h3>
                      <p className="text-xs text-[#AAB0D6]/50 mt-0.5">{tier.desc}</p>
                    </div>
                    <span className="text-sm font-semibold flex-shrink-0" style={{ color: ta }}>{tier.price}</span>
                  </div>
                  <ul className="space-y-1.5 mb-4">
                    {(BENEFITS[tier.name] || []).map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: `${ta}40` }} />
                        <span className="text-[11px] text-[#AAB0D6]/50">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleEnroll(tier.name)}
                    disabled={isEnrolling}
                    className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg border transition-all disabled:opacity-50"
                    style={{
                      color: ta,
                      borderColor: `${ta}35`,
                      background: `${ta}12`,
                    }}
                  >
                    {isEnrolling ? (
                      <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Enrolling…</>
                    ) : isJustEnrolled ? (
                      <><CheckCircle2 className="w-3.5 h-3.5" /> Enrolled!</>
                    ) : (
                      <>Enroll as {tier.label} <ArrowUpRight className="w-3.5 h-3.5" /></>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/5">
          <h2 className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-3">Membership Actions</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            <Link
              href="/membership/status"
              className="flex items-center gap-1.5 text-xs text-[#AAB0D6]/50 hover:text-[#AAB0D6] transition-colors border border-white/8 hover:border-white/15 px-4 py-2 rounded-lg"
            >
              <Search className="w-3.5 h-3.5" />
              Track Application
            </Link>

            {membership && !showCancelConfirm && (
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="flex items-center gap-2 text-xs text-[#AAB0D6]/30 hover:text-red-400/60 transition-colors border border-white/5 hover:border-red-400/15 px-4 py-2 rounded-lg"
              >
                <X className="w-3.5 h-3.5" />
                Cancel Membership
              </button>
            )}

            {showCancelConfirm && (
              <div className="flex items-center gap-2 w-full">
                <p className="text-xs text-[#AAB0D6]/50 mr-1">Cancel your current enrollment?</p>
                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="text-xs text-red-400 border border-red-400/25 bg-red-400/10 px-3 py-1.5 rounded-lg hover:bg-red-400/18 transition-colors disabled:opacity-50"
                >
                  {cancelling ? 'Cancelling…' : 'Yes, Cancel'}
                </button>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="text-xs text-[#AAB0D6]/50 border border-white/8 px-3 py-1.5 rounded-lg hover:bg-white/4 transition-colors"
                >
                  Keep
                </button>
              </div>
            )}
          </div>
          <p className="text-[10px] text-[#AAB0D6]/20 mt-2">
            All membership tiers are free. Switching tiers takes effect immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
