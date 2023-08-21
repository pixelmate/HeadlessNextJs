import { useState } from 'react';
import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';
import TextInput from 'core/atoms/Forms/TextInput';
import * as yup from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import styles from './GiftCertificateBalance.module.scss';
import { Button, Container, Spinner } from 'react-bootstrap';
import { MIDDLEWARE_API_ENDPOINTS } from 'constants/endpoints';
import { useGetGiftCertificateBalanceOLD } from 'data/giftCardbalance';
import { FormComponent } from 'core/atoms/Forms/Form';
import { FieldValues } from 'react-hook-form';
import { REDEMPTION_CODE } from 'constants/validation-patterns';

const giftCertificateBalanceSchema = (
  requiredMessage: string,
  inValidMessage: string,
  characterLength: string
) => {
  return yup.object().shape({
    redemptionCode: yup
      .string()
      .required(requiredMessage)
      .min(3, characterLength)
      .max(100, characterLength)
      .matches(REDEMPTION_CODE, inValidMessage),
  });
};

const GiftCertificateBalance = (): JSX.Element => {
  const { t } = useI18n();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [code, setCode] = useState('');
  const { data, loading } = useGetGiftCertificateBalanceOLD(code);

  const handleSubmit = (formData: { redemptionCode: string }) => {
    queryClient.removeQueries([MIDDLEWARE_API_ENDPOINTS.GIFT_CERTIFICATE_BALANCE, 'OLD']);
    setCode(formData.redemptionCode);
  };

  const handleGoBack = () => {
    router.back();
  };

  const resultString = t('GiftCertificateBalance_CurrentBalance', {
    RedemptionCode: code,
    Balance: (data?.Balance || 0).toFixed(2),
  });

  return (
    <Container className="py-2">
      <FormComponent<FieldValues>
        onSubmit={handleSubmit}
        // TODO: will replace with dict keys
        validationSchema={giftCertificateBalanceSchema(
          'Required*',
          'Invalid RedemptionCode',
          'Characters should between 3 and 100'
        )}
      >
        {({ register, formState: { errors } }) => (
          <>
            {loading && (
              <div className={styles.gift_certificate_balance_spinner}>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              </div>
            )}
            <div className="pb-4">
              <TextInput
                label={t('Form_Generic_Tag_EnterCode')}
                type="text"
                {...register('redemptionCode')}
                error={errors?.redemptionCode?.message as string}
              />
            </div>
            <div className="justify-content-between d-flex">
              <Button
                type="button"
                className="rounded-1 lh-1 fs-6"
                variant="light"
                onClick={handleGoBack}
              >
                {t('GiftCertificateBalance_Back')}
              </Button>
              <Button type="submit" className="rounded-1 lh-1 fs-6" variant="success">
                {t('GiftCertificateBalance_ViewBalance')}
              </Button>
            </div>
          </>
        )}
      </FormComponent>
      <div className="pt-3">
        {!loading && code && (
          <>
            {data?.Balance !== null ? (
              <span dangerouslySetInnerHTML={{ __html: resultString }} />
            ) : (
              <span>{t('GiftCertificateBalance_GiftCardErrorMessage')}</span>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default GiftCertificateBalance;
