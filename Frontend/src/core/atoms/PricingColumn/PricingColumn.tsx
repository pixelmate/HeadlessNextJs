import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DEFAULT_PRICING_COST } from 'constants/productDetails';
import { PricingColumnProps } from './PriceColumn.type';

const PricingColumn = (props: PricingColumnProps) => {
  const { title, price, className, invertNum } = props || {};
  return (
    <Row className={className}>
      <Col xs={7} className="text-end">
        {title}
      </Col>
      <Col xs={5} className="text-end">
        <b className="pe-3">{`${
          invertNum && price !== DEFAULT_PRICING_COST ? '-' : ''
        }$${price}`}</b>
      </Col>
    </Row>
  );
};

export default PricingColumn;
