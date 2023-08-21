import { render, screen } from '@testing-library/react';
import UserTitles from './UserTitles';
jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (text: string) => {
      return {
        UserTitles_Afternoon: 'GOOD AFTERNOON, {{text}}',
        UserTitles_Evening: 'GOOD EVENING, {{text}}',
        UserTitles_Morning: 'GOOD MORNING, {{text}}',
      }[text];
    },
  }),
}));

jest.mock('data/user', () => ({
  useUser: () => ({
    user: {
      Username: 'Bhuvan',
    },
    isAuthenticated: true,
  }),
}));

describe('UserTitles', () => {
  const props = {
    fields: {
      Title: {
        value: 'My Accounts',
      },
    },
    rendering: { componentName: 'UserTitles' },
    params: {},
  };
  it('should render component', () => {
    render(<UserTitles {...props} />);
    const title = screen.getByText('My Accounts');

    expect(title).toBeInTheDocument();
  });
  it('should render username', () => {
    render(<p>Bhuvan S.</p>);

    const paragraphElement = screen.queryByText('Bhuvan S.');

    expect(paragraphElement).toBeInTheDocument();
  });
});
