import * as yup from 'yup';
import DPanel from 'core/atoms/Panel/DPanel';
import { useRouter } from 'next/router';
import { Button, Row, Col } from 'react-bootstrap';
import { useI18n } from 'next-localization';
import { FieldValues } from 'react-hook-form';
import TextArea from 'core/atoms/Forms/TextArea';
import TextInput from 'core/atoms/Forms/TextInput';
import useLocalStorage from 'hooks/useLocalStorage';
import { FormComponent } from 'core/atoms/Forms/Form';
import styles from './GiftCertificateForm.module.scss';
import { GiftCertificateDesignType } from 'core/atoms/GiftCertificateDesign';
import { GiftCertificateFormProps, GiftCertificateFormData } from './GiftCertificateForm.type';
import Image from 'core/atoms/Image';
import {
  EMAIL_VALIDATION,
  GIFT_CERTIFICATE_MESSAGE_VALIDATION,
} from 'constants/validation-patterns';
import { MAX_CHARACTER_LIMIT } from 'constants/giftCertificateDesign';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

const giftCertificateFormSchema = (
  requiredMessage: string,
  emailValidation: string,
  characterLength: string,
  amountTypeError: string,
  amountMinMax: string,
  designError: string
) => {
  return yup.object().shape({
    recipient: yup
      .string()
      .required(requiredMessage)
      .matches(GIFT_CERTIFICATE_MESSAGE_VALIDATION, characterLength),
    amount: yup
      .number()
      .required(requiredMessage)
      .typeError(amountTypeError)
      .min(5, amountMinMax)
      .max(500, amountMinMax),
    recipientEmail: yup
      .string()
      .required(requiredMessage)
      .matches(EMAIL_VALIDATION, emailValidation),
    sender: yup
      .string()
      .required(requiredMessage)
      .matches(GIFT_CERTIFICATE_MESSAGE_VALIDATION, characterLength),
    designFormat: yup.string().required(designError),
  });
};

const Purchase = (props: GiftCertificateFormProps) => {
  const { t } = useI18n();
  const router = useRouter();
  const { sitecoreContext } = useSitecoreContext();
  const backgroundColorContrast = JSON.parse(props?.params?.BackgroundColorContrast);
  const { Link: ctaLink } = props?.fields || {};
  const [, setLocalStorageGiftCertificate] = useLocalStorage('GIFT_CERTIFICATE_INFORMATION');
  const giftCertificateDesign = sitecoreContext?.GiftCertificateDesign as GiftCertificateDesignType;
  const handleSubmit = (formData: GiftCertificateFormData) => {
    setLocalStorageGiftCertificate(formData);
    router.push(ctaLink?.value?.href as string);
  };

  return (
    <>
      <div className={`${styles.giftCertificateForm} container py-3 px-md-0`}>
        <FormComponent<FieldValues>
          onSubmit={handleSubmit}
          // TODO: will replace with dict keys
          validationSchema={giftCertificateFormSchema(
            'Required',
            'Invalid Email Address',
            'Characters should between 3 and 100',
            'Amount should be a number, between $5 and $500',
            'Amount value between $5 and $500',
            'Please select a Gift Certificate Design format Style'
          )}
        >
          {({ register, formState: { errors }, control, trigger }) => {
            return (
              <>
                <DPanel
                  panelTitle={t('GiftCertificateDesign_PanelTitle')}
                  bgColorContrast={backgroundColorContrast}
                >
                  <Row className="text-center py-2">
                    {giftCertificateDesign?.map((item, index) => (
                      <Col xs={6} md={3} key={index} className="pb-2">
                        <div className="d-flex flex-column align-items-center" key={index}>
                          <label
                            htmlFor={`giftCertificateDesign${index}`}
                            className="cursor-pointer"
                          >
                            <Image field={item.GiftCertificateImage} />
                          </label>
                          <input
                            type="radio"
                            id={`giftCertificateDesign${index}`}
                            className="my-2 cursor-pointer"
                            value={item.GiftCertificateStyle}
                            {...register('designFormat')}
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                  {errors?.designFormat?.message && (
                    <p className="text-danger">{errors?.designFormat?.message as string}</p>
                  )}
                </DPanel>
                <div className="col-md-6 mx-auto">
                  <DPanel
                    panelTitle={t('GiftCardInformation_PanelTitle')}
                    bgColorContrast={backgroundColorContrast}
                  >
                    <TextInput
                      label={t('Form_Generic_Tag_To')}
                      placeholder={t('Form_Generic_Placeholders_EnterRecipientsName')}
                      {...register('recipient')}
                      error={errors?.recipient?.message as string}
                      type="text"
                      maxLength={MAX_CHARACTER_LIMIT}
                      onBlur={() => trigger('recipient')}
                    />
                    <TextInput
                      label={t('Form_Generic_Tag_RecipientsEmail')}
                      placeholder={t('Form_Generic_Placeholders_EnterRecipientsEmailAddress')}
                      {...register('recipientEmail')}
                      error={errors?.recipientEmail?.message as string}
                      type="text"
                      onBlur={() => trigger('recipientEmail')}
                    />
                    <TextInput
                      label={t('Form_Generic_Tag_From')}
                      placeholder={t('Form_Generic_Placeholders_EnterGiftGiversName')}
                      {...register('sender')}
                      error={errors?.sender?.message as string}
                      type="text"
                      onBlur={() => trigger('sender')}
                      maxLength={MAX_CHARACTER_LIMIT}
                    />
                    <TextInput
                      label={t('Form_Generic_Tag_Amount')}
                      // TODO: will update the placeholder from dict
                      placeholder="Enter certificate amount ($5 - $500)"
                      {...register('amount')}
                      error={errors?.amount?.message as string}
                      type="number"
                      onBlur={() => trigger('amount')}
                    />
                    <TextArea
                      label={t('Form_Generic_Tag_Message')}
                      {...register('message')}
                      error={errors?.message?.message as string}
                      rows={4}
                      maxLimit={MAX_CHARACTER_LIMIT}
                      control={control}
                      onBlur={() => trigger('message')}
                    />
                  </DPanel>
                  <div className="text-center my-3">
                    <Button type="submit" className="rounded-1 lh-1 fs-6" variant="success">
                      {ctaLink?.value?.text}
                    </Button>
                  </div>
                </div>
              </>
            );
          }}
        </FormComponent>
      </div>
    </>
  );
};

export default Purchase;
