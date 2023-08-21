import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import ResetPasswordComponent, { ResetPasswordProps } from 'core/molecules/ResetPassword';

const ResetPassword = (props: ResetPasswordProps): JSX.Element => {
  return <ResetPasswordComponent {...props} />;
};

export default withDatasourceCheck()<ResetPasswordProps>(ResetPassword);
