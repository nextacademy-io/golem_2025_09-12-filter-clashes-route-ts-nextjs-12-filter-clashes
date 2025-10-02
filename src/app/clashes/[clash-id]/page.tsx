import { ClashDetail } from '@/components/clash-detail';

interface ClashDetailPageProps {
  params: Promise<{
    'clash-id': string;
  }>;
}

export default async function ClashDetailPage({ params }: ClashDetailPageProps) {
  const { 'clash-id': clashId } = await params;

  return (
    <div className="p-6">
      <ClashDetail clashId={clashId} />
    </div>
  );
}
