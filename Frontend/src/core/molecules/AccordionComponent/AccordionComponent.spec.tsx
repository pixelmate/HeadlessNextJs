import { render, screen } from '@testing-library/react';
import React from 'react';
import AccordionComponent from './AccordionComponent';
jest.mock('@sitecore-jss/sitecore-jss-nextjs', () => ({
  useSitecoreContext: jest.fn().mockReturnValue({
    sitecoreContext: {
      pageEditing: false,
    },
  }),
  RichText: (props: { field: { value: string } }) => <div>{props?.field?.value}</div>,
  Text: ({ field }: { field: { value: string } }) => <span>{field.value}</span>,
}));
const props = {
  rendering: {
    componentName: 'Accordion',
  },
  params: {},
  fields: {
    AccordionItems: [
      {
        id: '0a8b8097-67cd-4d10-8ccd-591cee191991',
        fields: {
          Title: {
            value: 'HOW',
          },
          Description: {
            value: 'The',
          },
        },
      },
    ],
    Title: {
      value: '',
    },
  },
};

describe('Render AccordionComponent', () => {
  it('Render Accordion AccordionTitle', async () => {
    render(<AccordionComponent {...props} />);
    const AccordionTitle = screen.getByText('HOW');
    expect(AccordionTitle).toBeInTheDocument();
  });
  it('Render Accordion AccordionDescription', async () => {
    render(<AccordionComponent {...props} />);
    const AccordionDescription = screen.getByText('The');
    expect(AccordionDescription).toBeInTheDocument();
  });
});
