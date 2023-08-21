import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

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

describe('Render Pagination', () => {
  it('Renders Pagination', () => {
    const props = {
      totalPages: 9,
      setPageNumber: () => null,
      currentPage: 1,
      pageNumber: 2,
    };
    render(<Pagination {...props} />);
    const totalPages = screen.getByText('9');
    const previousPageCTA = screen.getByText('Previous Page');
    const nextPageCTA = screen.getByText('Next Page');
    expect(totalPages).toBeInTheDocument();
    expect(previousPageCTA).toBeInTheDocument();
    expect(nextPageCTA).toBeInTheDocument();
  });
});
