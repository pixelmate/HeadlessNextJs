import Image from 'core/atoms/Image';
import { MediaGalleryProps } from './mediaGallery.type';

const MediaGalleryModern = (props: MediaGalleryProps): JSX.Element => {
  return <Image field={props?.fields?.MediaGallery[0]?.fields?.Image} className="img-fill" />;
};

export default MediaGalleryModern;
