import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import CheckoutHeaderComponent, { type CheckoutHeaderProps } from 'core/molecules/CheckoutHeader';

const CheckoutHeader = (props: CheckoutHeaderProps): JSX.Element => {
  return <CheckoutHeaderComponent {...props} />;
};

export default withDatasourceCheck()<CheckoutHeaderProps>(CheckoutHeader);
