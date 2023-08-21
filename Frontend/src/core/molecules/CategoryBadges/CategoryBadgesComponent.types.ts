import { ComponentProps } from 'lib/component-props';

export type CategoryBadgesProps = ComponentProps & {
  fields: {
    Badges: IconField[];
  };
};
