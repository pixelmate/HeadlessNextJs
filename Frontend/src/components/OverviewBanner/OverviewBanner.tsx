import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { OverviewBannerProps } from 'core/molecules/OverviewBanner/overviewBanner.type';
import OverviewBannerComponent from 'core/molecules/OverviewBanner';

const OverviewBanner = (props: OverviewBannerProps): JSX.Element => {
  return <OverviewBannerComponent {...props} />;
};

export default withDatasourceCheck()<OverviewBannerProps>(OverviewBanner);
