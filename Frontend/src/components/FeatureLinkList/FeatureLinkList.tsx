import { RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { FeatureLinkListProps } from './FeatureLinkList.type';
import { Container, Row } from 'react-bootstrap';
import Image from 'core/atoms/Image/Image';
import Heading from 'core/atoms/Heading/Heading';
import style from './FeatureLinkList.module.scss';
import { useMemo } from 'react';
import getColorContrast from 'utils/getColorContrast';
import classNames from 'classnames';

const FeatureLinkList = (props: FeatureLinkListProps): JSX.Element => {
  const { Title, Description, Features } = props?.fields || {};
  const { params } = props || {};

  const { bgColorClassName } = useMemo(() => {
    const backgroundColorContrast =
      params?.BackgroundColorContrast && JSON.parse(params?.BackgroundColorContrast);

    const { bgColorClassName } = getColorContrast(backgroundColorContrast?.name);

    return { bgColorClassName };
  }, [params?.BackgroundColorContrast]);

  return (
    <Container
      className={classNames(style.featureLinkList, {
        [`${bgColorClassName}`]: !!bgColorClassName,
      })}
    >
      <Row>
        <div className={`col-12 col-sm-12 col-lg-6 ${style.featureLinkList_detail}`}>
          <Heading level={3} text={Title} />
          <RichText field={Description} />
        </div>
        <div
          className={`d-none d-md-flex col-12 col-md-6 col-lg-3 align-items-center justify-content-center`}
        >
          <Image field={props?.fields?.Image} />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <ul className="m-0">
            {Features?.map((feature, index) => {
              if (index === 0) {
                return (
                  <li key={feature.id}>
                    <h5>
                      <Text field={feature?.fields?.Value} />
                    </h5>
                  </li>
                );
              }
              return (
                <li key={feature.id}>
                  <h6>
                    <Text field={feature?.fields?.Value} />
                  </h6>
                </li>
              );
            })}
          </ul>
        </div>
      </Row>
    </Container>
  );
};
export default FeatureLinkList;
