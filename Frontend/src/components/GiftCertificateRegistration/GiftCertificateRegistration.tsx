import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import GiftCertificateRegistrationComponent, {
  type GiftCertificateRegistrationProps,
} from 'core/molecules/GiftCertificateRegistration';

const GiftCertificateRegistration = (props: GiftCertificateRegistrationProps): JSX.Element => {
  return <GiftCertificateRegistrationComponent {...props} />;
};

export default withDatasourceCheck()(GiftCertificateRegistration);
