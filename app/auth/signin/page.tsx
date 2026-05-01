'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Loader2, Mail, Lock, LogIn, CheckCircle } from 'lucide-react';

const InputField = ({ icon: Icon, type, value, onChange, placeholder, label, rightElement, ...props }: any) => (
  <div>
    <label className="block text-xs font-medium text-[#AAB0D6]/70 mb-2 tracking-wide uppercase">{label}</label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAB0D6]/30" />
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-12 pl-11 pr-12 bg-[#141A3A]/60 border border-white/8 rounded-xl text-sm text-[#F5F3EE] placeholder:text-[#9CA3AF]/40 focus:outline-none focus:border-[#C8A75E]/40 focus:ring-1 focus:ring-[#C8A75E]/20 transition-all"
        {...props}
      />
      {rightElement}
    </div>
  </div>
);

function SignInForm() {
  const { login, signInWithGoogle } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get('redirect') || '/portal';
  const resetSuccess = searchParams.get('reset') === 'success';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      setTimeout(() => {
        window.location.href = redirect;
      }, 100);
    } else {
      setError(result.error || 'Sign in failed. Please try again.');
    }
  };

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
            Welcome Back to<br />
            <span className="text-gradient">Sufi Science Center</span>
          </h1>
          <p className="text-[#AAB0D6]/70 text-base leading-relaxed mb-12">
            Continue your exploration of consciousness research, knowledge systems,
            and transformative inner development.
          </p>
          <div className="glass-panel rounded-2xl p-6 border border-white/5 bg-white/2">
            <p className="text-sm text-[#AAB0D6]/60 italic">
              "The journey of a thousand miles begins with a single step. Each return to the path
              is itself a homecoming."
            </p>
            <p className="text-xs text-[#C8A75E]/60 mt-3">— Sufi Wisdom</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <div className="lg:hidden w-12 h-12 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center mb-6">
              <span className="text-lg font-bold text-[#C8A75E]">SSC</span>
            </div>
            <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-2">Sign in to your account</h2>
            <p className="text-sm text-[#AAB0D6]/60">Enter your credentials to continue</p>
          </div>

          {resetSuccess && (
            <div className="mb-6 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Your password has been reset successfully. Please sign in with your new password.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              icon={Mail}
              type="email"
              label="Email Address"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <div>
              <InputField
                icon={Lock}
                type={showPassword ? 'text' : 'password'}
                label="Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AAB0D6]/30 hover:text-[#AAB0D6]/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />
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
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Signing In...</>
              ) : (
                'Sign In'
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-[#0B0F2A] text-[#AAB0D6]/40">or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full h-12 bg-white/[#0A0B14] hover:bg-white/[#F5F3EE] border border-white/[#C8A75E]/20 text-[#F5F3EE] font-medium disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-sm flex items-center justify-center gap-3"
            >
              {googleLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.63l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-[#AAB0D6]/50">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-[#C8A75E] hover:text-[#D4B56D] font-medium transition-colors">
              Create an account
            </Link>
          </p>
          <p className="mt-2 text-center text-sm">
            <Link href="/auth/forgot-password" className="text-[#AAB0D6]/40 hover:text-[#C8A75E] transition-colors">
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F2A]">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8A75E]" />
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}
