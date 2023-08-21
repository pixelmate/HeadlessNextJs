import { ImageField, Link, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useFieldRep } from 'hooks/useFieldRep';
import styles from './ConditionalConfigurableCTA.module.scss';
import { Button } from 'react-bootstrap';
import getColorContrast from 'utils/getColorContrast';

export type ConditionalConfigurableCTAProps = ComponentProps & {
  fields: {
    PrimaryUrl: LinkField;
    SecondaryUrl: LinkField;
    Icon: ImageField;
  };
  params: {
    Variation: string;
    CtaAlignment: 'left' | 'right' | 'center';
    CtaColorContrast: string;
    CtaStyle: string;
  };
};

const ConditionalConfigurableCTA = (props: ConditionalConfigurableCTAProps) => {
  const { isLoading, routerIsReady, isRealnameValid } = useFieldRep();
  const { fields, params } = props;
  const btnWrapperStyles = {
    textAlign: props.params.CtaAlignment,
  };
  const colors = JSON.parse(params.CtaColorContrast);
  const btnStyles = getColorContrast(colors.name);
  if (!isLoading && routerIsReady && isRealnameValid) {
    return (
      <Link
        field={fields.PrimaryUrl}
        className={`d-block margin-b-60 ${styles.btnWrapper}`}
        style={btnWrapperStyles}
      >
        <Button
          className={`${styles.btn} ${btnStyles.bgColorClassName} ${btnStyles.textColorClassName}`}
        >
          {fields.PrimaryUrl.value.text}
        </Button>
      </Link>
    );
  }
  return (
    <Link
      field={fields.SecondaryUrl}
      className={`d-block margin-b-60 ${styles.btnWrapper}`}
      style={btnWrapperStyles}
    >
      <Button
        className={`${styles.btn} ${btnStyles.bgColorClassName} ${btnStyles.textColorClassName}`}
      >
        {fields.SecondaryUrl.value.text}
      </Button>
    </Link>
  );
};
export default ConditionalConfigurableCTA;
