import { render, screen } from '@testing-library/react';
import BlogSearchResultItem from './BlogSearchResultItem';

jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (text: string) => {
      return {
        Search_PreviousPageLabel: 'Previous Page',
        Search_NextPageLabel: 'Next Page',
      }[text];
    },
  }),
}));

describe('Render Search Result page', () => {
  it('Render Grid Listing', async () => {
    const props = {
      Title: 'Blog test',
      Abstract: 'Sample blog content. This is testing content for blog.',
      ItemUrl: '/blogs/b/blog',
      ImageUrl: '/-/media/lifeabundance/herobanner/cf-main-img-80.jpg',
    };
    render(<BlogSearchResultItem {...props} />);
    const title = screen.getByText('Blog test');
    const abstract = screen.getByText('Sample blog content. This is testing content for blog.');
    expect(title).toBeInTheDocument();
    expect(abstract).toBeInTheDocument();
    expect(screen.getByText('Blog test').closest('a')).toHaveAttribute('href', '/blogs/b/blog');
  });
});
