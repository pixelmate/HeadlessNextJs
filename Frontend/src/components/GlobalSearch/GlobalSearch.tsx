import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { GlobalSearchProps, SearchResultItemProps } from './globalSearch.type';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from './GlobalSearch.module.scss';
import SearchResultItem from './SearchResultItem';
import { FetchSearchResults } from 'src/data/globalSearch';
import Pagination from 'core/molecules/Pagination';

const GlobalSearch = (props: GlobalSearchProps): JSX.Element => {
  const [pageNumber, setPageNumber] = useState(0);
  const { data, searchText, error, isError, isLoading } = FetchSearchResults(
    props?.fields?.ApiEndpoint?.fields?.Value?.value as string,
    +props?.fields?.PageSize?.value,
    pageNumber
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError && typeof error === 'object' && error !== null && 'message' in error) {
    return <div>Error: {error.message as string}</div>;
  }

  return (
    <Container fluid="lg" className="px-3 px-lg-0 mb-5 pt-4">
      <Pagination
        totalPages={data?.data.TotalPages}
        totalRecords={data?.data.TotalRecords}
        setPageNumber={setPageNumber}
        currentPage={data?.data.CurrentPage}
        searchText={searchText}
        pageNumber={pageNumber}
      />
      <Container fluid className={`${styles.searchItem} py-4 p-0`}>
        {data?.data?.SearchResults?.map((result: SearchResultItemProps) => (
          <SearchResultItem
            key={result.ItemShortId}
            Title={result.Title}
            Abstract={result.Abstract}
            ItemUrl={location?.origin + result.ItemUrl}
          />
        ))}
      </Container>
      <Pagination
        totalPages={data?.data.TotalPages}
        setPageNumber={setPageNumber}
        currentPage={data?.data.CurrentPage}
        pageNumber={pageNumber}
      />
    </Container>
  );
};

export default withDatasourceCheck()<GlobalSearchProps>(GlobalSearch);
