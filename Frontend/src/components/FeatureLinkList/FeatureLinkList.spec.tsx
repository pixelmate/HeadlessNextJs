import { render, screen } from '@testing-library/react';
import FeatureLinkList from './FeatureLinkList';

describe('Feature Link List component', () => {
  const props = {
    fields: {
      Features: [
        {
          id: 'f3f57a76-1277-4202-8d3a-9ac759433a30',
          fields: {
            Value: {
              value: 'Pure',
            },
          },
        },
        {
          id: '1d912336-837c-47ca-aeaf-789f132a211b',
          fields: {
            Value: {
              value: 'Phthalate free',
            },
          },
        },
        {
          id: 'e9d365e5-b391-40bd-bc52-6a4d7937c05e',
          fields: {
            Value: {
              value: 'Sulfate free',
            },
          },
        },
        {
          id: 'c05239a3-f812-4b8b-990d-897c506f96ef',
          fields: {
            Value: {
              value: 'No synthetic anything',
            },
          },
        },
      ],
      Title: {
        value: 'Radiant skin',
      },
      Description: {
        value: 'Do something amazing today!',
      },
      Image: {
        value: {
          src: '/-/media/lifeabundance/cardlist/circlegirls_033.png?h=220&iar=0&w=220&hash=75BC195785E4D3251AFDD17CED40B7BD',
          alt: 'circleGirls_033',
          width: '220',
          height: '220',
        },
      },
    },
  };

  it('should render the component', () => {
    render(<FeatureLinkList {...props} />);
    const title = screen.getByText('Radiant skin');
    const links = document.querySelectorAll('li');
    const image = document.querySelector('img');
    const description = screen.getByText('Do something amazing today!');
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(links).toHaveLength(4);
  });
});
