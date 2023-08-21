import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ProductTiles, ProductTilesProps } from 'core/molecules/ProductTiles';

const ProductTilesWrapper = (props: ProductTilesProps): JSX.Element => <ProductTiles {...props} />;

export default withDatasourceCheck()<ProductTilesProps>(ProductTilesWrapper);
