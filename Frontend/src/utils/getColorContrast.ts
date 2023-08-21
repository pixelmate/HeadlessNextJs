const getColorContrast = (colorContrast = 'white Black', flip?: boolean) => {
  const color = colorContrast === '' ? 'white Black' : colorContrast;
  const [bgColor, textColor] = color.toLowerCase().split(' ');
  const textColorClassName = `color-${flip ? bgColor : textColor}`;
  const bgColorClassName = `bg-color-${flip ? textColor : bgColor}`;
  return { textColorClassName, bgColorClassName };
};

export default getColorContrast;
