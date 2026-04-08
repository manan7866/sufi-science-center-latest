'use client';

import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Loader2, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';

interface FormGuardProps {
  formType: string;
  checkExisting: (userId: string) => Promise<boolean>;
  children: ReactNode;
  loadingCheck?: boolean;
}

export default function FormGuard({ formType, checkExisting, children, loadingCheck = false }: FormGuardProps) {
  const { user, loading } = useAuth();
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!loading && user && !loadingCheck) {
      checkExisting(user.id).then((exists) => {
        setAlreadySubmitted(exists);
        setChecking(false);
      }).catch(() => setChecking(false));
    } else if (!loadingCheck) {
      setChecking(false);
    }
  }, [user, loading, formType]);

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F2A]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#C8A75E] mx-auto mb-4" />
          <p className="text-sm text-[#AAB0D6]/50">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F2A] px-4">
        <div className="max-w-md w-full text-center">
          <div className="glass-panel rounded-2xl p-10 border border-white/5">
            <div className="w-16 h-16 rounded-full bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-[#C8A75E]" />
            </div>
            <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-3">Sign In Required</h2>
            <p className="text-sm text-[#AAB0D6]/60 mb-8 leading-relaxed">
              You need to be signed in to access this form. Create an account or sign in to continue.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/auth/signin">
                <Button className="bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A] font-semibold w-full sm:w-auto">
                  Sign In
                </Button>
              </a>
              <a href="/auth/signup">
                <Button variant="outline" className="border-white/10 text-[#AAB0D6] hover:text-[#F5F3EE] w-full sm:w-auto">
                  Create Account
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (alreadySubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F2A] px-4">
        <div className="max-w-md w-full text-center">
          <div className="glass-panel rounded-2xl p-10 border border-white/5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-serif font-semibold text-[#F5F3EE] mb-3">Already Submitted</h2>
            <p className="text-sm text-[#AAB0D6]/60 mb-8 leading-relaxed">
              You have already submitted this form. You can only submit once per form.
            </p>
            <a href="/portal">
              <Button className="bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A] font-semibold">
                Go to Dashboard
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
