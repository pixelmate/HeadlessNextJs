import { ReplicatorSiteNameProps } from './ReplicatorSiteName.type';
import { useContext, useEffect, useState } from 'react';
import { FormValidationContext } from '../GenericForm/FormContext';
import { replicatorSiteNameSchema } from 'src/schemas/formSchemas/ReplicatorSiteNameSchema';
import { Form, InputGroup, FormControl } from 'react-bootstrap';
import styles from './ReplicatorSiteName.module.scss';
import { FieldErrors, useFormContext } from 'react-hook-form';
import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import Placeholder from 'core/atoms/Placeholders/Placeholder';
import { useGetSingleProduct } from 'data/products';
import { MONTHLY_FEE_TOTAL_PRICE_PRODUCT_ID } from 'constants/products';

const ReplicatorSiteName = (props: ReplicatorSiteNameProps): JSX.Element => {
  const { Description } = props?.fields || {};
  const publicUrl = getPublicUrl();

  const { t } = useI18n();
  const [monthlyFeeMessage, setMonthlyFeeMessage] = useState(
    t('FieldRep_Replicator_MonthlyFee', {
      MonthlyFeeTotalPrice: undefined,
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
        setMonthlyFeeMessage(
          t('FieldRep_Replicator_MonthlyFee', {
            MonthlyFeeTotalPrice: data.xp?.RetailPrice,
          })
        );
      }
    },
  });

  useEffect(() => {
    addValidationSchema(replicatorSiteNameSchema);
    getSingleProduct(MONTHLY_FEE_TOTAL_PRICE_PRODUCT_ID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMonthlyFee = () => {
    if (isLoading) {
      return <Placeholder />;
    }
    return <p className="m-0">{monthlyFeeMessage}</p>;
  };

  return (
    <div className={styles.replicatorSiteNameContainer}>
      <div dangerouslySetInnerHTML={{ __html: Description.value }}></div>

      <Form.Group className="mt-4 mb-3" controlId="replicatorSiteName">
        <InputGroup className="mb-3">
          <InputGroup.Text className={styles.prefix}>{publicUrl}</InputGroup.Text>
          <FormControl
            {...register('siteName.name')}
            className={styles.inputField}
            placeholder={t('FieldRep_Replicator_SiteNamePlaceholder')}
            type="text"
          />
          {(errors?.siteName as FieldErrors)?.name && (
            <p className={`${styles.errors} w-100 m-0`}>
              {t((errors?.siteName as FieldErrors)?.name?.message as string)}
            </p>
          )}
        </InputGroup>

        {getMonthlyFee()}
        <Form.Check
          {...register('siteName.charge')}
          type="checkbox"
          label={t('FieldRep_Replicator_MonthlyFeeAgreement')}
        />
        {(errors?.siteName as FieldErrors)?.charge && (
          <p className={`${styles.errors} w-100 m-0`}>
            {/* TODO update when will be ready key and value */}
            {t((errors?.siteName as FieldErrors)?.charge?.message as string) || 'Required'}
          </p>
        )}
      </Form.Group>
    </div>
  );
};

export default ReplicatorSiteName;
