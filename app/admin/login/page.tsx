'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader as Loader2, ShieldCheck, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin/membership';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, redirect }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Authentication failed.');
        return;
      }

      router.push(data.redirect || '/admin/membership');
    } catch {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#080A18] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-[#C8A75E]" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-xl font-serif font-semibold text-[#F5F3EE]">Admin Access</h1>
          <p className="text-xs text-[#AAB0D6]/40 mt-1">Sufi Science Center — Restricted</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs text-[#AAB0D6]/60 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0D1020] text-[#F5F3EE] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C8A75E]/50 transition-colors"
              placeholder="admin@sufisciencecenter.org"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-xs text-[#AAB0D6]/60 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0D1020] text-[#F5F3EE] border border-white/10 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-[#C8A75E]/50 transition-colors"
                placeholder="••••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAB0D6]/40 hover:text-[#AAB0D6]/80 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-red-500/8 border border-red-500/20 px-4 py-3 text-xs text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C8A75E] text-[#0B0F2A] font-semibold rounded-xl py-3 text-sm hover:bg-[#C8A75E]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {loading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-[10px] text-[#AAB0D6]/20 mt-8">
          Access restricted to authorized administrators only.
        </p>
      </div>
    </div>
  );
}
