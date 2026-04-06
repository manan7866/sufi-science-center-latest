'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CircleCheck as CheckCircle2, Loader as Loader2 } from 'lucide-react';

interface GuidancePathway {
  id: string;
  title: string;
  description: string;
  target_audience: string;
  duration_weeks: number;
}

interface PathwayApplicationFormProps {
  pathway: GuidancePathway;
  onClose: () => void;
  onSuccess: () => void;
}

export function PathwayApplicationForm({ pathway, onClose, onSuccess }: PathwayApplicationFormProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    motivation: '',
    spiritual_experience: '',
    current_practices: '',
    available_time_weekly: '',
    preferred_start_date: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/pathway-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pathwayId: pathway.id,
          fullName: formData.full_name,
          email: formData.email,
          phone: formData.phone || null,
          motivation: formData.motivation,
          spiritualExperience: formData.spiritual_experience || null,
          currentPractices: formData.current_practices || null,
          availableTimeWeekly: formData.available_time_weekly,
          preferredStartDate: formData.preferred_start_date || null,
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
            Thank you for your interest. We will review your application and contact you within 3-5 business days.
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
            Apply for {pathway.title}
          </h2>
          <p className="text-[#AAB0D6]">
            Duration: {pathway.duration_weeks} weeks
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
            <Label htmlFor="motivation" className="text-[#F5F3EE]">
              Why are you interested in this pathway? <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="motivation"
              required
              rows={4}
              value={formData.motivation}
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
              className="bg-white/5 border-white/10 text-[#F5F3EE] mt-2"
              placeholder="Share your intentions and what draws you to this pathway..."
            />
          </div>

          <div>
            <Label htmlFor="spiritual_experience" className="text-[#F5F3EE]">
              Previous Spiritual Experience (Optional)
            </Label>
            <Textarea
              id="spiritual_experience"
              rows={3}
              value={formData.spiritual_experience}
              onChange={(e) => setFormData({ ...formData, spiritual_experience: e.target.value })}
              className="bg-white/5 border-white/10 text-[#F5F3EE] mt-2"
              placeholder="Any previous practice, study, or experiences relevant to this path..."
            />
          </div>

          <div>
            <Label htmlFor="current_practices" className="text-[#F5F3EE]">
              Current Spiritual Practices (Optional)
            </Label>
            <Textarea
              id="current_practices"
              rows={3}
              value={formData.current_practices}
              onChange={(e) => setFormData({ ...formData, current_practices: e.target.value })}
              className="bg-white/5 border-white/10 text-[#F5F3EE] mt-2"
              placeholder="What practices do you currently engage in, if any..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="available_time_weekly" className="text-[#F5F3EE]">
                Weekly Time Commitment <span className="text-red-400">*</span>
              </Label>
              <Input
                id="available_time_weekly"
                required
                value={formData.available_time_weekly}
                onChange={(e) => setFormData({ ...formData, available_time_weekly: e.target.value })}
                className="bg-white/5 border-white/10 text-[#F5F3EE] mt-2"
                placeholder="e.g., 5-7 hours per week"
              />
            </div>

            <div>
              <Label htmlFor="preferred_start_date" className="text-[#F5F3EE]">
                Preferred Start Date (Optional)
              </Label>
              <Input
                id="preferred_start_date"
                type="date"
                value={formData.preferred_start_date}
                onChange={(e) => setFormData({ ...formData, preferred_start_date: e.target.value })}
                className="bg-white/5 border-white/10 text-[#F5F3EE] mt-2"
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
