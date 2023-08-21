import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { Col, Row } from 'react-bootstrap';
import { TabComponentType } from './TabComponent.type';

const Classic = (props: TabComponentType) => {
  const { Description } = props?.fields || {};
  return (
    <Row className="classic_Container">
      <Col lg={12} xs={12}>
        <RichText field={Description} />
      </Col>
    </Row>
  );
};

export default Classic;
