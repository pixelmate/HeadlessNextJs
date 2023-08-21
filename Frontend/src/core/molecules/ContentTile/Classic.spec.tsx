import { screen, render } from '@testing-library/react';
import Classic from './Classic';

describe('Classic ContentTile', () => {
  it('Render Content tile classic', async () => {
    const props = {
      rendering: {
        componentName: 'ContentTileClassic',
      },
      params: {},
      fields: {
        heading: {
          value: '',
        },
        Title: {
          value: '',
        },
        Description: {
          value: '<h2>ALL<br />\r\nPETS<br />\r\nMATTER</h2>',
        },
        HideColumnInMobile: {
          value: false,
        },
        Variation: {
          fields: {
            Value: {
              value: 'classic',
            },
          },
        },
        Image: {
          value: {
            src: 'https://cm.lifeabundance.localhost/-/media/lifeabundance/contenttile/jane-foundation.png?h=189&iar=0&w=240&hash=2928883AE9D57E096C61A991FEAEEADF',
            alt: 'Jane-Foundation',
            width: '240',
            height: '189',
          },
        },
        FeaturedContent: {
          value: '',
        },
        Link: {
          value: {
            href: '',
          },
        },
        FeaturedContentAlignment: {
          name: 'Left',
          displayName: 'Left',
          fields: {
            Value: {
              value: 'left',
            },
          },
        },
        FeaturedContentColorContrast: null,
        ColumnWidth: {
          fields: {
            Value: {
              value: '6,6',
            },
          },
        },
        TitleColorContrast: null,
        BackgroundColorContrast: null,
        DescriptionColorContrast: {
          name: 'Watermelon Crimson',
          displayName: 'Watermelon Crimson',
          fields: {
            BackgroundColor: {
              value: '#FF6A73',
            },
            FontColor: {
              value: '#F9B2C4',
            },
            BackgroundOpacity: {
              value: 1.0,
            },
          },
        },
      },
    };
    render(<Classic {...props} />);
    const image = screen.getByAltText('Jane-Foundation');
    const description = screen.getByText('ALL PETS MATTER');
    expect(image).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(description.parentElement?.parentElement).toHaveClass(
      'classic_description bg-color-white color-black'
    );
    expect(description.parentElement).toHaveClass('classic');
  });
});
