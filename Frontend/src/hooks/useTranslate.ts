import { useI18n } from 'next-localization';

export const useTranslate = () => {
  const { t } = useI18n();
  const getTranslation = (errorKey?: string) => (errorKey ? t(errorKey) : undefined) as string;

  return { t: getTranslation };
};
