import { ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

export type NotificationBannerType = {
  Icon: ImageField;
  Description: string;
  Link: LinkField;
  BackgroundColorContrast: ColorFields;
  CtaColorContrast: ColorFields;
};
