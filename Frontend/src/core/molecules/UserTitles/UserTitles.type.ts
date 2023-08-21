import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type UserTitlesProps = ComponentProps & {
  fields: {
    Title: Field<string>;
  };
};
