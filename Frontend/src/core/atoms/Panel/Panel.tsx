import classNames from 'classnames';
import styles from './Panel.module.scss';
import { PanelProps } from './Panel.type';

const Panel = (props: PanelProps): JSX.Element => {
  const { panelTitle, children, panelType } = props || {};
  return (
    <div className={classNames(styles.panel, { [styles.panel_secondary]: panelType })}>
      <h3
        className={classNames(styles.panel_heading, {
          [styles.panel_heading_secondary]: panelType,
        })}
      >
        {panelTitle}
      </h3>
      <div className={styles.panel_content}>{children}</div>
    </div>
  );
};

export default Panel;
