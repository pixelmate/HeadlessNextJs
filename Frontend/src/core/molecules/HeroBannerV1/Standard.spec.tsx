import { screen, render } from '@testing-library/react';
import Standard from './Standard';

describe('Standard HeroBannerV1', () => {
  it('Render HeroBannerV1 standard', async () => {
    const props = {
      rendering: {
        componentName: 'HeroBannerV1Standard',
      },
      params: {
        TextAlignment: 'Bottom right',
        Variation: 'standard',
        ContentColorContrast: `{"id":"{33C957EE-71B9-49E2-99AF-D1BCD08903F8}","name":"Black White","fields":{"FontColor":{"value":"#FFFFFF"},"BackgroundColor":{"value":"#48C2C9"},"BackgroundOpacity":{"value":"1"}}}`,
        PlaceholderAlignment: 'bottom',
        BackgroundColorContrast: `{"id":"{974E4C0B-F2D1-4D2F-BBFC-D04BD669BB08}","name":"Black White","fields":{"FontColor":{"value":"#FFFFFF"},"BackgroundColor":{"value":"#2d1a22"},"BackgroundOpacity":{"value":"1"}}}`,
      },
      fields: {
        HeroBannerTitle: {
          value: 'Let’s give them something to purr about',
        },
        Title: {
          value: '',
        },
        Description: {
          value: '',
        },
        Image: {
          value: {
            src: 'https://cm.lifeabundance.localhost/-/media/lifeabundance/herobanner/cf-main-img-80.jpg?h=1227&iar=0&w=2038&hash=BAE8B9401F979FAE77B7F28B008318C1',
            alt: 'test',
          },
        },
        MobileImage: {
          value: {
            src: 'https://cm.lifeabundance.localhost/-/media/lifeabundance/herobanner/cf-main-img-mobile.jpg?h=394&iar=0&w=540&hash=1C3A560DF7F2CB979A3F729EDE969F74',
            alt: 'Mobile Image',
          },
        },
        Link: {
          value: {
            href: '',
          },
        },
      },
    };
    const { container } = render(<Standard {...props} />);
    const component = container.getElementsByClassName('herobannerv1_standard');
    const image = container.querySelector('img');
    const title = screen.getByText('Let’s give them something to purr about');
    expect(component[0]).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('color-white bg-color-black');
  });
});
