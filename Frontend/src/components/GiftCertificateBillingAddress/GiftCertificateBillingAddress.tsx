import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import GiftCertificateBillingAddressComponent, {
  type GiftCertificateBillingAddressProps,
} from 'core/molecules/GiftCertificateBillingAddress';

const GiftCertificateBillingAddress = (props: GiftCertificateBillingAddressProps): JSX.Element => {
  return <GiftCertificateBillingAddressComponent {...props} />;
};

export default withDatasourceCheck()<GiftCertificateBillingAddressProps>(
  GiftCertificateBillingAddress
);
