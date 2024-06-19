import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DownloadPDFButton = () => {
  const downloadPDF = () => {
    const input = document.getElementById('pdf-content');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;
      
      // Custom page height to fit all content on one page
      const pdf = new jsPDF('p', 'mm', [imgWidth, imgHeight]);

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('admission-form.pdf');
    }).catch((error) => {
      console.error('Error generating PDF: ', error);
    });
  };

  return (
    <div className="buttons">
      <button onClick={downloadPDF} style={{ border: '1px solid #E28C41' }}>Download Form as PDF</button>
    </div>
  );
};

export default DownloadPDFButton;
