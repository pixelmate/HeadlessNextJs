import { render, screen } from '@testing-library/react';
import GiftCardInformation from './GiftCardInformation';

jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (text: string) => {
      return {
        Form_Generic_Tag_To: 'To:',
        Form_Generic_Tag_RecipientsEmail: "Recipient's Email:",
        Form_Generic_Tag_From: 'From:',
        Form_Generic_Tag_Amount: 'Amount*:',
        Form_Generic_Tag_Message: 'Message:',
      }[text];
    },
  }),
}));

// Set up localStorage data
beforeAll(() => {
  const giftCertificateInformation = JSON.stringify({
    message: 'Gift Card Message',
    sender: 'Test Sender',
    recipientEmail: 'testSender@gmail.com',
    amount: 20,
    recipient: 'Altudo',
    designFormat: '1',
  });

  localStorage.setItem('GIFT_CERTIFICATE_INFORMATION', giftCertificateInformation);
});

afterAll(() => {
  localStorage.clear();
});

describe('should renders GiftCertificateInformation', () => {
  test('renders the component', () => {
    render(<GiftCardInformation />);
    expect(screen.getByText('To:')).toBeInTheDocument();
    expect(screen.getByText("Recipient's Email:")).toBeInTheDocument();
    expect(screen.getByText('From:')).toBeInTheDocument();
    expect(screen.getByText('Amount*:')).toBeInTheDocument();
    expect(screen.getByText('Message:')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();

    // Assert the values from localStorage
    expect(screen.getByText('Gift Card Message')).toBeInTheDocument();
    expect(screen.getByText('Test Sender')).toBeInTheDocument();
    expect(screen.getByText('testSender@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('Altudo')).toBeInTheDocument();
  });
});
