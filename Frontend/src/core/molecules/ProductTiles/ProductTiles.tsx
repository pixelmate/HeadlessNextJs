import ProductTileModern from 'core/atoms/ProductTile/ProductTileModern';
import { useGetProductTiles } from 'data/productTiles';
import { Container, Row } from 'react-bootstrap';
import { ProductTilesProps } from './productTiles.types';
import ProductTileClassic from 'core/atoms/ProductTile/ProductTileClassic';
import Placeholders from 'core/atoms/Placeholders/Placeholder';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import useLocalStorage from 'hooks/useLocalStorage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const ProductTiles = (props: ProductTilesProps) => {
  const router = useRouter();
  const [, setProgressUrl] = useLocalStorage('PROGRESS_URL');
  const { ApiEndpoint, CategoryId: _categoryId } = props.fields;
  const { sitecoreContext } = useSitecoreContext();
  const CategoryId =
    _categoryId.length > 0 ? _categoryId : [{ id: sitecoreContext.route?.itemId || '' }];
  const { data, isLoading } = useGetProductTiles(
    ApiEndpoint.fields.Value?.value,
    CategoryId.map((categoryId) => categoryId.id!)
  );
  const background: ColorFields = JSON.parse(props?.params?.BackgroundColorContrast || '{}');
  const ctaColor: ColorFields = JSON.parse(props?.params?.CtaColorContrast || '{}');
  const priceColor = props?.params?.PriceTextColor || '#000';
  const textAlignment = props?.params?.TextAlignment || 'right';
  const backgroundStyles = {
    backgroundColor: background?.fields?.BackgroundColor?.value,
    backgroundOpacity: background?.fields?.BackgroundOpacity?.value,
  };

  useEffect(() => {
    setProgressUrl({ url: router.asPath as string });
  }, []);

  const Loader = () => (isLoading ? <Placeholders /> : <></>);
  const ModernTiles = () =>
    !isLoading && props?.params?.Variation?.toLocaleLowerCase() === 'modern' ? (
      <Row>
        {data?.ProductTiles?.map((tile, index) => (
          <ProductTileModern
            tile={tile}
            key={tile.Id + '-' + index}
            ctaColor={ctaColor}
            priceColor={priceColor}
          />
        ))}
      </Row>
    ) : (
      <></>
    );
  const ClassicTiles = () =>
    !isLoading && props?.params?.Variation?.toLocaleLowerCase() === 'classic' ? (
      <>
        {data?.ProductTiles?.map((tile, index) => (
          <ProductTileClassic
            tile={tile}
            key={tile.Id + '-' + index}
            ctaColor={ctaColor}
            textAlignment={textAlignment}
            priceColor={priceColor}
          />
        ))}
      </>
    ) : (
      <></>
    );

  return (
    <section style={backgroundStyles} className="pt-4">
      <Container>
        <Loader />
        <ModernTiles />
        <ClassicTiles />
      </Container>
    </section>
  );
};
