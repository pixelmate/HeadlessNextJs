import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'core/atoms/Image';
import { Container, Row, Col } from 'react-bootstrap';
import { PdfDocumentsProps } from './PdfDocuments.type';
import openPdf from 'utils/openPdf';
import styles from './PdfDocuments.module.scss';

const PdfDocuments = (props: PdfDocumentsProps) => {
  const { Pdfs } = props?.fields || {};

  return (
    <Container className={`${styles.pdfDocuments} px-0`}>
      <Row>
        <Col>
          <ul className="list-group rounded-0">
            {Pdfs.map((pdf: Pdf) => (
              <li
                key={pdf?.id}
                onClick={() => openPdf(pdf?.fields?.File?.value?.src as string)}
                className="list-group-item cursor-pointer"
              >
                <Image field={props?.fields?.PdfIcon} />
                <Text field={pdf?.fields?.FileTitle} />
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default PdfDocuments;
