import {
  withDatasourceCheck,
  ImageField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import NavbarLogo from 'core/atoms/NavbarLogo';
import { ComponentProps } from 'lib/component-props';
import style from './Header.module.scss';
import { useState } from 'react';
import { MenuLink } from 'core/molecules/Navbar/Navbar.type';
import Navbar from 'core/molecules/Navbar';
import { Container } from 'react-bootstrap';
import SearchBar from 'core/molecules/SearchBar';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

const UtilityNavigation = dynamic(() => import('core/molecules/UtilityNavigation'), { ssr: false });

type HeaderProps = ComponentProps & {
  fields: {
    Logo: ImageField;
    MobileLogo: ImageField;
    MenuLinks: MenuLink[];
  };
};

const Header = (props: HeaderProps): JSX.Element => {
  const [isSearchBarVisible, setSearchBar] = useState(false);
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext.pageEditing;
  const { MobileLogo, Logo, MenuLinks } = props?.fields || {};
  const hideUtilityNavigation = +props?.params?.HideUtilityNavigation || 0;
  const hideSearch = +props?.params?.HideSearch || 0;

  const toggleSearchBar = () => {
    setSearchBar(!isSearchBarVisible);
  };
  return (
    <header className={classNames(style.header, { 'position-relative': isEditing })}>
      <div className="position-relative">
        <Container fluid="lg" className={style.main_nav}>
          <NavbarLogo MobileLogo={MobileLogo} DesktopLogo={Logo} />
          <Navbar MenuLinks={MenuLinks} />
          <UtilityNavigation
            hideSearch={hideSearch}
            toggleSearchBar={toggleSearchBar}
            hideUtilityNavigation={hideUtilityNavigation}
          />
        </Container>
        <SearchBar toggleSearchBar={toggleSearchBar} isSearchBarVisible={isSearchBarVisible} />
      </div>
    </header>
  );
};

export default withDatasourceCheck()<HeaderProps>(Header);
