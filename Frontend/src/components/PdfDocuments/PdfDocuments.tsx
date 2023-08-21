import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import PdfDocumentsComponent, { type PdfDocumentsProps } from 'core/molecules/PdfDocuments';

const PdfDocuments = (props: PdfDocumentsProps): JSX.Element => {
  return <PdfDocumentsComponent {...props} />;
};

export default withDatasourceCheck()<PdfDocumentsProps>(PdfDocuments);
