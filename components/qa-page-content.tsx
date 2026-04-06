'use client';

import { useState, useMemo } from 'react';
import { Search, Mail, ChevronDown, ChevronRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { qaData, QACategory } from '@/lib/qa-data';

export function QAPageContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return qaData;

    const q = searchQuery.toLowerCase();
    return qaData
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((category) => category.questions.length > 0);
  }, [searchQuery]);

  const totalResults = filteredData.reduce(
    (acc, cat) => acc + cat.questions.length,
    0
  );

  const isSearching = searchQuery.trim().length > 0;

  return (
    <section className="py-20 px-4 observatory-gradient">
      <div className="max-w-4xl mx-auto">

        {/* Search Bar */}
        <div className="mb-16">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C8A75E]" />
            <input
              type="text"
              placeholder="Explore a question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[rgba(28,31,74,0.5)] border border-[rgba(255,255,255,0.08)] rounded-xl pl-14 pr-6 py-4 text-[#F5F3EE] placeholder:text-[#AAB0D6]/50 text-base focus:outline-none focus:border-[rgba(200,167,94,0.4)] focus:bg-[rgba(28,31,74,0.7)] transition-all duration-200"
            />
          </div>
          {isSearching && (
            <p className="mt-3 text-[#AAB0D6] text-sm font-mono">
              {totalResults === 0
                ? 'No results found. Try a different term.'
                : `${totalResults} result${totalResults !== 1 ? 's' : ''} across ${filteredData.length} categor${filteredData.length !== 1 ? 'ies' : 'y'}`}
            </p>
          )}
        </div>

        {/* Category Navigation (shown when not searching) */}
        {!isSearching && (
          <div className="mb-14">
            <p className="text-[#AAB0D6] text-xs font-mono uppercase tracking-[0.2em] mb-5">
              Browse by category
            </p>
            <div className="flex flex-wrap gap-2">
              {qaData.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => {
                    const el = document.getElementById(`category-${cat.slug}`);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.08)] text-[#AAB0D6] text-sm hover:border-[rgba(200,167,94,0.35)] hover:text-[#C8A75E] transition-all duration-200 bg-[rgba(28,31,74,0.3)]"
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Q&A Categories */}
        <div className="space-y-12">
          {filteredData.length === 0 ? (
            <div className="glass-panel rounded-2xl p-12 text-center">
              <p className="text-[#AAB0D6] text-lg">No matching questions found.</p>
              <p className="text-[#AAB0D6]/60 text-sm mt-2">
                Try rephrasing your search or browse the categories above.
              </p>
            </div>
          ) : (
            filteredData.map((category) => (
              <CategorySection
                key={category.slug}
                category={category}
                highlight={isSearching ? searchQuery : ''}
              />
            ))
          )}
        </div>

        {/* CTA Footer */}
        <div className="mt-24 mb-4">
          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(200,167,94,0.3)] to-transparent" />
            <div className="pt-16 text-center">
              <p className="text-[#AAB0D6] text-xs font-mono uppercase tracking-[0.2em] mb-4">
                Not answered here
              </p>
              <h3 className="text-2xl md:text-3xl font-serif font-semibold text-[#F5F3EE] mb-4">
                Still have a question?
              </h3>
              <p className="text-[#AAB0D6] mb-8 max-w-lg mx-auto leading-relaxed">
                If your question was not addressed here, you may direct it to the Institute
                directly. Substantive inquiries receive considered responses.
              </p>
              <a
                href="/portal"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl border border-[rgba(200,167,94,0.35)] text-[#C8A75E] hover:bg-[rgba(200,167,94,0.08)] hover:border-[rgba(200,167,94,0.6)] transition-all duration-200 text-sm font-medium tracking-wide group"
              >
                <Mail className="h-4 w-4" />
                Contact the Institute
                <ChevronRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

interface CategorySectionProps {
  category: QACategory;
  highlight: string;
}

function CategorySection({ category, highlight }: CategorySectionProps) {
  return (
    <div id={`category-${category.slug}`} className="scroll-mt-32">
      {/* Category Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 bg-gradient-to-b from-[#C8A75E] to-[#E6D5A8] rounded-full" />
          <h2 className="text-lg font-serif font-semibold text-[#F5F3EE] tracking-wide">
            {category.category}
          </h2>
        </div>
        <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
      </div>

      {/* Accordion */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <Accordion type="single" collapsible className="divide-y divide-[rgba(255,255,255,0.05)]">
          {category.questions.map((item, index) => (
            <AccordionItem
              key={index}
              value={`${category.slug}-${index}`}
              className="border-0 px-6 md:px-8"
            >
              <AccordionTrigger className="py-5 text-left text-[#F5F3EE] font-serif text-base md:text-[1.05rem] font-medium hover:text-[#C8A75E] hover:no-underline transition-colors duration-200 [&[data-state=open]]:text-[#C8A75E] [&[data-state=open]>svg]:rotate-180 gap-4">
                <HighlightText text={item.question} highlight={highlight} />
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-0">
                <div className="pl-0 pr-6">
                  <div className="w-8 h-px bg-[rgba(200,167,94,0.3)] mb-4" />
                  <p className="text-[#AAB0D6] leading-relaxed text-sm md:text-base">
                    <HighlightText text={item.answer} highlight={highlight} />
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

interface HighlightTextProps {
  text: string;
  highlight: string;
}

function HighlightText({ text, highlight }: HighlightTextProps) {
  if (!highlight.trim()) return <>{text}</>;

  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-[rgba(200,167,94,0.2)] text-[#E6D5A8] rounded px-0.5"
            style={{ background: 'rgba(200,167,94,0.2)', color: '#E6D5A8' }}
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
