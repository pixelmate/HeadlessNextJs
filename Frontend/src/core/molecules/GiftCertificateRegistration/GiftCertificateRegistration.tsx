import { RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import Heading from 'core/atoms/Heading';
import TooltipContent from 'core/atoms/TooltipContent';
import { FormValidationContext } from 'core/molecules/GenericForm/FormContext';
import { authorizationAtom } from 'data/atoms/authorization-atom';
import { genericFormDynamicValue } from 'data/atoms/genericForm';
import { GiftCertificate } from 'data/atoms/localStorage/giftCertificateInformation';
import useLocalStorage from 'hooks/useLocalStorage';
import { usePasswordStrength } from 'hooks/usePasswordStrength/usePasswordStrength';
import { useTranslate } from 'hooks/useTranslate';
import { useAtom } from 'jotai';
import { ChangeEvent, useContext, useEffect } from 'react';
import { Col, Container, Form, ProgressBar, Row } from 'react-bootstrap';
import { FieldErrors, useFormContext } from 'react-hook-form';
import { newUserRegistrationSchema } from 'src/schemas/formSchemas/NewUserRegistrationSchema';
import styles from './GiftCertificateRegistration.module.scss';
import { GiftCertificateRegistrationProps } from './giftCertificateRegistration.type';

const GiftCertificateRegistration = (props: GiftCertificateRegistrationProps): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [{ isAuthenticated }] = useAtom(authorizationAtom);
  const { addValidationSchema } = useContext(FormValidationContext);
  const { t } = useTranslate();
  const passwordStrength = usePasswordStrength();
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    passwordStrength.checkPasswordStrength(event.target.value || '');
    register('password')?.onChange(event);
  }

  const [localStorageGiftCertificate] = useLocalStorage<GiftCertificate>(
    'GIFT_CERTIFICATE_INFORMATION'
  );
  const [, setDynamicValue] = useAtom(genericFormDynamicValue);
  localStorageGiftCertificate?.amount &&
    setDynamicValue(localStorageGiftCertificate?.amount?.toString());

  useEffect(() => {
    addValidationSchema(newUserRegistrationSchema);
  }, []);

  const alertClasses = classNames(`${styles.formItem} ${styles.alert}`);
  const formItemRowClasses = classNames('align-items-center pb-3');
  if (isAuthenticated) return <></>;
  return (
    <Container className="p-0">
      {props?.fields?.Title?.value && (
        <Heading level={4} text={props?.fields?.Title} className="text-center" />
      )}
      {props?.fields?.Description?.value && (
        <RichText field={props?.fields?.Description} className="py-2" />
      )}
      {props?.fields?.SubTitle?.value && <Text field={props?.fields?.SubTitle} />}

      <Form.Group className="my-3" controlId="registrationForm">
        <Row>
          <Col xl={6}>
            <Row className={formItemRowClasses}>
              <Col xs={3} className={styles.formItemLabel}>
                <Form.Label className="text-nowrap">
                  <span className="text-danger pe-1">*</span>
                  {t('GiftCertificateRegistration_UserName')}
                </Form.Label>
              </Col>
              <Col xs={8} className={styles.formItem}>
                <Form.Control
                  {...register('registration.username')}
                  placeholder={t('GiftCertificateRegistration_UserName_Watermark')}
                  type="text"
                  className="w-100"
                  maxLength={50}
                />
              </Col>
              <Col xs={1} className={alertClasses}>
                {(errors?.registration as FieldErrors)?.username && (
                  <TooltipContent
                    message={(errors?.registration as FieldErrors)?.username?.message as string}
                  ></TooltipContent>
                )}
              </Col>
            </Row>
            <Row className="align-items-baseline">
              <Col xs={3} className={styles.formItemLabel}>
                <Form.Label className="text-nowrap">
                  <span className="text-danger pe-1">*</span>
                  {t('GiftCertificateRegistration_Password')}
                </Form.Label>
              </Col>
              <Col xs={8} className={styles.formItem}>
                <Form.Control
                  {...register('registration.password')}
                  type="password"
                  onChange={handleChange}
                  placeholder={t('GiftCertificateRegistration_Password_Watermark')}
                />
              </Col>
              <Col xs={1} className={alertClasses}>
                {(errors?.registration as FieldErrors)?.password && (
                  <TooltipContent
                    message={(errors?.registration as FieldErrors)?.password?.message as string}
                  ></TooltipContent>
                )}
              </Col>
            </Row>
            <Row>
              <Col xs={8} className={`mb-3 mt-2 ms-auto ${styles.formItem}`}>
                <ProgressBar
                  now={passwordStrength?.indicatorLength}
                  label={t(passwordStrength?.message)}
                  variant={passwordStrength?.color}
                />
              </Col>
              <Col xs={1}></Col>
            </Row>
            <Row className={formItemRowClasses}>
              <Col xs={3} className={styles.formItemLabel}>
                <Form.Label className="text-nowrap">
                  <span className="text-danger pe-1">*</span>
                  {t('GiftCertificate_ConfirmPassword')}
                </Form.Label>
              </Col>
              <Col xs={8} className={styles.formItem}>
                <Form.Control
                  {...register('registration.confirmPassword')}
                  type="password"
                  placeholder={t('GiftCertificate_ConfirmPassword_Watermark')}
                />
              </Col>
              <Col xs={1} className={alertClasses}>
                {(errors?.registration as FieldErrors)?.confirmPassword && (
                  <TooltipContent
                    message={
                      (errors?.registration as FieldErrors)?.confirmPassword?.message as string
                    }
                  ></TooltipContent>
                )}
              </Col>
            </Row>
          </Col>
          <Col xl={6}>
            <Row className={formItemRowClasses}>
              <Col xs={3} className={styles.formItemLabel}>
                <Form.Label className="text-nowrap">
                  <span className="text-danger pe-1">*</span>
                  {t('GiftCertificateRegistration_Email')}
                </Form.Label>
              </Col>
              <Col xs={8} className={styles.formItem}>
                <Form.Control
                  {...register('registration.email')}
                  type="text"
                  placeholder={t('GiftCertificateRegistration_Email_Watermark')}
                />
              </Col>
              <Col xs={1} className={alertClasses}>
                {(errors?.registration as FieldErrors)?.email && (
                  <TooltipContent
                    message={(errors?.registration as FieldErrors)?.email?.message as string}
                  ></TooltipContent>
                )}
              </Col>
            </Row>

            <Row className={formItemRowClasses}>
              <Col xs={3} className={styles.formItemLabel}>
                <Form.Label className="text-nowrap">
                  <span className="text-danger pe-1">*</span>
                  {t('GiftCertificateRegistration_Phone')}
                </Form.Label>
              </Col>
              <Col xs={6} className={styles.formItemPhone}>
                <Form.Control {...register('registration.phone')} type="number" />
              </Col>
              <Col xs={2} className={`ps-0 ${styles.formItemPhoneExt}`}>
                <Form.Control
                  {...register('registration.phoneExt')}
                  placeholder={t('GiftCertificateRegistration_ExtWatermark')}
                  type="number"
                />
              </Col>
              <Col xs={1} className={alertClasses}>
                {(errors?.registration as FieldErrors)?.phone && (
                  <TooltipContent
                    message={(errors?.registration as FieldErrors)?.phone?.message as string}
                  ></TooltipContent>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Form.Group>
    </Container>
  );
};

export default GiftCertificateRegistration;
