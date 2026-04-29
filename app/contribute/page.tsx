import { ObservatoryHero } from '@/components/observatory-hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import {
  FileText,
  MessageSquare,
  Mic,
  Music,
  Heart,
  BookOpen,
  Users,
  Scroll,
  ArrowRight,
  CheckCircle2,
  Info
} from 'lucide-react';

export const metadata = {
  title: "Contribute | Sufi Science Center",
  description: "Submit your research, dialogues, practices, and creative works to the Sufi Science Center knowledge ecosystem.",
};

const prisma = new PrismaClient();

async function getActiveConference() {
  try {
    // Try to find published + active first
    let conference = await prisma.conferenceEvent.findFirst({
      where: {
        status: 'published',
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    
    // If none found, show any recent conference (for testing)
    if (!conference) {
      conference = await prisma.conferenceEvent.findFirst({
        orderBy: { createdAt: 'desc' },
      });
    }
    
    return conference;
  } catch (err) {
    console.error('[contribute] getActiveConference error:', err);
    return null;
  }
}

const submissionTypes = [
  {
    type: 'research_paper',
    title: 'Research Paper',
    description: 'Submit original research on consciousness, contemplative science, or interdisciplinary inquiries at the intersection of science and spirituality.',
    icon: FileText,
    exampleTopics: ['Consciousness studies', 'Contemplative neuroscience', 'Philosophy of mind', 'Quantum consciousness'],
  },
  {
    type: 'dialogue_proposal',
    title: 'Dialogue Proposal',
    description: 'Propose a dialogue series exploring complex questions with scholars, practitioners, and thought leaders.',
    icon: MessageSquare,
    exampleTopics: ['Interdisciplinary discussions', 'Critical inquiry topics', 'Applied practices', 'Theoretical explorations'],
  },
  {
    type: 'interview_proposal',
    title: 'Interview Proposal',
    description: 'Nominate yourself or someone else for an Inspiring Insight interview showcasing transformative work and wisdom.',
    icon: Mic,
    exampleTopics: ['Practitioners', 'Researchers', 'Artists', 'Social innovators'],
  },
  {
    type: 'sacred_media',
    title: 'Sacred Media Submission',
    description: 'Submit musical interpretations, recitations, or visual media that embody sacred wisdom and contemplative beauty.',
    icon: Music,
    exampleTopics: ['Musical interpretations', 'Qawwali recordings', 'Visual contemplative art', 'Sacred performances'],
  },
  {
    type: 'practice_submission',
    title: 'Practice and Ritual',
    description: 'Share contemplative practices, meditation techniques, or transformative rituals from authentic spiritual traditions.',
    icon: Heart,
    exampleTopics: ['Meditation techniques', 'Sufi practices', 'Breathwork', 'Contemplative rituals'],
  },
  {
    type: 'sacred_text',
    title: 'Sacred Text and Poetry',
    description: 'Contribute poetic works, mystical writings, or translations of sacred texts with commentary and cultural context.',
    icon: Scroll,
    exampleTopics: ['Sufi poetry', 'Mystical writings', 'Translations', 'Original contemplative verse'],
  },
  {
    type: 'article_essay',
    title: 'Thematic Article',
    description: 'Write essays exploring consciousness, spirituality, ethics, or the integration of science and wisdom traditions.',
    icon: BookOpen,
    exampleTopics: ['Philosophical essays', 'Ethical inquiries', 'Cultural analyses', 'Integrative perspectives'],
  },
  {
    type: 'conference_workshop',
    title: 'Conference / Workshop',
    description: 'Propose conferences, workshops, or educational programs that advance the mission of the institute.',
    icon: Users,
    exampleTopics: ['Academic conferences', 'Practitioner workshops', 'Public programs', 'Training series'],
  },
];

export default async function ContributePage() {
  const conference = await getActiveConference();

  function formatDate(date: Date | string | null | undefined): string {
    if (!date) return 'TBA';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Community"
        title="Contribute to the Knowledge Ecosystem"
        description="Join scholars, practitioners, and creators in building a living archive of wisdom at the intersection of science and spirituality."
      />

      <section className="py-16 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="glass-panel rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <Info className="w-8 h-8 text-[#C8A75E] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-[#F5F3EE] mb-4">Submission Portal</h2>
                <p className="text-[#AAB0D6] leading-relaxed mb-4">
                  The Sufi Science Center welcomes contributions from scholars, practitioners, artists, and thought leaders
                  who are advancing understanding at the frontiers of consciousness research, contemplative science, and
                  spiritual wisdom.
                </p>
                <p className="text-[#AAB0D6] leading-relaxed mb-6">
                  All submissions undergo editorial review to ensure academic rigor, cultural authenticity, and alignment
                  with our mission. Approved content is published within the appropriate knowledge module.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C8A75E] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-[#F5F3EE] mb-1">Peer Reviewed</p>
                      <p className="text-xs text-[#AAB0D6]">Editorial review by qualified scholars</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C8A75E] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-[#F5F3EE] mb-1">Global Reach</p>
                      <p className="text-xs text-[#AAB0D6]">Published to international audience</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C8A75E] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-[#F5F3EE] mb-1">Open Access</p>
                      <p className="text-xs text-[#AAB0D6]">Freely accessible knowledge for all</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-[#C8A75E]/10 via-[#8B7355]/5 to-transparent border-y border-[#C8A75E]/20">
        {conference ? (
        <div className="max-w-5xl mx-auto">
          <Card className="glass-panel border-[#C8A75E]/40 bg-[#C8A75E]/5">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-[#C8A75E] text-[#0B0F2A] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  Featured Event
                </div>
                <div className="text-[#C8A75E] text-sm font-mono">{conference.startDate ? new Date(conference.startDate).getFullYear() : '2026'}</div>
              </div>
              <CardTitle className="text-3xl text-[#F5F3EE] mb-3">
                {conference.title}
              </CardTitle>
              <CardDescription className="text-[#AAB0D6] text-lg leading-relaxed">
                {conference.subtitle || `Submit your paper for the upcoming ${conference.title}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                {conference.description && (
                <p className="text-[#AAB0D6] leading-relaxed">
                  {conference.description}
                </p>
                )}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-[#0B0F2A]/40 rounded-lg p-4 border border-white/10">
                    <p className="text-xs text-[#AAB0D6] uppercase tracking-wide mb-1">Paper Deadline</p>
                    <p className="text-[#F5F3EE] font-semibold">{formatDate(conference.submissionDeadline)}</p>
                  </div>
                  <div className="bg-[#0B0F2A]/40 rounded-lg p-4 border border-white/10">
                    <p className="text-xs text-[#AAB0D6] uppercase tracking-wide mb-1">Event Date</p>
                    <p className="text-[#F5F3EE] font-semibold">{conference.startDate ? `${formatDate(conference.startDate)}${conference.endDate ? ` - ${formatDate(conference.endDate)}` : ''}` : 'TBA'}</p>
                  </div>
                  <div className="bg-[#0B0F2A]/40 rounded-lg p-4 border border-white/10">
                    <p className="text-xs text-[#AAB0D6] uppercase tracking-wide mb-1">Location</p>
                    <p className="text-[#F5F3EE] font-semibold">{conference.location || 'TBA'}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contribute/conference" className="flex-1">
                  <Button className="w-full bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A] font-semibold py-6 text-lg">
                    Submit Your Paper
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/contribute/conference/status">
                  <Button variant="outline" className="border-[#C8A75E]/30 text-[#C8A75E] hover:bg-[#C8A75E]/10 py-6 px-6 text-sm font-medium">
                    Track Submission
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        ) : (
        <div className="max-w-5xl mx-auto">
          <Card className="glass-panel border-white/10 bg-white/5">
            <CardHeader className="text-center py-8">
              <div className="bg-[#C8A75E]/20 text-[#C8A75E] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block mx-auto mb-4">
                Upcoming Event
              </div>
              <CardTitle className="text-3xl text-[#F5F3EE] mb-3">
                Conference Event Coming Soon
              </CardTitle>
              <CardDescription className="text-[#AAB0D6] text-lg leading-relaxed max-w-xl mx-auto">
                We are preparing our next symposium on consciousness, contemplative science, and spiritual wisdom. 
                Check back soon for registration details and submission deadlines.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-4">
              <Link href="/contribute/conference/status">
                <Button variant="outline" className="border-[#C8A75E]/30 text-[#C8A75E] hover:bg-[#C8A75E]/10 py-6 px-6 text-sm font-medium">
                  Track Submission
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        )}
      </section>

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-[#F5F3EE] mb-4">Select Submission Type</h2>
            <p className="text-[#AAB0D6] max-w-2xl mx-auto">
              Choose the category that best fits your contribution. Each type has specific guidelines and review criteria.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissionTypes.map((submission) => {
              const Icon = submission.icon;
              return (
                <Card key={submission.type} className="glass-panel border-white/10 hover:border-[#C8A75E]/30 transition-all group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-[#C8A75E]/10 flex items-center justify-center group-hover:bg-[#C8A75E]/20 transition-colors">
                        <Icon className="w-6 h-6 text-[#C8A75E]" />
                      </div>
                    </div>
                    <CardTitle className="text-xl text-[#F5F3EE]">{submission.title}</CardTitle>
                    <CardDescription className="text-[#AAB0D6]">
                      {submission.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-[#AAB0D6] uppercase tracking-wide mb-2">Examples:</p>
                      <ul className="space-y-1">
                        {submission.exampleTopics.map((topic, idx) => (
                          <li key={idx} className="text-xs text-[#AAB0D6] flex items-start">
                            <span className="text-[#C8A75E] mr-2">•</span>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link href={`/contribute/submit?type=${submission.type}`}>
                      <Button className="w-full bg-[#C8A75E]/10 text-[#C8A75E] hover:bg-[#C8A75E]/20 border border-[#C8A75E]/30">
                        Submit {submission.title}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#C8A75E]/5 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-[#F5F3EE] mb-6">Before You Submit</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/contribute/guidelines">
              <Card className="glass-panel border-[#C8A75E]/30 hover:border-[#C8A75E]/50 transition-all cursor-pointer h-full">
                <CardHeader>
                  <BookOpen className="w-8 h-8 text-[#C8A75E] mx-auto mb-3" />
                  <CardTitle className="text-[#F5F3EE] text-lg">Submission Guidelines</CardTitle>
                  <CardDescription className="text-[#AAB0D6]">
                    Review our standards for content, formatting, citations, and editorial expectations.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/contribute/terms">
              <Card className="glass-panel border-[#C8A75E]/30 hover:border-[#C8A75E]/50 transition-all cursor-pointer h-full">
                <CardHeader>
                  <FileText className="w-8 h-8 text-[#C8A75E] mx-auto mb-3" />
                  <CardTitle className="text-[#F5F3EE] text-lg">Terms and Policies</CardTitle>
                  <CardDescription className="text-[#AAB0D6]">
                    Understand copyright, licensing, attribution, and publication rights for contributions.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
