import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import FieldRepSignUpDetailsComponent, {
  FieldRepSignUpDetailsProps,
} from 'core/molecules/FieldRepSignUpDetails';

const FieldRepSignUpDetails = (props: FieldRepSignUpDetailsProps): JSX.Element => (
  <FieldRepSignUpDetailsComponent {...props} />
);

export default withDatasourceCheck()<FieldRepSignUpDetailsProps>(FieldRepSignUpDetails);
