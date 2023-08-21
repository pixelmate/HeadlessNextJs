import { Field, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type BlogFacetsProps = ComponentProps & {
  fields: {
    ApiEndpoint: {
      id: string;
      fields: {
        Value: Field<string>;
      };
    };
    SearchPage: LinkField;
  };
};

export type category = {
  FacetTitle: string;
  AggregateCount: number;
  FacetQueryValue: string;
};
