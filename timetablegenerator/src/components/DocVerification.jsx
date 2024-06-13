import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./DocVerification.css";
import DocumentViewerComponent from "./DocumentViewerComponent";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import PreviewModal from "./PreviewModal";




function DocVerification() {
  const location = useLocation();
  const navigate = useNavigate();


  const navigateToReceipt = ()=>{
    navigate('/receitGeneration')
  }
//   const { name, code } = location.state || {};
  let [showModal, setShowModal] = useState(false);
  const setmodaltrue = ()=>{
    setShowModal(true);
  }
  const setmodalfalse = ()=>{
    setShowModal(false);
  }

  // const GenerateReceipt = ()=>{

  // }

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
    { id: 1, name: "12th Marksheet", preview: "This is the preview of Document 1" },
    { id: 2, name: "10th Marksheet", preview: "This is the preview of Document 2" },
    { id: 3, name: "CET Marksheet", preview: "This is the preview of Document 3" },
    { id: 4, name: "JEE Marksheet", preview: "This is the preview of Document 4" },
    { id: 5, name: "Minority Certificate", preview: "This is the preview of Document 5" },
    { id: 6, name: "Signature", preview: "This is the preview of Document 6" },
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
              <img  className="img-style" src="C:\Users\Arya\OneDrive\Documents\GitHub\T-G\timetablegenerator\documents\student pic.jpeg" alt="Profile pic" />
          </div>
          <div className="col-9 verify-col2">
            <div className="row verify-row2">
              <div className="col"><b>Name</b> : Mark Henry</div>
              <div className="col"><b>Email</b> : markhenry2020@gmail.com</div>
              <div className="col"><b>Mobile number</b> : 9812367212</div>
            </div>
            <div className="row verify-row2">
              <div className="col"><b>Application number</b> : 23812912</div>
              <div className="col"><b>JEE seatnumber</b> : ADSA12133</div>
              <div className="col"><b>CET seatnumber</b> : BCK123129</div>
            </div>
            <div className="row verify-row2">
              <div className="col"><b>Annual Income</b> : 600000 - 800000</div>
              <div className="col"><b>Minority</b> : Yes</div>
              <div className="col"><b>Applied TFWS</b> : No</div>
            </div>
          </div>
        </div>
        <div className="doc-container">
          {data.map((row)=>(
            <div className="row doc-row" key={row.id}>
                <div className="col arbtn">
                  <b>{row.name}</b>
                </div>
                <div className="col ">
                <button className="btn  arbtn preview-btn"  >Preview</button>
                </div>
                <div className="col">
                  <div className="row btn-row">
                    <button type="button" class="btn btn-success arbtn">Approve</button>
                    <button type="button" class="btn btn-danger arbtn">Reject</button>
                  </div>
                
                </div>
            </div>
          ))}
        </div>
        <div className="generate-receipt">
          <div className="row">
            <button className="btn  receipt-btn " onClick={navigateToReceipt} >Generate Receipt</button>
          </div>
            
        </div>
          

        </div>
        {showModal && <PreviewModal/>}
        
    
    
    </>
  );
}

export default DocVerification;
