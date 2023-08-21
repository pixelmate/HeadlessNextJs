import { render, screen } from '@testing-library/react';
import SearchResultItem from './SearchResultItem';

jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (text: string) => {
      return {
        Search_PreviousPageLabel: 'Previous Page',
        Search_NextPageLabel: 'Next Page',
        Search_SearchResults: 'Showing result page 1. There are 2 search results for "blog"',
      }[text];
    },
  }),
}));
describe('Render Search Result page', () => {
  it('Render SerachItem', async () => {
    const props = {
      Title: 'Blog test',
      Abstract: 'Sample blog content. This is testing content for blog.',
      ItemUrl: '/blogs/b/blog',
    };
    render(<SearchResultItem {...props} />);
    const title = screen.getByText('Blog test');
    const abstract = screen.getByText('Sample blog content. This is testing content for blog.');
    const itemUrl = screen.getByText('/blogs/b/blog');
    expect(title).toBeInTheDocument();
    expect(abstract).toBeInTheDocument();
    expect(itemUrl).toBeInTheDocument();
  });
});
