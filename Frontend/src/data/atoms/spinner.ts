import { atom } from 'jotai';

export const createSpinner = (title: string) => ({ title });

export const spinnerAtom = atom<ReturnType<typeof createSpinner> | null>(null);
