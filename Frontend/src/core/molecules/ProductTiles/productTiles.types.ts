import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type ProductTilesProps = ComponentProps & {
  fields: {
    ApiEndpoint: ApiEndpoint;
    CategoryId: CategoryId[];
  };
  params: {
    Variation?: string;
    TextAlignment?: string;
    BackgroundColorContrast?: string;
    CtaColorContrast?: string;
    PriceTextColor?: string;
  };
};

type ApiEndpoint = {
  id: string;
  url: string;
  fields: Fields;
};

type Fields = {
  Value: Field<string>;
};

type CategoryId = {
  id: string;
  url: string;
  fields: object;
};
