import * as yup from 'yup';

export const newReferralNameSchemas = yup.object().shape({
  referralName: yup.object().shape({
    username: yup.string(),
  }),
});
