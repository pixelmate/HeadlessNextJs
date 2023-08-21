import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

export type GiftCertificateDesignType = GiftCertificateDesign[];

type GiftCertificateDesign = {
  GiftCertificateImage: ImageField;
  GiftCertificateStyle: string;
};

export type GiftCertificateDesignProps = {
  bgColorContrast: {
    name: string;
  };
  setDesignFormat: (style: string) => void;
  designFormat: string;
};
