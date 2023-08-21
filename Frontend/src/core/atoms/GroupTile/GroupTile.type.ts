import { ReactNode } from 'react';

export type GroupTileProps = {
  children: ReactNode;
  btnLabel?: string;
  heading: string;
  handleBtn?: () => void;
};
