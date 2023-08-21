import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { USERNAME_PATTERN } from 'constants/validation-patterns';
import { FormComponent } from 'core/atoms/Forms/Form';
import TextInput from 'core/atoms/Forms/TextInput';
import { WarningIcon } from 'core/atoms/Icons';
import Panel from 'core/atoms/Panel/Panel';
import Placeholders from 'core/atoms/Placeholders/Placeholder';
import { useRefreshToken, useUpdateUser, useUser } from 'data/user';
import { useTranslate } from 'hooks/useTranslate';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import * as yup from 'yup';
import styles from './ChangeUsername.module.scss';

const changeUsernameFormSchema = yup.object().shape({
  username: yup
    .string()
    .required('Account_ChangeUsername_UsernameRequired')
    .min(6, 'Form_Generic_ValidationMessages_UsernameLength')
    .max(50, 'Form_Generic_ValidationMessages_UsernameLength')
    .matches(USERNAME_PATTERN, 'Form_Generic_ValidationMessages_InvalidUsername'),
});

const ChangeUsername = (): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageEditing;
  const router = useRouter();
  const { t } = useTranslate();
  const [userExistsError, setUserExistsError] = useState(false);
  const {
    mutate: updateUser,
    isLoading: updateUserLoading,
    serverError,
    isSuccess,
    isError,
  } = useUpdateUser();
  const { mutate: updateAccessToken, isLoading: userTokenLoading } = useRefreshToken();
  const { user, isAuthenticated, refreshToken } = useUser();

  const handleSubmit = (input: ChangeUsernameUserInput) => {
    if (input.username === user?.username) {
      setUserExistsError(true);
      return;
    }
    setUserExistsError(false);
    updateUser(input);
  };

  useEffect(() => {
    if (isSuccess) {
      updateAccessToken({ refreshToken: refreshToken as string });
    }
  }, [refreshToken, isSuccess]);

  const isUsernameError = useMemo(() => serverError === 'User.UsernameMustBeUnique', [serverError]);
  if (!isAuthenticated && !isEditing) {
    return <Placeholders />;
  }
  return (
    <Container fluid className={styles.changeUsername}>
      <Row className="pt-4">
        <Col className="mx-auto">
          <Panel panelTitle={t('Account_ChangeUsername_Title')}>
            <FormComponent<ChangeUsernameUserInput>
              onSubmit={handleSubmit}
              className="position-relative"
              validationSchema={changeUsernameFormSchema}
            >
              {({ register, formState: { errors } }) => (
                <>
                  {(updateUserLoading || userTokenLoading) && (
                    <div className={styles.changeUsername_spinner}>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <div>
                    <p className={styles.changeUsername_description}>
                      {t('Account_ChangeUsername_CurrentUsername')}
                      <strong> {user?.username as string}</strong>
                    </p>
                    <div className="position-relative">
                      <TextInput
                        label={t('Account_ChangeUsername_NewUsername')}
                        placeholder={t('Form_Generic_Placeholders_EnterNewUserName')}
                        {...register('username')}
                        error={t(errors?.username?.message)}
                        type="text"
                      />
                      {isError && (
                        <p className={styles.changeUsername_warningIcon}>
                          <OverlayTrigger
                            delay={{ hide: 250, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>
                                {t(
                                  isUsernameError
                                    ? 'Form_Generic_ValidationMessages_UsernameUnique'
                                    : 'Form_Generic_ValidationMessages_UsernameUnique'
                                )}
                              </Tooltip>
                            )}
                            placement="top"
                          >
                            <span>
                              <WarningIcon />
                            </span>
                          </OverlayTrigger>
                        </p>
                      )}
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        type="button"
                        className={`input-group-text formbutton cancel`}
                        onClick={() => {
                          router.push('/');
                        }}
                      >
                        {t('Account_ChangeUserName_CancelButton')}
                      </Button>
                      <Button
                        type="submit"
                        className="rounded-1 lh-1 fs-6"
                        variant="success"
                        disabled={updateUserLoading || userTokenLoading}
                      >
                        {t('Account_ChangeUserName_SaveButton')}
                      </Button>
                    </div>
                    <div className="text-danger my-3">
                      {isError &&
                        t(
                          isUsernameError
                            ? 'Form_Generic_ValidationMessages_UsernameUnique'
                            : 'Account_ChangeUsername_InternalServerError'
                        )}
                      {userExistsError && (
                        <p>{t('Form_Generic_ValidationMessages_UsernameUnique')}</p>
                      )}
                      {!userExistsError && isSuccess && (
                        <p>{t('Account_ChangeUsername_SuccessMessage')}</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </FormComponent>
          </Panel>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangeUsername;
