import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { Col, Container, Row } from 'react-bootstrap';
import { GiftCertificateListProps } from './GiftCertificateList.type';
import Placeholders from 'core/atoms/Placeholders';
import GiftCertificateListItem from './GiftCertificateListItem';
import styles from './GiftCertificateList.module.scss';
import { useI18n } from 'next-localization';
import { useGiftCards } from 'data/user';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

const GiftCertificateList = (props: GiftCertificateListProps): JSX.Element => {
  const { t } = useI18n();
  const { Description, Link } = props?.fields || {};
  const { sitecoreContext } = useSitecoreContext();
  const pageEditing = sitecoreContext?.pageEditing;
  const { data, isLoading: areGiftCardsFetched } = useGiftCards();

  if (data?.Items?.length === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={7} className="text-center">
            <div
              dangerouslySetInnerHTML={{
                __html: t('GiftCertificateList_NoGiftCertificateMessage'),
              }}
            ></div>
          </Col>
        </Row>
      </Container>
    );
  }
  if (areGiftCardsFetched && !pageEditing) {
    return <Placeholders />;
  }
  return (
    <Container className="pb-5">
      <Row className="justify-content-center">
        <Col md={7}>
          <RichText field={Description} className="text-center py-5" />
        </Col>
      </Row>

      <Row className={styles.dataHeader}>
        <Col xs={4} md={3}>
          {t('GiftCertificateList_GiftCodeLabel')}
        </Col>
        <Col xs={2} md={1} className="text-end">
          {t('GiftCertificateList_CurrentLabel')}
        </Col>
        <Col xs={2} md={1} className="text-end">
          {t('GiftCertificateList_InitialLabel')}
        </Col>
        <Col xs={4} md={2}>
          {t('GiftCertificateList_CreatedLabel')}
        </Col>
        <Col md={2}>{t('GiftCertificateList_ToLabel')}</Col>
        <Col md={2}>{t('GiftCertificateList_EmailLabel')}</Col>
        <Col md={1}>{t('GiftCertificateList_SendLabel')}</Col>
      </Row>
      {data &&
        data?.Items?.map((item) => (
          <GiftCertificateListItem key={item.ID} row={item} link={Link} />
        ))}
    </Container>
  );
};

export default GiftCertificateList;
