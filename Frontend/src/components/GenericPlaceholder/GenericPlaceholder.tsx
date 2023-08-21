import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import GenericPlaceholderComponent, {
  GenericPlaceholderProps,
} from 'core/molecules/GenericPlaceholder';

const GenericPlaceholder = (props: GenericPlaceholderProps): JSX.Element => {
  return <GenericPlaceholderComponent {...props} />;
};

export default withDatasourceCheck()<GenericPlaceholderProps>(GenericPlaceholder);
