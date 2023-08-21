import { Text, Placeholder, ComponentRendering, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { useFieldRepCart } from 'data/fieldRepCart';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import styles from './StarterKitPackSelection.module.scss';
import Placeholders from 'core/atoms/Placeholders/Placeholder';
import { DetailsModal } from './DetailsModal';
import { StarterKitPackSelectionProps } from './StarterKitPackSelection.type';
import { useI18n } from 'next-localization';
import { useRouter } from 'next/router';
import getFullWidth from 'utils/getFullWidth';

const StarterKitPackSelection = (props: DeepPartial<StarterKitPackSelectionProps>) => {
  const { fields, params } = props;
  const { t } = useI18n();
  const router = useRouter();
  const [showProductDetails, setShowProductDetails] = useState<null | string>(null);
  const fullWidthClass = getFullWidth(params?.IsFullWidth as string);
  const { optionalProducts, mandatoryProduct, isLoading, form, saveToLocalstorage } =
    useFieldRepCart({
      mandatoryProductId: fields?.MandatoryProduct?.fields?.ProductId?.value,
      productIds: [
        fields?.MandatoryProduct?.fields?.ProductId?.value,
        ...(fields?.OptionalProducts?.map(
          (item) => item?.fields?.ProductId?.value
        ) as unknown as string[]),
      ].filter((item) => item !== undefined) as unknown as string[],
    });
  const hideModal = () => setShowProductDetails(null);
  const handleSubmit = () => {
    saveToLocalstorage();
    router.push(fields?.SignUpCTA?.value?.href || '');
  };
  if (isLoading) return <Placeholders />;
  return (
    <div className={fullWidthClass}>
      <div className="col-12 col-md-9 my-4">
        {fields?.Title && <Text tag="h2" className={styles.title} field={fields?.Title} />}
        {fields?.MandatoryProductTitle && (
          <Text tag="h4" className={styles.description} field={fields?.MandatoryProductTitle} />
        )}
        {mandatoryProduct && (
          <div className={styles.mandatory}>
            {mandatoryProduct?.name}
            <span
              className={`${styles.details} mx-2`}
              onClick={() => {
                setShowProductDetails(mandatoryProduct?.id || null);
              }}
            >
              {t('StarterKitSelection_Details')}
            </span>{' '}
            {createPortal(
              <DetailsModal
                show={mandatoryProduct?.id === showProductDetails}
                onHide={hideModal}
                html={mandatoryProduct?.description}
              />,
              document.body
            )}
            ${mandatoryProduct.priceSchedule?.priceBreaks?.[0]?.price}
          </div>
        )}
        <form>
          <table className={`table table-striped-2 ${styles.table}`}>
            <tbody>
              {optionalProducts?.map((product) => (
                <>
                  <tr key={product?.id}>
                    <td>
                      <input
                        type="radio"
                        value={product?.id}
                        {...form.register('selectedOptionalProduct')}
                      ></input>
                    </td>
                    <td>{product?.name}</td>
                    <td>
                      <span
                        className={styles.details}
                        onClick={() => {
                          setShowProductDetails(product?.id || null);
                        }}
                      >
                        {t('StarterKitSelection_Details')}
                      </span>
                    </td>
                    <td>${product?.priceSchedule?.priceBreaks?.[0]?.price}</td>
                  </tr>
                  {createPortal(
                    <DetailsModal
                      show={product?.id === showProductDetails}
                      onHide={hideModal}
                      html={product?.description}
                    />,
                    document.body
                  )}
                </>
              ))}
              <tr>
                <td>
                  <input
                    type="radio"
                    value="null"
                    {...form.register('selectedOptionalProduct')}
                  ></input>
                </td>
                {/* TODO - BE translation request  */}
                <td>None</td>
                <td></td>
                {/* TODO - BE value request  */}
                <td>$0.00</td>
              </tr>
            </tbody>
          </table>
          {form.formState.errors?.selectedOptionalProduct && (
            <p className="text-danger">
              {String(form.formState.errors.selectedOptionalProduct.message)}
            </p>
          )}
          {fields?.TermsAndConditions && (
            <Text tag="h2" className={styles.title} field={fields?.TermsAndConditions} />
          )}
          <Placeholder name="jss-starter-kit" rendering={props.rendering as ComponentRendering} />
          {form?.formState?.errors?.termsAndConditions && (
            <div className="text-danger">{form.formState.errors.termsAndConditions?.message}</div>
          )}
          <label className="my-3">
            <input
              type="checkbox"
              className={styles.checkbox}
              {...form.register('termsAndConditions')}
            />
            {props?.fields?.AgreementText && (
              <RichText className={styles.termsAndConditions} field={props.fields?.AgreementText} />
            )}
          </label>
          <div className="text-center">
            <Button
              className={styles.submitBtn}
              variant="success"
              onClick={() => {
                form.handleSubmit(handleSubmit)();
              }}
            >
              {fields?.SignUpCTA?.value?.text}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default StarterKitPackSelection;
