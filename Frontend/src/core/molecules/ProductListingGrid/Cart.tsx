import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import Heading from 'core/atoms/Heading';
import { Alert, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useCartItems } from 'data/cart';
import { lineItems } from 'data/atoms/lineItems';
import styles from './ProductListing.module.scss';
import { useTranslate } from 'hooks/useTranslate';
import Placeholders from 'core/atoms/Placeholders';
import useLocalStorage from 'hooks/useLocalStorage';
import ProductListingItem from './ProductListingItem';
import { useQueryClient } from '@tanstack/react-query';
import { localStorageAtom } from 'data/atoms/localStorage';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { authorizationAtom } from 'data/atoms/authorization-atom';
import { ProductListingGridProps, Item } from './ProductListingGrid.type';
import { spinnerAtom, createSpinner } from 'data/atoms/spinner';
import { USER_GROUP } from 'constants/user';
import {
  useDeleteLineItem,
  useUpdateLineItem,
  useUpdateLineItems,
  updateCart,
  deleteCart,
} from 'data/lineItem';
import { MAX_QUANTITY, MIN_QUANTITY } from 'constants/productDetails';
import { ROUTES } from 'utils/routes';
import { useUserGroups } from 'data/user';
import { DEFAULT_AUTOSHIP_PERIOD } from 'constants/autoship';

const Cart = (props: ProductListingGridProps) => {
  const router = useRouter();
  const { t } = useTranslate();
  const [, setSpinner] = useAtom(spinnerAtom);
  const queryClient = useQueryClient();
  const { CheckoutCTA, Title, CartEmptyCTA } = props.fields || {};
  const [cartItems, setCartItems] = useAtom(lineItems);
  const [, setStorage] = useAtom(localStorageAtom);
  const [{ isAuthenticated }] = useAtom(authorizationAtom);
  const [errorInItems, setErrorInItems] = useState([]);
  const [updateInItems, setUpdateInItems] = useState<{ id: string; quantity: number }[]>([]);
  const { isLoading, isFetching, refetch } = useCartItems();
  const [autoshipUser] = useLocalStorage<AutoshipUser>('USER');
  const { IsAutoShip } = autoshipUser?.xp;
  const { userGroup } = useUserGroups();
  const { groupId } = userGroup || {};
  const {
    mutate: deleteLineItem,
    isLoading: deletingBasket,
    serverError: deletingError,
  } = useDeleteLineItem();
  const {
    mutate: updateLineItem,
    isLoading: updatingBasket,
    serverError: updatingError,
  } = useUpdateLineItem();
  const { executeMutations, isLoading: updatingBaskets } = useUpdateLineItems(updateInItems);
  const [localStorageCart, setLocalStorageCart] =
    useLocalStorage<ProductDetailsType[]>('PRODUCTS_IN_CART');
  const [progressUrl] = useLocalStorage<ProgressUrl>('PROGRESS_URL');
  useEffect(() => {
    if (!!localStorageCart?.length) {
      refetch();
    }
  }, []);

  useEffect(() => {
    if (updatingBaskets || updatingBasket || deletingBasket) {
      setSpinner(createSpinner(t('ShoppingBasket_UpdatingBasket')));
    } else if (isFetching) {
      //TODO: will replace with dict key
      setSpinner(createSpinner('Fetching Product Info...'));
    } else {
      setSpinner(null);
    }
  }, [updatingBaskets, updatingBasket, deletingBasket, isFetching]);

  const handleDelete = (id: string) => {
    if (isAuthenticated) {
      const item = cartItems?.find((item: BuyerProduct) => item?.productId === id);
      deleteLineItem(item?.id as string);
    } else {
      deleteCart(id, queryClient, setStorage, setCartItems, localStorageCart, setLocalStorageCart);
    }
  };

  const handleUpdate = (id: string, quantity: number) => {
    if (isAuthenticated) {
      const item = cartItems?.find((item: BuyerProduct) => item?.productId === id);
      updateLineItem({ id: item?.id as string, quantity });
    } else {
      updateCart(id, quantity, queryClient, setCartItems, setLocalStorageCart);
    }
  };

  const handleBtnItems = (btnType: string) => {
    if (!!updateInItems?.length && isAuthenticated) {
      executeMutations();
    } else {
      for (const item of updateInItems) {
        const { id, quantity } = item;
        updateCart(id, quantity, queryClient, setCartItems, setLocalStorageCart);
      }
    }
    if (btnType === 'checkout') {
      router.push(CheckoutCTA?.value?.href || ROUTES.HOME);
    } else {
      router.push(progressUrl?.url ? progressUrl?.url : ROUTES.HOME);
    }
  };

  if (isLoading) {
    return <Placeholders />;
  }
  return (
    <Container className={`${styles.productListingGrid} position-relative`}>
      <Row>
        <Col className="px-4 px-md-0">
          <div className="mt-2 mb-4">
            {(!!errorInItems?.length || updatingError || deletingError) && (
              <Alert variant="danger">
                {!!errorInItems?.length && (
                  <>
                    <strong>{t('Form_Generic_Tag_PleaseCorrectFollowingErrorsTryAgain')}</strong>
                    <ul>
                      {errorInItems.map((item: Item) => (
                        <li key={item?.id}>{item?.name}</li>
                      ))}
                    </ul>
                  </>
                )}
                {(updatingError || deletingError) && <p>{t('Common_InternalServerError')}</p>}
              </Alert>
            )}
            <Heading level={1} text={Title} className="py-2 fw-light d-none d-md-block" />
            <div className="d-flex w-100 justify-content-between">
              <button
                className={`btn btn-light ${styles.productListingGrid_button}`}
                disabled={!!errorInItems?.length}
                onClick={() => handleBtnItems('shopping')}
              >
                {t('Cart_ContinueShoppingLabel')}
              </button>
              <button
                className={`btn btn-success ${styles.productListingGrid_button}`}
                disabled={
                  !!errorInItems?.length ||
                  !cartItems ||
                  cartItems?.length === 0 ||
                  (!!autoshipUser?.xp?.IsAutoShip &&
                    autoshipUser?.xp?.autoshipFrequency === DEFAULT_AUTOSHIP_PERIOD)
                }
                onClick={() => handleBtnItems('checkout')}
              >
                {t('Cart_CheckoutLabel')}
              </button>
            </div>
          </div>
          <Table>
            <thead className="thead-light">
              <tr>
                <th>{t('ShoppingBasket_GridColumnItem')}</th>
                <th>{t('ShoppingBasket_GridColumnItemDescription')}</th>
                <th>{t('ShoppingBasket_GridColumnItemPrice')}</th>
                <th>{t('ShoppingBasket_GridColumnItemQuantity')}</th>
                <th>{t('ShoppingBasket_GridColumnTotalPrice')}</th>
                <th className="text-center">{t('ShoppingBasket_GridColumnItemRemove')}</th>
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
                return (
                  <ProductListingItem
                    key={item?.id}
                    id={item?.productId}
                    link={item?.Link}
                    name={item?.Name}
                    image={item?.Image}
                    itemQuantity={item?.quantity ?? 0}
                    maxQuantity={item?.priceSchedule?.maxQuantity || MAX_QUANTITY}
                    minQuantity={item?.priceSchedule?.minQuantity || MIN_QUANTITY}
                    errorInItems={errorInItems}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    setErrorInItems={setErrorInItems}
                    setUpdateInItems={setUpdateInItems}
                    price={price || 0}
                  />
                );
              })}
          </Table>
          {(!cartItems || cartItems.length === 0) && (
            <div className={`text-center ${styles.productListingGrid_empty_cart_message}`}>
              <div>{t('ShoppingBasket_CartEmptyMessage')}</div>
              {CartEmptyCTA?.value?.href && (
                <Button variant="success" className="px-4 mt-3" href={CartEmptyCTA?.value?.href}>
                  {CartEmptyCTA?.value?.text}
                </Button>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
