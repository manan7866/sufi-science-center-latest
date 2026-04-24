import './globals.css';
import type { Metadata } from 'next';
import { ConditionalLayout } from '@/components/conditional-layout';
import { AuthProvider } from '@/lib/auth-context';
// import RootHeader from '@/components/root-header';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Sufi Science Center | Consciousness Research Institute',
  description: 'A harmony of advanced scientific knowledge and Sufi inner peace. Explore consciousness research, knowledge systems, and transformative inner development.',
  keywords: 'consciousness research, Sufi science, knowledge systems, inner development, epistemology, spiritual institute',
  openGraph: {
    title: 'Sufi Science Center',
    description: 'A harmony of advanced scientific knowledge and Sufi inner peace',
    type: 'website',
  },
  icons: {
    icon: '/SSC_LOGO_M.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-[#0B0F2A]">
        <AuthProvider>
          {/* <RootHeader /> */}
          <main className="flex-1">
            <ConditionalLayout>{children}</ConditionalLayout>
          </main>
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
