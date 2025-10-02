import { expect, describe, test } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './page';

describe('Home Page', () => {
  test('renders Heading', () => {
    render(<Home />);
    const main = within(screen.getByRole('main'));
    expect(main.getByRole('heading', { level: 1, name: /Hello, Workshop/i })).toBeVisible();
  });

  test('renders Profile Picture', () => {
    render(<Home />);
    const main = within(screen.getByRole('main'));
    expect(main.getByRole('img', { name: /Profile Picture/i })).toBeVisible();
  });

  test.each([
    [1, 'https://randomuser.me/api/portraits/women/2.jpg'],
    [2, 'https://randomuser.me/api/portraits/women/3.jpg'],
    [99, 'https://randomuser.me/api/portraits/women/0.jpg'],
  ])(
    'Profile Picture changes on %i click to %s',
    async (numClicks: number, nextProfileUrl: string) => {
      const user = userEvent.setup();
      const { getByRole } = render(<Home />);

      const profilePicture = getByRole('img', { name: /Profile Picture/i });

      for (let i = 0; i < numClicks; i++) {
        await user.click(profilePicture);
      }

      expect(profilePicture).toHaveAttribute(
        'src',
        expect.stringMatching(encodeURIComponent(nextProfileUrl)),
      );
    },
  );
});
