import NavLinks from 'core/atoms/NavLinks';
import Image from 'core/atoms/Image';
import { MenuLink, NavbarProps } from './Navbar.type';
import style from './Navbar.module.scss';
import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import { useAtom } from 'jotai';
import { isOpenNavigationMenu } from 'data/atoms/navigationMenu';

const Navbar = (props: NavbarProps): JSX.Element => {
  const { MenuLinks } = props || {};
  const [menu] = useAtom(isOpenNavigationMenu);
  return (
    <>
      <div className={`${style.navbar} d-none d-lg-flex`}>
        <ul className={style.navbar_list}>
          {MenuLinks?.map((sublink: MenuLink) => (
            <NavLinks key={sublink?.id} sublink={sublink} />
          ))}
        </ul>
      </div>
      {menu && (
        <div className={`${style.navbar} d-lg-none`}>
          <ul className={style.navbar_list}>
            {MenuLinks?.map((sublink: MenuLink) => (
              <NavLinks key={sublink?.id} sublink={sublink} />
            ))}
          </ul>
          <div className="d-md-none w-100">
            {MenuLinks?.map(
              (item) =>
                item?.fields?.PromotionalBanner?.fields?.MobileImage?.value && (
                  <Link field={item?.fields?.PromotionalBanner?.fields?.Link} key={item.id}>
                    <Image
                      field={item?.fields?.PromotionalBanner?.fields?.MobileImage}
                      className="w-100 h-100 object-fit-cover pt-2"
                    />
                  </Link>
                )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
