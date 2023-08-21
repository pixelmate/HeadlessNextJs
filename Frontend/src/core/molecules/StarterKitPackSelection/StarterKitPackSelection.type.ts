import { Item, LinkField, RichTextField, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export interface ProductItem extends Omit<Item, 'fields'> {
  fields: {
    ProductId: { value: string };
  };
}
export type StarterKitPackSelectionProps = ComponentProps & {
  fields: {
    AgreementText: RichTextField;
    SignUpCTA: LinkField;
    ApiEndpoint: ProductItem;
    MandatoryProduct: ProductItem;
    MandatoryProductTitle: TextField;
    OptionalProducts: ProductItem[];
    OptionalProductsTitle: TextField;
    TermsAndConditions: TextField;
    Title: TextField;
  };
  params: {
    IsFullWidth?: string;
  };
};
