import { render } from '@testing-library/react';
import Classic from './Classic';

describe('Classic HeroBannerV1', () => {
  it('Render HeroBannerV1 classic', async () => {
    const props = {
      rendering: {
        componentName: 'HeroBannerV1Classic',
      },
      params: {
        TextAlignment: 'Bottom right',
        Variation: 'classic',
        ContentColorContrast: `{"id":"{33C957EE-71B9-49E2-99AF-D1BCD08903F8}","name":"SeaSerpent White","fields":{"FontColor":{"value":"#FFFFFF"},"BackgroundColor":{"value":"#48C2C9"},"BackgroundOpacity":{"value":"1"}}}`,
        PlaceholderAlignment: 'bottom',
        BackgroundColorContrast: `{"id":"{974E4C0B-F2D1-4D2F-BBFC-D04BD669BB08}","name":"Violet White","fields":{"FontColor":{"value":"#FFFFFF"},"BackgroundColor":{"value":"#2d1a22"},"BackgroundOpacity":{"value":"1"}}}`,
      },
      fields: {
        HeroBannerTitle: {
          value: '',
        },
        Title: {
          value: '',
        },
        Description: {
          value: '',
        },
        Image: {
          value: {
            src: 'https://cm.lifeabundance.localhost/-/media/lifeabundance/herobanner/newsletter-banner.jpg?h=517&iar=0&w=1364&hash=72D72424C290451DEB35DE1622EBC6C1',
            alt: '',
            width: '1364',
            height: '517',
          },
        },
        MobileImage: {
          value: {},
        },
        Link: {
          value: {
            href: '',
          },
        },
      },
    };
    const { container } = render(<Classic {...props} />);
    const image = container.querySelector('img');
    const component = container.getElementsByClassName('herobannerv1_classic');
    expect(image).toBeInTheDocument();
    expect(component[0]).toBeInTheDocument();
  });
});
