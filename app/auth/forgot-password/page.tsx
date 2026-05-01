'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}&type=reset`);
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F2A] px-6">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-2">
            Reset Email Sent
          </h2>
          <p className="text-sm text-[#AAB0D6]/60 mb-6">
            Password reset OTP has been sent to your email. Redirecting to verification...
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
            Forgot Your<br />
            <span className="text-gradient">Password?</span>
          </h1>
          <p className="text-[#AAB0D6]/70 text-base leading-relaxed mb-12">
            Don't worry, it happens. Enter your email address and we'll send you
            a verification code to reset your password.
          </p>
          <div className="glass-panel rounded-2xl p-6 border border-white/5 bg-white/2">
            <p className="text-sm text-[#AAB0D6]/60 italic">
              "The one who seeks will find. Every step back to the path is a step forward."
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
              href="/auth/signin"
              className="inline-flex items-center gap-2 text-sm text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
            <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-2">Reset Your Password</h2>
            <p className="text-sm text-[#AAB0D6]/60">Enter your email to receive a reset code</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-[#AAB0D6]/70 mb-2 tracking-wide uppercase">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAB0D6]/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full h-12 pl-11 pr-4 bg-[#141A3A]/60 border border-white/8 rounded-xl text-sm text-[#F5F3EE] placeholder:text-[#9CA3AF]/40 focus:outline-none focus:border-[#C8A75E]/40 focus:ring-1 focus:ring-[#C8A75E]/20 transition-all"
                />
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
                  Sending Reset Code...
                </>
              ) : (
                'Send Reset Code'
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
