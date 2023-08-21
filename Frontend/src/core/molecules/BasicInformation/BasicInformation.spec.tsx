import { render, screen } from '@testing-library/react';
import BasicInformation from './BasicInformation';
jest.mock('data/user', () => ({
  useUser: () => ({
    user: {
      xp: {
        HighRank: '1. Star',
        FileNum: '20831648',
      },
    },
    isAuthenticated: true,
    isFetched: true,
  }),
}));

describe('Basic Information', () => {
  const props = {
    rendering: {
      componentName: 'BasicInformation',
    },
    dataSource: '{77D2AD69-8437-4383-B3F4-A9AA31F033AC}',
    params: {},
    fields: {
      InformationText: {
        value:
          'Your ID Number is : {{ID_Number}} Your Permanent Rank is: {{Permanent_Rank}} Your Renewal Date is: {{Renewal_Date}}',
      },
    },
  };
  it('Basic Information', async () => {
    render(<BasicInformation {...props} />);

    const information = screen.getByText(
      'Your ID Number is : 20831648 Your Permanent Rank is: 1. Star Your Renewal Date is: not found'
    );
    expect(information).toBeInTheDocument();
  });
});
