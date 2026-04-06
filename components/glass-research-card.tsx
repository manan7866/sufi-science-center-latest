import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface GlassResearchCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  href?: string;
  tag?: string;
}

export function GlassResearchCard({
  title,
  description,
  icon: Icon,
  href,
  tag,
}: GlassResearchCardProps) {
  const CardContent = (
    <div className="glass-panel rounded-xl p-6 h-full transition-all duration-300 hover:glow-gold hover:-translate-y-1 cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="w-12 h-12 rounded-lg bg-[#C8A75E]/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-[#C8A75E]" />
            </div>
          )}
          {tag && (
            <span className="text-xs font-mono text-[#C8A75E] uppercase tracking-wider">
              {tag}
            </span>
          )}
        </div>
        <ArrowRight className="w-5 h-5 text-[#AAB0D6] group-hover:text-[#C8A75E] group-hover:translate-x-1 transition-all" />
      </div>

      <h3 className="text-2xl font-semibold text-[#F5F3EE] mb-3 leading-tight">
        {title}
      </h3>

      <p className="text-[#AAB0D6] leading-relaxed">
        {description}
      </p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
