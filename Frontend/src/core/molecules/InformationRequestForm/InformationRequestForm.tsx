import { Container, Row, Col, Button } from 'react-bootstrap';
import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { object as yupObject, string as yupString } from 'yup';
import { useI18n } from 'next-localization';
import { useInformationRequestForm } from 'data/informationRequestForm';
import { extractKeyValuePairs } from 'utils/generateDataForSelectDropdown';
import Image from 'core/atoms/Image';
import TextInput from 'core/atoms/Forms/TextInput';
import TextArea from 'core/atoms/Forms/TextArea';
import { FormComponent } from 'core/atoms/Forms/Form';
import SelectDropdown from 'core/atoms/Forms/SelectDropdown';
import { EMAIL_VALIDATION_REP, PHONE_VALIDATION } from 'constants/validation-patterns';
import { InformationRequestFormProps } from './InformationRequest.type';
import styles from './InformationRequestForm.module.scss';
import { FieldValues } from 'react-hook-form';
import {
  EMAIL_MAXLENGTH,
  FIELDREP_NAME_MAXLENGTH,
  NAME_MAXLENGTH,
  PHONE_MAXLENGTH,
} from 'constants/query-config';

const informationRequestFormSchema = (
  nameValidation: string,
  emailValidation: string,
  phoneRequiredValidation: string,
  phoneValidation: string,
  timeToCallValidation: string,
  timeZoneValidation: string
) => {
  return yupObject().shape({
    name: yupString().required(nameValidation),
    email: yupString().matches(EMAIL_VALIDATION_REP, emailValidation),
    phone: yupString().required(phoneRequiredValidation).matches(PHONE_VALIDATION, phoneValidation),
    bestTimeToCall: yupString().required(timeToCallValidation),
    timeZone: yupString().required(timeZoneValidation),
    fieldRepName: yupString(),
    message: yupString(),
  });
};

const InformationRequestForm = (props: InformationRequestFormProps): JSX.Element => {
  const { t } = useI18n();
  const {
    BackgroundImage,
    RedirectOnSuccessUrl,
    BestTimeToCall,
    TimeZone,
    RequestFormRTE,
    ApiEndpoint,
  } = props?.fields || {};

  const { mutate: submitForm } = useInformationRequestForm(RedirectOnSuccessUrl?.value?.href || '');

  const handleSubmit = (formData: InformationRequestFormInput) => {
    let endpoint = ApiEndpoint?.fields?.Value?.value;

    endpoint = endpoint
      ?.replace('{name}', formData?.name || '')
      .replace('{email}', formData?.email || '')
      .replace('{phone}', String(formData?.phone) || '')
      .replace('{besttimetocall}', formData?.bestTimeToCall || '')
      .replace('{timezone}', formData?.timeZone || '')
      .replace('{fieldrepname}', formData?.fieldRepName || '')
      .replace('{message}', formData?.message || '');
    submitForm(endpoint as string);
  };

  const bestTimeToCallData = [
    {
      key: '0',
      value: t('Form_InformationRequest_TimeDefaultValue'),
    },
    ...extractKeyValuePairs(BestTimeToCall),
  ];

  const timeZoneData = [
    {
      key: '0',
      value: t('Form_InformationRequest_TimeZoneDefaultValue'),
    },
    ...extractKeyValuePairs(TimeZone),
  ];

  return (
    <div className="position-relative">
      <div className={styles.image_container}>
        <Image className={`img-fluid ${styles.background}`} field={BackgroundImage} priority />
      </div>

      <Container fluid className={`justify-content-center`}>
        <Row className="justify-content-center mx-0">
          <Col lg={7} sm={12}>
            <div className={styles.InformationRequestForm}>
              <FormComponent<FieldValues>
                onSubmit={handleSubmit}
                validationSchema={informationRequestFormSchema(
                  t('Form_InformationRequest_ErrorNameRequired'),
                  t('Form_InformationRequest_InvalidEmailAddress'),
                  t('Form_InformationRequest_ErrorPhoneRequired'),
                  t('Form_InformationRequest_ErrorPhoneInvalid'),
                  t('Form_InformationRequest_ErrorTimeRequired'),
                  t('Form_InformationRequest_ErrorTimeZoneRequired')
                )}
              >
                {({ register, formState: { errors }, control }) => (
                  <>
                    <RichText field={RequestFormRTE} />

                    <div className={styles.InformationRequestForm_fieldsWrapper}>
                      <TextInput
                        label={t('Form_Generic_Tag_Name')}
                        placeholder={t('Form_Generic_Placeholders_EnterYourName')}
                        className={`${styles.InformationRequestForm_formField}`}
                        labelClassName={`${styles.InformationRequestForm_fieldLabel}`}
                        {...register('name')}
                        error={errors?.name?.message as string}
                        type="text"
                        maxLength={NAME_MAXLENGTH}
                      />

                      <TextInput
                        label={t('Form_Generic_Tag_Email')}
                        placeholder={t('Form_Generic_Placeholders_EnterEmailAddress')}
                        className={`${styles.InformationRequestForm_formField}`}
                        labelClassName={`${styles.InformationRequestForm_fieldLabel}`}
                        {...register('email')}
                        error={errors?.email?.message as string}
                        type="email"
                        maxLength={EMAIL_MAXLENGTH}
                      />

                      <TextInput
                        label={t('Form_Generic_Tag_Phone')}
                        placeholder={t('Form_Generic_Placeholders_EnterPhoneNumber')}
                        className={`${styles.InformationRequestForm_formField}`}
                        labelClassName={`${styles.InformationRequestForm_fieldLabel}`}
                        {...register('phone')}
                        error={errors?.phone?.message as string}
                        type="tel"
                        maxLength={PHONE_MAXLENGTH}
                      />

                      <SelectDropdown
                        label={t('Form_Generic_Tag_BestTimeToCall')}
                        {...register('bestTimeToCall')}
                        className={`${styles.InformationRequestForm_formField}`}
                        labelClassName={`${styles.InformationRequestForm_fieldLabel}`}
                        error={errors?.bestTimeToCall?.message as string}
                        data={bestTimeToCallData}
                        control={control}
                      />

                      <SelectDropdown
                        label={t('Form_Generic_Tag_TimeZone')}
                        {...register('timeZone')}
                        className={`${styles.InformationRequestForm_formField}`}
                        labelClassName={`${styles.InformationRequestForm_fieldLabel}`}
                        error={errors?.timeZone?.message as string}
                        data={timeZoneData}
                        control={control}
                      />

                      <p className={styles.InformationRequestForm_fieldRepInformation}>
                        {t('Form_InformationRequest_FieldRepText')}
                      </p>

                      <TextInput
                        label={t('Form_Generic_Tag_FieldRepName')}
                        placeholder={t('Form_Generic_Placeholders_EnterRepsName')}
                        className={`${styles.InformationRequestForm_formField}`}
                        labelClassName={`${styles.InformationRequestForm_fieldLabel}`}
                        {...register('fieldRepName')}
                        error={errors?.fieldRepName?.message as string}
                        type="text"
                        maxLength={FIELDREP_NAME_MAXLENGTH}
                      />

                      <TextArea
                        label={t('Form_Generic_Tag_Message')}
                        className={`${styles.InformationRequestForm_formField}`}
                        labelClassName={`${styles.InformationRequestForm_fieldLabel}`}
                        {...register('message')}
                        error={errors?.message?.message as string}
                        control={control}
                      />

                      <div
                        className={`text-end mb-4 ${styles.InformationRequestForm_buttonWrapper}`}
                      >
                        <Button type="submit" className="rounded-1 lh-1 fs-6" variant="warning">
                          {t('Form_InformationRequest_SubmitButton')}
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </FormComponent>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InformationRequestForm;
