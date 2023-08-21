import Link from 'next/link';
import SocialShare from 'components/SocialShare';
import Image from 'core/atoms/Image';
import { BlogSearchResultType } from './blogSearch.type';
import styles from './BlogSearch.module.scss';

const BlogSearchResultItem = (props: BlogSearchResultType): JSX.Element => {
  return (
    <div className={`bg-white mb-4 ${styles.blogListing_columns}`}>
      <Link href={props.ItemUrl as string}>
        <a className={`${styles.blogListing_wrapper}`}>
          {props?.Image && (
            <Image
              field={props.Image}
              className={`${styles.blogListing_image} d-sm-none d-lg-block d-xl-block`}
            />
          )}
          {props?.MobileImage && (
            <Image
              field={props.MobileImage}
              className={`${styles.blogListing_image} d-none d-sm-block d-lg-none d-xl-none`}
            />
          )}

          <div className={styles.blogListing_content}>
            <h2 className={styles.blogListing_heading}>{props.Title}</h2>
            {props.Abstract && <p>{props.Abstract}</p>}
          </div>
        </a>
      </Link>
      <SocialShare canonicalUrl={props.ItemUrl}></SocialShare>
    </div>
  );
};

export default BlogSearchResultItem;
