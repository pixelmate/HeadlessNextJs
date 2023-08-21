import { RichText, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { Container, Row } from 'react-bootstrap';
import { useI18n } from 'next-localization';
import styles from './NavigationStrip.module.scss';
import type { NavigationStripData } from './navigationStrip.type';
import { useAuthorization, useUser } from 'data/user';
import { useAtom } from 'jotai';
import { authorizationAtom } from 'data/atoms/authorization-atom';

const NavigationStrip = (props: NavigationStripData): JSX.Element => {
  const { Message, DetailedMessage, ContactNumber } = props?.fields || {};
  const { sitecoreContext } = useSitecoreContext();
  const { user } = useUser();
  const { mutate: signOut, removeRefreshToken } = useAuthorization();
  const [{ isAuthenticated }] = useAtom(authorizationAtom);
  const { t } = useI18n();
  return (
    <>
      <div className={styles.navStrip}>
        <div className="text-center">{Message?.value}</div>
        <Container fluid="lg">
          <Row className="justify-content-end">
            <ul className="flex-wrap flex-md-nowrap">
              <li className="w-100 mx-auto">
                {user && (
                  <RichText
                    className={`${styles.detailedMessage} text-center`}
                    field={DetailedMessage}
                  />
                )}
              </li>
              {ContactNumber &&
                ContactNumber.map((item, index) => (
                  <li key={index}>{item?.fields?.Link?.value?.text}</li>
                ))}
              <li>
                <a href={sitecoreContext?.MyAccountPage as string}>
                  {t('Authentication_Login_MyAccountLabel')}
                </a>
              </li>
              <li className="d-lg-none">
                {!isAuthenticated && (
                  <a href={sitecoreContext?.UserLoginPage as string}>
                    {t('Authentication_Login_SignInLabel')}
                  </a>
                )}
                {isAuthenticated && (
                  <a
                    href={(sitecoreContext?.UserLoginPage as string) ?? ''}
                    onClick={() => {
                      signOut(undefined);
                      removeRefreshToken();
                    }}
                  >
                    {t('Authentication_Login_SignOutLabel')}
                  </a>
                )}
              </li>
            </ul>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default NavigationStrip;
