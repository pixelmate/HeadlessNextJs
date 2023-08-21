import { useAtom } from 'jotai';
import styles from './Spinner.module.scss';
import { spinnerAtom } from 'data/atoms/spinner';

const Spinner = () => {
  const [content] = useAtom(spinnerAtom);
  return (
    <>
      {content?.title && (
        <div>
          <div className={styles.spinner_backdrop}></div>
          <div className={styles.spinner_container}>
            <p>{content?.title}</p>
            <div className={styles.spinner_circles}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Spinner;
