import useLocalStorage from 'hooks/useLocalStorage';
import { useI18n } from 'next-localization';
import { Dispatch, SetStateAction } from 'react';

type ModalContactLessPickupProps = {
  data: WareHouseItem[] | undefined;
  setDraftValue: Dispatch<SetStateAction<AnyObject>>;
};

const ModalContactLessPickup = (props: ModalContactLessPickupProps) => {
  const { t } = useI18n();
  const { data, setDraftValue } = props || {};
  const [localStorageShippingOptions] =
    useLocalStorage<ShippingOptionDetail>('SHIPPING_OPTION_DETAILS');

  const setChange = (id: string, city: string, state: string, stateName: string) => {
    setDraftValue({
      freePickUp: true,
      warehouseID: id,
      warehouseCity: city,
      warehouseState: state,
      stateName: stateName,
    });
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
                defaultChecked={
                  localStorageShippingOptions?.xp?.warehouseID === item?.warehouseID?.value
                }
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

export default ModalContactLessPickup;
