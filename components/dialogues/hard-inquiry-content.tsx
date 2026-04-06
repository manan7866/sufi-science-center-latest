'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CircleAlert as AlertCircle, BookOpen, Brain, FlaskConical, Lightbulb, Users, Calendar, FileText, Loader2 } from 'lucide-react';

export default function HardInquiryContent() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const res = await fetch('/api/dialogues/hard-inquiry');
        const data = await res.json();
        setSessions(data.sessions || []);
      } catch (error) {
        console.error('Failed to fetch sessions:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSessions();
  }, []);

  return (
    <>
      <section className="py-14 px-4 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel rounded-2xl p-8 border border-white/5">
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-xl bg-[#6B9BD1]/12 border border-[#6B9BD1]/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-[#6B9BD1]" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-serif font-semibold text-[#F5F3EE] mb-3">About Critical Inquiry</h2>
                <p className="text-sm text-[#AAB0D6] leading-relaxed mb-5">
                  Hard Inquiry sessions feature rigorous debate on contentious questions in consciousness research,
                  contemplative science, and the interface between scientific and spiritual epistemologies.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: Brain, label: 'Intellectual Rigor', sub: 'Evidence-based arguments and logical analysis' },
                    { icon: FlaskConical, label: 'Scientific Standards', sub: 'Methodological scrutiny and peer review' },
                    { icon: Lightbulb, label: 'Open Discourse', sub: 'Multiple perspectives and respectful disagreement' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-white/2 border border-white/5">
                        <Icon className="w-4 h-4 text-[#C8A75E] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-[#F5F3EE] mb-0.5">{item.label}</p>
                          <p className="text-[10px] text-[#AAB0D6]/50">{item.sub}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-10">
            <h2 className="text-[10px] tracking-[0.2em] text-[#AAB0D6]/40 uppercase">Inquiry Sessions</h2>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#C8A75E]" />
            </div>
          ) : sessions.length > 0 ? (
            <div className="space-y-6">
              {sessions.map((session: any) => {
                const date = new Date(session.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                return (
                  <div key={session.id} className="glass-panel rounded-2xl p-7 border border-white/5 hover:border-[#6B9BD1]/20 transition-all group">
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#6B9BD1]/12 border border-[#6B9BD1]/20 text-[#6B9BD1] uppercase tracking-widest font-medium">Critical Inquiry</span>
                          {session.featured && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#C8A75E]/12 border border-[#C8A75E]/20 text-[#C8A75E] uppercase tracking-widest font-medium">Featured</span>
                          )}
                          {session.transcript && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full border border-white/8 text-[#AAB0D6]/40 uppercase tracking-wider">Transcript Available</span>
                          )}
                        </div>
                        <h3 className="text-xl font-serif font-bold text-[#F5F3EE] mb-2 group-hover:text-[#C8A75E] transition-colors">
                          {session.title}
                        </h3>
                        <p className="text-sm text-[#AAB0D6]/70 leading-relaxed mb-4 max-w-2xl">
                          {session.description}
                        </p>

                        {session.participants && session.participants.length > 0 && (
                          <div className="flex items-start gap-2 mb-4">
                            <Users className="w-3.5 h-3.5 text-[#AAB0D6]/25 flex-shrink-0 mt-0.5" />
                            <div className="flex flex-wrap gap-1.5">
                              {session.participants.map((p: string, i: number) => (
                                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/3 border border-white/5 text-[#AAB0D6]/50">{p}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {session.controversial_points && session.controversial_points.length > 0 && (
                          <div className="mb-4">
                            <p className="text-[10px] tracking-[0.15em] text-[#AAB0D6]/30 uppercase mb-2">Critical Points Examined</p>
                            <ul className="space-y-1">
                              {session.controversial_points.slice(0, 3).map((point: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-[#AAB0D6]/50">
                                  <span className="text-[#6B9BD1]/40 flex-shrink-0 mt-1">·</span>
                                  {point}
                                </li>
                              ))}
                              {session.controversial_points.length > 3 && (
                                <li className="text-[10px] text-[#AAB0D6]/25 pl-4">+{session.controversial_points.length - 3} more points</li>
                              )}
                            </ul>
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-[10px] text-[#AAB0D6]/30">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            {date}
                          </span>
                          {session.citations && session.citations.length > 0 && (
                            <span className="flex items-center gap-1.5">
                              <FileText className="w-3 h-3" />
                              {session.citations.length} Citations
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <Link href={`/dialogues/hard-inquiry/${session.slug}`}>
                          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#C8A75E]/10 border border-[#C8A75E]/20 text-[#C8A75E] hover:bg-[#C8A75E]/16 hover:border-[#C8A75E]/35 transition-all whitespace-nowrap">
                            <BookOpen className="w-4 h-4" />
                            Read Transcript
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#AAB0D6]/40 text-sm">No sessions available yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
