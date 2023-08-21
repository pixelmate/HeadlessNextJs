import { Col, Spinner, Button, Container, Row } from 'react-bootstrap';
import { useSubscriptionMutation } from 'src/data/subscriptionUpdate';
import { EMAIL_VALIDATION_NEWSLETTER } from 'constants/validation-patterns';
import { useI18n } from 'next-localization';
import styles from './NewsletterSubscription.module.scss';
import { FormComponent } from 'core/atoms/Forms/Form';
import { object as yupObject, string as yupString } from 'yup';
import TextInput from 'core/atoms/Forms/TextInput';
import { useRouter } from 'next/router';
import { SignUpFormProps } from './NewsletterSubscription.type';
import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const signUpFormSchema = (invalidString: string) => {
  return yupObject().shape({
    email: yupString().required('Required').matches(EMAIL_VALIDATION_NEWSLETTER, invalidString),
  });
};

const NewsletterSubscription = (props: SignUpFormProps): JSX.Element => {
  const { SuccessCallback, ApiEndpoint } = props?.fields || {};
  const { mutate: updateSubscription, isLoading: updating } = useSubscriptionMutation(
    SuccessCallback?.value?.href as string
  );
  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleSubmit = (formData: SignUpUserInput) => {
    console.log(executeRecaptcha, 'executeRecaptcha');
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }
    executeRecaptcha('enquiryFormSubmit').then((gReCaptchaToken) => {
      console.log(gReCaptchaToken, 'response Google reCaptcha server');
      // submitEnquiryForm(gReCaptchaToken);
    });
    const { email } = formData || {};
    const apiUrl = ApiEndpoint?.fields?.Value?.value.replace(
      '{emailId}',
      email as string
    ) as string;
    updateSubscription({ url: apiUrl, email: email as string });
  };
  // const [notification, setNotification] = useState('');
  // const submitEnquiryForm = (gReCaptchaToken) => {
  //   fetch('/api/enquiry', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json, text/plain, */*',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name: name,
  //       email: email,
  //       message: message,
  //       gRecaptchaToken: gReCaptchaToken,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res, 'response from backend');
  //       if (res?.status === 'success') {
  //         setNotification(res?.message);
  //       } else {
  //         setNotification(res?.message);
  //       }
  //     });
  // };
  const { t } = useI18n();
  const { RecaptchaDisclaimerMessage } = props?.fields || {};
  return (
    <>
      <Container>
        <div className={styles.formContainer}>
          <Row
            lg={12}
            className={`${styles.formContainer_content} justify-content-between w-100 m-auto`}
          >
            <FormComponent<SignUpUserInput>
              onSubmit={handleSubmit}
              validationSchema={signUpFormSchema(t('Newsletter_InvalidEmail'))}
            >
              {({ register, formState: { errors } }) => (
                <>
                  <Col lg={11} className="p-0">
                    <div className="d-flex align-items-start">
                      <TextInput
                        {...register('email')}
                        error={errors?.email?.message}
                        type="email"
                        className={`${styles.input} w-100`}
                        placeholder={t('Form_Generic_Placeholders_EnterEmail')}
                      />
                    </div>
                  </Col>
                  <Col lg={'auto'} className="p-0 text-center">
                    <Button
                      type="submit"
                      disabled={updating}
                      className={`input-group-text btn btn-light text-center ${styles.media_signUpButton}`}
                    >
                      {updating && (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          <span className="visually-hidden">{t('Loading')}</span>
                        </>
                      )}
                      {/* {t('Newsletter_SubmitButton')} */}
                      Submit
                    </Button>
                  </Col>
                </>
              )}
            </FormComponent>
          </Row>
          <div className="text-center">
            <RichText className={styles.RecaptaText} field={RecaptchaDisclaimerMessage} />
          </div>
          <strong className={`${styles.disclaimerText} align-items-center`}>
            {t('Newsletter_DisclaimerMessage')}
          </strong>
        </div>
      </Container>
    </>
  );
};

export default NewsletterSubscription;
