import dynamic from 'next/dynamic';
import { NextComponentType } from 'next';
import type { PanelProps } from 'core/molecules/Panel';

const Modern = dynamic(() => import('core/molecules/Panel/Modern'));
const Classic = dynamic(() => import('core/molecules/Panel/Classic'));

const MAP_THEME_TO_PANEL: Record<string, NextComponentType> = {
  Classic,
  Modern,
};

const Panel = (props: PanelProps): JSX.Element => {
  const Component = props?.params?.Variation
    ? MAP_THEME_TO_PANEL[props?.params?.Variation]
    : Classic;

  return <Component {...props} />;
};

export default Panel;
