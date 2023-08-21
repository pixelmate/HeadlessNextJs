import { ComponentProps } from 'lib/component-props';

export type GlobalSearchProps = ComponentProps & {
  fields: {
    ApiEndpoint: CustomFields;
    PageSize: ValueField;
  };
  pageNumber: number;
};

export type SearchResultItemProps = {
  ItemShortId?: string;
  Title: string;
  Abstract: string;
  ItemUrl: string;
};
