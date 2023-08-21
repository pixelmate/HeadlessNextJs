import { RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type BasicInformationProps = ComponentProps & {
  fields: {
    InformationText: RichTextField;
  };
};
