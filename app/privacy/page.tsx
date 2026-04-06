import { Shield } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — Sufi Science Center',
  description: 'Privacy policy for the Sufi Science Center digital platform.',
};

const SECTIONS = [
  {
    title: 'Information We Collect',
    content: [
      'Account information you provide when registering, including your name and email address.',
      'Profile information you voluntarily provide, such as your background, interests, and spiritual practice.',
      'Usage data including pages visited, features used, and time spent on the platform.',
      'Content you submit, including reflections, assessment responses, and programme applications.',
      'Technical data such as IP address, browser type, and device information for security and performance purposes.',
    ],
  },
  {
    title: 'How We Use Your Information',
    content: [
      'To provide and maintain your portal account and personalise your experience.',
      'To track your engagement with learning pathways, assessments, and practice materials.',
      'To process programme applications, including mentorship and fellowship applications.',
      'To send administrative communications and, with your consent, updates about new content and programmes.',
      'To analyse aggregate usage patterns to improve the platform — all such analysis uses anonymised or aggregated data.',
      'To comply with legal obligations and protect the security of the platform.',
    ],
  },
  {
    title: 'Information Sharing',
    content: [
      'We do not sell, rent, or share your personal information with third parties for commercial purposes.',
      'We may share anonymised, aggregated data for research and reporting purposes.',
      'We use Supabase as our secure database and authentication provider, which processes data in accordance with its own privacy policy.',
      'We may disclose information if required by law, court order, or to protect the rights and safety of our community.',
      'In the event of a merger or acquisition, user data would be subject to the privacy policy of the acquiring entity.',
    ],
  },
  {
    title: 'Data Security',
    content: [
      'Your account is protected by password authentication and, where enabled, multi-factor authentication.',
      'All data is transmitted over encrypted HTTPS connections.',
      'We implement Row Level Security on our database, ensuring each user can only access their own data.',
      'We conduct regular security reviews and take reasonable technical precautions against unauthorised access.',
      'No system is completely secure; we encourage you to use a strong, unique password and protect your account credentials.',
    ],
  },
  {
    title: 'Your Rights',
    content: [
      'You may access, update, or correct your personal information through your portal account settings.',
      'You may request deletion of your account and associated data by contacting us at contact@sufisciencecenter.org.',
      'You may opt out of non-essential communications at any time by updating your notification preferences.',
      'You may request a copy of the personal data we hold about you.',
      'If you are in the European Economic Area, you have additional rights under GDPR including the right to data portability and the right to lodge a complaint with a supervisory authority.',
    ],
  },
  {
    title: 'Cookies and Tracking',
    content: [
      'We use essential cookies required for authentication and security.',
      'We do not use advertising cookies or third-party tracking cookies.',
      'Analytics cookies, if used, collect only anonymised usage data.',
      'You may configure cookie preferences through your browser settings, though disabling essential cookies may affect platform functionality.',
    ],
  },
  {
    title: 'Children\'s Privacy',
    content: [
      'Our platform is not directed at children under the age of 16.',
      'We do not knowingly collect personal information from children under 16.',
      'If you believe a child has provided us with personal information, please contact us so we can take appropriate action.',
    ],
  },
  {
    title: 'Changes to This Policy',
    content: [
      'We may update this privacy policy from time to time to reflect changes in our practices or applicable law.',
      'We will notify users of material changes by posting the updated policy on this page with a revised date.',
      'Continued use of the platform following notification of changes constitutes acceptance of the updated policy.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0A0B14]">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#C8A75E]" />
            </div>
            <span className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase">
              Legal
            </span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-[#F5F3EE] mb-3">Privacy Policy</h1>
          <p className="text-sm text-[#AAB0D6]/50">
            Last updated: February 2026
          </p>
          <p className="text-[#AAB0D6]/70 mt-4 leading-relaxed">
            The Sufi Science Center is committed to protecting your privacy. This policy explains
            what information we collect, how we use it, and the choices you have regarding your
            personal data. We do not treat privacy as a formality — the data you share with us in
            the context of inner development is held with particular care and discretion.
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
          <h2 className="text-base font-semibold text-[#F5F3EE] mb-2">Contact Us</h2>
          <p className="text-sm text-[#AAB0D6]/70">
            If you have questions about this privacy policy or how we handle your personal data,
            please contact us at{' '}
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
