import { LinkField, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type SignUpFormProps = ComponentProps & {
  params: {
    IsGoogleRecaptchaEnabled: string;
    SiteKey: string;
  };
  fields: {
    SuccessCallback: LinkField;
    ApiEndpoint?: {
      fields: {
        Value: Field<string>;
      };
    };
  };
};
