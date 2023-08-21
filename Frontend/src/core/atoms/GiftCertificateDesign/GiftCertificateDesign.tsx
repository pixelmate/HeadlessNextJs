import Image from 'core/atoms/Image';
import DPanel from 'core/atoms/Panel/DPanel';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import {
  GiftCertificateDesignType,
  GiftCertificateDesignProps,
} from './GiftCertificateDesign.type';
import { Row, Col } from 'react-bootstrap';
import { useI18n } from 'next-localization';

const GiftCertificateDesign = (props: GiftCertificateDesignProps) => {
  const { sitecoreContext } = useSitecoreContext();
  const { t } = useI18n();
  const { setDesignFormat, bgColorContrast, designFormat } = props || {};
  const giftCertificateDesign = sitecoreContext?.GiftCertificateDesign as GiftCertificateDesignType;
  const handleImageClick = (giftCertificateDesign: string) => {
    setDesignFormat(giftCertificateDesign);
  };
  return (
    <>
      <DPanel panelTitle={t('GiftCertificateDesign_PanelTitle')} bgColorContrast={bgColorContrast}>
        <Row className="text-center py-2">
          {giftCertificateDesign?.map((item, index: number) => {
            return (
              <Col xs={6} md={3} key={index} className="pb-2">
                <div className="d-flex flex-column align-items-center">
                  <label
                    htmlFor="giftCertificateDesign"
                    onClick={() => handleImageClick(item?.GiftCertificateStyle)}
                    className="cursor-pointer"
                  >
                    <Image field={item?.GiftCertificateImage} />
                  </label>
                  <input
                    type="radio"
                    name="giftCertificateDesign"
                    className="my-2 cursor-pointer"
                    onChange={() => handleImageClick(item?.GiftCertificateStyle)}
                    value={item?.GiftCertificateStyle}
                    checked={item?.GiftCertificateStyle === designFormat}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
      </DPanel>
    </>
  );
};

export default GiftCertificateDesign;
