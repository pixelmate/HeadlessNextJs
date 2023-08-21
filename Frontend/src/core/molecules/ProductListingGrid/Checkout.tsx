import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useCartItems } from 'data/cart';
import { useUserGroups } from 'data/user';
import { USER_GROUP } from 'constants/user';
import { lineItems } from 'data/atoms/lineItems';
import { useTranslate } from 'hooks/useTranslate';
import styles from './ProductListing.module.scss';
import Placeholders from 'core/atoms/Placeholders';
import useLocalStorage from 'hooks/useLocalStorage';
import { Row, Col, Table } from 'react-bootstrap';
import { authorizationAtom } from 'data/atoms/authorization-atom';

const Checkout = () => {
  const { t } = useTranslate();
  const { userGroup } = useUserGroups();
  const { groupId } = userGroup || {};
  const [cartItems] = useAtom(lineItems);
  const { isLoading, refetch } = useCartItems();
  const [{ isAuthenticated }] = useAtom(authorizationAtom);
  const [autoshipUser] = useLocalStorage<AutoshipUser>('USER');
  const { IsAutoShip } = autoshipUser?.xp;
  const [localStorageCart] = useLocalStorage<ProductDetailsType[]>('PRODUCTS_IN_CART');
  useEffect(() => {
    if (!!localStorageCart?.length) {
      refetch();
    }
  }, []);

  if (isLoading) {
    return <Placeholders />;
  }
  return (
    <div className={`${styles.productListingGrid} position-relative px-3`}>
      <Row>
        <Col className="px-4 px-md-0">
          <Table>
            <thead className="thead-light bg-light">
              <tr>
                <th>{t('ShoppingBasket_GridColumnItemDescription')}</th>
                <th>{t('ShoppingBasket_GridColumnItemPrice')}</th>
                <th>{t('ShoppingBasket_GridColumnItemQuantity')}</th>
                <th>{t('ShoppingBasket_GridColumnTotalPrice')}</th>
              </tr>
            </thead>
            {!!cartItems?.length &&
              cartItems?.map((item: BuyerProduct) => {
                let price: number;
                if (!isAuthenticated) {
                  price = IsAutoShip
                    ? item?.PriceSchedules?.[1]?.PriceBreaks?.[0]?.Price || 0
                    : item?.PriceSchedules?.[0]?.PriceBreaks?.[0]?.Price || 0;
                } else {
                  price =
                    groupId === USER_GROUP.RETAIL
                      ? IsAutoShip
                        ? item?.PriceSchedules?.[1]?.PriceBreaks?.[0]?.Price || 0
                        : item?.PriceSchedules?.[0]?.PriceBreaks?.[0]?.Price || 0
                      : item?.PriceSchedules?.[0]?.PriceBreaks?.[0]?.Price || 0;
                }
                const totalPrice = ((price as number) || 0) * ((item?.quantity as number) || 0);
                return (
                  <>
                    <tbody>
                      <tr>
                        <td data-title={t('ShoppingBasket_GridColumnItemDescription')}>
                          <span>{item?.Name}</span>
                        </td>
                        <td data-title={t('ShoppingBasket_GridColumnItemPrice')}>
                          <span>${price ?? 0}</span>
                        </td>
                        <td data-title={t('ShoppingBasket_GridColumnItemQuantity')}>
                          <span className="ps-4">{item?.quantity ?? 0}</span>
                        </td>
                        <td data-title={t('ShoppingBasket_GridColumnTotalPrice')}>
                          <span>${totalPrice}</span>
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              })}
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
