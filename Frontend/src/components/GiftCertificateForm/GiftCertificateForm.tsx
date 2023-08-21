import dynamic from 'next/dynamic';
import { NextComponentType } from 'next';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { GiftCertificateFormProps } from 'core/molecules/GiftCertificateForm';

const ReIssue = dynamic(() => import('core/molecules/GiftCertificateForm/ReIssue'));
const Purchase = dynamic(() => import('core/molecules/GiftCertificateForm/Purchase'));

const MAP_THEME_TO_GIFT_CERTIFICATE_FORM: Record<string, NextComponentType> = {
  ReissueGiftCertificate: ReIssue,
  PurchaseGiftCertificate: Purchase,
};

const GiftCertificateForm = (props: GiftCertificateFormProps): JSX.Element => {
  const Component = props?.params?.Variation
    ? MAP_THEME_TO_GIFT_CERTIFICATE_FORM[props?.params?.Variation]
    : Purchase;

  return <Component {...props} />;
};

export default withDatasourceCheck()<GiftCertificateFormProps>(GiftCertificateForm);
