'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CircleCheck as CheckCircle2, Loader as Loader2 } from 'lucide-react';

interface MentorshipProgram {
  id: string;
  title: string;
  mentor_name: string;
  program_duration_months: number;
}

interface MentorshipApplicationFormProps {
  program: MentorshipProgram;
  onClose: () => void;
  onSuccess: () => void;
}

export function MentorshipApplicationForm({ program, onClose, onSuccess }: MentorshipApplicationFormProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    background_summary: '',
    spiritual_goals: '',
    relevant_experience: '',
    why_this_program: '',
    commitment_level: '',
    availability: '',
    previous_mentorship_experience: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/mentorship-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programId: program.id,
          fullName: formData.full_name,
          email: formData.email,
          phone: formData.phone || null,
          backgroundSummary: formData.background_summary,
          spiritualGoals: formData.spiritual_goals,
          relevantExperience: formData.relevant_experience || null,
          whyThisProgram: formData.why_this_program,
          commitmentLevel: formData.commitment_level,
          availability: formData.availability,
          previousMentorshipExperience: formData.previous_mentorship_experience || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit application.');
      setSubmitted(true);
      setTimeout(() => { onSuccess(); }, 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-[#0B0F2A]/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
        <Card className="glass-panel border-[#C8A75E]/30 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-[#C8A75E]" />
          </div>
          <h2 className="text-2xl font-bold text-[#F5F3EE] mb-3">Application Submitted!</h2>
          <p className="text-[#AAB0D6] leading-relaxed">
            Thank you for applying. The mentor will review your application and may schedule an interview. You will hear from us within 5-7 business days.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#0B0F2A]/90 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto">
      <Card className="glass-panel border-white/5 p-8 max-w-3xl w-full my-8">
        <div className="mb-6">
          <h2 className="text-3xl font-serif font-bold text-[#F5F3EE] mb-2">
            Apply for {program.title}
          </h2>
          <p className="text-[#AAB0D6]">
            Mentor: {program.mentor_name} • Duration: {program.program_duration_months} months
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="full_name" className="text-[#F5F3EE]">
                Full Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="full_name"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="bg-white/5 border-white/10 text-[#F5F3EE] mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-[#F5F3EE]">
                Email <span className="text-red-400">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/5 border-white/10 text-[#F5F3EE] mt-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="text-[#F5F3EE]">
              Phone (Optional)
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-white/5 border-white/10 text-[#F5F3EE] mt-2"
            />
          </div>

          <div>
            <Label htmlFor="background_summary" className="text-[#F5F3EE]">
              Background Summary <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="background_summary"
              required
              rows={4}
              value={formData.background_summary}
              onChange={(e) => setFormData({ ...formData, background_summary: e.target.value })}
              className="bg-white/5 border-white/10 text-[#F5F3EE] mt-2"
              placeholder="Tell us about your background, education, and life path..."
            />
          </div>

          <div>
            <Label htmlFor="spiritual_goals" className="text-[#F5F3EE]">
              Spiritual Goals <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="spiritual_goals"
              required
              rows={4}
              value={formData.spiritual_goals}
              onChange={(e) => setFormData({ ...formData, spiritual_goals: e.target.value })}
              className="bg-white/5 border-white/10 text-[#F5F3EE] mt-2"
              placeholder="What do you hope to achieve through this mentorship? What are your spiritual aspirations?"
            />
          </div>

          <div>
            <Label htmlFor="why_this_program" className="text-[#F5F3EE]">
              Why This Program? <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="why_this_program"
              required
              rows={3}
              value={formData.why_this_program}
              onChange={(e) => setFormData({ ...formData, why_this_program: e.target.value })}
              className="bg-white/5 border-white/10 text-[#F5F3EE] mt-2"
              placeholder="What draws you to this particular program and mentor?"
            />
          </div>

          <div>
            <Label htmlFor="relevant_experience" className="text-[#F5F3EE]">
              Relevant Experience (Optional)
            </Label>
            <Textarea
              id="relevant_experience"
              rows={3}
              value={formData.relevant_experience}
              onChange={(e) => setFormData({ ...formData, relevant_experience: e.target.value })}
              className="bg-white/5 border-white/10 text-[#F5F3EE] mt-2"
              placeholder="Any previous spiritual practice, study, or relevant experiences..."
            />
          </div>

          <div>
            <Label htmlFor="previous_mentorship_experience" className="text-[#F5F3EE]">
              Previous Mentorship Experience (Optional)
            </Label>
            <Textarea
              id="previous_mentorship_experience"
              rows={3}
              value={formData.previous_mentorship_experience}
              onChange={(e) => setFormData({ ...formData, previous_mentorship_experience: e.target.value })}
              className="bg-white/5 border-white/10 text-[#F5F3EE] mt-2"
              placeholder="Have you worked with spiritual teachers or mentors before?"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="commitment_level" className="text-[#F5F3EE]">
                Commitment Level <span className="text-red-400">*</span>
              </Label>
              <Input
                id="commitment_level"
                required
                value={formData.commitment_level}
                onChange={(e) => setFormData({ ...formData, commitment_level: e.target.value })}
                className="bg-white/5 border-white/10 text-[#F5F3EE] mt-2"
                placeholder="e.g., fully committed, exploring, tentative"
              />
            </div>

            <div>
              <Label htmlFor="availability" className="text-[#F5F3EE]">
                Availability <span className="text-red-400">*</span>
              </Label>
              <Input
                id="availability"
                required
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="bg-white/5 border-white/10 text-[#F5F3EE] mt-2"
                placeholder="e.g., weekends, evenings, flexible"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-white/10">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="flex-1 border-white/20 text-[#AAB0D6] hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#C8A75E] text-[#0B0F2A] hover:bg-[#D4B56D]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
