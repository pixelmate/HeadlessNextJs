const openPdf = (selectedPdf: string) => {
  if (selectedPdf.endsWith('.pdf')) {
    window.open(selectedPdf, '_blank');
  }
};

export default openPdf;
