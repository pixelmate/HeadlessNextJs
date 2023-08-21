import { Item } from '@sitecore-jss/sitecore-jss-nextjs';
import { NextSeoProps } from 'next-seo';

export type ImageData = {
  src: string;
  alt: string;
};

export interface SeoProps extends NextSeoProps {
  url?: string;
  images?: ImageData[];
  keywords?: string;
}

export type FieldType = Item & {
  value: string | ImageData | ImageData[];
};

export type StringItem = Item & {
  value: string;
};

export type ImageItem = Item & {
  value: ImageData | ImageData[];
};
