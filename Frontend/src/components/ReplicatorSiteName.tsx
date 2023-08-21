import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import ReplicatorSiteNameComponent, {
  ReplicatorSiteNameProps,
} from 'core/molecules/ReplicatorSiteName';

const ReplicatorSiteName = (props: ReplicatorSiteNameProps): JSX.Element => {
  return <ReplicatorSiteNameComponent {...props} />;
};

export default withDatasourceCheck()<ReplicatorSiteNameProps>(ReplicatorSiteName);
