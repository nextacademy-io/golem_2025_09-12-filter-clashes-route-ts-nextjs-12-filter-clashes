import { useState } from 'react';

export type UrlFactory = (index: number) => string;

export function useProfileUrlsRoundRobin(
  minIndex: number,
  maxIndex: number,
  urlFactory: UrlFactory,
  initialIndex = minIndex,
) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [prevPictureUrl, setPrevPictureUrl] = useState<string | null>(null);
  const [pictureUrl, setPictureUrl] = useState(urlFactory(currentIndex));

  const nextPicture = () => {
    const nextIndex = ((currentIndex + 1) % (maxIndex - minIndex + 1)) + minIndex;
    setPrevPictureUrl(pictureUrl);
    setCurrentIndex(nextIndex);
    setPictureUrl(urlFactory(nextIndex));
  };

  return { prevPictureUrl, pictureUrl, nextPicture };
}
