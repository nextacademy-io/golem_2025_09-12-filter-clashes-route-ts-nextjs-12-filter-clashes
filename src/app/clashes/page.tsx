import { ClashList } from '@/components/clash-list';
import Link from 'next/link';

export default function ClashesPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clashes</h1>
        <Link
          href="/clashes/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Create Clash
        </Link>
      </div>
      <ClashList />
    </div>
  );
}
