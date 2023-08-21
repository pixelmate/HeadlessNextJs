import { Container, Row, Col } from 'react-bootstrap';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import { useUser } from 'data/user';
import { getGreeting } from 'utils/getGreeting/getGreeting';
import { UserTitlesProps } from './UserTitles.type';
import styles from './UserTitles.module.scss';

const UserTitles = (props: UserTitlesProps): JSX.Element => {
  const { t } = useI18n();
  const { Title } = props?.fields || {};
  const { user } = useUser();
  const greeting = getGreeting();
  const salutation = t(greeting, {
    Username: `${user?.name} ${user?.surname}`,
  });

  return (
    <Container>
      <Row>
        <Col className={styles.UserTitles}>
          <div className={styles.UserTitles_heading}>
            <Text field={Title} />
          </div>
          {user && salutation ? (
            <p className={styles.UserTitles_salutation}>{salutation}</p>
          ) : (
            <div className={styles.UserTitles_placeholder} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserTitles;
