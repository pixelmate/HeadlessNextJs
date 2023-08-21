import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import ProductQuantityCalculatorComponent, {
  ProductQuantityCalculatorProps,
} from 'core/molecules/ProductQuantityCalculator';

const ProductQuantityCalculator = (props: ProductQuantityCalculatorProps): JSX.Element => {
  return <ProductQuantityCalculatorComponent {...props} />;
};

export default withDatasourceCheck()<ProductQuantityCalculatorProps>(ProductQuantityCalculator);
