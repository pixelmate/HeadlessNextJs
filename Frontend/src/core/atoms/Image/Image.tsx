import {
  Image as SitecoreImage,
  ImageField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import NextImage from 'next/future/image';

type ImageType = ImageField & {
  value?: ImageItem;
};

type ImageProps = {
  field: ImageField;
  className?: string;
  priority?: boolean;
};

const Image = ({ field, className, priority }: ImageProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';

  const { value = {} } = field || ({} as ImageType);
  const { src, alt = '', width = 0, height = 0 } = value as ImageItem;

  if (isEditing) {
    return <SitecoreImage field={field} className={className} />;
  }

  if (src) {
    return (
      <NextImage
        src={src}
        alt={alt}
        width={width || 60}
        height={height || 60}
        className={className}
        priority={priority}
      />
    );
  }

  return <></>;
};

export default Image;
