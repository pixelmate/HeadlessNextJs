export enum PET_SIZE {
  S = 'S',
  M = 'M',
  L = 'L',
  E = 'E',
}

export enum BAG_SIZE {
  S = 'small',
  M = 'medium',
  L = 'large',
}

export const MIN_DAYS = 30;
export const MAX_DAYS = 70;

export const WEIGHT_LIMITS = {
  [PET_SIZE.S]: 60,
  [PET_SIZE.M]: 100,
  [PET_SIZE.L]: 200,
  [PET_SIZE.E]: 200,
};

export const WEIGHT_ERROR_MESSAGES = {
  [PET_SIZE.S]: 'Small pet weight should be up to 60 lbs',
  [PET_SIZE.M]: 'More than 6 months pet weight should be up to 100 lbs',
  [PET_SIZE.L]: 'Adult pets weight should be up to 200 lbs',
  [PET_SIZE.E]: 'Pet weight should be up to 200 lbs',
};
