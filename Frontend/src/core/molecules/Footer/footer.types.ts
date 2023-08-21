import { Field, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type ComponentBaseType = {
  id: string;
  name: string;
  displayName: string;
  url: string;
  fields: {
    [key: string]: string;
  };
};

export type NavLink = ComponentBaseType & {
  fields: {
    Link: LinkField;
  };
};

export type MenuItem = ComponentBaseType & {
  fields: {
    Links: NavLink[];
    Submenus: MenuItem[];
    Title: Field<string>;
  };
};

export type SocialMediaHandle = ComponentBaseType & {
  fields: {
    Image: ImageField;
    Link: LinkField;
  };
};

export type FooterProps = ComponentProps & {
  fields: {
    SocialMediaHandles: SocialMediaHandle[];
    Menu: MenuItem[];
    TrustPilotBusinessUnitId: Field<string>;
    TrustBadges: SocialMediaHandle[];
  };
};
