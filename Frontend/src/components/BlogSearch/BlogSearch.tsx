import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { useState } from 'react';
import { useBlogSearchResults } from 'src/data/blogSearchResults';
import { BlogSearchProps, BlogSearchResultType } from './blogSearch.type';
import BlogSearchResultItem from './BlogSearchResultItem';
import styles from './BlogSearch.module.scss';
import Pagination from 'core/molecules/Pagination';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

const BlogSearch = (props: BlogSearchProps): JSX.Element => {
  const { ApiEndpoint, PageSize } = props?.fields || '';
  const [pageNumber, setPageNumber] = useState(0);
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageEditing;
  const { isLoading, isError, error, data } = useBlogSearchResults({
    apiEndpoint: ApiEndpoint?.fields?.Value?.value as string,
    data: {
      pageSize: PageSize?.value,
      pageNumber: pageNumber,
    },
  });
  if (isLoading && !isEditing) {
    return <div>Loading...</div>;
  }

  if (isError && typeof error === 'object' && error !== null && 'message' in error) {
    return (
      <div>
        <>Error: {error.message}</>
      </div>
    );
  }
  return (
    <>
      <div className={styles.blogListing}>
        {data?.data.SearchResults.length ? (
          data?.data.SearchResults.map((result: BlogSearchResultType) => {
            return (
              <BlogSearchResultItem
                key={result.ItemShortId}
                ItemShortId={result.ItemShortId}
                Title={result.Title}
                Abstract={result.Abstract}
                ItemUrl={location?.origin + result.ItemUrl}
                Image={result.Image}
                MobileImage={result.MobileImage}
              />
            );
          })
        ) : (
          <>
            {/* {This may updated using dictionar service} */}
            <span>No Data to show</span>
          </>
        )}
      </div>
      <Pagination
        totalPages={data?.data.TotalPages}
        setPageNumber={setPageNumber}
        currentPage={data?.data.CurrentPage}
        pageNumber={pageNumber}
      />
    </>
  );
};

export default withDatasourceCheck()<BlogSearchProps>(BlogSearch);
