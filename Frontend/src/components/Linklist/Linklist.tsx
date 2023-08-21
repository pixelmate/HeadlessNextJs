import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import LinklistComponent, { LinklistProps } from 'core/molecules/Linklist';

const Linklist = (props: LinklistProps): JSX.Element => <LinklistComponent {...props} />;

export default withDatasourceCheck()<LinklistProps>(Linklist);
