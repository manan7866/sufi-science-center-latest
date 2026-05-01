'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Shield, Mail, RefreshCw, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

function VerifyOTPForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email') || '';
  const type = searchParams.get('type'); // 'reset' for password reset
  const isResetFlow = type === 'reset';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = useCallback((index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [otp]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [otp]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      const newOtp = pasted.split('');
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const otpStr = otp.join('');

    if (otpStr.length !== 6) {
      setError('Please enter all 6 digits.');
      return;
    }

    setLoading(true);

    try {
      if (isResetFlow) {
        // For reset flow, just redirect to reset password page with OTP
        setSuccess(true);
        setTimeout(() => {
          router.push(`/auth/reset-password?email=${encodeURIComponent(email)}&otp=${otpStr}`);
        }, 1500);
      } else {
        // Original signup verification flow
        const response = await fetch('/api/auth/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp: otpStr }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Verification failed');
        }

        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/auth/signin';
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setResending(true);

    try {
      const endpoint = isResetFlow ? '/api/auth/forgot-password' : '/api/auth/resend-otp';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend OTP.');
      }

      setCountdown(60);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP.');
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F2A] px-4">
        <div className="text-center">
          <p className="text-[#AAB0D6] mb-4">No email provided. Please try again.</p>
          <Link href={isResetFlow ? "/auth/forgot-password" : "/auth/signup"}>
            <Button className="bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isResetFlow ? 'Go to Forgot Password' : 'Go to Sign Up'}
            </Button>
          </Link>
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
            {isResetFlow ? (
              <>
                Verify Your<br />
                <span className="text-gradient">Reset Code</span>
              </>
            ) : (
              <>
                Verify Your<br />
                <span className="text-gradient">Email Address</span>
              </>
            )}
          </h1>
          <p className="text-[#AAB0D6]/70 text-base leading-relaxed mb-12">
            {isResetFlow
              ? "We've sent a 6-digit verification code to your email. Enter it below to reset your password."
              : "We've sent a 6-digit verification code to your email. This helps us ensure the security and authenticity of your account."
            }
          </p>
          <div className="space-y-4">
            {[
              { icon: Shield, text: 'Secure verification process' },
              { icon: Mail, text: 'Code sent to your email' },
              { icon: CheckCircle2, text: 'Takes just a moment' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-[#C8A75E]" />
                <span className="text-sm text-[#AAB0D6]/60">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - OTP Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md">
          <Link
            href={isResetFlow ? "/auth/forgot-password" : "/auth/signup"}
            className="inline-flex items-center gap-2 text-sm text-[#AAB0D6]/50 hover:text-[#C8A75E] transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            {isResetFlow ? 'Back to Forgot Password' : 'Back to sign up'}
          </Link>

          {success ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-3">
                {isResetFlow ? 'Code Verified!' : 'Email Verified!'}
              </h2>
              <p className="text-[#AAB0D6]/60 text-sm mb-8">
                {isResetFlow
                  ? 'Redirecting to set new password...'
                  : 'Your account has been successfully verified.Redirecting to sign in...'
                }
              </p>
              <div className="w-32 h-1 bg-white/5 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-[#C8A75E] rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <div className="lg:hidden w-12 h-12 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center mb-6">
                  <span className="text-lg font-bold text-[#C8A75E]">SSC</span>
                </div>
                <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-2">
                  Enter verification code
                </h2>
                <p className="text-sm text-[#AAB0D6]/60">
                  We sent a 6-digit code to{' '}
                  <span className="text-[#C8A75E] font-medium">{email}</span>
                </p>
              </div>

              <form onSubmit={handleVerify} className="space-y-6">
                <div onPaste={handlePaste}>
                  <label className="block text-xs font-medium text-[#AAB0D6]/70 mb-3 tracking-wide uppercase">
                    Verification Code
                  </label>
                  <div className="flex gap-3 justify-center">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-mono font-bold rounded-xl border transition-all focus:outline-none ${
                          digit
                            ? 'bg-[#C8A75E]/5 border-[#C8A75E]/30 text-[#C8A75E]'
                            : 'bg-[#141A3A]/60 border-white/8 text-[#F5F3EE]'
                        } focus:border-[#C8A75E]/40 focus:ring-1 focus:ring-[#C8A75E]/20`}
                      />
                    ))}
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
                  disabled={loading || otp.some((d) => !d)}
                  className="w-full h-12 bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A] font-semibold disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-sm"
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Verifying...</>
                  ) : (
                    isResetFlow ? 'Verify & Continue' : 'Verify Email'
                  )}
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleResend}
                    disabled={resending || countdown > 0}
                    className="text-[#AAB0D6]/50 hover:text-[#C8A75E] text-sm disabled:opacity-40"
                  >
                    {resending ? (
                      <><Loader2 className="w-3 h-3 mr-1 animate-spin" />Sending...</>
                    ) : countdown > 0 ? (
                      <>Resend code in {countdown}s</>
                    ) : (
                      <>
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Resend code
                      </>
                    )}
                  </Button>
                </div>
              </form>

              <p className="mt-8 text-center text-sm text-[#AAB0D6]/50">
                Wrong email?{' '}
                <Link href={isResetFlow ? "/auth/forgot-password" : "/auth/signup"} className="text-[#C8A75E] hover:text-[#D4B56D] font-medium transition-colors">
                  Go back
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F2A]">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8A75E]" />
      </div>
    }>
      <VerifyOTPForm />
    </Suspense>
  );
}
