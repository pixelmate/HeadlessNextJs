import { ZIP_CODE } from 'constants/validation-patterns';
import { useTranslate } from 'hooks/useTranslate';

export const useZipCode = () => {
  const { t } = useTranslate();

  function getZipErrors(value?: string): JSX.Element | undefined {
    if (!value) {
      return undefined;
    }
    const zip = value || '';
    const errors: string[] = [];
    if (!zip) {
      errors.push(t('ShippingAddress_AddUpdate_RequiredLabel'));
    }
    if (!ZIP_CODE.test(zip)) {
      errors.push(t('ShippingAddress_AddUpdate_InvalidFormat'));
    }
    if (zip.length > 20) {
      errors.push(t('ShippingAddress_AddUpdate_ZipLength'));
    }
    if (errors.length === 0) {
      return undefined;
    }

    return (
      <span>
        {errors.map((item, index) => {
          return (
            <p className="m-0 lh-sm" key={`${item}${index}`}>
              {item}
            </p>
          );
        })}
      </span>
    );
  }
  return { getZipErrors };
};
