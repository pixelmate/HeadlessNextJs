import { render, screen } from '@testing-library/react';
import GiftCertificateList from './GiftCertificateList';

jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (text: string) => {
      return {
        GiftCertificateList_NoGiftCertificateMessage:
          'Currently you have no gift certificates pending redemption. Share<br>the love by presenting your family and friends with a <a href="/Orders/GiftCertificates/GiftCertificate"> Life Abundance Gift Certificate</a> today.<br> The process takes less than a minute and the Gift Certificate will be delivered right away!',
        GiftCertificateList_GiftCodeLabel: 'Gift Code',
        GiftCertificateList_CurrentLabel: 'Current',
        GiftCertificateList_InitialLabel: 'Initial',
        GiftCertificateList_CreatedLabel: 'Created',
        GiftCertificateList_ToLabel: 'To',
        GiftCertificateList_EmailLabel: 'Email',
        GiftCertificateList_SendLabel: 'Send',
      }[text];
    },
  }),
}));

jest.mock('data/user', () => ({
  useGiftCards: () => ({
    ID: '22B22BF1-0E6D-4389-97E2-66E947B3C6CE',
    Name: 'TestGiftList',
    Balance: 100,
    AllowAsPaymentMethod: true,
    RedemptionCode: '11KHAKMBTS',
    StartDate: '2023-05-11T00:00:00+00:00',
    EndDate: '2025-06-11T00:00:00+00:00',
    xp: {
      UserId: '91d3ff9b-ae19-1111-bd16-ab7c7bbc1111',
      OrderGroupId: '483EBE3F-F114-4C60-970F-42D7D49C84FD',
      LastModified: '2019-06-16T12:06:14.997+05:30',
      InitialAmount: 100,
      GiftCertificateTo: 'ABC',
      GiftCertificateFrom: 'Tom J. Caron',
      GiftCertificateMessage: 'I appreciate your business and partnership Sam!  :)',
      GiftCertificateEmail: 'jekyl814@gmail.com',
      GiftCertificateStyle: 1,
    },
  }),
}));

describe('Gift Certificate List Component', () => {
  it('Render Gift Certificate', async () => {
    const props = {
      rendering: { componentName: 'GiftCertificateList' },
      params: {},
      fields: {
        Link: {
          value: {
            href: '/userprofile/myaccounteditgiftcertificate',
            text: 'Send',
            anchor: '',
            linktype: 'internal',
            class: '',
            title: '',
            querystring: '',
            id: '{75FF929E-F3E4-4D5A-AFFE-CD86ABDEC714}',
          },
        },
        Description: {
          value:
            'To resend the gift certificate click on the resend button on the grid to the corresponding gift code.You will be taken to another page where you can edit the recipient name, email andmessage.The original gift code will no longer be valid once the new gift certificate hasbeen sent.',
        },
      },
    };
    render(<GiftCertificateList {...props} />);
    const giftCode_tableHead = screen.getByText('Gift Code');
    const current_tableHead = screen.getByText('Current');
    const initial_tableHead = screen.getByText('Initial');
    const created_tableHead = screen.getByText('Created');
    const to_tableHead = screen.getByText('To');
    const email_tableHead = screen.getByText('Email');
    const send_tableHead = screen.getByText('Send');
    const giftCode = screen.getByText(
      'To resend the gift certificate click on the resend button on the grid to the corresponding gift code.You will be taken to another page where you can edit the recipient name, email andmessage.The original gift code will no longer be valid once the new gift certificate hasbeen sent.'
    );

    expect(giftCode_tableHead).toBeInTheDocument();
    expect(current_tableHead).toBeInTheDocument();
    expect(initial_tableHead).toBeInTheDocument();
    expect(created_tableHead).toBeInTheDocument();
    expect(to_tableHead).toBeInTheDocument();
    expect(email_tableHead).toBeInTheDocument();
    expect(send_tableHead).toBeInTheDocument();

    expect(giftCode).toBeInTheDocument();
  });
});
