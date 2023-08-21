import dynamic from 'next/dynamic';
import { NextComponentType } from 'next';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ConfigurableCTAProps } from 'core/molecules/CtaComponent/CtaComponent.types';
const Link = dynamic(() => import('core/molecules/CtaComponent/CtaLink'));
const Button = dynamic(() => import('core/molecules/CtaComponent/CtaButton'));

const MAP_THEME_TO_CONFIGURE_CTA: Record<string, NextComponentType> = {
  link: Link,
  button: Button,
};

const ConfigurableCTA = (props: ConfigurableCTAProps): JSX.Element => {
  const Component = props?.params?.CtaStyle
    ? MAP_THEME_TO_CONFIGURE_CTA[props?.params?.CtaStyle]
    : Button;

  return <Component {...props} />;
};

export default withDatasourceCheck()<ConfigurableCTAProps>(ConfigurableCTA);
