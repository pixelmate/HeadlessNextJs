import { EMAIL_VALIDATION } from 'constants/validation-patterns';
import { FormComponent } from 'core/atoms/Forms/Form';
import TextInput from 'core/atoms/Forms/TextInput';
import Panel from 'core/atoms/Panel';
import { useForgottenUsername } from 'data/forgottenUsername';
import { useTranslate } from 'hooks/useTranslate';
import { useUserByParamManually } from 'hooks/useUserBy/useUserBy';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import getFullWidth from 'utils/getFullWidth';
import * as yup from 'yup';
import styles from './ForgotUsername.module.scss';
import { ForgotUsernameProps, ForgotUsernameSchemas } from './ForgotUsername.type';

const forgotUsernameSchemas = yup.object().shape({
  email: yup
    .string()
    .required('ForgotUsername_ErrorRequired')
    .matches(EMAIL_VALIDATION, 'ForgotUserName_InvalidFormat'),
});

const ForgotUsername = (props: ForgotUsernameProps): JSX.Element => {
  const fullWidthClass = getFullWidth(props?.params?.IsFullWidth);

  const [isUserNotFound, setIsUserNotFound] = useState(false);
  const { t } = useTranslate();

  const { mutate: getUser } = useUserByParamManually({
    onSuccess: (data: UserInfo | undefined) => {
      setIsUserNotFound(!data);
      if (data) {
        getEmailWithForgottenUsername(data?.Email);
      }
    },
    onError: () => {
      setIsUserNotFound(true);
    },
  });
  const { mutate: getEmailWithForgottenUsername } = useForgottenUsername();

  const handleSubmit = (input: ForgotUsernameSchemas) => {
    getUser({ search: input?.email, param: 'Email' });
  };

  return (
    <div className={fullWidthClass}>
      <Panel panelTitle={t('ForgotUsername_FormTitle')}>
        <p className={styles.forgotPasswordText}>{t('ForgotUsername_FormDescription')}</p>
        <FormComponent<ForgotUsernameSchemas>
          onSubmit={handleSubmit}
          validationSchema={forgotUsernameSchemas}
        >
          {({ register, formState: { errors } }) => (
            <>
              <TextInput
                label={t('Form_Generic_Tag_Email')}
                {...register('email')}
                className={`rounded ${styles.forgotPasswordText}`}
                labelClassName={`text-nowrap ${styles.forgotPasswordText}`}
                error={t(errors?.email?.message)}
                errorClassName={`m-0 ${styles.forgotPasswordText}`}
                type="text"
              />
              <Button variant="success" type="submit" className="mt-4">
                {t('ForgotUsername_SubmitButtonTitle')}
              </Button>
              {isUserNotFound && (
                <p className={`${styles.error} ${styles.forgotPasswordText}`}>
                  {t('ForgotUsername_ErrorAccountNotFound')}
                </p>
              )}
            </>
          )}
        </FormComponent>
      </Panel>
    </div>
  );
};

export default ForgotUsername;
