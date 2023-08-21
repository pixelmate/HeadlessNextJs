import { ComponentProps } from 'lib/component-props';

export type ResetPasswordProps = ComponentProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: {
    RedirectOnSuccessUrl: {
      value: {
        href: string;
        linktype: string;
      };
    };
  };
};

export interface ResetPasswordSchemas {
  password: string;
  confirmedPassword: string;
}
