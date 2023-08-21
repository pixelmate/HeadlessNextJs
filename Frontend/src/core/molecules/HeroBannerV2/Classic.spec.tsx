import { screen, render } from '@testing-library/react';
import Classic from './Classic';

describe('Classic HeroBannerV2', () => {
  it('Render HeroBannerV2 classic', async () => {
    const props = {
      rendering: {
        componentName: 'HeroBannerV2Classic',
      },
      params: {
        Variation: 'classic',
        TextAlignment: 'Center left',
        SubTitleColorContrast: `{"id":"{C3DF8243-D9F0-4210-B2BC-02828D2A665E}","name":"Orange White","fields":{"FontColor":{"value":"#FFFFFF"},"BackgroundColor":{"value":"#F8991D"},"BackgroundOpacity":{"value":"1"}}}`,
        FeaturedIconsFontColor: 'ForestGreen',
        BackgroundColorContrast: `{"id":"{1E4646A6-C818-4BA2-AE43-4439B0065A61}","name":"LightGray Charcoal","fields":{"FontColor":{"value":"#333"},"BackgroundColor":{"value":"#f5f5f5"},"BackgroundOpacity":{"value":"1"}}}`,
      },
      fields: {
        FeaturedIconsFontColor: {
          id: '1d58afc7-b139-4ac8-9f88-433cacaabc42',
          url: '/sitecore/content/globals/lookups/color-palette/colors/forest-green',
          name: 'Forest Green',
          displayName: 'Forest Green',
          fields: {
            Value: {
              value: '#228B22',
            },
          },
        },
        FeaturedIcons: [
          {
            id: '9dab06b3-fe63-4cc3-8d9f-cf1d18c064d0',
            url: '/variation-pages/herobanner/page-components/herobannerv2/organic',
            name: 'Organic',
            displayName: 'Organic',
            fields: {
              Icon: {
                value: {
                  src: 'https://cm.lifeabundance.localhost/-/media/lifeabundance/herobanner/leaf02.png?h=60&iar=0&w=60&hash=8DE620A148335C3A48E91A7BFAC975B2',
                  alt: '',
                  width: '60',
                  height: '60',
                },
              },
              Text: {
                value: 'ORGANIC',
              },
            },
          },
          {
            id: '34f2fe64-e881-48f4-919b-26e4d0b0da91',
            url: '/variation-pages/herobanner/page-components/herobannerv2/pure',
            name: 'Pure',
            displayName: 'Pure',
            fields: {
              Icon: {
                value: {
                  src: 'https://cm.lifeabundance.localhost/-/media/lifeabundance/herobanner/drop.png?h=60&iar=0&w=60&hash=E9E6316585208037C7F08A2505552C27',
                  alt: '',
                  width: '60',
                  height: '60',
                },
              },
              Text: {
                value: 'PURE',
              },
            },
          },
          {
            id: 'a05ace3e-3531-4872-a5f0-26b7894786ae',
            url: '/variation-pages/herobanner/page-components/herobannerv2/sustainable',
            name: 'Sustainable',
            displayName: 'Sustainable',
            fields: {
              Icon: {
                value: {
                  src: 'https://cm.lifeabundance.localhost/-/media/lifeabundance/herobanner/globe.png?h=60&iar=0&w=60&hash=498FDADE222C89283BA17CD93C44F25D',
                  alt: '',
                  width: '60',
                  height: '60',
                },
              },
              Text: {
                value: 'SUSTAINABLE',
              },
            },
          },
        ],
        Title: {
          value: 'Naturally beautiful',
        },
        SubTitle: {
          value: 'Handcrafted, organically sourced',
        },
        Image: {
          value: {
            src: 'https://cm.lifeabundance.localhost/-/media/lifeabundance/herobanner/clean-beauty-header.jpg?h=517&iar=0&w=1364&hash=90426A8703E617D60B0AE80F5EADF3FE',
            alt: 'clean-beauty',
            width: '1364',
            height: '517',
          },
        },
        MobileImage: {
          value: {},
        },
      },
    };
    const { container } = render(<Classic {...props} />);
    const component = container.getElementsByClassName('heroBannerV2_classic');
    const contentContainer = container.getElementsByClassName('align-items-center');
    const image = screen.getAllByAltText('clean-beauty');
    const headingTitle = screen.getByText('Naturally beautiful');

    expect(component[0]).toBeInTheDocument();
    expect(contentContainer[0]).toBeInTheDocument();
    expect(image[0]).toHaveClass('d-none d-md-block');
    expect(image[1]).toHaveClass('d-md-none');
    expect(headingTitle).toBeInTheDocument();
  });
});
