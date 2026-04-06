'use client';

import { LucideIcon } from 'lucide-react';

interface PortalMetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}

export function PortalMetricCard({ icon: Icon, label, value, sub, accent = '#C8A75E' }: PortalMetricCardProps) {
  return (
    <div className="glass-panel rounded-xl p-6 border border-white/5 flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${accent}18` }}
        >
          <Icon className="w-4 h-4" style={{ color: accent }} />
        </div>
        <span className="text-xs text-[#AAB0D6]/60 tracking-widest uppercase">{label}</span>
      </div>
      <div>
        <p className="text-lg font-serif font-semibold text-[#F5F3EE] leading-snug">{value}</p>
        {sub && <p className="text-xs text-[#AAB0D6]/50 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
