import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DownloadPDFButton = ({ formContent }) => {
  const downloadPDF = () => {
    // Capture entire document body
    const input = document.body;

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210; // mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('entire-page.pdf');
      });
  };

  return (
    <button onClick={downloadPDF} style={{ background: '#E28C41', border: '1px solid #E28C41' }}>Download Entire Page as PDF</button>
  );
};

export default DownloadPDFButton;
