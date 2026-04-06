import HardInquiryTranscriptContent from '@/components/dialogues/hard-inquiry-detail';

interface HardInquiryTranscriptPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: HardInquiryTranscriptPageProps) {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, ' ')} | Critical Inquiry`,
    description: 'Full transcript of critical inquiry dialogue session.',
  };
}

export default async function HardInquiryTranscriptPage({ params }: HardInquiryTranscriptPageProps) {
  const { slug } = await params;
  return <HardInquiryTranscriptContent slug={slug} />;
}
