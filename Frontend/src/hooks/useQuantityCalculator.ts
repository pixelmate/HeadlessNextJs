import {
  BAG_SIZE,
  MAX_DAYS,
  MIN_DAYS,
  WEIGHT_ERROR_MESSAGES,
  WEIGHT_LIMITS,
} from 'constants/calculator';
import {
  PetSize,
  Pet,
  ProductItem,
  ProductSize,
  ProductDosing,
  DailyServingMatrix,
  CalculatorSetting,
  Bag,
  Options,
  DailyDosageMatrix,
} from 'core/molecules/ProductQuantityCalculator/productQuantityCalculator.type';
import { useI18n } from 'next-localization';
import numberToWords from 'utils/numberToWords';
import { useState } from 'react';

interface SettingsState {
  matrix?: DailyServingMatrix;
  dosageMatrix?: DailyDosageMatrix;
  dosing: ProductDosing;
}

export const useQuantityCalculator = () => {
  const [recommendation, setRecommendation] = useState('');
  const [inputError, setInputError] = useState('');
  const [itemPackages, setItemPackages] = useState<Bag[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [options, setOptions] = useState({} as Options);
  const [isSupplement, setSupplement] = useState(false);
  const [settings, setSettings] = useState<SettingsState>({
    matrix: {} as DailyServingMatrix,
    dosageMatrix: {} as DailyDosageMatrix,
    dosing: {} as ProductDosing,
  });
  const { t } = useI18n();

  const init = (
    calculatorSetting?: CalculatorSetting[],
    petServingSizes?: { key: string; value: string }[],
    options?: { key: string; value: string }[]
  ) => {
    const dailyServingMatrix = {} as DailyServingMatrix;
    const dailyDosageMatrix = {} as DailyDosageMatrix;
    const productDosing = {} as ProductDosing;
    const selectionOptions = {} as Options;
    calculatorSetting?.forEach((petSizeSettings) => {
      dailyServingMatrix[petSizeSettings.name as PetSize] = petSizeSettings?.fields?.Servings?.map(
        (servingSettings) => ({
          min: servingSettings.fields.MinVal.value,
          max: servingSettings.fields.MaxVal.value,
          dailyServing: servingSettings.fields.ServingSize.value,
        })
      );
      dailyDosageMatrix[petSizeSettings.name as PetSize] = petSizeSettings?.fields?.Dosage?.map(
        (servingSettings) => ({
          min: servingSettings?.fields?.MinVal.value as number,
          max: servingSettings?.fields?.MaxVal.value as number,
          doseWeekOne: servingSettings?.fields?.DoseWeekOne.value as number,
          doseAfterWeekOne: servingSettings?.fields?.DoseAfterWeekOne.value as number,
        })
      );
    });

    petServingSizes?.forEach((petServingSize) => {
      productDosing[petServingSize.key as keyof ProductDosing] = parseFloat(petServingSize.value);
    });
    options?.forEach((option) => {
      selectionOptions[option.key as keyof Options] = option.value;
    });
    setOptions(selectionOptions);
    setSettings({
      matrix: dailyServingMatrix,
      dosageMatrix: dailyDosageMatrix,
      dosing: productDosing,
    });
    if (calculatorSetting && calculatorSetting[0]?.fields?.Dosage?.length > 0) {
      setSelectedOption(Object.keys(selectionOptions)[1] as PetSize);
      setSupplement(true);
    }
  };

  const getAutoShipRecommendation = (products: number, size: number, numberOfDays: number) => {
    const weeks = Math.round((numberOfDays - (numberOfDays % 7)) / 7);
    const bagText = `${
      products > 1
        ? `<b>${numberToWords(products)} bags of ${size} lb.</b>`
        : `a <b>${size} lb. bag</b>`
    }`;
    const bottleText = `${products > 1 ? `${numberToWords(products)} ` : ''}${size}`;
    const bagRecommendation = t('Products_ProductQuantityCalculator_Recommendation', {
      BagWeight: bagText,
      BagDuration: numberOfDays,
      Frequency: weeks,
    });
    const bottleRecommendation = t('Products_ProductQuantityCalculator_SupplementRecommendation', {
      BottleSize: bottleText,
      BottleDuration: numberOfDays,
      Frequency: weeks,
    });
    if (isSupplement) {
      return bottleRecommendation;
    } else {
      return bagRecommendation;
    }
  };

  const addPet = () => {
    let weightLimit = WEIGHT_LIMITS[selectedOption as PetSize];
    let sizeSelectedOption = selectedOption as PetSize;
    if (Object.keys(options).length === 1) {
      weightLimit = WEIGHT_LIMITS[Object.keys(options)[0] as PetSize];
      sizeSelectedOption = Object.keys(options)[0] as PetSize;
    }
    if (sizeSelectedOption && petWeight && +petWeight <= weightLimit) {
      const newPet: Pet = {
        petSize: sizeSelectedOption,
        petWeight: +petWeight,
      };
      if (pets.length >= 10) {
        setInputError(t('Products_ProductQuantityCalculator_Recommendation'));
      } else {
        setPets([...pets, newPet]);
      }
      !isSupplement && setSelectedOption('');
      setPetWeight('');
      setInputError('');
    } else if (+petWeight > weightLimit) {
      setInputError(WEIGHT_ERROR_MESSAGES[sizeSelectedOption as PetSize]);
    } else {
      setInputError(t('Products_ProductQuantityCalculator_ValuesError'));
    }
  };
  const removePet = (index: number): void => {
    const newPets = [...pets];
    newPets.splice(index, 1);
    setPets(newPets);
    setRecommendation('');
    setItemPackages([]);
    setInputError('');
  };

  const getPackageSize = (
    productPackage: Map<ProductSize, ProductItem>,
    productDosing: ProductDosing
  ) => {
    const newItems = Array.from(productPackage, ([size, item]) => ({
      productSize: productDosing[`${size[0]}bg` as keyof ProductDosing],
      numberOfDays: item.numOfDays,
    }));
    setItemPackages(newItems);
    const reverseBagEntries = Array.from(productPackage.entries()).reverse();
    for (const [size, item] of productPackage.entries()) {
      if (item.numOfDays >= MAX_DAYS) {
        setRecommendation(
          getAutoShipRecommendation(
            1,
            productDosing[`${size[0]}bg` as keyof ProductDosing],
            item.numOfDays
          )
        );
        break;
      }
    }
    for (const [size, item] of reverseBagEntries) {
      if (item.numOfDays >= MIN_DAYS && item.numOfDays <= MAX_DAYS) {
        setRecommendation(
          getAutoShipRecommendation(
            1,
            productDosing[`${size[0]}bg` as keyof ProductDosing],
            item.numOfDays
          )
        );
        break;
      }
    }

    const largeBag = productPackage.get(BAG_SIZE.L);

    if (largeBag && largeBag.numOfDays < MIN_DAYS) {
      const numOfLargeBags = Math.ceil(MIN_DAYS / largeBag.numOfDays);
      setRecommendation(
        getAutoShipRecommendation(
          numOfLargeBags,
          productDosing.lbg,
          largeBag.numOfDays * numOfLargeBags
        )
      );
      setItemPackages([]);
    }
  };
  const getDosageSize = (
    petSize: PetSize,
    petWeight: number,
    dailyServingMatrix: DailyDosageMatrix
  ) => {
    const sizedServings = dailyServingMatrix[petSize];
    const servingData = sizedServings?.find(
      ({ min, max }) => petWeight >= min && (!max || petWeight <= max)
    );
    const weekOne = servingData
      ? servingData?.doseWeekOne
      : sizedServings[sizedServings?.length - 1]?.doseWeekOne;
    const afterWeekOne = servingData
      ? servingData?.doseAfterWeekOne
      : sizedServings[sizedServings.length - 1]?.doseAfterWeekOne;
    return { weekOne, afterWeekOne };
  };
  const getServingSize = (
    petSize: PetSize,
    petWeight: number,
    dailyServingMatrix: DailyServingMatrix
  ) => {
    const sizedServings = dailyServingMatrix[petSize];

    const servingData = sizedServings?.find(
      ({ min, max }) => petWeight >= min && (!max || petWeight <= max)
    );

    return servingData
      ? servingData?.dailyServing
      : sizedServings[sizedServings?.length - 1]?.dailyServing;
  };

  const calculate = () => {
    const packages = new Map<ProductSize, ProductItem>();
    let petServingBottle;
    let petServingCups;
    if (isSupplement) {
      petServingBottle = pets.reduce(
        (acc, { petWeight, petSize }) => {
          const { weekOne, afterWeekOne } = getDosageSize(
            petSize,
            petWeight,
            settings?.dosageMatrix as DailyDosageMatrix
          );
          return {
            weekOne: acc.weekOne + weekOne,
            afterWeekOne: acc.afterWeekOne + afterWeekOne,
          };
        },
        { weekOne: 0, afterWeekOne: 0 }
      );
    }
    if (Object.keys(settings.matrix as DailyServingMatrix).length > 0) {
      petServingCups = pets.reduce((acc, { petWeight, petSize }) => {
        if (Object.keys(options).length === 1) {
          if (petWeight > 3) {
            return acc + getServingSize(petSize, petWeight, settings.matrix as DailyServingMatrix);
          } else {
            return acc;
          }
        } else {
          return acc + getServingSize(petSize, petWeight, settings.matrix as DailyServingMatrix);
        }
      }, 0);
    }
    if (petServingCups && petServingCups > 0) {
      packages.set(BAG_SIZE.S, {
        numOfDays: Math.round(settings.dosing.sbgCups / petServingCups),
      });
      packages.set(BAG_SIZE.M, {
        numOfDays: settings.dosing.mbg ? Math.round(settings.dosing.mbgCups / petServingCups) : 0,
      });
      packages.set(BAG_SIZE.L, {
        numOfDays: Math.round(settings.dosing.lbgCups / petServingCups),
      });
      getPackageSize(packages, settings.dosing);
    }
    if (petServingBottle && petServingBottle?.weekOne > 0 && petServingBottle?.afterWeekOne > 0) {
      const totalPetDoseWeek1 = petServingBottle?.weekOne * 7;
      const totalPetDoseAfterWeek1 = petServingBottle?.afterWeekOne;
      packages.set(BAG_SIZE.M, {
        numOfDays: Math.round((60 - totalPetDoseWeek1) / totalPetDoseAfterWeek1) + 7,
      });
      packages.set(BAG_SIZE.L, {
        numOfDays: Math.round((120 - totalPetDoseWeek1) / totalPetDoseAfterWeek1) + 7,
      });
      getPackageSize(packages, { mbg: 60, lbg: 120 } as ProductDosing);
    }
  };
  return {
    addPet,
    removePet,
    calculate,
    init,
    selectedOption,
    setSelectedOption,
    petWeight,
    setPetWeight,
    pets,
    recommendation,
    itemPackages,
    inputError,
    options,
    isSupplement,
  };
};
