import classNames from 'classnames';
import CheckoutStepsGeneator from './CheckoutStepsGenerator';
import { CheckoutStepsProps } from './CheckoutSteps.type';
import styles from './CheckoutSteps.module.scss';

const CheckoutSteps = (props: CheckoutStepsProps): JSX.Element => {
  const { title, stepNumber, totalSteps } = props || {};
  return (
    <div className={styles.stepsWrapper}>
      <h5 className={classNames(styles.stepsWrapper_stepHeading)}>{title?.value}</h5>
      <div className={styles.stepsWrapper_steps}>
        <CheckoutStepsGeneator totalSteps={totalSteps} stepNumber={stepNumber} />
      </div>
    </div>
  );
};

export default CheckoutSteps;
