import { Field, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type CheckoutHeaderProps = ComponentProps & {
  fields: {
    CheckoutHeaderCTA: LinkField;
    CheckoutHeaderLogo: ImageField;
    CheckoutHeaderRTE: ValueField;
    StepTitle: ValueField;
    TotalSteps: Field<number>;
    StepNumber: ValueField;
  };
};
