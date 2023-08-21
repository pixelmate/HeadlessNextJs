import { LinkField, Field, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type SignUpFormProps = ComponentProps & {
  params: {
    IsGoogleRecaptchaEnabled: string;
    SiteKey: string;
  };
  fields: {
    RecaptchaDisclaimerMessage: RichTextField;
    SuccessCallback: LinkField;
    ApiEndpoint?: {
      fields: {
        Value: Field<string>;
      };
    };
  };
};
