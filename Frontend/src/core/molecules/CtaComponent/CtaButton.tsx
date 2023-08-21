import getColorContrast from 'utils/getColorContrast';
import styles from './CtaButton.module.scss';
import { ConfigurableCTAProps } from './CtaComponent.types';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { createModal, modalAtom } from 'data/atoms/modal';
import { MODAL } from 'constants/modal';
import Image from 'core/atoms/Image';
import { useRouter } from 'next/router';

const CtaButton = (props: ConfigurableCTAProps): JSX.Element => {
  const { Link, Icon } = props?.fields || {};
  const { CtaAlignment, CtaIconAlignment, CtaColorContrast } = props?.params || {};
  const router = useRouter();
  const ColorContrast = !!CtaColorContrast ? JSON.parse(CtaColorContrast).name : '';
  const { textColorClassName: CtaContrastTextColor, bgColorClassName: descriptionContrastBgColor } =
    getColorContrast(ColorContrast);
  const [, setContent] = useAtom(modalAtom);
  const handleClick = () => {
    if (props?.fields?.Link?.value?.linktype === 'videomodal') {
      setContent(createModal(MODAL.VIDEO, Link?.value?.url as string));
    } else {
      router.push(props?.fields?.Link?.value?.href || '');
    }
  };
  return (
    <div
      className={classNames(
        {
          ['d-flex justify-content-end']: CtaAlignment === 'right',
        },
        {
          ['d-flex justify-content-center']: CtaAlignment === 'center',
        }
      )}
    >
      <div
        className={`${styles.ctaContainer_content} ${descriptionContrastBgColor} d-flex m-4 align-items-center d-flex`}
      >
        <div
          role="button"
          tabIndex={0}
          aria-label="button"
          onClick={handleClick}
          className={` ${styles.ctaContainer_button} text-uppercase d-flex`}
        >
          <div
            className={classNames(`${styles.ctaContainer_imageContainer} `, {
              ['order-2']: CtaIconAlignment === 'right',
            })}
          >
            <Image field={Icon} className={`${CtaContrastTextColor}`} />
          </div>
          <span className={`${CtaContrastTextColor} px-1 h7`}>
            {props?.fields?.Link?.value?.text}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CtaButton;
