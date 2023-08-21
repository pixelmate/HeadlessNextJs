import { atom } from 'jotai';

type ValueType = string | number | (string | number)[] | { [key: string]: ValueType };
type ModalState = ValueType;

export const createModal = (type: string, data: ModalState, component?: JSX.Element) => ({
  type,
  data,
  component,
});
export const modalAtom = atom<ReturnType<typeof createModal> | null>(null);
