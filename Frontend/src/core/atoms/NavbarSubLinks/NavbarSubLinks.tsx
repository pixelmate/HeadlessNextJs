import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'core/atoms/Image';
import SubNavigationSectionLinks from '../SubNavigationSectionLinks';
import { SubLinksProps } from './NavbarSubLinks.type';
import style from './NavbarSubLinks.module.scss';

const NavbarSubLinks = (props: SubLinksProps): JSX.Element => {
  const { menuSubLinks, PromotionalBanner } = props || {};
  return (
    <ul className={style.navbarSubLinks}>
      <div className={style.navbarSubLinks_item}>
        {menuSubLinks?.map((item) => (
          <SubNavigationSectionLinks key={item.id} sectionLinks={item} />
        ))}
      </div>
      {!!PromotionalBanner?.fields?.Image && (
        <div className={style.promotionalBanner}>
          <Link field={PromotionalBanner?.fields?.Link}>
            <Image field={PromotionalBanner?.fields?.Image} />
          </Link>
        </div>
      )}
    </ul>
  );
};

export default NavbarSubLinks;
