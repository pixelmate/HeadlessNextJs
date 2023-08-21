import { screen, render } from '@testing-library/react';
import BlogTags from './BlogTags';

jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (text: string) => {
      return {
        Blog_Tags: 'Text :',
      }[text];
    },
  }),
}));

describe('BlogTags', () => {
  const props = {
    fields: {
      Tags: [
        {
          id: '1',
          Title: 'healthy living',
          Link: '/en/blogs?tag=healthy+living',
        },
        {
          id: '2',
          Title: 'something else',
          Link: '/en/blogs?tag=something+else',
        },
      ],
    },
  };

  it('should render the link', () => {
    render(<BlogTags {...props} />);
    const link1 = screen.getByText('healthy living');
    const links = document.querySelectorAll('a');

    expect(link1).toBeInTheDocument();
    expect(links).toHaveLength(2);
  });
});
