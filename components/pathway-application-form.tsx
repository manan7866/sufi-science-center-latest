'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CircleCheck as CheckCircle2, Loader as Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

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

interface FormErrors {
  fullName?: string;
  email?: string;
  motivation?: string;
  availableTimeWeekly?: string;
}

export function PathwayApplicationForm({ pathway, onClose, onSuccess }: PathwayApplicationFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    motivation: '',
    spiritualExperience: '',
    currentPractices: '',
    availableTimeWeekly: '',
    preferredStartDate: '',
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.motivation.trim()) {
      newErrors.motivation = 'Motivation is required';
    } else if (formData.motivation.trim().length < 50) {
      newErrors.motivation = 'Motivation must be at least 50 characters';
    }

    if (!formData.availableTimeWeekly.trim()) {
      newErrors.availableTimeWeekly = 'Weekly time commitment is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/pathway-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pathwayId: pathway.id,
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim() || null,
          motivation: formData.motivation.trim(),
          spiritualExperience: formData.spiritualExperience.trim() || null,
          currentPractices: formData.currentPractices.trim() || null,
          availableTimeWeekly: formData.availableTimeWeekly.trim(),
          preferredStartDate: formData.preferredStartDate || null,
        }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        if (data.details) {
          const fieldErrors: FormErrors = {};
          data.details.forEach((err: { field: string; message: string }) => {
            if (err.field) {
              const field = err.field.split('.').pop() as keyof FormErrors;
              fieldErrors[field] = err.message;
            }
          });
          setErrors(fieldErrors);
        } else {
          setServerError(data.error || 'Failed to submit application.');
        }
        return;
      }
      
      setSubmitted(true);
      setTimeout(() => { onSuccess(); }, 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
      setServerError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: undefined });
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
    <div className="fixed inset-0 bg-[#0B0F2A]/90 backdrop-blur-sm z-50 flex items-start py-10 justify-center p-6 overflow-y-auto">
      <Card className="glass-panel border-white/5 p-8 max-w-3xl w-full my-8">
        <div className="mb-6">
          <h2 className="text-3xl font-serif font-bold text-[#F5F3EE] mb-2">
            Apply for {pathway.title}
          </h2>
          <p className="text-[#AAB0D6]">
            Duration: {pathway.duration_weeks} weeks
          </p>
        </div>

        {serverError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName" className="text-[#F5F3EE]">
                Full Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                className={`bg-white/5 border-white/10 text-[#F5F3EE] mt-2 ${errors.fullName ? 'border-red-500' : ''}`}
              />
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-[#F5F3EE]">
                Email <span className="text-red-400">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className={`bg-white/5 border-white/10 text-[#F5F3EE] mt-2 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
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
              onChange={(e) => updateField('phone', e.target.value)}
              className="bg-white/5 border-white/10 text-[#F5F3EE] mt-2"
            />
          </div>

          <div>
            <Label htmlFor="motivation" className="text-[#F5F3EE]">
              Why are you interested in this pathway? <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="motivation"
              rows={4}
              value={formData.motivation}
              onChange={(e) => updateField('motivation', e.target.value)}
              className={`bg-white/5 border-white/10 text-[#F5F3EE] mt-2 ${errors.motivation ? 'border-red-500' : ''}`}
              placeholder="Share your intentions and what draws you to this pathway..."
            />
            {errors.motivation && (
              <p className="text-red-400 text-xs mt-1">{errors.motivation}</p>
            )}
            <p className="text-[#AAB0D6]/50 text-xs mt-1">
              Minimum 50 characters ({formData.motivation.trim().length}/50)
            </p>
          </div>

          <div>
            <Label htmlFor="spiritualExperience" className="text-[#F5F3EE]">
              Previous Spiritual Experience (Optional)
            </Label>
            <Textarea
              id="spiritualExperience"
              rows={3}
              value={formData.spiritualExperience}
              onChange={(e) => updateField('spiritualExperience', e.target.value)}
              className="bg-white/5 border-white/10 text-[#F5F3EE] mt-2"
              placeholder="Any previous practice, study, or experiences relevant to this path..."
            />
          </div>

          <div>
            <Label htmlFor="currentPractices" className="text-[#F5F3EE]">
              Current Spiritual Practices (Optional)
            </Label>
            <Textarea
              id="currentPractices"
              rows={3}
              value={formData.currentPractices}
              onChange={(e) => updateField('currentPractices', e.target.value)}
              className="bg-white/5 border-white/10 text-[#F5F3EE] mt-2"
              placeholder="What practices do you currently engage in, if any..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="availableTimeWeekly" className="text-[#F5F3EE]">
                Weekly Time Commitment <span className="text-red-400">*</span>
              </Label>
              <Input
                id="availableTimeWeekly"
                value={formData.availableTimeWeekly}
                onChange={(e) => updateField('availableTimeWeekly', e.target.value)}
                className={`bg-white/5 border-white/10 text-[#F5F3EE] mt-2 ${errors.availableTimeWeekly ? 'border-red-500' : ''}`}
                placeholder="e.g., 5-7 hours per week"
              />
              {errors.availableTimeWeekly && (
                <p className="text-red-400 text-xs mt-1">{errors.availableTimeWeekly}</p>
              )}
            </div>

            <div>
              <Label htmlFor="preferredStartDate" className="text-[#F5F3EE]">
                Preferred Start Date (Optional)
              </Label>
              <Input
                id="preferredStartDate"
                type="date"
                value={formData.preferredStartDate}
                onChange={(e) => updateField('preferredStartDate', e.target.value)}
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