import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type GiftCertificateListProps = ComponentProps & {
  fields: {
    Description: ValueField;
    Link: LinkField;
  };
};
export type GiftCardItemProps = {
  row: GiftCardItem;
  link: LinkField;
};
