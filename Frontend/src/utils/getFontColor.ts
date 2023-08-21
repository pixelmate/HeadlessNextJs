const getFontColor = (fontColor = 'Black') => {
  const textColorClassName = `color-${fontColor.toLowerCase()}`;
  return { textColorClassName };
};

export default getFontColor;
