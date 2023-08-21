import { render, screen } from '@testing-library/react';
import Panel from './Panel';

describe('FormTemplate', () => {
  const panelTitle = 'Test Form';
  const childComponent = <input type="text" />;
  it('renders the child components', () => {
    render(<Panel panelTitle={panelTitle}>{childComponent}</Panel>);
    const titleElement = screen.getByText(panelTitle);
    expect(titleElement).toBeInTheDocument();
    const childElement = screen.getByRole('textbox');
    expect(childElement).toBeInTheDocument();
  });
});
