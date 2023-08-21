import { ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { MenuSubLink } from '../../molecules/Navbar/Navbar.type';

export type SubLinksProps = {
  menuSubLinks: MenuSubLink[];
  Link: LinkField;
  PromotionalBanner: {
    fields: {
      Image: ImageField;
      Link: LinkField;
    };
  };
};
