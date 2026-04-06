'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, CircleCheck as CheckCircle, Mail, User, Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Question {
  id: string;
  dimension: string;
  question_text: string;
  weight: number;
  order_index: number;
}

interface AssessmentData {
  id: string;
  title: string;
  description: string;
  assessment_type: string;
}

const DIMENSION_LABELS: Record<string, string> = {
  cognitive_patterns: 'Cognitive Patterns • Epistemology Mapping',
  emotional_intelligence: 'Emotional Intelligence • Relational Depth',
  contemplative_capacity: 'Contemplative Capacity • Inner States',
  transformative_readiness: 'Transformative Readiness • Path Orientation',
  doctrinal_grounding: 'Doctrinal Grounding • Theological Foundation',
  psychological_maturity: 'Psychological Maturity • Ego Architecture',
  ethical_responsibility: 'Ethical Responsibility • Conduct Integrity',
  transmission_capacity: 'Transmission Capacity • Pedagogical Reach',
  interfaith_literacy: 'Interfaith Literacy • Pluralistic Engagement',
};

const SCALE_LABELS: Record<number, string> = {
  1: 'Strongly Analytical',
  2: 'Primarily Analytical',
  3: 'Analytically Inclined',
  4: 'Leaning Analytical',
  5: 'Balanced',
  6: 'Leaning Intuitive',
  7: 'Intuitively Inclined',
  8: 'Primarily Intuitive',
  9: 'Strongly Intuitive',
  10: 'Deeply Intuitive',
};

const INTERPRETATION_TEXT: Record<string, string> = {
  '1': 'Your approach currently leans strongly analytical and externally validated.',
  '2': 'Your approach prioritises systematic reasoning and verified frameworks.',
  '3': 'You demonstrate a predominantly analytical orientation with structured thinking.',
  '4': 'You show an inclination toward analytical reasoning with some openness to experiential insight.',
  '5': 'You demonstrate balance between analytical rigor and intuitive openness.',
  '6': 'You show openness to both structured reasoning and contemplative knowing.',
  '7': 'You demonstrate meaningful openness to contemplative and experiential modes.',
  '8': 'You demonstrate strong openness to intuitive and experiential modes of knowing.',
  '9': 'You show a primarily intuitive and contemplatively receptive orientation.',
  '10': 'You demonstrate deep contemplative orientation and experiential openness.',
};

function TakeAssessmentInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assessmentType = searchParams.get('type') || 'beginner';

  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    consent: false,
  });

  useEffect(() => {
    loadAssessment();
  }, [assessmentType]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (showContactModal) return;
      if (e.key === 'ArrowRight' && canProceed()) {
        if (currentQuestionIndex < questions.length - 1) navigateQuestion('next');
      }
      if (e.key === 'ArrowLeft' && currentQuestionIndex > 0) {
        navigateQuestion('prev');
      }
      const num = parseInt(e.key);
      if (num >= 1 && num <= 9 && questions[currentQuestionIndex]) {
        handleResponse(questions[currentQuestionIndex].id, num);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestionIndex, questions, responses, showContactModal]);

  async function loadAssessment() {
    setLoading(true);
    try {
      const res = await fetch(`/api/assessments?type=${assessmentType}`);
      if (!res.ok) throw new Error('Assessment not found');
      const data = await res.json();
      setAssessment({
        id: data.id,
        title: data.title,
        description: data.description,
        assessment_type: data.assessment_type,
      });
      setQuestions(data.questions || []);
    } catch (error) {
      console.error('Failed to load assessment:', error);
      setAssessment(null);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }

  function handleResponse(questionId: string, value: number) {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  }

  function canProceed() {
    const currentQuestion = questions[currentQuestionIndex];
    return currentQuestion && responses[currentQuestion.id] !== undefined;
  }

  function navigateQuestion(direction: 'next' | 'prev') {
    setIsTransitioning(true);
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setCurrentQuestionIndex((prev) => prev - 1);
      }
      setIsTransitioning(false);
    }, 180);
  }

  function handleNext() {
    if (currentQuestionIndex < questions.length - 1) navigateQuestion('next');
  }

  function handlePrevious() {
    if (currentQuestionIndex > 0) navigateQuestion('prev');
  }

  function canSubmitContact() {
    return contactInfo.fullName.trim() !== '' && contactInfo.email.trim() !== '' && contactInfo.consent;
  }

  async function handleFinalSubmit() {
    if (!assessment || !canSubmitContact()) return;
    setSubmitting(true);
    try {
      const dimensionScores: Record<string, { total: number; count: number }> = {};
      questions.forEach((question) => {
        const response = responses[question.id] || 0;
        if (!dimensionScores[question.dimension]) {
          dimensionScores[question.dimension] = { total: 0, count: 0 };
        }
        dimensionScores[question.dimension].total += response;
        dimensionScores[question.dimension].count += 1;
      });

      const averages: Record<string, number> = {};
      Object.keys(dimensionScores).forEach((dimension) => {
        const { total, count } = dimensionScores[dimension];
        averages[dimension] = count > 0 ? total / count : 0;
      });

      const res = await fetch('/api/assessments/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessment_id: assessment.id,
          result_json: {
            responses,
            scores: averages,
            completed_at: new Date().toISOString(),
            contact: {
              full_name: contactInfo.fullName,
              email: contactInfo.email,
              phone: contactInfo.phone || null,
            },
            session_type: 'anonymous',
          },
        }),
      });

      if (!res.ok) throw new Error('Submission failed');
      const data = await res.json();
      router.push(`/assessment/results/${data.id}`);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`There was an error submitting your assessment: ${errorMessage}. Please try again.`);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#C8A75E]/20 border-t-[#C8A75E] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[#AAB0D6]">Preparing your assessment...</p>
        </div>
      </div>
    );
  }

  if (!assessment || questions.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#AAB0D6] mb-4">Assessment not available</p>
          <Button onClick={() => router.push('/assessment')} className="bg-[#C8A75E] text-[#0B0F2A]">
            Return to Assessment Page
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(responses).length;
  const currentValue = responses[currentQuestion.id];
  const dimensionLabel = DIMENSION_LABELS[currentQuestion.dimension] || currentQuestion.dimension.replace(/_/g, ' ');
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const completedDots = Math.round((answeredCount / questions.length) * 10);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="mb-6">
          <Link href="/assessment" className="inline-flex items-center gap-2 text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Assessment
          </Link>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs tracking-[0.15em] text-[#C8A75E] uppercase mb-0.5">
                {assessment.title}
              </p>
              <p className="text-xs text-[#AAB0D6]/50">
                Use ← → keys to navigate
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#AAB0D6]">
                {answeredCount}/{questions.length} completed
              </p>
              <div className="flex items-center gap-1 mt-1 justify-end">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i < completedDots ? 'bg-[#C8A75E]' : 'bg-[#2A2F4F]/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-full bg-[#2A2F4F]/30 rounded-full h-0.5">
              <div
                className="bg-gradient-to-r from-[#C8A75E] to-[#D4B56D] h-0.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#C8A75E] border-2 border-[#0B0F2A] shadow-[0_0_8px_rgba(200,167,94,0.5)] transition-all duration-500 ease-out"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>
        </div>

        <div
          className={`transition-all duration-180 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
        >
          <div className="glass-panel rounded-2xl p-8 md:p-10 mb-6">
            <div className="grid md:grid-cols-[auto,1fr] gap-8">
              <div className="md:w-36 flex-shrink-0">
                <div className="text-5xl font-serif font-bold text-[#C8A75E]/20 leading-none mb-3">
                  {String(currentQuestionIndex + 1).padStart(2, '0')}
                </div>
                <p className="text-xs text-[#C8A75E] leading-snug">
                  {dimensionLabel}
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-serif text-[#F5F3EE] leading-relaxed mb-8">
                  {currentQuestion.question_text}
                </h2>

                <div className="space-y-5">
                  <div className="flex justify-between text-[10px] tracking-[0.1em] uppercase text-[#AAB0D6]/50 px-1">
                    <span>Analytical</span>
                    <span>Intuitive</span>
                  </div>

                  <div className="grid grid-cols-10 gap-1.5">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => {
                      const isSelected = currentValue === val;
                      return (
                        <button
                          key={val}
                          onClick={() => handleResponse(currentQuestion.id, val)}
                          className={`
                            group relative h-11 rounded-lg text-sm font-semibold transition-all duration-150 border
                            ${isSelected
                              ? 'bg-[#C8A75E] border-[#C8A75E] text-[#0B0F2A] shadow-[0_0_12px_rgba(200,167,94,0.35)] scale-105'
                              : 'bg-[#2A2F4F]/20 border-[#2A2F4F]/40 text-[#AAB0D6] hover:border-[#C8A75E]/40 hover:text-[#F5F3EE] hover:bg-[#C8A75E]/10'
                            }
                          `}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>

                  <div className="h-10 flex items-center">
                    {currentValue ? (
                      <div className="flex items-start gap-2.5">
                        <div className="w-1 h-1 rounded-full bg-[#C8A75E] mt-1.5 flex-shrink-0" />
                        <p className="text-xs text-[#AAB0D6] leading-relaxed">
                          <span className="text-[#C8A75E] font-medium">{SCALE_LABELS[currentValue]}.</span>{' '}
                          {INTERPRETATION_TEXT[String(currentValue)]}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-[#AAB0D6]/30 italic">Select a value to see your orientation mapping</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all border ${
              currentQuestionIndex === 0
                ? 'border-transparent text-[#AAB0D6]/20 cursor-not-allowed'
                : 'border-[#2A2F4F]/60 text-[#AAB0D6] hover:border-[#AAB0D6]/40 hover:text-[#F5F3EE]'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="text-xs text-[#AAB0D6]/40">
            {currentQuestionIndex + 1} / {questions.length}
          </div>

          {isLastQuestion ? (
            <button
              onClick={() => setShowContactModal(true)}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all border ${
                canProceed()
                  ? 'bg-[#C8A75E] border-[#C8A75E] text-[#0B0F2A] hover:bg-[#D4B56D]'
                  : 'bg-[#C8A75E]/20 border-[#C8A75E]/20 text-[#C8A75E]/40 cursor-not-allowed'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Complete</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all border ${
                canProceed()
                  ? 'bg-[#C8A75E] border-[#C8A75E] text-[#0B0F2A] hover:bg-[#D4B56D]'
                  : 'bg-[#C8A75E]/20 border-[#C8A75E]/20 text-[#C8A75E]/40 cursor-not-allowed'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="bg-[#0B0F2A] border-[#2A2F4F] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif text-[#F5F3EE]">
              Generate Your Developmental Profile
            </DialogTitle>
            <DialogDescription className="text-[#AAB0D6] text-sm mt-2">
              To generate your personalized {assessmentType === 'teaching' ? 'teaching readiness' : 'development'} profile,
              please provide your contact information. Your responses are encrypted and used solely for developmental mapping.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 mt-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-sm text-[#F5F3EE] flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#C8A75E]" />
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={contactInfo.fullName}
                onChange={(e) => setContactInfo({ ...contactInfo, fullName: e.target.value })}
                className="bg-[#2A2F4F]/30 border-[#2A2F4F] text-[#F5F3EE] placeholder:text-[#AAB0D6]/40 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm text-[#F5F3EE] flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C8A75E]" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                className="bg-[#2A2F4F]/30 border-[#2A2F4F] text-[#F5F3EE] placeholder:text-[#AAB0D6]/40 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-sm text-[#F5F3EE] flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C8A75E]" />
                Phone <span className="text-[#AAB0D6]/50 text-xs">(Optional)</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                className="bg-[#2A2F4F]/30 border-[#2A2F4F] text-[#F5F3EE] placeholder:text-[#AAB0D6]/40 text-sm"
              />
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#2A2F4F]/15 rounded-lg border border-[#2A2F4F]/60">
              <Checkbox
                id="consent"
                checked={contactInfo.consent}
                onCheckedChange={(checked) =>
                  setContactInfo({ ...contactInfo, consent: checked as boolean })
                }
                className="mt-0.5 border-[#C8A75E]/40 data-[state=checked]:bg-[#C8A75E] data-[state=checked]:border-[#C8A75E]"
              />
              <Label htmlFor="consent" className="text-xs text-[#AAB0D6] leading-relaxed cursor-pointer">
                I agree to receive my personalized assessment report and follow-up developmental insights via email.
              </Label>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowContactModal(false)}
                disabled={submitting}
                className="flex-1 border-[#2A2F4F] text-[#AAB0D6] hover:bg-[#2A2F4F]/30 text-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleFinalSubmit}
                disabled={!canSubmitContact() || submitting}
                className="flex-1 bg-[#C8A75E] hover:bg-[#D4B56D] text-[#0B0F2A] font-semibold text-sm"
              >
                {submitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-[#0B0F2A]/30 border-t-[#0B0F2A] rounded-full animate-spin mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Report
                    <CheckCircle className="w-3.5 h-3.5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function TakeAssessmentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#C8A75E]/20 border-t-[#C8A75E] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[#AAB0D6]">Preparing your assessment...</p>
        </div>
      </div>
    }>
      <TakeAssessmentInner />
    </Suspense>
  );
}
