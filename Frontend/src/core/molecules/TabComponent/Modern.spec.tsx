import { render, screen } from '@testing-library/react';
import React from 'react';
import Modern from './Modern';
const props = {
  fields: {
    FeaturedIcons: [
      {
        fields: {
          Text: {
            value: 'ORGANIC',
          },
          Icon: {
            value: {
              src: '/-/media/lifeabundance/herobanner/leaf02.png?h=60&iar=0&w=60&hash=8DE620A148335C3A48E91A7BFAC975B2',
              alt: 'leaf02',
              width: '60',
              height: '60',
            },
          },
        },
      },
      {
        fields: {
          Text: {
            value: 'PURE',
          },
          Icon: {
            value: {
              src: '/-/media/lifeabundance/herobanner/drop.png?h=60&iar=0&w=60&hash=E9E6316585208037C7F08A2505552C27',
              alt: 'drop',
              width: '60',
              height: '60',
            },
          },
        },
      },
    ],
    Title: {
      value: 'Description',
    },
    Description: {
      value: 'Typical',
    },
  },
  variant: 'modern',
};
describe('Render TabComponent', () => {
  it('Render TabComponent Description', async () => {
    render(<Modern {...props} />);
    const Description = screen.getByText('Typical');
    expect(Description).toBeInTheDocument();
  });
  it('Render TabComponent Modern Variant', async () => {
    const newProps = { ...props, variant: 'modern' };
    render(<Modern {...newProps} />);
    const classicClass = document.getElementsByClassName('modern_Container');
    expect(classicClass[0]).toBeInTheDocument();
  });
});
