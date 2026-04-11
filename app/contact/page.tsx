'use client';

import { useState } from 'react';
import { ObservatoryHero } from '@/components/observatory-hero';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, Users, Building2, Loader2 } from 'lucide-react';

const ENQUIRY_TYPES = [
  { value: 'general', label: 'General Enquiry' },
  { value: 'research', label: 'Research Collaboration' },
  { value: 'media', label: 'Media and Press' },
  { value: 'membership', label: 'Membership and Fellowship' },
  { value: 'events', label: 'Events and Dialogues' },
  { value: 'other', label: 'Other' },
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [enquiryType, setEnquiryType] = useState('general');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name,
          email,
          enquiryType,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to send message');
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Get In Touch"
        title="Contact"
        description="Reach out to the Sufi Science Center for research enquiries, collaboration proposals, media requests, or general questions."
      />

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-5">
              <div className="glass-panel rounded-2xl p-6 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-[#C8A75E]" />
                </div>
                <h3 className="text-sm font-semibold text-[#F5F3EE] mb-1">Email</h3>
                <p className="text-xs text-[#AAB0D6]/60 mb-2">General enquiries</p>
                <p className="text-sm text-[#C8A75E]">contact@sufisciencecenter.org</p>
              </div>

              <div className="glass-panel rounded-2xl p-6 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5 text-[#C8A75E]" />
                </div>
                <h3 className="text-sm font-semibold text-[#F5F3EE] mb-1">Research Office</h3>
                <p className="text-xs text-[#AAB0D6]/60 mb-2">Collaboration and funding</p>
                <p className="text-sm text-[#C8A75E]">research@sufisciencecenter.org</p>
              </div>

              <div className="glass-panel rounded-2xl p-6 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5 text-[#C8A75E]" />
                </div>
                <h3 className="text-sm font-semibold text-[#F5F3EE] mb-1">Location</h3>
                <p className="text-xs text-[#AAB0D6]/60 mb-2">An initiative of Dr. Kumar Foundation USA</p>
                <p className="text-sm text-[#AAB0D6]/70">United States of America</p>
              </div>

              <div className="glass-panel rounded-2xl p-6 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-[#C8A75E]" />
                </div>
                <h3 className="text-sm font-semibold text-[#F5F3EE] mb-2">Other Channels</h3>
                <ul className="space-y-1.5 text-xs text-[#AAB0D6]/60">
                  <li>Research collaborations: <span className="text-[#C8A75E]/80">use the Collaborations page</span></li>
                  <li>Membership enquiries: <span className="text-[#C8A75E]/80">use the Membership page</span></li>
                  <li>Media press kit: <span className="text-[#C8A75E]/80">media@sufisciencecenter.org</span></li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2">
              {submitted ? (
                <div className="glass-panel rounded-2xl p-12 border border-[#C8A75E]/15 text-center h-full flex flex-col items-center justify-center">
                  <CheckCircle2 className="w-16 h-16 text-[#C8A75E] mb-6" />
                  <h2 className="text-2xl font-serif font-bold text-[#F5F3EE] mb-3">
                    Message Received
                  </h2>
                  <p className="text-[#AAB0D6]/70 max-w-sm">
                    Thank you for reaching out. A member of our team will respond to your enquiry
                    within 3–5 business days.
                  </p>
                </div>
              ) : (
                <div className="glass-panel rounded-2xl p-8 border border-white/5">
                  <div className="flex items-center gap-3 mb-7">
                    <MessageSquare className="w-5 h-5 text-[#C8A75E]" />
                    <h2 className="text-xl font-serif font-bold text-[#F5F3EE]">Send a Message</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-400">
                        {error}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-[#AAB0D6]/70 mb-2 tracking-wide uppercase">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20 transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#AAB0D6]/70 mb-2 tracking-wide uppercase">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20 transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#AAB0D6]/70 mb-2 tracking-wide uppercase">
                        Enquiry Type
                      </label>
                      <select
                        value={enquiryType}
                        onChange={(e) => setEnquiryType(e.target.value)}
                        className="w-full bg-[#141A3A] text-[#F5F7FA] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20 transition-all"
                      >
                        {ENQUIRY_TYPES.map((t) => (
                          <option key={t.value} value={t.value} className="bg-[#0B0F2A]">
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#AAB0D6]/70 mb-2 tracking-wide uppercase">
                        Subject *
                      </label>
                      <input
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20 transition-all"
                        placeholder="Subject of your message"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#AAB0D6]/70 mb-2 tracking-wide uppercase">
                        Message *
                      </label>
                      <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={6}
                        className="w-full bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30 shadow-inner shadow-black/20 transition-all resize-none"
                        placeholder="Please describe your enquiry in detail..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !name || !email || !subject || !message}
                      className="flex items-center gap-2 text-sm font-semibold text-[#0B0F2A] bg-[#C8A75E] px-6 py-3 rounded-lg hover:bg-[#C8A75E]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
