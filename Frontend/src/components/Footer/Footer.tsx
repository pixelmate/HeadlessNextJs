import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import FooterComponent, { type FooterProps } from 'core/molecules/Footer';

const Footer = (props: FooterProps): JSX.Element => {
  return <FooterComponent {...props} />;
};

export default withDatasourceCheck()<FooterProps>(Footer);
