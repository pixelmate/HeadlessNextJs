import { useAtom } from 'jotai';
import { useState } from 'react';
import { useI18n } from 'next-localization';
import style from './AutoshipUpdate.module.scss';
import { XpAutoshipCart } from 'data/atoms/localStorage';
import useLocalStorage from 'hooks/useLocalStorage';
import { Button, Modal, Alert, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { isAutoShipChecked } from 'data/atoms/autoship';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { DEFAULT_AUTOSHIP_PERIOD } from 'constants/autoship';
import { AutoshipFrequencyType, AutoshipModalProps } from './Autoship.type';
import { authorizationAtom } from 'data/atoms/authorization-atom';
import { useUpdateUserAutoship, useUpdateAutoship, useUser } from 'data/user';
import { usePatchCart, useGetCart } from 'data/cart';
import { WarningIcon } from 'core/atoms/Icons';

const AutoshipModal = (props: AutoshipModalProps): JSX.Element => {
  const { t } = useI18n();
  const { data } = useGetCart();
  const { showModal, handleClose, label } = props || {};
  const { user } = useUser();
  const [{ isAuthenticated }] = useAtom(authorizationAtom);
  const { sitecoreContext } = useSitecoreContext();
  const { mutate: updateUser } = useUpdateUserAutoship();
  const { mutate } = useUpdateAutoship();
  const { mutate: updateCartAutoship } = usePatchCart();
  const [autoshipChecked, setAutoshipChecked] = useAtom(isAutoShipChecked);
  const [autoshipUser, setAutoshipUser] = useLocalStorage<AutoshipUser>('USER');
  const [autoshipCart, setAutoshipCart] = useLocalStorage('CART');
  const [draftValue, setDraftValue] = useState({
    isAutoshipChecked: autoshipChecked,
    autoshipFrequency: autoshipUser?.xp?.autoshipFrequency,
  });
  const [frequencyError, setFrequencyError] = useState(false);
  const autoshipFrequency: AutoshipFrequencyType[] =
    sitecoreContext && (sitecoreContext?.AutoshipFrequency as AutoshipFrequencyType[]);
  const handleUpdate = () => {
    if (
      draftValue?.isAutoshipChecked &&
      draftValue?.autoshipFrequency === DEFAULT_AUTOSHIP_PERIOD
    ) {
      setFrequencyError(true);
      return;
    }
    setAutoshipChecked(draftValue?.isAutoshipChecked);
    if (user && isAuthenticated) {
      updateUser({
        xp: {
          ...user?.xp,
          IsAutoShip: draftValue?.isAutoshipChecked,
          AutoshipFrequency: draftValue?.autoshipFrequency,
        },
      });
      updateCartAutoship({
        cartId: data!.id,
        xp: {
          AutoshipFrequency: draftValue?.autoshipFrequency,
          IsAutoShipOrder: draftValue?.isAutoshipChecked,
        },
      });
      mutate({ autoship: draftValue?.isAutoshipChecked });
      handleClose();
    } else {
      handleClose();
    }
    setAutoshipCart({ xp: { IsAutoShipOrder: draftValue?.isAutoshipChecked } });
    setAutoshipUser((prevState: AutoshipUser) => {
      return {
        xp: {
          ...prevState?.xp,
          IsAutoShip: draftValue?.isAutoshipChecked,
          autoshipFrequency: draftValue?.autoshipFrequency,
        },
      };
    });
    setFrequencyError(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftValue((prevState) => ({
      ...prevState,
      isAutoshipChecked: e.target.checked,
    }));
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDraftValue((prevState) => ({
      ...prevState,
      autoshipFrequency: e.target.value,
    }));
  };
  const editingStyle = sitecoreContext.pageEditing ? { marginTop: '50vh' } : {};
  return (
    <>
      <Modal
        centered={true}
        className="px-3"
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={editingStyle}
      >
        <Modal.Header>
          <h4>{t('Autoship_Title')}</h4>
        </Modal.Header>
        <Modal.Body>
          {frequencyError && (
            <Alert variant="danger" className="py-2">
              {t('Autoship_FrequencyNotSelectedError')}
            </Alert>
          )}
          <input
            type="checkbox"
            id="autoShip"
            className="d-inline"
            onChange={handleChange}
            defaultChecked={
              autoshipChecked || (autoshipCart as XpAutoshipCart)?.xp?.IsAutoShipOrder
            }
          />
          <label htmlFor="autoShip" className={`d-inline mx-2`}>
            {label}
          </label>
          <div className="d-flex align-items-center">
            <select
              onChange={handleSelect}
              defaultValue={autoshipUser?.xp?.autoshipFrequency || DEFAULT_AUTOSHIP_PERIOD}
              className={style.autoship_select}
            >
              <option value={DEFAULT_AUTOSHIP_PERIOD}>
                {t('Autoship_FrequencyDropdownLabel')}
              </option>
              {autoshipFrequency?.map((item, index: number) => (
                <option key={index} value={item?.value}>
                  {item?.name}
                </option>
              ))}
            </select>
            {frequencyError && (
              <OverlayTrigger
                delay={{ hide: 250, show: 300 }}
                overlay={(props) => (
                  <Tooltip {...props}>{t('Autoship_FrequencyNotSelectedInlineError')}</Tooltip>
                )}
                placement="top"
              >
                <span className="px-2">
                  <WarningIcon className="cursor-pointer" />
                </span>
              </OverlayTrigger>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="light" onClick={handleClose}>
            {t('Autoship_CancelLabel')}
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            {t('Autoship_UpdateAutoshipsOptionsLabel')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AutoshipModal;
