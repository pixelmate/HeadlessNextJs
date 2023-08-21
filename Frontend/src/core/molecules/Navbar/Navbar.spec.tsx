import { screen, render } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar component', () => {
  const props = {
    MenuLinks: [
      {
        id: '0115e1d6-3cdf-495e-a877-5ce9cd442447',
        fields: {
          MenuSubLinks: [
            {
              id: '39ffec55-8ead-4030-be61-d40cd3b09fc7',
              fields: {
                SectionIcon: {
                  value: {
                    src: '/-/media/lifeabundance/header/people.png?h=70&iar=0&w=70&hash=08B77900DB8BE3B4AC529CAA2B5CD412',
                    alt: '',
                  },
                },
                SectionLinks: [
                  {
                    id: 'c1ed1f3f-bdf8-46a8-824a-cd39ab9c733d',
                    fields: {
                      Link: {
                        value: {
                          href: 'https://lifesabundance.com/CleanBody/CleanBodyProducts.aspx?realname=&cat=0&hdr=&Ath=False&crt=0',
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
            {
              id: 'd57663a8-f30a-43b9-9330-935d4496dcd7',
              fields: {
                SectionIcon: {
                  value: {
                    src: '/-/media/lifeabundance/header/cat.png?h=70&iar=0&w=70&hash=BEF3643D8A70BDC45FC0EB377B2933D4',
                    alt: '',
                  },
                },
                SectionLinks: [
                  {
                    id: '6ff3111d-a1f5-4e1d-863f-573152cbbf27',
                    fields: {
                      Link: {
                        value: {
                          href: 'https://lifesabundance.com/Category/CatFood.aspx?realname=&cat=0&hdr=&Ath=False&crt=0',
                          text: 'Cat Food',
                        },
                      },
                    },
                  },
                  {
                    id: 'ff24b05a-cd39-4a19-ab65-d49455d202b3',
                    fields: {
                      Link: {
                        value: {
                          href: 'https://lifesabundance.com/Category/CatTreats.aspx?realname=&cat=0&hdr=&Ath=False&crt=0',
                          text: 'Cat Treats',
                        },
                      },
                    },
                  },
                ],
                Link: {
                  value: {
                    href: 'https://lifesabundance.com/Cats/Default.aspx?realname=&cat=0&hdr=&Ath=False&crt=0',
                    text: 'Cats',
                  },
                },
              },
            },
          ],
          PromotionalBanner: {
            id: '48ce96b4-8282-4f3d-bd20-47d19eaa10e5',
            fields: {
              Image: {
                value: {
                  src: '/-/media/lifeabundance/header/promobanner.png?h=144&iar=0&w=530&hash=7EE11836030C2A5C8C52719CC87392FC',
                  alt: '',
                },
              },
              MobileImage: {
                value: {
                  src: '/-/media/lifeabundance/header/promobanner-mobile.png?h=192&iar=0&w=349&hash=F52A55CFFE71A9ED609EC077154A0AA0',
                  alt: '',
                },
              },
              Link: {
                value: {
                  href: '/',
                  text: '',
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
      {
        id: '5600bf59-948e-47be-a080-a2ee6ef1828b',
        fields: {
          MenuSubLinks: [],
          PromotionalBanner: {
            id: '48ce96b4-8282-4f3d-bd20-47d19eaa10e5',
            fields: {
              Image: {
                value: {
                  src: '/-/media/lifeabundance/header/promobanner.png?h=144&iar=0&w=530&hash=7EE11836030C2A5C8C52719CC87392FC',
                  alt: '',
                },
              },
              MobileImage: {
                value: {
                  src: '/-/media/lifeabundance/header/promobanner-mobile.png?h=192&iar=0&w=349&hash=F52A55CFFE71A9ED609EC077154A0AA0',
                  alt: '',
                },
              },
              Link: {
                value: {
                  href: '/',
                  text: '',
                },
              },
            },
          },
          Link: {
            value: {
              href: '/variation-pages/cardlist',
              text: 'Opportunity',
            },
          },
        },
      },
    ],
  };

  it('Should render on the screen', () => {
    render(<Navbar {...props} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(8);
  });
});
