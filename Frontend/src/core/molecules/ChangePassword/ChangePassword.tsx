import { Col, Button, Container, Row, Spinner, ProgressBar } from 'react-bootstrap';
import { object as yupObject, string as yupString, ref as yupRef } from 'yup';
import { useUpdateUserPassword } from 'data/user';
import { FormComponent } from 'core/atoms/Forms/Form';
import TextInput from 'core/atoms/Forms/TextInput';
import { useTranslate } from 'hooks/useTranslate';
import Panel from 'core/atoms/Panel/Panel';
import { PASSWORD_VALIDATION } from 'constants/validation-patterns';
import { ChangePasswordProps } from './changePassword.type';
import styles from './ChangePassword.module.scss';
import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import { ChangeEvent } from 'react';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from 'constants/password';
import { usePasswordStrength } from 'hooks/usePasswordStrength/usePasswordStrength';

const changePasswordFormSchema = yupObject().shape({
  oldPassword: yupString()
    .required('ChangePassword_ErrorRequired')
    .matches(PASSWORD_VALIDATION, 'ChangePassword_ErrorNewPasswordCriteria'),
  password: yupString()
    .required('ChangePassword_ErrorRequired')
    .matches(PASSWORD_VALIDATION, 'ChangePassword_ErrorNewPasswordCriteria'),
  confirmNewPassword: yupString()
    .required('ChangePassword_ErrorRequired')
    .matches(PASSWORD_VALIDATION, 'ChangePassword_ErrorNewPasswordCriteria')
    .oneOf([yupRef('password')], 'ChangePassword_ErrorNewPasswordMismatch'), //To be added in Dict
});

const ChangePassword = (props: ChangePasswordProps): JSX.Element => {
  const { t } = useTranslate();
  const { CancelLink, RedirectOnSuccessUrl } = props?.fields || {};
  const passwordStrength = usePasswordStrength();

  const {
    mutate: updatePassword,
    isLoading,
    serverError,
  } = useUpdateUserPassword(RedirectOnSuccessUrl?.value?.href);

  function handleSubmit(input: UpdateUserPasswordInput) {
    updatePassword(input);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    passwordStrength.checkPasswordStrength(event.target.value || '');
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={5}>
          <h1 className={styles.changePassword_heading}>{t('ChangePassword_FormTitle')}</h1>
          <Panel panelTitle={t('ChangePassword_FormTitle')}>
            <FormComponent<UpdateUserPasswordInput>
              onSubmit={handleSubmit}
              validationSchema={changePasswordFormSchema}
              className="position-relative"
              serverError={serverError ? { oldPassword: serverError } : undefined}
            >
              {({ register, formState: { errors } }) => (
                <>
                  {isLoading && (
                    <div className={styles.changePassword_spinner}>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <>
                    <TextInput
                      label={t('Form_Generic_Tag_EnterOldPassword')}
                      {...register('oldPassword')}
                      type="password"
                      error={t(errors?.oldPassword?.message)}
                    />
                    <TextInput
                      label={t('Form_Generic_Tag_EnterNewPassword')}
                      {...register('password')}
                      type="password"
                      error={t(errors?.password?.message)}
                      onChange={handleChange}
                      minLength={PASSWORD_MIN_LENGTH}
                      maxLength={PASSWORD_MAX_LENGTH}
                      className=""
                    />
                    <ProgressBar
                      now={passwordStrength.indicatorLength}
                      label={t(passwordStrength.message)}
                      variant={passwordStrength.color}
                      className="mb-3 mt-2"
                    />
                    <TextInput
                      label={t('Form_Generic_Tag_ReTypeNewPassword')}
                      {...register('confirmNewPassword')}
                      type="password"
                      error={t(errors?.confirmNewPassword?.message)}
                      minLength={PASSWORD_MIN_LENGTH}
                      maxLength={PASSWORD_MAX_LENGTH}
                    />
                    <div className={`my-5 ${styles.changePassword_CTAwrapper}`}>
                      <Link
                        field={CancelLink}
                        className={`text-decoration-none input-group-text formbutton cancel`}
                      >
                        {t('ChangePassword_CancelButtonTitle')}
                      </Link>
                      <Button type="submit" className="rounded-1 lh-1 fs-6" variant="success">
                        {t('ChangePassword_SaveButtonTitle')}
                      </Button>
                    </div>
                  </>
                </>
              )}
            </FormComponent>
          </Panel>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
