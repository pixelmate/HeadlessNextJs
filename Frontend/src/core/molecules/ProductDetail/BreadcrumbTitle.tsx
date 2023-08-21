import { Field, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Heading from 'core/atoms/Heading';
import Link from 'next/link';
import { memo } from 'react';
import style from './BreadcrumbTitle.module.scss';
import { BreadCrumb } from './productDetail.types';
import classNames from 'classnames';
import { VARIANTS } from 'constants/variants';

const BreadcrumbTitle = (props: { variation: string }): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const sitecoreContextroute = sitecoreContext?.route?.fields;
  return (
    <div className="d-flex flex-column">
      <h6
        className={classNames(style.breadcrumb, 'h8', {
          'order-2': props?.variation === VARIANTS.CLASSIC,
          [style.classic]: props?.variation === VARIANTS.CLASSIC,
        })}
      >
        {(sitecoreContext?.Breadcrumb as BreadCrumb[])?.map((breadcrumb: BreadCrumb) => (
          <Link href={breadcrumb?.url} key={breadcrumb?.title}>
            <a>{breadcrumb?.title}</a>
          </Link>
        ))}
      </h6>
      <Heading
        level={1}
        text={sitecoreContextroute?.Title as Field<string>}
        className={classNames(style.title, {
          [style.classic]: props?.variation === VARIANTS.CLASSIC,
        })}
      />
    </div>
  );
};

export default memo(BreadcrumbTitle);
