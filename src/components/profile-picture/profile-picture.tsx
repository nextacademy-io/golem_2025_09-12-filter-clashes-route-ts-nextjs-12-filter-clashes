import Image from 'next/image';
import Link from 'next/link';

export interface ProfilePictureProps {
  diameter?: number; // In pixels
  profileUrl?: string; // URL of the profile picture
  onClick?: (profileUrl: string) => void; // Optional click handler
  peerId?: number | string; // Optional peer ID for navigation
}

export function ProfilePicture({
  diameter = 100,
  profileUrl = 'https://randomuser.me/api/portraits/men/1.jpg',
  onClick,
  peerId,
}: ProfilePictureProps): React.ReactNode {
  const imageElement = (
    <Image
      src={profileUrl}
      alt="Profile Picture"
      width={diameter}
      height={diameter}
      className="rounded-full object-cover hover:opacity-70 transition-opacity duration-300 hover:cursor-pointer"
    />
  );

  if (peerId) {
    return (
      <Link href={`/peers/${peerId}`} className="profile-picture max-w-fit">
        {imageElement}
      </Link>
    );
  }

  return (
    <div className="profile-picture max-w-fit" onClick={() => onClick?.(profileUrl)}>
      {imageElement}
    </div>
  );
}
