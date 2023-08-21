import dynamic from 'next/dynamic';
import { NextComponentType } from 'next';
import { AutoshipProps } from 'core/molecules/Autoship';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';

const AutoshipUpdate = dynamic(() => import('core/molecules/Autoship/AutoshipUpdate'), {
  ssr: false,
});

const AutoshipAdd = dynamic(() => import('core/molecules/Autoship/AutoshipAdd'), {
  ssr: false,
});

const MAP_ACTION_TO_AUTOSHIP: Record<string, NextComponentType> = {
  Add: AutoshipAdd,
  Update: AutoshipUpdate,
};

const Autoship = (props: AutoshipProps): JSX.Element => {
  const Component = props?.params?.Variation
    ? MAP_ACTION_TO_AUTOSHIP[props?.params?.Variation]
    : AutoshipAdd;

  return <Component {...props} />;
};

export default withDatasourceCheck()<AutoshipProps>(Autoship);
