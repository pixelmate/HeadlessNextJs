import { isAutoShipChecked } from 'data/atoms/autoship';
import { useAtom } from 'jotai';
import { Form } from 'react-bootstrap';
import { AutoshipProps } from './Autoship.type';
import { useUpdateUserAutoship, useUser, useUserGroups, useUpdateAutoship } from 'data/user';
import { useCart } from 'hooks/useCart';
import useLocalStorage from 'hooks/useLocalStorage';
import { XpAutoshipCart } from 'data/atoms/localStorage';
import { USER_GROUP } from 'constants/user';

const Autoship = (props: AutoshipProps): JSX.Element => {
  const [autoshipChecked, setAutoshipChecked] = useAtom(isAutoShipChecked);
  const { updateCartAutoship } = useCart();
  const [autoshipCart, setAutoshipCart] = useLocalStorage('CART');
  const [, setAutoshipUser] = useLocalStorage('USER');
  const { mutate: updateUser } = useUpdateUserAutoship();
  const { user, isAuthenticated } = useUser();
  const { userGroup } = useUserGroups();
  const { mutate } = useUpdateAutoship();
  const { groupId } = userGroup || {};
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoshipChecked(e.target.checked);
    if (user && isAuthenticated) {
      updateUser({
        xp: {
          ...user?.xp,
          IsAutoShip: e.target.checked,
        },
      });
      updateCartAutoship({ xp: { IsAutoShipOrder: e.target.checked } });
      mutate({ autoship: e.target.checked });
    }
    setAutoshipCart({ xp: { IsAutoShipOrder: e.target.checked } });
    setAutoshipUser((prevState: AutoshipUser) => {
      return {
        xp: {
          ...prevState.xp,
          IsAutoShip: e.target.checked,
        },
      };
    });
  };
  return (
    <Form>
      <Form.Group controlId="radioButtons">
        <Form.Check
          type="checkbox"
          label={
            !autoshipChecked ? (
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    !isAuthenticated || groupId === USER_GROUP.RETAIL
                      ? props?.labelAutoship
                      : props?.labelMakeAutoship,
                }}
              />
            ) : (
              props?.labelAutoshipActive
            )
          }
          name="option"
          id="autoship"
          onChange={handleChange}
          defaultChecked={autoshipChecked || (autoshipCart as XpAutoshipCart)?.xp?.IsAutoShipOrder}
        />
      </Form.Group>
    </Form>
  );
};

export default Autoship;
