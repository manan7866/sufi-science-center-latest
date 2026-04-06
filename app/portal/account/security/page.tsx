'use client';

import { useState } from 'react';
import { Shield, Eye, EyeOff, Save, Monitor, Smartphone, CircleAlert as AlertCircle, CircleCheck as CheckCircle2 } from 'lucide-react';
import { usePortalSession } from '@/hooks/use-portal-session';

const INPUT_BASE = `w-full bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF]
  border rounded-xl px-4 py-3 pr-10 text-sm
  focus:outline-none focus:ring-1
  shadow-inner shadow-black/20 transition-all`;

const INPUT_DEFAULT = `${INPUT_BASE} border-white/10 focus:border-[#C8A75E] focus:ring-[#C8A75E]/30`;

const LABEL_CLS = 'block text-xs font-medium text-[#AAB0D6]/70 mb-2 tracking-wide uppercase';

export default function SecurityPage() {
  const { session, clearSession } = usePortalSession();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ current: '', newPw: '', confirm: '' });
  const [showRevokeConfirm, setShowRevokeConfirm] = useState(false);

  async function handleSave() {
    setError(null);
    if (!form.current || !form.newPw || !form.confirm) return;
    if (form.newPw !== form.confirm) return;
    if (form.newPw.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setSaving(true);
    try {
      setError('Password management is available for registered accounts only. Your portal session uses anonymous access.');
    } finally {
      setSaving(false);
    }
  }

  function handleRevokeSession() {
    clearSession();
    window.location.href = '/portal';
  }

  const strengthScore = Math.min(4, Math.floor(form.newPw.length / 3));

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#27AE60]/10 border border-[#27AE60]/20 flex items-center justify-center">
          <Shield className="w-5 h-5 text-[#27AE60]" />
        </div>
        <div>
          <h1 className="text-xl font-serif font-bold text-[#F5F3EE]">Security &amp; Password</h1>
          <p className="text-xs text-[#AAB0D6]/50 mt-0.5">Manage your account security and active sessions</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <h2 className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-2">Session Information</h2>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#6B9BD1]/5 border border-[#6B9BD1]/15 mb-5">
            <Shield className="w-4 h-4 text-[#6B9BD1] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#F5F3EE] mb-1">Anonymous Session Portal</p>
              <p className="text-[11px] text-[#AAB0D6]/60 leading-relaxed">
                Your portal uses a secure anonymous session token stored locally. Session ID: <span className="font-mono text-[#C8A75E]/70">{session?.sessionToken?.slice(0, 8).toUpperCase() || '—'}</span>
              </p>
            </div>
          </div>

          <h2 className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-5">Change Password</h2>
          <div className="space-y-4">
            <div>
              <label className={LABEL_CLS}>Current Password</label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={form.current}
                  onChange={(e) => setForm((p) => ({ ...p, current: e.target.value }))}
                  placeholder="Enter current password"
                  className={INPUT_DEFAULT}
                />
                <button
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAB0D6]/30 hover:text-[#AAB0D6] transition-colors"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className={LABEL_CLS}>New Password</label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={form.newPw}
                  onChange={(e) => setForm((p) => ({ ...p, newPw: e.target.value }))}
                  placeholder="At least 8 characters"
                  className={INPUT_DEFAULT}
                />
                <button
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAB0D6]/30 hover:text-[#AAB0D6] transition-colors"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.newPw && (
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className={`h-0.5 flex-1 rounded-full transition-all ${
                        strengthScore >= n
                          ? n <= 1 ? 'bg-red-400' : n <= 2 ? 'bg-amber-400' : n <= 3 ? 'bg-[#C8A75E]' : 'bg-[#27AE60]'
                          : 'bg-white/8'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className={LABEL_CLS}>Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirm}
                  onChange={(e) => setForm((p) => ({ ...p, confirm: e.target.value }))}
                  placeholder="Repeat new password"
                  className={`${INPUT_BASE} ${
                    form.confirm && form.newPw !== form.confirm
                      ? 'border-red-400/30 focus:border-red-400/50 focus:ring-red-400/20'
                      : form.confirm && form.newPw === form.confirm
                      ? 'border-[#27AE60]/30 focus:border-[#27AE60]/50 focus:ring-[#27AE60]/20'
                      : 'border-white/10 focus:border-[#C8A75E] focus:ring-[#C8A75E]/30'
                  }`}
                />
                <button
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAB0D6]/30 hover:text-[#AAB0D6] transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.confirm && form.newPw !== form.confirm && (
                <p className="text-[10px] text-red-400/70 mt-1">Passwords do not match</p>
              )}
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-amber-500/8 border border-amber-500/20">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-400/80 leading-relaxed">{error}</p>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={!form.current || !form.newPw || form.newPw !== form.confirm || saving}
            className={`mt-5 flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
              saved
                ? 'bg-[#27AE60]/15 border border-[#27AE60]/30 text-[#27AE60]'
                : 'bg-[#C8A75E]/12 border border-[#C8A75E]/30 text-[#C8A75E] hover:bg-[#C8A75E]/18 hover:border-[#C8A75E]/45'
            }`}
          >
            {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? 'Updating…' : saved ? 'Password Updated' : 'Update Password'}
          </button>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#F5F3EE] font-serif">Two-Factor Authentication</h2>
              <p className="text-xs text-[#AAB0D6]/50 mt-1">Add an additional layer of security to your account</p>
            </div>
            <button
              onClick={() => setMfaEnabled(!mfaEnabled)}
              className={`relative w-10 h-5 rounded-full transition-all ${mfaEnabled ? 'bg-[#C8A75E]/40' : 'bg-white/8'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${mfaEnabled ? 'left-5 bg-[#C8A75E]' : 'left-0.5 bg-white/20'}`} />
            </button>
          </div>
          {mfaEnabled && (
            <div className="mt-4 p-3 rounded-lg bg-[#C8A75E]/5 border border-[#C8A75E]/15">
              <p className="text-xs text-[#AAB0D6]/60">
                Two-factor authentication setup will be available in a future update. Your preference has been noted.
              </p>
            </div>
          )}
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <h2 className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-5">Session Management</h2>
          <div className="p-4 rounded-xl bg-white/2 border border-white/5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                <Monitor className="w-4 h-4 text-[#AAB0D6]/50" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-[#F5F3EE]">Current Browser Session</p>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#27AE60]/12 border border-[#27AE60]/20 text-[#27AE60] font-medium">Current</span>
                </div>
                <p className="text-[10px] text-[#AAB0D6]/40 mt-0.5">
                  Session ID: <span className="font-mono">{session?.sessionToken?.slice(0, 12) || '—'}</span>
                </p>
                <p className="text-[10px] text-[#AAB0D6]/30 mt-0.5">
                  Active since {session?.createdAt ? new Date(session.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-[10px] text-[#AAB0D6]/30 mb-3">Resetting your session will clear all local data and start fresh.</p>
            {!showRevokeConfirm ? (
              <button
                onClick={() => setShowRevokeConfirm(true)}
                className="flex items-center gap-2 text-xs text-red-400/50 hover:text-red-400/80 transition-colors border border-red-400/10 hover:border-red-400/25 px-4 py-2 rounded-lg"
              >
                <Smartphone className="w-3.5 h-3.5" />
                Reset Session
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-xs text-[#AAB0D6]/50 mr-2">Are you sure?</p>
                <button
                  onClick={handleRevokeSession}
                  className="text-xs text-red-400 border border-red-400/25 bg-red-400/10 px-3 py-1.5 rounded-lg hover:bg-red-400/18 transition-colors"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setShowRevokeConfirm(false)}
                  className="text-xs text-[#AAB0D6]/50 border border-white/8 px-3 py-1.5 rounded-lg hover:bg-white/4 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
