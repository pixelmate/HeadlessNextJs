import { ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

export type ImageLinkItem = {
  image: ImageField;
  link: LinkField;
  className?: string;
};

export type ImageLinkField = {
  id: string;
  fields: {
    Image: ImageField;
    Link: LinkField;
  };
};

export type ImageLinkListProps = {
  items: ImageLinkField[];
  className?: string;
};
