import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { useMemo } from 'react';
import getColorContrast from 'utils/getColorContrast';
import Image from 'core/atoms/Image';
import getAlignment, { type AlignmentType } from 'utils/getAlignment';
import getIsFullWidth, { type FluidType } from 'utils/getIsFullWidth';
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ColumnSplitterProps } from './ColumnSplitter.type';
import classNames from 'classnames';
import styles from './ColumnSplitter.module.scss';

const ColumnSplitter = (props: ColumnSplitterProps) => {
  const { Image: DesktopImage, MobileImage } = props?.fields || {};
  const { params, rendering } = props || {};
  const { gapSize, bgColorClassName, isFullWidth, alignmentClass, columns } = useMemo(() => {
    const gapSize = params.GapSize.split('-');
    const columnSize = JSON.parse(params.ColumnSize);
    const alignmentClass = getAlignment(params.Alignment as AlignmentType);
    const backgroundColorContrast =
      params.BackgroundColorContrast && JSON.parse(params.BackgroundColorContrast);
    const { bgColorClassName } = getColorContrast(backgroundColorContrast?.name);
    const isFullWidth = getIsFullWidth(params.IsFullWidthDeviceSpecific as FluidType);
    const columns = columnSize.map((column: string): number[] => {
      return column.split('-').map((item: string) => parseInt(item, 10));
    });
    return { gapSize, bgColorClassName, alignmentClass, columns, isFullWidth };
  }, [
    params.Alignment,
    params.BackgroundColorContrast,
    params.ColumnSize,
    params.GapSize,
    params.IsFullWidthDeviceSpecific,
  ]);
  return (
    <Container fluid className={`${styles.columnSplitter} column_splitter_container px-0`}>
      {(DesktopImage || MobileImage) && (
        <div
          className={classNames(styles.columnSplitter_img_container, {
            [`${bgColorClassName}`]: !DesktopImage?.value?.src,
          })}
        >
          <Image className="img-fluid d-none d-md-block" field={DesktopImage} />
          <Image
            className="img-fluid d-md-none"
            field={MobileImage?.value?.src ? MobileImage : DesktopImage}
          />
        </div>
      )}
      <>
        <div className={`${isFullWidth} p-0`}>
          <div className={`d-flex w-100 mx-auto flex-wrap ${alignmentClass}`}>
            {columns.map((item: number[], index: number) => {
              const placeholder = `jss-col-${index + 1}`;
              const isFirstColumn = index === 0;
              const isLastColumn = index === columns.length - 1;
              const columnClasses = classNames(
                `px-${gapSize[2]} ${styles.columnSplitter_col_style} column_splitter_col_style`,
                { 'ps-lg-0 ps-md-0': isFirstColumn },
                { 'pe-lg-0 pe-md-0': isLastColumn },
                { 'px-lg-0': item[0] === 12 },
                { [`px-lg-${gapSize[0]}`]: item[0] !== 12 },
                { 'px-md-0': item[1] === 12 },
                { [`px-md-${gapSize[1]}`]: item[1] !== 12 },
                { [`${bgColorClassName}`]: !!bgColorClassName }
              );
              return (
                <Col xs={item[2]} md={item[1]} lg={item[0]} key={index} className={columnClasses}>
                  <Placeholder name={placeholder} rendering={rendering} />
                </Col>
              );
            })}
          </div>
        </div>
      </>
    </Container>
  );
};

export default ColumnSplitter;
