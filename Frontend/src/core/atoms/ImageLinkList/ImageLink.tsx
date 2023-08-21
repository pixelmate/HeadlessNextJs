import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'core/atoms/Image';
import { ImageLinkItem } from './imageLink.types';

const ImageLink = ({ image, link, className }: ImageLinkItem) => (
  <Link field={link} className={className} target="_blank">
    <Image field={image} />
  </Link>
);

export default ImageLink;
