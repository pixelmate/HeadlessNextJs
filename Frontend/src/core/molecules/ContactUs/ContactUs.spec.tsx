import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ContactUs from './ContactUs';

jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (text: string) => {
      return {
        ContactUs_DisclaimerMessage: 'Message',
        ContactUs_SubmitLabel: 'Submit',
        ContactUs_DetailedMessage_Required: 'Required',
        ContactUs_DetailedMessage: 'Detailed message',
        ContactUs_RadioButton_No: 'No',
        ContactUs_RadioButton_Yes: 'Yes',
        ContactUs_RadioButtonLabel: 'Button Label',
        ContactUs_InvalidEmail: 'Invalid Email',
        ContactUs_EmailRequired: 'Email Required',
        Form_Generic_Placeholders_EnterEmailAddress: 'Email Placeholder',
      }[text];
    },
  }),
}));

const props = {
  rendering: {
    componentName: 'ContactUs',
  },
  params: {},
  fields: {
    FeaturedContentFooter: {
      value:
        '<div class="contactuscustomerservice">\r\nLife\'s Abundance<br />\r\n101 Capital St.<br />\r\nJupiter, Florida 33458\r\n</div>',
    },
    FeaturedContentHeader: {
      value:
        '<hgroup class="text-center">\r\n<h1 class="contactusheader">We love to hear from you!</h1>\r\n<div class="contactuscustomerservice">\r\n<a href="tel:8773874564" style="color: White !important;">\r\n<span class="sprite sprite-call-icon visible-xs"></span>Customer Care (877) 387-4564 | Mon - Fri 8:00 AM - 7:00 PM ET.\r\n</a>\r\n</div>\r\n</hgroup>',
    },
    FailureMessage: {
      value: '',
    },
    SuccessMessage: {
      value: '',
    },
    BackgroundImage: {
      value: {
        src: '/-/media/lifeabundance/herobanner/cleaner-header.jpg?h=475&iar=0&w=1421&hash=3160E4AD47C73C653A7328038CCA53C4',
        alt: 'cleaner-header',
        width: '1421',
        height: '475',
      },
    },
  },
};
describe('Render ContactUs', () => {
  it('Render ContactUs', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ContactUs {...props} />
      </QueryClientProvider>
    );
    const title = screen.getByText('We love to hear from you!');
    expect(title).toBeInTheDocument();
    const label = screen.getByText('Button Label');
    expect(label).toBeInTheDocument();
    const button = screen.getByText('Submit');
    expect(button).toBeInTheDocument();
  });
});
