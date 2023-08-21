import { ComponentProps } from 'lib/component-props';

export type ForgotPasswordProps = ComponentProps & {
  fields: {
    PasswordResetUrl: {
      value: {
        href: string;
        linktype: string;
      };
    };
    RedirectOnSuccessUrl: {
      value: {
        href: string;
        linktype: string;
      };
    };
  };
  params: {
    IsFullWidth: string;
  };
};

export interface ForgotPasswordSchemas {
  username: string;
}
