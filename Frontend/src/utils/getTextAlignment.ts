const TEXT_ALIGNMENT = {
  'center right': 'align-items-center justify-content-end',
  'center left': 'align-items-center justify-content-start',
  'top right': 'align-items-start justify-content-end',
  'top left': 'align-items-start justify-content-start',
  'bottom right': 'align-items-end justify-content-end',
  'bottom left': 'align-items-end justify-content-start',
};

export type AlignmentType = keyof typeof TEXT_ALIGNMENT;

const getTextAlignment = (position: AlignmentType) =>
  TEXT_ALIGNMENT[position?.toLowerCase() as AlignmentType] ||
  'align-items-center justify-content-end';

export default getTextAlignment;
