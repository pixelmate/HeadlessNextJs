import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export type AutoshipOrderSummaryProps = {
  params: {
    IsFullWidth: string;
  };
  fields: {
    BeforeYouGo: string;
    ApiEndpoint?: {
      fields: {
        Value: Field<string>;
      };
    };
  };
};
