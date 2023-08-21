import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

export type FeatureLinkListProps = {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    Features: Feature[];
    Image: ImageField;
  };
  params: {
    BackgroundColorContrast: string;
  };
};

export type Feature = {
  id: string;
  fields: {
    Value: Field<string>;
  };
};
