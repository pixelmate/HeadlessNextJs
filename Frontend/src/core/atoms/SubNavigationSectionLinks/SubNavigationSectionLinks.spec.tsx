import { render, screen } from '@testing-library/react';
import ProductSectionLinks from './SubNavigationSectionLinks';

describe('ProductSectionLinks component should render on the screen', () => {
  const props = {
    sectionLinks: {
      fields: {
        Link: {
          value: {
            href: '/products',
            text: 'Products',
          },
        },
        SectionIcon: {
          value: {
            src: '/section-icon.png',
            alt: 'Section icon',
          },
        },
        SectionLinks: [
          {
            id: '1',
            fields: {
              Link: {
                value: {
                  href: '/products/category-1',
                  text: 'Category 1',
                },
              },
            },
          },
          {
            id: '2',
            fields: {
              Link: {
                value: {
                  href: '/products/category-2',
                  text: 'Category 2',
                },
              },
            },
          },
        ],
      },
    },
  };

  it('renders the product section links', () => {
    render(<ProductSectionLinks {...props} />);
    const productsLink = screen.getByRole('link', { name: /products/i });
    expect(productsLink).toBeInTheDocument();

    const sectionIcon = screen.getByAltText('Section icon');
    expect(sectionIcon).toBeInTheDocument();

    const category1Link = screen.getByRole('link', { name: /category 1/i });
    expect(category1Link).toBeInTheDocument();

    const category2Link = screen.getByRole('link', { name: /category 2/i });
    expect(category2Link).toBeInTheDocument();
  });
});
