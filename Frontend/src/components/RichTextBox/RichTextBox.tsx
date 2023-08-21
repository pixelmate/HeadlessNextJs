import { ComponentProps } from 'lib/component-props';
import { RichText, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { Col, Container, Row } from 'react-bootstrap';

type RichTextBoxProps = ComponentProps & {
  fields: {
    Description: RichTextField;
  };
};

const RichTextBox = (props: RichTextBoxProps): JSX.Element => {
  const { Description } = props?.fields || {};
  const { IsFullWidth } = props?.params || {};
  return (
    <Container fluid={!!IsFullWidth} className="bg-white ">
      <Row>
        <Col className="p-0">
          <RichText field={Description} className="rteContent d-grid px-4" />
        </Col>
      </Row>
    </Container>
  );
};

export default RichTextBox;
