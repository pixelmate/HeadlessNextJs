import styles from './DPanel.module.scss';
import getBorderColor from 'utils/getBorderColor';
import getColorContrast from 'utils/getColorContrast';
import { DPanelProps } from './Panel.type';

const DPanel = (props: DPanelProps): JSX.Element => {
  const { panelTitle, children, bgColorContrast } = props || {};
  const { textColorClassName, bgColorClassName } = getColorContrast(bgColorContrast?.name);
  const { borderColorClassName } = getBorderColor(bgColorContrast?.name.split(' ')[0] || '');
  return (
    <div className={`${styles.panel} ${borderColorClassName}`}>
      <h3 className={`${styles.panel_heading} ${bgColorClassName} ${textColorClassName}`}>
        {panelTitle}
      </h3>
      <div className={styles.panel_content}>{children}</div>
    </div>
  );
};

export default DPanel;
