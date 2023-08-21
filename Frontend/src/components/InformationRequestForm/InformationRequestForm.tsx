import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import InformationRequestFormComponent, {
  type InformationRequestFormProps,
} from 'core/molecules/InformationRequestForm';

const InformationRequestForm = (props: InformationRequestFormProps): JSX.Element => {
  return <InformationRequestFormComponent {...props} />;
};

export default withDatasourceCheck()<InformationRequestFormProps>(InformationRequestForm);
