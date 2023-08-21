import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type BlogSearchProps = ComponentProps & {
  fields: {
    ApiEndpoint: CustomFields;
    PageSize: ValueField;
  };
};

export type BlogSearchResultType = {
  ItemShortId: string;
  Title: string;
  Abstract: string;
  ItemUrl: string;
  Image: ImageField;
  MobileImage: ImageField;
};
