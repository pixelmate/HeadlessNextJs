import { render, screen } from '@testing-library/react';
import AutoshipUpdate from './AutoshipUpdate';

jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (text: string) => {
      return {
        Autoship_Title: 'Autoship Options',
        Autoship_ChangeLabel: 'Change',
        Autoship_AutoshipNotSelectedDisplayText: 'This order is NOT an autoship order.',
      }[text];
    },
  }),
}));

describe('Autoship update variation', () => {
  it('should render the Autoship update component', () => {
    render(<AutoshipUpdate />);
    expect(screen.getByText('This order is NOT an autoship order.')).toBeInTheDocument();
  });
});
