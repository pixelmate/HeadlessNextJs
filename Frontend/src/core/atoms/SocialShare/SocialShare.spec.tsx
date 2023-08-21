import { render, screen } from '@testing-library/react';
import SocialShare from './SocialShare';
jest.mock('@sitecore-jss/sitecore-jss-nextjs', () => ({
  useSitecoreContext: jest.fn().mockReturnValue({
    sitecoreContext: {
      SocialSharePlatforms: ['facebook', 'twitter'],
      CanonicalUrl: 'https://test',
    },
  }),
}));

describe('Render SocialShare', () => {
  it('Render Facebook and Twitter share button', async () => {
    render(<SocialShare />);
    const facebook = screen.getByLabelText('facebook');
    expect(facebook).toBeInTheDocument();
    const twitter = screen.getByLabelText('twitter');
    expect(twitter).toBeInTheDocument();
  });
});
