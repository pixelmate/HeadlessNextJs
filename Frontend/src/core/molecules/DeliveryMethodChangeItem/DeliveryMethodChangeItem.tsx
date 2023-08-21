import { TextField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { Stack, Button } from 'react-bootstrap';
import styles from './DeliveryMethodChangeItem.module.scss';
import useLocalStorage from 'hooks/useLocalStorage';
import { TIME_ZONE, DELIVERY_ESTIMATION_DATE_FORMAT } from 'constants/format';
import { useI18n } from 'next-localization';

export type DeliveryMethodChangeItemProps = {
  title: TextField;
  onChangeClick: () => void;
};

const DeliveryMethodChangeItem = ({ title, onChangeClick }: DeliveryMethodChangeItemProps) => {
  const { t } = useI18n();
  const [localStorageShippingOptions] = useLocalStorage<ShippingOptionDetail | undefined>(
    'SHIPPING_OPTION_DETAILS'
  );

  const getContent = () => {
    if (
      localStorageShippingOptions &&
      Object.keys(localStorageShippingOptions?.xp || {})?.length > 0
    ) {
      if (localStorageShippingOptions.xp?.freePickUp) {
        return (
          <>
            {t('DeliveryOptions_PickupMessageAtWarehouse', {
              warehouse: localStorageShippingOptions.xp?.stateName as string,
            })}
          </>
        );
      }
      const shippingCost = localStorageShippingOptions?.shippingCost;
      const item = localStorageShippingOptions.xp;
      const estimatedDeliveryDate = new Date(
        new Date().getTime() + (item?.estDeliveryDays as number) * 24 * 60 * 60 * 1000
      );
      return (
        <>
          {`${item?.carrier} ${item?.service}`}
          <span className="text-success">
            {` $${shippingCost} - ${estimatedDeliveryDate?.toLocaleDateString(
              TIME_ZONE,
              DELIVERY_ESTIMATION_DATE_FORMAT
            )}`}
          </span>
        </>
      );
    }
    return <></>;
  };

  return (
    <div className={styles?.wrapper}>
      <Stack direction="horizontal" className={styles?.titleWrapper}>
        <Text field={title} />
        <Button
          variant="link"
          className={`text-decoration-none p-0 px-1 text-info ${styles?.changeButton}`}
          onClick={onChangeClick}
        >
          {t('DeliveryOptions_ChangeLabel')}
        </Button>
      </Stack>
      <div className={`${styles?.detailsWrapper} pt-2`}>{getContent()}</div>
    </div>
  );
};
export default DeliveryMethodChangeItem;
