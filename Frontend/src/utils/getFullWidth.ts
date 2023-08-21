import { DEFAULT_IS_FULLWIDTH, IS_FULLWIDTH } from 'constants/alignment';

const getFullWidth = (fullWidth: string) => {
  const isFullWidth = fullWidth ? fullWidth : DEFAULT_IS_FULLWIDTH;
  return isFullWidth !== IS_FULLWIDTH ? 'container p-0' : '';
};

export default getFullWidth;
