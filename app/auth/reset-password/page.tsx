'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Lock, ArrowLeft, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email') || '';
  const otp = searchParams.get('otp') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setError('Password must contain uppercase, lowercase, and number.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/auth/signin?reset=success');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!email || !otp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F2A] px-4">
        <div className="text-center">
          <p className="text-[#AAB0D6] mb-4">Invalid reset link. Please try again.</p>
          <Link href="/auth/forgot-password">
            <Button className="bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Forgot Password
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F2A] px-6">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-2">
            Password Reset Successful
          </h2>
          <p className="text-sm text-[#AAB0D6]/60 mb-6">
            Your password has been updated. Redirecting to sign in...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#1C1F4A] to-[#0B0F2A]">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#C8A75E]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-[#C8A75E]/3 rounded-full blur-3xl" />
        </div>
        <div className="relative flex flex-col justify-center px-16 max-w-xl">
          <div className="w-14 h-14 rounded-2xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center mb-8">
            <span className="text-xl font-bold text-[#C8A75E]">SSC</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-[#F5F3EE] mb-6 leading-tight">
            Set New<br />
            <span className="text-gradient">Password</span>
          </h1>
          <p className="text-[#AAB0D6]/70 text-base leading-relaxed mb-12">
            Create a strong password for your account. Make sure it's at least 6 characters
            and includes uppercase, lowercase, and numbers.
          </p>
          <div className="glass-panel rounded-2xl p-6 border border-white/5 bg-white/2">
            <p className="text-sm text-[#AAB0D6]/60 italic">
              "Security is not a barrier, but a gateway to trust and peace of mind."
            </p>
            <p className="text-xs text-[#C8A75E]/60 mt-3">— Sufi Wisdom</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <Link
              href="/auth/forgot-password"
              className="inline-flex items-center gap-2 text-sm text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Forgot Password
            </Link>
            <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-2">Create New Password</h2>
            <p className="text-sm text-[#AAB0D6]/60">Enter your new password below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-[#AAB0D6]/70 mb-2 tracking-wide uppercase">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAB0D6]/30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  className="w-full h-12 pl-11 pr-12 bg-[#141A3A]/60 border border-white/8 rounded-xl text-sm text-[#F5F3EE] placeholder:text-[#9CA3AF]/40 focus:outline-none focus:border-[#C8A75E]/40 focus:ring-1 focus:ring-[#C8A75E]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AAB0D6]/30 hover:text-[#AAB0D6]/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#AAB0D6]/70 mb-2 tracking-wide uppercase">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAB0D6]/30" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  className="w-full h-12 pl-11 pr-12 bg-[#141A3A]/60 border border-white/8 rounded-xl text-sm text-[#F5F3EE] placeholder:text-[#9CA3AF]/40 focus:outline-none focus:border-[#C8A75E]/40 focus:ring-1 focus:ring-[#C8A75E]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AAB0D6]/30 hover:text-[#AAB0D6]/60 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2">
                <span className="mt-0.5">⚠</span>
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A] font-semibold disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Resetting Password...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-[#AAB0D6]/50">
            Remember your password?{' '}
            <Link href="/auth/signin" className="text-[#C8A75E] hover:text-[#D4B56D] font-medium transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F2A]">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8A75E]" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
