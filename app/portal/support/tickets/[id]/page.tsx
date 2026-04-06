'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, Clock, CircleCheck as CheckCircle2, Loader as Loader2, CircleAlert as AlertCircle, Send, User, ShieldCheck } from 'lucide-react';
import { usePortalSession } from '@/hooks/use-portal-session';

interface Reply {
  id: string;
  authorType: 'admin' | 'user';
  body: string;
  createdAt: string;
}

interface TicketDetail {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  replies: Reply[];
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ComponentType<{ className?: string }> }> = {
  open: { label: 'Open', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20', icon: Clock },
  in_progress: { label: 'In Progress', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20', icon: Loader2 },
  resolved: { label: 'Resolved', color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20', icon: CheckCircle2 },
  closed: { label: 'Closed', color: 'text-[#AAB0D6]/50', bg: 'bg-white/4 border-white/8', icon: CheckCircle2 },
};

const CATEGORY_LABELS: Record<string, string> = {
  general: 'General Inquiry',
  membership: 'Membership & Access',
  donation: 'Donation & Payment',
  research: 'Research & Collaboration',
  technical: 'Technical Issue',
  other: 'Other',
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { session, loading: sessionLoading } = usePortalSession();
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const fetchTicket = useCallback(async () => {
    if (!session?.sessionToken || !id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/portal/tickets?sessionToken=${encodeURIComponent(session.sessionToken)}&id=${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error('Ticket not found or access denied.');
      const data = await res.json();
      if (!data.ticket) throw new Error('Ticket not found.');
      setTicket(data.ticket);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load ticket.');
    } finally {
      setLoading(false);
    }
  }, [session?.sessionToken, id]);

  useEffect(() => {
    if (!sessionLoading && session?.sessionToken) {
      fetchTicket();
    } else if (!sessionLoading) {
      setLoading(false);
    }
  }, [sessionLoading, session?.sessionToken, fetchTicket]);

  async function handleSendReply() {
    if (!replyText.trim() || !ticket || !session?.sessionToken) return;
    setSending(true);
    setSendError(null);
    try {
      const res = await fetch('/api/portal/tickets', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionToken: session.sessionToken,
          ticketId: ticket.id,
          body: replyText.trim(),
        }),
      });
      if (!res.ok) throw new Error('Failed to send reply.');

      setTicket((prev) => prev ? {
        ...prev,
        replies: [
          ...prev.replies,
          {
            id: crypto.randomUUID(),
            authorType: 'user',
            body: replyText.trim(),
            createdAt: new Date().toISOString(),
          },
        ],
      } : prev);
      setReplyText('');
    } catch (err: unknown) {
      setSendError(err instanceof Error ? err.message : 'Failed to send reply.');
    } finally {
      setSending(false);
    }
  }

  if (sessionLoading || loading) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 flex flex-col items-center gap-3">
        <Loader2 className="w-6 h-6 text-[#C8A75E]/50 animate-spin" />
        <p className="text-xs text-[#AAB0D6]/40">Loading ticket...</p>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <Link href="/portal/support/tickets" className="inline-flex items-center gap-2 text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors text-sm mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Tickets
        </Link>
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-rose-500/8 border border-rose-500/20 text-rose-400 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error || 'Ticket not found.'}</span>
        </div>
      </div>
    );
  }

  const statusCfg = STATUS_CONFIG[ticket.status] || STATUS_CONFIG.open;
  const StatusIcon = statusCfg.icon;
  const isClosed = ticket.status === 'resolved' || ticket.status === 'closed';

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Link href="/portal/support/tickets" className="inline-flex items-center gap-2 text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to Tickets
        </Link>
      </div>

      <div className="glass-panel border border-white/8 rounded-2xl p-6 mb-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[10px] font-mono text-[#C8A75E]/60 tracking-wider">{ticket.ticketNumber}</span>
              <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusCfg.bg} ${statusCfg.color}`}>
                <StatusIcon className="w-2.5 h-2.5" />
                {statusCfg.label}
              </span>
              <span className="text-[10px] text-[#AAB0D6]/40">{CATEGORY_LABELS[ticket.category] || ticket.category}</span>
            </div>
            <h1 className="text-lg font-bold text-[#F5F3EE] font-serif">{ticket.subject}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[10px] text-[#AAB0D6]/30 mb-5">
          <span>Submitted {formatDate(ticket.createdAt)}</span>
          {ticket.updatedAt !== ticket.createdAt && (
            <span>· Updated {timeAgo(ticket.updatedAt)}</span>
          )}
        </div>

        <div className="bg-[#0A0C14]/60 rounded-xl p-4 border border-white/5">
          <p className="text-xs text-[#AAB0D6]/40 uppercase tracking-widest mb-2">Original Message</p>
          <p className="text-sm text-[#AAB0D6] leading-relaxed whitespace-pre-wrap">{ticket.description}</p>
        </div>
      </div>

      {ticket.replies.length > 0 && (
        <div className="space-y-3 mb-5">
          <p className="text-[10px] tracking-[0.15em] text-[#AAB0D6]/30 uppercase px-1">
            Conversation ({ticket.replies.length} {ticket.replies.length === 1 ? 'reply' : 'replies'})
          </p>
          {ticket.replies.map((reply) => {
            const isAdmin = reply.authorType === 'admin';
            return (
              <div
                key={reply.id}
                className={`glass-panel rounded-xl p-4 border ${
                  isAdmin ? 'border-[#C8A75E]/15 bg-[#C8A75E]/4' : 'border-white/5'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isAdmin ? 'bg-[#C8A75E]/15' : 'bg-white/8'
                  }`}>
                    {isAdmin
                      ? <ShieldCheck className="w-3.5 h-3.5 text-[#C8A75E]" />
                      : <User className="w-3.5 h-3.5 text-[#AAB0D6]/50" />
                    }
                  </div>
                  <span className={`text-xs font-semibold ${isAdmin ? 'text-[#C8A75E]' : 'text-[#AAB0D6]'}`}>
                    {isAdmin ? 'SSC Support Team' : 'You'}
                  </span>
                  <span className="text-[10px] text-[#AAB0D6]/25 ml-auto">{timeAgo(reply.createdAt)}</span>
                </div>
                <p className="text-sm text-[#AAB0D6] leading-relaxed whitespace-pre-wrap pl-8">{reply.body}</p>
              </div>
            );
          })}
        </div>
      )}

      {!isClosed && (
        <div className="glass-panel border border-white/8 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-4 h-4 text-[#C8A75E]/50" />
            <p className="text-xs font-semibold text-[#AAB0D6] uppercase tracking-widest">Add a Reply</p>
          </div>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={4}
            placeholder="Add additional information or follow-up to your ticket..."
            className="w-full px-4 py-3 rounded-xl bg-[#0A0C14]/80 border border-white/8 text-[#F5F3EE] text-sm placeholder:text-[#AAB0D6]/25 focus:outline-none focus:border-[#C8A75E]/40 focus:ring-1 focus:ring-[#C8A75E]/20 transition-all resize-none leading-relaxed mb-3"
          />
          {sendError && (
            <div className="flex items-start gap-2 text-rose-400 text-xs mb-3">
              <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>{sendError}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-[#AAB0D6]/25">Replies are reviewed by the SSC team.</p>
            <button
              onClick={handleSendReply}
              disabled={sending || !replyText.trim()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C8A75E]/12 border border-[#C8A75E]/25 text-[#C8A75E] text-xs font-semibold hover:bg-[#C8A75E]/18 hover:border-[#C8A75E]/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {sending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              {sending ? 'Sending...' : 'Send Reply'}
            </button>
          </div>
        </div>
      )}

      {isClosed && (
        <div className="glass-panel border border-emerald-500/15 rounded-2xl p-4 text-center">
          <CheckCircle2 className="w-5 h-5 text-emerald-400/60 mx-auto mb-2" />
          <p className="text-xs text-[#AAB0D6]/50">
            This ticket is {ticket.status}. If you need further assistance, please{' '}
            <Link href="/portal/support/create" className="text-[#C8A75E] hover:underline">create a new ticket</Link>.
          </p>
        </div>
      )}
    </div>
  );
}
