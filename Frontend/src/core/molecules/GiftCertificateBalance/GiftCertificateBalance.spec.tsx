import { screen, render, fireEvent } from '@testing-library/react';
import GiftCertificateBalance from './GiftCertificateBalance';

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({
    removeQueries: jest.fn(),
  }),
}));

jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (text: string) => {
      return {
        GiftCertificateBalance_CurrentBalance:
          'The current balance on gift card {{RedemptionCode}} is <b>${{Balance}}</b>',
        Form_Generic_Tag_EnterCode: 'Enter Code:',
        GiftCertificateBalance_GiftCardErrorMessage: 'Gift card doesnt exist.',
        GiftCertificateBalance_ViewBalance: 'View Balanace',
      }[text];
    },
  }),
}));

jest.mock('data/giftCardbalance', () => ({
  useGetGiftCertificateBalance: () => ({
    data: {
      Id: '09731D8D-FC8B-4082-98D3-6752D8BAE3E7',
      Balance: 0.0,
      RedemptionCode: '7KQH68ZKY7',
      EndDate: null,
    },
    loading: false,
  }),
}));

describe('should renders GiftCertificateBalance', () => {
  test('renders the component', () => {
    render(<GiftCertificateBalance />);
    expect(screen.getByLabelText('Enter Code:')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('View Balance')).toBeInTheDocument();
  });
  test('displays error message when code is not entered', async () => {
    render(<GiftCertificateBalance />);
    fireEvent.click(document.querySelector('.btn-success') as Element);
    expect(screen.getByText('Gift card doesnt exist.')).toBeInTheDocument();
  });
});
