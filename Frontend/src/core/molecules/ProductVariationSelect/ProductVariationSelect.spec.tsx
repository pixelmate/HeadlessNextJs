import { screen, render, fireEvent } from '@testing-library/react';
import { ProductVariationSelect } from './ProductVariationSelect';

jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (text: string) => {
      return {
        Products_ChooseABundle: 'Choose a bundle:',
      }[text];
    },
  }),
}));

const navigator = {
  push: jest.fn(),
  asPath: 'localhost:3000/products/people/supplements/nutrition-bundle-vanilla',
};
jest.mock('next/router', () => ({
  useRouter: () => navigator,
}));

const props = {
  productLinks: [
    {
      id: '9f5a0224-4425-41ac-b5ff-11f34a5dec63',
      url: '/products/people/supplements/nutrition-bundle-vanilla/page-components/productattributes/nutrition-bundle-vanilla',
      name: 'Nutrition Bundle Vanilla',
      displayName: 'Nutrition Bundle Vanilla',
      fields: {
        Link: {
          value: {
            href: '/products/people/supplements/nutrition-bundle-vanilla',
            text: 'Nutrition Bundle Vanilla',
            anchor: '',
            linktype: 'internal',
            class: '',
            title: '',
            target: '',
            querystring: '',
            id: '{11CA5E3E-4CBD-41B9-A02D-EF0CBAE16C82}',
          },
        },
      },
    },
    {
      id: 'ca2874c0-ff5e-42a5-84aa-d36dc5f842bb',
      url: '/products/people/supplements/nutrition-bundle-vanilla/page-components/productattributes/nutrition-bundle-chocolate',
      name: 'Nutrition Bundle Chocolate',
      displayName: 'Nutrition Bundle Chocolate',
      fields: {
        Link: {
          value: {
            href: '/products/people/supplements/nutrition-bundle-chocolate',
            text: 'Nutrition Bundle Chocolate',
            anchor: '',
            linktype: 'internal',
            class: '',
            title: '',
            target: '',
            querystring: '',
            id: '{6ADC9812-BD61-4904-AB15-CAF891CB318C}',
          },
        },
      },
    },
    {
      id: 'ca2874c0-ff5e-42a5-84aa-6dc5f8d36',
      url: '/products/people/supplements/nutrition-bundle-vanilla/page-components/productattributes/nutrition-bundle-zirni-ar-speki',
      name: 'Nutrition Bundle Zirni ar speki',
      displayName: 'Nutrition Bundle Zirni ar speki',
      fields: {
        Link: {
          value: {
            href: '/products/people/supplements/nutrition-bundle-zirni-ar-speki',
            text: 'Nutrition Bundle Zirni ar speki',
            anchor: '',
            linktype: 'internal',
            class: '',
            title: '',
            target: '',
            querystring: '',
            id: '{6ADC9812-BD61-4904-AB15-6dc5f8d36}',
          },
        },
      },
    },
  ],
};

describe('ProductVariationSelect', () => {
  it('Render ProductVariationSelect', async () => {
    render(<ProductVariationSelect {...props} />);
    expect(screen.getByText('Choose a bundle:')).toBeInTheDocument();
  });

  it('ProductVariationSelect navigates on select', async () => {
    const spy = jest.spyOn(navigator, 'push');
    render(<ProductVariationSelect {...props} />);
    const select = await screen.findByTestId('product-variation-select');
    fireEvent.change(select, {
      target: { value: '/products/people/supplements/nutrition-bundle-vanilla' },
    });
    expect(spy).toBeCalledWith('/products/people/supplements/nutrition-bundle-vanilla');
  });

  it('ProductVariationSelect Wrong order of content', async () => {
    render(<ProductVariationSelect {...{ productLinks: props.productLinks.reverse() }} />);
    const select = await screen.findByTestId('product-variation-select');
    expect((select.firstChild as unknown as { value: string })?.value).toEqual(
      '/products/people/supplements/nutrition-bundle-vanilla'
    );
  });
});
