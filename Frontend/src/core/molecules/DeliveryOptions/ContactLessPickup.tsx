import _ from 'lodash';
import { useAtom } from 'jotai';
import { useI18n } from 'next-localization';
import useLocalStorage from 'hooks/useLocalStorage';
import { useUpdateShipping } from 'data/deliveryOptions';
import { FREE_SHIPPING_COST } from 'constants/productDetails';
import { ContactLessPickupProps } from './DeliveryOptions.type';
import { authorizationAtom } from 'data/atoms/authorization-atom';

const ContactLessPickup = (props: ContactLessPickupProps) => {
  const { t } = useI18n();
  const { data, cart } = props || {};
  const { mutate } = useUpdateShipping();
  const [{ isAuthenticated }] = useAtom(authorizationAtom);
  const [, setLocalStorageShippingOptions] = useLocalStorage('SHIPPING_OPTION_DETAILS');
  const setChange = (id: string, city: string, state: string, stateName: string) => {
    const xp = { ...cart?.xp } || {};
    const otherXp = _.omit(xp, [
      'carrier',
      'carrierAccountId',
      'service',
      'shipmentId',
      'carrierIndexID',
    ]);
    const shippingDetail = {
      freePickUp: true,
      warehouseID: id,
      warehouseCity: city,
      warehouseState: state,
      stateName,
    };
    const shippingDetails = {
      shippingCost: FREE_SHIPPING_COST,
      xp: {
        ...otherXp,
        ...shippingDetail,
      },
    };
    setLocalStorageShippingOptions({ shippingCost: FREE_SHIPPING_COST, xp: { ...shippingDetail } });
    if (isAuthenticated) {
      mutate(shippingDetails);
    }
  };
  return (
    <>
      {data &&
        data?.map((item) => {
          return (
            <div className="py-2" key={item?.warehouseID?.value}>
              <input
                type="radio"
                id={item?.warehouseID?.value as string}
                value={item?.warehouseID?.value}
                name="warehouseLocation"
                onChange={() =>
                  setChange(
                    item?.warehouseID?.value,
                    item?.city?.value,
                    item?.state?.value,
                    item?.description?.value
                  )
                }
              />
              <label className="px-2 cursor-pointer" htmlFor={item?.warehouseID?.value as string}>
                {item?.city?.value},{item?.state?.value}
              </label>
            </div>
          );
        })}
      <p className="pt-4 text-muted">{t('DeliveryOptions_PickupNote')}</p>
    </>
  );
};

export default ContactLessPickup;
