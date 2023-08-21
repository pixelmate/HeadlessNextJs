import { Modal as RbModal } from 'react-bootstrap';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { object as yupObject, string as yupString } from 'yup';
import { useTranslate } from 'hooks/useTranslate';
import TextInput from 'core/atoms/Forms/TextInput';
import { FormComponent } from 'core/atoms/Forms/Form';
import { modalAtom } from 'data/atoms/modal';
import { useAtom } from 'jotai';
import SelectField from 'core/atoms/Forms/components/SelectField/SelectField';
import styles from './ShippingAddressModal.module.scss';
import { ZIP_CODE } from 'constants/validation-patterns';
import { useState } from 'react';
import { SelectValue } from 'core/atoms/Forms/components/SelectField/SelectField.type';
import { ShippingAddressProps } from './ShippingAddress.type';
import useRegionCodes from 'hooks/useRegionCodes/useRegionCodes';
import ErrorList from '../../atoms/ErrorList/ErrorList';
import { useValidateAddress } from 'data/validateAddress';
import {
  getMappedAddressEasyPost,
  getMappedShippingAddress,
  getMappedValidationErrorsMessage,
} from 'utils/Address/Address';
import { useZipCode } from 'hooks/useZipCode/useZipCode';

const shippingAddressSchema = yupObject().shape({
  firstName: yupString().required('ShippingAddress_AddUpdate_RequiredLabel'),
  lastName: yupString().required('ShippingAddress_AddUpdate_RequiredLabel'),
  address: yupString().required('ShippingAddress_AddUpdate_RequiredLabel'),
  apartment: yupString(),
  city: yupString().required('ShippingAddress_AddUpdate_RequiredLabel'),
  state: yupString().required('ShippingAddress_AddUpdate_RequiredLabel'),
  zip: yupString()
    .required('ShippingAddress_AddUpdate_RequiredLabel')
    .matches(ZIP_CODE, 'ShippingAddress_AddUpdate_InvalidFormat')
    .max(20, 'ShippingAddress_AddUpdate_ZipLength'),
});

const ShippingAddressModal = (props: ShippingAddressProps): JSX.Element => {
  const { confirmButtonName, shippingAddress, setRecommendedAddress, setHoldShippingAddress } =
    props;
  const { t } = useTranslate();
  const { getZipErrors } = useZipCode();
  const [, setModal] = useAtom(modalAtom);

  useRegionCodes({
    onSuccess: (data) => {
      if (data && data.length > 0) {
        const options = getMappedStateOptions(data);
        setStateOptions(options);
        setFormDefaultValues({ ...formDefaultValues, state: getDefaultSelectedState(options) });
      }
    },
    onSettled: () => {
      setIsAllDataPrepared(true);
    },
  });
  const { mutate: validateEasyPost } = useValidateAddress({
    onSuccess: undefined,
    onSettled: (data) => {
      if (!!data && data.StatusCode === '200' && data.Data.Success) {
        const newAddress = {
          ...tmpAddress,
          ...data.Data,
        };
        setHoldShippingAddress(tmpAddress);
        setRecommendedAddress(newAddress);
        setModal(null);
      } else if (data) {
        setValidationErrors(getMappedValidationErrorsMessage(data.Data.Errors));
      }
    },
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [tmpAddress, setTmpAddress] = useState<AddressItem>();
  const [stateOptions, setStateOptions] = useState<SelectValue<string, RegionItem>[]>([]);
  const [formDefaultValues, setFormDefaultValues] = useState<ShippingAddressForm>({
    firstName: shippingAddress?.FirstName?.toLocaleUpperCase() || '',
    lastName: shippingAddress?.LastName?.toLocaleUpperCase() || '',
    address: shippingAddress?.Street1?.toLocaleUpperCase() || '',
    apartment: shippingAddress?.Street2?.toLocaleUpperCase() || '',
    city: shippingAddress?.City?.toLocaleUpperCase() || '',
    state: '',
    zip: shippingAddress?.Zip?.toLocaleUpperCase() || '',
  });
  const [isAllDataPrepared, setIsAllDataPrepared] = useState(false);

  function handleSubmit(formRawValues: ShippingAddressForm): void {
    const { state: regionCode } = formRawValues;
    const country = stateOptions.find((item) => item.data?.code.value === regionCode)?.data?.group
      .value;
    const newAddress = getMappedShippingAddress(formRawValues, country);
    setTmpAddress(newAddress);
    validateEasyPost(getMappedAddressEasyPost(formRawValues));
  }

  const onCancel = (): void => {
    setModal(null);
  };

  function getLabelWithPostfix(name: string, postfix = ':'): string {
    return `${t(name)}${postfix}`;
  }

  function getMappedStateOptions(data: RegionItem[]): SelectValue<string, RegionItem>[] {
    const options: SelectValue<string, RegionItem>[] = data.map((item) => {
      return {
        title: item.name_c1d60e037d5a4c45a67b498684d40990.value,
        value: item.code.value,
        data: item,
      };
    });
    return options;
  }

  function getDefaultSelectedState(options: SelectValue<string, RegionItem>[]): string {
    const state = shippingAddress?.State?.toLocaleLowerCase();
    if (options.length > 0 && state) {
      return (
        options.find(
          (item) =>
            item.title?.toLocaleLowerCase() === state ||
            item.data?.code?.value.toLocaleLowerCase() === state
        )?.value || ''
      );
    }
    return '';
  }

  return (
    <>
      {isAllDataPrepared && (
        <RbModal size="lg" show={true} centered={true} className={styles.shipping_modal}>
          <RbModal.Header className="fw-bold">
            {t('ShippingAddress_AddUpdate_AddAddress')}
          </RbModal.Header>
          <Container className="p-0">
            <h4 className="px-3 fs-4 pt-3">{t('ShippingAddress_AddUpdate_ShippingAddress')}</h4>
            <ErrorList errors={validationErrors} className="mx-3"></ErrorList>
            <FormComponent<ShippingAddressForm>
              onSubmit={handleSubmit}
              validationSchema={shippingAddressSchema}
              className="position-relative"
              serverError={null}
              useFormProps={{ defaultValues: formDefaultValues }}
            >
              {({ register, formState: { errors } }) => (
                <>
                  <RbModal.Body>
                    <Row>
                      <Col className={styles.shipping_modal_col}>
                        <TextInput
                          label={getLabelWithPostfix('ShippingAddress_AddUpdate_FirstNameLabel')}
                          placeholder={t('Form_Generic_Placeholders_FirstName')}
                          {...register('firstName')}
                          type="text"
                          error={t(errors?.firstName?.message as string)}
                        />
                      </Col>
                      <Col className={styles.shipping_modal_col}>
                        <TextInput
                          label={getLabelWithPostfix('ShippingAddress_AddUpdate_LastNameLabel')}
                          placeholder={t('Form_Generic_Placeholders_LastName')}
                          {...register('lastName')}
                          type="text"
                          error={t(errors?.lastName?.message as string)}
                        />
                      </Col>
                    </Row>
                    <TextInput
                      label={getLabelWithPostfix('ShippingAddress_AddUpdate_AddressLabel')}
                      placeholder={t('Form_Generic_Placeholders_StreetAddress')}
                      {...register('address')}
                      type="text"
                      error={t(errors?.address?.message as string)}
                    />
                    <div className="w-100">
                      <label className="text-red fw-bold">
                        {t('ShippingAddress_AddUpdate_AddressNote')}
                      </label>
                    </div>
                    <TextInput
                      label={
                        <span>
                          {getLabelWithPostfix('ShippingAddress_AddUpdate_ApartmentLabel')}{' '}
                          <span className="fst-italic">
                            {t('ShippingAddress_AddUpdate_Optional')}
                          </span>
                        </span>
                      }
                      placeholder={t('ShippingAddress_AddUpdate_ApartmentPlceholder')}
                      {...register('apartment')}
                      type="text"
                      error={undefined}
                    />
                    <Row>
                      <Col className={styles.shipping_modal_col}>
                        <TextInput
                          label={getLabelWithPostfix('ShippingAddress_AddUpdate_CityLabel')}
                          placeholder={t('Form_Generic_Placeholders_City')}
                          {...register('city')}
                          type="text"
                          error={t(errors?.city?.message as string)}
                        />
                      </Col>
                      <Col className={styles.shipping_modal_col}>
                        <SelectField
                          options={stateOptions}
                          label={getLabelWithPostfix('ShippingAddress_AddUpdate_StateLabel')}
                          placeholder={t('Form_Generic_Placeholders_State')}
                          {...register('state')}
                          error={t(errors?.state?.message as string)}
                        ></SelectField>
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.shipping_modal_col}>
                        <TextInput
                          label={getLabelWithPostfix('ShippingAddress_AddUpdate_ZipLabel')}
                          placeholder={t('Form_Generic_Placeholders_EnterZipCode')}
                          {...register('zip')}
                          type="text"
                          error={getZipErrors(errors?.zip?.ref?.value)}
                        />
                      </Col>
                    </Row>
                  </RbModal.Body>
                  <RbModal.Footer className="justify-content-between">
                    <Button
                      className={`${styles.cancel_button} border-1`}
                      variant="default"
                      onClick={onCancel}
                    >
                      {t('ShippingAddress_AddUpdate_CancelButtonText')}
                    </Button>
                    <Button variant="success" type="submit">
                      {t(confirmButtonName)}
                    </Button>
                  </RbModal.Footer>
                </>
              )}
            </FormComponent>
          </Container>
        </RbModal>
      )}
    </>
  );
};

export default ShippingAddressModal;
