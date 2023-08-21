import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import StarterKitPackSelectionComponent, {
  StarterKitPackSelectionProps,
} from 'core/molecules/StarterKitPackSelection';

const StarterKitPackSelection = (props: StarterKitPackSelectionProps): JSX.Element => (
  <StarterKitPackSelectionComponent {...props} />
);

export default withDatasourceCheck()<StarterKitPackSelectionProps>(StarterKitPackSelection);
