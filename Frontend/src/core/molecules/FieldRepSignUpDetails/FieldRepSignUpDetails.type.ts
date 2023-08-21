import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type FieldRepSignUpDetailsProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    Description: Field<string>;
    Title: Field<string>;
  };
  params: {
    IsFullWidth: string;
  };
};
