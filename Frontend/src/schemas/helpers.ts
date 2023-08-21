export const mapQueryOptions = (query?: RequestQuery) => {
  if (query) {
    return Object.keys(query).reduce(
      (acc, key) => ({
        ...acc,
        [key]: query[key],
      }),
      {}
    );
  }
  return {};
};
