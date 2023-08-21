import { PartialDeep } from 'ordercloud-javascript-sdk';
import { ProductLink } from '../ProductAttributes/ProductAttributes.type';

export type ProductVariationSelectProps = {
  productLinks: PartialDeep<ProductLink[]>;
};
