import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import ForgotPasswordComponent, { ForgotUsernameProps } from 'core/molecules/ForgotUsername';

const ForgotUsername = (props: ForgotUsernameProps): JSX.Element => {
  return <ForgotPasswordComponent {...props} />;
};

export default withDatasourceCheck()<ForgotUsernameProps>(ForgotUsername);
