import { DEFAULT_AUTOSHIP_PERIOD } from 'constants/autoship';

export const initialAutoshipUser: AutoshipUser = {
  xp: {
    autoshipFrequency: DEFAULT_AUTOSHIP_PERIOD,
    IsAutoShip: false,
  },
};
