import { DEFAULT_PRICE, MAX_QUANTITY, MIN_QUANTITY, AUTOSHIP } from 'constants/productDetails';
import {
  ChildProduct,
  PriceSchedule,
  ProductDetailAttributes,
} from 'core/molecules/ProductAttributes/ProductAttributes.type';
import { isAutoShipChecked } from 'data/atoms/autoship';
import { useAtom } from 'jotai';
import { ChangeEvent, useState } from 'react';
export const useProductAttributesHook = () => {
  const [quantity, setQuantity] = useState(1);
  const [productList, setProductList] = useState([] as ChildProduct[]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAutoshipPrice, setTotalAutoshipPrice] = useState(0);
  const [minAllowedQuantity, setMinAllowedQuantity] = useState(1);
  const [maxAllowedQuantity, setMaxAllowedQuantity] = useState(100);
  const [option, setOption] = useState(0);
  const [autoship, setAutoship] = useState(true);
  const [autoshipChecked] = useAtom(isAutoShipChecked);

  const setChildList = (data: ProductDetailAttributes) => {
    const productChildList: ChildProduct[] = data?.Product?.ChildProducts?.map((childProduct) => {
      const [autoshipPriceSchedule, rolePriceSchedule] = (
        childProduct?.PriceSchedules || []
      ).reduce((acc: PriceSchedule[], priceSchedule) => {
        if (priceSchedule?.Name?.includes(AUTOSHIP)) {
          acc[0] = priceSchedule;
        } else {
          acc[1] = priceSchedule;
        }
        return acc;
      }, []);
      const childProductObject: ChildProduct = {
        id: childProduct?.Id,
        size: childProduct?.Size,
        autoshipProduct: childProduct?.AutoshipProduct,
        isAvailable: childProduct.IsAvailable,
        minQuantity: rolePriceSchedule?.MinQuantity || MIN_QUANTITY,
        maxQuantity: rolePriceSchedule?.MaxQuantity || MAX_QUANTITY,
        price: rolePriceSchedule?.PriceBreaks[0]?.Price || DEFAULT_PRICE,
        autoshipMinQuantity: autoshipPriceSchedule?.MinQuantity || MIN_QUANTITY,
        autoshipMaxQuantity: autoshipPriceSchedule?.MaxQuantity || MAX_QUANTITY,
        autoshipPrice: autoshipPriceSchedule?.PriceBreaks[0]?.Price || DEFAULT_PRICE,
      };

      return childProductObject;
    });
    setMinAllowedQuantity(
      autoshipChecked ? productChildList[0]?.autoshipMinQuantity : productChildList[0]?.minQuantity
    );
    setMaxAllowedQuantity(
      autoshipChecked ? productChildList[0]?.autoshipMaxQuantity : productChildList[0]?.maxQuantity
    );
    setTotalPrice(productChildList[0]?.price);
    setTotalAutoshipPrice(productChildList[0]?.autoshipPrice);
    setAutoship(productChildList[0]?.autoshipProduct);
    setProductList(productChildList);
  };
  const setSelectedOption = (value: number) => {
    setOption(value);
    setMinAllowedQuantity(
      autoshipChecked ? productList[value]?.autoshipMinQuantity : productList[value].minQuantity
    );
    setMaxAllowedQuantity(
      autoshipChecked ? productList[value]?.autoshipMaxQuantity : productList[value].maxQuantity
    );
    setAutoship(productList[value].autoshipProduct);
    setTotalAutoshipPrice(+(quantity * productList[value].autoshipPrice).toFixed(2));
    setTotalPrice(+(quantity * productList[value]?.price).toFixed(2));
  };

  const handleTotalPrice = (quantity: number) => {
    setTotalAutoshipPrice(+(quantity * productList[option]?.autoshipPrice).toFixed(2));
    setTotalPrice(+(quantity * productList[option]?.price).toFixed(2));
  };
  const handleIncrement = () => {
    if (quantity < maxAllowedQuantity) {
      setQuantity(quantity + 1);
      handleTotalPrice(quantity + 1);
    }
    if (quantity > maxAllowedQuantity) {
      setQuantity(maxAllowedQuantity);
      handleTotalPrice(quantity + 1);
    }
  };
  const handleDecrement = () => {
    if (quantity > minAllowedQuantity) {
      setQuantity(quantity - 1);
      handleTotalPrice(quantity - 1);
    }
    if (quantity > maxAllowedQuantity) {
      setQuantity(maxAllowedQuantity);
      handleTotalPrice(quantity - 1);
    }
  };
  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newQuantity = parseInt(e?.target?.value);
    if (isNaN(parseInt(e?.target?.value))) {
      newQuantity = 1;
    }
    setQuantity(newQuantity);
    handleTotalPrice(newQuantity);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return {
    quantity,
    setQuantity,
    productList,
    totalPrice,
    setTotalPrice,
    totalAutoshipPrice,
    setTotalAutoshipPrice,
    handleIncrement,
    handleKeyDown,
    handleDecrement,
    handleQuantityChange,
    option,
    setSelectedOption,
    minAllowedQuantity,
    maxAllowedQuantity,
    setMinAllowedQuantity,
    setMaxAllowedQuantity,
    setChildList,
    autoship,
  };
};
