import { render, screen } from '@testing-library/react';
import PdfDocuments from './PdfDocuments';

describe('PdfDocuments', () => {
  const props = {
    rendering: {
      componentName: 'PdfDocuments',
    },
    params: {},
    fields: {
      PdfIcon: {
        value: {
          src: '/-/media/lifeabundance/generic-icons/pdf-button1.png?h=51&iar=0&w=53&hash=2ED1C5122AAD436DC44D97EF74373486',
          alt: 'pdf-button1',
          width: '53',
          height: '51',
        },
      },
      Pdfs: [
        {
          id: 'd899f2e8-c699-4a50-9e09-34d911cd1857',
          url: '/fieldrepdocuments/page-components/pdfdocuments/download-2021-income-disclosure',
          name: 'Download 2021 Income Disclosure',
          displayName: 'Download 2021 Income Disclosure',
          fields: {
            FileTitle: {
              value: 'Download 2021 Income Disclosure',
            },
            File: {
              value: {
                src: '/-/media/lifeabundance/fieldrep-documents/lifesabundanceincomedisclosure.pdf',
                name: 'LifesAbundanceIncomeDisclosure',
                displayName: 'LifesAbundanceIncomeDisclosure',
                title: '',
                keywords: '',
                description: '',
                extension: 'pdf',
                mimeType: 'application/pdf',
                size: '94732',
              },
            },
          },
        },
        {
          id: '1dc06b96-1a2a-4b88-a2b1-74b7e9a29558',
          url: '/fieldrepdocuments/page-components/pdfdocuments/download-compensation-overview',
          name: 'Download Compensation Overview',
          displayName: 'Download Compensation Overview',
          fields: {
            FileTitle: {
              value: 'Download Compensation Overview',
            },
            File: {
              value: {
                src: '/-/media/lifeabundance/fieldrep-documents/comp-overview.pdf',
                name: 'comp-overview',
                displayName: 'comp-overview',
                title: '',
                keywords: '',
                description: '',
                extension: 'pdf',
                mimeType: 'application/pdf',
                size: '105668',
              },
            },
          },
        },
        {
          id: '6620daf7-b151-4fa6-be77-519a043aed1e',
          url: '/fieldrepdocuments/page-components/pdfdocuments/download-compensation-plan',
          name: 'Download Compensation Plan',
          displayName: 'Download Compensation Plan',
          fields: {
            FileTitle: {
              value: 'Download Compensation Plan',
            },
            File: {
              value: {
                src: '/-/media/lifeabundance/fieldrep-documents/lifesabundancecompensationplan.pdf',
                name: 'LifesAbundanceCompensationPlan',
                displayName: 'LifesAbundanceCompensationPlan',
                title: '',
                keywords: '',
                description: '',
                extension: 'pdf',
                mimeType: 'application/pdf',
                size: '809489',
              },
            },
          },
        },
      ],
    },
  };

  it('should render component', () => {
    render(<PdfDocuments {...props} />);
    const links = document.querySelectorAll('li');
    const icons = document.querySelectorAll('img');
    const link = screen.getByText('Download Compensation Overview');
    expect(link).toBeInTheDocument();
    expect(links).toHaveLength(3);
    expect(icons).toHaveLength(3);
  });
});
