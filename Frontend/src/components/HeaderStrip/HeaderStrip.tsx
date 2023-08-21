import NavigationStrip from 'core/molecules/NavigationStrip/NavigationStrip';
import { NavigationStripData } from 'core/molecules/NavigationStrip/navigationStrip.type';
import NotificationBanner from 'core/molecules/NotificationBanner/NotificationBanner';
import style from './HeaderStrip.module.scss';

const HeaderStrip = (props: NavigationStripData): JSX.Element => {
  return (
    <>
      <div className={style.header_strip}>
        <NotificationBanner />
      </div>
      <NavigationStrip {...props} />
    </>
  );
};

export default HeaderStrip;
