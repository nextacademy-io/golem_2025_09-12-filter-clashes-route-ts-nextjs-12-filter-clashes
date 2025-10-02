import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, test } from 'vitest';
import { useProfileUrlsRoundRobin } from './use-profile-urls-round-robin';

describe('useProfileUrlsRoundRobin', () => {
  test('should return the correct initial values', () => {
    // Mock implementation of the URL factory
    const urlFactory = (index: number) => `https://example.com/image${index}.jpg`;

    // Mock the useProfileUrlsRoundRobin hook
    const { result } = renderHook(() => useProfileUrlsRoundRobin(0, 5, urlFactory, 0));

    // Check initial values
    expect(result.current.pictureUrl).toBe('https://example.com/image0.jpg');
    expect(result.current.prevPictureUrl).toBe(null);
  });

  test('should update the picture URL on nextPicture', () => {
    // Mock implementation of the URL factory
    const urlFactory = (index: number) => `https://example.com/image${index}.jpg`;

    // Mock the useProfileUrlsRoundRobin hook
    const { result } = renderHook(() => useProfileUrlsRoundRobin(0, 5, urlFactory, 0));

    // Call nextPicture
    act(() => {
      result.current.nextPicture();
    });

    // Check updated values
    expect(result.current.pictureUrl).toBe('https://example.com/image1.jpg');
    expect(result.current.prevPictureUrl).toBe('https://example.com/image0.jpg');
  });

  test('should wrap around when reaching the max index', () => {
    // Mock implementation of the URL factory
    const urlFactory = (index: number) => `https://example.com/image${index}.jpg`;

    // Mock the useProfileUrlsRoundRobin hook
    const { result } = renderHook(() => useProfileUrlsRoundRobin(0, 5, urlFactory, 5));

    // Call nextPicture
    act(() => {
      result.current.nextPicture();
    });

    // Check updated values
    expect(result.current.pictureUrl).toBe('https://example.com/image0.jpg');
    expect(result.current.prevPictureUrl).toBe('https://example.com/image5.jpg');
  });
});
