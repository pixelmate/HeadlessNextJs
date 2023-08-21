import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { CheckoutAsGuestProps } from 'core/molecules/CheckoutAsGuest';
import dynamic from 'next/dynamic';

const CheckoutAsGuest = dynamic(() => import('core/molecules/CheckoutAsGuest'), { ssr: false });

export default withDatasourceCheck()<CheckoutAsGuestProps>(CheckoutAsGuest);
