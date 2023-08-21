import { act, renderHook } from '@testing-library/react';
import { useProductAttributesHook } from './useProductAttributesHook';
import { ProductDetailAttributes } from 'core/molecules/ProductDetail/productDetail.types';

jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (text: string) => {
      return {
        Search_PreviousPageLabel: 'Previous Page',
        Search_NextPageLabel: 'Next Page',
      }[text];
    },
  }),
}));

describe('useProductAttributesHook', () => {
  describe('ProductAttributes', () => {
    const data: ProductDetailAttributes = {
      Product: {
        ChildProducts: [
          {
            Id: 'testID',
            Name: 'testName',
            Xp: {
              Image: {
                value: {
                  src: '/-/media/lifeabundance/blog/pics/cat-treat-180.png',
                  alt: 'cat-treat-180',
                  height: '180',
                  width: '180',
                },
              },
              Link: '',
              AutoshipProduct: true,
              CommissionType: '',
              CommissionableSale: 0,
              ProductSKU: 'testSKU',
              Size: 'testSize',
              Scancode: 'testScancode',
              AvalaraTaxCode: 'testTaxCode',
              TableauProductName: 'testTableauProductName',
              TableauDivision: 'testTableauDivision',
              TableauSubdivision: 'testTableauSubdivision',
              TableauProductVariant: 'testTableauProductVariant',
              TableauProductLine: 'testTableauProductLine',
            },
            PriceSchedule: [],
          },
        ],
        Specs: null,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any;
    beforeEach(() => {
      result = renderHook(() => useProductAttributesHook()).result;
      act(() => {
        result.current.setChildList(data);
      });
      act(() => {
        result.current.handleIncrement();
      });
    });

    it('Increase quantity', () => {
      act(() => {
        result.current.handleIncrement();
      });
      expect(result.current.totalPrice).toBe(76.5);
      expect(result.current.totalAutoshipPrice).toBe(61.5);
      expect(result.current.productList.length).toBe(1);
    });
    it('Decrese quantity', () => {
      act(() => {
        result.current.handleDecrement();
      });
      expect(result.current.totalPrice).toBe(25.5);
      expect(result.current.totalAutoshipPrice).toBe(20.5);
    });
  });
});
