import { useState } from 'react';
import DeliveryMethodChangeItem from './DeliveryMethodChangeItem';
import { DeliveryOptionsProps } from '../DeliveryOptions';

const DeliveryMethodUpdate = (props: DeliveryOptionsProps): JSX.Element => {
  const { Title } = props?.fields || {};
  const [, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <>{Title && <DeliveryMethodChangeItem title={Title || {}} onChangeClick={handleShow} />}</>
  );
};
export default DeliveryMethodUpdate;
