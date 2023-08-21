import { screen, render } from '@testing-library/react';
import Heading from './Heading';

jest.mock('@sitecore-jss/sitecore-jss-nextjs', () => ({
  Text: (props: { field: { value: string } }) => <span>{props.field.value}</span>,
}));

describe('Heading Test Cases', () => {
  it('Heading should match the text content coming from props', async () => {
    const text = { value: 'Heading' };
    render(<Heading level={1} text={text} />);
    const headingElement: HTMLHeadingElement = screen.getByRole('heading');
    expect(headingElement.textContent).toEqual('Heading');
  });
});
