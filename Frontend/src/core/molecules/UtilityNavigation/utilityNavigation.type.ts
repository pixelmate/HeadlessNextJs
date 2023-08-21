import { SitecoreContextValue } from '@sitecore-jss/sitecore-jss-nextjs';

export type UtilityNavigationData = SitecoreContextValue & {
  UserLoginPage: string;
  CartPage: string;
  SearchPage: string;
};

export type UtilityNavigationProps = {
  hideSearch: number;
  hideUtilityNavigation: number;
  toggleSearchBar: () => void;
};
