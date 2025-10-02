/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { useQuery } from '@apollo/client/react';
import gql from 'graphql-tag';

import { GetClashQuery, GetClashQueryVariables } from '@/gql/graphql';

const GetClash = gql`
  query GetClash($id: ID!) {
    clash(id: $id) {
      id
      title
      description
      pictureUrl
      location
      address
      date
      participants {
        id
        pictureUrl
        name
      }
      createdByPeer {
        id
        name
        pictureUrl
      }
    }
  }
`;

interface ClashDetailProps {
  clashId: string;
}

export const ClashDetail: React.FC<ClashDetailProps> = ({ clashId }) => {
  const { data, loading, error } = useQuery<GetClashQuery, GetClashQueryVariables>(GetClash, {
    variables: { id: clashId },
  });

  if (loading) return <div>Loading clash details...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.clash) return <div>Clash not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/clashes"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-md border border-blue-200 hover:border-blue-300 transition-colors duration-200 cursor-pointer mb-4"
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
          Back to Clashes
        </Link>
        <h1 className="text-3xl font-bold">Clash Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src={data.clash.pictureUrl}
            alt={data.clash.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">{data.clash.title}</h2>
          <p className="text-gray-700 mb-4">{data.clash.description}</p>
          <div className="space-y-2">
            <p>
              <strong>Location:</strong> {data.clash.location}
            </p>
            <p>
              <strong>Address:</strong> {data.clash.address}
            </p>
            <p>
              <strong>Date:</strong> {new Date(data.clash.date).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Participants</h3>
            <div className="flex gap-2">
              {data.clash.participants.map((participant) => (
                <div key={participant.id} className="flex flex-col items-center">
                  <Link href={`/peers/${participant.id}`}>
                    <img
                      src={participant.pictureUrl}
                      alt={participant.name}
                      className="w-12 h-12 rounded-full object-cover hover:opacity-70 transition-opacity duration-300 cursor-pointer"
                    />
                  </Link>
                  <span className="text-xs mt-1">{participant.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Created by</h3>
            <div className="flex items-center gap-2">
              <Link href={`/peers/${data.clash.createdByPeer.id}`}>
                <img
                  src={data.clash.createdByPeer.pictureUrl}
                  alt={data.clash.createdByPeer.name}
                  className="w-10 h-10 rounded-full object-cover hover:opacity-70 transition-opacity duration-300 cursor-pointer"
                />
              </Link>
              <span>{data.clash.createdByPeer.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
