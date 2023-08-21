import { ComponentProps } from 'lib/component-props';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export type ReplicatorSiteNameProps = ComponentProps & {
  fields: {
    Description: Field<string>;
  };
};
