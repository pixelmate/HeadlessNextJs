import { render, screen } from '@testing-library/react';
import TitleWithBreadcrumb from './TitleWithBreadcrumb';

jest.mock('@sitecore-jss/sitecore-jss-nextjs', () => ({
  useSitecoreContext: jest.fn().mockReturnValue({
    sitecoreContext: {
      Breadcrumb: [
        {
          title: 'Cat Treats',
          url: '/products/cats/cat-treats',
        },
        {
          title: 'Gourmet Cat Treats',
          url: '/products/cats/cat-treats/gourmet-cat-treats',
        },
      ],
    },
  }),
  Text: (props: { field: { value: string } }) => <>{props?.field?.value}</>,
}));

describe('Title With BreadCrumb', () => {
  it('Render Breadcrumb with Title', async () => {
    const props = {
      rendering: {
        componentName: 'TitleWithBreadcrumb',
      },
      params: {
        Variant: 'Classic',
      },
      fields: {
        BreadcrumbTitle: {
          value: 'Breadcrumb Title',
        },
        Title: {
          value: 'Page Title',
        },
      },
    };
    render(<TitleWithBreadcrumb {...props} />);
    const breadcrumbHome = screen.getByText('Cat Treats');
    const breadcrumbCurrentPage = screen.getByText('Gourmet Cat Treats');

    expect(breadcrumbHome).toBeInTheDocument();
    expect(breadcrumbCurrentPage).toBeInTheDocument();
  });
});
