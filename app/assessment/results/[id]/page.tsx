'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Brain, Heart, Sparkles, CircleCheck as CheckCircle, ArrowRight, ArrowLeft, Chrome as Home, User, FileText, Video, Music, BookOpen } from 'lucide-react';

interface ResultData {
  id: string;
  result_json: {
    scores: Record<string, number>;
    completed_at: string;
    contact?: {
      full_name: string;
      email: string;
      phone?: string | null;
    };
    session_type?: string;
  };
}

interface ContentRecommendation {
  id: string;
  content_type: string;
  recommendation_text: string;
  content: {
    id: string;
    slug: string;
    title?: string;
    name?: string;
    poet_name?: string;
  };
}

const DIMENSION_INFO = {
  cognitive_patterns: {
    icon: Brain,
    title: 'Cognitive Patterns',
    description: 'Your thinking styles, belief systems, and epistemic approaches',
    recommendations: {
      low: 'Consider exploring philosophical inquiry and contemplative reading to expand your cognitive flexibility.',
      medium: 'Continue developing your reflective capacity through journaling and structured self-inquiry practices.',
      high: 'Your cognitive flexibility is well-developed. Focus on deepening metacognitive awareness and exploring advanced epistemic frameworks.',
    },
  },
  emotional_intelligence: {
    icon: Heart,
    title: 'Emotional Intelligence',
    description: 'Your emotional awareness, regulation, and relational capacity',
    recommendations: {
      low: 'Begin with basic emotion recognition exercises and mindful awareness of feeling states throughout your day.',
      medium: 'Deepen your practice with somatic awareness techniques and compassionate communication methods.',
      high: 'Your emotional intelligence is strong. Explore advanced practices in emotional alchemy and relational depth work.',
    },
  },
  contemplative_capacity: {
    icon: Sparkles,
    title: 'Contemplative Capacity',
    description: 'Your meditation experience and access to states of consciousness',
    recommendations: {
      low: 'Start with foundational mindfulness practices. Consider guided meditations and breathwork as entry points.',
      medium: 'Establish a consistent daily practice. Explore different contemplative traditions to find what resonates.',
      high: 'Your contemplative capacity is well-established. Focus on stability, integration, and exploring subtle states.',
    },
  },
  transformative_readiness: {
    icon: CheckCircle,
    title: 'Transformative Readiness',
    description: 'Your preparedness for deep personal and spiritual development',
    recommendations: {
      low: 'Focus on creating space and structure in your life. Start with small, sustainable commitments to inner work.',
      medium: 'You have good readiness. Deepen your commitment through community engagement and structured programs.',
      high: 'You are highly ready for transformation. Seek intensive practices, advanced teachings, and dedicated retreats.',
    },
  },
  doctrinal_grounding: {
    icon: BookOpen,
    title: 'Doctrinal Grounding',
    description: 'Your knowledge of Islamic theology and Sufi metaphysical foundations',
    recommendations: {
      low: 'Begin systematic study of core Islamic texts with qualified teachers. Focus on foundational theology and prophetic biography.',
      medium: 'Continue deepening textual knowledge. Engage with classical Sufi texts and explore different schools of thought.',
      high: 'Your doctrinal foundation is strong. Focus on integration, subtle distinctions, and transmission pedagogy.',
    },
  },
  psychological_maturity: {
    icon: Heart,
    title: 'Psychological Maturity',
    description: 'Your ego stability, shadow awareness, and authority relationship',
    recommendations: {
      low: 'Engage in therapeutic work to strengthen ego structure. Develop awareness of projections and unconscious patterns.',
      medium: 'Continue self-examination practices. Work with supervision to identify blind spots and refine self-awareness.',
      high: 'Your psychological maturity is well-developed. Maintain vigilance and engage in ongoing peer reflection.',
    },
  },
  ethical_responsibility: {
    icon: CheckCircle,
    title: 'Ethical Responsibility',
    description: 'Your awareness of power dynamics and commitment to ethical practice',
    recommendations: {
      low: 'Study ethical frameworks for spiritual teaching. Seek mentorship on boundary-setting and responsibility.',
      medium: 'Deepen understanding of subtle ethical challenges. Engage with case studies and ethical scenario work.',
      high: 'Your ethical awareness is strong. Focus on modeling ethical practice and mentoring others in this capacity.',
    },
  },
  transmission_capacity: {
    icon: Sparkles,
    title: 'Transmission Capacity',
    description: 'Your ability to communicate teachings and guide developmental processes',
    recommendations: {
      low: 'Develop pedagogical skills through teaching practice. Study effective communication and learning design.',
      medium: 'Continue refining your teaching methodology. Seek feedback and experiment with different approaches.',
      high: 'Your transmission capacity is well-developed. Focus on subtle adaptation and advanced developmental diagnosis.',
    },
  },
  interfaith_literacy: {
    icon: Brain,
    title: 'Interfaith Literacy',
    description: 'Your knowledge of diverse spiritual traditions and universal principles',
    recommendations: {
      low: 'Begin studying core texts of major world traditions. Engage in respectful dialogue with diverse practitioners.',
      medium: 'Deepen comparative study. Explore civilizational contexts and identify universal spiritual principles.',
      high: 'Your interfaith literacy is advanced. Focus on nuanced dialogue and bridging diverse wisdom traditions.',
    },
  },
};

function getLevel(score: number): 'low' | 'medium' | 'high' {
  if (score < 4) return 'low';
  if (score < 7) return 'medium';
  return 'high';
}

function getLevelLabel(score: number): string {
  if (score < 4) return 'Developing';
  if (score < 7) return 'Progressing';
  return 'Advanced';
}

function getContentIcon(contentType: string) {
  switch (contentType) {
    case 'saint': return User;
    case 'dialogue': return Video;
    case 'research': return FileText;
    case 'sacred_kalam': return BookOpen;
    case 'media_track': return Music;
    default: return ArrowRight;
  }
}

function getContentUrl(contentType: string, slug: string): string {
  switch (contentType) {
    case 'saint': return `/foundations#${slug}`;
    case 'dialogue': return `/dialogues`;
    case 'research': return `/research`;
    case 'sacred_kalam': return `/media/sacred-kalam/${slug}`;
    case 'media_track': return `/media/sufipulse/song/${slug}`;
    default: return '/';
  }
}

export default function AssessmentResultsPage() {
  const params = useParams();
  const router = useRouter();
  const [result, setResult] = useState<ResultData | null>(null);
  const [recommendations, setRecommendations] = useState<Record<string, ContentRecommendation[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResult();
  }, [params.id]);

  async function loadResult() {
    try {
      const res = await fetch(`/api/assessments/results/${params.id}`);
      if (!res.ok) throw new Error('Result not found');
      const data = await res.json();
      setResult(data as ResultData);
      setRecommendations({});
    } catch (error) {
      console.error('Error loading result:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C8A75E]/30 border-t-[#C8A75E] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#AAB0D6]">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#AAB0D6] mb-4">Results not found</p>
          <Button onClick={() => router.push('/assessment')} className="bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A]">
            Return to Assessment
          </Button>
        </div>
      </div>
    );
  }

  const scores = result.result_json.scores;
  const overallAverage = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.values(scores).length;

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/assessment" className="inline-flex items-center gap-2 text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Assessment
          </Link>
        </div>
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#C8A75E]/20 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-[#C8A75E]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#F5F3EE] mb-4">
            Assessment Complete
          </h1>
          {result?.result_json?.contact?.full_name && (
            <p className="text-2xl text-[#C8A75E] mb-2">
              {result.result_json.contact.full_name}
            </p>
          )}
          <p className="text-xl text-[#AAB0D6]">
            Your Personalized Development Profile
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-8 md:p-12 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-[#F5F3EE] mb-2">
              Overall Development Score
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="text-6xl font-bold text-[#C8A75E]">
                {overallAverage.toFixed(1)}
              </div>
              <div className="text-left">
                <div className="text-sm text-[#AAB0D6]">out of 10</div>
                <div className="text-lg text-[#C8A75E]">{getLevelLabel(overallAverage)}</div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {Object.entries(scores).map(([dimension, score]) => {
              const info = DIMENSION_INFO[dimension as keyof typeof DIMENSION_INFO];
              if (!info) return null;

              const Icon = info.icon;
              const level = getLevel(score);
              const percentage = (score / 10) * 100;
              const dimensionRecs = recommendations[dimension] || [];

              return (
                <div key={dimension} className="border-t border-[#2A2F4F]/30 pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#C8A75E]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#C8A75E]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-[#F5F3EE]">
                          {info.title}
                        </h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#C8A75E]">
                            {score.toFixed(1)}
                          </div>
                          <div className="text-sm text-[#AAB0D6]">
                            {getLevelLabel(score)}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-[#AAB0D6] mb-3">
                        {info.description}
                      </p>
                      <div className="w-full bg-[#2A2F4F]/30 rounded-full h-2 mb-4">
                        <div
                          className="bg-[#C8A75E] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-4 mb-4">
                        <h4 className="text-sm font-semibold text-[#F5F3EE] mb-2">
                          Recommended Next Steps
                        </h4>
                        <p className="text-sm text-[#AAB0D6]">
                          {info.recommendations[level]}
                        </p>
                      </div>

                      {dimensionRecs.length > 0 && (
                        <div className="bg-[#16213e]/40 border border-[#2A2F4F]/30 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-[#F5F3EE] mb-3">
                            Personalized Content Recommendations
                          </h4>
                          <div className="space-y-2">
                            {dimensionRecs.map((rec) => {
                              const ContentIcon = getContentIcon(rec.content_type);
                              const displayName = rec.content.name || rec.content.title;
                              const url = getContentUrl(rec.content_type, rec.content.slug);

                              return (
                                <Link
                                  key={rec.id}
                                  href={url}
                                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#2A2F4F]/30 transition-colors group"
                                >
                                  <ContentIcon className="w-5 h-5 text-[#C8A75E] flex-shrink-0 mt-0.5" />
                                  <div className="flex-1">
                                    <div className="text-sm font-medium text-[#F5F3EE] group-hover:text-[#C8A75E] transition-colors">
                                      {displayName}
                                    </div>
                                    {rec.recommendation_text && (
                                      <div className="text-xs text-[#AAB0D6]/70 mt-1">
                                        {rec.recommendation_text}
                                      </div>
                                    )}
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-[#AAB0D6]/50 group-hover:text-[#C8A75E] transition-colors flex-shrink-0 mt-0.5" />
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-semibold text-[#F5F3EE] mb-4">
            Explore Further
          </h2>
          <p className="text-[#AAB0D6] mb-6">
            Continue your journey with these curated sections:
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => router.push('/foundations')}
              variant="outline"
              className="w-full justify-between border-[#2A2F4F] text-[#AAB0D6] hover:bg-[#2A2F4F]/30"
            >
              <span>Explore Foundations: Masters of the Path</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => router.push('/media/sufipulse')}
              variant="outline"
              className="w-full justify-between border-[#2A2F4F] text-[#AAB0D6] hover:bg-[#2A2F4F]/30"
            >
              <span>SufiPulse Studio: Sacred Music</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => router.push('/media/sacred-kalam')}
              variant="outline"
              className="w-full justify-between border-[#2A2F4F] text-[#AAB0D6] hover:bg-[#2A2F4F]/30"
            >
              <span>Sacred Kalam: Poetry and Wisdom</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => router.push('/dialogues')}
              variant="outline"
              className="w-full justify-between border-[#2A2F4F] text-[#AAB0D6] hover:bg-[#2A2F4F]/30"
            >
              <span>Engage with Dialogues and Inquiry</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="border-[#2A2F4F] text-[#AAB0D6] hover:bg-[#2A2F4F]/30"
          >
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </Button>
          <Button
            onClick={() => router.push('/assessment')}
            className="bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A]"
          >
            Retake Assessment
          </Button>
        </div>
      </div>
    </div>
  );
}
