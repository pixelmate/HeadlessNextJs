import { screen, render } from '@testing-library/react';
import ProductListingGrid from './Cart';

jest.mock('hooks/useTranslate', () => ({
  useTranslate: () => ({
    t: (text: string) => {
      return {
        ShoppingBasket_GridColumnItem: 'Your Item',
        ShoppingBasket_GridColumnItemDescription: 'Description',
        ShoppingBasket_GridColumnItemPrice: 'Item Price',
        ShoppingBasket_GridColumnItemQuantity: 'Quantity',
        ShoppingBasket_GridColumnTotalPrice: 'Total Price',
        ShoppingBasket_GridColumnItemRemove: 'Remove',
        Form_Generic_Tag_PleaseCorrectFollowingErrorsTryAgain: 'Please remove the following error',
        Cart_ContinueShoppingLabel: 'Continue shopping',
        Cart_CheckoutLabel: 'Checkout',
        ShoppingBasket_UpdatingBasket: 'Updating Basket',
      }[text];
    },
  }),
}));

jest.mock('data/lineItem', () => ({
  useDeleteLineItem: () => ({
    mutate: jest.fn(),
    isLoading: false,
    serverError: undefined,
    setServerError: jest.fn(),
    isSuccess: false,
    isError: false,
    error: undefined,
  }),
  useUpdateLineItem: () => ({
    mutate: jest.fn(),
    isLoading: false,
    serverError: undefined,
    setServerError: jest.fn(),
    isSuccess: false,
    isError: false,
    error: undefined,
  }),
  useUpdateLineItems: ([]) => ({
    mutate: jest.fn(),
    isLoading: false,
    serverError: undefined,
    setServerError: jest.fn(),
    isSuccess: false,
    isError: false,
    error: undefined,
  }),
}));

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(),
}));

jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (text: string) => {
      return {
        ShoppingBasket_GridColumnItem: 'Your Item',
        ShoppingBasket_GridColumnItemDescription: 'Description',
        ShoppingBasket_GridColumnItemPrice: 'Item Price',
        ShoppingBasket_GridColumnItemQuantity: 'Quantity',
        ShoppingBasket_GridColumnTotalPrice: 'Total Price',
        ShoppingBasket_GridColumnItemRemove: 'Remove',
        Form_Generic_ValidationMessages_InvalidQuantity:
          'Invalid Quantity ({{productName}} quantities must be {{minQuantity}}- {{maxQuantity}})',
      }[text];
    },
  }),
}));

jest.mock('data/cart', () => ({
  useCartItems: () => ({
    isLoading: false,
    cart: [
      {
        priceSchedule: {
          id: '',
          priceBreaks: [],
        },
        id: '101016',
        isParent: false,
        name: 'Test Product 2',
        description: '',
        quantityMultiplier: 1,
        shipWeight: 8,
        shipHeight: null,
        shipWidth: null,
        shipLength: null,
        active: true,
        specCount: 0,
        variantCount: 0,
        shipFromAddressID: null,
        defaultSupplierID: null,
        allSuppliersCanSell: false,
        returnable: true,
        xp: {
          image: {
            value: {
              src: '/-/media/lifeabundance/products/people/eco-friendly-cleaners/floorwash-180.png',
              alt: 'Floorwash-180',
              height: '180',
              width: '180',
            },
          },
          link: '/products/people/eco-friendly-cleaners/bio-base-floorwash',
          autoshipProduct: true,
          commissionType: 'Standard_Commissions',
          commissionableSale: 42,
          productSKU: '101016',
          size: '120 Count',
          scancode: '794504968811',
          avalaraTaxCode: 'PP050736 Pet Supplies - Pet Supplements',
          tableauProductName: '',
          tableauDivision: '',
          tableauSubdivision: '',
          tableauProductVariant: '',
          tableauProductLine: '',
        },
        quantity: 1,
      },
    ],
  }),
}));

describe('ProductListingGrid', () => {
  const props = {
    rendering: {
      componentName: 'ProductListingGrid',
    },
    params: {},
    fields: {
      DeleteCartLineItem: {
        id: '0282e52a-e42b-4117-9846-a208462afa91',
        url: '/sitecore/content/globals/lookups/api-endpoints/cart/deletecartlineitem',
        name: 'DeleteCartLineItem',
        displayName: 'DeleteCartLineItem',
        fields: {
          Value: {
            value: '/api/cart/delete?id={lineItemId}',
          },
        },
      },
      UpdateCartLineItem: {
        id: 'b82121a9-504b-49f6-9787-b2f1bf8dcb3a',
        url: '/sitecore/content/globals/lookups/api-endpoints/cart/updatecartlineitem',
        name: 'UpdateCartLineItem',
        displayName: 'UpdateCartLineItem',
        fields: {
          Value: {
            value: '/api/cart/update',
          },
        },
      },
      CheckoutCTA: {
        value: {
          linktype: 'internal',
          href: '/checkout/step1',
        },
      },
      Title: {
        value: 'Basket',
      },
    },
  };
  it('Render ChangeUsername', async () => {
    render(<ProductListingGrid {...props} />);
    expect(screen.getByText('Your Item')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Item Price')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Total Price')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
    expect(document.querySelectorAll('tbody').length == 1);
  });
});
