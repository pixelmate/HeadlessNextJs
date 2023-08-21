import { screen, render } from '@testing-library/react';
import Feature from './Feature';

describe('Featured ContentTile', () => {
  it('Render Content tile feature', async () => {
    const props = {
      rendering: {
        componentName: 'ContentTileFeature',
      },
      params: {},
      fields: {
        heading: {
          value: '',
        },
        FeaturedContent: {
          value: '<h2>WE KNOW<br />\r\nWE&rsquo;RE A<br />\r\nLITTLE<br />\r\nEXTRA</h2>',
        },
        DescriptionColorContrast: null,
        BackgroundColorContrast: {
          id: '1e4646a6-c818-4ba2-ae43-4439b0065a61',
          url: '/sitecore/content/Globals/Lookups/Color-Palette/Background-Font-Contrasts/LightGray-Charcoal',
          name: 'LightGray Charcoal',
          displayName: 'LightGray Charcoal',
          fields: {
            BackgroundColor: {
              value: '#f5f5f5',
            },
            FontColor: {
              value: '#333',
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
          id: 'f4bad491-c8fa-445b-8ac1-d3ea9b3ceaf2',
          url: '/sitecore/content/Globals/Lookups/Alignment/Image-Alignment/Left',
          name: 'Left',
          displayName: 'Left',
          fields: {
            Value: {
              value: 'left',
            },
          },
        },
        FeaturedContentColorContrast: {
          id: '2ec1df37-2041-4cb4-8047-189a5f115141',
          url: '/sitecore/content/Globals/Lookups/Color-Palette/Background-Font-Contrasts/LightOrange-Yellow',
          name: 'LightOrange Yellow',
          displayName: 'LightOrange Yellow',
          fields: {
            BackgroundColor: {
              value: '#F99F1C',
            },
            FontColor: {
              value: '#FFF223',
            },
            BackgroundOpacity: {
              value: 1.0,
            },
          },
        },
        TitleColorContrast: null,
        Variation: {
          id: 'c273dc01-a175-4a2f-affc-17255dbafc45',
          url: '/sitecore/content/Globals/Lookups/Variations/ContentTile/FeaturedContent',
          name: 'FeaturedContent',
          displayName: 'Featured Content without Image',
          fields: {
            Value: {
              value: 'featured',
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
          value: 'BUT WE THINK YOU’LL LOVE IT',
        },
        Description: {
          value:
            '<p>Whether it&rsquo;s the transparency in our supply chain, ingredient sourcing and formulation philosophy, or our labels that tell the truth without any misleading marketing claims, we give you extra confidence that you&rsquo;re not just recommending food but also a company that delivers your clients the highest quality pet products and customer experience out there.</p>',
        },
        Image: {
          value: {},
        },
        Link: {
          value: {
            href: '',
          },
        },
      },
    };
    render(<Feature {...props} />);
    const feature = screen.getByText(/WE KNOW/i);
    const title = screen.getByText('BUT WE THINK YOU’LL LOVE IT');

    expect(feature).toBeInTheDocument();
    expect(feature.parentElement).toHaveClass('rteContent feature');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('featured_heading');
    expect(title.parentElement).toHaveClass(
      'featured_wrapper height_100 color-black bg-color-white'
    );
  });
});
