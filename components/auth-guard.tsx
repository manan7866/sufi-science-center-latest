'use client';

import { useAuth } from '@/lib/auth-context';
import { Loader2 } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && !user && !isRedirecting) {
      setIsRedirecting(true);
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
      window.location.href = `/auth/signin?redirect=${encodeURIComponent(currentPath)}`;
    }
  }, [loading, user, isRedirecting]);

  if (loading || isRedirecting) {
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
    return null;
  }

  return <>{children}</>;
}
