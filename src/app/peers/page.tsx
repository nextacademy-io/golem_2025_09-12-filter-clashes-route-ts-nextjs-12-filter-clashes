import PeerList from '@/components/peer-list';

export default function PeersPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Peers</h1>
      <PeerList />
    </div>
  );
}
