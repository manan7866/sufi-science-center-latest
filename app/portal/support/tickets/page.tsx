'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { MessageSquare, LifeBuoy, Clock, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, Loader as Loader2, ChevronRight, RefreshCw } from 'lucide-react';
import { usePortalSession } from '@/hooks/use-portal-session';

interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ComponentType<{ className?: string }> }> = {
  open: { label: 'Open', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20', icon: Clock },
  in_progress: { label: 'In Progress', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20', icon: Loader2 },
  resolved: { label: 'Resolved', color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20', icon: CheckCircle2 },
  closed: { label: 'Closed', color: 'text-[#AAB0D6]/50', bg: 'bg-white/4 border-white/8', icon: CheckCircle2 },
};

const CATEGORY_LABELS: Record<string, string> = {
  general: 'General',
  membership: 'Membership',
  donation: 'Donation',
  research: 'Research',
  technical: 'Technical',
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

export default function TicketsPage() {
  const { session, loading: sessionLoading } = usePortalSession();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = useCallback(async () => {
    if (!session?.sessionToken) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/portal/tickets?sessionToken=${encodeURIComponent(session.sessionToken)}`);
      if (!res.ok) throw new Error('Failed to load tickets.');
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load tickets.');
    } finally {
      setLoading(false);
    }
  }, [session?.sessionToken]);

  useEffect(() => {
    if (!sessionLoading && session?.sessionToken) {
      fetchTickets();
    } else if (!sessionLoading) {
      setLoading(false);
    }
  }, [sessionLoading, session?.sessionToken, fetchTickets]);

  if (sessionLoading || loading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3">
        <Loader2 className="w-5 h-5 text-[#C8A75E]/40 animate-spin" />
        <span className="text-xs text-[#AAB0D6]/40">Loading tickets...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-[#C8A75E]" />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-[#F5F3EE]">Support Tickets</h1>
            <p className="text-xs text-[#AAB0D6]/50 mt-0.5">Track your support requests and correspondence</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchTickets}
            className="p-2 rounded-lg border border-white/8 text-[#AAB0D6]/40 hover:text-[#AAB0D6] hover:bg-white/4 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <Link
            href="/portal/support/create"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C8A75E]/12 border border-[#C8A75E]/25 text-[#C8A75E] text-xs font-semibold hover:bg-[#C8A75E]/18 hover:border-[#C8A75E]/40 transition-all"
          >
            <LifeBuoy className="w-3.5 h-3.5" />
            New Ticket
          </Link>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-rose-500/8 border border-rose-500/20 text-rose-400 text-sm mb-5">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {tickets.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 border border-white/5 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#C8A75E]/8 border border-[#C8A75E]/15 flex items-center justify-center mx-auto mb-5">
            <LifeBuoy className="w-6 h-6 text-[#C8A75E]/50" />
          </div>
          <h3 className="text-sm font-serif font-semibold text-[#AAB0D6] mb-2">No Support Tickets Yet</h3>
          <p className="text-xs text-[#AAB0D6]/40 leading-relaxed max-w-sm mx-auto mb-6">
            If you have a question or need assistance, our support team is here to help.
          </p>
          <Link
            href="/portal/support/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#C8A75E]/12 border border-[#C8A75E]/25 text-[#C8A75E] hover:bg-[#C8A75E]/18 hover:border-[#C8A75E]/40 transition-all"
          >
            <LifeBuoy className="w-3.5 h-3.5" />
            Submit a Request
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {tickets.map((ticket) => {
            const cfg = STATUS_CONFIG[ticket.status] || STATUS_CONFIG.open;
            const StatusIcon = cfg.icon;
            return (
              <Link
                key={ticket.id}
                href={`/portal/support/tickets/${ticket.id}`}
                className="glass-panel block rounded-xl border border-white/5 hover:border-white/10 p-4 transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-[10px] font-mono text-[#C8A75E]/50 tracking-wider">{ticket.ticketNumber}</span>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color}`}>
                        <StatusIcon className="w-2.5 h-2.5" />
                        {cfg.label}
                      </span>
                      {ticket.category && (
                        <span className="text-[10px] text-[#AAB0D6]/30">{CATEGORY_LABELS[ticket.category] || ticket.category}</span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-[#F5F3EE] truncate group-hover:text-[#C8A75E] transition-colors">
                      {ticket.subject}
                    </p>
                    <p className="text-xs text-[#AAB0D6]/40 mt-1 line-clamp-1">{ticket.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 text-right">
                    <div>
                      <p className="text-[10px] text-[#AAB0D6]/30">{timeAgo(ticket.updatedAt || ticket.createdAt)}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#AAB0D6]/20 group-hover:text-[#C8A75E]/50 transition-colors" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
