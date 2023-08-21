import { LinkField, Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { Dispatch, SetStateAction } from 'react';

export type ProductListingGridProps = ComponentProps & {
  fields: {
    CheckoutCTA: LinkField;
    CartEmptyCTA: LinkField;
    Title: Field<string>;
    DeleteCartLineItem: {
      fields: {
        Value: Field<string>;
      };
    };
    UpdateCartLineItem: {
      fields: {
        Value: Field<string>;
      };
    };
    ApiEndpoint?: {
      fields: {
        Value: Field<string>;
      };
    };
  };
};

export type ProductListingItemProps = {
  name: string | undefined;
  id: string | undefined;
  image: ImageField;
  link: string | undefined;
  itemQuantity: number | undefined;
  price: number | undefined;
  maxQuantity: number;
  minQuantity: number;
  errorInItems: Item[];
  updateInItems?: Item[];
  setErrorInItems: Dispatch<SetStateAction<Item[]>>;
  setUpdateInItems: Dispatch<SetStateAction<Item[]>>;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, quantity: number) => void;
};

export type Item = {
  name?: string;
  quantity?: number;
  id?: string;
};
