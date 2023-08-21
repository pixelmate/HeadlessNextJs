import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import { MenuItem } from './footer.types';

type FooterNavListProps = {
  item: MenuItem;
};

const FooterNavList = (props: FooterNavListProps) => (
  <ul className="list-unstyled">
    {props?.item?.fields?.Links?.map((link) => (
      <li key={link?.id} className="h9">
        <Link field={link?.fields?.Link} className="link" />
      </li>
    ))}
  </ul>
);

export default FooterNavList;
