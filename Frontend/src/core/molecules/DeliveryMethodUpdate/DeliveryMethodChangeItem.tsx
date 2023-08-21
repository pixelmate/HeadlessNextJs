import useLocalStorage from 'hooks/useLocalStorage';
import { TIME_ZONE, DELIVERY_ESTIMATION_DATE_FORMAT } from 'constants/format';
import { useI18n } from 'next-localization';
import GroupTile from 'core/atoms/GroupTile';
import { useState } from 'react';
import DeliveryMethodUpdateModal from './DeliveryMethodUpdateModal';
import { TextField } from '@sitecore-jss/sitecore-jss-nextjs';

export type DeliveryMethodChangeItemProps = {
  title: TextField;
  onChangeClick: () => void;
};

const DeliveryMethodChangeItem = ({ title }: DeliveryMethodChangeItemProps) => {
  const [showModal, setShowModal] = useState(false);
  const onChangeClick = () => setShowModal((prevState) => !prevState);
  const { t } = useI18n();
  const [localStorageShippingOptions] =
    useLocalStorage<ShippingOptionDetail>('SHIPPING_OPTION_DETAILS');
  const getContent = () => {
    if (
      localStorageShippingOptions &&
      Object?.keys(localStorageShippingOptions?.xp || {})?.length > 0
    ) {
      if (localStorageShippingOptions?.xp?.freePickUp) {
        return (
          <>
            {t('DeliveryOptions_PickupMessageAtWarehouse', {
              warehouse: localStorageShippingOptions?.xp?.stateName as string,
            })}
          </>
        );
      }
      const shippingCost = localStorageShippingOptions?.shippingCost;
      const item = localStorageShippingOptions?.xp;
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
    <>
      <GroupTile
        heading={title?.value as string}
        btnLabel={t('DeliveryOptions_ChangeLabel')}
        handleBtn={onChangeClick}
      >
        <DeliveryMethodUpdateModal
          showModal={showModal}
          handleClose={onChangeClick}
          label={title?.value as string}
        />
        <div>{getContent()}</div>
      </GroupTile>
    </>
  );
};
export default DeliveryMethodChangeItem;
