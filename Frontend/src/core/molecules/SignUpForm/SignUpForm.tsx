import { Col, Spinner, Button } from 'react-bootstrap';
import { useSubscriptionMutation } from 'src/data/subscriptionUpdate';
import { EMAIL_VALIDATION_NEWSLETTER } from 'constants/validation-patterns';
import { useI18n } from 'next-localization';
import styles from './SignUpForm.module.scss';
import { FormComponent } from 'core/atoms/Forms/Form';
import { object as yupObject, string as yupString } from 'yup';
import TextInput from 'core/atoms/Forms/TextInput';
import { useRouter } from 'next/router';
import { SignUpFormProps } from './SignUpForm.type';

const signUpFormSchema = (invalidString: string) => {
  return yupObject().shape({
    email: yupString().matches(EMAIL_VALIDATION_NEWSLETTER, invalidString),
  });
};

const SignUpForm = (props: SignUpFormProps): JSX.Element => {
  const router = useRouter();
  const { SuccessCallback, ApiEndpoint } = props?.fields || {};
  const { mutate: updateSubscription, isLoading: updating } = useSubscriptionMutation(
    SuccessCallback?.value?.href as string
  );

  const handleSubmit = (formData: SignUpUserInput) => {
    const { email } = formData || {};
    const apiUrl = ApiEndpoint?.fields?.Value?.value.replace(
      '{emailId}',
      email as string
    ) as string;
    email === '' ? router.reload() : updateSubscription({ url: apiUrl, email: email as string });
  };

  const { t } = useI18n();

  return (
    <Col lg={{ order: 4 }} className="mb-5 mb-lg-0">
      <div className={styles.media}>
        <>
          <FormComponent<SignUpUserInput>
            onSubmit={handleSubmit}
            validationSchema={signUpFormSchema(t('Newsletter_InvalidEmail'))}
          >
            {({ register, formState: { errors } }) => (
              <div className="d-flex align-items-start">
                <TextInput
                  {...register('email')}
                  error={errors?.email?.message}
                  type="email"
                  className="w-75"
                  placeholder={t('Form_Generic_Placeholders_EnterEmail')}
                />
                <Button
                  type="submit"
                  disabled={updating}
                  className={`input-group-text btn btn-danger w-25 ${styles.media_signUpButton}`}
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
                  {t('Newsletter_SignUpLabel')}
                </Button>
              </div>
            )}
          </FormComponent>

          <span className={styles.signUpText}>{t('Newsletter_DisclaimerMessage')}</span>
        </>
      </div>
    </Col>
  );
};

export default SignUpForm;
