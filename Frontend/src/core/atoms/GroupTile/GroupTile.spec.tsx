import { render, screen, fireEvent } from '@testing-library/react';
import GroupTile from './GroupTile';

describe('Tile', () => {
  const mockHandleBtn = jest.fn();

  beforeEach(() => {
    render(
      <GroupTile btnLabel="Button" heading="Title" handleBtn={mockHandleBtn}>
        <div>Child content</div>
      </GroupTile>
    );
    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
  });
  it('renders the child content correctly', () => {
    <GroupTile btnLabel="Button" heading="Title" handleBtn={mockHandleBtn}>
      <div>Child content</div>
    </GroupTile>;
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
  it('calls handleBtn when the button is clicked', () => {
    fireEvent.click(screen.getByText('Button'));
    expect(mockHandleBtn).toHaveBeenCalledTimes(1);
  });
});
