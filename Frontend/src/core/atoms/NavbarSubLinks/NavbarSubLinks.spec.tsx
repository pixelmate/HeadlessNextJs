import { render, screen } from '@testing-library/react';
import NavbarSubLinks from './NavbarSubLinks';

describe('NavbarSubLinks component', () => {
  const SubLinksProps = {
    menuSubLinks: [
      {
        id: '39ffec55-8ead-4030-be61-d40cd3b09fc7',
        fields: {
          SectionIcon: {
            value: {
              src: '/-/media/lifeabundance/header/people.png?h=70&iar=0&w=70&hash=08B77900DB8BE3B4AC529CAA2B5CD412',
              alt: 'Section Icon',
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
        id: '3a7982d0-7379-465c-9037-aaf516a1c20c',
        fields: {
          SectionIcon: {
            value: {
              src: '/-/media/lifeabundance/header/dog.png?h=70&iar=0&w=70&hash=37CDA817C0236562CBA453DAD7682988',
              alt: '',
            },
          },
          SectionLinks: [
            {
              id: '12b232a2-f795-4658-974c-5188246d4ee0',
              fields: {
                Link: {
                  value: {
                    href: 'https://lifesabundance.com/Category/DogFood.aspx?realname=&cat=0&hdr=&Ath=False&crt=0',
                    text: 'Dog Food',
                  },
                },
              },
            },
            {
              id: '1943a302-660a-4b30-80ed-3de1108a18bb',
              fields: {
                Link: {
                  value: {
                    href: 'https://lifesabundance.com/Pets/Treats/DogTreats.aspx?realname=&cat=0&hdr=&Ath=False&crt=0',
                    text: 'Dog Treats',
                  },
                },
              },
            },
            {
              id: '1c91596d-6d57-4217-8d7a-fc84d3832df5',
              displayName: 'Dog Supplements',
              fields: {
                Link: {
                  value: {
                    href: 'https://lifesabundance.com/Pets/Supplements/DogSupplements.aspx?realname=&cat=0&hdr=&Ath=False&crt=0',
                    text: 'Dog Supplements',
                    target: '',
                  },
                },
              },
            },
            {
              id: 'cddaf698-868f-41d0-9eef-9f1dc57cb882',
              fields: {
                Link: {
                  value: {
                    href: 'https://lifesabundance.com/Category/DogPetCare.aspx?realname=&cat=0&hdr=&Ath=False&crt=0',
                    text: 'Pet Care Products',
                  },
                },
              },
            },
            {
              id: 'd1af1b4a-b677-44d1-ab6d-cd5ef37c24b9',
              fields: {
                Link: {
                  value: {
                    href: 'https://lifesabundance.com/Category/DogGifts.aspx?realname=&cat=0&hdr=&Ath=False&crt=0',
                    text: 'Gift Ideas',
                  },
                },
              },
            },
          ],
          Link: {
            value: {
              href: 'https://lifesabundance.com/Dogs/Default.aspx?realname=&cat=0&hdr=&Ath=False&crt=0',
              text: 'Dogs',
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
            text: 'text',
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
  };

  it('renders the promotional banner image', () => {
    render(<NavbarSubLinks {...SubLinksProps} />);
    const subLink = screen.getByText(/Clean Body/i);
    expect(subLink).toBeInTheDocument();
  });
});
