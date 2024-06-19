import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./DocVerification.css";
import DocumentViewerComponent from "./DocumentViewerComponent";
import axios from 'axios';

function DocVerification() {
  const location = useLocation();
  const { uidRecieved } = location.state || {};
  
  const [DocVerificationData, setDocVerificationData] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    if (uidRecieved) {
      axios.get(`http://localhost:3001/docverification/${uidRecieved}`)
        .then((response) => {
          setDocVerificationData(response.data);
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch((error) => {
          console.error('There was an error fetching the data!', error);
          setLoading(false); // Set loading to false even if there's an error
        });
    }
  }, [uidRecieved]);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const navigateToReceipt = () => {
    navigate("/receitGeneration");
  };

  // let [showModal, setShowModal] = useState(false);
  // const setmodaltrue = () => {
  //   setShowModal(true);
  // };
  // const setmodalfalse = () => {
  //   setShowModal(false);
  // };

  // function PreviewModal() {
  //   const ApproveDoc = () => {
  //     console.log("Document approved");
  //   };
  //   const RejectDoc = () => {
  //     console.log("Document rejected");
  //   };
  //   return (
  //     <>
  //       <div className="modal-wrapper">
  //         <div className="modal">
  //           <div className="row">
  //             <button
  //               type="button"
  //               onClick={setmodalfalse}
  //               className="btn btn-secondary"
  //             >
  //               Back
  //             </button>
  //           </div>
  //           <div className="row">
  //             <img
  //               src="https://picsum.photos/200/300"
  //               className="img-fluid"
  //               alt="..."
  //             />
  //           </div>
  //           <div className="row">
  //             <div className="col">
  //               <button
  //                 type="button"
  //                 onClick={ApproveDoc}
  //                 className="btn btn-success"
  //               >
  //                 Approve
  //               </button>
  //             </div>
  //             <div className="col">
  //               <button
  //                 type="button"
  //                 onClick={RejectDoc}
  //                 className="btn btn-danger"
  //               >
  //                 Reject
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  const [rejectedDocuments, setRejectedDocuments] = useState([]);

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "12th Marksheet",
      dbcol: "",
      preview: "This is the preview of Document 1",
    },
    {
      id: 2,
      name: "10th Marksheet",
      preview: "This is the preview of Document 2",
    },
    {
      id: 3,
      name: "CET Marksheet",
      preview: "This is the preview of Document 3",
    },
    {
      id: 4,
      name: "JEE Marksheet",
      preview: "This is the preview of Document 4",
    },
    {
      id: 5,
      name: "Minority Certificate",
      preview: "This is the preview of Document 5",
    },
    { id: 6, 
      name: "Signature", 
      preview: "This is the preview of Document 6" },
    {
      id: 7,
      name: "Transaction Proof",
      preview: "This is the preview of Document 7",
    },
    {
      id: 8,
      name: "Domicile",
      preview: "This is the preview of Document 8",
    },
    {
      id: 9,
      name: "Caste Certificate",
      preview: "This is the preview of Document 9",
    },
    {
      id: 10,
      name: "Caste Validity",
      preview: "This is the preview of Document 10",
    },
    {
      id: 11,
      name: "Income Certificate",
      preview: "This is the preview of Document 11",
    },
    {
      id: 12,
      name: "Non Creamy layer",
      preview: "This is the preview of Document 12",
    },
    {
      id: 13,
      name: "Other Document",
      preview: "This is the preview of Document 7",
    },
    
  ]);


  const handlePreview = (nameURL) => {
    axios({
      url: `http://localhost:3001/files/aryaangane@gmail.com/cetMarksheet.pdf`,
      method: 'GET',
      responseType: 'blob', // Ensure response is treated as binary data
    })
      .then((response) => {
        const file = new Blob([response.data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, '_blank');
      })
      .catch((error) => {
        console.error('Error fetching document URL:', error);
        // Handle error as needed
      });
  }

  const handleApprove = (id) => {
    console.log(`Approved document with ID: ${id}`);
  };

  const handleReject = (id) => {
    console.log(`Rejected document with ID: ${id}`);
    setRejectedDocuments([...rejectedDocuments, id]);
  };

  const handleReupload = (id, event) => {
    const file = event.target.files[0];
    console.log(`Reuploaded document with ID: ${id}`, file);

    const updatedDocuments = documents.map((doc) =>
      doc.id === id ? { ...doc, preview: URL.createObjectURL(file) } : doc
    );

    setDocuments(updatedDocuments);
  };

  if (loading) {
    return <div>Loading...</div>; // Render loading state while fetching data
  }

  if (DocVerificationData.length === 0) {
    return <div>No data available</div>; // Render a message if there's no data
  }

  return (
    <>
      <div className="title">
        <div className="row">
          <div className="col-2">
            <button
              type="button"
              onClick={handleBackClick}
              className="btn backbtn"
            >
              Back
            </button>
          </div>
          <div className="col-10">
            <h2>Approve Documents</h2>
          </div>
        </div>
      </div>
      <div className="documents-container">
        <div className="row verify-row1">
          <div className="col-1 verify-col">
            <img
              className="img-style"
              src="C:\Users\Arya\OneDrive\Documents\GitHub\T-G\timetablegenerator\documents\student pic.jpeg"
              alt="Profile pic"
            />
          </div>
          <div className="col-9 verify-col2">
            <div className="row verify-row2">
              <div className="col">
                <b>Name</b>: {DocVerificationData[0].fullname}
              </div>
              <div className="col">
                <b>Email</b>: {DocVerificationData[0].email}
              </div>
              <div className="col">
                <b>Mobile number</b>: {DocVerificationData[0].mobile_number}
              </div>
            </div>
            <div className="row verify-row2">
              <div className="col">
                <b>Application number</b>: 1718437327903
              </div>
              <div className="col">
                <b>JEE seat number</b>: {DocVerificationData[0].jee_application_number}
              </div>
              <div className="col">
                <b>CET seat number</b>: {DocVerificationData[0].cet_application_id}
              </div>
            </div>
            <div className="row verify-row2">
              <div className="col">
                <b>Annual Income</b>: {DocVerificationData[0].annual_income}
              </div>
              <div className="col">
                <b>Category</b>: {DocVerificationData[0].category}
              </div>
              <div className="col">
                <b>Applied TFWS</b>: No
              </div>
            </div>
          </div>
        </div>
        <div className="doc-container">
          {documents.map((row) => (
            
            <div className="row doc-row" key={row.id}>
              <div className="col arbtn">
                <b>{row.name}</b>
              </div>
              <div className="col">
                <button
                  className="btn arbtn preview-btn"
                  onClick={() =>{handlePreview()} }
                >
                  Preview
                </button>
              </div>
              <div className="col">
                <div className="row btn-row">
                  <button
                    type="button"
                    className="btn btn-success arbtn"
                    onClick={() => handleApprove(row.id)}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger arbtn"
                    onClick={() => handleReject(row.id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
              {rejectedDocuments.includes(row.id) && (
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile02"
                    onChange={(event) => handleReupload(row.id, event)}
                  />
                  <label className="input-group-text" for="inputGroupFile02">
                    Upload
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="generate-receipt">
          <div className="row">
            <button className="btn receipt-btn" onClick={navigateToReceipt}>
              Generate Receipt
            </button>
          </div>
        </div>
      </div>
      {/* {showModal && <PreviewModal />} */}
    </>
  );
}

export default DocVerification;
