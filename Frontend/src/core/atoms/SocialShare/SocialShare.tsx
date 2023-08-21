import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import React from 'react';
import styles from './SocialShare.module.scss';

export type SocialShareType = {
  canonicalUrl?: string;
};

interface SharePlatforms {
  [key: string]: (canonicalUrl: string) => JSX.Element;
}

const platforms: SharePlatforms = {
  facebook: (canonicalUrl: string) => (
    <FacebookShareButton url={canonicalUrl} key={'facebook'}>
      <div className={styles.facebook}>
        <FacebookIcon size={24} round /> <span>Share</span>
      </div>
    </FacebookShareButton>
  ),
  twitter: (canonicalUrl: string) => (
    <TwitterShareButton url={canonicalUrl} key={'twitter'}>
      <div className={styles.twitter}>
        <TwitterIcon size={24} round /> <span>Tweet</span>
      </div>
    </TwitterShareButton>
  ),
};

const SocialShare = (props: SocialShareType): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const socialSharePlatforms = sitecoreContext?.SocialSharePlatforms as string[];
  let canonicalUrl = sitecoreContext?.CanonicalUrl as string;

  if (props.canonicalUrl) {
    canonicalUrl = props.canonicalUrl;
  }
  if (canonicalUrl && !canonicalUrl?.includes('https') && typeof location !== 'undefined') {
    canonicalUrl = location?.origin + canonicalUrl;
  }
  return (
    <div className="bg-white px-4">
      {canonicalUrl &&
        socialSharePlatforms?.map((platform: string) => {
          return (
            <React.Fragment key={platform}>{platforms[platform](canonicalUrl)}</React.Fragment>
          );
        })}
    </div>
  );
};

export default SocialShare;
