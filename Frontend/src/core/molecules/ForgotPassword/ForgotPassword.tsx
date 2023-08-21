import { Button } from 'react-bootstrap';
import Panel from 'core/atoms/Panel/Panel';
import classNames from 'classnames';
import { ForgotPasswordProps, ForgotPasswordSchemas } from './ForgotPassword.type';
import styles from './ForgotPassword.module.scss';
import * as yup from 'yup';
import { FormComponent } from 'core/atoms/Forms/Form';
import TextInput from 'core/atoms/Forms/TextInput';
import { useResetForgottenPassword } from 'hooks/useResetForgottenPassword/useResetForgottenPassword';
import { useState } from 'react';
import { useI18n } from 'next-localization';
import { useRouter } from 'next/router';
import { DEFAULT_IS_FULLWIDTH, IS_FULLWIDTH } from 'constants/alignment';
import { DIGIT_REGEX } from 'constants/validation-patterns';
import { useUserByParamManually } from 'hooks/useUserBy/useUserBy';

const forgotPasswordSchemas = yup.object().shape({
  username: yup.string().required('ForgotPassword_ErrorRequired'),
});

const ForgotPassword = (props: ForgotPasswordProps): JSX.Element => {
  const { params } = props || {};
  const { RedirectOnSuccessUrl, PasswordResetUrl } = props?.fields || {};
  const IsFullWidth = params?.IsFullWidth || DEFAULT_IS_FULLWIDTH;

  const router = useRouter();
  const { t } = useI18n();
  const [isUserNotFound, setIsUserNotFound] = useState(false);
  const [username, setUsername] = useState<string | undefined>(undefined);

  const { mutate: getUser } = useUserByParamManually({
    onSuccess: (data: UserInfo | undefined) => {
      setIsUserNotFound(!data);
      if (data) {
        resetPassword({
          email: data.Email,
          username: data.Username,
          url: PasswordResetUrl.value.href,
        });
      }
    },
    onError: () => {
      setIsUserNotFound(true);
    },
  });

  const { mutate: resetPassword } = useResetForgottenPassword({
    onSuccess: () => {
      if (!!RedirectOnSuccessUrl?.value?.href) {
        router.push(RedirectOnSuccessUrl?.value?.href);
      }
    },
  });

  const handleSubmit = (input: ForgotPasswordSchemas) => {
    setUsername(input?.username);
    getUser({ search: input?.username, param: 'Username' });
  };

  const getMessageUserNotFound = () => {
    if (username && DIGIT_REGEX.test(username)) {
      const tmpMessage = t('ForgotPassword_ErrorAccountNotFound', { InvaidAccount: username });
      const message = tmpMessage.replace(username, `<span class="fw-bold">${username}</span>`);

      return (
        <p
          className={`${styles.error} ${styles.forgotPasswordText}`}
          dangerouslySetInnerHTML={{ __html: message }}
        ></p>
      );
    }

    return (
      <p className={`${styles.error} ${styles.forgotPasswordText}`}>
        {t('ForgotPassword_ErrorUserNotFound')}
      </p>
    );
  };

  return (
    <div
      className={classNames('d-flex flex-column', {
        'container p-0': IsFullWidth !== IS_FULLWIDTH,
      })}
    >
      <Panel panelTitle={t('ForgotPassword_FormTitle')}>
        <p className={styles.forgotPasswordText}>{t('ForgotPassword_FormDescription')}</p>
        <FormComponent<ForgotPasswordSchemas>
          onSubmit={handleSubmit}
          validationSchema={forgotPasswordSchemas}
        >
          {({ register, formState: { errors } }) => (
            <>
              <TextInput
                label={t('Form_Generic_Tag_UserName')}
                {...register('username')}
                className={`rounded ${styles.forgotPasswordText}`}
                labelClassName={`text-nowrap ${styles.forgotPasswordText}`}
                error={t(errors?.username?.message || '')}
                errorClassName={`m-0 ${styles.forgotPasswordText}`}
                type="text"
              />
              <Button variant="success" type="submit" className="mt-4">
                {t('ForgotPassword_SubmitButtonTitle')}
              </Button>
              {isUserNotFound && getMessageUserNotFound()}
            </>
          )}
        </FormComponent>
      </Panel>
    </div>
  );
};

export default ForgotPassword;
