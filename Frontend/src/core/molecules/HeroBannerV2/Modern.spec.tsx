import { screen, render } from '@testing-library/react';
import Modern from './Modern';

describe('Modern HeroBannerV2', () => {
  it('Render HeroBannerV2 modern', async () => {
    const props = {
      rendering: {
        componentName: 'HeroBannerV2Modern',
      },
      params: {
        Variation: 'modern',
        TextAlignment: 'Top right',
        BackgroundColorContrast: `{"id":"{8CBE5830-04DA-457B-A225-5E4EE065AD18}","name":"White Black","fields":{"FontColor":{"value":"#000000"},"BackgroundColor":{"value":"#FFFFFF"},"BackgroundOpacity":{"value":"1"}}}`,
      },
      fields: {
        Title: {
          value: 'FOR VETS',
        },
        SubTitle: {
          value: 'Title',
        },
        Image: {
          value: {
            src: 'https://cm.lifeabundance.localhost/-/media/lifeabundance/herobanner/cf-main-img-80.jpg?h=1227&iar=0&w=2038&hash=F0382D5F57B472A2ECCD51DB5D7FC55C',
            alt: '',
            width: '2038',
            height: '1227',
          },
        },
        MobileImage: {
          value: {
            src: 'https://cm.lifeabundance.localhost/-/media/lifeabundance/herobanner/cf-main-img-mobile.jpg?h=394&iar=0&w=540&hash=DC5F6F106F879B01C0C245C6B7E96227',
            alt: '',
            width: '540',
            height: '394',
          },
        },
      },
    };
    const { container } = render(<Modern {...props} />);
    const component = container.getElementsByClassName('heroBannerV2_modern');
    const image = container.querySelector('img');
    const title = screen.getAllByText('FOR VETS');

    expect(component[0]).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(title[0]).toBeInTheDocument();
    expect(title[1]).toBeInTheDocument();
    expect(title[0]).toHaveClass('d-none d-md-block');
    expect(title[1]).toHaveClass('d-md-none');
  });
});
