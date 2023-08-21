import ImageLinkList from 'core/atoms/ImageLinkList';
import { SocialMediaHandle } from './footer.types';
import styles from './Footer.module.scss';

type FooterTrustBadgesProps = {
  items: SocialMediaHandle[];
};

const FooterTrustBadges = (props: FooterTrustBadgesProps) => (
  <div>
    <ImageLinkList items={props.items} className={styles.footer_trustBadge} />
  </div>
);

export default FooterTrustBadges;
