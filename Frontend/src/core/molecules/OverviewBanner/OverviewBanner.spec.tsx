import { render, screen } from '@testing-library/react';
import OverviewBanner from './OverviewBanner';

jest.mock('@sitecore-jss/sitecore-jss-nextjs', () => ({
  useSitecoreContext: jest.fn().mockReturnValue({
    sitecoreContext: {
      pageEditing: false,
    },
  }),
  RichText: (props: { field: { value: string } }) => <div> {props.field.value} </div>,
  Text: (props: { field: { value: string } }) => {
    return props.field.value;
  },
  Link: (props: { field: { value: string }; target: string; children: React.ReactNode }) => (
    <a href={props.field.value} target={props.target}>
      {props.children}
    </a>
  ),
}));

jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (text: string) => {
      return {
        TrustPilot_TrustPilotLibrary:
          '<script type="text/javascript" src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" async=""></script>',
        TrustPilot_BannerReview:
          '<div class="trustpilot-widget " data-locale="en-US" data-template-id={{PRODUCT_TRUSTPILOT_ID}} data-businessunit-id="54aeef5f0000ff00057c9a7c" data-style-height="130px" data-style-width="100%" data-theme="dark" style="position: relative;"></div>',
      }[text];
    },
  }),
}));

describe('OverviewBanner', () => {
  const props = {
    rendering: {
      componentName: 'RecentBlogCarousel',
    },
    params: {
      CtaColorContrast: `{"id":"{C3DF8243-D9F0-4210-B2BC-02828D2A665E}","name":"Orange White","fields":{"FontColor":{"value":"#FFFFFF"},"BackgroundColor":{"value":"#F8991D"},"BackgroundOpacity":{"value":"1"}}}`,
    },
    fields: {
      TrustPilotBusinessUnitId: {
        value: '54aeef5f0000ff00057c9a7c',
      },
      RatingLogoImage: {
        value: {
          src: '/-/media/lifeabundance/footer/trust-bedges/accredited.png?h=37&iar=0&w=132&hash=3569C1F8476E23532462DE3779066557',
          alt: 'accredited',
          width: '132',
          height: '37',
        },
      },
      RatingLogoLink: {
        value: {
          href: 'http://www.bbb.org/south-east-florida/business-reviews/pet-foods-wholesale-and-manufacturers/lifes-abundance-in-jupiter-fl-4005372',
          linktype: 'external',
          url: 'http://www.bbb.org/south-east-florida/business-reviews/pet-foods-wholesale-and-manufacturers/lifes-abundance-in-jupiter-fl-4005372',
        },
      },
      Title: {
        value: 'Opportunity awaits.',
      },
      Description: {
        value:
          '<p><span class="green-txt">&bull;&nbsp;&bull;&nbsp;&bull;&nbsp;&bull; </span></p>\r\n<p>Lifes Abundance is an employee owned company on a mission to improve the health and wellness of families. </p>\r\n<p>We believe that life is precious and should be enjoyed to the fullest extent possible. We are passionate about the various products we offer, the customers we serve, the business opportunity we represent and the work of our non-profit, The Dr. Jane Foundation. Since 1999, our tireless dedication to our mission has produced an extended track record of profitability and success.</p>',
      },
      CtaColorContrast: {
        id: 'c3df8243-d9f0-4210-b2bc-02828d2a665e',
        url: '/sitecore/content/globals/lookups/color-palette/background-font-contrasts/orange-white',
        name: 'Orange White',
        displayName: 'Orange White',
        fields: {
          BackgroundColor: {
            value: '#F8991D',
          },
          BackgroundOpacity: {
            value: '1.0',
          },
          FontColor: {
            value: '#FFFFFF',
          },
        },
      },
      Link: {
        value: {
          text: 'Watch Video',
          linktype: 'videomodal',
          url: 'https://vimeo.com/253660017',
          anchor: '',
        },
      },
      Image: {
        value: {
          src: '/-/media/lifeabundance/herobanner/skincare-winter2023.png?h=1333&iar=0&w=2133&hash=A61F042DD152240CCCCFF1CA55AFC670',
          alt: 'skinCare-winter2023',
          width: '2133',
          height: '1333',
        },
      },
      MobileImage: {
        value: {
          src: '/-/media/lifeabundance/cardlist/brdrs-img03.png?h=197&iar=0&w=197&hash=B432E9B2909FBBDA9EE53125A3DFB6B3',
          alt: 'brdrs-img03',
          width: '197',
          height: '197',
        },
      },
    },
  };
  it('Render OverviewBanner', () => {
    render(<OverviewBanner {...props} />);
    const title = screen.getByText('Opportunity awaits.');
    const button = screen.getByText('Watch Video');
    const description = screen.getByText(
      'Lifes Abundance is an employee owned company on a mission to improve the health and wellness of families.'
    );
    const image = screen.getByAltText('skinCare-winter2023');
    const badge = screen.getByAltText('accredited');
    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(badge).toBeInTheDocument();
  });
});
