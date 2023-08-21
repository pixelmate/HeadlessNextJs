import Link from 'next/link';
import { Col, Row } from 'react-bootstrap';
import styles from './BlogPagination.module.scss';

type BlogPaginationProps = {
  fields: {
    PreviousPage?: {
      Title: string;
      Link: string;
    };
    NextPage?: {
      Title: string;
      Link: string;
    };
  };
};

const BlogPagination = (props: BlogPaginationProps): JSX.Element => (
  <div className={`${styles.blogPagination} d-none d-lg-block`}>
    <Row className="mx-0">
      <Col className={`${styles.pageLinkContainer} text-start h9`}>
        {props?.fields?.PreviousPage?.Link && (
          <Link href={props?.fields?.PreviousPage?.Link}>
            <a>← {props?.fields?.PreviousPage?.Title}</a>
          </Link>
        )}
      </Col>
      <Col className={`${styles.pageLinkContainer} text-end h9`}>
        {props?.fields?.NextPage?.Link && (
          <Link href={props?.fields?.NextPage?.Link}>
            <a>{props?.fields?.NextPage?.Title} →</a>
          </Link>
        )}
      </Col>
    </Row>
  </div>
);

export default BlogPagination;
