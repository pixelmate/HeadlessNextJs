import { screen, render } from '@testing-library/react';
import BlogOverview from './BlogOverview';

jest.mock('@sitecore-jss/sitecore-jss-nextjs', () => ({
  useSitecoreContext: jest.fn().mockReturnValue({
    sitecoreContext: {
      route: {
        fields: {
          PublishDate: {
            value: '2023-02-13T22:30:00Z',
          },
          Title: {
            value: 'Blog',
          },
        },
      },
    },
  }),
}));
jest.mock('core/atoms/Icons');
jest.mock('next/router', () => ({ useRouter: () => ({ asPath: '/blog-url' }) }));
jest.mock(
  'next/link',
  () =>
    ({ children }: { children: React.ReactNode }) =>
      children
);

describe('BlogOverview', () => {
  it('button should render the text content should same', async () => {
    const props = {
      rendering: {
        componentName: 'BlogOverview',
      },
      params: {},
      fields: {
        Categories: [
          {
            Title: 'Title 1',
            Link: 'Link/1',
          },
          {
            Title: 'Title 2',
            Link: 'Link/2',
          },
        ],
        Author: {
          Title: 'Author',
          Link: 'Author/1',
        },
      },
    };
    render(<BlogOverview {...props} />);

    const title = screen.getByText('Blog');
    const date = screen.getByText('14 February 2023');
    const author = screen.getByText('Author');
    const category1 = screen.getByText('Title 1');
    const category2 = screen.getByText('Title 2');

    expect(date).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(category1).toBeInTheDocument();
    expect(category2).toBeInTheDocument();
  });
});
