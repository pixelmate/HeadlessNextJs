import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { SearchIcon } from 'core/atoms/Icons/SearchIcon';
import { BasketIcon } from 'core/atoms/Icons/BasketIcon';
import style from './UtilityNavigation.module.scss';
import Link from 'next/link';
import { useI18n } from 'next-localization';
import type { UtilityNavigationProps } from './utilityNavigation.type';
import { Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { isOpenNavigationMenu } from 'data/atoms/navigationMenu';
import { useAuthorization } from 'data/user';
import { authorizationAtom } from 'data/atoms/authorization-atom';
import { useCart } from 'hooks/useCart';

const UtilityNavigation = (props: UtilityNavigationProps): JSX.Element => {
  const { t } = useI18n();
  const { mutate: signOut, removeRefreshToken } = useAuthorization();
  const { itemsCount } = useCart();
  const [menu, setMenu] = useAtom(isOpenNavigationMenu);
  const [{ isAuthenticated }] = useAtom(authorizationAtom);
  const { sitecoreContext } = useSitecoreContext();
  const { hideUtilityNavigation, hideSearch } = props || {};

  return (
    <div className={style.navbar_flex}>
      {!hideUtilityNavigation && (
        <ul>
          {!hideSearch && (
            <li>
              <Button
                onClick={props.toggleSearchBar}
                className={style.search}
                aria-label="search-icon"
              >
                <SearchIcon />
              </Button>
            </li>
          )}
          <li className={style.basket}>
            <Link href={(sitecoreContext?.CartPage as string) ?? ''} passHref>
              <span>
                <BasketIcon />
              </span>
            </Link>
            <span className={style.count}>{itemsCount}</span>
          </li>
          <li className="d-none d-lg-inline-block">
            {!isAuthenticated && (
              <Link
                href={(sitecoreContext?.UserLoginPage as string) ?? '/userprofile/login'}
                passHref
              >
                <a className={style.login_btn}>{t('Authentication_Login_SignInLabel')}</a>
              </Link>
            )}
            {isAuthenticated && (
              <Link href={(sitecoreContext?.UserLoginPage as string) ?? ''}>
                <a>
                  <button
                    onClick={() => {
                      signOut(undefined);
                      removeRefreshToken();
                    }}
                    className={style.login_btn}
                  >
                    {t('Authentication_Login_SignOutLabel')}
                  </button>
                </a>
              </Link>
            )}
          </li>
          <li
            className={`d-lg-none ${style.hamburger_menu} ${menu ? style.active : ''}`}
            onClick={() => setMenu(!menu)}
          >
            <span className={style.bar_top}></span>
            <span className={style.bar_middle}></span>
            <span className={style.bar_bottom}></span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UtilityNavigation;
