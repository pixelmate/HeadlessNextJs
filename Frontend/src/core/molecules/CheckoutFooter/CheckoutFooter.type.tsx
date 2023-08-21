import { ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type CheckoutFooterProps = ComponentProps & {
  fields: {
    ContinueCta: LinkField;
    EditCta: LinkField;
    Image: ImageField;
  };
};
