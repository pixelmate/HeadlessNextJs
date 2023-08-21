import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { CalendarIcon, FolderIcon, UserIcon } from 'core/atoms/Icons';
import { ComponentProps } from 'lib/component-props';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './BlogOverview.module.scss';
import formatDate from 'utils/getDateFormat';
import { Container } from 'react-bootstrap';

export type BlogOverviewProps = ComponentProps & {
  fields: {
    Categories: LinkField[];
    Author: LinkField;
  };
};

const BlogOverview = (props: BlogOverviewProps): JSX.Element => {
  const router = useRouter();
  const { sitecoreContext } = useSitecoreContext();
  const formattedDate: string = formatDate(
    (sitecoreContext.route?.fields?.PublishDate as ValueField)?.value,
    sitecoreContext.DateFormat as string
  );
  return (
    <Container className="bg-white pb-4 px-4">
      <div className={styles.BlogOverview}>
        <h1 className={styles.BlogOverview__Title}>
          <Link href={router?.asPath ?? ''}>
            <a className="link">{(sitecoreContext.route?.fields?.Title as ValueField)?.value}</a>
          </Link>
        </h1>
        <div className={styles.BlogOverview__Metadata}>
          <span className="h10">
            <CalendarIcon />
            {formattedDate}
          </span>
          {props?.fields?.Author && (
            <span className="h10">
              <UserIcon />
              <Link href={props?.fields?.Author?.Link}>
                <a className="link">{props.fields.Author?.Title}</a>
              </Link>
            </span>
          )}
          {props?.fields?.Categories && (
            <span className="h10">
              <FolderIcon />
              {props.fields.Categories?.map((category, index) => (
                <span key={category.Title}>
                  <Link href={category?.Link ?? ''}>
                    <a className="link">{category.Title}</a>
                  </Link>
                  {index < props.fields.Categories.length - 1 && <>{', '}</>}
                </span>
              ))}
            </span>
          )}
        </div>
      </div>
    </Container>
  );
};

export default BlogOverview;
