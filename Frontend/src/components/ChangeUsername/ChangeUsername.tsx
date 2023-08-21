import dynamic from 'next/dynamic';

const ChangeUsername = dynamic(() => import('core/molecules/ChangeUsername'), { ssr: false });

export default ChangeUsername;
