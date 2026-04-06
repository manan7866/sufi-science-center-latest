'use client';

import { ActivityEvent } from '@/hooks/use-portal-session';
import { BookOpen, Brain, PenLine, Users, ArrowRight, Scroll } from 'lucide-react';

const EVENT_ICONS: Record<string, React.ElementType> = {
  viewed_surah: BookOpen,
  completed_assessment: Brain,
  wrote_reflection: PenLine,
  started_module: Scroll,
  joined_circle: Users,
};

const EVENT_COLORS: Record<string, string> = {
  viewed_surah: '#C8A75E',
  completed_assessment: '#6B9BD1',
  wrote_reflection: '#27AE60',
  started_module: '#C8A75E',
  joined_circle: '#AAB0D6',
};

function formatRelative(dateStr: string): string {
  const now = new Date();
  const then = new Date(dateStr);
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return then.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

interface ActivityTimelineProps {
  events: ActivityEvent[];
}

export function ActivityTimeline({ events }: ActivityTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-[#AAB0D6]/50">No activity recorded yet.</p>
        <p className="text-xs text-[#AAB0D6]/30 mt-1">Explore a Surah or take an assessment to begin.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#C8A75E]/30 via-[#C8A75E]/10 to-transparent" />
      <div className="space-y-4">
        {events.map((event) => {
          const Icon = EVENT_ICONS[event.eventType] || ArrowRight;
          const color = EVENT_COLORS[event.eventType] || '#AAB0D6';
          return (
            <div key={event.id} className="flex items-start gap-4 pl-2">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 relative z-10"
                style={{ background: `${color}20`, border: `1px solid ${color}40` }}
              >
                <Icon className="w-2.5 h-2.5" style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#F5F3EE] leading-snug">{event.eventLabel}</p>
                <p className="text-xs text-[#AAB0D6]/40 mt-0.5">{formatRelative(event.occurredAt)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
