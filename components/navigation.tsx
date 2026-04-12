'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Menu, X, ChevronDown, LayoutDashboard, ShieldCheck, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';

interface NavLink {
  href: string;
  label: string;
  ariaLabel: string;
  external?: boolean;
}

interface SubmenuLink {
  href: string;
  label: string;
  external?: boolean;
}

const navLinks: NavLink[] = [
  { href: '/foundations', label: 'Foundational Studies', ariaLabel: 'Foundations' },
  { href: '/knowledge-systems', label: 'Knowledge Systems', ariaLabel: 'Knowledge Systems' },
  { href: '/inner-development', label: 'Inner Development', ariaLabel: 'Inner Development' },
  { href: '/assessment', label: 'Personal Assessment', ariaLabel: 'Assessment' },
  { href: '/dialogues', label: 'Scholarly Dialogues', ariaLabel: 'Dialogues' },
  { href: '/interfaith-coherence', label: 'Interfaith Coherence', ariaLabel: 'Interfaith Coherence' },
  { href: '/nextgen-sufi-seeker', label: 'NextGEN Program', ariaLabel: 'NextGEN Sufi Seeker Program' },
  // { href: '/ecommerce/purple-soul-collective', label: 'PSC By DKC Ecommerce', ariaLabel: 'PSC By DKC Ecommerce' },
  { href: '/research', label: 'Sufi Research', ariaLabel: 'Sufi Research' },
  { href: '/institute', label: 'Institute Overview', ariaLabel: 'Institute' },
];

const foundationsSubmenu: SubmenuLink[] = [
  { href: '/foundations', label: 'Overview' },
  { href: '/foundations/masters-of-the-path', label: 'Masters of the Path' },
  { href: '/foundations/lineages', label: 'Lineages & Orders' },
  { href: '/foundations/periods', label: 'Historical Periods' },
  { href: '/foundations/regions', label: 'Civilizational Regions' },
  { href: '/foundations/themes', label: 'Core Themes' },
  { href: '/foundations/intellectual-heritage', label: 'Intellectual Heritage' },
  { href: '/foundations/spiritual-heritage', label: 'Spiritual Heritage' },
];

const knowledgeSystemsSubmenu: SubmenuLink[] = [
  { href: '/knowledge-systems', label: 'Overview' },
  { href: '/knowledge-systems/architecture', label: 'Architecture of Knowledge' },
  { href: '/knowledge-systems/stations', label: 'Stations of the Path' },
  { href: '/knowledge-systems/psychology', label: 'Sufi Psychology' },
  { href: '/knowledge-systems/practices', label: 'Contemplative Practices' },
  { href: '/knowledge-systems/bits', label: 'Applied Concepts' },
  { href: '/knowledge-systems/epistemology', label: 'Epistemology & Method' },
  { href: '/knowledge-systems/science-sufism', label: 'Science & Sufism' },
  { href: '/knowledge-systems/advanced-science', label: 'Advanced Science' },
];

const ecommerceSubmenu: SubmenuLink[] = [
  { href: '/ecommerce/purple-soul-collective', label: 'Purple Soul Collective by DKC' },
  { href: 'https://purplecloudfaith.com', label: 'Enter Marketplace', external: true },
];

const researchSubmenu: SubmenuLink[] = [
  { href: '/research', label: 'Research Overview' },
  { href: '/research/papers', label: 'Research Papers' },
  { href: '/research/projects', label: 'Institute Projects' },
  { href: '/research/white-papers', label: 'White Papers' },
  { href: '/research/publications', label: 'Publications' },
  { href: '/research/team', label: 'Research Team' },
  { href: '/research/funding', label: 'Grants & Funding' },
];

const instituteSubmenu: SubmenuLink[] = [
  { href: '/institute/purpose', label: 'Purpose & Vision' },
  { href: '/institute/founder', label: 'Founder' },
  { href: '/institute/founders-framework', label: "Founder's Framework" },
  { href: '/institute/heritage', label: 'Heritage' },
  { href: '/institute/collaborations', label: 'Collaborations' },
];

const nextgenSubmenu: SubmenuLink[] = [
  { href: '/nextgen-sufi-seeker', label: 'Overview' },
  { href: '/nextgen-sufi-seeker/applied-professional-ethics', label: 'Applied Professional Ethics' },
  { href: '/applied-civilization/sacred-professions', label: 'Sacred Professions' },
  { href: '/applied-civilization/professional-ethics', label: 'Professional Ethics' },
  { href: '/applied-civilization/institutional-governance', label: 'Institutional Governance' },
  { href: '/applied-civilization/alignment-assessment', label: 'Alignment Assessment' },
  { href: '/membership/apply/scholar', label: 'Civilizational Research Membership Path' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    setIsAdmin(document.cookie.includes('sb-admin=1'));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleMobileSubmenu = (label: string) => {
    setExpandedMobile(expandedMobile === label ? null : label);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Layer 1: Brand Identity Zone */}
      <div
        className={`bg-gradient-to-b from-[#0B0F2A] via-[#1a1f3a] to-[#0B0F2A] border-b border-white/5 transition-all duration-500 ${
          scrolled ? 'opacity-0 -translate-y-full h-0 overflow-hidden' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="py-5 hidden xl:block  lg:block">
            <Link href="/" className="flex items-center space-x-5 group">
              <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg group-hover:shadow-[#C8A75E]/20 transition-shadow duration-300 flex-shrink-0 bg-[#0B0F2A]">
                <Image
                  src="/SSC_LOGO.png"
                  alt="Sufi Science Center USA Logo"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-serif font-semibold text-[#F5F3EE] tracking-wide leading-tight">
                  Sufi Science Center USA 
                </h1>
                <p className="text-sm text-[#AAB0D6]/90 tracking-wider mt-1 font-light">
                  Center for Consciousness & Transformative Studies
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Layer 2: Navigation Zone - Sticky */}
      <nav
        className={`transition-all duration-300 ${
          scrolled ? 'glass-panel shadow-lg' : 'bg-[#0B0F2A]/80 backdrop-blur-sm'
        } border-b border-white/5`}
      >
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex mr-6 items-center h-16">
            {/* Compact Logo - Shows when scrolled on desktop */}
            <Link
              href="/"
              className={`hidden lg:flex items-center space-x-3 transition-all duration-300 flex-shrink-0 ${
                scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'
              }`}
            >
              <div className="w-10 h-10  rounded-full overflow-hidden bg-[#0B0F2A]">
                <Image
                  src="/SSC_LOGO.png"
                  alt="Sufi Science Center USA"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-semibold text-[#F5F3EE] tracking-tight">SSC</span>
                <span className="text-[0.8rem] font-semibold text-[#F5F3EE] tracking-tight">USA</span>
              </div>
            </Link>

            {/* Mobile: Logo Always Visible */}
            <Link href="/" className="lg:hidden flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#0B0F2A] flex-shrink-0">
                <Image
                  src="/SSC_LOGO.png"
                  alt="Sufi Science Center USA"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-base font-semibold text-[#F5F3EE] tracking-tight">
                Sufi Science Center USA
              </span>
            </Link>

            {/* Desktop Navigation - Left Aligned on Same Spine */}
            <div className="hidden lg:flex ml-2 items-center space-x-1 flex-1">
              {navLinks.map((link) => {
                const hasSubmenu = link.label === 'Foundational Studies' || link.label === 'Knowledge Systems' || link.label === 'PSC By DKC Ecommerce' || link.label === 'Research' || link.label === 'Institute Overview' || link.label === 'NextGEN Program';
                const submenu = link.label === 'Foundational Studies' ? foundationsSubmenu : link.label === 'Knowledge Systems' ? knowledgeSystemsSubmenu : link.label === 'PSC By DKC Ecommerce' ? ecommerceSubmenu : link.label === 'Research' ? researchSubmenu : link.label === 'Institute Overview' ? instituteSubmenu : link.label === 'NextGEN Program' ? nextgenSubmenu : [];

                return (
                  <div key={link.href} className="relative group">
                    <Link
                      href={link.href}
                      aria-label={link.ariaLabel}
                      className="px-3 py-2 text-sm text-[#AAB0D6] hover:text-[#F5F3EE] transition-colors relative min-h-[3rem] flex items-center"
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <span className="max-w-[6.5rem] text-left leading-tight tracking-tight">
                        {link.label}
                      </span>
                      {hasSubmenu && <ChevronDown className="w-3 h-3 ml-1 opacity-60" />}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C8A75E] group-hover:w-full transition-all duration-300" />
                    </Link>

                    {hasSubmenu && (
                      <div className="absolute top-full left-0 mt-0 w-64 bg-[#0B0F2A]/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="py-2">
                          {submenu.map((sublink) => (
                            <Link
                              key={sublink.href}
                              href={sublink.href}
                              className="block px-4 py-2.5 text-sm text-[#AAB0D6] hover:text-[#F5F3EE] hover:bg-white/5 transition-colors"
                              {...(sublink.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            >
                              {sublink.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Utility Icons - Right Side with margin-left: auto */}
            <div className="hidden lg:flex items-center space-x-2 ml-auto">
              {isAdmin && (
                <Link href="/admin">
                  <Button variant="ghost" size="sm" className="text-[#C8A75E] hover:text-[#F5F3EE] gap-1.5 text-xs border border-[#C8A75E]/30 hover:border-[#C8A75E]/60">
                    <ShieldCheck className="w-4 h-4" />
                    Admin
                  </Button>
                </Link>
              )}
              {user ? (
                <>
                  <Link href="/portal">
                    <Button variant="ghost" size="sm" className="text-[#AAB0D6] hover:text-[#F5F3EE] gap-1.5 text-xs">
                      <LayoutDashboard className="w-4 h-4" />
                      My Portal
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="text-[#AAB0D6] hover:text-[#F5F3EE] gap-1.5 text-xs" onClick={handleLogout}>
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                  {/* <Link href="/portal/account/profile">
                    <Button variant="ghost" size="icon" className="text-[#AAB0D6] hover:text-[#F5F3EE]">
                      <User className="w-5 h-5" />
                    </Button>
                  </Link> */}
                </>
              ) : (
                <>
                  <Link href="/auth/signin">
                    <Button variant="ghost" size="sm" className="text-[#C8A75E] hover:text-[#F5F3EE] gap-1.5 text-xs border border-[#C8A75E]/30 hover:border-[#C8A75E]/60">
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden ml-auto text-[#F5F3EE]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-[#0B0F2A]/90 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-menu"
            role="navigation"
            className="fixed top-[64px] left-0 right-0 bottom-0 bg-gradient-to-b from-[#0B0F2A] to-[#1a1f3a] z-40 lg:hidden overflow-y-auto animate-in slide-in-from-top duration-300"
          >
            <div className="px-6 py-8">
              {/* Mobile Header */}
              <div className="mb-8 pb-6 border-b border-white/10">
                <h2 className="text-xl font-serif font-semibold text-[#F5F3EE] mb-2">
                  Sufi Science Center USA
                </h2>
                <p className="text-sm text-[#AAB0D6]/90">
                  Center for Consciousness & Transformative Studies
                </p>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2 mb-8">
                {navLinks.map((link) => {
                  const hasSubmenu = link.label === 'Foundational Studies' || link.label === 'Knowledge Systems' || link.label === 'PSC By DKC Ecommerce' || link.label === 'Research' || link.label === 'Institute Overview' || link.label === 'NextGEN Program';
                  const submenu = link.label === 'Foundational Studies' ? foundationsSubmenu : link.label === 'Knowledge Systems' ? knowledgeSystemsSubmenu : link.label === 'PSC By DKC Ecommerce' ? ecommerceSubmenu : link.label === 'Research' ? researchSubmenu : link.label === 'Institute Overview' ? instituteSubmenu : link.label === 'NextGEN Program' ? nextgenSubmenu : [];
                  const isExpanded = expandedMobile === link.label;

                  return (
                    <div key={link.href}>
                      <div className="flex items-center">
                        <Link
                          href={link.href}
                          className="flex-1 px-4 py-3 text-base text-[#AAB0D6] hover:text-[#F5F3EE] hover:bg-white/5 rounded transition-colors"
                          onClick={() => !hasSubmenu && setMobileMenuOpen(false)}
                          {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          {link.label}
                        </Link>
                        {hasSubmenu && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-[#AAB0D6] hover:text-[#F5F3EE]"
                            onClick={() => toggleMobileSubmenu(link.label)}
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </Button>
                        )}
                      </div>
                      {hasSubmenu && isExpanded && (
                        <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                          {submenu.map((sublink) => (
                            <Link
                              key={sublink.href}
                              href={sublink.href}
                              className="block px-4 py-2 text-sm text-[#AAB0D6]/80 hover:text-[#F5F3EE] hover:bg-white/5 rounded transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                              {...(sublink.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            >
                              {sublink.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Utility Section */}
              <div className="space-y-2 pt-6 border-t border-white/10 mb-8">
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center space-x-3 px-4 py-3 text-base text-[#C8A75E] hover:text-[#F5F3EE] hover:bg-[#C8A75E]/10 rounded transition-colors w-full border border-[#C8A75E]/20"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
                {user ? (
                  <>
                    <Link
                      href="/portal"
                      className="flex items-center space-x-3 px-4 py-3 text-base text-[#AAB0D6] hover:text-[#F5F3EE] hover:bg-white/5 rounded transition-colors w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span>My Portal</span>
                    </Link>
                    <Link
                      href="/portal/account/profile"
                      className="flex items-center space-x-3 px-4 py-3 text-base text-[#AAB0D6] hover:text-[#F5F3EE] hover:bg-white/5 rounded transition-colors w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                    <button
                      className="flex items-center space-x-3 px-4 py-3 text-base text-[#AAB0D6] hover:text-[#F5F3EE] hover:bg-white/5 rounded transition-colors w-full"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="flex items-center space-x-3 px-4 py-3 text-base text-[#C8A75E] hover:text-[#F5F3EE] hover:bg-[#C8A75E]/10 rounded transition-colors w-full border border-[#C8A75E]/20"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>

              {/* Support Links */}
              <div className="space-y-2 pt-6 border-t border-white/10">
                <Link
                  href="/support/donate"
                  className="block px-4 py-3 text-base text-[#C8A75E] hover:text-[#F5F3EE] hover:bg-white/5 rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Donate
                </Link>
                <Link
                  href="/institute/volunteer"
                  className="block px-4 py-3 text-base text-[#AAB0D6] hover:text-[#F5F3EE] hover:bg-white/5 rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Volunteer
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
