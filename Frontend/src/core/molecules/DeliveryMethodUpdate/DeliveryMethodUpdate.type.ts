import { TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type DeliveryMethodProps = ComponentProps & {
  fields: { Title: TextField };
};
