import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import ContactUsComponent, { ContactUsProps } from 'core/molecules/ContactUs';

const ContactUs = (props: ContactUsProps): JSX.Element => {
  return <ContactUsComponent {...props} />;
};

export default withDatasourceCheck()<ContactUsProps>(ContactUs);
