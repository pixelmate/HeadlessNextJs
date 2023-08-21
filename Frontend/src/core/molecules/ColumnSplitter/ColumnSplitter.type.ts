import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type ColumnSplitterProps = ComponentProps & {
  params: {
    GapSize: string;
    IsFullWidthDeviceSpecific: string;
    BackgroundColorContrast: string;
    ColumnSize: string;
    Alignment: string;
  };
  fields: {
    Image: ImageField;
    MobileImage: ImageField;
  };
};
