import { DIGIT_LETTER_NO_SPACE } from 'constants/validation-patterns';
import * as yup from 'yup';
export const replicatorSiteNameSchema = yup.object().shape({
  siteName: yup.object().shape({
    name: yup
      .string()
      .required('FieldRep_Replicator_ReplicatorSiteIsRequired')
      .matches(DIGIT_LETTER_NO_SPACE, 'FieldRep_Replicator_SiteValidCharacters'),
    //TODO update when will be ready key and value
    charge: yup.boolean().oneOf([true], 'Required'),
  }),
});
