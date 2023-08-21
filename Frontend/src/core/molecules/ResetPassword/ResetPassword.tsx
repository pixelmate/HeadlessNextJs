import { ResetPasswordSchemas, ResetPasswordProps } from './ResetPassword.type';
import styles from './ResetPassword.module.scss';
import * as yup from 'yup';
import { FormComponent } from 'core/atoms/Forms/Form';
import { Button, Col, Row } from 'react-bootstrap';
import { useI18n } from 'next-localization';
import { PASSWORD_VALIDATION_ORDER_CLOUD } from 'constants/validation-patterns';
import { useUserByParamManually } from 'hooks/useUserBy/useUserBy';
import { useEffect, useState } from 'react';
import { useResetPassword } from 'hooks/useResetPassword/useResetPassword';
import { FieldErrors } from 'react-hook-form';
import ErrorList from 'core/atoms/ErrorList/ErrorList';

const resetPasswordSchemas = yup.object().shape({
  password: yup
    .string()
    .required('ResetPassword_ErrorRequired')
    .matches(PASSWORD_VALIDATION_ORDER_CLOUD, 'ResetPassword_ErrorPasswordCriteria'),
  confirmedPassword: yup
    .string()
    .required('ResetPassword_ErrorRequired')
    .matches(PASSWORD_VALIDATION_ORDER_CLOUD, 'ResetPassword_ErrorPasswordCriteria')
    .oneOf([yup.ref('password')], 'ResetPassword_ErrorPasswordMismatch'),
});

const ResetPassword = (props: ResetPasswordProps): JSX.Element => {
  const { RedirectOnSuccessUrl } = props?.fields;

  const { t } = useI18n();
  const [welcomeMessage, setWelcomeMessage] = useState(
    t('ResetPassword_FormTitle', {
      Username: undefined,
    })
  );

  const { resetPassword, verificationCode, username } = useResetPassword(
    RedirectOnSuccessUrl.value.href
  );

  const { mutate: getUser, isLoading } = useUserByParamManually({
    onSuccess: (data: UserInfo | undefined) => {
      if (data) {
        setWelcomeMessage(
          t('ResetPassword_FormTitle', {
            Username: `${data.FirstName || ''} ${data.LastName || ''}`,
          })
        );
      }
    },
  });

  const handleSubmit = (input: ResetPasswordSchemas) => {
    resetPassword({
      password: input.password,
      username: username,
      verificationCode: verificationCode,
    });
  };

  useEffect(() => {
    if (username) {
      getUser({ search: username, param: 'Username' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const getErrorsMessages = (errors: FieldErrors<ResetPasswordSchemas>) => {
    const errorsMessages: string[] = [];
    const properties = Object.values(errors);
    properties?.forEach((element) => {
      if (element?.message) {
        errorsMessages.push(t(element.message));
      }
    });
    return errorsMessages;
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column pt-4">
      {!isLoading && (
        <p
          className={styles.resetPasswordText}
          dangerouslySetInnerHTML={{ __html: welcomeMessage }}
        ></p>
      )}
      <FormComponent<ResetPasswordSchemas>
        onSubmit={handleSubmit}
        validationSchema={resetPasswordSchemas}
        className="w-100"
      >
        {({ register, formState: { errors } }) => (
          <>
            <ErrorList
              errors={getErrorsMessages(errors)}
              className={`container mb-3 ${styles.errorList}`}
            ></ErrorList>
            <Row className={styles.formFieldWrapper}>
              <Col className={styles.labelWrapper}>
                <label>{t('ResetPassword_PasswordInputTitle')}</label>
              </Col>
              <Col>
                <input
                  type="password"
                  className={`rounded mb-3 bg-white w-100 rounded-1 form-control ${styles.resetPasswordText}`}
                  {...register('password')}
                />
              </Col>
              <Col>
                <div>
                  {errors?.password?.message && (
                    <p className={`${styles.errors} m-0 mb-2 ${styles.resetPasswordText}`}>
                      {t(errors?.password?.message || '')}
                    </p>
                  )}
                </div>
              </Col>
            </Row>
            <Row className={styles.formFieldWrapper}>
              <Col className={styles.labelWrapper}>
                <label>{t('ResetPassword_ConfirmPasswordInputTitle')}</label>
              </Col>
              <Col>
                <input
                  type="password"
                  className={`rounded mb-3 bg-white w-100 rounded-1 form-control ${styles.resetPasswordText}`}
                  {...register('confirmedPassword')}
                />
              </Col>
              <Col>
                <div>
                  {errors?.confirmedPassword?.message && (
                    <p className={`${styles.errors} m-0 ${styles.resetPasswordText}`}>
                      {t(errors?.confirmedPassword?.message || '')}
                    </p>
                  )}
                </div>
              </Col>
            </Row>
            <div className="d-flex justify-content-center align-items-center">
              <Button variant="success" type="submit">
                {t('ResetPassword_SubmitButtonTitle')}
              </Button>
            </div>
          </>
        )}
      </FormComponent>
    </div>
  );
};

export default ResetPassword;
