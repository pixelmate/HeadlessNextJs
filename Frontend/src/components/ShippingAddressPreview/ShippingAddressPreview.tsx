import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import ShippingAddressPreviewComponent, {
  type ShippingAddressPreviewProps,
} from 'core/molecules/ShippingAddressPreview';

const ShippingAddressPreview = (props: ShippingAddressPreviewProps): JSX.Element => (
  <ShippingAddressPreviewComponent {...props} />
);

export default withDatasourceCheck()(ShippingAddressPreview);
