const ALIGNMENT = {
  right: 'justify-content-end',
  left: 'justify-content-start',
  center: 'justify-content-center',
};

export type AlignmentType = keyof typeof ALIGNMENT;

const getAlignment = (position = 'left' as AlignmentType) =>
  ALIGNMENT[position.toLowerCase() as AlignmentType] || 'justify-content-start';

export default getAlignment;
