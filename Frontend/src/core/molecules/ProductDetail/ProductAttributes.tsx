import { useProductAttributesHook } from 'hooks/useProductAttributesHook';
import { memo, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import style from './ProductAttributes.module.scss';
import { useAtom } from 'jotai';
import { isAutoShipChecked } from 'data/atoms/autoship';
import { RichText, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Autoship from 'core/atoms/Autoship';
import { BasketIcon } from 'core/atoms/Icons';
import { useI18n } from 'next-localization';
import { useProductAttributes, useUser, useUserGroups } from 'data/user';
import { ProductAttributesProps } from './productDetail.types';
import { QUANTITY_INPUT_PATTERN } from 'constants/productDetails';
import { useCart } from 'hooks/useCart';
import { createModal, modalAtom } from 'data/atoms/modal';
import { MODAL } from 'constants/modal';
import ProductDetailPrice from 'core/atoms/ProductDetailPrice';
import { USER_GROUP } from 'constants/user';

const ProductAttributes = (props: ProductAttributesProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const sitecoreContextroute = sitecoreContext?.route;
  const [, setContent] = useAtom(modalAtom);
  const { t } = useI18n();
  const handleAddToBagSuccess = () => {
    setContent(
      createModal(MODAL.ADDED_TO_CART, {
        title: t('Cart_ProductAdded'),
        ctaContinueLabel: t('Cart_ContinueShoppingLabel'),
        ctaBagLabel: t('Cart_ViewBag'),
        linkToCart: sitecoreContext?.CartPage as string,
      })
    );
  };
  const { data } = useProductAttributes(sitecoreContextroute?.itemId as string);
  const {
    quantity,
    productList,
    totalPrice,
    totalAutoshipPrice,
    handleIncrement,
    handleDecrement,
    handleQuantityChange,
    option,
    setSelectedOption,
    minAllowedQuantity,
    maxAllowedQuantity,
    setChildList,
    autoship,
  } = useProductAttributesHook();
  const { isAuthenticated } = useUser();
  const { userGroup } = useUserGroups();
  const { groupId } = userGroup || {};
  const selectedProduct = productList[option];
  const { addProductToCart, isLoading } = useCart({ onAddedToBagSuccess: handleAddToBagSuccess });

  const labelAutoship = t('Products_Autoship', {
    AutoshipSaveAmount: `$${(totalPrice - totalAutoshipPrice).toFixed(2)}`,
  });

  const [autoshipChecked] = useAtom(isAutoShipChecked);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedOption(+event.target.value);
  };

  const handleAddToBag = () => {
    addProductToCart(selectedProduct, quantity);
  };

  useEffect(() => {
    if (data) {
      setChildList(data);
    }
  }, [data]);

  // TODO replace with value from dictionary
  const validationMessage = `Quantity must be ${minAllowedQuantity} - ${maxAllowedQuantity}`;
  if (productList.length < 1) {
    return <></>;
  }
  return (
    <>
      <div className="mt-4 text-uppercase">{t('Products_Size')}</div>
      <Form>
        <Form.Group controlId="radioButtons">
          <Row>
            {productList.map(
              (item, index) =>
                item.autoshipPrice > 0 && (
                  <Col key={item?.id} xs={6}>
                    <Form.Check
                      className={`pt-2 ${style.formCheck}`}
                      type="radio"
                      label={item?.size}
                      name="option"
                      id={item?.id}
                      value={index}
                      onChange={handleOptionChange}
                      defaultChecked={index === 0}
                    />
                  </Col>
                )
            )}
          </Row>
        </Form.Group>
      </Form>
      <Row className="mt-4">
        <Col md={6} lg={5}>
          <Form className={style.quantityInput}>
            <Form.Group>
              <Form.Label className="text-uppercase">{t('Products_Quantity')}</Form.Label>
              <div className="d-flex">
                <div onClick={handleDecrement} className={`rounded-circle ${style.formButton}`}>
                  <span
                    className={`${style.formButton_cirkle} ${style.formButton_cirkle_negative}`}
                  >
                    -
                  </span>
                </div>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  pattern={QUANTITY_INPUT_PATTERN}
                  inputMode="numeric"
                  onWheel={() => false}
                  className={style.formInput}
                  aria-label="items-quantity"
                />
                <div onClick={handleIncrement} className={style.formButton}>
                  <span className={style.formButton_cirkle}>+</span>
                </div>
              </div>
              <span className="text-danger text-nowrap">
                {quantity < minAllowedQuantity || quantity > maxAllowedQuantity
                  ? validationMessage
                  : ''}
              </span>
            </Form.Group>
          </Form>
        </Col>
        <Col xs={12} md={6} lg={7}>
          <ProductDetailPrice
            totalPrice={totalPrice?.toFixed(2)}
            totalAutoshipPrice={totalAutoshipPrice?.toFixed(2)}
            autoship={autoship}
          />
        </Col>
      </Row>
      {autoship && (
        <Row className={style.autoshipCheckbox}>
          <Autoship
            labelAutoship={labelAutoship}
            labelAutoshipActive={t('Products_AutoshipSelected')}
            labelMakeAutoship={t('Products_MakeThisAnAutoship')}
          />
        </Row>
      )}
      <RichText className="pt-3" field={props?.commerceFeatures} />
      <Row className={`${style.addToBag} pt-5`}>
        <Col xs={7} md={6} lg={7}>
          {!selectedProduct.isAvailable ? (
            <Button variant="danger" disabled className="text-nowrap">
              {/* TODO replace with dictionary value */}
              Temporarily Unavailable
            </Button>
          ) : (
            <Button
              className={`${style.addToBag_button} d-flex`}
              disabled={isLoading}
              onClick={handleAddToBag}
            >
              <BasketIcon />
              <span className="px-1 text-nowrap">{t('Cart_AddToBag')}</span>
            </Button>
          )}
        </Col>
        <Col className={`${style.addToBag_price} d-flex`}>
          {groupId === USER_GROUP.RETAIL || !isAuthenticated
            ? `${autoshipChecked ? totalAutoshipPrice?.toFixed(2) : totalPrice?.toFixed(2)}`
            : `${totalPrice?.toFixed(2)}`}
        </Col>
      </Row>
    </>
  );
};

export default memo(ProductAttributes);
