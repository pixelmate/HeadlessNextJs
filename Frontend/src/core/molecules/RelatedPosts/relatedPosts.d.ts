import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export interface RelatedBlogs {
  url: string;
  fields: {
    Title: Field<string>;
  };
}

export type RelatedPostsProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    RelatedBlogs: RelatedBlogs[];
  };
};
