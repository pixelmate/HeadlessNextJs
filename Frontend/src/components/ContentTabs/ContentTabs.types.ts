import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { TabComponentType } from '../../core/molecules/TabComponent/TabComponent.type';

export type ContentTabsProps = {
  fields: {
    Variation: {
      fields: { Value: Field<string> };
    };
    TabsList: TabComponentType[];
  };
};
