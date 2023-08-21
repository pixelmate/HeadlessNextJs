import { screen, render } from '@testing-library/react';
import Modern from './Modern';

describe('Modern HeroBannerV1', () => {
  it('Render HeroBannerV1 Modern', async () => {
    const props = {
      rendering: {
        componentName: 'HeroBannerV1Modern',
      },
      params: {
        TextAlignment: 'Bottom right',
        Variation: 'modern',
        ContentColorContrast: `{"id":"{33C957EE-71B9-49E2-99AF-D1BCD08903F8}","name":"Black White","fields":{"FontColor":{"value":"#FFFFFF"},"BackgroundColor":{"value":"#48C2C9"},"BackgroundOpacity":{"value":"1"}}}`,
        PlaceholderAlignment: 'bottom',
        BackgroundColorContrast: `{"id":"{974E4C0B-F2D1-4D2F-BBFC-D04BD669BB08}","name":"Violet White","fields":{"FontColor":{"value":"#FFFFFF"},"BackgroundColor":{"value":"#2d1a22"},"BackgroundOpacity":{"value":"1"}}}`,
      },
      fields: {
        HeroBannerTitle: {
          value: 'THE CLEAN LIFE',
        },
        Title: {
          value: 'Organic, sustainable, pure',
        },
        Description: {
          value:
            '<p>Your search for a clean, eco-friendly, and thoughtful brand is over. As health conscious people ourselves, we understand the desire to find effective products that are truly safe and healthy. Certain ingredients just don&rsquo;t belong in your home or your body. With Life&rsquo;s Abundance, you&rsquo;ll discover everything you need to empower your overall wellness journey, while embracing sustainable living.</p>',
        },
        Image: {
          value: {
            src: 'https://cm.lifeabundance.localhost/-/media/lifeabundance/herobanner/clean-life-main-desk-hifi.jpg?h=1147&iar=0&w=2048&hash=3505A7E3E646BB54143FD3A93BA4B79C',
            alt: '',
            width: '2048',
            height: '1147',
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
    render(<Modern {...props} />);
    const bannerTitle = screen.getAllByText('THE CLEAN LIFE');
    const title = screen.getByText('Organic, sustainable, pure');
    expect(bannerTitle[0]).toBeInTheDocument();
    expect(bannerTitle[1]).toBeInTheDocument();
    expect(bannerTitle[0]).toHaveClass('color-white bg-color-black');
    expect(bannerTitle[1]).toHaveClass('bg-color-white color-black');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('herobanner_title');
    expect(title.parentElement?.parentElement?.parentElement).toHaveClass('herobannerv1_modern');
  });
});
