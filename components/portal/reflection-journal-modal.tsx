'use client';

import { useState, useEffect } from 'react';
import { X, PenLine, Save, Loader as Loader2 } from 'lucide-react';
import { ReflectionEntry } from '@/hooks/use-portal-session';

interface ReflectionJournalModalProps {
  surahNumber: number | null;
  surahName: string;
  existingReflection: ReflectionEntry | undefined;
  onSave: (surahNumber: number, text: string) => Promise<void>;
  onClose: () => void;
}

export function ReflectionJournalModal({
  surahNumber,
  surahName,
  existingReflection,
  onSave,
  onClose,
}: ReflectionJournalModalProps) {
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const MAX = 2000;

  useEffect(() => {
    if (surahNumber !== null) {
      setText(existingReflection?.reflectionText || '');
      setSaved(false);
    }
  }, [surahNumber, existingReflection]);

  if (surahNumber === null) return null;

  async function handleSave() {
    if (!text.trim() || surahNumber === null) return;
    setSaving(true);
    await onSave(surahNumber, text.trim());
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl glass-panel rounded-2xl border border-white/10 overflow-hidden">

        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#C8A75E]/15 flex items-center justify-center">
              <PenLine className="w-3.5 h-3.5 text-[#C8A75E]" />
            </div>
            <div>
              <p className="text-xs text-[#AAB0D6]/50 tracking-wider uppercase">Reflection Journal</p>
              <p className="text-sm font-serif font-semibold text-[#F5F3EE]">
                Surah {surahNumber}: {surahName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5 text-[#AAB0D6]" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-xs text-[#AAB0D6]/50 mb-3 leading-relaxed">
            Record your personal reflection on this Surah's thematic insight. These notes are stored locally
            in your session and are private to you.
          </p>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX))}
            placeholder="Write your reflection here..."
            rows={6}
            className="w-full bg-[#0B0F2A]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F5F3EE] placeholder:text-[#AAB0D6]/30 focus:outline-none focus:border-[#C8A75E]/40 resize-none leading-relaxed"
          />

          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] text-[#AAB0D6]/30">
              {text.length} / {MAX}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs text-[#AAB0D6] hover:text-[#F5F3EE] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !text.trim()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#C8A75E] hover:bg-[#D4B56D] disabled:opacity-50 disabled:cursor-not-allowed text-[#0B0F2A] text-xs font-semibold rounded-lg transition-colors"
              >
                {saving ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : saved ? (
                  <span>Saved</span>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    Save Reflection
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
