import { render, screen, fireEvent } from '@testing-library/react';
import UtilityNavigation from './UtilityNavigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('@sitecore-jss/sitecore-jss-nextjs', () => ({
  useSitecoreContext: jest.fn().mockReturnValue({
    sitecoreContext: {
      CartPage: 'https://cm.lifeabundance.localhost/en/',
      UserLoginPage: 'https://cm.lifeabundance.localhost/en/variation-pages/cardlist',
    },
  }),
}));

jest.mock('core/atoms/Icons');
jest.mock(
  'next/link',
  () =>
    ({ children }: { children: React.ReactNode }) =>
      children
);

jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (text: string) => {
      return {
        Authentication_Login_SignInLabel: 'Login',
        Authentication_Login_SignOutLabel: 'Logout',
      }[text];
    },
  }),
}));

describe('UtilityNavigation', () => {
  const props = {
    menu: true,
    handleLogin: () => null,
    toggleSearchBar: () => null,
    userData: '',
  };
  beforeEach(() => {
    localStorage.clear();
  });
  const queryClient = new QueryClient();
  it('should render login button', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UtilityNavigation {...props} />
      </QueryClientProvider>
    );
    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();
  });

  it('should render product count equal to 0', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UtilityNavigation {...props} />
      </QueryClientProvider>
    );
    const productCount = screen.getByText('0');
    expect(productCount).toBeInTheDocument();
  });

  it('Search button is visible and is clicked', async () => {
    const onClickMock = jest.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <UtilityNavigation toggleSearchBar={onClickMock} />
      </QueryClientProvider>
    );
    const searchBtn = screen.getByRole('button', {
      name: /search-icon/i,
    });
    fireEvent.click(searchBtn);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
