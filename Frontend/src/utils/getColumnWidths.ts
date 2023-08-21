const getColumnWidths = (columnWidth: string, featuredContentPosition: string) => {
  const colWidth = columnWidth.split(',');
  const featuredContentColumn = featuredContentPosition === 'right' ? colWidth[1] : colWidth[0];
  const contextColumn = featuredContentPosition === 'right' ? colWidth[0] : colWidth[1];
  return { featuredContentColumn, contextColumn };
};

export default getColumnWidths;
