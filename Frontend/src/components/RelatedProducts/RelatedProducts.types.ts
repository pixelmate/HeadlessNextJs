import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

export type RelatedProductsProps = {
  fields: {
    Title: ValueField;
    RelatedProducts: {
      id: string;
      url: string;
      fields: {
        Title: ValueField;
        Image: ImageField;
      };
    }[];
  };
};
