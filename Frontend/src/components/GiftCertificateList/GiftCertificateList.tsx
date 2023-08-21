import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import GiftCertificateListComponent, {
  GiftCertificateListProps,
} from 'core/molecules/GiftCertificateList';

const GiftCertificateList = (props: GiftCertificateListProps): JSX.Element => {
  return <GiftCertificateListComponent {...props} />;
};

export default withDatasourceCheck()<GiftCertificateListProps>(GiftCertificateList);
