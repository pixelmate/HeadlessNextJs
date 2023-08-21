import { render, screen } from '@testing-library/react';
import Classic from './Classic';

jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (text: string) => {
      return {
        Authentication_Login_SignInTimedOut: 'Timed out',
        Authentication_Login_SignInAgain: 'Please LogIn Again',
      }[text];
    },
  }),
}));

describe('FormTemplate', () => {
  const props = {
    rendering: {
      componentName: 'ColumnSplitter',
    },
    fields: {
      Title: {
        value: 'Existing Users',
      },
      Image: {
        value: {
          src: 'https://cm.lifeabundance.localhost/-/media/lifeabundance/herobanner/cf-main-img-80.jpg?h=1227&iar=0&w=2038&hash=BAE8B9401F979FAE77B7F28B008318C1',
          alt: 'test',
        },
      },
    },
    params: {
      TitleAlignment: 'right',
      Variation: 'Classic',
      BackgroundColorContrast:
        '{"id":"{E3FEEBE4-61AC-4D21-8B1B-FF34C4380BA2}","name":"Pearl Wood","fields":{"FontColor":{"value":"#791d00"},"BackgroundColor":{"value":"#fcecd4"},"BackgroundOpacity":{"value":1}}}',
    },
  };
  it('renders the child components', () => {
    render(<Classic {...props} />);
    const titleElement = screen.getByText('Existing Users');
    expect(titleElement).toBeInTheDocument();
    const textColorClass = document.querySelector('.color-wood');
    const bgColorClass = document.querySelector('.bg-color-pearl');
    expect(textColorClass).toBeInTheDocument();
    expect(bgColorClass).toBeInTheDocument();
  });
});
