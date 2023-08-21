import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type ProductHighlightsProps = ComponentProps & {
  fields: {
    Title: ValueField;
    SubTitle: ValueField;
    Image: ImageField;
    HideTrustPilotRatings: {
      value: boolean;
    };
  };
};

export type Tag = {
  id: string;
  url: string;
  name: string;
  fields: {
    Value: ValueField;
  };
};

export type TrustpilotType = {
  TrustpilotId: ValueField;
};
