import * as yup from 'yup';
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  PHONE_VALIDATION,
  USERNAME_PATTERN,
} from 'constants/validation-patterns';

export const newUserRegistrationSchema = yup.object().shape({
  registration: yup.object().shape({
    username: yup
      .string()
      .required('GiftCertificateRegistration_UserNameRequired')
      .min(6, 'GiftCertificateRegistration_UserNameFormatSummary')
      .max(50, 'GiftCertificateRegistration_UserNameFormatSummary')
      .matches(USERNAME_PATTERN, 'GiftCertificateRegistration_UserNameExist'),
    password: yup
      .string()
      .required('GiftCertificateRegistration_PasswordRequired')
      .min(6, 'GiftCertificateRegistration_PasswordFormatSummary')
      .max(15, 'GiftCertificateRegistration_PasswordFormatSummary')
      .matches(PASSWORD_VALIDATION, 'GiftCertificateRegistration_PasswordRegex'),
    confirmPassword: yup
      .string()
      .required('GiftCertificate_ConfirmPasswordRequired')
      .oneOf([yup.ref('password')], 'GiftCertificate_ConfirmPasswordMatch'),
    email: yup
      .string()
      .required('GiftCertificateRegistration_EmailRequired')
      .matches(EMAIL_VALIDATION, 'GiftCertificateRegistration_EmailInvalid'),
    phone: yup
      .string()
      .required('GiftCertificateRegistration_PhoneLineNumberInvalid')
      .matches(PHONE_VALIDATION, 'GiftCertificationRegistration_PhoneAreaCodeInvalid'),
  }),
});
