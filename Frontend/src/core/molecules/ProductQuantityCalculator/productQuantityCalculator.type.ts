import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { BAG_SIZE, PET_SIZE } from 'constants/calculator';
import { ComponentProps } from 'lib/component-props';

export type ProductQuantityCalculatorProps = ComponentProps & {
  fields: {
    Variation: CustomFields;
    PetServingSize: {
      value: [
        {
          key: string;
          value: string;
        }
      ];
    };
    CalculatorSettings: CalculatorSetting[];
    Options: {
      value: [
        {
          key: string;
          value: string;
        }
      ];
    };
    Title: Field<string>;
  };
};

export type PetSize = keyof typeof PET_SIZE;
export type Pet = { petWeight: number; petSize: PetSize };
export type Bag = { productSize: number; numberOfDays: number };
export type DailyServingMatrix = {
  [key in PetSize]: {
    min: number;
    max: number | null;
    dailyServing: number;
  }[];
};

export type DailyDosageMatrix = {
  [key in PetSize]: {
    min: number;
    max: number | null;
    doseWeekOne: number;
    doseAfterWeekOne: number;
  }[];
};
export type ProductSize = BAG_SIZE;
export type ProductItem = { numOfDays: number };

export type ProductDosing = {
  sbg: number;
  mbg: number;
  lbg: number;
  sbgCups: number;
  mbgCups: number;
  lbgCups: number;
};

export type Options = {
  S: string;
  M: string;
  L: string;
};

export type CalculatorSetting = {
  id: string;
  name: string;
  fields: {
    Dosage: Dosage[];
    Servings: Servings[];
    Size: CustomFields;
  };
};

export type Dosage = {
  id: string;
  name: string;
  fields: {
    MinVal: {
      value: number;
    };
    MaxVal: {
      value: number;
    };
    DoseWeekOne: {
      value: number;
    };
    DoseAfterWeekOne: {
      value: number;
    };
  };
};

export type Servings = {
  id: string;
  name: string;
  fields: {
    MaxVal: {
      value: number;
    };
    MinVal: {
      value: number;
    };
    ServingSize: {
      value: number;
    };
  };
};
