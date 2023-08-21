import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type ChangePasswordProps = ComponentProps & {
  fields: {
    CancelLink: LinkField;
    RedirectOnSuccessUrl: LinkField;
  };
};
