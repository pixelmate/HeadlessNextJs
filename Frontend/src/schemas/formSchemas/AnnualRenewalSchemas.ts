import * as yup from 'yup';

export const annualRenewalSchemas = yup.object().shape({
  annualRenewal: yup.object().shape({
    //TODO update when will be ready key and value
    charge: yup.boolean().oneOf([true], 'Required'),
  }),
});
