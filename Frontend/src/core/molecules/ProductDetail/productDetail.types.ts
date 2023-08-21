import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type ProductDetailProps = ComponentProps & {
  fields: {
    HideTrustPilot: {
      value: boolean;
    };
    Variation: CustomFields;
    ProductMediaGallery: ProductMediaGalleryItem[];
    CommerceFeatures: Field<string>;
  };
};

export type BreadCrumb = {
  title: string;
  url: string;
};

export type ProductMediaGalleryItem = {
  id: string;
  fields: {
    Image: ImageField;
    VideoLink: {
      value: string;
    };
  };
};

export type ProductDetailAttributes = {
  Product: {
    ChildProducts: [
      {
        Id: string;
        IsAvailable: boolean;
        Name: string;
        AutoshipProduct: boolean;
        Image: ImageField;
        Link: string;
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
};

export type ProductAttributesProps = {
  commerceFeatures: Field<string>;
};

export type ProductTile = {
  Id: string;
  ParentId?: string;
  Description: string;
  Name: string;
  Image: ImageField;
  Link?: string;
  IsAvailable: boolean;
  AutoshipProduct?: boolean;
  Size?: string;
  Xp: {
    CommissionType?: string;
    CommissionableSale?: number;
    ProductSKU?: string;
    Scancode?: string;
    AvalaraTaxCode?: string;
    TableauProductName?: string;
    TableauDivision?: string;
    TableauSubdivision?: string;
    TableauProductVariant?: string;
    TableauProductLine?: string;
  };
  Price?: number;
};
