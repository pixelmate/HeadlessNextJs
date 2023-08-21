import { ComponentProps } from 'lib/component-props';

export type ForgotUsernameProps = ComponentProps & {
  params?: {
    IsFullWidth: string;
  };
};

export interface ForgotUsernameSchemas {
  email: string;
}
