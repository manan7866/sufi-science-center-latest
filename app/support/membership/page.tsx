import Link from 'next/link';
import { Users, Award, GraduationCap, Building2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTA_HREF: Record<string, string> = {
  'Join Community': '/portal',
  'Apply Now': '/membership',
  'Nomination Process': '/membership/apply/fellow',
  'Contact Us': '/contact',
};

export const metadata = {
  title: 'Membership and Fellowship - Sufi Science Center',
  description: 'Join the Sufi Science Center community through membership and fellowship programs',
};

const membershipLevels = [
  {
    icon: Users,
    title: 'Community Member',
    price: 'Free',
    description: 'Open access to core resources and community engagement',
    benefits: [
      'Access to public research archives',
      'Monthly newsletter with research updates',
      'Community forum participation',
      'Event notifications',
      'Basic resource library access',
    ],
    cta: 'Join Community',
  },
  {
    icon: Award,
    title: 'Research Contributor',
    price: 'By Application',
    description: 'Active participation in research initiatives and dialogue programs',
    benefits: [
      'All Community Member benefits',
      'Access to working papers and drafts',
      'Invitation to research seminars',
      'Contribution opportunities to publications',
      'Participation in dialogue series',
      'Collaborative research project access',
    ],
    cta: 'Apply Now',
  },
  {
    icon: GraduationCap,
    title: 'Teaching Fellow',
    price: 'By Invitation',
    description: 'Recognized scholars contributing to curriculum and knowledge development',
    benefits: [
      'All Research Contributor benefits',
      'Co-authorship opportunities',
      'Curriculum development participation',
      'Advanced research database access',
      'Invitation to faculty gatherings',
      'Recognition in institutional materials',
      'Direct engagement with research fellows',
    ],
    cta: 'Nomination Process',
  },
  {
    icon: Building2,
    title: 'Institutional Member',
    price: 'Custom',
    description: 'Organizational partnerships for research collaboration and knowledge exchange',
    benefits: [
      'Customized collaboration framework',
      'Joint research initiatives',
      'Institutional resource sharing',
      'Co-hosted events and dialogues',
      'Cross-institutional fellowships',
      'Dedicated liaison coordination',
    ],
    cta: 'Contact Us',
  },
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-[#0A0B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
            Membership and Fellowship
          </h1>
          <p className="text-xl text-[#AAB0D6] max-w-3xl mx-auto">
            Join a community dedicated to integrating traditional wisdom with contemporary inquiry.
            Multiple pathways for engagement, contribution, and collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {membershipLevels.map((level, index) => {
            const IconComponent = level.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8 hover:border-[#C8A75E]/50 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-[#C8A75E]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white">{level.title}</h3>
                    <p className="text-[#C8A75E]">{level.price}</p>
                  </div>
                </div>

                <p className="text-[#AAB0D6] mb-6">{level.description}</p>

                <div className="space-y-3 mb-8">
                  {level.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start">
                      <Check className="w-4 h-4 text-[#C8A75E] mr-3 mt-1 flex-shrink-0" />
                      <span className="text-sm text-[#AAB0D6]/80">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Link href={CTA_HREF[level.cta] ?? '/membership'}>
                  <Button
                    variant="outline"
                    className="w-full border-[#C8A75E]/30 text-[#C8A75E] hover:bg-[#C8A75E]/10"
                  >
                    {level.cta}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8">
            <h2 className="text-2xl font-light text-white mb-6">Fellowship Programs</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Research Fellowship</h3>
                <p className="text-[#AAB0D6]/80 text-sm mb-3">
                  Dedicated scholars pursuing focused research projects at the intersection of Sufi
                  wisdom and contemporary inquiry. Fellowships typically span 6-12 months with structured
                  milestones.
                </p>
                <div className="flex items-center text-sm text-[#C8A75E]">
                  <span>Application periods: Biannual</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Visiting Scholar Program</h3>
                <p className="text-[#AAB0D6]/80 text-sm mb-3">
                  Short-term residencies for established scholars engaging with our research community,
                  contributing to dialogues, and exploring collaborative opportunities.
                </p>
                <div className="flex items-center text-sm text-[#C8A75E]">
                  <span>Duration: 1-3 months</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Teaching Fellowship</h3>
                <p className="text-[#AAB0D6]/80 text-sm mb-3">
                  Educators developing curriculum materials, leading seminars, and contributing to
                  pedagogical innovation in consciousness studies and contemplative education.
                </p>
                <div className="flex items-center text-sm text-[#C8A75E]">
                  <span>By invitation or nomination</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8">
            <h2 className="text-2xl font-light text-white mb-6">Application Process</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-start mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-[#C8A75E] font-medium">1</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Initial Expression of Interest</h3>
                    <p className="text-[#AAB0D6]/80 text-sm">
                      Submit a brief statement outlining your background, interests, and proposed
                      contribution or research focus.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-[#C8A75E] font-medium">2</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Preliminary Review</h3>
                    <p className="text-[#AAB0D6]/80 text-sm">
                      Our team reviews applications for alignment with institutional focus and
                      available capacity.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-[#C8A75E] font-medium">3</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Full Application</h3>
                    <p className="text-[#AAB0D6]/80 text-sm">
                      Selected candidates submit detailed proposals including research plans,
                      qualifications, and expected outcomes.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-[#C8A75E] font-medium">4</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Interview and Decision</h3>
                    <p className="text-[#AAB0D6]/80 text-sm">
                      Finalists engage in dialogue with review committee. Decisions typically within
                      4-6 weeks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8">
          <h2 className="text-2xl font-light text-white mb-6">Participation Opportunities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-white font-medium mb-3">Research Collaboration</h3>
              <p className="text-[#AAB0D6]/80 text-sm mb-3">
                Contribute to ongoing research projects, co-author publications, and participate in
                peer review processes.
              </p>
              <Link href="/research" className="text-sm text-[#C8A75E] hover:underline">
                View Current Projects →
              </Link>
            </div>
            <div>
              <h3 className="text-white font-medium mb-3">Dialogue Series</h3>
              <p className="text-[#AAB0D6]/80 text-sm mb-3">
                Lead or participate in structured dialogues, insight interviews, and applied
                practice sessions.
              </p>
              <Link href="/dialogues" className="text-sm text-[#C8A75E] hover:underline">
                Explore Dialogues →
              </Link>
            </div>
            <div>
              <h3 className="text-white font-medium mb-3">Knowledge Development</h3>
              <p className="text-[#AAB0D6]/80 text-sm mb-3">
                Contribute to knowledge system mapping, curriculum development, and resource
                creation.
              </p>
              <Link href="/knowledge-systems" className="text-sm text-[#C8A75E] hover:underline">
                View Knowledge Systems →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
