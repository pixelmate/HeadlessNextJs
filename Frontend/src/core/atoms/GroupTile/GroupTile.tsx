import { GroupTileProps } from './GroupTile.type';
import styles from './GroupTile.module.scss';

const Tile = (props: GroupTileProps) => {
  const { children, btnLabel, heading, handleBtn } = props;
  return (
    <>
      <div className={styles.groupTile_heading}>
        <span>{heading}</span>
        <button className={`${styles.groupTile_link} btn btn-link`} onClick={handleBtn}>
          {btnLabel}
        </button>
      </div>
      <div className="p-3">{children}</div>
    </>
  );
};

export default Tile;
