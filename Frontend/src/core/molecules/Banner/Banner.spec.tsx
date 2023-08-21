import { render, screen } from '@testing-library/react';
import React from 'react';
import Banner from './Banner';
const props = {
  rendering: {
    componentName: 'Banner',
  },
  params: {
    BackgroundColorContrast: `{"id":"{30555A2D-F0A3-4BC9-BBB6-4925E4345FD0}","name":"Watermelon Crimson","fields":{"FontColor":{"value":"#F9B2C4"},"BackgroundColor":{"value":"#FF6A73"},"BackgroundOpacity":{"value":"1"}}}`,
    CtaColorContrast: `{"id":"{21A986C5-6744-403B-B8DF-1372F29E5825}","name":"PaleGreen LightGreen","fields":{"FontColor":{"value":"#D5F478"},"BackgroundColor":{"value":"#98CB33"},"BackgroundOpacity":{"value":"1"}}}`,
  },
  fields: {
    BannerTitle: { value: 'Wag-worthy' },
    Title: { value: 'Make' },
    Description: {
      value: 'If',
    },
    Link: {
      value: {
        href: '',
        text: 'SHOP NOW',
      },
    },
    Image: {
      value: {
        src: '/-/media/lifeabundance/herobanner/dogtreats-1.png?h=191&iar=0&w=1321&hash=8E99BD890EC6BD3825C115B17E91CE10',
        alt: 'dogtreats',
        width: '1321',
        height: '191',
      },
    },
  },
};

describe('Render Banner', () => {
  it('Render Banner BannerTitle', async () => {
    render(<Banner {...props} />);
    const BannerTitle = screen.getByText('Wag-worthy');
    expect(BannerTitle).toBeInTheDocument();
  });
  it('Render Banner Title', async () => {
    render(<Banner {...props} />);
    const Title = screen.getByText('Make');
    expect(Title).toBeInTheDocument();
  });
  it('Render Banner Description', async () => {
    render(<Banner {...props} />);
    const Description = screen.getByText('If');
    expect(Description).toBeInTheDocument();
  });
  it('Render Banner Button', async () => {
    render(<Banner {...props} />);
    const Button = screen.getByText('SHOP NOW');
    expect(Button).toBeInTheDocument();
  });
  it('Render Banner Image', async () => {
    render(<Banner {...props} />);
    const Image = screen.getByAltText('dogtreats');
    expect(Image).toBeInTheDocument();
  });
});
