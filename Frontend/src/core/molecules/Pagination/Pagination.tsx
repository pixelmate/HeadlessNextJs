import { Button, Col, Row } from 'react-bootstrap';
import { useI18n } from 'next-localization';
import { PaginationProps } from './pagination.type';
import styles from './Pagination.module.scss';

const Pagination = (props: PaginationProps): JSX.Element => {
  const { t } = useI18n();
  const pageNumbers: JSX.Element[] = [];
  const createPageNumbers = (start: number, end: number) => {
    for (let i = start; i <= end; i++) {
      pageNumbers.push(
        <Button
          onClick={() => props.setPageNumber(i)}
          key={i}
          className={
            i === props.currentPage
              ? `${styles.pageCTA_active} ${styles.pageCTA} px-1`
              : `${styles.pageCTA} px-1`
          }
        >
          {i + 1}
        </Button>
      );
    }
  };

  const minPageValue = props.totalPages < 9 ? props.totalPages - 1 : 9;
  if (props.currentPage < 5 || props.totalPages < 9) {
    createPageNumbers(0, minPageValue);
  } else if (props.currentPage + 5 < props.totalPages) {
    createPageNumbers(props.currentPage - 5, props.currentPage + 5);
  } else {
    createPageNumbers(props.totalPages - 10, props.totalPages - 1);
  }
  const resultString = t('Search_SearchResults', {
    PageNumber: props.pageNumber + 1,
    TotalResults: props.totalRecords,
    SearchText: props.searchText,
  });

  return (
    <>
      {props.totalPages > 0 && (
        <div className={`${styles.pagination} mb-4`}>
          {props.searchText && <span dangerouslySetInnerHTML={{ __html: resultString }} />}
          <Row className={`${styles.pagination_ctaWrapper} mt-1`}>
            <Col xs={3} className="px-0">
              {props.pageNumber > 0 && (
                <Button
                  onClick={() => props.setPageNumber(props.pageNumber - 1)}
                  className={styles.pageCTA}
                >
                  {t('Search_PreviousPageLabel')}
                </Button>
              )}
            </Col>
            <Col xs={6} md={7} lg={8} className="text-end">
              {pageNumbers}
            </Col>
            <Col className="text-end px-0">
              {props.pageNumber < props.totalPages - 1 && (
                <Button
                  onClick={() => props.setPageNumber(props.pageNumber + 1)}
                  className={styles.pageCTA}
                >
                  {t('Search_NextPageLabel')}
                </Button>
              )}
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Pagination;
