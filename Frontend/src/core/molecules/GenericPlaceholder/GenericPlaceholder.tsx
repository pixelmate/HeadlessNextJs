import Heading from 'core/atoms/Heading/Heading';
import { Col, Container, Row } from 'react-bootstrap';
import { RichText, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { GenericPlaceholderProps } from './GenericPlaceholder.type';
import getColorContrast from 'utils/getColorContrast';
import style from './GenericPlaceholder.module.scss';

const GenericPlaceholder = (props: GenericPlaceholderProps): JSX.Element => {
  const { Title, SubTitle, Description } = props?.fields || {};
  const { BackgroundColorContrast } = props?.params || {};
  const backgroundColorContrast = !!BackgroundColorContrast
    ? JSON.parse(BackgroundColorContrast).name
    : '';

  const { bgColorClassName } = getColorContrast(backgroundColorContrast);
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext?.pageEditing || false;
  return (
    <>
      {(Title.value || SubTitle.value || Description.value) && (
        <Container
          fluid
          className={
            isEditing
              ? `${style.genericPlaceholder}`
              : `${bgColorClassName} ${style.genericPlaceholder}`
          }
        >
          <Row className="no-gutters">
            <Col>
              <Container>
                <Row>
                  <Col>
                    {Title?.value && (
                      <Heading level={2} text={Title} className={style.genericPlaceholder_title} />
                    )}
                    {SubTitle?.value && (
                      <Heading
                        level={4}
                        text={SubTitle}
                        className={style.genericPlaceholder_subTitle}
                      />
                    )}
                    {Description?.value && (
                      <RichText
                        field={Description}
                        className={style.genericPlaceholder_description}
                      />
                    )}
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default GenericPlaceholder;
