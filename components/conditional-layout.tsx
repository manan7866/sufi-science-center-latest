'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminOrPortal = pathname.startsWith('/admin') || pathname.startsWith('/portal');

  return (
    <>
      {!isAdminOrPortal && <Navigation />}
      <main className={`flex-1 ${!isAdminOrPortal ? 'pt-[160px]' : ''}`}>{children}</main>
      {!isAdminOrPortal && <Footer />}
    </>
  );
}
