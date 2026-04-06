'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, Users, Video, MapPin, Clock } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ObservatoryHero } from '@/components/observatory-hero';

interface StudyCircle {
  id: string;
  title: string;
  slug: string;
  description: string;
  focus_text: string;
  facilitator: string;
  meeting_frequency: string;
  duration_weeks: number;
  capacity: number;
  current_enrollment: number;
  status: string;
  start_date: string;
  end_date?: string;
  meeting_format: string;
  prerequisites: string[];
  syllabus: any;
}

const statusColors: Record<string, string> = {
  open: 'bg-green-500/20 text-green-300 border-green-500/30',
  accepting: 'bg-green-500/20 text-green-300 border-green-500/30',
  waitlist: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  upcoming: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  closed: 'bg-red-500/20 text-red-300 border-red-500/30',
  completed: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
};

const formatIcons: Record<string, any> = {
  online: Video,
  in_person: MapPin,
  hybrid: Users,
};

export default function CirclesPage() {
  const [circles, setCircles] = useState<StudyCircle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCircle, setSelectedCircle] = useState<StudyCircle | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchCircles();
  }, []);

  const fetchCircles = async () => {
    try {
      const res = await fetch('/api/inner-development/circles');
      const data = await res.json();
      setCircles(data.circles || []);
    } catch (error) {
      console.error('Failed to fetch circles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCircles = filterStatus === 'all'
    ? circles
    : circles.filter(c => c.status === filterStatus);

  const spotsRemaining = (circle: StudyCircle) => circle.capacity - circle.current_enrollment;

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-6xl mx-auto px-6 text-center pt-32">
          <div className="animate-pulse text-[#AAB0D6]">Loading study circles...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Inner Development"
        title="Study Circles"
        description="Join intimate learning communities exploring classical texts with experienced facilitators. Study circles combine scholarship with practice, intellectual understanding with experiential knowing."
      />

      <div className="max-w-6xl mx-auto px-6 py-24">

        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['all', 'open', 'upcoming', 'waitlist', 'closed'].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className={filterStatus === status ? 'bg-[#C8A75E] text-[#0B0F2A]' : 'border-white/20 text-[#AAB0D6]'}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </ScrollReveal>

        {!selectedCircle ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCircles.map((circle, index) => {
              const FormatIcon = formatIcons[circle.meeting_format] || Users;

              return (
                <ScrollReveal key={circle.id} delay={index * 0.1}>
                  <Card className="glass-panel border-white/5 p-6 hover:border-[#C8A75E]/30 transition-all h-full flex flex-col">
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-serif font-bold text-[#F5F3EE] flex-1">
                          {circle.title}
                        </h3>
                        <Badge className={`${statusColors[circle.status]} text-xs ml-2 flex-shrink-0`}>
                          {circle.status}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="border-white/20 text-[#AAB0D6] text-xs">
                          <FormatIcon className="w-3 h-3 mr-1" />
                          {circle.meeting_format.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline" className="border-white/20 text-[#AAB0D6] text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {circle.meeting_frequency}
                        </Badge>
                        <Badge variant="outline" className="border-white/20 text-[#AAB0D6] text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {circle.duration_weeks} weeks
                        </Badge>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-[#C8A75E] mb-1">
                          <BookOpen className="w-3 h-3 inline mr-1" />
                          {circle.focus_text}
                        </p>
                        <p className="text-xs text-[#AAB0D6]/80">
                          Facilitator: {circle.facilitator}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-[#AAB0D6] leading-relaxed mb-4 flex-1">
                      {circle.description}
                    </p>

                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#AAB0D6]">Start Date:</span>
                        <span className="text-[#F5F3EE]">
                          {new Date(circle.start_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      {(circle.status === 'open' || circle.status === 'accepting') && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[#AAB0D6]">Spots Remaining:</span>
                          <span className="text-[#C8A75E] font-semibold">
                            {spotsRemaining(circle)} of {circle.capacity}
                          </span>
                        </div>
                      )}
                    </div>

                    <Button
                      className="mt-4 w-full bg-[#C8A75E] text-[#0B0F2A] hover:bg-[#D4B56D]"
                      onClick={() => setSelectedCircle(circle)}
                      disabled={circle.status === 'closed' || circle.status === 'completed'}
                    >
                      {circle.status === 'open' || circle.status === 'accepting' ? 'Apply Now' : 'View Details'}
                    </Button>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        ) : (
          <ScrollReveal>
            <Card className="glass-panel border-white/5 p-8 max-w-4xl mx-auto">
              <Button
                variant="ghost"
                onClick={() => setSelectedCircle(null)}
                className="mb-6 text-[#AAB0D6] hover:text-[#F5F3EE]"
              >
                ← Back to all circles
              </Button>

              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-3xl font-serif font-bold text-[#F5F3EE] flex-1">
                    {selectedCircle.title}
                  </h2>
                  <Badge className={`${statusColors[selectedCircle.status]} ml-4`}>
                    {selectedCircle.status}
                  </Badge>
                </div>

                <p className="text-xl text-[#C8A75E] mb-2">
                  {selectedCircle.focus_text}
                </p>
                <p className="text-[#AAB0D6]">
                  Facilitated by {selectedCircle.facilitator}
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-[#F5F3EE] mb-3">About This Circle</h3>
                  <p className="text-[#AAB0D6] leading-relaxed">
                    {selectedCircle.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-5 border border-white/5">
                    <h4 className="text-lg font-semibold text-[#F5F3EE] mb-3">Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#AAB0D6]">Format:</span>
                        <span className="text-[#F5F3EE] capitalize">{selectedCircle.meeting_format.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#AAB0D6]">Frequency:</span>
                        <span className="text-[#F5F3EE] capitalize">{selectedCircle.meeting_frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#AAB0D6]">Duration:</span>
                        <span className="text-[#F5F3EE]">{selectedCircle.duration_weeks} weeks</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#AAB0D6]">Start Date:</span>
                        <span className="text-[#F5F3EE]">
                          {new Date(selectedCircle.start_date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      {(selectedCircle.status === 'open' || selectedCircle.status === 'accepting') && (
                        <div className="flex justify-between pt-2 border-t border-white/10">
                          <span className="text-[#AAB0D6]">Spots Available:</span>
                          <span className="text-[#C8A75E] font-semibold">
                            {spotsRemaining(selectedCircle)} of {selectedCircle.capacity}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedCircle.prerequisites.length > 0 && (
                    <div className="bg-white/5 rounded-lg p-5 border border-white/5">
                      <h4 className="text-lg font-semibold text-[#F5F3EE] mb-3">Prerequisites</h4>
                      <ul className="space-y-2">
                        {selectedCircle.prerequisites.map((prereq, i) => (
                          <li key={i} className="text-sm text-[#AAB0D6] flex items-start gap-2">
                            <span className="text-[#C8A75E] mt-0.5">•</span>
                            <span>{prereq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {selectedCircle.syllabus && Object.keys(selectedCircle.syllabus).length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-[#F5F3EE] mb-4">Syllabus</h3>
                    <div className="bg-gradient-to-br from-[#C8A75E]/10 to-transparent rounded-lg p-6 border border-[#C8A75E]/20">
                      <div className="space-y-3">
                        {Object.entries(selectedCircle.syllabus).map(([key, value], i) => (
                          <div key={i} className="flex gap-3">
                            <span className="text-[#C8A75E] font-semibold text-sm mt-0.5">
                              {key.replace('week', 'Week ').replace('session', 'Session ')}:
                            </span>
                            <span className="text-[#AAB0D6] text-sm flex-1">{value as string}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {(selectedCircle.status === 'open' || selectedCircle.status === 'accepting') && (
                  <div className="pt-6 border-t border-white/10">
                    <Button className="w-full bg-[#C8A75E] text-[#0B0F2A] hover:bg-[#D4B56D] py-6 text-lg">
                      Apply for This Circle
                    </Button>
                    <p className="text-xs text-[#AAB0D6] text-center mt-3">
                      You will receive an email with next steps after submitting your application
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
