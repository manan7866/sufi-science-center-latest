'use client';

import { useState, useMemo } from 'react';
import { ObservatoryHero } from '@/components/observatory-hero';
import { QAPageContent } from '@/components/qa-page-content';

export default function QuestionsAndUnderstandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0F2A]">
      <ObservatoryHero
        subtitle="Institutional Clarity"
        title="Questions & Understanding"
        description="Structured answers to questions about the Center's work, methodology, programs, governance, and institutional positioning."
      />
      <QAPageContent />
    </div>
  );
}
