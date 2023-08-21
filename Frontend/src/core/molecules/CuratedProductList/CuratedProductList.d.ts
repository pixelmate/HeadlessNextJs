import { Field, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type CuratedProductListProps = ComponentProps & {
  params: {
    Variation: string;
    Alignment?: string;
  };
  fields: {
    Title: Field<string>;
    Link: LinkField;
    ProductCardList: ProductCardList[];
  };
};

export type ProductCardList = {
  id: string;
  fields: {
    BackgroundColorContrast: ColorFields;
    Product: {
      url: string;
      fields: {
        Description: Text<string>;
        Title: Field<string>;
        Image: ImageField;
      };
    };
  };
};
