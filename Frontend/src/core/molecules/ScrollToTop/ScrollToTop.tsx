import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import styles from './ScrollToTop.module.scss';

export const ScrollToTop = ({ enabled }: { enabled: boolean }) => {
  const { sitecoreContext } = useSitecoreContext();
  const moveToTop = () => window.scrollTo({ behavior: 'smooth', left: 0, top: 0 });
  return typeof sitecoreContext?.ScrollToTopIcon === 'string' && enabled ? (
    <img
      className={styles.icon}
      src={sitecoreContext?.ScrollToTopIcon}
      alt="Scroll to top"
      onClick={moveToTop}
    />
  ) : (
    <></>
  );
};
