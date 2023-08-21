import { useI18n } from 'next-localization';
import { ORDER_ID } from 'config/index';
import { getCookie } from 'cookies-next';
import GroupTile from 'core/atoms/GroupTile';

const OrderNumber = (): JSX.Element => {
  const { t } = useI18n();
  // TODO after the order place in step3
  const orderNumber = getCookie(ORDER_ID) || 'CYRYMhev-0OMOyu8OJHvsg';
  return (
    <GroupTile heading={t('OrderConfirmation_OrdersSummary')}>
      {t('OrderConfirmation_OrderNumber')}: <strong>{orderNumber}</strong>
    </GroupTile>
  );
};

export default OrderNumber;
