import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export type CheckoutStepsProps = {
  title?: ValueField;
  stepNumber: ValueField;
  totalSteps: Field<number>;
};
