import { screen, render } from '@testing-library/react';
import ProductHighlights from './ProductHighlightsComponent';

jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (text: string) => {
      return {
        Products_TrustPilot_Review: '54aeef5f0000ff00057c9a7c',
      }[text];
    },
  }),
}));
jest.mock('@sitecore-jss/sitecore-jss-nextjs', () => ({
  useSitecoreContext: jest.fn().mockReturnValue({
    sitecoreContext: {
      route: {
        fields: {
          TrustpilotId: {
            value: '54aeef5f0000ff00057c9a7c',
          },
          Tags: [
            {
              id: 'd35da8f5-b449-49b7-8aa6-6b1c5820bee8',
              url: '/content/tagging-framework/product-tags/soften-and-balance',
              name: 'Soften and Balance',
              displayName: 'Soften and Balance',
              fields: { Value: { value: 'Soften & Balance' } },
            },
            {
              id: '9fa5de33-c205-4a81-a7f3-7976de7a974e',
              url: '/content/tagging-framework/product-tags/protect-and-revitalize',
              name: 'Protect and Revitalize',
              displayName: 'Protect and Revitalize',
              fields: { Value: { value: 'Protect & Revitalize' } },
            },
          ],
        },
      },
    },
  }),
  Image: (props: { field: { value: { alt: string | undefined; src: string | undefined } } }) => (
    <img src={props.field.value.src} alt={props.field.value.alt} />
  ),
  Text: (props: { field: { value: string } }) => {
    return props.field.value;
  },
}));
describe('Product Highlights', () => {
  const props = {
    uid: 'dabc0228-7378-46a5-9363-66953085abea',
    componentName: 'ProductHighlights',
    fields: {
      HideTrustPilotRatings: {
        value: false,
      },
      Title: {
        value: 'Clean',
      },
      SubTitle: {
        value: 'Natural beauty starts here',
      },
      Image: {
        value: {
          src: 'https://cd.lifeabundance.localhost/-/media/lifeabundance/cardlist/cat-allstage-180.png?h=180&iar=0&w=180&hash=412D9E53E78B24CA6117598F41279327',
          alt: 'Cat-AllStage-180',
          width: '180',
          height: '180',
        },
      },
    },
  };
  it('Render Product Highlights Title', async () => {
    render(<ProductHighlights {...props} />);
    const Title = screen.getByText('Clean');
    expect(Title).toBeInTheDocument();
  });
  it('Render Product Highlights SubTitle', async () => {
    render(<ProductHighlights {...props} />);
    const SubTitle = screen.getByText('Natural beauty starts here');
    expect(SubTitle).toBeInTheDocument();
  });
  it('Render Product Highlights Image', async () => {
    render(<ProductHighlights {...props} />);
    const Image = screen.getByAltText('Cat-AllStage-180');
    expect(Image).toBeInTheDocument();
  });

  it('Render Product Highlights without TrustPilot', async () => {
    const hideTrustPilotRatings = { value: true };
    const fields = { ...props.fields, HideTrustPilotRatings: hideTrustPilotRatings };
    const updatedProps = { ...props, fields };
    render(<ProductHighlights {...updatedProps} />);
    const trustPilot = document.querySelector('iframe');
    expect(trustPilot).not.toBeInTheDocument();
  });
  it('Render Product Highlights Tags', async () => {
    render(<ProductHighlights {...props} />);
    const tags = document.querySelector('span');
    expect(tags?.textContent).toContain('Soften & Balance');
  });
});
