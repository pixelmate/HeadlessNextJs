import useLocalStorage from 'hooks/useLocalStorage';
import { ROUTES } from 'utils/routes';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

export const useValidateSelectedStep = () => {
  const [localStorageCart] = useLocalStorage<ProductDetailsType[]>('PRODUCTS_IN_CART');
  const [passedStep] = useLocalStorage<number>('COMPLETED_STEP');
  const { sitecoreContext } = useSitecoreContext();

  const validate = (actualStep?: number): string => {
    const cartNotEmpty = localStorageCart && localStorageCart.length > 0;
    let redirectPath = '';
    if (!sitecoreContext?.pageEditing) {
      if (cartNotEmpty && actualStep) {
        if (
          (actualStep === 2 && (passedStep < 1 || !passedStep)) ||
          (actualStep === 3 && (passedStep < 1 || !passedStep))
        ) {
          redirectPath = ROUTES.CHECKOUT_STEP1;
        } else if (actualStep === 3 && passedStep < 2) {
          redirectPath = ROUTES.CHECKOUT_STEP2;
        }
      } else {
        redirectPath = ROUTES.ORDER_BASKET;
      }
    }
    return redirectPath;
  };
  return { validate };
};
