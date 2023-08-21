import Image from 'core/atoms/Image';
import style from './NavbarLogo.module.scss';
import { NavbarLogoProps } from './NavbarLogo.type';
import Link from 'next/link';

const NavbarLogo = ({ MobileLogo, DesktopLogo }: NavbarLogoProps): JSX.Element => {
  return (
    <div className={style.logo}>
      <Link href="/" passHref>
        <a aria-label="Home">
          <Image className="d-sm-none d-lg-block d-xl-none" field={MobileLogo} />
          <Image className="d-none d-sm-block d-lg-none d-xl-block" field={DesktopLogo} />
        </a>
      </Link>
    </div>
  );
};

export default NavbarLogo;
