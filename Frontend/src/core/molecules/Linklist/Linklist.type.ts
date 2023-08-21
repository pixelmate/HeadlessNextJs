import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type LinklistProps = ComponentProps & {
  fields: {
    Links: Link[];
  };
};

type Link = {
  id: string;
  fields: {
    Link: LinkField;
  };
};
