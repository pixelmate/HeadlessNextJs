//Sitecore
import { RichText, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

//React
import { useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

//Other Libs
import { useI18n } from 'next-localization';

//Common (Hooks, queries, api calls, atoms, constants)
import { useAtom } from 'jotai';
import Autoship from 'core/atoms/Autoship';
import { useProductAttributes, useUser, useUserGroups } from 'data/user';
import { useProductAttributesHook } from 'hooks/useProductAttributesHook';
import { useCart } from 'hooks/useCart';
import { isAutoShipChecked } from 'data/atoms/autoship';
import { BasketIcon } from 'core/atoms/Icons';
import { QUANTITY_INPUT_PATTERN } from 'constants/productDetails';

import { ProductAttributeProps } from './ProductAttributes.type';
import style from './ProductAttributes.module.scss';
import Placeholders from 'core/atoms/Placeholders';
import { createModal, modalAtom } from 'data/atoms/modal';
import { MODAL } from 'constants/modal';
import { ProductVariationSelect } from '../ProductVariationSelect/ProductVariationSelect';
import ProductDetailPrice from 'core/atoms/ProductDetailPrice';
import { USER_GROUP } from 'constants/user';

const ProductAttributes = (props: ProductAttributeProps): JSX.Element => {
  const { Variant } = props?.params || {};
  const { sitecoreContext } = useSitecoreContext();
  const sitecoreContextroute = sitecoreContext?.route;
  const isEditing = sitecoreContext && sitecoreContext?.pageEditing;
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
  const { data, isLoading } = useProductAttributes(sitecoreContextroute?.itemId as string);
  const { isAuthenticated } = useUser();
  const { userGroup } = useUserGroups();
  const { groupId } = userGroup || {};
  const {
    quantity,
    productList,
    totalPrice,
    totalAutoshipPrice,
    handleIncrement,
    handleDecrement,
    handleQuantityChange,
    handleKeyDown,
    option,
    setSelectedOption,
    minAllowedQuantity,
    maxAllowedQuantity,
    setChildList,
    autoship,
  } = useProductAttributesHook();
  const selectedProduct = productList[option];
  const { addProductToCart } = useCart({ onAddedToBagSuccess: handleAddToBagSuccess });
  const labelAutoship = t('Products_Autoship', {
    AutoshipSaveAmount: `$${(totalPrice - totalAutoshipPrice).toFixed(2)}`,
  });

  const [autoshipChecked] = useAtom(isAutoShipChecked);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedOption(+event.target.value);
  };

  const handleAddToBag = () => {
    if (maxAllowedQuantity > quantity) addProductToCart(selectedProduct, quantity);
  };

  useEffect(() => {
    if (data) {
      setChildList(data);
    }
  }, [data]);

  if (isLoading && !isEditing) {
    return <Placeholders />;
  }

  // TODO replace with value from dictionary
  const validationMessage = `Quantity must be ${minAllowedQuantity} - ${maxAllowedQuantity}`;
  if (productList.length < 1) {
    return <></>;
  }
  return (
    <div className={`${style.productDetail} product_attributes_detail_container`}>
      <div
        className={`${style.productDetail_content} ${
          Variant === 'Modern' ? style.productDetail_modern : ''
        }`}
      >
        <div className="h6">
          <div className={`mt-4 text-uppercase ${style.productDetail_content_type}`}>
            {(sitecoreContextroute?.fields?.IsFlavor as { value: boolean })?.value
              ? t('Products_Flavor')
              : t('Products_Size')}
          </div>
          <Form>
            <Form.Group controlId="radioButtons">
              <Row className="mx-0">
                {productList?.map(
                  (item, index) =>
                    (item.autoshipPrice > 0 || item.price > 0) && (
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
          {props?.fields?.ProductLinks?.length > 0 && (
            <div>
              <ProductVariationSelect productLinks={props?.fields?.ProductLinks} />
            </div>
          )}
          <Row className="mt-4 mx-0 d-flex">
            <Col md={6} lg={5}>
              <Form className={style.quantityInput}>
                <Form.Group>
                  <Form.Label className="text-uppercase mb-0 pt-2">
                    {t('Products_Quantity')}
                  </Form.Label>
                  <div className={`d-flex ${style.quantityInput_control_container}`}>
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
                      onKeyDown={handleKeyDown}
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
            <Col xs={12} md={6} lg={7} className={style.productDetailPrice}>
              <ProductDetailPrice
                totalPrice={totalPrice?.toFixed(2)}
                totalAutoshipPrice={totalAutoshipPrice?.toFixed(2)}
                autoship={autoship}
              />
            </Col>
          </Row>
          {autoship && (
            <Row className={`${style.autoshipCheckbox} mx-0`}>
              <Autoship
                labelAutoship={labelAutoship}
                labelAutoshipActive={t('Products_AutoshipSelected')}
                labelMakeAutoship={t('Products_MakeThisAnAutoship')}
              />
            </Row>
          )}
          <RichText className="pt-3" field={props?.fields?.CommerceFeatures} />
          <Row className={`${style.addToBag} pt-5 mx-0`}>
            <Col xs={7} md={6} lg={7}>
              {!selectedProduct.isAvailable ? (
                <Button variant="danger" disabled className="text-nowrap">
                  {t('Cart_TemporarilyUnavailable')}
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
                ? `$${autoshipChecked ? totalAutoshipPrice?.toFixed(2) : totalPrice?.toFixed(2)}`
                : groupId === USER_GROUP.AUTOSHIP
                ? `$${totalAutoshipPrice?.toFixed(2)}`
                : `$${totalPrice?.toFixed(2)}`}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ProductAttributes;
