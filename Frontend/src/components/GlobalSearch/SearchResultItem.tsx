import Link from 'next/link';
import { SearchResultItemProps } from './globalSearch.type';
import styles from './GlobalSearch.module.scss';

const SearchResultItem = (props: SearchResultItemProps): JSX.Element => {
  return (
    <div className={`${styles.searchItem} py-2`}>
      <Link href={(props.ItemUrl as string) ?? ''} passHref>
        <a dangerouslySetInnerHTML={{ __html: props.Title }} />
      </Link>
      <div
        dangerouslySetInnerHTML={{ __html: props.Abstract }}
        className={styles.searchItem_abstract}
      />
      <div className={styles.searchItem_url}>{props.ItemUrl}</div>
    </div>
  );
};

export default SearchResultItem;
