import useLocalStorage from 'hooks/useLocalStorage';
import { Button, Col, Row } from 'react-bootstrap';
import styles from './GiftCertificateList.module.scss';
import { GiftCardItemProps } from './GiftCertificateList.type';
import { useRouter } from 'next/router';
import { useFormattedDate } from 'hooks/useDateFormat';

const GiftCertificateListItem = (props: GiftCardItemProps): JSX.Element => {
  const router = useRouter();
  const { Name, Balance, xp, StartDate } = props?.row || {};
  const { GiftCertificateEmail, GiftCertificateTo, InitialAmount } = xp || {};
  const formattedDate: string = useFormattedDate(StartDate);
  const [, setLocalStorageGiftCard] = useLocalStorage('GIFT_CARDS');
  const sendEmail = (row: GiftCardItem) => {
    setLocalStorageGiftCard(row);
    router.push(props?.link?.value?.href || '');
  };
  return (
    <Row className={styles.dataRow}>
      <Col xs={4} md={3}>
        {Name}
      </Col>
      <Col xs={2} md={1} className="text-end">
        ${Balance.toFixed(2)}
      </Col>
      <Col xs={2} md={1} className="text-end">
        ${InitialAmount.toFixed(2)}
      </Col>
      <Col xs={4} md={2}>
        {formattedDate}
      </Col>
      <Col md={2}>{GiftCertificateTo}</Col>
      <Col md={2}>{GiftCertificateEmail}</Col>
      <Col md={1}>
        <Button
          className={`bg-color-lightgray color-darkgray btn btn-secondary ${styles.sendBtn}`}
          type="button"
          onClick={() => sendEmail(props?.row)}
        >
          {props?.link?.value?.text}
        </Button>
      </Col>
    </Row>
  );
};

export default GiftCertificateListItem;
