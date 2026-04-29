'use client';

import { useState, useEffect } from 'react';
import { Mic, Calendar, CheckCircle2, Clock, AlertCircle, Video, ExternalLink, Loader2, Search } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface InterviewApplication {
  id: string;
  name: string;
  email: string;
  affiliation: string | null;
  fieldOfWork: string;
  summary: string;
  themes: string[];
  links: unknown;
  availability: unknown;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled' | 'rejected';
  adminNotes: string | null;
  scheduledAt: string | null;
  scheduledTime: string | null;
  videoLink: string | null;
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ComponentType<{ className?: string }> }> = {
  pending: { label: 'Under Review', color: 'text-[#6B9BD1]', bg: 'bg-[#6B9BD1]/10', icon: Clock },
  scheduled: { label: 'Scheduled', color: 'text-[#C8A75E]', bg: 'bg-[#C8A75E]/10', icon: Calendar },
  completed: { label: 'Completed', color: 'text-emerald-400', bg: 'bg-emerald-400/10', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'text-[#AAB0D6]/50', bg: 'bg-white/5', icon: AlertCircle },
  rejected: { label: 'Not Selected', color: 'text-red-400', bg: 'bg-red-400/10', icon: AlertCircle },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.color} ${cfg.bg} border border-current/20`}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return 'TBA';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(time: string | null | undefined): string {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const h = parseInt(hours);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

export default function InterviewApplicationsPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<InterviewApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      if (!user?.id && !user?.email) return;
      
      setLoading(true);
      try {
        const query = user?.id 
          ? `userId=${user.id}` 
          : `email=${encodeURIComponent(user?.email || '')}`;
        const res = await fetch(`/api/interview-applications?${query}`);
        const data = await res.json();
        setApplications(data.applications || []);
      } catch (err) {
        console.error('Failed to fetch applications:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, [user?.id, user?.email]);

  return (
    <div className="min-h-screen bg-[#08091A]">
      <div className="border-b border-white/5 bg-[#0A0C18]/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Mic className="w-6 h-6 text-[#C8A75E]" />
            <h1 className="text-2xl font-serif font-bold text-[#F5F3EE]">Interview Applications</h1>
          </div>
          <p className="text-[#AAB0D6]">Track your submitted interview applications</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-[#C8A75E] animate-spin" />
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Mic className="w-8 h-8 text-[#AAB0D6]/30" />
            </div>
            <h2 className="text-lg font-semibold text-[#F5F3EE] mb-2">No Applications Yet</h2>
            <p className="text-[#AAB0D6] text-sm max-w-md mx-auto">
              You haven't submitted any interview applications. Apply to be featured in our Inspiring Insight series.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => {
              const cfg = STATUS_CONFIG[app.status];
              const Icon = cfg.icon;
              return (
                <div key={app.id} className="glass-panel border border-white/8 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#C8A75E]/10 flex items-center justify-center">
                        <Mic className="w-5 h-5 text-[#C8A75E]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#F5F3EE]">{app.name}</p>
                        <p className="text-xs text-[#AAB0D6]">{app.email}</p>
                      </div>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-[10px] text-[#AAB0D6]/60 uppercase tracking-widest mb-1">Field of Work</p>
                      <p className="text-sm text-[#F5F3EE]">{app.fieldOfWork}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#AAB0D6]/60 uppercase tracking-widest mb-1">Affiliation</p>
                      <p className="text-sm text-[#F5F3EE]">{app.affiliation || 'Independent'}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-[10px] text-[#AAB0D6]/60 uppercase tracking-widest mb-1">Summary</p>
                    <p className="text-[#AAB0D6] text-sm leading-relaxed">{app.summary}</p>
                  </div>

                  {app.themes && app.themes.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {app.themes.map((theme, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-[#C8A75E]/8 border border-[#C8A75E]/15 text-[#C8A75E]">
                          {theme}
                        </span>
                      ))}
                    </div>
                  )}

                  {(Array.isArray(app.links) && app.links.length > 0) && (
                    <div className="mb-4">
                      <p className="text-[10px] text-[#AAB0D6]/60 uppercase tracking-widest mb-2">Links</p>
                      <div className="flex flex-wrap gap-2">
{(app.links as Array<{url?: string; label?: string}>).map((link, idx) => {
                          const linkUrl = (link as {url?: string}).url;
                          const linkLabel = (link as {label?: string}).label;
                          return (
                            <a
                              key={idx}
                              href={linkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#C8A75E] hover:underline"
                            >
                              {linkLabel || linkUrl}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {app.adminNotes && (
                    <div className="p-4 rounded-xl bg-[#6B9BD1]/5 border border-[#6B9BD1]/20 mb-4">
                      <p className="text-[10px] text-[#6B9BD1]/60 uppercase tracking-widest mb-2">Admin Notes</p>
                      <p className="text-sm text-[#F5F3EE]">{app.adminNotes}</p>
                    </div>
                  )}

                  {app.status === 'scheduled' && app.scheduledAt && (
                    <div className="p-4 rounded-xl bg-[#C8A75E]/5 border border-[#C8A75E]/20 mb-4">
                      <p className="text-[10px] text-[#C8A75E]/60 uppercase tracking-widest mb-2">Your Interview is Scheduled</p>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm font-semibold text-[#F5F3EE]">{formatDate(app.scheduledAt)}</p>
                          <p className="text-xs text-[#AAB0D6]">{app.scheduledTime ? formatTime(app.scheduledTime) : ''}</p>
                        </div>
                        {app.videoLink && (
                          <a
                            href={app.videoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 bg-[#C8A75E] text-[#0B0F2A] rounded-lg text-xs font-medium hover:bg-[#C8A75E]/90"
                          >
                            <Video className="w-3 h-3" />
                            Join Video Call
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {app.adminNotes && (
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <p className="text-[10px] text-[#AAB0D6]/40 uppercase tracking-widest mb-1">Notes from Reviewer</p>
                      <p className="text-xs text-[#AAB0D6]">{app.adminNotes}</p>
                    </div>
                  )}

                  <p className="text-[10px] text-[#AAB0D6]/30 mt-4">Submitted {formatDate(app.createdAt)}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}