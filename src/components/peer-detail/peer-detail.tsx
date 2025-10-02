import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getClient } from '@/apollo/server';
import { gql } from '@apollo/client';
import { GetPeerQuery, GetPeerQueryVariables } from '@/gql/graphql';

const GetPeer = gql`
  query GetPeer($id: Int!) {
    peer(id: $id) {
      id
      name
      pictureUrl
      city
      country
      clashes {
        id
        title
        pictureUrl
        date
        location
      }
    }
  }
`;

interface PeerDetailProps {
  peerId: string;
}

export default async function PeerDetail({ peerId }: PeerDetailProps) {
  try {
    const { data } = await getClient().query<GetPeerQuery>({
      query: GetPeer,
      variables: { id: parseInt(peerId) } as GetPeerQueryVariables,
    });

    if (!data || !data.peer) {
      notFound();
    }

    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/peers"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-md border border-blue-200 hover:border-blue-300 transition-colors duration-200 mb-4"
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
          <h1 className="text-3xl font-bold">Peer Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img
              src={data.peer.pictureUrl}
              alt={data.peer.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">{data.peer.name}</h2>

            <div className="bg-gray-100 p-4 rounded-lg space-y-2">
              <p className="text-lg">
                ID: <span className="font-mono">{data.peer.id}</span>
              </p>
              <p className="text-lg">
                Location:{' '}
                <span className="font-medium">
                  {data.peer.city}, {data.peer.country}
                </span>
              </p>
            </div>

            {data.peer.clashes && data.peer.clashes.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Clashes ({data.peer.clashes.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.peer.clashes.map((clash) => (
                    <Link
                      key={clash.id}
                      href={`/clashes/${clash.id}`}
                      className="block border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow duration-200 bg-white"
                    >
                      <div className="flex gap-3">
                        <img
                          src={clash.pictureUrl}
                          alt={clash.title}
                          className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{clash.title}</h4>
                          <p className="text-sm text-gray-600 truncate">{clash.location}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(clash.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-red-600">
          Error loading peer: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
        <Link href="/peers" className="inline-block mt-4 text-blue-600 hover:text-blue-800">
          Back to Peers
        </Link>
      </div>
    );
  }
}
