import PromoCodeItem from 'core/atoms/PromoCodeItem/PromoCodeItem';
import { useGiftCards } from 'hooks/useGiftCards';
import { useI18n } from 'next-localization';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import PromoCodeModal from './PromoCodeModalModern';
import Placeholder from 'core/atoms/Placeholders/Placeholder';
import { createPortal } from 'react-dom';
import GroupTile from 'core/atoms/GroupTile';

const PromoCodeModern = (): JSX.Element => {
  const { t } = useI18n();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invalidCode, setInvalidCode] = useState('');
  const { allAppliedGiftCards, isLoading } = useGiftCards();

  const openPromoCodeDetails = () => {
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <Placeholder />;
  }
  return (
    <GroupTile
      btnLabel={t('PromoCode_Step3_Add_ChangeText')}
      heading={t('PromoCode_Step3_Add_Header')}
      handleBtn={openPromoCodeDetails}
    >
      <>
        <p className="h9">{t('PromoCode_Step3_Add_Note')}</p>
        {allAppliedGiftCards?.length > 0 && (
          <Row>
            <Col>
              <div className="pt-3">
                <ul className="p-0 list-unstyled">
                  <PromoCodeItem allValidPromoCodes={allAppliedGiftCards}></PromoCodeItem>
                </ul>
              </div>
            </Col>
          </Row>
        )}
        {invalidCode !== '' && (
          <p className="h9">
            {t('PromoCode_Step3_Add_InvalidPromoCode', { PromoCode: invalidCode })}
            {invalidCode}
          </p>
        )}
      </>
      {createPortal(
        <PromoCodeModal
          setIsModalOpen={setIsModalOpen}
          invalidCode={invalidCode}
          setInvalidCode={setInvalidCode}
          isOpen={isModalOpen}
        />,
        document.body
      )}
    </GroupTile>
  );
};

export default PromoCodeModern;
