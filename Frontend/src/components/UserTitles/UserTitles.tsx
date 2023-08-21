import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import UserTitlesComponent, { type UserTitlesProps } from 'core/molecules/UserTitles';

const UserTitles = (props: UserTitlesProps): JSX.Element => {
  return <UserTitlesComponent {...props} />;
};

export default withDatasourceCheck()<UserTitlesProps>(UserTitles);
