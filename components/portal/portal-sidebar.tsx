'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, BookOpen, Compass, Users, HandHeart, FlaskConical, CalendarDays, CircleUser as UserCircle, Phone, Shield, BadgeCheck, Receipt, LogOut, X, Menu, UserPlus, LifeBuoy, MessageSquare, ShieldCheck } from 'lucide-react';
import { usePortalSession } from '@/hooks/use-portal-session';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  section: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    section: 'Learning',
    items: [
      { label: 'Dashboard', href: '/portal', icon: LayoutDashboard },
      { label: 'Inner Development', href: '/inner-development', icon: Compass },
      { label: 'Scripture Commentary', href: '/interfaith-coherence/scripture-commentary', icon: BookOpen },
      { label: 'Study Circles', href: '/inner-development/circles', icon: Users },
    ],
  },
  {
    section: 'Engagement',
    items: [
      { label: 'Volunteer', href: '/institute/volunteer', icon: HandHeart },
      { label: 'Research Collaboration', href: '/institute/collaborations', icon: FlaskConical },
      { label: 'Conference Registration', href: '/contribute', icon: CalendarDays },
    ],
  },
  {
    section: 'Support',
    items: [
      { label: 'Create Ticket', href: '/portal/support/create', icon: LifeBuoy },
      { label: 'My Tickets', href: '/portal/support/tickets', icon: MessageSquare },
    ],
  },
  {
    section: 'Account',
    items: [
      { label: 'Profile Information', href: '/portal/account/profile', icon: UserCircle },
      { label: 'Contact Information', href: '/portal/account/contact', icon: Phone },
      { label: 'Security & Password', href: '/portal/account/security', icon: Shield },
      { label: 'Membership Status', href: '/portal/account/membership', icon: BadgeCheck },
      { label: 'Donation History', href: '/portal/account/donations', icon: Receipt },
    ],
  },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, profile, membership, clearSession } = usePortalSession();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('ssc_profile_avatar');
    if (stored) setAvatar(stored);

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'ssc_profile_avatar') setAvatar(e.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    setIsAdmin(document.cookie.includes('admin_token='));
  }, []);

  const isActive = (href: string) => {
    if (href === '/portal') return pathname === '/portal';
    return pathname.startsWith(href);
  };

  const displayName = profile?.displayName || session?.displayName || 'Seeker';
  const sscId = session?.sessionToken?.slice(0, 8).toUpperCase() || '--------';
  const tierName = membership?.tier
    ? membership.tier.charAt(0).toUpperCase() + membership.tier.slice(1)
    : 'Active Seeker';

  function handleLogout() {
    clearSession();
    if (onClose) onClose();
    router.push('/');
  }

  return (
    <div className="flex flex-col h-full">
      {onClose && (
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-white/5">
          <span className="text-xs tracking-[0.2em] text-[#C8A75E]/70 uppercase font-semibold">Navigation</span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors text-[#AAB0D6]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="px-5 py-5 border-b border-white/5">
        <Link href="/portal/account/profile" onClick={onClose} className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-full border-2 border-[#C8A75E]/25 overflow-hidden bg-[#141A3A] flex items-center justify-center flex-shrink-0 group-hover:border-[#C8A75E]/50 transition-colors">
            {avatar ? (
              <Image src={avatar} alt="Profile" width={44} height={44} className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm font-bold text-[#C8A75E] font-serif">
                {displayName.charAt(0).toUpperCase()}
              </span>
            )}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <UserCircle className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#F5F3EE] font-serif truncate">{displayName}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#C8A75E]/12 border border-[#C8A75E]/20 text-[#C8A75E] uppercase tracking-wider font-medium">
                {tierName}
              </span>
            </div>
          </div>
        </Link>
        <p className="text-[10px] text-[#AAB0D6]/30 mt-2.5 tracking-widest">SSC ID: {sscId}</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {NAV_GROUPS.map((group, gi) => (
          <div key={group.section} className={gi > 0 ? 'mt-5 pt-5 border-t border-white/5' : ''}>
            <p className="text-[9px] tracking-[0.2em] text-[#AAB0D6]/30 uppercase font-semibold px-2 mb-2">
              {group.section}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all group ${
                        active
                          ? 'bg-[#C8A75E]/10 border border-[#C8A75E]/20 text-[#C8A75E]'
                          : 'text-[#AAB0D6] hover:text-[#F5F3EE] hover:bg-white/4 border border-transparent'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${active ? 'text-[#C8A75E]' : 'text-[#AAB0D6]/50 group-hover:text-[#AAB0D6]'}`} />
                      <span className="text-xs font-medium">{item.label}</span>
                      {active && <div className="ml-auto w-1 h-1 rounded-full bg-[#C8A75E]" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="px-3 pb-4 border-t border-white/5 pt-3 space-y-0.5">
        {isAdmin && (
          <Link
            href="/admin"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-[#C8A75E] hover:bg-[#C8A75E]/10 transition-all w-full group border border-[#C8A75E]/20 hover:border-[#C8A75E]/40 mb-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="font-medium">Admin Dashboard</span>
          </Link>
        )}
        <Link
          href="/portal/account/profile"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-[#AAB0D6]/50 hover:text-[#C8A75E] hover:bg-[#C8A75E]/5 transition-all w-full group border border-transparent hover:border-[#C8A75E]/10"
        >
          <UserPlus className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Complete Your Account</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-[#AAB0D6]/40 hover:text-rose-400/70 hover:bg-rose-400/5 transition-all w-full group"
        >
          <LogOut className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Clear Session &amp; Exit</span>
        </button>
      </div>
    </div>
  );
}

export function PortalSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 sticky top-0 h-[calc(100vh-160px)] border-r border-white/5 bg-[#0A0C14]/60">
        <SidebarContent />
      </aside>

      <div className="lg:hidden fixed top-20 left-4 z-40">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0D1020]/90 border border-white/8 text-[#AAB0D6] text-xs font-medium backdrop-blur-md"
        >
          <Menu className="w-3.5 h-3.5" />
          Portal Menu
        </button>
      </div>

      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-[#0A0C14] border-r border-white/8 flex flex-col">
            <SidebarContent onClose={() => setMobileOpen(false)} />
          </aside>
        </>
      )}
    </>
  );
}
