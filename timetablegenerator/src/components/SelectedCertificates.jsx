import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DownloadPDFButton from './DownloadPDFButton';
import './SelectedCertificates.css'; // Import the CSS file for styling

const SelectedCertificates = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCertificates = [], uidtoSend, fullName } = location.state || {};
  
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "12th Marksheet",
      dbcol: "marksheet12",
      preview: "This is the preview of Document 1",
    },
    {
      id: 2,
      name: "10th Marksheet",
      dbcol: "marksheet10",
      preview: "This is the preview of Document 2",
    },
    {
      id: 3,
      name: "CET Marksheet",
      dbcol: "cetMarksheet",
      preview: "This is the preview of Document 3",
    },
    {
      id: 4,
      name: "JEE Marksheet",
      dbcol: "jeeMarksheet",
      preview: "This is the preview of Document 4",
    },
    {
      id: 5,
      name: "Caste Certificate",
      dbcol: "castecertificat",
      preview: "This is the preview of Document 5",
    },
    {
      id: 6,
      name: "Signature",
      dbcol: "signature",
      preview: "This is the preview of Document 6",
    },
    {
      id: 7,
      name: "Domicile Certificate",
      dbcol: "domicilecert",
      preview: "This is the preview of Document 7",
    },
    {
      id: 8,
      name: "Caste Validity",
      dbcol: "castevalidity",
      preview: "This is the preview of Document 8",
    },
    {
      id: 9,
      name: "Non Creamy Layer",
      dbcol: "noncreamylayer",
      preview: "This is the preview of Document 9",
    },
    {
      id: 10,
      name: "12th Leaving Certificate",
      dbcol: "leavingCertificate12",
      preview: "This is the preview of Document 10",
    },
    {
      id: 11,
      name: "Income Certificate",
      dbcol: "income",
      preview: "This is the preview of Document 11",
    },
    {
      id: 12,
      name: "Passport-size photo",
      dbcol: "photo",
      preview: "This is the preview of Document 12",
    },
    {
      id: 13,
      name: "Other Document",
      dbcol: "other",
      preview: "This is the preview of Document 13",
    },
    {
      id: 14,
      name: "Transaction Proof",
      dbcol: "transactionproof",
      preview: "This is the preview of Document 14",
    },
  ]);
  function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
    const year = today.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  console.log(selectedCertificates);
  console.log(uidtoSend);
  console.log(fullName)


  const [formData, setFormData] = useState({
    id: '',
    studentName: '',
    class: '',
    receiptDate: '',
    BrochureFees: '',
  });

  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  return (
    <div>
      <div id="pdf-content">
        <div className="header">
          <img src='./sieslogo.jpeg' alt='SIES Logo' className="logo" />
          <div className="info">
            <h1>The South Indian Education Society</h1>
            <p>SIES Graduate School of Technology</p>
            <p>Sri Chandrasekarendra Saraswati Vidyapuram Sector-V, Nerul, Navi Mumbai, Maharashtra 400706</p>
            <p>Fee Receipt (Student Copy - Original)</p>
          </div>
        </div>
        <div className='body'>
          <form onSubmit={handleSubmit} style={{ margin: '50px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
              <span style={{ fontWeight: 'bold', flex: '1' }}>User ID : </span>
              <span style={{ flex: '1', textAlign: 'left' }}>{uidtoSend}</span>
              <span style={{ fontWeight: 'bold', flex: '1' }}>Student name : </span>
              <span style={{ flex: '1', textAlign: 'left' }}>{fullName}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
              <span style={{ fontWeight: 'bold', flex: '1' }}>Receipt Date : </span>
              <span style={{ flex: '1', textAlign: 'left' }}>{getCurrentDate()}</span>
              
            </div>
            

              {selectedCertificates.length > 0 ? (
                <table className="certificate-table">
                  <thead>
                    <tr>

                      <th>Submitted Original Documents</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.filter((doc)=> selectedCertificates.includes(doc.dbcol)).map((row) => (
                      <tr >
                        <td>{row.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No certificates selected.</p>
              )}
            <br />
            <br />
            <br />
            <br />
            <br />
            <p>Signature</p>
            <p>(Account by: Vijayalakshami)</p>
          </form>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '50px' }}>
        <DownloadPDFButton formContent={'pdf-content'} />
        <button onClick={() => navigate(-1)} style={{background:' #ff8800',border: 'none', borderRadius:'5px',color:'white' ,fontSize: '16px', marginTop: '20px',width: '200px'}}>Back</button>
      </div>
    </div>
  );
};

export default SelectedCertificates;

