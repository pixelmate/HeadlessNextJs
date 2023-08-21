import ShippingAddressPreview from './ShippingAddressPreview';
import { screen, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DEFAULT_COUNTRY } from 'constants/address';

const mockedAddress = {
  ID: '0000000000000000000000',
  Shipping: true,
  Billing: false,
  Editable: true,
  DateCreated: '2023-05-12T21:21:48.557+00:00',
  CompanyName: 'Hello world',
  FirstName: 'Jhon',
  LastName: 'Smith',
  Street1: 'Street1',
  Street2: null,
  City: 'Corusant',
  State: 'Alaska',
  Zip: '11332',
  Country: DEFAULT_COUNTRY,
  Phone: '+13024247685',
  AddressName: 'AddressName',
  xp: null,
};

jest.mock('hooks/useTranslate', () => ({
  useTranslate: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('data/user', () => ({
  useAddresses: () => ({
    isAuthenticated: false,
    data: {
      Items: [],
    },
  }),
  useUpdateShippingAddress: () => ({
    mutate: jest.fn(),
    data: undefined,
  }),
  useAddShippingAddress: () => ({
    mutate: jest.fn(),
    data: undefined,
  }),
  useValidateAddress: () => ({
    mutate: jest.fn(),
  }),
}));

jest.mock('hooks/useShippingAddress/useShippingAddress', () => ({
  useShippingAddress: () => ({
    validateShippingAddress: jest.fn(),
    shippingAddress: mockedAddress,
  }),
}));

jest.mock('@sitecore-jss/sitecore-jss-nextjs', () => ({
  useSitecoreContext: jest.fn().mockReturnValue({
    sitecoreContext: {
      checkOutStep1: 'https://cm.lifeabundance.localhost/checkout/step1',
    },
  }),
}));

describe('ShippingAddressPreview', () => {
  const props = {
    rendering: {
      componentName: 'ShippingAddressPreview',
    },
    params: {},
    fields: {
      Header: {
        value: 'Shipping Address Verification',
      },
      Message: {
        value:
          "We found a UPS format for your 'Ship To' address that may help with the delivery of your order.",
      },
      CcpaMessage: {
        value: 'Ccpa message',
      },
    },
  };
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <ShippingAddressPreview {...props} />
    </QueryClientProvider>
  );
  it('Render with address', async () => {
    const noAddressButton = screen.getByText('ShippingAddress_Preview_Change');
    const fullName = screen.getByText('Jhon Smith');
    const street = screen.getByText('Street1');
    const address = screen.getByText('Corusant, Alaska 11332');
    expect(noAddressButton).toBeInTheDocument();
    expect(fullName).toBeInTheDocument();
    expect(street).toBeInTheDocument();
    expect(address).toBeInTheDocument();
  });
});
