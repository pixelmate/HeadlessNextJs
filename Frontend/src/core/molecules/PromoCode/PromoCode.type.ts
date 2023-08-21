import { ComponentProps } from 'lib/component-props';

export type PromoCodeProps = ComponentProps & {
  params: {
    Variation: string;
  };
};
