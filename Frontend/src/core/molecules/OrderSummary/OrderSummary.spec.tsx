import { render, screen } from '@testing-library/react';
import OrderSummary from './OrderSummary';

jest.mock('hooks/useTranslate', () => ({
  useTranslate: () => ({
    t: (text: string) => {
      return {
        Form_Generic_Tag_RetailSavings: 'Retail Savings',
        Form_Generic_Tag_TotalRetail: 'Total Retail',
        Form_Generic_Tag_Subtotal: 'Subtotal',
        Form_Generic_Tag_Shipping: 'Shipping',
        Form_Generic_Tag_OrderTotal: 'Order Total',
        Form_Generic_Tag_PersonalSales: 'Personal Saled',
      }[text];
    },
  }),
}));

jest.mock('data/order', () => ({
  useOrderSummary: () => ({
    cart: {
      total: 10,
      subtotal: 9,
      shippingCost: 1,
    },
    isLoading: false,
  }),
}));

describe('OrderSummary', () => {
  const props = {
    rendering: {
      componentName: 'OrderSummary',
    },
    params: {},
    fields: {
      Title: {
        value: 'Existing Users',
      },
      CheckoutCTA: {
        value: {
          href: '/checkout/step1',
          linktype: 'internal',
        },
      },
    },
  };

  it('renders the component', async () => {
    render(<OrderSummary {...props} />);

    expect(screen.getByText('Total Retail')).toBeInTheDocument();
    expect(screen.getByText('Retail Savings')).toBeInTheDocument();
    expect(screen.getByText('Subtotal')).toBeInTheDocument();
    expect(screen.getByText('Shipping')).toBeInTheDocument();
    expect(screen.getByText('Order Total')).toBeInTheDocument();
    expect(document.querySelector('a')).toBeInTheDocument();
  });
});
