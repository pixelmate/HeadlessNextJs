import Link from 'next/link';
import { useI18n } from 'next-localization';
import { RssIcon } from 'core/atoms/Icons/RssIcon';
import { FetchCategoryResults } from 'src/data/blogFacets';
import { BlogFacetsProps, category } from './BlogFacets.types';
import style from './BlogFacets.module.scss';

const BlogFacets = ({ fields }: BlogFacetsProps): JSX.Element => {
  const { ApiEndpoint, SearchPage } = fields ?? {};
  const apiUrl = ApiEndpoint?.fields?.Value?.value;
  const { t } = useI18n();
  const { data, error, isError, isLoading } = FetchCategoryResults(apiUrl);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError && typeof error === 'object' && error !== null && 'message' in error) {
    return <div>Error: {error.message as string}</div>;
  }
  return (
    <div className={`d-none d-lg-block bg-color-charcoal h-100 h9 ${style.blogfacets}`}>
      <p>{t('Search_BlogCategoryList')}</p>
      <ul>
        {data?.category?.length ? (
          data?.category?.map((item: category, index: number) => (
            <li key={index}>
              <Link href={`${SearchPage?.value?.href}?category=${item?.FacetQueryValue}`} passHref>
                <a title={item.FacetTitle}>
                  <RssIcon />
                  {item?.FacetTitle} ({item?.AggregateCount})
                </a>
              </Link>
            </li>
          ))
        ) : (
          <>
            {/* {This may updated using dictionar service} */}
            <span>No Category to show</span>
          </>
        )}
      </ul>
    </div>
  );
};
export default BlogFacets;
