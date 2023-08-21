import { render } from '@testing-library/react';
import NavbarLogo from './NavbarLogo';

describe('NavbarLogo component', () => {
  const props = {
    MobileLogo: {
      value: {
        src: 'http://localhost:3000/-/media/lifeabundance/header/logo-small.png?h=85&iar=0&w=85&hash=53160EE0778948FD2EB1B236A795C526',
        alt: 'Mobile Logo Alt Text',
      },
    },
    DesktopLogo: {
      value: {
        src: 'http://localhost:3000/-/media/lifeabundance/header/logo.png?h=100&iar=0&w=220&hash=10C48372060254BD1AA0AAB2867613A5',
        alt: 'Desktop Logo Alt Text',
      },
    },
  };

  it('renders both MobileLogo and DesktopLogo images', () => {
    const { getByAltText } = render(<NavbarLogo {...props} />);
    expect(getByAltText(props.MobileLogo.value.alt)).toBeInTheDocument();
    expect(getByAltText(props.DesktopLogo.value.alt)).toBeInTheDocument();
  });
});
