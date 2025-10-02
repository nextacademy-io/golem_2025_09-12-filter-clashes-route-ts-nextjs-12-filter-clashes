import Link from 'next/link';
import { getClient } from '@/apollo/server';
import { gql } from '@apollo/client';
import { GetPeersQuery } from '@/gql/graphql';

const GetPeers = gql`
  query GetPeers {
    peers {
      id
      name
      pictureUrl
    }
  }
`;

export default async function PeerList() {
  try {
    const { data } = await getClient().query<GetPeersQuery>({
      query: GetPeers,
    });

    if (!data?.peers || data.peers.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600">No peers found.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.peers.map((peer) => (
          <div
            key={peer.id}
            className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
          >
            <img
              src={peer.pictureUrl}
              alt={peer.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold text-gray-800">{peer.name}</h2>

            <div className="mt-auto flex justify-end">
              <Link
                href={`/peers/${peer.id}`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 text-sm font-medium py-1 px-3 rounded-md border border-blue-200 hover:border-blue-300 transition-colors duration-200"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">
          Error loading peers: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      </div>
    );
  }
}
