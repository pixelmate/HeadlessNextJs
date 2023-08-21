import { screen, render } from '@testing-library/react';
import ChangeUsername from './ChangeUsername';

jest.mock('hooks/useTranslate', () => ({
  useTranslate: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('data/user', () => ({
  useUpdateUser: () => ({
    mutate: jest.fn(),
    isLoading: false,
    serverError: undefined,
    isSuccess: false,
    isError: false,
  }),
  useRefreshToken: () => ({
    mutate: jest.fn(),
  }),
  useUser: () => ({
    user: {
      username: 'John',
    },
    isAuthenticated: true,
  }),
}));

jest.mock('@sitecore-jss/sitecore-jss-nextjs', () => ({
  useSitecoreContext: jest.fn().mockReturnValue({
    sitecoreContext: {
      UserLoginPage: 'https://cm.lifeabundance.localhost/userprofile/login',
    },
  }),
}));

describe('ChangeUsername', () => {
  it('Render ChangeUsername', async () => {
    const props = {};
    render(<ChangeUsername {...props} />);
    const title = screen.getByText('Account_ChangeUsername_Title');
    const currentUsernameLabel = screen.getByText('Account_ChangeUsername_CurrentUsername');
    const currentUsername = screen.getByText('John');
    const newUsernameLabel = screen.getByText('Account_ChangeUsername_NewUsername');
    const cancelButton = screen.getByText('Account_ChangeUserName_CancelButton');
    const saveButton = screen.getByText('Account_ChangeUserName_SaveButton');
    expect(title).toBeInTheDocument();
    expect(currentUsernameLabel).toBeInTheDocument();
    expect(currentUsername).toBeInTheDocument();
    expect(newUsernameLabel).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });
});
