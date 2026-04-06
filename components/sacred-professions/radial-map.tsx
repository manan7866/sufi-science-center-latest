'use client';

import { useState } from 'react';
import type { ProfessionGroup, Profession } from '@/lib/sacred-professions-data';

interface Props {
  groups: ProfessionGroup[];
  onSelect: (profession: Profession, group: ProfessionGroup) => void;
}

export function RadialMap({ groups, onSelect }: Props) {
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const [hoveredProf, setHoveredProf] = useState<string | null>(null);

  const cx = 400;
  const cy = 380;
  const innerR = 70;
  const groupR = 180;
  const profR = 285;
  const totalGroups = groups.length;

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="w-full max-w-[800px] relative">
        <svg
          viewBox="0 0 800 760"
          className="w-full"
          style={{ overflow: 'visible' }}
        >
          {/* Ambient rings */}
          {[innerR + 20, groupR + 15, profR + 20].map((r, i) => (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke="rgba(200,167,94,0.06)"
              strokeWidth="1"
              strokeDasharray="3 6"
            />
          ))}

          {/* Radial spokes */}
          {groups.map((_, gi) => {
            const angle = (gi / totalGroups) * Math.PI * 2 - Math.PI / 2;
            return (
              <line
                key={gi}
                x1={cx + innerR * Math.cos(angle)}
                y1={cy + innerR * Math.sin(angle)}
                x2={cx + (profR + 30) * Math.cos(angle)}
                y2={cy + (profR + 30) * Math.sin(angle)}
                stroke="rgba(200,167,94,0.05)"
                strokeWidth="1"
              />
            );
          })}

          {/* Group nodes */}
          {groups.map((group, gi) => {
            const angle = (gi / totalGroups) * Math.PI * 2 - Math.PI / 2;
            const gx = cx + groupR * Math.cos(angle);
            const gy = cy + groupR * Math.sin(angle);
            const isHovered = hoveredGroup === group.id;

            return (
              <g key={group.id}>
                {/* Connection from center */}
                <line
                  x1={cx} y1={cy}
                  x2={gx} y2={gy}
                  stroke={isHovered ? `${group.color}40` : 'rgba(255,255,255,0.04)'}
                  strokeWidth={isHovered ? 1.5 : 0.5}
                  className="transition-all duration-300"
                />

                {/* Group profession sub-nodes */}
                {group.professions.map((prof, pi) => {
                  const totalInGroup = group.professions.length;
                  const spread = Math.min(0.35, 0.6 / totalInGroup);
                  const profAngle = angle + (pi - (totalInGroup - 1) / 2) * spread;
                  const px = cx + profR * Math.cos(profAngle);
                  const py = cy + profR * Math.sin(profAngle);
                  const isProfHovered = hoveredProf === prof.id;

                  return (
                    <g key={prof.id}>
                      <line
                        x1={gx} y1={gy}
                        x2={px} y2={py}
                        stroke={isHovered ? `${group.color}30` : 'rgba(255,255,255,0.03)'}
                        strokeWidth="0.5"
                        className="transition-all duration-300"
                      />
                      <circle
                        cx={px} cy={py}
                        r={isProfHovered ? 7 : 4}
                        fill={isProfHovered ? group.color : `${group.color}50`}
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => { setHoveredProf(prof.id); setHoveredGroup(group.id); }}
                        onMouseLeave={() => { setHoveredProf(null); setHoveredGroup(null); }}
                        onClick={() => onSelect(prof, group)}
                      />
                      {isProfHovered && (
                        <text
                          x={px} y={py - 12}
                          textAnchor="middle"
                          fill="#F5F3EE"
                          fontSize="9"
                          fontWeight="600"
                          className="pointer-events-none select-none"
                        >
                          {prof.title}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Group circle */}
                <circle
                  cx={gx} cy={gy}
                  r={isHovered ? 18 : 14}
                  fill={isHovered ? `${group.color}25` : `${group.color}12`}
                  stroke={isHovered ? group.color : `${group.color}40`}
                  strokeWidth={isHovered ? 1.5 : 1}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredGroup(group.id)}
                  onMouseLeave={() => setHoveredGroup(null)}
                />

                {/* Group label */}
                {(() => {
                  const labelAngle = angle;
                  const labelR = groupR + (isHovered ? 32 : 26);
                  const lx = cx + labelR * Math.cos(labelAngle);
                  const ly = cy + labelR * Math.sin(labelAngle);
                  const anchor = Math.abs(Math.cos(labelAngle)) < 0.2
                    ? 'middle'
                    : Math.cos(labelAngle) > 0
                    ? 'start'
                    : 'end';
                  const words = group.label.split(' ');
                  return (
                    <text
                      x={lx} y={ly}
                      textAnchor={anchor}
                      fill={isHovered ? group.color : '#AAB0D6'}
                      fontSize="8.5"
                      fontWeight={isHovered ? '700' : '500'}
                      className="pointer-events-none select-none transition-all duration-200"
                    >
                      {words.map((w, wi) => (
                        <tspan key={wi} x={lx} dy={wi === 0 ? 0 : 10}>{w}</tspan>
                      ))}
                    </text>
                  );
                })()}
              </g>
            );
          })}

          {/* Center node */}
          <circle cx={cx} cy={cy} r={innerR} fill="rgba(200,167,94,0.04)" stroke="rgba(200,167,94,0.15)" strokeWidth="1" />
          <circle cx={cx} cy={cy} r={innerR - 15} fill="rgba(200,167,94,0.03)" stroke="rgba(200,167,94,0.08)" strokeWidth="0.5" />
          <text x={cx} y={cy - 8} textAnchor="middle" fill="#C8A75E" fontSize="11" fontWeight="700" className="select-none">Sacred</text>
          <text x={cx} y={cy + 6} textAnchor="middle" fill="#C8A75E" fontSize="11" fontWeight="700" className="select-none">Trust</text>
          <text x={cx} y={cy + 22} textAnchor="middle" fill="rgba(200,167,94,0.45)" fontSize="8" className="select-none">
            {groups.reduce((n, g) => n + g.professions.length, 0)} roles
          </text>
        </svg>
      </div>

      <p className="text-[11px] text-[#AAB0D6]/30 text-center mt-2">
        Hover domain nodes to explore — click profession dots to open detail
      </p>
    </div>
  );
}
