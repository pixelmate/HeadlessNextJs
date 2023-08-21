import { LayoutServiceData } from '@sitecore-jss/sitecore-jss-nextjs';
import { FieldType, ImageData, SeoProps } from './seo.types';

export const getFieldData = <T extends FieldType>(
  layoutData: LayoutServiceData,
  fieldName: string
) => (layoutData.sitecore.route?.fields?.[fieldName] as T)?.value;

export const getContextData = <T extends FieldType>(
  layoutData: LayoutServiceData,
  fieldName: string
) => (layoutData.sitecore.context?.[fieldName] as T)?.value;

export const getSeoData = (layoutData: LayoutServiceData): SeoProps => {
  const _images = getFieldData(layoutData, 'MetaImage') as ImageData[];
  const images = _images ? ((_images.length ? _images : [_images]) as ImageData[]) : undefined;

  return {
    title: getFieldData(layoutData, 'MetaTitle') as string,
    description: getFieldData(layoutData, 'MetaDescription') as string,
    keywords: getFieldData(layoutData, 'MetaKeywords') as string,
    url: getContextData(layoutData, 'CanonicalUrl') as string,
    images,
  };
};
