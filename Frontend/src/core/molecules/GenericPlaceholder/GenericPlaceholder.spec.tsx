import { screen, render } from '@testing-library/react';
import GenericPlaceholder from './GenericPlaceholder';

jest.mock('@sitecore-jss/sitecore-jss-nextjs', () => ({
  useSitecoreContext: jest.fn().mockReturnValue({
    sitecoreContext: {
      pageEditing: false,
    },
  }),
  RichText: (props: { field: { value: string } }) => <div>{props?.field?.value}</div>,
  Text: (props: { field: { value: string } }) => <>{props?.field?.value}</>,
}));

describe('Generic placeholder', () => {
  const props = {
    rendering: {
      componentName: 'GenerivPlaceholder',
    },
    params: {
      BackgroundColorContrast: `{"id":"{3A23713F-CB61-4398-9599-4D832A7F247F}","name":"Green White","fields":{"FontColor":{"value":"#FFFFFF"},"BackgroundColor":{"value":"#53b300"},"BackgroundOpacity":{"value":"1"}}}`,
    },
    fields: {
      Title: {
        value: 'title',
      },
      SubTitle: {
        value: 'bio-based eco-friendly option',
      },
      Description: {
        value: 'we understand the desire to find healthy',
      },
    },
  };

  it('Should render the Generic placeholder component', () => {
    render(<GenericPlaceholder {...props} />);
    const title = screen.getByText('title');
    const subTitle = screen.getByText('bio-based eco-friendly option');
    const description = screen.getByText('we understand the desire to find healthy');
    expect(title).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(description.classList.contains('bg-color-green'));
  });
});
