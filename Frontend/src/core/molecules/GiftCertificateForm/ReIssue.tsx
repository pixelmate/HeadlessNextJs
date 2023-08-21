import * as yup from 'yup';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useState } from 'react';
import DPanel from 'core/atoms/Panel/DPanel';
import { Button, Alert } from 'react-bootstrap';
import { useI18n } from 'next-localization';
import { FieldValues } from 'react-hook-form';
import TextArea from 'core/atoms/Forms/TextArea';
import TextInput from 'core/atoms/Forms/TextInput';
import useLocalStorage from 'hooks/useLocalStorage';
import { FormComponent } from 'core/atoms/Forms/Form';
import styles from './GiftCertificateForm.module.scss';
import Placeholders from 'core/atoms/Placeholders/Placeholder';
import GiftCertificateDesign from 'core/atoms/GiftCertificateDesign';
import { GiftCertificateFormProps, GiftCertificateFormData } from './GiftCertificateForm.type';
import { useReIssueGiftCertificate } from 'data/giftCardCertificate';
import {
  DEFAULT_GIFT_CERTIFICATE_DESIGN,
  MAX_CHARACTER_LIMIT,
} from 'constants/giftCertificateDesign';
import {
  EMAIL_VALIDATION,
  GIFT_CERTIFICATE_MESSAGE_VALIDATION,
} from 'constants/validation-patterns';

const giftCertificateFormSchema = (
  requiredMessage: string,
  emailValidation: string,
  characterLength: string
) => {
  return yup.object().shape({
    recipient: yup
      .string()
      .required(requiredMessage)
      .matches(GIFT_CERTIFICATE_MESSAGE_VALIDATION, characterLength),
    recipientEmail: yup
      .string()
      .required(requiredMessage)
      .matches(EMAIL_VALIDATION, emailValidation),
    sender: yup
      .string()
      .required(requiredMessage)
      .matches(GIFT_CERTIFICATE_MESSAGE_VALIDATION, characterLength),
    message: yup
      .string()
      .required(requiredMessage)
      .matches(GIFT_CERTIFICATE_MESSAGE_VALIDATION, characterLength),
  });
};

const ReIssue = (props: GiftCertificateFormProps) => {
  const { t } = useI18n();
  const backgroundColorContrast = JSON.parse(props?.params?.BackgroundColorContrast);
  const { Link: ctaLink, ApiEndpoint } = props?.fields || {};
  const apiUrl = ApiEndpoint?.fields?.Value?.value as string;
  const [localStorageGiftCard] = useLocalStorage<GiftCardItem>('GIFT_CARDS');
  const [designFormat, setDesignFormat] = useState(
    String(localStorageGiftCard?.xp?.GiftCertificateStyle) || DEFAULT_GIFT_CERTIFICATE_DESIGN
  );
  const { mutate, error } = useReIssueGiftCertificate(ctaLink?.value?.href as string);
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageEditing;
  const handleSubmit = (input: GiftCertificateFormData) => {
    const { recipient, sender, message, recipientEmail, amount } = input || {};
    const newFormData = {
      RecipientName: recipient,
      RecipientEmail: recipientEmail,
      SenderName: sender,
      Amount: amount.toString(),
      Message: message,
      GiftCode: localStorageGiftCard?.ID,
      GiftDesignFormat: designFormat,
    };
    mutate({ url: apiUrl, formData: newFormData });
  };

  if (!isEditing && !localStorageGiftCard) {
    return <Placeholders />;
  }
  return (
    <>
      <div className={`${styles.giftCertificateForm} container py-3 px-md-0`}>
        {error && <Alert variant="danger">{error?.message}</Alert>}
        <GiftCertificateDesign
          setDesignFormat={setDesignFormat}
          bgColorContrast={backgroundColorContrast}
          designFormat={designFormat}
        />
        <FormComponent<FieldValues>
          onSubmit={handleSubmit}
          // TODO: will replace with dict keys
          validationSchema={giftCertificateFormSchema(
            'Required',
            'Invalid Email Address',
            'Characters should between 3 and 100'
          )}
        >
          {({ register, formState: { errors }, control, trigger }) => (
            <>
              <div className="col-md-6 mx-auto">
                <DPanel
                  panelTitle={`${t('GiftCardInformation_PanelTitle')} (${t(
                    'GiftCertificateList_GiftCodeLabel'
                  )}: ${localStorageGiftCard?.RedemptionCode})`}
                  bgColorContrast={backgroundColorContrast}
                >
                  <TextInput
                    label={t('Form_Generic_Tag_To')}
                    placeholder={t('Form_Generic_Placeholders_EnterRecipientsName')}
                    {...register('recipient')}
                    error={errors?.recipient?.message as string}
                    type="text"
                    defaultValue={localStorageGiftCard?.xp?.GiftCertificateTo}
                    onBlur={() => trigger('recipient')}
                    maxLength={MAX_CHARACTER_LIMIT}
                  />
                  <TextInput
                    label={t('Form_Generic_Tag_RecipientsEmail')}
                    placeholder={t('Form_Generic_Placeholders_EnterRecipientsEmailAddress')}
                    {...register('recipientEmail')}
                    error={errors?.recipientEmail?.message as string}
                    type="text"
                    defaultValue={localStorageGiftCard?.xp?.GiftCertificateEmail}
                    onBlur={() => trigger('recipientEmail')}
                  />
                  <TextInput
                    label={t('Form_Generic_Tag_From')}
                    placeholder={t('Form_Generic_Placeholders_EnterGiftGiversName')}
                    {...register('sender')}
                    error={errors?.sender?.message as string}
                    type="text"
                    defaultValue={localStorageGiftCard?.xp?.GiftCertificateFrom}
                    onBlur={() => trigger('sender')}
                    maxLength={MAX_CHARACTER_LIMIT}
                  />
                  <TextInput
                    label={t('Form_Generic_Tag_Amount')}
                    {...register('amount')}
                    error={undefined}
                    type="text"
                    readOnly={true}
                    className="pe-none mb-3"
                    disabled={true}
                    defaultValue={localStorageGiftCard?.Balance}
                  />
                  <TextArea
                    label={t('Form_Generic_Tag_Message')}
                    {...register('message')}
                    error={errors?.message?.message as string}
                    maxLimit={MAX_CHARACTER_LIMIT}
                    control={control}
                    defaultValue={localStorageGiftCard?.xp?.GiftCertificateMessage}
                    onBlur={() => trigger('message')}
                  />
                  <div className="text-end my-3">
                    <Button type="submit" className="rounded-1 lh-1 fs-6" variant="info">
                      {ctaLink?.value?.text}
                    </Button>
                  </div>
                </DPanel>
              </div>
            </>
          )}
        </FormComponent>
      </div>
    </>
  );
};

export default ReIssue;
