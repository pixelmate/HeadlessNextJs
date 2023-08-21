import { render } from '@testing-library/react';
import ColumnSplitter from './ColumnSplitter';

describe('Column Splitter', () => {
  const props = {
    rendering: {
      componentName: 'ColumnSplitter',
    },
    fields: {
      Image: {
        value: {
          src: '/-/media/lifeabundance/blog/pics/napping-in-bed.png?h=330&iar=0&w=530&hash=89ECC0E8BD6DC100609EE05A3528A066',
          alt: 'napping-in-bed',
        },
      },
      MobileImage: {
        value: {
          src: '/-/media/lifeabundance/blog/pics/bentley.png?h=394&iar=0&w=299&hash=B43A60054D662C6FB1B3788255FCADF7',
          alt: 'Bentley',
        },
      },
    },
    params: {
      ColumnSize: '["4-12-12","4-12-12","4-12-12"]',
      GapSize: '2-1-2',
      IsFullWidthDeviceSpecific: 'true-true-false',
      Alignment: 'center',
      BackgroundColorContrast:
        '{"id":"{E3FEEBE4-61AC-4D21-8B1B-FF34C4380BA2}","name":"Pearl Wood","fields":{"FontColor":{"value":"#791d00"},"BackgroundColor":{"value":"#fcecd4"},"BackgroundOpacity":{"value":1}}}',
    },
  };

  it('renders the correct number of columns', () => {
    render(<ColumnSplitter {...props} />);
    const columns = document.querySelectorAll('.col-lg-4');
    const row = document.querySelector('.d-flex');
    const image = document.querySelector('img');
    expect(row).toHaveClass(`justify-content-center`);
    expect(columns[0]).toHaveClass(`px-2`);
    expect(columns.length).toBe(3);
    expect(image).toBeInTheDocument();
  });
});
