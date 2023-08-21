import { NextSeo } from 'next-seo';
import { SeoProps } from './seo.types';

const Seo = ({ title, description, images, url, keywords = '', ...props }: SeoProps) => {
  return (
    <NextSeo
      openGraph={{
        ...(Boolean(url) && {
          url,
        }),
        title,
        description,
        ...(Boolean(images) && {
          images: images?.map((item) => ({
            url: item.src,
            alt: item.alt,
          })),
        }),
      }}
      additionalMetaTags={[
        {
          property: 'keywords',
          content: keywords,
        },
      ]}
      {...props}
    />
  );
};

export default Seo;
