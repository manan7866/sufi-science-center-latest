'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Loader2, Mail, Lock, LogIn } from 'lucide-react';

function SignInForm() {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
          </form>

          <p className="mt-8 text-center text-sm text-[#AAB0D6]/50">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-[#C8A75E] hover:text-[#D4B56D] font-medium transition-colors">
              Create an account
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
