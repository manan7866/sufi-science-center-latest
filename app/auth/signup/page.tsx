'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Loader2, Mail, Lock, UserPlus, Shield, CheckCircle2 } from 'lucide-react';

export default function SignUpPage() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];
  const strengthColors = ['', 'text-red-400', 'text-yellow-400', 'text-emerald-400'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);

    if (result.success) {
      window.location.href = `/auth/verify-otp?email=${encodeURIComponent(email)}`;
    } else {
      setError(result.error || 'Registration failed. Please try again.');
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
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C8A75E]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#C8A75E]/3 rounded-full blur-3xl" />
        </div>
        <div className="relative flex flex-col justify-center px-16 max-w-xl">
          <div className="w-14 h-14 rounded-2xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center mb-8">
            <span className="text-xl font-bold text-[#C8A75E]">SSC</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-[#F5F3EE] mb-6 leading-tight">
            Join the Future of<br />
            <span className="text-gradient">Consciousness Research</span>
          </h1>
          <p className="text-[#AAB0D6]/70 text-base leading-relaxed mb-12">
            Connect with researchers, scholars, and practitioners advancing the integration
            of Sufi wisdom with contemporary scientific inquiry.
          </p>
          <div className="space-y-4">
            {[
              { icon: Shield, text: 'Verified research community' },
              { icon: CheckCircle2, text: 'Access to exclusive resources' },
              { icon: UserPlus, text: 'Collaborative knowledge platform' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-[#C8A75E]" />
                <span className="text-sm text-[#AAB0D6]/60">{item.text}</span>
              </div>
            ))}
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
            <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-2">Create your account</h2>
            <p className="text-sm text-[#AAB0D6]/60">Start your journey with the Sufi Science Center</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              icon={UserPlus}
              type="text"
              label="Full Name"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />

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
                placeholder="Min. 6 characters"
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
              {password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          passwordStrength >= s
                            ? s === 1 ? 'bg-red-400/60' : s === 2 ? 'bg-yellow-400/60' : 'bg-emerald-400/60'
                            : 'bg-white/5'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-[10px] ${strengthColors[passwordStrength]}`}>
                    {strengthLabels[passwordStrength]}
                  </span>
                </div>
              )}
            </div>

            <InputField
              icon={Lock}
              type={showConfirm ? 'text' : 'password'}
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e: any) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AAB0D6]/30 hover:text-[#AAB0D6]/60 transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            {confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-red-400/70 -mt-3">Passwords do not match</p>
            )}

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2">
                <span className="mt-0.5">⚠</span>
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || password !== confirmPassword}
              className="w-full h-12 bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A] font-semibold disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-sm"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating Account...</>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-[#AAB0D6]/50">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-[#C8A75E] hover:text-[#D4B56D] font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
