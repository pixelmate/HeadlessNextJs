import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import ReportsListComponent, { ReportsListProps } from 'core/molecules/ReportsList';

const ReportsList = (props: ReportsListProps): JSX.Element => {
  return <ReportsListComponent {...props} />;
};
export default withDatasourceCheck()<ReportsListProps>(ReportsList);
