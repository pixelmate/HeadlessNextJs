import styles from './Placeholder.module.scss';
import { Container } from 'react-bootstrap';

const Placeholders = () => {
  return (
    <Container className="px-0 py-5">
      <div className={styles.placeholder}>
        <div className={`${styles.placeholder_box} ${styles.loading}`}></div>
        <div className={styles.placeholder_bars}>
          <div
            className={`${styles.placeholder_bar} ${styles.placeholder_bar_1} ${styles.loading}`}
          ></div>
          <div
            className={`${styles.placeholder_bar} ${styles.placeholder_bar_2} ${styles.loading}`}
          ></div>
        </div>
      </div>
    </Container>
  );
};

export default Placeholders;
