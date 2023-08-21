import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import BasicInformationComponent, {
  type BasicInformationProps,
} from 'core/molecules/BasicInformation';

const BasicInformation = (props: BasicInformationProps): JSX.Element => {
  return <BasicInformationComponent {...props} />;
};

export default withDatasourceCheck()<BasicInformationProps>(BasicInformation);
