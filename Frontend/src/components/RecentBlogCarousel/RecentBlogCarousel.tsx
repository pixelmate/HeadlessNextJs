import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import RecentBlogCarouselComponent, {
  type RecentBlogCarouselProps,
} from 'core/molecules/RecentBlogCarousel';

const RecentBlogCarousel = (props: RecentBlogCarouselProps): JSX.Element => {
  return <RecentBlogCarouselComponent {...props} />;
};

export default withDatasourceCheck()<RecentBlogCarouselProps>(RecentBlogCarousel);
