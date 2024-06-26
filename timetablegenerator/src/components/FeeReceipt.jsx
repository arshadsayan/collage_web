import { useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { useReactToPrint } from 'react-to-print';
import './FeeReceipt.css'; // Assuming you have a CSS file for additional styling
import { Form } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function FeeReceipt() {

const currentDate = new Date();

// Extracting components of the date
const year = currentDate.getFullYear(); // Returns the year (e.g., 2024)
const month = currentDate.getMonth() + 1; // Returns the month (0-11, add 1 for January-December)
const day = currentDate.getDate(); // Returns the day of the month (1-31)
const navigate = useNavigate();


// Formatting the date
const formattedDate = `${day}-${month}-${year}`;
  const [formData] = useState({
    rollNo: '222a3065',
    studentName: 'Arshad',
    receiptDate: formattedDate
  });

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'FeeReceipt',
    pageStyle: `
      @page {
        size: auto;
        
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
      }
    `
  });

  return (
    <div>
        <div className="row">
            <div className="col">
            <button type="button" class="btn backbtn "onClick={()=>{navigate('/')}}>Back</button>
            </div>
        </div>
      <div ref={componentRef}>
        <div className="header">
          <img
            src="/sieslogo.jpeg"
            alt="SIES Logo"
            className="logo"
          />
          <div className="info">
            <h1>The South Indian Education Society</h1>
            <p>SIES Graduate School of Technology</p>
            <p>
              Sri Chandrasekarendra Saraswati Vidyapuram Sector-V, Nerul, Navi
              Mumbai, Maharashtra 400706
            </p>
            <p>Fee Receipt (Student Copy - Original)</p>
          </div>
        </div>
        <div className="body">
            <div className="row rowpay2">
                <div className="col colpay">
                        Admission form fees
                </div>
            </div>
          <div className="row rowpay">
            <div className="col colpay">
                User ID : {formData.rollNo}
            </div>
            <div className="col colpay">
                Student Name : {formData.studentName}
            </div>
           
            
          </div>
          <div className="row rowpay">
            <div className="col colpay">
                Receipt Date : {formData.receiptDate}
            </div>
            <div className="col colpay">
                Amount Paid : 2000
            </div>
            
          </div>
            <br />
            <br />
            <br />
            <div className="row rowpay">
                <div className="col colpay">
                <div className="signature">
              <p>Signature</p>
              <p>(Account by : Vijayalakshami )</p>
            </div>
                </div>
            </div>
            
        
        </div>
      </div>
      <div className="row row-send">
        <div className="col col-send">
          <button type="button" className="btn btn-send" onClick={handlePrint}>
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeeReceipt;
