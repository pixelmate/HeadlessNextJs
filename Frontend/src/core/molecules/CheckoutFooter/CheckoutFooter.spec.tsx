import { render, screen } from '@testing-library/react';
import React from 'react';
import CheckoutFooterComponent from './CheckoutFooter';

const props = {
  rendering: {
    componentName: 'CheckoutFooter',
  },
  params: {},
  fields: {
    ContinueCta: {
      value: {
        href: '/checkout/step2',
        text: 'Continue',
      },
    },
    EditCta: {
      value: {
        href: '/orders/basket',
        text: 'Edit',
      },
    },
    Image: {
      value: {
        src: '/-/media/lifeabundance/la-checkout-footer.png?h=64&iar=0&w=330&hash=9A2619BDA6DC219CA8B600C37A24BDAE',
        alt: 'la-checkout-footer',
        width: '330',
        height: '64',
      },
    },
  },
};

describe('Render CheckoutFooter', () => {
  it('Render CheckoutFooter EditCta', async () => {
    render(<CheckoutFooterComponent {...props} />);
    const EditBtn = screen.getByText('Edit');
    expect(EditBtn).toBeInTheDocument();
  });
  it('Render CheckoutFooter ContinueCta', async () => {
    render(<CheckoutFooterComponent {...props} />);
    const ContinueBtn = screen.getByText('Continue');
    expect(ContinueBtn).toBeInTheDocument();
  });
  it('Render CheckoutFooter Image', async () => {
    render(<CheckoutFooterComponent {...props} />);
    const Img = screen.getByAltText('la-checkout-footer');
    expect(Img).toBeInTheDocument();
  });
});
