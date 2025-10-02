/* eslint-disable @next/next/no-img-element */
'use client';

import { GetClashesQuery } from '@/gql/graphql';
import { ProfilePicture } from '../../profile-picture';

export interface ClashCardProps {
  clash: GetClashesQuery['clashes'][number];
  onDetailsClicked: (clashId: string) => void;
}

export const ClashCard: React.FC<ClashCardProps> = ({ clash, onDetailsClicked }) => (
  <div className="border border-gray-200 rounded-lg p-4 flex gap-3 flex-col shadow-sm hover:shadow-md transition-shadow duration-200 w-full max-w-sm min-h-80 bg-white">
    <img
      src={clash.pictureUrl}
      alt={clash.title}
      className="object-cover h-48 w-full rounded-md flex-shrink-0"
    />
    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex-shrink-0">
      {clash.title}
    </h2>
    <div className="flex flex-row gap-3 flex-shrink-0">
      {clash.participants.map((peer) => (
        <ProfilePicture key={peer.id} diameter={32} profileUrl={peer.pictureUrl} peerId={peer.id} />
      ))}
    </div>
    <div className="flex-grow flex items-end justify-end">
      <button
        onClick={() => onDetailsClicked(clash.id)}
        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 text-sm font-medium py-1 px-3 rounded-md border border-blue-200 hover:border-blue-300 transition-colors duration-200 cursor-pointer"
      >
        Details
      </button>
    </div>
  </div>
);
