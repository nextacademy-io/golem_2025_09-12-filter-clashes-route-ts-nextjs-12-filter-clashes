'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client/react';
import gql from 'graphql-tag';
import { ClashCard } from './clash-card';
import { GetClashesQuery } from '@/gql/graphql';

const GetClashes = gql`
  query GetClashes {
    clashes {
      id
      title
      pictureUrl
      participants {
        id
        pictureUrl
      }
    }
  }
`;

export const ClashList: React.FC = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery<GetClashesQuery>(GetClashes);

  const handleClashDetails = (clashId: string) => {
    router.push(`/clashes/${clashId}`);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="col-span-full text-center p-24">Loading clashes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="col-span-full text-center p-24 text-red-600">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data?.clashes?.map((clash) => (
        <ClashCard key={clash.id} clash={clash} onDetailsClicked={handleClashDetails} />
      ))}
    </div>
  );
};
