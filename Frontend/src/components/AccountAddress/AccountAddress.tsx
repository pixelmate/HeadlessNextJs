import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import AccountAddressComponent, { type AccountAddressProps } from 'core/molecules/AccountAddress';

const AccountAddress = (props: AccountAddressProps): JSX.Element => {
  return <AccountAddressComponent {...props} />;
};

export default withDatasourceCheck()<AccountAddressProps>(AccountAddress);
