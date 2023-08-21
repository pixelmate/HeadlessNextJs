import { SignUpFormProps } from 'core/molecules/SignUpForm';
import dynamic from 'next/dynamic';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const SignUpForm = dynamic(() => import('core/molecules/SignUpForm/SignUpForm'));
const Newsletter = dynamic(
  () => import('core/molecules/NewsletterSubscription/NewsletterSubscription')
);
const NewsletterSubscription = (props: SignUpFormProps): JSX.Element => {
  const { SiteKey, IsGoogleRecaptchaEnabled } = props?.params || {};
  const Component = props?.params?.IsGoogleRecaptchaEnabled === '1' ? Newsletter : SignUpForm;
  if (IsGoogleRecaptchaEnabled === '1') {
    return (
      <>
        <GoogleReCaptchaProvider
          reCaptchaKey={SiteKey}
          scriptProps={{
            async: false,
            defer: false,
            appendTo: 'head',
            nonce: undefined,
          }}
        >
          <Component {...props} />
        </GoogleReCaptchaProvider>
      </>
    );
  }
  return <Component {...props} />;
};

export default NewsletterSubscription;
