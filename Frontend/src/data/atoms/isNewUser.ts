import { atom } from 'jotai';

export const isNewUserAtom = atom(
  typeof window !== 'undefined' && window.localStorage.getItem('IS_NEW_USER') === 'true'
    ? true
    : false
);
