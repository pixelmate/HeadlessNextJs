import { render, screen } from '@testing-library/react';
import { ProductTiles } from './ProductTiles';

jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (text: string) => {
      return { Products_FromPrice: 'From', Products_ProductUnavailable: 'unavailable' }[text];
    },
  }),
}));

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn().mockReturnValue({
    isLoading: false,
    isError: false,
    data: {
      ProductTiles: [
        {
          Id: '101015',
          ParentId: '801d11af-8685-43bf-bc86-f6e7617d53bb',
          Description: '',
          Name: 'Test Product',
          IsAvailable: true,
          Xp: {
            Image: {
              value: {
                src: '/-/media/lifeabundance/products/cats/cat-supplements/pet-fish-both-180.png',
                alt: 'pet-fish-BOTH-180',
                height: '180',
                width: '180',
              },
            },
            Link: '/products/dogs/dog-supplements/fish-oil-for-pets',
            AutoshipProduct: true,
            CommissionType: 'Standard_Commissions',
            CommissionableSale: 21.96,
            ProductSKU: '101015',
            Size: '60 Count',
            Scancode: '794504968811',
            AvalaraTaxCode: 'PP050736 Pet Supplies - Pet Supplements',
            TableauProductName: '',
            TableauDivision: '',
            TableauSubdivision: '',
            TableauProductVariant: '',
            TableauProductLine: '',
          },
          PriceSchedules: [
            {
              Id: '101016-Retail',
              Name: 'Retail',
              MinQuantity: 1,
              MaxQuantity: 100,
              PriceBreaks: [{ Quantity: 1, Price: 23.69, SalePrice: null }],
              Currency: 'USD',
              Xp: {},
            },
          ],
        },
        {
          Id: '101016',
          ParentId: '801d11af-8685-43bf-bc86-f6e7617d53bb',
          Description: '',
          Name: 'Test Product 2',
          IsAvailable: true,
          Xp: {
            Image: {
              value: {
                src: '/-/media/lifeabundance/products/people/eco-friendly-cleaners/floorwash-180.png',
                alt: 'Floorwash-180',
                height: '180',
                width: '180',
              },
            },
            Link: '/products/people/eco-friendly-cleaners/bio-base-floorwash',
            AutoshipProduct: true,
            CommissionType: 'Standard_Commissions',
            CommissionableSale: 42,
            ProductSKU: '101016',
            Size: '120 Count',
            Scancode: '794504968811',
            AvalaraTaxCode: 'PP050736 Pet Supplies - Pet Supplements',
            TableauProductName: '',
            TableauDivision: '',
            TableauSubdivision: '',
            TableauProductVariant: '',
            TableauProductLine: '',
          },
          PriceSchedules: [
            {
              Id: '101016-Retail',
              Name: 'Retail',
              MinQuantity: 1,
              MaxQuantity: 100,
              PriceBreaks: [{ Quantity: 1, Price: 83.69, SalePrice: null }],
              Currency: 'USD',
              Xp: {},
            },
          ],
        },
        {
          Id: '101018',
          ParentId: '36cd4652-4041-4adc-a4a2-28baf48954ba',
          Description: '',
          Name: 'Agility Supplement for Dogs and Cats - 120 Count',
          IsAvailable: false,
          Xp: {
            Image: {
              value: {
                src: '/-/media/lifeabundance/products/cats/cat-supplements/agility-180.png',
                alt: 'Agility-180',
                height: '180',
                width: '180',
              },
            },
            Link: '/products/cats/catsupplements/agility-formula',
            AutoshipProduct: true,
            CommissionType: 'Standard_Commissions',
            CommissionableSale: 38.12,
            ProductSKU: '101018',
            Size: '120 Count',
            Scancode: '7.95E+11',
            AvalaraTaxCode: 'PP050736 Pet Supplies - Pet Supplements',
            TableauProductName: 'Agility for Dogs and Cats',
            TableauDivision: 'Pets',
            TableauSubdivision: 'Pet Supplement',
            TableauProductVariant: '120 Ct.',
            TableauProductLine: 'Problem Solution',
          },
          PriceSchedules: null,
        },
      ],
    },
    error: null,
  }),
}));

const props = {
  rendering: {
    uid: '712c3d03-629b-4025-a7b2-12a9f85adbce',
    componentName: 'ProductTiles',
    dataSource: '{C9FB2E48-AEF7-462A-8877-65BFC936CBDB}',
    params: {
      PriceTextColor: 'DarkTurquoise',
      BackgroundColorContrast:
        '{"id":"{33C957EE-71B9-49E2-99AF-D1BCD08903F8}","name":"SeaSerpent White","fields":{"FontColor":{"value":"#FFFFFF"},"BackgroundColor":{"value":"#48C2C9"},"BackgroundOpacity":{"value":"1"}}}',
      CtaColorContrast:
        '{"id":"{2B681772-4F9F-4657-B9C6-3ABD38B13B25}","name":"Cyan White","fields":{"FontColor":{"value":"#FFFFFF"},"BackgroundColor":{"value":"#00b394"},"BackgroundOpacity":{"value":"1"}}}',
    },
    fields: {
      ApiEndpoint: {
        id: 'fc0507b0-bc66-4fe8-8e37-8584e3f9ca93',
        url: '/sitecore/content/globals/lookups/api-endpoints/products/producttiles',
        fields: { Value: { value: 'api/products/tiles' } },
      },
      CategoryId: [
        { id: '51c09caf-8763-484c-97ae-e27e7faa136f', url: '/products/cats', fields: {} },
        { id: '954e2975-aac5-4ee6-93b2-a69ecbced25c', url: '/products/people', fields: {} },
      ],
    },
  },
  fields: {
    ApiEndpoint: {
      id: 'fc0507b0-bc66-4fe8-8e37-8584e3f9ca93',
      url: '/sitecore/content/globals/lookups/api-endpoints/products/producttiles',
      fields: { Value: { value: 'api/products/tiles' } },
    },
    CategoryId: [
      { id: '51c09caf-8763-484c-97ae-e27e7faa136f', url: '/products/cats', fields: {} },
      { id: '954e2975-aac5-4ee6-93b2-a69ecbced25c', url: '/products/people', fields: {} },
    ],
  },
  params: {
    PriceTextColor: 'DarkTurquoise',
    BackgroundColorContrast:
      '{"id":"{33C957EE-71B9-49E2-99AF-D1BCD08903F8}","name":"SeaSerpent White","fields":{"FontColor":{"value":"#FFFFFF"},"BackgroundColor":{"value":"#48C2C9"},"BackgroundOpacity":{"value":"1"}}}',
    CtaColorContrast:
      '{"id":"{2B681772-4F9F-4657-B9C6-3ABD38B13B25}","name":"Cyan White","fields":{"FontColor":{"value":"#FFFFFF"},"BackgroundColor":{"value":"#00b394"},"BackgroundOpacity":{"value":"1"}}}',
  },
};

describe('ProductTiles Component', () => {
  it('Should render the component', async () => {
    render(<ProductTiles {...props} />);
    const priceTag = await screen.getByText('From 23.69USD');
    const priceTagSecond = await screen.getByText('From 83.69USD');
    const unavailableLabel = await screen.getByText('unavailable');
    const image = await screen.getByAltText('Agility-180');
    expect(priceTag).toBeInTheDocument();
    expect(priceTagSecond).toBeInTheDocument();
    expect(unavailableLabel).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
