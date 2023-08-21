import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export interface CcpaModalProps {
  ccpaMessage: Field<string>;
  onConfirmAction: () => void;
}
