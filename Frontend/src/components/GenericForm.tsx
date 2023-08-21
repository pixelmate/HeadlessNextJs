import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { GenericForm as GenericFormComponent, GenericFormProps } from 'core/molecules/GenericForm';

const GenericForm = (props: GenericFormProps): JSX.Element => <GenericFormComponent {...props} />;

export default withDatasourceCheck()<GenericFormProps>(GenericForm);
