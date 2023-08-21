import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { CheckoutAsGuestProps } from './checkoutAsGuest.type';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';
import { getValuesFromQueryString } from 'utils/getValuesFromQueryString';
import { REFERRER_URL } from 'constants/query-config';
import { useRouter } from 'next/router';
import { ROUTES } from 'utils/routes';
import { useAtom } from 'jotai';
import { isNewUserAtom } from 'data/atoms/isNewUser';

const CheckoutAsGuest = (props: CheckoutAsGuestProps): JSX.Element => {
  const { CTAAlignment } = props?.params || {};
  const [, setNewUser] = useAtom(isNewUserAtom);
  const queryUrl = getValuesFromQueryString(REFERRER_URL);
  const navigateTo = queryUrl !== '' ? queryUrl : ROUTES.HOME;
  const router = useRouter();
  const handleClick = () => {
    setNewUser(true);
    window.localStorage.setItem('IS_NEW_USER', `true`);
    router.push(navigateTo);
  };

  return (
    <div className="p-2">
      <p>
        <Text field={props?.fields?.SubTitle} />
      </p>
      <div
        className={classNames(
          {
            ['text-end']: CTAAlignment === 'right',
          },
          {
            ['text-center']: CTAAlignment === 'center',
          }
        )}
      >
        <Button
          type="submit"
          onClick={handleClick}
          className={`rounded-1 lh-1 fs-6`}
          variant="success"
        >
          <span className={`px-1 h7`}>{props?.fields?.Link?.value?.text}</span>
        </Button>
      </div>
    </div>
  );
};

export default CheckoutAsGuest;
