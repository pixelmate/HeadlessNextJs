import { render, screen } from '@testing-library/react';
import ContentTabs from './ContentTabs';
jest.mock('@sitecore-jss/sitecore-jss-nextjs', () => ({
  useSitecoreContext: jest.fn().mockReturnValue({
    sitecoreContext: {
      pageEditing: false,
    },
  }),
  Image: (props: { field: { value: { alt: string | undefined; src: string | undefined } } }) => (
    <img src={props.field.value.src} alt={props.field.value.alt} />
  ),
  RichText: (props: { field: { value: string } }) => <div>{props?.field?.value}</div>,
}));

describe('Render ContentTabs', () => {
  const props = {
    rendering: {
      componentName: 'ContentTabs',
    },
    fields: {
      TabsList: [
        {
          id: '8036dd6d-93bb-4ade-8d9b-266007c8d80b',
          fields: {
            FeaturedIcons: [],
            Title: {
              value: 'Ingredients',
            },
            Description: {
              value:
                'Aloe Leaf Juice, Argan Oil, Apricot Kernel Oil, Hemp Seed Oil, Glycerin, Tocopherol, Bilberry Extract, Sugar Cane Extract, Sugar Maple Extract, Orange Peel Extract, Lemon Peel Extract, Cranberry Fruit Extract, Mango Seed Butter, Shea Butter, Flax Seed, White Willow Bark Extract, Neem Seed Oil, Rosemary Leaf Extract. (All ingredients are organic.)<br />\r\n<div>&nbsp;</div>',
            },
          },
        },
      ],
      Variation: {
        fields: {
          Value: {
            value: 'modern',
          },
        },
      },
    },
    params: {},
  };
  it('Render ContentTabs Title', async () => {
    render(<ContentTabs {...props} />);
    const title = screen.getByText('Ingredients');
    expect(title).toBeInTheDocument();
  });
});
