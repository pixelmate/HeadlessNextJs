import { ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type ConfigurableCTAProps = ComponentProps & {
  params: {
    CtaIconAlignment: string;
    CtaColorContrast: string;
    CtaStyle: string;
    CtaAlignment: string;
  };
  fields: {
    Icon: ImageField;
    Link: LinkField;
  };
};
