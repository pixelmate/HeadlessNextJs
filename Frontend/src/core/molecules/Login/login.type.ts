import { Field, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type LoginProps = ComponentProps & {
  params: {
    CTAAlignment: string;
  };
  fields: {
    TabTitle: Field<string>;
    Title?: Field<string>;
    PostLoginUrl: LinkField;
    ComponentTitle: Field<string>;
    ForgetUserameorPasswordLink: LinkField;
  };
};
