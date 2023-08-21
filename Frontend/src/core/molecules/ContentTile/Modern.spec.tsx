import { screen, render } from '@testing-library/react';
import Modern from './Modern';

describe('Modern ContentTile', () => {
  it('Render Content tile modern', async () => {
    const props = {
      rendering: {
        componentName: 'ContentTileModern',
      },
      params: {},
      fields: {
        heading: {
          value: '',
        },
        FeaturedContent: {
          value: '',
        },
        DescriptionColorContrast: null,
        BackgroundColorContrast: {
          id: '98db8848-9560-4f4f-8103-ec9a22b54433',
          url: '/sitecore/content/Globals/Lookups/Color-Palette/Background-Font-Contrasts/LightGray-DarkGray',
          name: 'LightGray DarkGray',
          displayName: 'LightGray DarkGray',
          fields: {
            BackgroundColor: {
              value: '#f5f5f5',
            },
            FontColor: {
              value: '#666',
            },
            BackgroundOpacity: {
              value: 1.0,
            },
          },
        },
        HideColumnInMobile: {
          value: false,
        },
        CtaColorContrast: null,
        FeaturedContentAlignment: {
          id: '78105fc6-c3af-41ca-b7ff-ca1d55e72690',
          url: '/sitecore/content/Globals/Lookups/Alignment/Image-Alignment/Right',
          name: 'Right',
          displayName: 'Right',
          fields: {
            Value: {
              value: 'right',
            },
          },
        },
        FeaturedContentColorContrast: null,
        TitleColorContrast: null,
        Variation: {
          id: 'ee5791ac-a9dc-406f-8755-bfed25410d6b',
          url: '/sitecore/content/Globals/Lookups/Variations/ContentTile/Modern',
          name: 'Modern',
          displayName: 'Full Column Image',
          fields: {
            Value: {
              value: 'modern',
            },
          },
        },
        ColumnWidth: {
          id: '06956ab7-3df0-45d4-8516-98d216032bc4',
          url: '/sitecore/content/Globals/Lookups/Column-Width/6-6',
          name: '6-6',
          displayName: '6-6',
          fields: {
            Value: {
              value: '6,6',
            },
          },
        },
        Title: {
          value: 'AAFCO FEEDING TRIALS',
        },
        Description: {
          value:
            "<p>While we&rsquo;ve always formulated our diets by AAFCO standards, we know you&rsquo;re comfortable when the pets in your care are eating food that's been through an AAFCO feeding trial. We&rsquo;re committed to have each of our foods go through one - yet because we perform them ethically it takes time.</p>\r\n<p>Our foods that have already been through a trial are:</p>\r\n<ul>\r\n    <li>Lamb Meal &amp; Brown Rice Recipe</li>\r\n    <li>All Life Stage Dog Food</li>\r\n    <li>Adult Weight loss formula</li>\r\n</ul>\r\n<p>During the trials the animals are treated well, with regular time running outside and playing with other dogs and humans- they even have a heated indoor yard for the winter months.</p>",
        },
        Image: {
          value: {
            src: 'https://cm.lifeabundance.localhost/-/media/lifeabundance/contenttile/lifes-abundance-vets02-80.jpg?h=801&iar=0&w=801&hash=8DDCAA14042E436F9BEFDA76F397689C',
            alt: 'vets',
            width: '801',
            height: '801',
          },
        },
        Link: {
          value: {
            href: '',
          },
        },
      },
    };
    render(<Modern {...props} />);
    const image = screen.getByAltText('vets');
    const title = screen.getByText('AAFCO FEEDING TRIALS');

    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title.parentElement).toHaveClass('modern_wrapper bg-color-white color-black');
    expect(title).toHaveClass('modern_heading');
  });
});
