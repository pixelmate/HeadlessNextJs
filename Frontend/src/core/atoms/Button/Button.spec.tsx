import { screen, render } from '@testing-library/react';
import Button from './Button';

describe('Button Test Cases', () => {
  it('button should render on screen', async () => {
    render(<Button label="Primary Button" />);
    const buttonElement: HTMLButtonElement = screen.getByRole('button');
    expect(buttonElement).not.toBeNull();
  });

  it('button should render the text content should same', async () => {
    render(<Button label="Primary Button" />);
    const buttonElement: HTMLButtonElement = screen.getByRole('button');
    expect(buttonElement.textContent).toEqual('Primary Button');
  });

  it('button should have the same background color for primary btn', async () => {
    render(<Button btnType="primary" label="Button" />);
    const buttonElement: HTMLButtonElement = screen.getByRole('button');
    expect(buttonElement.classList.contains('text-black'));
  });

  it('button should have the same background color for primary btn', async () => {
    render(<Button btnType="secondary" label="Button" />);
    const buttonElement: HTMLButtonElement = screen.getByRole('button');
    expect(buttonElement.classList.contains('text-white'));
  });
});
