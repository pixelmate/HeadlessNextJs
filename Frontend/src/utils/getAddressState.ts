import { SelectValue } from 'core/atoms/Forms/components/SelectField/SelectField.type';

export const getDefaultSelectedState = (
  options: SelectValue<string, RegionItem>[],
  data: AddressItem
): string => {
  const state = data?.State?.toLocaleLowerCase();
  if (options.length > 0 && state) {
    return (
      options.find(
        (item) =>
          item.title?.toLocaleLowerCase() === state ||
          item.data?.code?.value.toLocaleLowerCase() === state
      )?.value || ''
    );
  }
  return '';
};

export const getMappedStateOptions = (data: RegionItem[]): SelectValue<string, RegionItem>[] => {
  const options: SelectValue<string, RegionItem>[] = data.map((item) => {
    return {
      title: item.name_c1d60e037d5a4c45a67b498684d40990.value,
      value: item.code.value,
      data: item,
    };
  });
  return options;
};
