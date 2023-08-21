import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import ChangePasswordComponent, { ChangePasswordProps } from 'core/molecules/ChangePassword';

const ChangePassword = (props: ChangePasswordProps): JSX.Element => (
  <ChangePasswordComponent {...props} />
);

export default withDatasourceCheck()(ChangePassword);
