const ROUNDEDCORNERS = {
  roundTopLeftCorner: 'rounded-top-left',
  roundBottomLeftCorner: 'rounded-bottom-left',
  roundTopRightCorner: 'rounded-top-right',
  roundBottomRightCorner: 'rounded-bottom-right',
};

export type RoundedCornersType = keyof typeof ROUNDEDCORNERS;

const getRoundedCorners = (position: RoundedCornersType) => {
  return position ? ROUNDEDCORNERS[position as RoundedCornersType] : '';
};

export default getRoundedCorners;
