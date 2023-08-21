import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import BannerComponent, { BannerProps } from 'core/molecules/Banner';

const Banner = (props: BannerProps): JSX.Element => {
  return <BannerComponent {...props} />;
};

export default withDatasourceCheck()<BannerProps>(Banner);
