import Link from 'next/link';
import { useState, useRef } from 'react';
import Image from 'core/atoms/Image';
import { Tooltip } from 'react-bootstrap';
import { useI18n } from 'next-localization';
import styles from './ProductListing.module.scss';
import { WarningIcon } from 'core/atoms/Icons/WarningIcon';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { TrashIcon, ChevronDown, ChevronUp } from 'core/atoms/Icons';
import { ProductListingItemProps, Item } from './ProductListingGrid.type';
import { DEFAULT_PRODUCT_QUANTITY } from 'constants/productListing';

const CartListingItem = (props: ProductListingItemProps) => {
  const {
    image,
    link,
    name,
    itemQuantity,
    price,
    id,
    maxQuantity,
    minQuantity,
    handleDelete,
    handleUpdate,
    setErrorInItems,
    errorInItems,
    setUpdateInItems,
  } = props || {};
  const { t } = useI18n();
  const isErrorItemMatch = errorInItems.some((item: Item) => item?.id === id);
  const [quantity, setQuantity] = useState<number | undefined>(itemQuantity);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpdateItems = (quantity: number | undefined) => {
    setUpdateInItems((prevState: Item[]) => {
      if (quantity === itemQuantity) {
        const filteredItems = prevState.filter((item: Item) => item?.id !== id);
        return filteredItems;
      }
      const isUpdateItemMatch = prevState.some((item: Item) => item?.id === id);
      if (isUpdateItemMatch) {
        const updatedItems = prevState.map((item: Item) => {
          if (item?.id === id) {
            return { ...item, quantity: Number(quantity) };
          } else {
            return { ...item };
          }
        });
        return updatedItems;
      } else {
        const newItem = { quantity, id };
        return [...prevState, newItem];
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = e.target.value ? Number(e.target.value) : undefined;
    setQuantity(newQuantity);
    validateQuantity(newQuantity);
  };

  const handleOutFocus = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newQuantity = e.target.value ? Number(e.target.value) : undefined;
    if (newQuantity === undefined || quantity === undefined) {
      setDefaultQuantity();
    } else if (inputRef.current) {
      inputRef.current.value = newQuantity.toString();
    }
  };

  const setDefaultQuantity = (): void => {
    setQuantity(DEFAULT_PRODUCT_QUANTITY);
    handleUpdateItems(DEFAULT_PRODUCT_QUANTITY);
  };

  const validateQuantity = (quantityValue: number | undefined): void => {
    if (quantityValue !== undefined) {
      if (quantityValue > maxQuantity || quantityValue < minQuantity) {
        setErrorInItems((prevState: Item[]) => {
          if (isErrorItemMatch) {
            return [...prevState];
          }
          const resultString = t('Form_Generic_ValidationMessages_InvalidQuantity', {
            productName: name,
            minQuantity,
            maxQuantity,
          });
          const newItem = { name: resultString, id };
          return [...prevState, newItem];
        });
      } else {
        setErrorInItems((prevState: Item[]) => prevState.filter((item: Item) => item?.id !== id));
        handleUpdateItems(quantityValue);
      }
    }
  };

  const increaseQuantity = () => {
    let newQuantity = quantity ? quantity + 1 : DEFAULT_PRODUCT_QUANTITY;
    const needUpdate =
      (newQuantity <= maxQuantity && newQuantity >= minQuantity) ||
      newQuantity > maxQuantity ||
      newQuantity < minQuantity;
    if (!(newQuantity <= maxQuantity) && newQuantity > maxQuantity) {
      newQuantity = maxQuantity;
    } else if (newQuantity < minQuantity) {
      newQuantity = minQuantity;
    }
    if (needUpdate) {
      setQuantity(newQuantity);
      setErrorInItems((prevState: Item[]) => prevState.filter((item: Item) => item?.id !== id));
      handleUpdateItems(newQuantity);
    }
  };

  const decreaseQuantity = () => {
    let newQuantity = quantity ? quantity - 1 : DEFAULT_PRODUCT_QUANTITY;
    const needUpdate =
      (newQuantity >= minQuantity && newQuantity <= maxQuantity) ||
      newQuantity < minQuantity ||
      newQuantity > maxQuantity;
    if (!(newQuantity >= minQuantity) && newQuantity < minQuantity) {
      newQuantity = minQuantity;
    } else if (newQuantity > maxQuantity) {
      newQuantity = maxQuantity;
    }
    if (needUpdate) {
      setQuantity(newQuantity);
      setErrorInItems((prevState: Item[]) => prevState.filter((item: Item) => item?.id !== id));
      handleUpdateItems(newQuantity);
    }
  };
  const totalPrice = ((price as number) || 0) * ((itemQuantity as number) || 0);
  return (
    <>
      <tbody>
        <tr>
          <td data-title={t('ShoppingBasket_GridColumnItem')}>
            <Image field={image} />
          </td>
          <td data-title={t('ShoppingBasket_GridColumnItemDescription')}>
            <Link href={link || ('/' as string)}>
              <span className={styles.productListingGrid_link}>{name}</span>
            </Link>
          </td>
          <td data-title={t('ShoppingBasket_GridColumnItemPrice')}>
            <span>${price?.toFixed(2)}</span>
          </td>
          <td data-title={t('ShoppingBasket_GridColumnItemQuantity')}>
            <div className="d-flex align-items-center position-relative">
              {isErrorItemMatch && (
                <OverlayTrigger
                  delay={{ hide: 250, show: 300 }}
                  overlay={(props) => (
                    <Tooltip {...props}>
                      {t('Form_Generic_ValidationMessages_InvalidQuantity', {
                        productName: name,
                        minQuantity,
                        maxQuantity,
                      })}
                    </Tooltip>
                  )}
                  placement="top"
                >
                  <span className={`position-absolute ${styles.warning_icon}`}>
                    <WarningIcon />
                  </span>
                </OverlayTrigger>
              )}
              <input
                type="number"
                ref={inputRef}
                onBlur={handleOutFocus}
                placeholder={DEFAULT_PRODUCT_QUANTITY.toString()}
                value={quantity}
                onChange={handleChange}
              />
              <div className="d-flex flex-column px-2">
                <ChevronUp onClick={increaseQuantity} className={styles.pointer} />
                <ChevronDown onClick={decreaseQuantity} className={styles.pointer} />
              </div>
            </div>
            <div className="mt-2">
              {quantity !== itemQuantity && (
                <button
                  className="btn btn-success"
                  disabled={isErrorItemMatch}
                  onClick={() => {
                    handleUpdate(id as string, quantity as number);
                  }}
                >
                  {t('ShoppingBasket_GridColumnItemUpdate')}
                </button>
              )}
            </div>
          </td>
          <td data-title={t('ShoppingBasket_GridColumnTotalPrice')}>
            <span>${totalPrice.toFixed(2)}</span>
          </td>
          <td
            className="text-left text-md-center"
            data-title={t('ShoppingBasket_GridColumnItemRemove')}
          >
            <TrashIcon className={styles.pointer} onClick={() => handleDelete(id as string)} />
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default CartListingItem;
