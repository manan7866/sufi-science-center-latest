'use client';

import { usePathname } from 'next/navigation';
import AuthHeader from '@/components/auth-header';

export default function RootHeader() {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');
  
  if (isAuthPage) return null;
  return <AuthHeader />;
}
