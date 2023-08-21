import { useUser } from 'data/user';
import classNames from 'classnames';
import { Alert } from 'react-bootstrap';
import Heading from 'core/atoms/Heading';
import { PanelProps } from './Panel.type';
import styles from './Classic.module.scss';
import { useI18n } from 'next-localization';
import { REP_USER_TYPE } from 'constants/user';
import usePanelClasses from 'hooks/usePanelClass';
import { CALLBACK_URL } from 'constants/query-config';
import {
  DEFAULT_IS_FULLHEIGHT,
  DEFAULT_IS_FULLWIDTH,
  IS_FULLHEIGHT,
  IS_FULLWIDTH,
} from 'constants/alignment';
import { getValuesFromQueryString } from 'utils/getValuesFromQueryString';
import { Placeholder, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

const Classic = (props: PanelProps): JSX.Element => {
  const { t } = useI18n();
  const { user, isAuthenticated } = useUser();
  const { sitecoreContext } = useSitecoreContext();
  const sitecoreContextroute = sitecoreContext?.route?.fields;
  const queryUrl = getValuesFromQueryString(CALLBACK_URL);
  const { params, rendering } = props || {};
  const { Title, IsFieldRepOnly, HideWhenAuth } = props?.fields || {};
  const { textColorClassName, bgColorClassName, borderColorClassName, alignmentClass } =
    usePanelClasses(params);
  const isFullHeight = params?.IsFullHeight || DEFAULT_IS_FULLHEIGHT;
  const IsFullWidth = params?.IsFullWidth || DEFAULT_IS_FULLWIDTH;
  const isPanelHidden =
    (user?.xp?.UserType !== REP_USER_TYPE && IsFieldRepOnly?.value) ||
    (isAuthenticated && HideWhenAuth?.value);
  if (isPanelHidden) {
    return <></>;
  }
  return (
    <>
      {/* TODO if there will be more than one validation in Panel we need to use https://react.dev/reference/react-dom/createPortal */}

      <div
        className={classNames('d-flex flex-column', {
          'h-100': isFullHeight === IS_FULLHEIGHT,
          'container p-0': IsFullWidth !== IS_FULLWIDTH,
        })}
      >
        {sitecoreContextroute?.DisablePublicAccess && queryUrl !== '' && (
          <Alert variant="danger">
            <strong>{t('Authentication_Login_SignInTimedOut')}</strong>
            <div>{t('Authentication_Login_SignInAgain')}</div>
          </Alert>
        )}
        <div className={`${styles.panel} ${borderColorClassName}`}>
          <div className={`${bgColorClassName} px-3 `}>
            <Heading
              level={3}
              className={`${styles.panel_heading} ${textColorClassName} ${alignmentClass}`}
              text={Title}
            />
          </div>
          <div className={styles.panel_content}>
            <Placeholder name="jss-panel" rendering={rendering} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Classic;
