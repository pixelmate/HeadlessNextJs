import { ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

export type SubNavigationSectionLinksProps = {
  sectionLinks: {
    fields: {
      Link: LinkField;
      SectionIcon: ImageField;
      SectionLinks: SubNavigationSectionLink[];
    };
  };
};

export type SubNavigationSectionLink = {
  id: string;
  fields: {
    Link: LinkField;
  };
};
