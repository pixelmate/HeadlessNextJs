import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import ProductAttributesComponent, {
  ProductAttributeProps,
} from 'core/molecules/ProductAttributes';

const ProductAttributes = (props: ProductAttributeProps): JSX.Element => {
  return <ProductAttributesComponent {...props} />;
};
export default withDatasourceCheck()<ProductAttributeProps>(ProductAttributes);
