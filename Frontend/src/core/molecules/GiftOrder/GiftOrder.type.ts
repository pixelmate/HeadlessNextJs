import { TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type GiftOrderProps = ComponentProps & {
  fields: { Title: TextField };
  params: { IsFullWidth: string; Variant: string };
};
