'use client';

import { ObservatoryHero } from '@/components/observatory-hero';
import { ScrollReveal } from '@/components/scroll-reveal';
import Link from 'next/link';
import {
  Brain,
  Target,
  Heart,
  Compass,
  BookOpen,
  Users,
  Layers,
  Award,
  Link2,
  ArrowRight,
} from 'lucide-react';

const LAYERS = [
  {
    id: 'practice',
    label: 'Practice Layer',
    subtitle: 'The foundational disciplines of inner work',
    accent: '#C8A75E',
    items: [
      {
        icon: Brain,
        title: 'Consciousness Practices',
        description:
          'Guided meditation, contemplation, and awareness training methods developed over centuries and validated by modern research.',
        href: '/inner-development/practices',
      },
      {
        icon: Layers,
        title: 'Wazeefia',
        description:
          'Disciplined contemplative exercises grounded in ethical intention, cognitive awareness, and structured developmental progression.',
        href: '/inner-development/wazeefia',
      },
      {
        icon: Heart,
        title: 'Emotional Intelligence',
        description:
          'Cultivate deep emotional awareness and regulation through Sufi heart practices integrating classical and contemporary frameworks.',
        href: '/inner-development/emotional',
      },
    ],
  },
  {
    id: 'developmental',
    label: 'Developmental Path Layer',
    subtitle: 'Structured stages of personal and spiritual maturation',
    accent: '#7BAFD4',
    items: [
      {
        icon: Target,
        title: 'Transformation Stages',
        description:
          'Understand your journey through documented stages of spiritual and psychological development — mapped against classical Sufi frameworks.',
        href: '/inner-development/stages',
      },
      {
        icon: Award,
        title: 'Master Seeker',
        description:
          'Defines maturity, intellectual humility, and disciplined participation within advanced stages of inner development.',
        href: '/inner-development/master-seeker',
      },
      {
        icon: Link2,
        title: 'Sufi Chain Adoption',
        description:
          'Structured mentorship and documented transmission aligned with governance integrity and institutional accountability.',
        href: '/inner-development/sufi-chain-adoption',
      },
    ],
  },
  {
    id: 'support',
    label: 'Support & Integration Layer',
    subtitle: 'Relational and guided accompaniment through the path',
    accent: '#8BB89A',
    items: [
      {
        icon: Compass,
        title: 'Personal Guidance',
        description:
          'Receive personalized recommendations based on your assessment and current stage of inner development.',
        href: '/inner-development/guidance',
      },
      {
        icon: BookOpen,
        title: 'Study Circles',
        description:
          'Join structured learning communities exploring sacred texts, contemplative wisdom, and applied practice.',
        href: '/inner-development/circles',
      },
      {
        icon: Users,
        title: 'Mentorship',
        description:
          'Connect with experienced practitioners for sustained guidance on your transformative journey.',
        href: '/inner-development/mentorship',
      },
    ],
  },
];

export default function InnerDevelopmentPage() {
  return (
    <div className="min-h-screen bg-[#0B0F2A]">
      <ObservatoryHero
        subtitle="Transformative Practice"
        title="Inner Development"
        description="Structured pathways for personal transformation — integrating contemplative practice, developmental psychology, and sustained mentorship into a coherent applied framework."
      />

      <section className="py-20 px-4 observatory-gradient">
        <div className="max-w-5xl mx-auto space-y-16">
          {LAYERS.map((layer) => (
            <ScrollReveal key={layer.id}>
              <div>
                {/* Layer header */}
                <div className="mb-6 pl-4 border-l-2" style={{ borderColor: layer.accent }}>
                  <h2 className="text-lg font-semibold text-[#F5F3EE] mb-0.5">{layer.label}</h2>
                  <p className="text-sm" style={{ color: `${layer.accent}99` }}>{layer.subtitle}</p>
                </div>

                {/* Items */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {layer.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="glass-panel border border-[rgba(255,255,255,0.07)] rounded-xl p-5 group hover:border-[rgba(255,255,255,0.14)] transition-all duration-200 flex flex-col"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor: `${layer.accent}15`,
                              border: `1px solid ${layer.accent}30`,
                            }}
                          >
                            <Icon className="h-4.5 w-4.5" style={{ color: layer.accent }} />
                          </div>
                          <ArrowRight
                            className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 mt-1"
                            style={{ color: layer.accent }}
                          />
                        </div>
                        <h3 className="text-sm font-semibold text-[#F5F3EE] mb-2 group-hover:text-[#E8E3DA] transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#AAB0D6] leading-relaxed flex-1">
                          {item.description}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
