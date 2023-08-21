import getFullWidth from 'utils/getFullWidth';
import { FieldRepSponsorNameProps } from './FieldRepSponsorName.type';
import styles from './FieldRepSponsorName.module.scss';
import { Col, Row } from 'react-bootstrap';
import { useTranslate } from 'hooks/useTranslate';
import { useUserByXpPropertyAndRealname } from 'hooks/useUserBy/useUserBy';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { omit } from 'lodash';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Placeholders from 'core/atoms/Placeholders';
import { REALNAME } from 'constants/query-key';

export const FieldRepSponsorName = (props: FieldRepSponsorNameProps): JSX.Element => {
  const { t } = useTranslate();
  const { sitecoreContext } = useSitecoreContext();
  const router = useRouter();
  const { isLoading, sponsor, routerIsReady } = useUserByXpPropertyAndRealname('FileNum');

  const fullWidthClass = getFullWidth(props?.params?.IsFullWidth);
  const isEditing = sitecoreContext && sitecoreContext?.pageEditing;

  useEffect(() => {
    if (!isLoading && routerIsReady && sponsor && Object.keys(sponsor)?.length > 0) {
      redirectWithoutRealname();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, routerIsReady, sponsor]);

  const redirectWithoutRealname = () => {
    const { pathname } = router;
    router.replace({ pathname, query: omit(router?.query, [REALNAME]) }, undefined);
  };

  if (!sponsor && !isEditing) {
    return <Placeholders />;
  }

  return (
    <div className={fullWidthClass}>
      <div className={styles.sponsor_info}>
        <Row>
          <Col>
            <span className="fw-bold pe-1">{t('Form_Generic_Tag_SponsorID')}</span>{' '}
            {sponsor?.xp?.FileNum}
          </Col>
          <Col>
            <span className="fw-bold pe-1">{t('Form_Generic_Tag_SponsorName')}</span>{' '}
            {sponsor?.FirstName || ''} {sponsor?.LastName || ''}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FieldRepSponsorName;
