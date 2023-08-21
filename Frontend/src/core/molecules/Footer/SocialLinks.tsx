import ImageLinkList from 'core/atoms/ImageLinkList';
import { SocialMediaHandle } from './footer.types';
import styles from './Footer.module.scss';

type SocialLinksProps = {
  items: SocialMediaHandle[];
};

const SocialLinks = (props: SocialLinksProps) => (
  <div className={styles.footer_socialLinks}>
    {/* TODO: This value should come from CMS */}
    <h6 className="h7">CONNECT WITH US</h6>
    <ImageLinkList items={props.items} className={styles.footer_socialLink} />
  </div>
);

export default SocialLinks;
