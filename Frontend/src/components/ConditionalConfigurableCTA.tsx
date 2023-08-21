import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ConditionalConfigurableCTAProps } from 'core/molecules/ConditionalConfigurableCTA';
import dynamic from 'next/dynamic';

const ConditionalConfigurableCTA = dynamic(
  () => import('core/molecules/ConditionalConfigurableCTA'),
  {
    ssr: false,
  }
);

export default withDatasourceCheck()<ConditionalConfigurableCTAProps>(ConditionalConfigurableCTA);
