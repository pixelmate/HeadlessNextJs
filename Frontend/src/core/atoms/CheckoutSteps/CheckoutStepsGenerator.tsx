import classNames from 'classnames';
import { useMemo } from 'react';
import { StepArrow } from '../Icons/StepArrow';
import { CheckoutStepsProps } from './CheckoutSteps.type';
import styles from './CheckoutSteps.module.scss';

const CheckoutStepsGeneator = (props: CheckoutStepsProps): JSX.Element => {
  const { totalSteps, stepNumber: currentStepNumber } = props || {};
  const steps = useMemo(
    () => Array.from({ length: totalSteps?.value }, (_, i) => i + 1),
    [totalSteps?.value]
  );

  return (
    <>
      {steps.map((_, index) => {
        return (
          <>
            <span
              className={classNames(styles.stepsWrapper_steps_stepBubble, {
                [`${styles.stepsWrapper_steps_activeStep}`]:
                  parseInt(currentStepNumber?.value) === index + 1,
              })}
            ></span>
            {index + 1 < totalSteps?.value && <StepArrow />}
          </>
        );
      })}
    </>
  );
};

export default CheckoutStepsGeneator;
