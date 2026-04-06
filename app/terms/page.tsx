import { ScrollText } from 'lucide-react';

export const metadata = {
  title: 'Terms of Use — Sufi Science Center',
  description: 'Terms of use for the Sufi Science Center digital platform.',
};

const SECTIONS = [
  {
    title: 'Acceptance of Terms',
    content: [
      'By accessing or using the Sufi Science Center platform, you agree to be bound by these Terms of Use.',
      'If you do not agree to these terms, you must not use the platform.',
      'We may revise these terms at any time. Continued use following notification of changes constitutes acceptance.',
      'These terms apply to all visitors, registered users, contributors, and applicants.',
    ],
  },
  {
    title: 'Use of the Platform',
    content: [
      'You may use the platform for personal, non-commercial purposes consistent with its educational and contemplative mission.',
      'You must not use the platform for any unlawful purpose or in any way that violates applicable local, national, or international law.',
      'You must not scrape, harvest, or systematically collect content from the platform without prior written permission.',
      'You must not impersonate any person or entity or misrepresent your affiliation with any person or entity.',
      'You must not interfere with the security, integrity, or availability of the platform or its underlying infrastructure.',
    ],
  },
  {
    title: 'Account Registration and Security',
    content: [
      'You must provide accurate and complete information when creating an account.',
      'You are responsible for maintaining the confidentiality of your account credentials.',
      'You must notify us immediately of any unauthorised use of your account.',
      'You are responsible for all activities that occur under your account.',
      'We reserve the right to suspend or terminate accounts that violate these terms.',
    ],
  },
  {
    title: 'Intellectual Property',
    content: [
      'All content on the platform — including text, research materials, audio recordings, and design — is the property of the Sufi Science Center or its licensors.',
      'Content is made available for personal study, learning, and non-commercial use only.',
      'You may not reproduce, distribute, or create derivative works from platform content without prior written permission.',
      'Classical Sufi texts and scholarly translations reproduced on the platform are used under applicable fair use or with appropriate permissions.',
      'User-submitted content remains your property; by submitting, you grant us a non-exclusive licence to use it for platform purposes.',
    ],
  },
  {
    title: 'User Submissions and Conduct',
    content: [
      'You are solely responsible for any content you submit to the platform.',
      'Submitted content must not infringe the intellectual property rights of others.',
      'Submitted content must not be defamatory, abusive, threatening, or harassing.',
      'We reserve the right to remove any content that violates these standards without notice.',
      'Research submissions are subject to our additional contribution guidelines available at /contribute/guidelines.',
    ],
  },
  {
    title: 'Programme Applications and Participation',
    content: [
      'Applications for mentorship, fellowship, and other programmes are subject to additional terms provided at the time of application.',
      'Acceptance into programmes is at our sole discretion and subject to available capacity.',
      'Programme participants are expected to maintain standards of conduct consistent with the ethos of the institution.',
      'We reserve the right to withdraw programme participation for violation of these standards.',
    ],
  },
  {
    title: 'Disclaimer of Warranties',
    content: [
      'The platform is provided on an "as is" and "as available" basis without warranties of any kind.',
      'We do not warrant that the platform will be uninterrupted, error-free, or free of harmful components.',
      'Spiritual and inner development content is provided for educational purposes and does not constitute professional psychological, medical, or therapeutic advice.',
      'We make no representations about the completeness or accuracy of any content on the platform.',
    ],
  },
  {
    title: 'Limitation of Liability',
    content: [
      'To the fullest extent permitted by applicable law, the Sufi Science Center and its affiliates shall not be liable for indirect, incidental, or consequential damages arising from your use of the platform.',
      'Our total liability shall not exceed the amount you have paid to us in the twelve months preceding the claim.',
      'Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability, so the above may not apply to you.',
    ],
  },
  {
    title: 'Governing Law',
    content: [
      'These terms are governed by the laws of the State of Delaware, United States, without regard to its conflict of law provisions.',
      'Any disputes shall be resolved through binding arbitration in Delaware, except where prohibited by law.',
      'If any provision of these terms is found unenforceable, the remaining provisions shall continue in full force and effect.',
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0B14]">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center">
              <ScrollText className="w-5 h-5 text-[#C8A75E]" />
            </div>
            <span className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase">
              Legal
            </span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-[#F5F3EE] mb-3">Terms of Use</h1>
          <p className="text-sm text-[#AAB0D6]/50">Last updated: February 2026</p>
          <p className="text-[#AAB0D6]/70 mt-4 leading-relaxed">
            These Terms of Use govern your access to and use of the Sufi Science Center digital
            platform, including all content, programmes, and services offered through this website.
            Please read these terms carefully before using the platform.
          </p>
        </div>

        <div className="space-y-8">
          {SECTIONS.map((section, i) => (
            <div key={i} className="glass-panel rounded-2xl p-7 border border-white/5">
              <h2 className="text-lg font-serif font-bold text-[#F5F3EE] mb-5">
                {i + 1}. {section.title}
              </h2>
              <ul className="space-y-3">
                {section.content.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-[#AAB0D6]/70 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C8A75E]/40 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 glass-panel rounded-2xl p-7 border border-[#C8A75E]/10">
          <h2 className="text-base font-semibold text-[#F5F3EE] mb-2">Questions About These Terms</h2>
          <p className="text-sm text-[#AAB0D6]/70">
            If you have questions about these Terms of Use, please contact us at{' '}
            <a
              href="mailto:contact@sufisciencecenter.org"
              className="text-[#C8A75E] hover:underline"
            >
              contact@sufisciencecenter.org
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
