import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import ProductHighlightsComponent, {
  ProductHighlightsProps,
} from 'core/molecules/ProductHighlightsComponent';

const ProductHighlights = (props: ProductHighlightsProps): JSX.Element => {
  return <ProductHighlightsComponent {...props} />;
};

export default withDatasourceCheck()<ProductHighlightsProps>(ProductHighlights);
