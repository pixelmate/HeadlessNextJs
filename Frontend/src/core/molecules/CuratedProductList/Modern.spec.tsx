import { render, screen } from '@testing-library/react';
import Modern from './Modern';

describe('Curated Product list', () => {
  const props = {
    rendering: {
      uid: '08221922-bbc1-4991-96cb-4fef8d2ea6c8',
      componentName: 'CuratedProductList',
      dataSource: '{30A2BC92-0F04-42BC-907C-AC0B1906EFDC}',
    },
    params: {
      Variation: 'modern',
    },
    fields: {
      ProductCardList: [
        {
          id: '516f577f-7ad4-463f-b8b7-2004f6515f78',
          url: '/variation-pages/curatedproductlist/page-components/classic-product-list/productcard-1',
          fields: {
            Product: {
              id: '3581bc38-f2e2-4aff-aa5e-27d196ac3b94',
              url: '/products/cats/test-cat-product-1',
              fields: {
                Title: {
                  value: 'Product Detail Title Test Cat Product 1',
                },
                Description: {
                  value: 'Lorem ipsum dolor sit amet ',
                },
                Image: {
                  value: {
                    src: '/-/media/lifeabundance/data/media/img/jss_logo.png?iar=0&hash=1CB18CEA6DD88A20B168D86A7B8D2271',
                    alt: 'jss_logo',
                  },
                },
              },
            },
            BackgroundColorContrast: {
              id: '2ec1df37-2041-4cb4-8047-189a5f115141',
              url: '/sitecore/content/globals/lookups/color-palette/background-font-contrasts/lightorange-yellow',
              name: 'Green white',
              displayName: 'Green white',
              fields: {
                BackgroundOpacity: {
                  value: '1',
                },
                FontColor: {
                  value: '#FFF223',
                },
                BackgroundColor: {
                  value: '#F99F1C',
                },
              },
            },
          },
        },
        {
          id: 'f90fb3fe-44b1-4e8a-a114-b07c5e739429',
          url: '/variation-pages/curatedproductlist/page-components/classic-product-list/productcard-3',
          fields: {
            Product: {
              id: 'eeb55f9e-448c-4c12-8845-a6457a24377a',
              url: '/products/dogs/test-dog-product-1',
              fields: {
                Title: {
                  value: 'Product Detail Title',
                },
                Description: {
                  value: 'Card detail for testing',
                },
                Image: {
                  value: {
                    src: '/-/media/lifeabundance/data/media/img/jss_logo.png?iar=0&hash=1CB18CEA6DD88A20B168D86A7B8D2271',
                    alt: 'jss_logo',
                  },
                },
              },
            },
            BackgroundColorContrast: {
              id: 'e3feebe4-61ac-4d21-8b1b-ff34c4380ba2',
              url: '/sitecore/content/globals/lookups/color-palette/background-font-contrasts/pearl-wood',
              name: 'Green white',
              displayName: 'Green white',
              fields: {
                BackgroundOpacity: {
                  value: '1',
                },
                FontColor: {
                  value: '#791d00',
                },
                BackgroundColor: {
                  value: '#fcecd4',
                },
              },
            },
          },
        },
      ],
      Title: {
        value: 'Card Title',
      },
      Link: {
        value: {
          href: '/products/people',
          text: 'SEE ALL 6 DOG FOODS',
          linktype: 'internal',
          id: '{954E2975-AAC5-4EE6-93B2-A69ECBCED25C}',
        },
      },
    },
  };

  it('should render the Classic variation', () => {
    render(<Modern {...props} />);
    const title = screen.getByText('Card Title');
    const imgs = document.querySelectorAll('img');
    const bgColorsDivs = document.querySelectorAll('.bg-color-green');
    const cardTitle = screen.getByText('Product Detail Title');
    const cardDescription = screen.getByText('Card detail for testing');
    expect(title).toBeInTheDocument();
    expect(cardTitle).toBeInTheDocument();
    expect(cardDescription).toBeInTheDocument();
    expect(imgs).toHaveLength(2);
    expect(bgColorsDivs).toHaveLength(2);
  });
});
