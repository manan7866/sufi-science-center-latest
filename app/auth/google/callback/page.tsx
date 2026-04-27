'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function GoogleCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const userStr = searchParams.get('user');

    console.log('Google callback - token:', !!token, 'user:', !!userStr);

    if (token && userStr) {
      try {
        // Save to localStorage same as email/password login
        localStorage.setItem('ssc_user_token', token);
        localStorage.setItem('ssc_user', userStr);
        document.cookie = `ssc_user_token=${token}; path=/; max-age=604800; samesite=lax`;
        
        console.log('Session saved, redirecting to portal');
        router.replace('/portal');
      } catch (error) {
        console.error('Failed to save session:', error);
        router.replace('/auth/signin?error=session_save_failed');
      }
    } else {
      console.log('Missing token or user data');
      router.replace('/auth/signin?error=missing_params');
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F2A]">
      <div className="text-center">
        <div className="w-10 h-10 border-3 border-[#C8A75E] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#AAB0D6]">Completing Google sign-in...</p>
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F2A]">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-[#C8A75E] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#AAB0D6]">Loading...</p>
        </div>
      </div>
    }>
      <GoogleCallbackHandler />
    </Suspense>
  );
}