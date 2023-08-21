import { render, screen } from '@testing-library/react';
import CtaButton from './CtaButton';

const props = {
  rendering: {
    componentName: 'ConfigurableCTA',
  },
  params: {
    CtaAlignment: 'center',
    CtaColorContrast: `{"id":"{C3DF8243-D9F0-4210-B2BC-02828D2A665E}","name":"Orange White","fields":{"FontColor":{"value":"#FFFFFF"},"BackgroundColor":{"value":"#F8991D"},"BackgroundOpacity":{"value":"1"}}}`,
    CtaStyle: 'button',
    CtaIconAlignment: 'right',
  },
  fields: {
    IconAlignment: {
      fields: {
        Value: {
          value: 'left',
        },
      },
    },
    Icon: {
      value: {
        src: '/-/media/lifeabundance/cta-icons/play-circle.svg?h=120&iar=0&w=120&hash=0284981299CD1FF1BB6B40A1C83881D7',
        alt: 'play-circle',
        width: '120',
        height: '120',
      },
    },
    CtaColorContrast: {
      name: 'Orange White',
      displayName: 'Orange White',
      fields: {
        BackgroundOpacity: {
          value: '1',
        },
        BackgroundColor: {
          value: '#F8991D',
        },
        FontColor: {
          value: '#FFFFFF',
        },
      },
    },
    CtaStyle: {
      fields: {
        Value: {
          value: 'button',
        },
      },
    },
    Link: {
      value: {
        text: 'Watch Video',
        linktype: 'videomodal',
        url: 'https://vimeo.com/253660017',
        anchor: '',
      },
    },
    CtaAlignment: {
      fields: {
        Value: {
          value: 'center',
        },
      },
    },
  },
};
describe('CTA Button', () => {
  it('Render Button', () => {
    render(<CtaButton {...props} />);
    const button = screen.getByText('Watch Video');
    const image = screen.getByAltText('play-circle');
    expect(button).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
