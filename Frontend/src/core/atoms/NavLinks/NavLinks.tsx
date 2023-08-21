import classNames from 'classnames';
import style from './NavLinks.module.scss';
import { NavItemProps } from './NavLinks.type';
import NavbarSubLinks from 'core/atoms/NavbarSubLinks';
import Link from 'next/link';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { isOpenNavigationMenu } from 'data/atoms/navigationMenu';

const NavLinks = (props: NavItemProps): JSX.Element => {
  const { sublink } = props || {};
  const [showProducts, setShowProducts] = useState(false);
  const [menu, setMenu] = useAtom(isOpenNavigationMenu);

  return (
    <li
      className={classNames(
        style.navlink,
        showProducts && style.navlink_active,
        sublink?.fields?.MenuSubLinks?.length && style.dropdown
      )}
      onClick={() => {
        !sublink?.fields?.MenuSubLinks?.length && setMenu(!menu);
      }}
    >
      {sublink?.fields?.MenuSubLinks?.length ? (
        <>
          <span
            onClick={() => setShowProducts(!showProducts)}
            className={`${style.navlink_item} h9`}
          >
            {sublink?.fields?.Link?.value?.text}
          </span>
          <NavbarSubLinks
            menuSubLinks={sublink?.fields?.MenuSubLinks}
            PromotionalBanner={sublink?.fields?.PromotionalBanner}
            Link={sublink?.fields?.Link}
          />
        </>
      ) : (
        <span className={`${style.navlink_item} h9`}>
          <Link href={(sublink?.fields?.Link?.value?.href as string) ?? ''}>
            {sublink?.fields?.Link?.value?.text}
          </Link>
        </span>
      )}
    </li>
  );
};

export default NavLinks;
