import { Form } from 'react-bootstrap';
import styles from './AnnualRenewal.module.scss';
import { useI18n } from 'next-localization';
import { FieldErrors, useFormContext } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { FormValidationContext } from '../GenericForm/FormContext';
import { annualRenewalSchemas } from 'src/schemas/formSchemas/AnnualRenewalSchemas';
import { useGetSingleProduct } from 'data/products';
import Placeholder from 'core/atoms/Placeholders/Placeholder';
import { ANNUAL_RENEWAL_FEE_TOTAL_PRICE_PRODUCT_ID } from 'constants/products';
import { TIME_ZONE } from 'constants/format';

const AnnualRenewal = (): JSX.Element => {
  const { t } = useI18n();
  const [currentDate] = useState<string>(new Date().toLocaleDateString(TIME_ZONE));
  const [annualRenewalDescription, setAnnualRenewalDescription] = useState(
    t('FieldRep_Replicator_AnnualRenewalFee', {
      AnnualRenewalFeeTotalPrice: undefined,
      PaymentDate: currentDate,
    })
  );
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { addValidationSchema } = useContext(FormValidationContext);

  const { mutate: getSingleProduct, isLoading } = useGetSingleProduct({
    onSuccess: (data: Product | undefined) => {
      if (data && data.xp?.RetailPrice) {
        setAnnualRenewalDescription(
          t('FieldRep_Replicator_AnnualRenewalFee', {
            AnnualRenewalFeeTotalPrice: data.xp?.RetailPrice,
            PaymentDate: currentDate,
          })
        );
      }
    },
  });

  useEffect(() => {
    addValidationSchema(annualRenewalSchemas);
    getSingleProduct(ANNUAL_RENEWAL_FEE_TOTAL_PRICE_PRODUCT_ID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAnnualRenewalDescription = () => {
    if (isLoading) {
      return <Placeholder />;
    }

    return <p className="m-0">{annualRenewalDescription}</p>;
  };

  return (
    <div className={styles.annualRenewalContainer}>
      {getAnnualRenewalDescription()}
      <Form.Group className="mt-4 mb-3" controlId="replicatorSiteName">
        <Form.Check
          {...register('annualRenewal.charge')}
          type={'checkbox'}
          label={t('FieldRep_Replicator_MonthlyFeeAgreement')}
        />
        {(errors?.annualRenewal as FieldErrors)?.charge && (
          <p className={`${styles.errors} w-100 m-0`}>
            {/* TODO update when will be ready key and value */}
            {t((errors?.annualRenewal as FieldErrors)?.charge?.message as string) || 'Required'}
          </p>
        )}
      </Form.Group>
    </div>
  );
};

export default AnnualRenewal;
