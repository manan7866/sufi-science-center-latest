'use client';

import { useState } from 'react';
import { ObservatoryHero } from '@/components/observatory-hero';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, FileText, MessageSquare, Code, Users, Languages, CircleCheck as CheckCircle2, ChevronRight } from 'lucide-react';

const VOLUNTEER_ROLES = [
  {
    id: 'research',
    icon: BookOpen,
    title: 'Research Contributor',
    description: 'Contribute to academic research, literature reviews, and scholarly analysis',
    skills: ['Academic background', 'Research methodology', 'Critical analysis'],
    time: '5-10 hours/month',
  },
  {
    id: 'content',
    icon: FileText,
    title: 'Content Curator',
    description: 'Help develop educational content, articles, and knowledge resources',
    skills: ['Writing ability', 'Subject knowledge', 'Editorial skills'],
    time: '4-8 hours/month',
  },
  {
    id: 'dialogue',
    icon: MessageSquare,
    title: 'Dialogue Moderator',
    description: 'Facilitate online discussions and scholarly dialogue sessions',
    skills: ['Communication skills', 'Moderation experience', 'Subject familiarity'],
    time: '3-6 hours/month',
  },
  {
    id: 'technical',
    icon: Code,
    title: 'Technical Contributor',
    description: 'Support platform development, data management, and technical infrastructure',
    skills: ['Programming', 'Web development', 'Database knowledge'],
    time: '5-10 hours/month',
  },
  {
    id: 'community',
    icon: Users,
    title: 'Community Ambassador',
    description: 'Help build connections, outreach, and community engagement',
    skills: ['Communication', 'Networking', 'Cultural sensitivity'],
    time: '4-8 hours/month',
  },
  {
    id: 'translation',
    icon: Languages,
    title: 'Translation and Language',
    description: 'Translate texts, research, and resources into other languages',
    skills: ['Fluent bilingual', 'Translation experience', 'Subject knowledge'],
    time: '5-10 hours/month',
  },
];

export default function VolunteerPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState('');
  const [motivation, setMotivation] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedRoleData = VOLUNTEER_ROLES.find((r) => r.id === selectedRole);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedRole) return;
    setLoading(true);
    try {
      const res = await fetch('/api/volunteer-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleType: selectedRole,
          fullName,
          email,
          skillsText: skills,
          motivationText: motivation,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed.');
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 bg-[#0B0F2A]">
        <ObservatoryHero
          subtitle="Community"
          title="Application Received"
          description="Thank you for your interest in contributing to the Sufi Science Center."
        />
        <section className="py-24 px-4 observatory-gradient">
          <div className="max-w-2xl mx-auto">
            <Card className="p-12 glass-panel border-[rgba(255,255,255,0.08)] text-center">
              <CheckCircle2 className="h-16 w-16 text-[#C8A75E] mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-[#F5F3EE] mb-4">
                Application Under Review
              </h2>
              <p className="text-[#AAB0D6] mb-6">
                Your volunteer application has been submitted successfully. Our team will review your
                submission and contact you at {email} within 2-3 weeks.
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-[#C8A75E] to-transparent my-8" />
              <p className="text-sm text-[#AAB0D6]">
                We appreciate your commitment to supporting structured spiritual-scientific inquiry.
              </p>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-[#0B0F2A]">
      <ObservatoryHero
        subtitle="Community Engagement"
        title="Contribute to the Future of Sufi Science"
        description="Join our community of researchers, scholars, and practitioners advancing the integration of Sufi wisdom with contemporary inquiry."
      />

      <section className="py-16 px-4 observatory-gradient">
        <div className="max-w-6xl mx-auto">
          {!selectedRole ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-[#F5F3EE] mb-4">
                  Select Your Contribution Path
                </h2>
                <p className="text-[#AAB0D6] max-w-2xl mx-auto">
                  Choose the role that best aligns with your skills, interests, and capacity.
                  Each path offers a meaningful way to contribute to our mission.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {VOLUNTEER_ROLES.map((role) => {
                  const Icon = role.icon;
                  return (
                    <Card
                      key={role.id}
                      className="p-6 glass-panel border-[rgba(255,255,255,0.08)] hover:border-[#C8A75E]/50 glow-gold hover:shadow-xl transition-all cursor-pointer group"
                      onClick={() => setSelectedRole(role.id)}
                    >
                      <Icon className="h-10 w-10 text-[#C8A75E] mb-4" />
                      <h3 className="text-lg font-semibold text-[#F5F3EE] mb-2 group-hover:text-[#C8A75E] transition-colors">
                        {role.title}
                      </h3>
                      <p className="text-sm text-[#AAB0D6] mb-4">{role.description}</p>
                      <div className="space-y-2 mb-4">
                        {role.skills.map((skill, i) => (
                          <div key={i} className="text-xs text-[#AAB0D6] flex items-center gap-2">
                            <span className="h-1 w-1 bg-[#C8A75E] rounded-full"></span>
                            {skill}
                          </div>
                        ))}
                      </div>
                      <Badge variant="secondary" className="text-xs bg-[#C8A75E]/20 text-[#C8A75E] border border-[#C8A75E]/30">
                        {role.time}
                      </Badge>
                      <div className="mt-4 flex items-center text-sm text-[#C8A75E] font-medium group-hover:gap-2 transition-all">
                        Apply for this role
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Card>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="max-w-3xl mx-auto">
              <button
                onClick={() => setSelectedRole(null)}
                className="text-sm text-[#AAB0D6] hover:text-[#F5F3EE] mb-6 flex items-center gap-1 transition-colors"
              >
                ← Back to role selection
              </button>

              <Card className="p-8 glass-panel border-[rgba(255,255,255,0.08)] mb-6">
                {selectedRoleData && (
                  <div className="flex items-start gap-4">
                    <selectedRoleData.icon className="h-12 w-12 text-[#C8A75E] flex-shrink-0" />
                    <div>
                      <h2 className="text-2xl font-bold text-[#F5F3EE] mb-2">
                        {selectedRoleData.title}
                      </h2>
                      <p className="text-[#AAB0D6] mb-4">{selectedRoleData.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedRoleData.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-[#C8A75E]/20 text-[#C8A75E] border border-[#C8A75E]/30">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              <Card className="p-8 glass-panel border-[rgba(255,255,255,0.08)]">
                <h3 className="text-xl font-bold text-[#F5F3EE] mb-6">Application Form</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName" className="text-[#F5F3EE]">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-2 h-11 glass-panel border-[rgba(255,255,255,0.08)] text-[#F5F3EE]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-[#F5F3EE]">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 h-11 glass-panel border-[rgba(255,255,255,0.08)] text-[#F5F3EE]"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="skills" className="text-[#F5F3EE]">
                      Relevant Skills and Experience *
                    </Label>
                    <Textarea
                      id="skills"
                      required
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="mt-2 min-h-[120px] glass-panel border-[rgba(255,255,255,0.08)] text-[#F5F3EE] placeholder:text-[#AAB0D6]"
                      placeholder="Describe your background, skills, and relevant experience for this role..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="motivation" className="text-[#F5F3EE]">
                      Why do you want to contribute to this initiative? *
                    </Label>
                    <Textarea
                      id="motivation"
                      required
                      value={motivation}
                      onChange={(e) => setMotivation(e.target.value)}
                      className="mt-2 min-h-[150px] glass-panel border-[rgba(255,255,255,0.08)] text-[#F5F3EE] placeholder:text-[#AAB0D6]"
                      placeholder="Share your motivations, interests, and what you hope to contribute..."
                    />
                  </div>

                  <div className="bg-[#C8A75E]/10 border border-[#C8A75E]/30 rounded-lg p-4 text-sm text-[#AAB0D6]">
                    <p className="mb-2">
                      <strong className="text-[#F5F3EE]">Review Timeline:</strong> Applications are reviewed within 2-3 weeks.
                    </p>
                    <p>
                      <strong className="text-[#F5F3EE]">Next Steps:</strong> If your application aligns with current needs,
                      we will contact you to discuss next steps and onboarding.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading || !fullName || !email || !skills || !motivation}
                    className="w-full h-12 text-base bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A]"
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </form>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
