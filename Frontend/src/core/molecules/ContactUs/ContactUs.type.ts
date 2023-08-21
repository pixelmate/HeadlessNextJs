import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type ContactUsProps = ComponentProps & {
  fields: {
    BackgroundImage: ImageField;
    FailureMessage: ValueField;
    FeaturedContentFooter: ValueField;
    FeaturedContentHeader: ValueField;
    SuccessMessage: ValueField;
  };
};

export type FormValues = {
  email: string;
  message: string;
};
