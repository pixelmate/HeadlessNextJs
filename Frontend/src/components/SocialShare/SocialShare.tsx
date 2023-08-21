import SocialShareComponent, { type SocialShareType } from 'core/atoms/SocialShare';

const SocialShare = (props: SocialShareType): JSX.Element => {
  return <SocialShareComponent {...props} />;
};

export default SocialShare;
