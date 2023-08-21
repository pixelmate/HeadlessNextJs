import { screen, render } from '@testing-library/react';
import { CalendarIcon, FolderIcon, UserIcon } from './';

describe('Icons', () => {
  it('should render CalendarIcon', () => {
    render(<CalendarIcon />);
    const icon: HTMLElement = screen.getByRole('img');
    expect(icon).toBeInTheDocument();
  });

  it('should render FolderIcon', () => {
    render(<FolderIcon />);
    const icon: HTMLElement = screen.getByRole('img');
    expect(icon).toBeInTheDocument();
  });

  it('should render UserIcon', () => {
    render(<UserIcon />);
    const icon: HTMLElement = screen.getByRole('img');
    expect(icon).toBeInTheDocument();
  });
});
