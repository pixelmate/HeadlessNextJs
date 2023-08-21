export const getValuesFromQueryString = (key: string) => {
  let queryString;
  if (typeof location !== 'undefined') {
    queryString = (location !== undefined && location?.search) || '';
  }
  const searchParams = new URLSearchParams(queryString);
  return searchParams.get(key) || '';
};
