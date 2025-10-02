import PeerDetail from '@/components/peer-detail';

interface PeerDetailPageProps {
  params: Promise<{
    'peer-id': string;
  }>;
}

export default async function PeerDetailPage({ params }: PeerDetailPageProps) {
  const { 'peer-id': peerId } = await params;

  return <PeerDetail peerId={peerId} />;
}
