import InsightInterviewDetailContent from '@/components/dialogues/insight-interview-detail';

interface InsightInterviewDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: InsightInterviewDetailPageProps) {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, ' ')} | Insight Interviews`,
    description: 'Full transcript of insight interview session.',
  };
}

export default async function InsightInterviewDetailPage({ params }: InsightInterviewDetailPageProps) {
  const { slug } = await params;
  return <InsightInterviewDetailContent slug={slug} />;
}
