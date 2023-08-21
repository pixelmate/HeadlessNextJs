import classNames from 'classnames';
import { BreadCrumb, TitleWithBreadcrumbProps } from './TitleWithBreadcrumb.type';
import style from './TitleWithBreadcrumb.module.scss';
import { Field, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Heading from 'core/atoms/Heading';
import Link from 'next/link';
import { VARIANTS } from 'constants/variants';
import { Col, Container, Row } from 'react-bootstrap';

const TitleWithBreadcrumb = (props: TitleWithBreadcrumbProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const variant = props?.params && props?.params?.Variant.toLowerCase();
  return (
    <Container
      className={classNames('title_with_breadcrumb_container', {
        'px-0': variant === VARIANTS.CLASSIC,
      })}
    >
      <Row className={classNames({ 'mx-0': variant === VARIANTS.MODERN })}>
        <Col>
          <h6
            className={classNames(style.breadcrumb, 'h8', {
              'order-2': variant === VARIANTS.CLASSIC,
              [style.classic]: variant === VARIANTS.CLASSIC,
            })}
          >
            {(sitecoreContext?.Breadcrumb as BreadCrumb[])?.map((breadcrumb: BreadCrumb) => (
              <Link href={breadcrumb?.url} key={breadcrumb?.title}>
                <a className={style.breadcrumb_link}>{breadcrumb?.title}</a>
              </Link>
            ))}
          </h6>
          <Heading
            level={1}
            text={sitecoreContext?.route?.fields?.PageTitle as Field<string>}
            className={classNames(style.title, {
              [style.classic]: props?.params?.Variant === VARIANTS.CLASSIC,
            })}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default TitleWithBreadcrumb;
