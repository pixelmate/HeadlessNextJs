import { Field, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export interface CardList {
  id: string;
  fields: {
    Description: Field<string>;
    Icon: ImageField;
    Image: ImageField;
    Link: LinkField;
    Title: Field<string>;
    SubTitle: Field<string>;
  };
}

export type CardListProps = ComponentProps & {
  params: {
    Variation: string;
    CardTitleFontColor: string;
    CardSize: string;
    BackgroundColorContrast: string;
    CardColorContrast: string;
    CardCtaColorContrast: string;
    CtaColorContrast: string;
    CtaStyle: string;
    CtaAlignment: string;
    CardImageAlignment: string;
    CardCtaAlignment: string;
  };
  fields: {
    SubTitle: Field<string>;
    Title: Field<string>;
    Description: Field<string>;
    Image: ImageField;
    Link: LinkField;
    CardList: CardList[];
  };
};
