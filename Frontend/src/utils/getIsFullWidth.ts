const FLUID_MAP = {
  'true-true-true': 'container-xxl',
  'true-true-false': 'container-lg',
  'true-false-true': 'container-md container full_width_lg',
  'true-false-false': 'full_width_sm container',
  'false-true-true': 'container full_width_md full_width_lg',
  'false-true-false': 'container full_width_md',
  'false-false-true': 'container full_width_lg',
  'false-false-false': 'container',
};

export type FluidType = keyof typeof FLUID_MAP;

const getIsFullWidth = (property: FluidType) => FLUID_MAP[property] || 'container-xxl';

export default getIsFullWidth;
