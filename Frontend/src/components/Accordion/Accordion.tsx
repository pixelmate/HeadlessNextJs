import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import AccordionComponent, { type AccordionProps } from 'core/molecules/AccordionComponent';

const Accordion = (props: AccordionProps): JSX.Element => {
  return <AccordionComponent {...props} />;
};

export default withDatasourceCheck()<AccordionProps>(Accordion);
