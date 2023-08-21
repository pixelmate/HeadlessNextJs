import { useTranslate } from 'hooks/useTranslate';
import { GiftCertificateReferralProps } from './GiftCertificateReferral.type';
import { Col, Form, Row } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { authorizationAtom } from 'data/atoms/authorization-atom';
import { DEFAULT_IS_FULLWIDTH, IS_FULLWIDTH } from 'constants/alignment';
import classNames from 'classnames';
import styles from './GiftCertificateReferral.module.scss';
import { useContext, useEffect } from 'react';
import { FormValidationContext } from '../GenericForm/FormContext';
import { useFormContext } from 'react-hook-form';
import { newReferralNameSchemas } from 'src/schemas/formSchemas/NewReferralNameSchemas';

const GiftCertificateReferral = (props: GiftCertificateReferralProps): JSX.Element => {
  const { params } = props || {};
  const IsFullWidth = params?.IsFullWidth || DEFAULT_IS_FULLWIDTH;

  const { t } = useTranslate();
  const [{ isAuthenticated }] = useAtom(authorizationAtom);
  const { register } = useFormContext();
  const { addValidationSchema } = useContext(FormValidationContext);

  useEffect(() => {
    addValidationSchema(newReferralNameSchemas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated) {
    return <></>;
  }

  return (
    <div
      className={classNames('d-flex flex-column mt-3', {
        'container p-0': IsFullWidth !== IS_FULLWIDTH,
      })}
    >
      <Row className={`m-0 ${styles.referralRow}`}>
        <p className={`${styles.referralText} m-0`}>{t('GiftCertificate_Referral_InfoText')}</p>
      </Row>
      <Row className={`m-0 ${styles.referralRow}`}>
        <Col xl={6}>
          <Form.Group className="my-3" controlId="certificateReferral">
            <Form.Label className={`text-nowrap ${styles.referralText}`}>
              {t('Form_Generic_Tag_ReferralName')}
            </Form.Label>
            <Form.Control
              {...register('referralName.username')}
              className={`${styles.referralText} rounded`}
              placeholder={t('Form_Generic_Placeholders_EnterReferralName')}
              type="text"
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default GiftCertificateReferral;
