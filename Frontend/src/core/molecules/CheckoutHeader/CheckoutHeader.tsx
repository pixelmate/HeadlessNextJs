import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'core/atoms/Image';
import CheckoutSteps from 'core/atoms/CheckoutSteps';
import { CheckoutHeaderProps } from './checkoutHeader.type';
import styles from './CheckoutHeader.module.scss';
import { useGiftOrder } from 'hooks/checkout/useGiftOrder';
import { useUser } from 'data/user';
import { useEffect, useMemo } from 'react';
import { useAtom } from 'jotai';
import { checkoutStep } from 'data/atoms/checkoutStep';
import { useValidateSelectedStep } from 'hooks/useValidateSelectedStep/useValidateSelectedStep';
import useLocalStorage from 'hooks/useLocalStorage';
import { createSpinner, spinnerAtom } from 'data/atoms/spinner';
import { useTranslate } from 'hooks/useTranslate';
import { useRouter } from 'next/router';
import { ROUTES } from 'utils/routes';

const CheckoutHeader = (props: CheckoutHeaderProps): JSX.Element => {
  const {
    CheckoutHeaderCTA,
    CheckoutHeaderLogo,
    CheckoutHeaderRTE: ContactDetails,
    StepTitle,
    StepNumber,
    TotalSteps,
  } = props?.fields || {};

  const [, setStep] = useAtom(checkoutStep);
  const [, setSpinner] = useAtom(spinnerAtom);

  const router = useRouter();
  const { t } = useTranslate();
  const [, setPassedStep] = useLocalStorage<number>('COMPLETED_STEP');
  const [isNewUser] = useLocalStorage<boolean>('IS_NEW_USER');
  const { submitForm } = useGiftOrder();
  const { validate } = useValidateSelectedStep();
  const { isAuthenticated } = useUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const spinnerData = useMemo(() => createSpinner(t('Common_Loading')), []);

  useEffect(() => {
    setSpinner(spinnerData);
    setStep(+StepNumber?.value);
    const redirectPath = validate(+StepNumber?.value);
    if (!redirectPath || (redirectPath === ROUTES.CHECKOUT_STEP1 && !isNewUser)) {
      setSpinner(null);
    }

    if (redirectPath) {
      router.push(redirectPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validate]);

  const handleClick = () => {
    StepNumber.value === '1' && isAuthenticated && submitForm();
    setPassedStep(+StepNumber?.value || 0);
  };

  return (
    <Container fluid="lg" className={styles.checkoutHeader_main_nav}>
      <Row>
        <Col>
          <RichText field={ContactDetails} className={styles.checkoutHeader_contactDetails} />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={styles.checkoutHeader_wrapper}>
            <Link href="/" passHref>
              <a aria-label="Home" className={styles.checkoutHeader_logo}>
                <Image field={CheckoutHeaderLogo} priority />
              </a>
            </Link>
            <div className="py-3">
              <CheckoutSteps title={StepTitle} stepNumber={StepNumber} totalSteps={TotalSteps} />
              {CheckoutHeaderCTA?.value?.href && (
                <div className="text-end">
                  <Button
                    onClick={handleClick}
                    variant="success"
                    className="px-4 mt-3"
                    href={CheckoutHeaderCTA?.value?.href}
                  >
                    {CheckoutHeaderCTA?.value?.text}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutHeader;
