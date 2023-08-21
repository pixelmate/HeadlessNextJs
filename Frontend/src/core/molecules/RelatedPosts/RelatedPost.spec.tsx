import { render, screen } from '@testing-library/react';
import RelatedPost from './RelatedPost';
import { RelatedPostsProps } from './relatedPosts';

describe('ComponentName -> RelatedPosts', () => {
  it('Render Related Posts', async () => {
    const props = {
      rendering: {
        componentName: 'RelatedPosts',
      },
      fields: {
        RelatedBlogs: [
          {
            url: '/blogs/b/blog',
            fields: {
              Title: {
                value: 'Blog test',
              },
            },
          },
        ],
        Title: {
          value: 'If you found this interesting, check out these related stories:',
        },
      },
    } as RelatedPostsProps;

    render(<RelatedPost {...props} />);

    const relatedBlogHeading = screen.getByText(
      'If you found this interesting, check out these related stories:'
    );

    const relatedBlogTitle = screen.getByText('Blog test');

    expect(relatedBlogHeading).toBeInTheDocument();
    expect(relatedBlogTitle).toBeInTheDocument();
  });
});
