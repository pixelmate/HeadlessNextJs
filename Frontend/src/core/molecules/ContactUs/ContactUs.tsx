import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useI18n } from 'next-localization';
import { NON_EMPTY_CHARACTER, EMAIL_VALIDATION } from 'constants/validation-patterns';
import { useContactUsMutation } from 'src/data/contactUs.mutation';
import { ContactUsProps, FormValues } from './ContactUs.type';
import styles from './ContactUs.module.scss';
import Image from 'core/atoms/Image';

const ContactUs = (props: ContactUsProps): JSX.Element => {
  const { FeaturedContentFooter, FeaturedContentHeader } = props?.fields || {};

  const { mutate: updateSubscription } = useContactUsMutation();

  const onSubmit: SubmitHandler<FormValues> = (formData: FormValues) => {
    updateSubscription(formData);
    reset();
  };

  /* Form */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const { t } = useI18n();

  return (
    <div className="position-relative">
      <div className={styles.image_container}>
        <Image
          className={`img-fluid ${styles.background}`}
          field={props?.fields?.BackgroundImage}
          priority
        />
      </div>

      <Container fluid className={`${styles.contactUs} justify-content-center`}>
        <div>
          <RichText className={styles.contactUs_heading} field={FeaturedContentHeader} />
          <Row className="justify-content-center mx-0">
            <Col lg={6} md={8} sm={12}>
              <div className={`${styles.contactUs_contactUsFormWrapper} mx-2`}>
                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder={t('Form_Generic_Placeholders_EnterEmailAddress')}
                      {...register('email', {
                        required: t('ContactUs_EmailRequired'),
                        pattern: {
                          value: EMAIL_VALIDATION,
                          message: t('ContactUs_InvalidEmail'),
                        },
                      })}
                    />
                    {errors.email?.message && (
                      <p className={styles.contactUs_errors}>{errors.email?.message}</p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Row>
                      <Col md={8}>
                        <Form.Label htmlFor="emailAutoShipRelated">
                          {t('ContactUs_RadioButtonLabel')}
                        </Form.Label>
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          inline
                          label={t('ContactUs_RadioButton_Yes')}
                          name="emailAutoShipRelated"
                          type="radio"
                          id="yes"
                          defaultChecked
                        />
                        <Form.Check
                          inline
                          label={t('ContactUs_RadioButton_No')}
                          name="emailAutoShipRelated"
                          type="radio"
                          id="no"
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder={t('ContactUs_DetailedMessage')}
                      {...register('message', {
                        required: t('ContactUs_DetailedMessage_Required'),
                        pattern: {
                          value: NON_EMPTY_CHARACTER,
                          message: t('ContactUs_DetailedMessage_Required'),
                        },
                      })}
                    />
                    {errors.message?.message && (
                      <p className={styles.contactUs_errors}>{errors.message?.message}</p>
                    )}
                  </Form.Group>
                  <div className="d-flex justify-content-end">
                    <Button
                      type="submit"
                      className={`input-group-text btn btn-warning px-5 h8 ${styles.contactUs_submitBtn}`}
                    >
                      {t('ContactUs_SubmitLabel')}
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
          <div
            dangerouslySetInnerHTML={{ __html: t('ContactUs_DisclaimerMessage') }}
            className={styles.contactUs_recaptchaInfo}
          />
          <RichText
            className={`${styles.contactUs_customerService} h6`}
            field={FeaturedContentFooter}
          />
        </div>
      </Container>
    </div>
  );
};

export default ContactUs;
