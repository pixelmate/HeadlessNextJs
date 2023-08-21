import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { LoginProps } from 'core/molecules/Login';
import dynamic from 'next/dynamic';

const Login = dynamic(() => import('core/molecules/Login'), { ssr: false });

export default withDatasourceCheck()<LoginProps>(Login);
