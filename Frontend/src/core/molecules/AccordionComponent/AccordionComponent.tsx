import { RichText, Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { Accordion, Container } from 'react-bootstrap';
import Heading from 'core/atoms/Heading';
import { AccordionProps } from './AccordionComponent.types';
import styles from './AccordionComponent.module.scss';

const AccordionComponent = (props: AccordionProps): JSX.Element => {
  const { Title, AccordionItems } = props?.fields || {};
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageEditing;
  const keys = AccordionItems.length > 0 ? AccordionItems?.map((item) => item.id) : [];
  const activeKey = isEditing ? keys : [];
  return (
    <Container className={`${styles.accordioncontainer} mb-5`}>
      {Title?.value && (
        <Heading
          className={`${styles.accordioncontainer_title} text-center`}
          text={Title}
          level={1}
        />
      )}
      <Accordion
        alwaysOpen
        defaultActiveKey={activeKey}
        className={`${styles.accordioncontainer_wrapper} accordioncomponent`}
      >
        {AccordionItems?.map((item) => (
          <Accordion.Item
            className={styles.accordioncontainer_item}
            eventKey={item?.id}
            key={item?.id}
          >
            <Accordion.Header className={styles.accordioncontainer_header}>
              <Text field={item?.fields?.Title} />
            </Accordion.Header>
            <Accordion.Body>
              <RichText field={item?.fields?.Description} className="rteContent" />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default AccordionComponent;
