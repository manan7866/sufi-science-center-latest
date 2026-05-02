import Link from 'next/link';
import packageJson from '../package.json';

export function Footer() {
  return (
    <footer className="bg-[#0B0F2A] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          <div>
            <h3 className="text-[#F5F3EE] font-semibold text-sm uppercase tracking-wider mb-4">
              Institute
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/foundations"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Foundations
                </Link>
              </li>
              <li>
                <Link
                  href="/knowledge-systems"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Knowledge Systems
                </Link>
              </li>
              <li>
                <Link
                  href="/inner-development"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Inner Development
                </Link>
              </li>
              <li>
                <Link
                  href="/research"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  href="/institute/founder"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Founder
                </Link>
              </li>
            </ul>
          </div>

          <div >
            <h3 className="text-[#F5F3EE] font-semibold text-sm uppercase tracking-wider mb-4">
              Media
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/media/sufipulse"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  SufiPulse Studio USA
                </Link>
              </li>
              <li>
                <Link
                  href="/media/sacred-kalam"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Sacred Kalam Library
                </Link>
              </li>
            </ul>
            <h3 className="text-[#F5F3EE] font-semibold text-sm uppercase tracking-wider mb-4 mt-12">
              Ecommerce
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://purplecloudfaith.com"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Purple Soul Collective
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#F5F3EE] font-semibold text-sm uppercase tracking-wider mb-4">
              Community
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/dialogues"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Dialogues
                </Link>
              </li>
              <li>
                <Link
                  href="/assessment"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Assessment
                </Link>
              </li>
              <li>
                <Link
                  href="/contribute"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Contribute
                </Link>
              </li>
              <li>
                <Link
                  href="/institute/volunteer"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Volunteer
                </Link>
              </li>
              <li>
                <Link
                  href="/institute/collaborations"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Collaborations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#F5F3EE] font-semibold text-sm uppercase tracking-wider mb-4">
              Governance
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/institute"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Vision
                </Link>
              </li>
              <li>
                <Link
                  href="/institute/affiliation"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Affiliations
                </Link>
              </li>
              <li>
                <Link
                  href="/institute/board"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Board & Advisory
                </Link>
              </li>
              <li>
                <Link
                  href="/institute/ethics"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Ethics and Methodology
                </Link>
              </li>
              <li>
                <Link
                  href="/support/impact"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Transparency
                </Link>
              </li>
            </ul>
          </div>

          

          <div>
            <h3 className="text-[#F5F3EE] w-max font-semibold text-sm uppercase tracking-wider mb-4">
              Applied Civilization
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/applied-civilization/sacred-professions"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Sacred Professions
                </Link>
              </li>
              <li>
                <Link
                  href="/applied-civilization/professional-ethics"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Professional Ethics
                </Link>
              </li>
              <li>
                <Link
                  href="/applied-civilization/institutional-governance"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Institutional Governance
                </Link>
              </li>
              <li>
                <Link
                  href="/applied-civilization/alignment-assessment"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Alignment Assessment
                </Link>
              </li>
              <li>
                <Link
                  href="/applied-civilization/research-papers"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Civilizational Research
                </Link>
              </li>
            </ul>
          </div>
          <div className='mx-4'>
            <h3 className="text-[#F5F3EE] font-semibold text-sm uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/support/membership"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Membership
                </Link>
              </li>
              <li>
                <Link
                  href="/support/donate"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Donate
                </Link>
              </li>
              
              <li>
                <Link
                  href="/nextgen-sufi-seeker"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  NextGEN
                </Link>
              </li>
              <li>
                <Link
                  href="/questions-and-understanding"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#AAB0D6] hover:text-[#C8A75E] transition-colors text-sm whitespace-nowrap"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#C8A75E]/30 to-transparent mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-[#AAB0D6]">
          <div className="text-center md:text-left">
            <p className="mb-1">
              An initiative of{' '}
              <a href="https://dkf.sufisciencecenter.info/" target="_blank" rel="noopener noreferrer" className="text-[#C8A75E] font-medium hover:underline">
                Dr. Kumar Foundation USA
              </a>
            </p>
            <p className="text-xs">
              Sponsored by{' '}
              <a href="https://ps.dekoshurcrfats.com/" target="_blank" rel="noopener noreferrer" className="text-[#C8A75E] font-medium hover:underline">Purple Soul Collective by DKC</a>
            </p>
          </div>
          <div className="text-center text-xs">
            <p className="mb-1">Media Partner</p>
            <a href="https://sufipulse.com/" target="_blank" rel="noopener noreferrer" className="text-[#C8A75E] font-medium hover:underline">
              SufiPulse Studio USA
            </a>
          </div>
          <div className="text-center md:text-right text-xs">
            <p>&copy; {new Date().getFullYear()} Sufi Science Center</p>
            <p className="mt-1">All rights reserved</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
            <Link
              href="/privacy"
              className="text-[#AAB0D6]/70 hover:text-[#C8A75E] transition-colors text-[13px]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[#AAB0D6]/70 hover:text-[#C8A75E] transition-colors text-[13px]"
            >
              Terms of Use
            </Link>
            <Link
              href="/disclaimer"
              className="text-[#AAB0D6]/70 hover:text-[#C8A75E] transition-colors text-[13px]"
            >
              Disclaimer
            </Link>
            <Link
              href="/accessibility"
              className="text-[#AAB0D6]/70 hover:text-[#C8A75E] transition-colors text-[13px]"
            >
              Accessibility
            </Link>
            <Link
              href="/institute/ethics"
              className="text-[#AAB0D6]/70 hover:text-[#C8A75E] transition-colors text-[13px]"
            >
              Ethical Research Statement
            </Link>
          </div>
        </div>

        <div className="mt-6 border-t border-white/5 pt-6 text-center space-y-3">
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Platform engineered and maintained by{' '}
            <a
              href="https://primelogicsol.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C8A75E] hover:text-white transition-colors duration-300"
            >
              Prime Logic Solutions
            </a>
            , the in-house software development division of De Koshur Crafts USA.
          </p>
          <p className="text-[11px] text-[#4B5563] tracking-wide">
            Platform Version {packageJson.version} &middot; Build {process.env.NEXT_PUBLIC_GIT_HASH ?? 'dev'}
          </p>
          <div className="flex justify-center items-center gap-3 text-[11px] text-[#4B5563]">
            <Link href="/security" className="hover:text-[#AAB0D6]/50 transition-colors">Security</Link>
            <span className="opacity-40">&bull;</span>
            <Link href="/security/ssl" className="hover:text-[#AAB0D6]/50 transition-colors">SSL Secured</Link>
            <span className="opacity-40">&bull;</span>
            <Link href="/security/encryption" className="hover:text-[#AAB0D6]/50 transition-colors">Data Encryption</Link>
            <span className="opacity-40">&bull;</span>
            <Link href="/security/authentication" className="hover:text-[#AAB0D6]/50 transition-colors">Secure Authentication</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
