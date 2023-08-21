import { render, screen } from '@testing-library/react';
import CtaLink from './CtaLink';

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
    Icon: {
      value: {
        src: '/-/media/lifeabundance/cta-icons/pdf-button.png?h=51&iar=0&w=53&hash=6EFF00A252F2060C33CF4671CF8FA576',
        alt: 'pdf-button',
        width: '53',
        height: '51',
      },
    },
    Link: {
      value: {
        href: '/-/media/lifeabundance/files/pdf/lifesabundancecompensationplan.pdf',
        text: 'Download Compensation Plan',
        linktype: 'media',
        target: '_blank',
      },
    },
  },
};
describe('CTA Link', () => {
  it('Render Link', () => {
    render(<CtaLink {...props} />);
    const button = screen.getByText('Download Compensation Plan');
    const image = screen.getByAltText('pdf-button');
    expect(button).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
