import { render, screen } from '@testing-library/react';
import React from 'react';
import Classic from './Classic';
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
    render(<Classic {...props} />);
    const Description = screen.getByText('Typical');
    expect(Description).toBeInTheDocument();
  });
});
