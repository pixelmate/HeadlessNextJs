import { ChangeEvent } from 'react';
import TextInput from 'core/atoms/Forms/TextInput';
import Checkbox from '../Forms/Checkbox';
import {
  CITY_MAXLENGTH,
  COMPANY_NAME_MAXLENGTH,
  EMAIL_MAXLENGTH,
  NAME_MAXLENGTH,
  PHONE_EXT_MAXLENGTH,
  PHONE_LINENUMBER_MAXLENGTH,
  PHONE_PREFIX_AREACODE_MAXLENGTH,
  ZIPCODE_MAXLENGTH,
} from 'constants/query-config';
import SelectField from '../Forms/components/SelectField/SelectField';
import { Col, Row } from 'react-bootstrap';
import { SelectValue } from '../Forms/components/SelectField/SelectField.type';
import { FieldErrors, UseFormRegister, UseFormTrigger } from 'react-hook-form';
import { AddressInput } from 'core/molecules/AccountAddress/AccountAddress.type';

interface BillingAddressFieldsProps {
  t: Translate;
  register: UseFormRegister<AddressUpdateForm>;
  errors: FieldErrors<AddressUpdateForm>;
  formDefaultValues: AddressInput;
  stateOptions: SelectValue<string, RegionItem>[];
  handleUseShippingCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
  isSameAsShippingAddress: boolean;
  setValue: (key: string, value: string) => void;
  trigger: UseFormTrigger<AddressUpdateForm>;
}

const BillingAddressFields = ({
  t,
  register,
  errors,
  stateOptions,
  handleUseShippingCheckbox,
  isSameAsShippingAddress,
  formDefaultValues,
  setValue,
  trigger,
}: BillingAddressFieldsProps): JSX.Element => {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleUseShippingCheckbox(event);
    if (event.target.checked) {
      setValue('firstNameBilling', formDefaultValues['firstName']);
      setValue('lastNameBilling', formDefaultValues['lastName']);
      setValue('companyNameBilling', formDefaultValues['companyName']);
      setValue('addressBilling', formDefaultValues['address']);
      setValue('cityBilling', formDefaultValues['city']);
      setValue('stateBilling', formDefaultValues['state']);
      setValue('zipBilling', formDefaultValues['zip']);
    }
  };

  return (
    <>
      <Checkbox
        name="useShippingAddress"
        label={t('MyAccountAddress_BillingAddress_UseShippingAddress')}
        className="pb-3"
        onChange={handleCheckboxChange}
        checked={isSameAsShippingAddress}
      />
      <TextInput
        label={t('Form_Generic_Tag_FirstName')}
        placeholder={t('Form_Generic_Placeholders_FirstName')}
        {...register('firstNameBilling', { deps: '' })}
        maxLength={NAME_MAXLENGTH}
        error={t(errors?.firstNameBilling?.message || '')}
        onBlur={() => trigger('firstNameBilling')}
      />
      <TextInput
        label={t('Form_Generic_Tag_LastName')}
        placeholder={t('Form_Generic_Placeholders_LastName')}
        {...register('lastNameBilling')}
        maxLength={NAME_MAXLENGTH}
        error={t(errors?.lastNameBilling?.message || '')}
        onBlur={() => trigger('lastNameBilling')}
      />

      <TextInput
        label={t('Form_Generic_Tag_CompanyName')}
        placeholder={t('Form_Generic_Placeholders_CompanyName')}
        {...register('companyNameBilling')}
        maxLength={COMPANY_NAME_MAXLENGTH}
        error={t(errors?.companyNameBilling?.message || '')}
        onBlur={() => trigger('companyNameBilling')}
      />
      <TextInput
        label={t('Form_Generic_Tag_Address')}
        placeholder={t('Form_Generic_Placeholders_Address')}
        {...register('addressBilling')}
        error={t(errors?.addressBilling?.message || '')}
        onBlur={() => trigger('addressBilling')}
      />
      <TextInput
        label={t('Form_Generic_Tag_ApartmentSuite')}
        placeholder={t('Form_Generic_Placeholders_ApartmentSuite')}
        {...register('apartmentBilling')}
        onBlur={() => trigger('apartmentBilling')}
      />
      <TextInput
        label={t('Form_Generic_Tag_City')}
        placeholder={t('Form_Generic_Placeholders_City')}
        {...register('cityBilling')}
        maxLength={CITY_MAXLENGTH}
        error={t(errors?.cityBilling?.message || '')}
        onBlur={() => trigger('cityBilling')}
      />
      <SelectField
        options={stateOptions}
        label={t('Form_Generic_Tag_State')}
        placeholder={t('Form_Generic_Placeholders_SelectState')}
        {...register('stateBilling')}
        error={t(errors?.stateBilling?.message || '')}
        onBlur={() => trigger('stateBilling')}
      ></SelectField>
      <TextInput
        label={t('Form_Generic_Tag_Zip')}
        placeholder={t('Form_Generic_Placeholders_Zip')}
        {...register('zipBilling')}
        maxLength={ZIPCODE_MAXLENGTH}
        error={t(errors?.zipBilling?.message || '')}
        onBlur={() => trigger('zipBilling')}
      />
      <div>
        <div>{t('Form_Generic_Tag_Phone')}</div>
        <Row>
          <Col xs={4} md={2}>
            <TextInput
              {...register('areaCodeBilling')}
              maxLength={PHONE_PREFIX_AREACODE_MAXLENGTH}
              error={t(errors?.areaCodeBilling?.message || '')}
              onBlur={() => trigger('areaCodeBilling')}
            />
          </Col>
          <Col xs={4} md={2}>
            <TextInput
              {...register('phonePrefixBilling')}
              maxLength={PHONE_PREFIX_AREACODE_MAXLENGTH}
              error={t(errors?.phonePrefixBilling?.message || '')}
              onBlur={() => trigger('phonePrefixBilling')}
            />
          </Col>
          <Col xs={4} md={3}>
            <TextInput
              {...register('phoneLineNumberBilling')}
              maxLength={PHONE_LINENUMBER_MAXLENGTH}
              error={t(errors?.phoneLineNumberBilling?.message || '')}
              onBlur={() => trigger('phoneLineNumberBilling')}
            />
          </Col>
          <Col xs={12} md={2}>
            <TextInput
              placeholder={t('Form_Generic_Placeholders_Ext')}
              {...register('phoneExtBilling')}
              maxLength={PHONE_EXT_MAXLENGTH}
              error={t(errors?.phoneExtBilling?.message || '')}
              onBlur={() => trigger('phoneExtBilling')}
            />
          </Col>
        </Row>
      </div>
      <TextInput
        label={t('Form_Generic_Tag_Email')}
        placeholder={t('Form_Generic_Placeholders_Email')}
        {...register('emailBilling')}
        maxLength={EMAIL_MAXLENGTH}
        error={t(errors?.emailBilling?.message || '')}
        onBlur={() => trigger('emailBilling')}
      />
    </>
  );
};

export default BillingAddressFields;
