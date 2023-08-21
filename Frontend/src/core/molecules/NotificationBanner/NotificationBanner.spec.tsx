import { render, screen } from '@testing-library/react';
import NotificationBanner from './NotificationBanner';
jest.mock('@sitecore-jss/sitecore-jss-nextjs', () => ({
  useSitecoreContext: jest.fn().mockReturnValue({
    sitecoreContext: {
      NotificationBanner: {
        Icon: {
          value: {
            src: 'https://cm.lifeabundance.localhost/-/media/lifeabundance/cardlist/pple-icon-beauty.svg',
            alt: 'pple-icon-beauty',
            height: '',
            width: '',
          },
        },
        Description: 'Lorem ipsum',
        Link: {
          value: {
            href: '#',
            text: 'Ok, Got It',
            anchor: '#',
            linktype: 'anchor',
            target: '',
            url: '#',
          },
        },
        BackgroundColorContrast: {
          id: '{C3DF8243-D9F0-4210-B2BC-02828D2A665E}',
          name: 'Orange White',
          fields: {
            FontColor: { value: '#FFFFFF' },
            BackgroundColor: { value: '#F8991D' },
            BackgroundOpacity: { value: '1' },
          },
        },
        CtaColorContrast: {
          id: '{98DB8848-9560-4F4F-8103-EC9A22B54433}',
          name: 'LightGray DarkGray',
          fields: {
            FontColor: { value: '#666' },
            BackgroundColor: { value: '#f5f5f5' },
            BackgroundOpacity: { value: '1' },
          },
        },
      },
    },
  }),
  Image: (props: { field: { value: { alt: string | undefined; src: string | undefined } } }) => (
    <img src={props.field.value.src} alt={props.field.value.alt} />
  ),
}));

describe('Render NotificationBanner', () => {
  it('Render NotificationBanner Icon', async () => {
    render(<NotificationBanner />);
    const image = screen.getByAltText('pple-icon-beauty');
    expect(image).toBeInTheDocument();
  });
  it('Render NotificationBanner Text', async () => {
    render(<NotificationBanner />);
    const text = screen.getByText('Lorem ipsum');
    expect(text).toBeInTheDocument();
  });
  it('Render NotificationBanner Button', async () => {
    render(<NotificationBanner />);
    const button = screen.getByText('Ok, Got It');
    expect(button).toBeInTheDocument();
  });
});
