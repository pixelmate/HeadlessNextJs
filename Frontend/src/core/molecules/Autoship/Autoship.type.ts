import { ComponentProps } from 'lib/component-props';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export type AutoshipProps = ComponentProps & {
  fields: {
    ApiEndpoint?: {
      fields: {
        Value: Field<string>;
      };
    };
    AutoshipBenefits: AutoshipBenefit[];
    AutoshipCheckedText: Field<string>;
    AutoshipUncheckedText: Field<string>;
    BenefitsAlignment: {
      fields: {
        Value: Field<string>;
      };
    };
    FrequencyValidationRequired: Field<boolean>;
  };
  params: {
    Variation: string;
    IsFullWidth: string;
  };
};

type AutoshipBenefit = {
  id: string;
  fields: {
    Title: Field<string>;
  };
};

export type AutoshipFrequencyType = {
  name: string;
  value: string;
};

export type AutoshipModalProps = {
  showModal: boolean;
  handleClose: () => void;
  label: string;
  apiUrl?: string;
};
