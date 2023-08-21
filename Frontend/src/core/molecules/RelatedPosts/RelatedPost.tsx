import Heading from 'core/atoms/Heading';
import Link from 'next/link';
import styles from './RelatedPosts.module.scss';
import { RelatedPostsProps } from './relatedPosts';
import { Container } from 'react-bootstrap';

const RelatedPosts = (props: RelatedPostsProps) => {
  const { Title, RelatedBlogs } = props?.fields || {};
  return (
    <Container className="bg-white px-4">
      <div className={styles.relatedPosts}>
        <Heading level={7} text={Title} className={styles.relatedPosts_heading} />
        {RelatedBlogs?.map((blog, index) => {
          return (
            <p key={index}>
              <Link href={(blog.url as string) ?? ''}>
                <a className="blog-link h8" target="_blank">
                  {blog.fields.Title.value}
                </a>
              </Link>
            </p>
          );
        })}
      </div>
    </Container>
  );
};

export default RelatedPosts;
