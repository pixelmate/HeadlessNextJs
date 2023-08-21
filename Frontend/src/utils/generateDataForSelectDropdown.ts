type extractKeyValuePairsReturnType = {
  key: string;
  value: string;
};

export const extractKeyValuePairs = (data: TimeToCall_Zone[]): extractKeyValuePairsReturnType[] => {
  return data.reduce((acc: extractKeyValuePairsReturnType[], option) => {
    const { displayName, fields } = option;
    const value = fields?.Value?.value;
    if (value !== undefined) {
      return [...acc, { key: displayName, value }];
    }
    return acc;
  }, []);
};
