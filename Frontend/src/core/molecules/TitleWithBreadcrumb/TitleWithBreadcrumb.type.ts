import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type TitleWithBreadcrumbProps = ComponentProps & {
  fields: {
    BreadcrumbTitle: ValueField;
    Title: Field<string>;
  };
  params: {
    Variant: string;
  };
};

export type BreadCrumb = {
  title: string;
  url: string;
};
