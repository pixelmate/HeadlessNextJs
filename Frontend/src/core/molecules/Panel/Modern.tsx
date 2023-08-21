import { useUser } from 'data/user';
import classNames from 'classnames';
import Image from 'core/atoms/Image';
import { Alert } from 'react-bootstrap';
import Heading from 'core/atoms/Heading';
import { PanelProps } from './Panel.type';
import styles from './Modern.module.scss';
import { useI18n } from 'next-localization';
import { REP_USER_TYPE } from 'constants/user';
import usePanelClasses from 'hooks/usePanelClass';
import useLocalStorage from 'hooks/useLocalStorage';
import { CALLBACK_URL } from 'constants/query-config';
import { DEFAULT_IS_FULLHEIGHT, IS_FULLHEIGHT } from 'constants/alignment';
import { getValuesFromQueryString } from 'utils/getValuesFromQueryString';
import { Placeholder, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

const Modern = (props: PanelProps) => {
  const { t } = useI18n();
  const { user } = useUser();
  const { sitecoreContext } = useSitecoreContext();
  const [localStorageCart] = useLocalStorage<ProductDetailsType[]>('PRODUCTS_IN_CART');
  const sitecoreContextroute = sitecoreContext?.route?.fields;
  const queryUrl = getValuesFromQueryString(CALLBACK_URL);
  const { Title, Image: Icon, IsFieldRepOnly, HideOnEmptyCart } = props?.fields || {};
  const { params, rendering } = props || {};
  const { textColorClassName, borderColorClassName } = usePanelClasses(params);
  const isFullHeight = params?.IsFullHeight || DEFAULT_IS_FULLHEIGHT;
  const cartNotEmpty = localStorageCart && localStorageCart.length > 0;
  const isPanelHidden =
    (user?.xp?.UserType !== REP_USER_TYPE && IsFieldRepOnly?.value) ||
    (!cartNotEmpty && HideOnEmptyCart?.value);
  if (isPanelHidden) {
    return <></>;
  }
  return (
    <>
      {/* TODO if there will be more than one validation in Panel we need to use https://react.dev/reference/react-dom/createPortal */}
      <div
        className={classNames('d-flex flex-column', {
          'h-100': isFullHeight === IS_FULLHEIGHT,
        })}
      >
        {sitecoreContextroute?.DisablePublicAccess && queryUrl !== '' && (
          <Alert variant="danger">
            <strong>{t('Authentication_Login_SignInTimedOut')}</strong>
            <div>{t('Authentication_Login_SignInAgain')}</div>
          </Alert>
        )}
        <div className={`${styles.panel} ${borderColorClassName}`}>
          <div className="p-3 pb-0">
            <div className="d-flex align-items-center">
              <Image field={Icon} className={styles.panel_icon} />
              <Heading
                level={3}
                text={Title}
                className={`${styles.panel_heading} ${textColorClassName}`}
              />
            </div>
            <hr />
          </div>
          <div className="mb-3">
            <Placeholder name="jss-panel" rendering={rendering} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modern;
