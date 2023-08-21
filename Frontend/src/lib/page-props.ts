import { Redirect } from 'next';
import {
  DictionaryPhrases,
  ComponentPropsCollection,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * Sitecore page props
 */
export type SitecorePageProps = {
  dehydratedState: unknown;
  locale: string;
  dictionary: DictionaryPhrases;
  componentProps: ComponentPropsCollection;
  notFound: boolean;
  layoutData: LayoutServiceData;
  redirect?: Redirect;
};
