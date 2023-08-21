import { render, screen } from '@testing-library/react';
import CheckoutSteps from './CheckoutSteps';

describe('CheckoutSteps', () => {
  const props = {
    title: {
      value: 'Shipping',
    },
    stepNumber: {
      value: '1',
    },
    totalSteps: {
      value: 3,
    },
  };
  it('Render CheckoutSteps', () => {
    render(<CheckoutSteps {...props} />);
    const title = screen.getByText('Shipping');
    const stepBubblesLength = document.getElementsByTagName('span').length;

    expect(title).toBeInTheDocument();
    expect(stepBubblesLength).toBe(3);
  });
});
