import _ from 'lodash';
import { useAtom } from 'jotai';
import { useI18n } from 'next-localization';
import useLocalStorage from 'hooks/useLocalStorage';
import { useUpdateShipping } from 'data/deliveryOptions';
import { lineItems } from 'data/atoms/lineItems';
import { ShippingInfoProps } from './DeliveryOptions.type';
import { authorizationAtom } from 'data/atoms/authorization-atom';
import { DELIVERY_ESTIMATION_DATE_FORMAT, TIME_ZONE } from 'constants/format';

const ShippingInfo = (props: ShippingInfoProps) => {
  const { t } = useI18n();
  const [cartItems] = useAtom(lineItems);
  const [{ isAuthenticated }] = useAtom(authorizationAtom);
  const { shippingRates, cart } = props || {};
  const [, setLocalStorageShippingOptions] = useLocalStorage('SHIPPING_OPTION_DETAILS');
  const carriers = shippingRates && shippingRates?.RateList;
  const carrierNames = shippingRates && Object.keys(carriers);
  const { mutate } = useUpdateShipping();
  const setChange = (
    carrier: string,
    carrierAccountId: string,
    service: string,
    shipmentId: string,
    shippingCost: string,
    estDeliveryDays: number,
    carrierIndexID: string
  ) => {
    const xp = { ...cart?.xp } || {};
    const otherXp = _.omit(xp, ['warehouseCity', 'warehouseID', 'warehouseState', 'freePickUp']);
    const shippingDetail = {
      carrier,
      carrierAccountId,
      service,
      shipmentId,
      estDeliveryDays,
      carrierIndexID,
    };
    const shippingDetails = {
      shippingCost,
      xp: {
        ...otherXp,
        ...shippingDetail,
      },
    };
    setLocalStorageShippingOptions({ shippingCost, xp: { ...shippingDetail } });
    if (isAuthenticated) {
      mutate(shippingDetails);
    }
  };

  return (
    <>
      <p className="my-4 p-0">{t('DeliveryOptions_ShippingNote')}</p>
      {!!cartItems.length ? (
        <>
          <div>
            {carrierNames &&
              carrierNames.map((carrierName) => (
                <div key={carrierName}>
                  {carriers &&
                    carriers[carrierName]?.map((item: CarrierRate, index: number) => {
                      const estimatedDeliveryDate = new Date(
                        new Date().getTime() + item?.EstDeliveryDays * 24 * 60 * 60 * 1000
                      );
                      return (
                        <div key={index} className="py-2">
                          <input
                            type="radio"
                            name="deliveryOptions"
                            id={`${item?.Carrier}_${index}`}
                            onChange={() =>
                              setChange(
                                item?.Carrier,
                                item?.CarrierAccountId,
                                item?.Service,
                                item?.ShipmentId,
                                item?.Price,
                                item?.EstDeliveryDays,
                                `${item?.Carrier}_${index}`
                              )
                            }
                          />
                          <label
                            className="px-2 cursor-pointer d-inline"
                            htmlFor={`${item?.Carrier}_${index}`}
                          >
                            {`${item?.Carrier}: ${item?.Service} -  ${item?.Price}`}
                            <span className="text-success">
                              {` - ${estimatedDeliveryDate.toLocaleDateString(
                                TIME_ZONE,
                                DELIVERY_ESTIMATION_DATE_FORMAT
                              )}`}
                            </span>
                          </label>
                        </div>
                      );
                    })}
                </div>
              ))}
          </div>
          <p className="my-2 text-success p-0">{t('DeliveryOptions_FreePickupNote')}</p>
        </>
      ) : (
        <p className="text-danger my-2 p-0">{t('DeliveryOptions_NoShippingOptions')}</p>
      )}
    </>
  );
};

export default ShippingInfo;
