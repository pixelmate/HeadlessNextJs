import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { GiftCertificate } from 'data/atoms/localStorage/giftCertificateInformation';
import useLocalStorage from 'hooks/useLocalStorage';
import { useI18n } from 'next-localization';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Image from 'core/atoms/Image';
import { GiftCertificateDesignItem } from './GiftCardIformation.type';

const GiftCardInformation = (): JSX.Element => {
  const { t } = useI18n();
  const { sitecoreContext } = useSitecoreContext();
  const [giftCerficateImage, setGiftCerficateImage] = useState<{ value: ImageItem }[]>([]);
  const [localStorageGiftCertificate] = useLocalStorage<GiftCertificate>(
    'GIFT_CERTIFICATE_INFORMATION'
  );

  const findGiftCardCertificateDesign = () => {
    if (Array.isArray(sitecoreContext?.GiftCertificateDesign)) {
      const matchingDesigns = sitecoreContext?.GiftCertificateDesign.filter(
        (item: GiftCertificateDesignItem) =>
          item.GiftCertificateStyle === localStorageGiftCertificate?.designFormat
      );

      if (matchingDesigns.length > 0) {
        return matchingDesigns.map((design) => design.GiftCertificateImage);
      }
    }

    return [];
  };

  useEffect(() => {
    setGiftCerficateImage(findGiftCardCertificateDesign());
  }, []);

  return (
    <Row>
      <Col xs={8}>
        <div>
          <div className="h9">
            <strong className="me-1">{t('Form_Generic_Tag_To')}</strong>
            {localStorageGiftCertificate?.recipient}
          </div>
          <div className="h9">
            <strong className="me-1">{t('Form_Generic_Tag_RecipientsEmail')}</strong>
            {localStorageGiftCertificate?.recipientEmail}
          </div>
          <div className="h9">
            <strong className="me-1">{t('Form_Generic_Tag_From')}</strong>
            {localStorageGiftCertificate?.sender}
          </div>
          <div className="h9">
            <strong className="me-1">{t('Form_Generic_Tag_Amount')}</strong>
            {`$${localStorageGiftCertificate?.amount.toFixed(2)}`}
          </div>
          <div className="h9">
            <strong className="me-1">{t('Form_Generic_Tag_Message')}</strong>
            {localStorageGiftCertificate?.message}
          </div>
        </div>
      </Col>
      <Col xs={4}>
        {giftCerficateImage?.length && <Image field={giftCerficateImage[0]}></Image>}
      </Col>
    </Row>
  );
};

export default GiftCardInformation;
