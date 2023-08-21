import { act, renderHook } from '@testing-library/react';
import { useQuantityCalculator } from './useQuantityCalculator';
import { CalculatorSetting } from 'core/molecules/ProductQuantityCalculator/productQuantityCalculator.type';

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

describe('useQuantityCalculator', () => {
  describe('Food Servings', () => {
    const calculatorSettings: CalculatorSetting[] = [
      {
        id: '323dd46a-7bda-4b7b-9f6a-641e4f6efdf5',
        name: 'S',
        fields: {
          Dosage: [],
          Servings: [
            {
              id: '2ab65ce2-ef0a-4bb4-a3c4-80f097a24643',
              name: '1-10',
              fields: {
                MaxVal: {
                  value: 10.0,
                },
                MinVal: {
                  value: 1.0,
                },
                ServingSize: {
                  value: 1.5,
                },
              },
            },
            {
              id: '5e8fb972-5726-4eec-8f26-35fa47accb37',
              name: '11-15',
              fields: {
                MaxVal: {
                  value: 15.0,
                },
                MinVal: {
                  value: 11.0,
                },
                ServingSize: {
                  value: 2.5,
                },
              },
            },
            {
              id: 'c8f9c6e2-9523-4a20-937d-fa23404bfa3d',
              name: '16-20',
              fields: {
                MaxVal: {
                  value: 20.0,
                },
                MinVal: {
                  value: 16.0,
                },
                ServingSize: {
                  value: 3.25,
                },
              },
            },
            {
              id: '5c59e682-10bd-4b54-9434-e3e148d80992',
              name: '21-25',
              fields: {
                MaxVal: {
                  value: 25.0,
                },
                MinVal: {
                  value: 21.0,
                },
                ServingSize: {
                  value: 3.75,
                },
              },
            },
            {
              id: 'fd2cc114-cb49-41af-928e-17b3ade709d7',
              name: '26-30',
              fields: {
                MaxVal: {
                  value: 30.0,
                },
                MinVal: {
                  value: 26.0,
                },
                ServingSize: {
                  value: 4.5,
                },
              },
            },
          ],
          Size: {
            name: 'S',
            fields: {
              Value: {
                value: 'S',
              },
            },
          },
        },
      },
    ];
    const petServingSizes: { key: string; value: string }[] = [
      {
        key: 'sbg',
        value: '6.6',
      },
      {
        key: 'mbg',
        value: '17.6',
      },
      {
        key: 'lbg',
        value: '35.3',
      },
      {
        key: 'sbgCups',
        value: '31',
      },
      {
        key: 'mbgCups',
        value: '83',
      },
      {
        key: 'lbgCups',
        value: '166',
      },
    ];
    const options: { key: string; value: string }[] = [
      {
        key: 'S',
        value: 'Cat',
      },
      {
        key: 'L',
        value: 'Dog',
      },
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any;
    beforeEach(() => {
      result = renderHook(() => useQuantityCalculator()).result;
      act(() => {
        result.current.init(calculatorSettings, petServingSizes, options);
      });
      act(() => {
        result.current.setSelectedOption(options[0].key);
        result.current.setPetWeight('13');
      });
      act(result.current.addPet);
      act(() => {
        result.current.setSelectedOption(options[0].key);
        result.current.setPetWeight('5');
      });
      act(result.current.addPet);
    });

    it('should add a pet', () => {
      act(() => {
        result.current.setSelectedOption(options[0].key);
        result.current.setPetWeight('5');
      });
      act(result.current.addPet);
      expect(result.current.pets.length).toBe(3);
    });

    it('should remove a pet', () => {
      act(() => {
        result.current.removePet(0);
      });
      expect(result.current.pets.length).toBe(1);
    });
    it('calculate amount', () => {
      act(() => {
        result.current.calculate();
      });
      expect(result.current.itemPackages[0].numberOfDays).toBe(8);
      expect(result.current.itemPackages[0].productSize).toBe(6.6);
      expect(result.current.itemPackages[1].numberOfDays).toBe(21);
      expect(result.current.itemPackages[1].productSize).toBe(17.6);
      expect(result.current.itemPackages[2].numberOfDays).toBe(42);
      expect(result.current.itemPackages[2].productSize).toBe(35.3);
    });
  });
  describe('Supplement', () => {
    const calculatorSettings: CalculatorSetting[] = [
      {
        id: 'b08e912b-4506-4efd-aaaf-72f951e1c7e0',
        name: 'S',
        fields: {
          Dosage: [
            {
              id: '1190b12a-6a02-4524-83aa-5102d0d33c85',
              name: '1-24',
              fields: {
                DoseAfterWeekOne: {
                  value: 0.5,
                },
                DoseWeekOne: {
                  value: 1.0,
                },
                MaxVal: {
                  value: 24.0,
                },
                MinVal: {
                  value: 1.0,
                },
              },
            },
            {
              id: 'ac4c5f81-9dd7-45ff-a81e-eccc01c4b44d',
              name: '25-49',
              fields: {
                DoseAfterWeekOne: {
                  value: 1.0,
                },
                DoseWeekOne: {
                  value: 2.0,
                },
                MaxVal: {
                  value: 49.0,
                },
                MinVal: {
                  value: 25.0,
                },
              },
            },
            {
              id: 'a54c242b-7414-447f-adda-f08e5b271f82',
              name: '50-99',
              fields: {
                DoseAfterWeekOne: {
                  value: 1.5,
                },
                DoseWeekOne: {
                  value: 3.0,
                },
                MaxVal: {
                  value: 99.0,
                },
                MinVal: {
                  value: 50.0,
                },
              },
            },
          ],
          Servings: [],
          Size: {
            name: 'S',
            fields: {
              Value: {
                value: 'S',
              },
            },
          },
        },
      },
    ];
    const petServingSizes: { key: string; value: string }[] = [];
    const options: { key: string; value: string }[] = [
      {
        key: 'S',
        value: 'Cat',
      },
      {
        key: 'L',
        value: 'Dog',
      },
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any;
    beforeEach(() => {
      result = renderHook(() => useQuantityCalculator()).result;
      act(() => {
        result.current.init(calculatorSettings, petServingSizes, options);
      });
      act(() => {
        result.current.setSelectedOption(options[0].key);
        result.current.setPetWeight('13');
      });
      act(result.current.addPet);
      act(() => {
        result.current.setSelectedOption(options[0].key);
        result.current.setPetWeight('5');
      });
      act(result.current.addPet);
    });

    it('should add a pet', () => {
      act(() => {
        result.current.setSelectedOption(options[0].key);
        result.current.setPetWeight('14');
      });
      act(result.current.addPet);
      expect(result.current.pets.length).toBe(3);
    });

    it('should remove a pet', () => {
      act(() => {
        result.current.removePet(0);
      });
      expect(result.current.pets.length).toBe(1);
    });
    it('calculate amount', () => {
      act(() => {
        result.current.calculate();
      });
      expect(result.current.itemPackages[0].numberOfDays).toBe(53);
      expect(result.current.itemPackages[0].productSize).toBe(60);
      expect(result.current.itemPackages[1].numberOfDays).toBe(113);
      expect(result.current.itemPackages[1].productSize).toBe(120);
    });
  });
});
