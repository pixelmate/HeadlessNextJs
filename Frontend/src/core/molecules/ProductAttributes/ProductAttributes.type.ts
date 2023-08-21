import { Field, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type ProductAttributeProps = ComponentProps & {
  fields: {
    ApiEndpoint: Field;
    CommerceFeatures: ValueField;
    HideTrustPilotRatings: ValueField;
    ProductLinks: ProductLink[];
  };
  params: {
    Variant: string;
  };
};

export type ProductDetailAttributes = {
  Product: {
    ChildProducts: [
      {
        Id: string;
        IsAvailable: boolean;
        Name: string;
        Image: ImageField;
        Link: string;
        AutoshipProduct: boolean;
        Size: string;
        Xp: {
          CommissionType: string;
          CommissionableSale: number;
          ProductSKU: string;
          Scancode: string;
          AvalaraTaxCode: string;
          TableauProductName: string;
          TableauDivision: string;
          TableauSubdivision: string;
          TableauProductVariant: string;
          TableauProductLine: string;
        };
        PriceSchedules: PriceSchedule[];
      }
    ];
    Specs: null;
  };
};

export type PriceSchedule = {
  Id: string;
  Name: string;
  MinQuantity: number;
  MaxQuantity: number;
  PriceBreaks: [
    {
      Price: number;
    }
  ];
  Currency: string;
};

export type ChildProduct = {
  id: string;
  size: string;
  autoshipProduct: boolean;
  minQuantity: number;
  maxQuantity: number;
  price: number;
  autoshipMinQuantity: number;
  autoshipMaxQuantity: number;
  autoshipPrice: number;
  isAvailable: boolean;
};

export type ProductLink = {
  id?: string;
  displayName?: string;
  url?: string;
  name?: string;
  fields?: { Link?: LinkField };
};
