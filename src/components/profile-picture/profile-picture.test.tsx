import { expect, describe, it, vi } from 'vitest';
import { ProfilePicture } from './profile-picture';
import { render } from '@testing-library/react';

describe('Profile Picture Component', () => {
  it('renders correctly', () => {
    const { container } = render(<ProfilePicture />);
    expect(container).toBeVisible();
  });

  it('has correct alt text', () => {
    const { getByAltText } = render(<ProfilePicture />);
    const image = getByAltText('Profile Picture');
    expect(image).toBeVisible();
  });

  it.each([10, 100, 300, 444])('has correct diameter: %i', (diameter: number) => {
    const { getByRole } = render(<ProfilePicture diameter={diameter} />);
    const image = getByRole('img');
    expect(image).toHaveAttribute('width', diameter.toString());
    expect(image).toHaveAttribute('height', diameter.toString());
  });

  it('has default diameter', () => {
    const { getByRole } = render(<ProfilePicture />);
    const image = getByRole('img');
    expect(image).toHaveAttribute('width', '100');
    expect(image).toHaveAttribute('height', '100');
  });

  it.each([
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/men/3.jpg',
    'https://randomuser.me/api/portraits/women/6.jpg',
  ])('has correct profile picture URL: %s', (profileUrl: string) => {
    const { getByRole } = render(<ProfilePicture profileUrl={profileUrl} />);
    const image = getByRole('img');
    expect(image).toHaveAttribute('src', expect.stringMatching(encodeURIComponent(profileUrl)));
  });

  it('has default profile picture URL', () => {
    const profileUrl = 'https://randomuser.me/api/portraits/men/1.jpg';
    const { getByRole } = render(<ProfilePicture />);
    const image = getByRole('img');
    expect(image).toHaveAttribute('src', expect.stringMatching(encodeURIComponent(profileUrl)));
  });

  it('is circle', () => {
    const { getByRole } = render(<ProfilePicture />);
    const image = getByRole('img');
    expect(image).toHaveClass('rounded-full');
  });

  it.each([
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/men/3.jpg',
    'https://randomuser.me/api/portraits/women/6.jpg',
  ])('acts on click, with %s', (profileUrl: string) => {
    const handleClick = vi.fn();
    const { getByRole } = render(<ProfilePicture onClick={handleClick} profileUrl={profileUrl} />);
    const image = getByRole('img');
    image.click();
    expect(handleClick).toHaveBeenCalledWith(profileUrl);
  });
});
