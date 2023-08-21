import { Col, Container, Row } from 'react-bootstrap';
import Image from 'core/atoms/Image/Image';
import getColorContrast from 'utils/getColorContrast';
import openPdf from 'utils/openPdf';
import { ReportsListProps } from './ReportList.type';
import style from './ReportList.module.scss';
import Heading from 'core/atoms/Heading';

const ReportsList = (props: ReportsListProps): JSX.Element => {
  const { Title, PDFs, Label } = props.fields || {};
  const { BackgroundColorContrast } = props.params || {};
  const backgroundColorContrast = !!BackgroundColorContrast
    ? JSON.parse(BackgroundColorContrast).name
    : '';
  const { bgColorClassName } = getColorContrast(backgroundColorContrast);
  return (
    <Container fluid>
      <Row className={`${style.reportList} justify-content-center`}>
        <Col xs={11} sm={8} md={6} lg={5} xl={4} className={`${bgColorClassName} rounded-2`}>
          <Row className="text-center p-3 align-items-center">
            <Col xs={12} sm={4}>
              <Image field={props?.fields?.Image} />
            </Col>
            <Col xs={12} sm={8} className="mt-3 mt-sm-0">
              <div className="d-flex flex-column justify-content-center w-100">
                <Heading level={8} text={Title} className={style.reportList_title} />
                <select onChange={(e) => openPdf(e.target.value)} className="h8">
                  <option value="">{Label.value}</option>
                  {PDFs.map((item) => (
                    <option key={item.id} value={item?.fields?.File?.value?.src}>
                      {item?.fields?.FileTitle?.value}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportsList;
