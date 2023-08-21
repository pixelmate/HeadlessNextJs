import { ComponentProps } from 'lib/component-props';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export type DeliveryOptionsProps = ComponentProps & {
  params?: {
    Variation?: string | undefined;
  };
  fields?: {
    Title?: Field<string>;
  };
};

export type ShippingInfoProps = {
  shippingRates: {
    RateList: RateListItems;
  };
  cart: ShippingDetails;
};

export type ContactLessPickupProps = {
  data: WareHouseItem[] | undefined;
  cart: ShippingDetails;
};

export type ShippingDetails = {
  xp: {
    [key: string]: string | number | boolean;
  };
};
export type DeliveryMethodUpdateModalProps = {
  showModal: boolean;
  handleClose: () => void;
  label: string;
};

export interface draftItem {
  carrierIndexID?: string;
  freePickUp?: boolean;
  warehouseID?: string;
  warehouseCity?: string;
  warehouseState?: string;
  stateName?: string;
  carrier?: string;
  carrierAccountId?: string;
  service?: string;
  shipmentId?: string;
  shippingCost?: string;
  estDeliveryDays?: string;
}
