import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'core/atoms/Image';
import style from './SubNavigationSectionLinks.module.scss';
import { SubNavigationSectionLinksProps } from './SubNavigationSectionLinks.type';
import { useAtom } from 'jotai';
import { isOpenNavigationMenu } from 'data/atoms/navigationMenu';

const SubNavigationSectionLinks = (props: SubNavigationSectionLinksProps): JSX.Element => {
  const { sectionLinks } = props || {};
  const [menu, setMenu] = useAtom(isOpenNavigationMenu);
  return (
    <ul className={style.subNavigationSectionLinks}>
      <span className={style.subNavigationSectionLinks_heading}>
        <Link field={sectionLinks?.fields?.Link} onClick={() => setMenu(!menu)} />
      </span>
      <Image field={sectionLinks?.fields?.SectionIcon} />
      {sectionLinks?.fields?.SectionLinks?.map((item) => (
        <li key={item.id}>
          <Link field={item?.fields?.Link?.value} onClick={() => setMenu(!menu)}>
            {item?.fields?.Link?.value?.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SubNavigationSectionLinks;
