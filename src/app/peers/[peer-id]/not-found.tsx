import Link from 'next/link';

export default function PeerNotFound() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Peer Not Found</h1>
        <p className="text-gray-600 mb-6">
          The peer you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/peers"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-md border border-blue-200 hover:border-blue-300 transition-colors duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Peers
        </Link>
      </div>
    </div>
  );
}
