import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, render } from '@testing-library/react';
import ChangePassword from './ChangePassword';

jest.mock('hooks/useTranslate', () => ({
  useTranslate: () => ({
    t: (key: string) => {
      return {
        ChangePassword_FormTitle: 'ChangePassword_FormTitle',
        Form_Generic_Tag_EnterOldPassword: 'ChangePassword_OldPasswordInputTitle',
        Form_Generic_Tag_EnterNewPassword: 'ChangePassword_NewPasswordInputTitle',
        Form_Generic_Tag_ReTypeNewPassword: 'ChangePassword_RetypeNewPasswordInputTitle',
        ChangePassword_CancelButtonTitle: 'ChangePassword_CancelButtonTitle',
        ChangePassword_SaveButtonTitle: 'ChangePassword_SaveButtonTitle',
      }[key];
    },
  }),
}));

jest.mock('hooks/usePasswordStrength/usePasswordStrength', () => ({
  usePasswordStrength: () => ({
    checkPasswordStrength: jest.fn(),
    color: 'transparent',
    message: 'ChangePassword_WeakPassword',
    indicatorLength: 20,
  }),
}));

jest.mock('@sitecore-jss/sitecore-jss-nextjs', () => ({
  useSitecoreContext: jest.fn().mockReturnValue({
    sitecoreContext: {
      UserChangePasswordPage: 'https://cm.lifeabundance.localhost/userprofile/changepassword',
    },
  }),
  Link: (props: { field: { value: string }; target: string; children: React.ReactNode }) => (
    <a href={props.field.value} target={props.target}>
      {props.children}
    </a>
  ),
}));

describe('ChangePassword', () => {
  const props = {
    rendering: {
      componentName: 'ChangePassword',
    },
    params: {},
    fields: {
      CancelLink: {
        value: {
          linktype: 'internal',
          href: '/userprofile/myaccount',
        },
      },
      RedirectOnSuccessUrl: {
        value: {
          linktype: 'internal',
          href: '/general/changepasswordmessage',
        },
      },
    },
  };
  describe('Render ChangePassword', () => {
    beforeEach(() => {
      const queryClient = new QueryClient();
      render(
        <QueryClientProvider client={queryClient}>
          <ChangePassword {...props} />
        </QueryClientProvider>
      );
    });
    it('Title', async () => {
      const titles = screen.getAllByText('ChangePassword_FormTitle');
      expect(titles[0]).toBeInTheDocument();
    });
    it('Panel title', async () => {
      const titles = screen.getAllByText('ChangePassword_FormTitle');
      expect(titles[1]).toBeInTheDocument();
    });
    it('Enter Old Password', async () => {
      const oldPasswordInput = screen.getByText('ChangePassword_OldPasswordInputTitle');
      expect(oldPasswordInput).toBeInTheDocument();
    });
    it('Enter New Password', async () => {
      const newPasswordInput = screen.getByText('ChangePassword_NewPasswordInputTitle');
      expect(newPasswordInput).toBeInTheDocument();
    });
    it('ReType New Password', async () => {
      const newPasswordInput = screen.getByText('ChangePassword_RetypeNewPasswordInputTitle');
      expect(newPasswordInput).toBeInTheDocument();
    });
    it('Cancel button', async () => {
      const cancelButton = screen.getByText('ChangePassword_CancelButtonTitle');
      expect(cancelButton).toBeInTheDocument();
    });
    it('Save button', async () => {
      const saveButton = screen.getByText('ChangePassword_SaveButtonTitle');
      expect(saveButton).toBeInTheDocument();
    });
  });
});
