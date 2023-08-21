import Head from 'next/head';
import FontLinks from 'core/atoms/Fonts';

const Scripts = (): JSX.Element | null => {
  return (
    <>
      <Head>
        <FontLinks />
      </Head>
    </>
  );
};

export default Scripts;
