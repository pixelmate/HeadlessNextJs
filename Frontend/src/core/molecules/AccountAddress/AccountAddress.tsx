import { useI18n } from 'next-localization';
import { FormComponent } from 'core/atoms/Forms/Form';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Heading from 'core/atoms/Heading/Heading';
import Checkbox from 'core/atoms/Forms/Checkbox';
import { useShippingAddress } from 'hooks/useShippingAddress/useShippingAddress';
import useRegionCodes from 'hooks/useRegionCodes/useRegionCodes';
import { getDefaultSelectedState, getMappedStateOptions } from 'utils/getAddressState';
import { SelectValue } from 'core/atoms/Forms/components/SelectField/SelectField.type';
import { AccountAddressProps } from './AccountAddress.type';
import { useOrders, useUpdateShippingAddress } from 'data/user';
import { useAtom } from 'jotai';
import { address } from 'data/atoms/address';
import { mapBillingAddress, mapShippingAddress } from 'src/schemas/address';
import styles from './AccountAddress.module.scss';
import { useBillingAddress } from 'hooks/useBillingAddress/useBillingAddress';
import { shippingAddressSchema } from 'src/schemas/formSchemas/AccountAddressSchema';
import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import ShippingAddressFields from 'core/atoms/ShippingAddressFields';
import BillingAddressFields from 'core/atoms/BillingAddressFields';
import { Order } from 'ordercloud-javascript-sdk';
import { useRouter } from 'next/router';
import { usePartialUpdateShippingAddress } from 'data/order';
import { upperFirst } from 'lodash';
import { createSpinner, spinnerAtom } from 'data/atoms/spinner';

const AccountAddress = (props: AccountAddressProps): JSX.Element => {
  const { t } = useI18n();
  const router = useRouter();
  const { orders, isFetched } = useOrders({
    'xp.IsAutoShipOrder': true,
    Status: 'Open',
  });
  const { Title, CancelButtonCTA, SaveButtonCTA } = props?.fields || {};
  const [isUpdateAutoShipOrderRequired, setIsUpdateAutoShipOrderRequired] = useState(false);
  const [isSameAsShippingAddress, setIsSameAsShippingAddress] = useState(false);
  const [generateForm, setGenerateForm] = useState(false);
  const { shippingAddress } = useShippingAddress();
  const { billingAddress } = useBillingAddress();
  const [isAllDataPrepared, setIsAllDataPrepared] = useState(false);
  const { mutate: updateAddress } = useUpdateShippingAddress({
    onSuccess: () => {
      router.push(SaveButtonCTA?.value?.href as string);
    },
  });
  const { mutate: partiallyUpdateShippingAddress } = usePartialUpdateShippingAddress(
    SaveButtonCTA?.value?.href as string
  );
  const [stateOptions, setStateOptions] = useState<SelectValue<string, RegionItem>[]>([]);
  const [isShippingAddressUpdated, setIsShippingAddressUpdated] = useState(false);
  const [isBillingAddressUpdated, setIsBillingAddressUpdated] = useState(false);

  const [formDefaultValues, setFormDefaultValues] = useAtom(address);

  const getOrdersForAddressUpdate = () => {
    const filteredOrders = orders?.Items?.filter(
      (order: Order) => order.ShippingAddressID !== shippingAddress?.ID
    );
    const orderIds = filteredOrders?.map((order: Order) => order?.ID);
    return orderIds;
  };

  const [, setSpinner] = useAtom(spinnerAtom);

  useRegionCodes({
    onSuccess: (data) => {
      if (data && data.length > 0) {
        const options = getMappedStateOptions(data);
        setStateOptions(options);
        setFormDefaultValues({
          ...formDefaultValues,
          state: getDefaultSelectedState(options, shippingAddress as AddressItem),
          stateBilling: getDefaultSelectedState(options, billingAddress as AddressItem),
        });
      }
    },
    onSettled: () => {
      setIsAllDataPrepared(true);
    },
  });

  const handleUseShippingCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setIsSameAsShippingAddress(true);
      updateBillingFormOnCheckboxTrue();
    } else {
      setIsSameAsShippingAddress(false);
    }
  };

  const getPhoneNumberParts = (phone: string) => {
    if (phone.includes('-')) {
      return phone.split('-');
    }
    return phone;
  };

  const updateBillingFormOnCheckboxTrue = () => {
    setFormDefaultValues((prevState) => ({
      ...prevState,
      firstNameBilling: formDefaultValues?.firstName,
      lastNameBilling: formDefaultValues?.lastName,
      companyNameBilling: formDefaultValues?.companyName,
      addressBilling: formDefaultValues?.address,
      cityBilling: formDefaultValues?.city,
      stateBilling: formDefaultValues?.state,
      zipBilling: formDefaultValues?.zip,
      id: formDefaultValues?.id,
    }));
  };

  const updateAutoshipCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setIsUpdateAutoShipOrderRequired(true)
      : setIsUpdateAutoShipOrderRequired(false);
  };

  useEffect(() => {
    let phoneNumber;
    if (billingAddress && billingAddress?.Phone) {
      phoneNumber = getPhoneNumberParts(billingAddress?.Phone as string);
    }

    if (!isSameAsShippingAddress && !generateForm) {
      setFormDefaultValues({
        ...formDefaultValues,
        id: shippingAddress?.ID || '',
        firstName: shippingAddress?.FirstName || '',
        lastName: shippingAddress?.LastName || '',
        companyName: shippingAddress?.CompanyName || '',
        address: `${shippingAddress?.Street1 || ''} ${shippingAddress?.Street2 || ''}`,
        city: shippingAddress?.City || '',
        state: shippingAddress?.State || '',
        zip: shippingAddress?.Zip || '',
        firstNameBilling: billingAddress?.FirstName || '',
        lastNameBilling: billingAddress?.LastName || '',
        companyNameBilling: billingAddress?.CompanyName || '',
        addressBilling: `${billingAddress?.Street1 || ''} ${billingAddress?.Street2 || ''}`,
        cityBilling: billingAddress?.City || '',
        stateBilling: billingAddress?.State || '',
        zipBilling: billingAddress?.Zip || '',
        areaCodeBilling: billingAddress?.Phone ? (phoneNumber && phoneNumber[0]) ?? '' : '',
        phonePrefixBilling: billingAddress?.Phone ? (phoneNumber && phoneNumber[1]) ?? '' : '',
        phoneLineNumberBilling: billingAddress?.Phone ? (phoneNumber && phoneNumber[2]) ?? '' : '',
        phoneExtBilling: billingAddress?.Phone ? (phoneNumber && phoneNumber[0]) ?? '' : '',
        emailBilling: billingAddress?.xp?.Email || '',
      });
    }
  }, [shippingAddress, billingAddress, isFetched, isSameAsShippingAddress]);

  useEffect(() => {
    if (!generateForm) {
      setSpinner(createSpinner(t('Common_Loading')));
    } else {
      setSpinner(null);
    }
  }, [generateForm]);

  useEffect(() => {
    if (shippingAddress?.ID === formDefaultValues?.id && !generateForm) {
      setGenerateForm(true);
    }
  }, [formDefaultValues]);

  const autoShipOrdersCount = t('MyAccountAddress_AutoshipMessage', {
    count: orders?.Items?.length,
  });

  function handleSubmit(formData: AddressUpdateForm): void {
    const orderIds = getOrdersForAddressUpdate();
    if (orderIds?.length && isUpdateAutoShipOrderRequired) {
      orderIds?.forEach((orderId: string) => {
        partiallyUpdateShippingAddress({
          direction: 'Outgoing',
          id: orderId as string,
          body: mapShippingAddress({
            formData: formData,
            address: shippingAddress as AddressItem,
          }),
        });
      });
    } else {
      if (isShippingAddressUpdated) {
        if (shippingAddress && shippingAddress.ID) {
          updateAddress({
            id: shippingAddress.ID,
            body: mapShippingAddress({
              formData: formData,
              address: shippingAddress as AddressItem,
            }),
          });
        }
      }
      if (isBillingAddressUpdated) {
        if (billingAddress && billingAddress.ID) {
          updateAddress({
            id: billingAddress.ID,
            body: mapBillingAddress({
              formData: formData,
              address: billingAddress as AddressItem,
            }),
          });
        }
      }
    }
  }

  const checkBillingPresence = (inputString: string): boolean => {
    return inputString.toLowerCase().includes('billing');
  };

  useEffect(() => {
    const isShippingAddressUpdated =
      shippingAddress &&
      formDefaultValues &&
      Object.keys(formDefaultValues).some((key: string) => {
        if (!checkBillingPresence(key)) {
          const shippingKey = upperFirst(key);
          if (key === 'id') {
            return false; // Skip the "ID" key
          }
          if (key === 'address') {
            return (
              formDefaultValues[key] !== `${shippingAddress?.Street1} ${shippingAddress?.Street2}`
            );
          }
          return (
            formDefaultValues[key as keyof typeof formDefaultValues] !==
            shippingAddress[shippingKey as keyof typeof shippingAddress]
          );
        }
        return false;
      });
    setIsShippingAddressUpdated(isShippingAddressUpdated ?? false);
    const isBillingAddressUpdated =
      billingAddress &&
      formDefaultValues &&
      Object.keys(formDefaultValues).some((key: string) => {
        if (checkBillingPresence(key)) {
          const extractKeyName = key.replace(/Billing/g, '');
          const billingKey = upperFirst(extractKeyName);
          if (extractKeyName === 'id') {
            return false; // Skip the "ID" key
          }
          if (extractKeyName === 'address') {
            return (
              formDefaultValues[key as keyof typeof formDefaultValues] !==
              `${billingAddress?.Street1} ${billingAddress?.Street2}`
            );
          }
          return (
            formDefaultValues[key as keyof typeof formDefaultValues] !==
            billingAddress[billingKey as keyof typeof billingAddress]
          );
        }
        return false;
      });
    setIsBillingAddressUpdated(isBillingAddressUpdated ?? false);
  }, [shippingAddress, formDefaultValues, billingAddress]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Row>
              <Col>
                <Heading level={2} text={Title} className="pb-4" />
              </Col>
            </Row>
            {generateForm && (
              <FormComponent<AddressUpdateForm>
                onSubmit={handleSubmit}
                validationSchema={shippingAddressSchema}
                serverError={null}
                useFormProps={{ defaultValues: formDefaultValues }}
              >
                {({ register, formState: { errors }, setValue, trigger }) => (
                  <>
                    <Row>
                      <Col md={6}>
                        <div className={styles.addressPanel}>
                          <div className={styles.addressPanel_heading}>
                            {t('MyAccountAddress_ShippingAddress_Header')}
                          </div>
                          <div className={styles.addressPanel_addressPanelForm}>
                            {isAllDataPrepared && (
                              <ShippingAddressFields
                                t={t}
                                register={register}
                                errors={errors}
                                formDefaultValues={formDefaultValues}
                                setFormDefaultValues={setFormDefaultValues}
                                stateOptions={stateOptions}
                                trigger={trigger}
                              />
                            )}
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className={styles.addressPanel}>
                          <div className={styles.addressPanel_heading}>
                            {t('MyAccountAddress_BillingAddress_Header')}
                          </div>
                          <div className={styles.addressPanel_addressPanelForm}>
                            {isAllDataPrepared && (
                              <BillingAddressFields
                                t={t}
                                register={register}
                                errors={errors}
                                formDefaultValues={formDefaultValues}
                                stateOptions={stateOptions}
                                handleUseShippingCheckbox={handleUseShippingCheckbox}
                                isSameAsShippingAddress={isSameAsShippingAddress}
                                setValue={setValue}
                                trigger={trigger}
                              />
                            )}
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="text-center py-4">
                      <Col>
                        {orders?.Items?.length ? (
                          <>
                            <p dangerouslySetInnerHTML={{ __html: autoShipOrdersCount }}></p>

                            <Checkbox
                              name="updateAllAutoshipOrders"
                              label={t('MyAccountAddress_AutoshipCheckboxText')}
                              className="pb-3 text-center"
                              onChange={(e) => updateAutoshipCheckbox(e)}
                            />
                          </>
                        ) : null}
                        <Link
                          field={CancelButtonCTA}
                          className={`${styles.addressPanel_cancel} btn btn-light me-4`}
                        ></Link>
                        <Button variant="success" type="submit">
                          {SaveButtonCTA?.value?.text}
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
              </FormComponent>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AccountAddress;
