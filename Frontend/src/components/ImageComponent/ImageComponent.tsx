import { Text, ImageField, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'core/atoms/Image';
import style from './ImageComponent.module.scss';
import { ComponentProps } from 'lib/component-props';
import { Container } from 'react-bootstrap';
export type ImageComponentProps = ComponentProps & {
  fields: {
    Image: ImageField;
    MobileImage: ImageField;
    Title: Field<string>;
  };
};

const ImageComponent = (props: ImageComponentProps): JSX.Element => {
  const { Title, Image: desktopImage, MobileImage } = props?.fields || {};
  return (
    <Container className="bg-white">
      <div className={`${style.ImageWrapper} text-center d-grid`}>
        <Image
          className={`${style.image} px-3 img-fluid d-none d-md-block mx-auto`}
          field={desktopImage}
        />
        <Image
          className={`${style.image} px-3 img-fluid d-md-none mobile`}
          field={!MobileImage?.value?.src ? desktopImage : MobileImage}
        />
        <p className={`${style.content} `}>
          <Text field={Title} />
        </p>
      </div>
    </Container>
  );
};

export default ImageComponent;
