import { ReactNode } from 'react';

export type PanelProps = {
  panelTitle: string;
  children: ReactNode;
  panelType?: string;
};

export type DPanelProps = {
  panelTitle: string;
  children: ReactNode;
  bgColorContrast?: {
    name: string;
  };
};
