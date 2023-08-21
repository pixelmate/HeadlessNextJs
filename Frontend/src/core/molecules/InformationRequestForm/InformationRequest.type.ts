import { Field, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type InformationRequestFormProps = ComponentProps & {
  fields: {
    BackgroundImage: ImageField;
    RequestFormRTE: Field<string>;
    RedirectOnSuccessUrl: LinkField;
    BestTimeToCall: TimeToCall_Zone[];
    TimeZone: TimeToCall_Zone[];
    ApiEndpoint: CustomFields;
  };
};

export type FormSubmitData = {
  apiEndPoint: string;
  formData: InformationRequestFormInput;
};
