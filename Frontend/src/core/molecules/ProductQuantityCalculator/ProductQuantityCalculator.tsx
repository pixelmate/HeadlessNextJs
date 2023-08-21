import { Form, Button, Container } from 'react-bootstrap';
import { Options, PetSize, ProductQuantityCalculatorProps } from './productQuantityCalculator.type';

import { useI18n } from 'next-localization';
import style from './ProductQuantityCalculator.module.scss';
import { useQuantityCalculator } from 'src/hooks/useQuantityCalculator';
import { CrossCircleIcon, ChevronDownIcon } from 'core/atoms/Icons';
import { useEffect } from 'react';

const ProductQuantityCalculator = (props: ProductQuantityCalculatorProps) => {
  const {
    addPet,
    removePet,
    calculate,
    init,
    pets,
    selectedOption,
    setSelectedOption,
    petWeight,
    setPetWeight,
    recommendation,
    itemPackages,
    inputError,
    options,
    isSupplement,
  } = useQuantityCalculator();
  const { t } = useI18n();

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedOption(event.target.value as PetSize);
  };

  const handleDropdownOptionChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedOption(event.target.value as PetSize);
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPetWeight(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addPet();
  };
  useEffect(() => {
    init(
      props?.fields?.CalculatorSettings,
      props?.fields?.PetServingSize?.value,
      props?.fields?.Options?.value
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let dosage = false;
  let servings = false;

  props?.fields?.CalculatorSettings?.forEach((item) => {
    item?.fields?.Dosage?.length > 0 && (dosage = true);
    item?.fields?.Servings?.length > 0 && (servings = true);
  });
  if (
    (!dosage && !servings) ||
    Object.keys(props?.fields?.Options?.value).length === 0 ||
    (Object.keys(props?.fields?.PetServingSize?.value).length === 0 && !isSupplement) ||
    !props?.fields?.Variation?.fields?.Value?.value
  ) {
    return null;
  }
  return (
    <Container className={style.calculator}>
      <div className={style.calculatorWrapper}>
        <p className={`${style.title} h7`}>{props?.fields?.Title?.value}</p>
        <div className={style.container}>
          <div className={`${style.items} d-flex justify-content-between flex-column flex-md-row`}>
            <div className={style.item}>
              <Form className={style.calculatorFormWrapper} onSubmit={handleSubmit}>
                {isSupplement ? (
                  <Form.Select
                    value={selectedOption}
                    onChange={handleDropdownOptionChange}
                    className={`${style.dropdown} mb-1`}
                  >
                    {props?.fields?.Options?.value?.map((option) => (
                      <option key={option.key} value={option.key}>
                        {option.value}
                      </option>
                    ))}
                  </Form.Select>
                ) : (
                  Object.keys(options).length > 1 && (
                    <Form.Group>
                      {props?.fields?.Options?.value?.map((option) => (
                        <Form.Check
                          key={option.key}
                          type="radio"
                          label={option.value}
                          name="group"
                          value={option.key}
                          checked={selectedOption === option.key}
                          onChange={handleOptionChange}
                          className={`${style.radio} mb-1`}
                        />
                      ))}
                    </Form.Group>
                  )
                )}
                <Form.Group controlId="weight" className="d-flex align-items-center mt-3">
                  <div>{t('Form_Generic_Tag_PetsWeight')}</div>
                  <Form.Control
                    type="number"
                    value={petWeight}
                    onChange={handleWeightChange}
                    inputMode="numeric"
                    onWheel={() => false}
                    className={style.formInput}
                    aria-label="items-quantity"
                  />
                  <div>{t('Products_ProductQuantityCalculator_lbs')}</div>
                </Form.Group>
              </Form>
              <Button type="submit" onClick={addPet} className={`${style.formButton} d-flex`}>
                {t('Products_ProductQuantityCalculator_AddPet')}
                <ChevronDownIcon className={style.actionIcon} />
              </Button>
              <div className="text-danger mt-4">{inputError}</div>
            </div>
            <div className={`${style.item} p-0 flex-grow-1 h-auto`}>
              <div className={!pets.length ? 'd-none' : ''}>
                {pets.map((pet, index) => (
                  <div key={index} className={`${style.petItem} justify-content-between d-flex`}>
                    <div>
                      {<b>{options[pet.petSize as keyof Options]}</b>}
                      {!!isSupplement && ': Adult'} - {pet.petWeight}{' '}
                      {t('Products_ProductQuantityCalculator_lbs')}
                    </div>
                    <div
                      onClick={() => removePet(index)}
                      className={`${style.removePet} justify-content-between d-flex`}
                    >
                      <CrossCircleIcon />
                    </div>
                  </div>
                ))}
                <Button
                  onClick={calculate}
                  className={`${style.formButton} ${style.calculateBtn} d-flex`}
                >
                  {t('Products_ProductQuantityCalculator_Calculate')}
                  <ChevronDownIcon className={style.actionIcon} />
                </Button>
                <div
                  className={`${style.recommendationWrapper} mb-5 ${!recommendation && 'd-none'}`}
                >
                  <p dangerouslySetInnerHTML={{ __html: recommendation }} />

                  {itemPackages.map(
                    (item) =>
                      item.productSize && (
                        <p key={item.productSize}>
                          {isSupplement
                            ? t(
                                'Products_ProductQuantityCalculator_SupplementRecommendationPoints',
                                {
                                  BottleSize: item.productSize,
                                  BottleDuration: item.numberOfDays,
                                }
                              )
                            : t('Products_ProductQuantityCalculator_RecommendationPoints', {
                                BagWeight: item.productSize,
                                BagDuration: item.numberOfDays,
                              })}
                        </p>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductQuantityCalculator;
