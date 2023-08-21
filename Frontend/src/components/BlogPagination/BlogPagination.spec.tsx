import { render, screen } from '@testing-library/react';
import BlogPagination from './BlogPagination';

describe('Render SocialShare', () => {
  const props = {
    fields: {
      PreviousPage: {
        Title: 'Buttery Pecan Protein Cookies',
        Link: '/blogs/b/buttery-pecan-protein-cookies',
      },
      NextPage: {
        Title: 'Blog test - Sample blog',
        Link: '/blogs/b/blog-test',
      },
    },
  };
  it('Render Facebook and Twitter share button', async () => {
    render(<BlogPagination {...props} />);
    const previousPage = screen.getByText('← Buttery Pecan Protein Cookies');
    const nextPage = screen.getByText('Blog test - Sample blog →');
    expect(previousPage).toBeInTheDocument();
    expect(nextPage).toBeInTheDocument();
  });
});
