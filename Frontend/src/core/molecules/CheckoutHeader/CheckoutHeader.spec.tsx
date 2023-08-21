import { render, screen } from '@testing-library/react';
import CheckoutHeader from './CheckoutHeader';

describe('CheckoutHeader', () => {
  const props = {
    rendering: {
      componentName: 'CheckoutHeader',
    },
    params: {},
    fields: {
      CheckoutHeaderCTA: {
        value: {
          href: '/checkout/step2',
          text: 'Continue',
          linktype: 'internal',
          id: '{468E33FD-9EB4-4661-A351-B3FB21FD548C}',
        },
      },
      CheckoutHeaderRTE: {
        value:
          '<div>\r\nToll Free Phone: 877-387-4564<br />\r\nHours: 8:00 AM to 7:00 PM EST Mon. to Fri.\r\n</div>',
      },
      CheckoutHeaderLogo: {
        value: {
          src: '/-/media/lifeabundance/la-checkout.png?h=85&iar=0&w=300&hash=84019FB349306CBA63819E58EDDE5991',
          alt: 'la-checkout',
          width: '300',
          height: '85',
        },
      },
      StepNumber: {
        value: '1',
      },
      StepTitle: {
        value: 'Shipping',
      },
      TotalSteps: {
        value: 3,
      },
    },
  };
  it('Render Checkout Header', () => {
    render(<CheckoutHeader {...props} />);
    const continueCheckoutButton = screen.getByText('Continue');
    const contactDetails = screen.getByText(
      'Toll Free Phone: 877-387-4564 Hours: 8:00 AM to 7:00 PM EST Mon. to Fri.'
    );

    expect(continueCheckoutButton).toBeInTheDocument();
    expect(contactDetails).toBeInTheDocument();
  });
});
