import Image from 'core/atoms/Image';
import ImageLink from './ImageLink';
import { ImageLinkListProps } from './imageLink.types';

const ImageLinkList = (props: ImageLinkListProps) => (
  <>
    {props?.items?.map((item) => {
      if (item?.fields?.Link?.value?.linktype) {
        return (
          <ImageLink
            key={item?.id}
            image={item?.fields?.Image}
            link={item?.fields?.Link}
            className={props?.className}
          />
        );
      } else {
        return (
          <div className={props?.className} key={item?.id}>
            <Image field={item?.fields?.Image} />
          </div>
        );
      }
    })}
  </>
);

export default ImageLinkList;
