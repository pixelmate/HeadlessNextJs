import { Button } from 'react-bootstrap';
import { useIdleTimer } from 'react-idle-timer';
import * as yup from 'yup';
import { useI18n } from 'next-localization';
import TextInput from 'core/atoms/Forms/TextInput';
import styles from './Login.module.scss';
import { FormComponent } from 'core/atoms/Forms/Form';
import { useAuthorization } from 'data/user';
import router from 'next/router';
import { LoginProps } from './login.type';
import { ROUTES } from 'utils/routes';
import { IDLE_THROTTLE, IDLE_TIMEOUT } from 'constants/settings';
import { Link, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { getValuesFromQueryString } from 'utils/getValuesFromQueryString';
import { CALLBACK_URL, REFERRER_URL } from 'constants/query-config';
import { useEffect } from 'react';
import { authorizationAtom } from 'data/atoms/authorization-atom';
import { useAtom } from 'jotai';
import classNames from 'classnames';
import { createSpinner, spinnerAtom } from 'data/atoms/spinner';
import Placeholders from 'core/atoms/Placeholders/Placeholder';

const loginFormSchema = (emailValidationMessage: string, passwordValidationMessage: string) => {
  return yup.object().shape({
    username: yup.string().required(emailValidationMessage),
    password: yup
      .string()
      .required(passwordValidationMessage)
      .min(6, passwordValidationMessage)
      .max(15, passwordValidationMessage),
  });
};

const Login = (props: LoginProps): JSX.Element => {
  const { ForgetUserameorPasswordLink, PostLoginUrl, Title } = props?.fields || {};
  const [{ isAuthenticated }] = useAtom(authorizationAtom);
  const { t } = useI18n();
  const onIdle = () => {
    router.push(ROUTES.HOME);
  };
  const [, setSpinner] = useAtom(spinnerAtom);
  useIdleTimer({
    onIdle,
    timeout: IDLE_TIMEOUT,
    throttle: IDLE_THROTTLE,
  });

  const { CTAAlignment } = props?.params || {};
  const queryUrl = getValuesFromQueryString(CALLBACK_URL);
  const referrerQueryUrl = getValuesFromQueryString(REFERRER_URL);
  let navigateTo = '';
  if (queryUrl !== '') {
    navigateTo = queryUrl;
  } else if (referrerQueryUrl !== '') {
    navigateTo = referrerQueryUrl;
  } else {
    navigateTo = PostLoginUrl?.value?.href as string;
  }

  const { mutate: signIn, serverError, removeRefreshToken } = useAuthorization(navigateTo);

  function handleSubmit({ username, password, remember }: SignInUserInput) {
    signIn({
      username,
      password,
      remember,
    });
  }

  useEffect(() => {
    if (isAuthenticated) {
      setSpinner(createSpinner(t('Common_Loading')));
      router.replace(navigateTo);
      removeRefreshToken();
    }
    return () => {
      setSpinner(null);
    };
  }, []);

  if (isAuthenticated) {
    return <Placeholders />;
  }

  return (
    <div className="px-2">
      {Title?.value && (
        <p>
          <Text field={Title} />
        </p>
      )}
      <FormComponent<SignInUserInput>
        onSubmit={handleSubmit}
        validationSchema={loginFormSchema(
          t('Authentication_Login_UserNameRequired'),
          t('Form_Generic_ValidationMessages_PasswordLength')
        )}
      >
        {({ register, formState: { errors } }) => (
          <>
            <div>
              <TextInput
                label={t('Form_Generic_Tag_UserName')}
                {...register('username')}
                error={errors?.username?.message}
                type="text"
              />
              <TextInput
                label={t('Form_Generic_Tag_Password')}
                {...register('password')}
                type="password"
                error={errors.password?.message}
              />
              <div
                className={classNames(
                  {
                    ['text-end']: CTAAlignment === 'right',
                  },
                  {
                    ['text-center']: CTAAlignment === 'center',
                  }
                )}
              >
                <div className="mt-4 mb-3">
                  <Button type="submit" className="rounded-1 lh-1 fs-6" variant="success">
                    {PostLoginUrl?.value?.text}
                  </Button>
                </div>
                {serverError && serverError === 'Auth.InvalidUsernameOrPassword' && (
                  <div className="mb-4">{t('Authentication_Login_BothIncorrect')}</div>
                )}
                <div>
                  <Link field={ForgetUserameorPasswordLink} className={styles.formlink}>
                    {t('Authentication_Login_ForgotUserNameorPasswordLabel')}
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </FormComponent>
    </div>
  );
};

export default Login;
