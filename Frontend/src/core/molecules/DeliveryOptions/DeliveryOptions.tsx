import * as yup from 'yup';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useEffect } from 'react';
import { useGetCart } from 'data/cart';
import ShippingInfo from './ShippingInfo';
import { useI18n } from 'next-localization';
import { FieldValues } from 'react-hook-form';
import styles from './DeliveryOptions.module.scss';
import ContactLessPickup from './ContactLessPickup';
import { Button, Tab, Tabs } from 'react-bootstrap';
import { FormComponent } from 'core/atoms/Forms/Form';
import { useShippingRates } from 'data/deliveryOptions';
import { ZIP_CODE } from 'constants/validation-patterns';
import { DeliveryOptionsProps, ShippingDetails } from './DeliveryOptions.type';
import { spinnerAtom, createSpinner } from 'data/atoms/spinner';
import { useGetWarehouseLocations } from 'data/warehouseLocation';
import DeliveryMethodUpdate from '../DeliveryMethodUpdate/DeliveryMethodUpdate';
import { VARIANTS } from 'constants/variants';

const deliveryOptionsFormSchema = (requiredMessage: string, invalidMessage: string) => {
  return yup.object().shape({
    zipcode: yup.string().required(requiredMessage).matches(ZIP_CODE, invalidMessage),
  });
};

const DeliveryOptions = (props: DeliveryOptionsProps) => {
  const { Variation } = props?.params || {};
  const { t } = useI18n();
  const { data: cart } = useGetCart();
  const [zipcode, setZipcode] = useState('');
  const [, setSpinner] = useAtom(spinnerAtom);
  const [showShippingData, setShowShippingData] = useState(false);
  const { shippingRates, loading } = useShippingRates(zipcode);
  const { data: warehouse } = useGetWarehouseLocations();

  const handleSubmit = (formData: { zipcode: string }) => {
    const { zipcode } = formData || {};
    setZipcode(zipcode);
    setShowShippingData(true);
  };

  useEffect(() => {
    if (loading) {
      setSpinner(createSpinner(t('ShoppingBasket_UpdatingBasket')));
    } else {
      setSpinner(null);
    }
  }, [loading]);
  return (
    <>
      {!!Variation && Variation === VARIANTS.CHECKOUT ? (
        <DeliveryMethodUpdate {...props} />
      ) : (
        <div className="px-3">
          <FormComponent<FieldValues>
            onSubmit={handleSubmit}
            validationSchema={deliveryOptionsFormSchema(
              t('DeliveryOptions_ErrorRequired'),
              t('DeliveryOptions_InvalidZip')
            )}
          >
            {({ register, formState: { errors } }) => (
              <>
                <div className="col-8 col-md-6">
                  {errors && (
                    <p className="text-danger m-0 pb-1">{errors?.zipcode?.message as string}</p>
                  )}
                  <div className="d-flex">
                    <input
                      placeholder={t('Form_Generic_Placeholders_EnterZip')}
                      {...register('zipcode')}
                      type="text"
                      className={styles.input}
                      onChange={(e) => {
                        if (!e.target.value) {
                          setShowShippingData(false);
                        }
                      }}
                    />
                    <Button type="submit" variant="secondary" className="border-left-0">
                      {t('DeliveryOptions_UpdateButton')}
                    </Button>
                  </div>
                </div>
                <p className="my-3">{t('Form_Generic_ValidationMessages_ZipRequired')}</p>
              </>
            )}
          </FormComponent>
          <Tabs
            defaultActiveKey={t('DeliveryOptions_ShippingTab')}
            className="my-3 deliveryOptions"
          >
            <Tab
              eventKey={t('DeliveryOptions_ShippingTab')}
              title={t('DeliveryOptions_ShippingTab')}
            >
              {showShippingData ? (
                <ShippingInfo shippingRates={shippingRates} cart={cart as ShippingDetails} />
              ) : (
                <div className="py-4"></div>
              )}
            </Tab>
            <Tab
              eventKey={t('DeliveryOptions_FreeContactlessPickupTab')}
              title={t('DeliveryOptions_FreeContactlessPickupTab')}
            >
              <ContactLessPickup data={warehouse} cart={cart as ShippingDetails} />
            </Tab>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default DeliveryOptions;
