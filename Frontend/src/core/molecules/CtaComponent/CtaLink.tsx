import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import Image from 'core/atoms/Image/Image';
import { ConfigurableCTAProps } from './CtaComponent.types';
import styles from './CtaLink.module.scss';

const CtaLink = (props: ConfigurableCTAProps): JSX.Element => {
  const { Icon, Link: ctaLink } = props?.fields || {};
  const { CtaAlignment, CtaIconAlignment } = props?.params || {};

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
      <div className={`${styles.ctaContainer_content}`}>
        <Link field={ctaLink} role="button">
          <div
            className={`${styles.ctaContainer_link} text-decoration-none d-flex m-4 align-items-center`}
          >
            <div
              className={classNames(`${styles.ctaContainer_imageContainer} `, {
                ['order-2']: CtaIconAlignment === 'right',
              })}
            >
              <Image field={Icon} />
            </div>
            <div>
              <span className={`${styles.ctaContainer_linktxt}`}>{ctaLink?.value?.text}</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CtaLink;
