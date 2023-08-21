import {
  CITY_MAXLENGTH,
  COMPANY_NAME_MAXLENGTH,
  NAME_MAXLENGTH,
  ZIPCODE_MAXLENGTH,
} from 'constants/query-config';
import TextInput from '../Forms/TextInput';
import SelectField from '../Forms/components/SelectField/SelectField';
import { SelectValue } from '../Forms/components/SelectField/SelectField.type';
import { FieldErrors, UseFormRegister, UseFormTrigger } from 'react-hook-form';
import { AddressInput } from 'core/molecules/AccountAddress/AccountAddress.type';

interface ShippingAddressFieldsProps {
  t: Translate;
  register: UseFormRegister<AddressUpdateForm>;
  errors: FieldErrors<AddressUpdateForm>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFormDefaultValues: (values: any) => void;
  stateOptions: SelectValue<string, RegionItem>[];
  formDefaultValues: AddressInput;
  trigger: UseFormTrigger<AddressUpdateForm>;
}

const ShippingAddressFields = ({
  t,
  register,
  errors,
  stateOptions,
  setFormDefaultValues,
  formDefaultValues,
  trigger,
}: ShippingAddressFieldsProps): JSX.Element => {
  const handleFieldValueChange = (fieldName: string, value: string) => {
    trigger(fieldName);
    setFormDefaultValues({
      ...formDefaultValues,
      [fieldName]: value,
    });
  };
  return (
    <>
      <TextInput
        label={t('Form_Generic_Tag_FirstName')}
        placeholder={t('Form_Generic_Placeholders_FirstName')}
        {...register('firstName')}
        maxLength={NAME_MAXLENGTH}
        error={t(errors?.firstName?.message || '')}
        onBlur={(e) => handleFieldValueChange('firstName', e.target.value)}
      />
      <TextInput
        label={t('Form_Generic_Tag_LastName')}
        placeholder={t('Form_Generic_Placeholders_LastName')}
        {...register('lastName')}
        maxLength={NAME_MAXLENGTH}
        error={t(errors?.lastName?.message || '')}
        onBlur={(e) => handleFieldValueChange('lastName', e.target.value)}
      />
      <TextInput
        label={t('Form_Generic_Tag_CompanyName')}
        placeholder={t('Form_Generic_Placeholders_CompanyName')}
        {...register('companyName')}
        maxLength={COMPANY_NAME_MAXLENGTH}
        error={t(errors?.companyName?.message || '')}
        onBlur={(e) => handleFieldValueChange('companyName', e.target.value)}
      />
      <TextInput
        label={t('Form_Generic_Tag_Address')}
        placeholder={t('Form_Generic_Placeholders_Address')}
        {...register('address')}
        error={t(errors?.address?.message || '')}
        onBlur={(e) => handleFieldValueChange('address', e.target.value)}
      />
      <div className="w-100 text-center mb-3 text-red fw-bold">
        {t('MyAccountAddress_ShippingAddress_Note')}
      </div>
      <TextInput
        label={t('Form_Generic_Tag_ApartmentSuite')}
        placeholder={t('Form_Generic_Placeholders_ApartmentSuite')}
        {...register('apartment')}
        onBlur={(e) => handleFieldValueChange('apartment', e.target.value)}
      />
      <TextInput
        label={t('Form_Generic_Tag_City')}
        placeholder={t('Form_Generic_Placeholders_City')}
        {...register('city')}
        maxLength={CITY_MAXLENGTH}
        error={t(errors?.city?.message || '')}
        onBlur={(e) => handleFieldValueChange('city', e.target.value)}
      />
      <SelectField
        options={stateOptions}
        label={t('Form_Generic_Tag_State')}
        placeholder={t('Form_Generic_Placeholders_SelectState')}
        {...register('state')}
        error={t(errors?.state?.message || '')}
        onBlur={(e) => handleFieldValueChange('state', e.target.value)}
      ></SelectField>
      <TextInput
        label={t('Form_Generic_Tag_Zip')}
        placeholder={t('Form_Generic_Placeholders_Zip')}
        {...register('zip')}
        maxLength={ZIPCODE_MAXLENGTH}
        error={t(errors?.zip?.message || '')}
        onBlur={(e) => handleFieldValueChange('zip', e.target.value)}
      />
    </>
  );
};

export default ShippingAddressFields;
