import { useI18n } from 'next-localization';
import Script from 'next/script';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
type TrustPilotProps = {
  className?: string;
  review: string;
};

const getScriptSrc = (text: string) => {
  const scriptRegex = /<script\s+[^>]*src=(["'])(.*?)\1/i;
  const match = text?.match(scriptRegex);
  return match && match[2] ? match[2] : '';
};

const TrustPilot = (props: TrustPilotProps) => {
  const { sitecoreContext } = useSitecoreContext();
  const { t } = useI18n();

  return (
    <>
      {!sitecoreContext?.DisableTrustpilot && (
        <>
          <div
            className={props?.className}
            dangerouslySetInnerHTML={{
              __html: props?.review,
            }}
          />
          <Script src={getScriptSrc(t('TrustPilot_TrustPilotLibrary'))} strategy="lazyOnload" />
        </>
      )}
    </>
  );
};

export default TrustPilot;
