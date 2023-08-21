import { AutoshipProps, AutoshipFrequencyType } from './Autoship.type';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { isAutoShipChecked, totalAutoShipSavings } from 'data/atoms/autoship';
import { CheckMarkIcon } from 'core/atoms/Icons';
import { useI18n } from 'next-localization';
import styles from './AutoshipAdd.module.scss';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useUpdateUserAutoship, useUserGroups, useUpdateAutoship, useUser } from 'data/user';
import { useCart } from 'hooks/useCart';
import useLocalStorage from 'hooks/useLocalStorage';
import { XpAutoshipCart } from 'data/atoms/localStorage';
import { USER_GROUP } from 'constants/user';
import { authorizationAtom } from 'data/atoms/authorization-atom';
import { DEFAULT_AUTOSHIP_PERIOD } from 'constants/autoship';
import { spinnerAtom, createSpinner } from 'data/atoms/spinner';

const Autoship = (props: AutoshipProps) => {
  const { t } = useI18n();
  const [{ isAuthenticated }] = useAtom(authorizationAtom);
  const { AutoshipBenefits, AutoshipCheckedText, AutoshipUncheckedText } = props?.fields || {};
  const [autoshipChecked, setAutoshipChecked] = useAtom(isAutoShipChecked);
  const [totalAutoship] = useAtom(totalAutoShipSavings);
  const [, setSpinner] = useAtom(spinnerAtom);
  const { sitecoreContext } = useSitecoreContext();
  const { updateCartAutoship } = useCart();
  const { mutate: updateUser, isLoading: updatingAutoship } = useUpdateUserAutoship();
  const [autoshipCart, setAutoshipCart] = useLocalStorage('CART');
  const [autoshipUser, setAutoshipUser] = useLocalStorage<AutoshipUser>('USER');
  const { user } = useUser();
  const { userGroup } = useUserGroups();
  const { groupId } = userGroup || {};
  const { mutate, isLoading } = useUpdateAutoship();
  useEffect(() => {
    if (isLoading || updatingAutoship) {
      setSpinner(createSpinner(t('ShoppingBasket_UpdatingBasket')));
    } else {
      setSpinner(null);
    }
  }, [isLoading, updatingAutoship]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoshipChecked(e.target.checked);
    if (user && isAuthenticated) {
      updateUser({
        xp: {
          ...user?.xp,
          IsAutoShip: e.target.checked,
        },
      });
      updateCartAutoship({ xp: { IsAutoShipOrder: e.target.checked } });
      mutate({ autoship: e.target.checked });
    }
    setAutoshipCart({ xp: { IsAutoShipOrder: e.target.checked } });
    setAutoshipUser((prevState: AutoshipUser) => {
      return {
        xp: {
          ...prevState?.xp,
          IsAutoShip: e.target.checked,
        },
      };
    });
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (user && isAuthenticated) {
      updateUser({
        xp: {
          ...user?.xp,
          AutoshipFrequency: e.target.value,
        },
      });
      updateCartAutoship({ xp: { AutoshipFrequency: e.target.value } });
    }
    setAutoshipUser((prevState: AutoshipUser) => {
      return {
        xp: {
          ...prevState?.xp,
          autoshipFrequency: e.target.value,
        },
      };
    });
  };
  const autoshipFrequency: AutoshipFrequencyType[] =
    sitecoreContext && (sitecoreContext?.AutoshipFrequency as AutoshipFrequencyType[]);
  return (
    <div className={`${styles.autoship} px-3`}>
      <div>
        <input
          type="checkbox"
          id="autoship"
          className="d-inline"
          onChange={handleChange}
          defaultChecked={autoshipChecked || (autoshipCart as XpAutoshipCart)?.xp?.IsAutoShipOrder}
        />
        <label htmlFor="autoship" className={`${styles.text_info} d-inline mx-2`}>
          {autoshipChecked || (autoshipCart as XpAutoshipCart)?.xp?.IsAutoShipOrder
            ? AutoshipCheckedText?.value
            : isAuthenticated
            ? groupId === USER_GROUP.RETAIL
              ? AutoshipUncheckedText?.value?.replace(
                  '{{Amount}}',
                  `$${Math.abs(totalAutoship).toFixed(2)}`
                )
              : t('Products_MakeThisAnAutoship')
            : AutoshipUncheckedText?.value?.replace(
                '{{Amount}}',
                `$${Math.abs(totalAutoship).toFixed(2)}`
              )}
        </label>
      </div>
      <select
        onChange={handleSelect}
        defaultValue={autoshipUser?.xp?.autoshipFrequency || DEFAULT_AUTOSHIP_PERIOD}
      >
        <option value={DEFAULT_AUTOSHIP_PERIOD}>{t('Autoship_FrequencyDropdownLabel')}</option>
        {autoshipFrequency?.map((item, index: number) => (
          <option key={index} value={item?.value}>
            {item?.name}
          </option>
        ))}
      </select>
      <ul className="m-0 p-0 list-unstyled">
        {AutoshipBenefits?.map((item, index: number) => (
          <div className="d-flex align-items-center pb-1 position-relative" key={index}>
            <CheckMarkIcon className={styles.check_mark} />
            <li key={item?.id}>{item?.fields?.Title?.value}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Autoship;
