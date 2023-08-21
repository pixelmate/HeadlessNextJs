import { Col, Container, Row, Button } from 'react-bootstrap';
import { CheckoutFooterProps } from './CheckoutFooter.type';
import styles from './CheckoutFooter.module.scss';
import Image from 'core/atoms/Image';
import { useAtom } from 'jotai';
import { checkoutStep } from 'data/atoms/checkoutStep';
import { useUser } from 'data/user';
import { useGiftOrder } from 'hooks/checkout/useGiftOrder';
import useLocalStorage from 'hooks/useLocalStorage';

const CheckoutFooterComponent = (props: CheckoutFooterProps): JSX.Element => {
  const { ContinueCta, EditCta, Image: PaymentImage } = props?.fields || {};
  const [step] = useAtom(checkoutStep);
  const [, setPassedStep] = useLocalStorage<number>('COMPLETED_STEP');
  const { submitForm } = useGiftOrder();
  const { isAuthenticated } = useUser();
  const handleClick = () => {
    step === 1 && isAuthenticated && submitForm();
    setPassedStep(step);
  };
  return (
    <>
      {!!props?.fields && (
        <Container fluid="lg" className={`mt-3 ${styles.CheckoutFooterContainer}`}>
          <Row>
            <Col>
              {!!EditCta?.value?.href && (
                <Button variant="info" href={EditCta?.value?.href}>
                  {EditCta?.value?.text}
                </Button>
              )}
            </Col>
            <Col className="text-end">
              {!!ContinueCta?.value?.href && (
                <Button
                  variant="success"
                  onClick={handleClick}
                  className="px-4"
                  href={ContinueCta?.value?.href}
                >
                  {ContinueCta?.value?.text}
                </Button>
              )}
            </Col>
          </Row>
          <Row className="text-center mt-3">
            <Col>{!!PaymentImage && <Image className="img-fluid" field={PaymentImage} />}</Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default CheckoutFooterComponent;
