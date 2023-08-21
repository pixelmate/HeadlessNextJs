import FooterNavList from './FooterNavList';
import { MenuItem } from './footer.types';
import { Fragment } from 'react';
import Heading from 'core/atoms/Heading/Heading';

type FooterNavigationProps = {
  menuItems: MenuItem[];
};

const FooterNavigation = (props: FooterNavigationProps) => (
  <div className="row">
    {props?.menuItems?.map((item) => (
      <div key={item.id} className="col-md-4">
        <Heading level={7} text={item?.fields?.Title} />
        {item?.fields?.Submenus?.map((subMenu) => (
          <Fragment key={subMenu.id}>
            <Heading level={9} className="fw-bold" text={subMenu?.fields?.Title} />
            <FooterNavList key={`${subMenu.id}x`} item={subMenu} />
          </Fragment>
        ))}
        <FooterNavList item={item} />
      </div>
    ))}
  </div>
);

export default FooterNavigation;
