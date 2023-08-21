import Link from 'next/link';
import { useI18n } from 'next-localization';
import Tag from './BlogTags.type';
import { Container } from 'react-bootstrap';

type BlogTagsProps = {
  fields: {
    Tags: Tag[];
  };
};

const BlogTags = (props: BlogTagsProps): JSX.Element => {
  const { t } = useI18n();
  const { Tags } = props?.fields || {};
  return (
    <>
      {Tags && (
        <Container className="bg-color-palegray p-3">
          <span>{t('Form_Generic_Tag_Tags')} </span>
          {Tags?.map((item, index) => (
            <span key={item.id || index}>
              {/* id will updated through the props from backEnd */}
              <Link href={(item?.Link as string) ?? ''} passHref>
                <a className="blog-link">{item.Title}</a>
              </Link>
              {index < Tags.length - 1 && <>{', '}</>}
            </span>
          ))}
        </Container>
      )}
    </>
  );
};

export default BlogTags;
