import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import RelatedPost from 'core/molecules/RelatedPosts/RelatedPost';
import { RelatedPostsProps } from 'core/molecules/RelatedPosts/relatedPosts';

const RelatedPosts = (props: RelatedPostsProps): JSX.Element => {
  return <RelatedPost {...props} />;
};

export default withDatasourceCheck()<RelatedPostsProps>(RelatedPosts);
