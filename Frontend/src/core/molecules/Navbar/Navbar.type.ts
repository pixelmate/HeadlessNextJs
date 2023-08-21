import { ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

export type NavbarProps = {
  MenuLinks: MenuLink[];
};

export type MenuLink = {
  id: string;
  fields: {
    PromotionalBanner: PromotionalBanner;
    Link: LinkField;
    MenuSubLinks: MenuSubLink[];
  };
};

export type MenuSubLink = {
  id: string;
  fields: {
    SectionIcon: ImageField;
    Link: LinkField;
    SectionLinks: SectionLink[];
  };
};

export type SectionLink = {
  id: string;
  fields: {
    Link: LinkField;
  };
};

export type PromotionalBanner = {
  fields: {
    Image: ImageField;
    Link: LinkField;
    MobileImage: ImageField;
  };
};
