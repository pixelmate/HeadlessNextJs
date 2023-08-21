const getBorderColor = (borderColor = 'Black') => {
  const borderColorClassName = `border-color-${borderColor.toLowerCase()}`;
  return { borderColorClassName };
};

export default getBorderColor;
