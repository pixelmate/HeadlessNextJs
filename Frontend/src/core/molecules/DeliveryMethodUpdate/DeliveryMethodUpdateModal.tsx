import React, { useEffect, useState } from 'react';
import { Button, Modal, Tab, Tabs } from 'react-bootstrap';
import { DeliveryMethodUpdateModalProps, draftItem } from '../DeliveryOptions/DeliveryOptions.type';
import { useI18n } from 'next-localization';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import useLocalStorage from 'hooks/useLocalStorage';
import { createSpinner, spinnerAtom } from 'data/atoms/spinner';
import { useAtom } from 'jotai';
import { useShippingRates, useUpdateShipping } from 'data/deliveryOptions';
import { useGetCart } from 'data/cart';
import ModalShippingInfo from './ModalShippingInfo';
import { useGetWarehouseLocations } from 'data/warehouseLocation';
import ModalContactLessPickup from './ModalContactLessPickup';
import { useUser } from 'data/user';
import { authorizationAtom } from 'data/atoms/authorization-atom';
import { FREE_SHIPPING_COST } from 'constants/productDetails';
import _ from 'lodash';

const DeliveryMethodUpdateModal = (props: DeliveryMethodUpdateModalProps): JSX.Element => {
  const { showModal, handleClose } = props || {};
  const { t } = useI18n();
  const [, setSpinner] = useAtom(spinnerAtom);
  const { sitecoreContext } = useSitecoreContext();
  const editingStyle = sitecoreContext.pageEditing ? { marginTop: '50vh' } : {};
  const [shippingAddress] = useLocalStorage<AddressItem>('SHIPPING_ADDRESS');
  const { data: warehouse } = useGetWarehouseLocations();
  const { data: cart } = useGetCart();
  const zipcode = shippingAddress?.Zip;
  const { shippingRates, loading } = useShippingRates(zipcode as string);
  const [localStorageShippingOptions, setLocalStorageShippingOptions] =
    useLocalStorage<ShippingOptionDetail>('SHIPPING_OPTION_DETAILS');
  const [draftValue, setDraftValue] = useState<draftItem>(
    localStorageShippingOptions?.xp as draftItem
  );
  const { user } = useUser();
  const [{ isAuthenticated }] = useAtom(authorizationAtom);
  const { mutate } = useUpdateShipping();

  useEffect(() => {
    if (loading) {
      setSpinner(createSpinner(t('ShoppingBasket_UpdatingBasket')));
    } else {
      setSpinner(null);
    }
  }, [loading]);

  const handleUpdate = () => {
    let shippingDetail = {};
    if (user && isAuthenticated) {
      const xp = { ...cart?.xp } || {};
      if (draftValue?.freePickUp === true) {
        const otherXp = _.omit(xp, [
          'carrier',
          'carrierAccountId',
          'service',
          'shipmentId',
          'carrierIndexID',
        ]);
        shippingDetail = {
          freePickUp: true,
          warehouseID: draftValue?.warehouseID,
          warehouseCity: draftValue?.warehouseCity,
          warehouseState: draftValue?.warehouseState,
          stateName: draftValue?.stateName,
        };
        const shippingDetails = {
          shippingCost: FREE_SHIPPING_COST,
          xp: {
            ...otherXp,
            ...shippingDetail,
          },
        };
        mutate(shippingDetails);
        setLocalStorageShippingOptions({
          shippingCost: FREE_SHIPPING_COST,
          xp: { ...shippingDetail },
        });
      } else {
        const otherXp = _.omit(xp, [
          'warehouseCity',
          'warehouseID',
          'warehouseState',
          'freePickUp',
        ]);
        shippingDetail = {
          carrier: draftValue?.carrier,
          carrierAccountId: draftValue?.carrierAccountId,
          service: draftValue?.service,
          shipmentId: draftValue?.shipmentId,
          estDeliveryDays: draftValue?.estDeliveryDays,
          carrierIndexID: draftValue?.carrierIndexID,
        };
        const shippingDetails = {
          shippingCost: draftValue?.shippingCost,
          xp: {
            ...otherXp,
            ...shippingDetail,
          },
        };
        mutate(shippingDetails as ShippingOptionDetail);
        setLocalStorageShippingOptions({
          shippingCost: draftValue?.shippingCost as string,
          xp: { ...shippingDetail },
        });
      }
      handleClose();
    } else {
      setLocalStorageShippingOptions({
        shippingCost: FREE_SHIPPING_COST,
        xp: { ...shippingDetail },
      });
      handleClose();
    }
  };
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
          <h4>{'Shipping Method'}</h4>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey={t('DeliveryOptions_ShippingTab')}
            className="my-3 deliveryOptions"
          >
            <Tab
              eventKey={t('DeliveryOptions_ShippingTab')}
              title={t('DeliveryOptions_ShippingTab')}
            >
              {!!zipcode ? (
                <ModalShippingInfo shippingRates={shippingRates} setDraftValue={setDraftValue} />
              ) : (
                <p className="my-3">{t('Form_Generic_ValidationMessages_ZipRequired')}</p>
              )}
            </Tab>
            <Tab
              eventKey={t('DeliveryOptions_FreeContactlessPickupTab')}
              title={t('DeliveryOptions_FreeContactlessPickupTab')}
            >
              <ModalContactLessPickup setDraftValue={setDraftValue} data={warehouse} />
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="light" onClick={handleClose}>
            {t('Autoship_CancelLabel')}
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            {t('DeliveryOptions_UpdateShipping')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeliveryMethodUpdateModal;
