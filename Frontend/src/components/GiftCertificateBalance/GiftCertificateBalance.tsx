import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import GiftCertificateBalanceComponent from 'core/molecules/GiftCertificateBalance';

const GiftCertificateBalance = (): JSX.Element => {
  return <GiftCertificateBalanceComponent />;
};

export default withDatasourceCheck()(GiftCertificateBalance);
