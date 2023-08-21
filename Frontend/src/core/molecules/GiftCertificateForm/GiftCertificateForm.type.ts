import { ComponentProps } from 'lib/component-props';
import { LinkField, Field } from '@sitecore-jss/sitecore-jss-nextjs';

export type GiftCertificateFormProps = ComponentProps & {
  fields: {
    Link: LinkField;
    ApiEndpoint?: {
      fields: {
        Value: Field<string>;
      };
    };
  };
  params: {
    BackgroundColorContrast: string;
    Variation: string;
  };
};

export type GiftCertificateFormData = {
  recipient: string;
  recipientEmail: string;
  sender: string;
  message: string;
  amount: number;
};
