import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./DocVerification.css";
import DocumentViewerComponent from "./DocumentViewerComponent";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import PreviewModal from "./PreviewModal";




function DocVerification() {
  const location = useLocation();
//   const { name, code } = location.state || {};
  let [showModal, setShowModal] = useState(false);
  const setmodaltrue = ()=>{
    setShowModal(true);
  }
  const setmodalfalse = ()=>{
    setShowModal(false);
  }

  function PreviewModal(){
    
    const ApproveDoc = ()=>{
        console.log("Document approved");
    }
    const RejectDoc = ()=>{
        console.log("Document rejected");
    }
    return (
        <>
        <div className="modal-wrapper">
            <div className="modal">
                <div className="row">
                    <button type="button" onClick={setmodalfalse} class="btn btn-secondary">Back</button>
                </div>
                <div className="row">
                <img src="https://picsum.photos/200/300" className="img-fluid" alt="..."/>
                </div>
                <div className="row">
                    <div className="col">
                    <button type="button" onClick={ApproveDoc} class="btn btn-success">Approve</button>
                    </div>
                    <div className="col">
                    <button type="button" onClick={RejectDoc} class="btn btn-danger">Reject</button>
                    </div>
                </div>
                
            </div>
        </div>
          
        </>
    )
}



  

  const data = [
    { id: 1, name: "HSC Marksheet", preview: "This is the preview of Document 1" },
    { id: 2, name: "10th Marksheet", preview: "This is the preview of Document 2" },
    { id: 3, name: "CET Marksheet", preview: "This is the preview of Document 3" },
    { id: 4, name: "JEE Marksheet", preview: "This is the preview of Document 4" },
    { id: 5, name: "Minority Certificate", preview: "This is the preview of Document 5" },
  ];
  
  const handleApprove = (id) => {
    console.log(`Approved document with ID: ${id}`);
    // Add your logic for handling approval here
  };
  const handleReject = (id) => {
    console.log(`Rejected document with ID: ${id}`);
    // Add your logic for handling rejection here
  };

  return (
    <>
      <div className="title">
        <h2>Approve Documents</h2>
      </div>
      <div className="documents-container">
        <div className="row verify-row1">
          <div className="col-1 verify-col">
            <div className="row">
              <img src="" alt="Profile pic" />
            </div>
    
          </div>
          <div className="col-9 verify-col2">
            <div className="row verify-row2">
              <div className="col">Name : Mark Henry</div>
              <div className="col">Email : markhenry2020@gmail.com</div>
              <div className="col">Mobile number : 9812367212</div>
            </div>
            <div className="row verify-row2">
              <div className="col">Application number : 23812912</div>
              <div className="col">JEE seatnumber : ADSA12133</div>
              <div className="col">CET seatnumber : BCK123129</div>
            </div>
            <div className="row verify-row2">
              <div className="col">Annual Income : 600000 - 800000</div>
              <div className="col">Minority : Yes</div>
              <div className="col">CET seatnumber : BCK123129</div>
            </div>
          </div>
        </div>
        <div className="row doc-row">
          <table className="table table-bordered">
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  
                  <td>
                    
                      <DocumentViewerComponent/>  
                    
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success approve"
                      onClick={() => handleApprove(row.id)}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger reject"
                      onClick={() => handleReject(row.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
        {showModal && <PreviewModal/>}
        
      </div>
      
    </>
  );
}

export default DocVerification;
