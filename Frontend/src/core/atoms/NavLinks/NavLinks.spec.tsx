import { screen, render } from '@testing-library/react';
import NavLinks from './NavLinks';

describe('NavLinks component', () => {
  const props = {
    sublink: {
      id: '0115e1d6-3cdf-495e-a877-5ce9cd442447',
      fields: {
        MenuSubLinks: [
          {
            id: '39ffec55-8ead-4030-be61-d40cd3b09fc7',
            fields: {
              SectionIcon: {
                value: {
                  src: 'http://localhost:3000/-/media/lifeabundance/header/people.png?h=70&iar=0&w=70&hash=08B77900DB8BE3B4AC529CAA2B5CD412',
                },
              },
              SectionLinks: [
                {
                  id: 'c1ed1f3f-bdf8-46a8-824a-cd39ab9c733d',
                  fields: {
                    Link: {
                      value: {
                        href: '/people',
                        text: 'Clean Body',
                      },
                    },
                  },
                },
                {
                  id: 'ba660880-20eb-42d8-b073-a0c5c803874e',
                  fields: {
                    Link: {
                      value: {
                        href: 'https://lifesabundance.com/CleanBeauty/CleanBeautyProducts.aspx?realname=&cat=0&hdr=&Ath=False&crt=0',
                        text: 'Clean Beauty',
                      },
                    },
                  },
                },
              ],
              Link: {
                value: {
                  href: 'https://lifesabundance.com/People/Default.aspx?realname=&cat=0&hdr=&Ath=False&crt=0',
                  text: 'People',
                },
              },
            },
          },
        ],
        PromotionalBanner: {
          fields: {
            Image: {
              value: {
                src: 'http://localhost:3000/-/media/lifeabundance/header/promobanner.png?h=144&iar=0&w=530&hash=7EE11836030C2A5C8C52719CC87392FC',
                alt: 'Desktop Image',
              },
            },
            MobileImage: {
              value: {
                src: 'http://localhost:3000/-/media/lifeabundance/header/promobanner-mobile.png?h=192&iar=0&w=349&hash=F52A55CFFE71A9ED609EC077154A0AA0',
                alt: 'Mobile image',
              },
            },
            Link: {
              value: {
                href: '/',
                text: 'Link text',
              },
            },
          },
        },
        Link: {
          value: {
            href: '/',
            text: 'Products',
          },
        },
      },
    },
  };

  it('should render a MenuSubLinks ', () => {
    render(<NavLinks {...props} />);
    const link1 = screen.getByText(/People/i);
    const subLink = screen.getByText(/Clean Body/i);
    expect(link1).toBeInTheDocument();
    expect(subLink).toBeInTheDocument();
  });
});
