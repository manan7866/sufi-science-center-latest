import './globals.css';
import type { Metadata } from 'next';
import { ConditionalLayout } from '@/components/conditional-layout';

export const metadata: Metadata = {
  title: 'Sufi Science Center | Consciousness Research Institute',
  description: 'A harmony of advanced scientific knowledge and Sufi inner peace. Explore consciousness research, knowledge systems, and transformative inner development.',
  keywords: 'consciousness research, Sufi science, knowledge systems, inner development, epistemology, spiritual institute',
  openGraph: {
    title: 'Sufi Science Center',
    description: 'A harmony of advanced scientific knowledge and Sufi inner peace',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
