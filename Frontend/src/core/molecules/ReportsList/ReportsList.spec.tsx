import { render, screen } from '@testing-library/react';
import ReportList from './ReportsList';

describe('Report List component', () => {
  const props = {
    rendering: {
      componentName: 'ReportList',
    },
    params: {
      BackgroundColorContrast: `{"id":"{C3DF8243-D9F0-4210-B2BC-02828D2A665E}","name":"Orange White","fields":{"FontColor":{"value":"#FFFFFF"},"BackgroundColor":{"value":"#F8991D"},"BackgroundOpacity":{"value":"1"}}}`,
    },
    fields: {
      Label: {
        value: 'Select an IFOS Batch Report',
      },
      PDFs: [
        {
          id: '6620daf7-b151-4fa6-be77-519a043aed1e',
          url: '/fieldrepdocuments/page-components/pdfdocuments/download-compensation-plan',
          name: 'Liquid Batch 20B2301 Exp. 04-22',
          displayName: 'Liquid Batch 20B2301 Exp. 04-22',
          fields: {
            FileTitle: {
              value: 'Liquid Batch 22B2301 Exp. 2-24',
            },
            File: {
              value: {
                src: '/-/media/lifeabundance/product-details/fish-oil-report/pdf-1.pdf',
              },
            },
          },
        },
        {
          id: '6620daf7-b151-4fa6-be77-519a043aed1e',
          url: '/fieldrepdocuments/page-components/pdfdocuments/download-compensation-plan',
          name: 'Liquid Batch 20B2301 Exp. 04-22',
          displayName: 'Liquid Batch 20B2301 Exp. 04-22',
          fields: {
            FileTitle: {
              value: 'Liquid Batch 20B2301 Exp. 04-22',
            },
            File: {
              value: {
                src: '/-/media/lifeabundance/product-details/fish-oil-report/pdf-6.pdf',
              },
            },
          },
        },
      ],
      Image: {
        value: {
          src: '/-/media/lifeabundance/product-details/fish-oil-report/ifosseal.jpg?h=72&iar=0&w=93&hash=774D8EE2C9C6C7D1A023F8FA2FFE2CF3',
          alt: 'IFOSSeal',
          width: '93',
          height: '72',
        },
      },
      Title: {
        value: 'Fish Oil IFOS Reports',
      },
      BackgroundColorContrast: {
        id: '30555a2d-f0a3-4bc9-bbb6-4925e4345fd0',
        url: '/sitecore/content/globals/lookups/color-palette/background-font-contrasts/watermelon-crimson',
        name: 'Watermelon Crimson',
        displayName: 'Watermelon Crimson',
        fields: {
          BackgroundOpacity: {
            value: '1',
          },
          FontColor: {
            value: '#F9B2C4',
          },
          BackgroundColor: {
            value: '#FF6A73',
          },
        },
      },
    },
  };

  it('Should render the component', () => {
    render(<ReportList {...props} />);
    const title = screen.getByText('Select an IFOS Batch Report');
    expect(title).toBeInTheDocument();
    const options = document.querySelectorAll('option');
    expect(options.length).toEqual(3);
    const image = screen.getByAltText('IFOSSeal');
    expect(image).toBeInTheDocument();
  });
});
