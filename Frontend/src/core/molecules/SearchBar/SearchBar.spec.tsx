import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
jest.mock('@sitecore-jss/sitecore-jss-nextjs', () => ({
  useSitecoreContext: jest.fn().mockReturnValue({
    sitecoreContext: {
      SearchPage: '/test',
    },
  }),
}));
jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (text: string) => {
      return {
        Form_Generic_Placeholders_EnterYourSearchTerm: 'Enter text...',
      }[text];
    },
  }),
}));
describe('Render Search bar', () => {
  const props = {
    isSearchBarVisible: true,
    toggleSearchBar: () => null,
  };
  it('Render Search bar placeholder', async () => {
    render(<SearchBar {...props} />);
    const placeholder = screen.getByPlaceholderText('Enter text...');
    expect(placeholder).toBeInTheDocument();
  });
});
