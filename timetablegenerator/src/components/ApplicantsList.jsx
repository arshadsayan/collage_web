import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle"; //bootstrap.bundle.min.js / bootstrap.bundle.js



import "./ApplicantsList.css";
import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function ApplicantsList() {

  


  

  const [AdmissionType, setAdmissionType] = useState("All");
  const AdmissionTypeCAP = () => {
    setAdmissionType("CAP");
  };
  const AdmissionTypeInstitute = () => {
    setAdmissionType("Institute-level");
  };
  const AdmissionTypeAll = () => {
    setAdmissionType("All");
  };


  const [Class, setClass] = useState("FE");
  const setClassFE = ()=>{
    setClass("FE");
  };
  const setClassSE = ()=>{
    setClass("SE");
  };
  const setClassTE = ()=>{
    setClass("TE");
  };
  const setClassBE = ()=>{
    setClass("BE");
  };


  const [DocStatus, setDocStatus] = useState("Not Approved");
  const setDocStatusApproved = ()=>{
    setDocStatus("Approved");
  };
  const setDocStatusDisapproved = ()=>{
    setDocStatus("Not Approved");
  };

  const [TransactionStatus, setTransactionStatus] = useState("Pending");
  const setTransactionStatusCompleted = ()=>{
    setTransactionStatus("Completed");
  }
  const setTransactionStatusPending = ()=>{
    setTransactionStatus("Pending");
  }
////
  const [data2, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/data')
      .then((response) => {
        setData(response.data);
        console.log(data2);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const data = [
      {
          uid: "X7D8J2LK3H4S",
          id: 1,
          name: "Chinaswami Muthuswami Iyer",
          applicationNumber: "218731982",
          admissionType: "CAP",
          DocStatus: "Approved",
          TransactionStatus: "Completed"
      },
      {
          uid: "G8J2K3F1L5N7",
          id: 2,
          name: "John",
          applicationNumber: "218731983",
          admissionType: "Institute-level",
          DocStatus: "Not approved",
          TransactionStatus: "Pending"
      },
      {
          uid: "M4P1S2H3D6J9",
          id: 3,
          name: "Jane",
          applicationNumber: "218731984",
          admissionType: "CAP",
          DocStatus: "Approved",
          TransactionStatus: "Completed"
      },
      {
          uid: "N6D3K4J7L2S5",
          id: 4,
          name: "Alice",
          applicationNumber: "218731985",
          admissionType: "CAP",
          DocStatus: "Not approved",
          TransactionStatus: "Pending"
      },
      {
          uid: "P9J2H3D6K1L8",
          id: 5,
          name: "Bob",
          applicationNumber: "218731986",
          admissionType: "Institute-level",
          DocStatus: "Approved",
          TransactionStatus: "Completed"
      },
      {
          uid: "L7N2S1D3K6J8",
          id: 6,
          name: "Charlie",
          applicationNumber: "218731987",
          admissionType: "Institute-level",
          DocStatus: "Not approved",
          TransactionStatus: "Pending"
      },
      {
          uid: "K5D3J2N7L4S1",
          id: 7,
          name: "David",
          applicationNumber: "218731988",
          admissionType: "CAP",
          DocStatus: "Approved",
          TransactionStatus: "Completed"
      },
      {
          uid: "S9J2K3L1D6N8",
          id: 8,
          name: "Eve",
          applicationNumber: "218731989",
          admissionType: "CAP",
          DocStatus: "Not approved",
          TransactionStatus: "Pending"
      },
      {
          uid: "H3D2J6N1L5K7",
          id: 9,
          name: "Frank",
          applicationNumber: "218731990",
          admissionType: "Institute-level",
          DocStatus: "Approved",
          TransactionStatus: "Completed"
      },
      {
          uid: "K7L1D3N2S5J8",
          id: 10,
          name: "Grace",
          applicationNumber: "218731991",
          admissionType: "CAP",
          DocStatus: "Not approved",
          TransactionStatus: "Pending"
      },
      {
          uid: "L9D2J3K1S6N8",
          id: 11,
          name: "Hannah",
          applicationNumber: "218731992",
          admissionType: "Institute-level",
          DocStatus: "Approved",
          TransactionStatus: "Completed"
      },
      {
          uid: "S1D3K2J6N9L5",
          id: 12,
          name: "Ivy",
          applicationNumber: "218731993",
          admissionType: "Institute-level",
          DocStatus: "Not approved",
          TransactionStatus: "Pending"
      },
      {
          uid: "N5D3L1J2S6K8",
          id: 13,
          name: "Jack",
          applicationNumber: "218731994",
          admissionType: "Institute-level",
          DocStatus: "Approved",
          TransactionStatus: "Completed"
      },
      {
          uid: "K1D3L2N7S5J8",
          id: 14,
          name: "Kevin",
          applicationNumber: "218731995",
          admissionType: "CAP",
          DocStatus: "Not approved",
          TransactionStatus: "Pending"
      },
      {
          uid: "S6J1K2D3N8L5",
          id: 15,
          name: "Laura",
          applicationNumber: "218731996",
          admissionType: "CAP",
          DocStatus: "Approved",
          TransactionStatus: "Completed"
      },
      {
          uid: "K9J2D1L3N6S5",
          id: 16,
          name: "Megan",
          applicationNumber: "218731997",
          admissionType: "CAP",
          DocStatus: "Not approved",
          TransactionStatus: "Pending"
      },
      {
          uid: "N8L1D3K2S6J5",
          id: 17,
          name: "Nina",
          applicationNumber: "218731998",
          admissionType: "Institute-level",
          DocStatus: "Approved",
          TransactionStatus: "Completed"
      },
      {
          uid: "J1D2K3L9N6S5",
          id: 18,
          name: "Oliver",
          applicationNumber: "218731999",
          admissionType: "CAP",
          DocStatus: "Not approved",
          TransactionStatus: "Pending"
      },
      {
          uid: "S3L1D2K9N6J5",
          id: 19,
          name: "Pam",
          applicationNumber: "218732000",
          admissionType: "Institute-level",
          DocStatus: "Approved",
          TransactionStatus: "Completed"
      },
      {
          uid: "N1D3K2L7S6J5",
          id: 20,
          name: "Quinn",
          applicationNumber: "218732001",
          admissionType: "CAP",
          DocStatus: "Not approved",
          TransactionStatus: "Pending"
      },
      {
          uid: "K7L1J2D3S5N8",
          id: 21,
          name: "Rachel",
          applicationNumber: "218732002",
          admissionType: "CAP",
          DocStatus: "Approved",
          TransactionStatus: "Completed"
      },
      {
          uid: "D1J2K3L6S7N8",
          id: 22,
          name: "Sam",
          applicationNumber: "218732003",
          admissionType: "Institute-level",
          DocStatus: "Not approved",
          TransactionStatus: "Pending"
      },
      {
          uid: "S1N2L3J6K7D8",
          id: 23,
          name: "Tina",
          applicationNumber: "218732004",
          admissionType: "CAP",
          DocStatus: "Approved",
          TransactionStatus: "Completed"
      },
      {
          uid: "L7K1D2J3N6S5",
          id: 24,
          name: "Uma",
          applicationNumber: "218732005",
          admissionType: "Institute-level",
          DocStatus: "Not approved",
          TransactionStatus: "Pending"
      },
      {
          uid: "N1J2D3L6K7S5",
          id: 25,
          name: "Vera",
          applicationNumber: "218732006",
          admissionType: "CAP",
          DocStatus: "Approved",
          TransactionStatus: "Completed"
      },
      {
          uid: "A1B2C3D4E5F6",
          id: 26,
          name: "Will",
          applicationNumber: "218732007",
          admissionType: "Institute-level",
          DocStatus: "Not approved",
          TransactionStatus: "Pending"
      },
      {
          uid: "G5H6I7J8K9L0",
          id: 27,
          name: "Xander",
          applicationNumber: "218732008",
          admissionType: "CAP",
          DocStatus: "Approved",
          TransactionStatus: "Completed"
      },
      {
          uid: "P1Q2R3S4T5U6",
          id: 28,
          name: "Yara",
          applicationNumber: "218732009",
          admissionType: "Institute-level",
          DocStatus: "Not approved",
          TransactionStatus: "Pending"
      },
      {
          uid: "V7W8X9Y0Z1A2",
          id: 29,
          name: "Zane",
          applicationNumber: "218732010",
          admissionType: "CAP",
          DocStatus: "Approved",
          TransactionStatus: "Pending"
      },
      {
          uid: "B3C4D5E6F7G8",
          id: 30,
          name: "Aaron",
          applicationNumber: "218732011",
          admissionType: "Institute-level",
          DocStatus: "Approved",
          TransactionStatus: "Pending"
      },
      {
          uid: "H1I2J3K4L5M6",
          id: 31,
          name: "Bella",
          applicationNumber: "218732012",
          admissionType: "CAP",
          DocStatus: "Approved",
          TransactionStatus: "Completed"
      },
      {
          uid: "N7O8P9Q0R1S2",
          id: 32,
          name: "Caleb",
          applicationNumber: "218732013",
          admissionType: "Institute-level",
          DocStatus: "Not approved",
          TransactionStatus: "Pending"
      },
      {
          uid: "T3U4V5W6X7Y8",
          id: 33,
          name: "Diana",
          applicationNumber: "218732014",
          admissionType: "CAP",
          DocStatus: "Approved",
          TransactionStatus: "Completed"
      },
      {
          uid: "F9G0H1I2J3K4",
          id: 34,
          name: "Eli",
          applicationNumber: "218732015",
          admissionType: "Institute-level",
          DocStatus: "Not approved",
          TransactionStatus: "Pending"
      },
      {
          uid: "L5M6N7O8P9Q0",
          id: 35,
          name: "Fiona",
          applicationNumber: "218732016",
          admissionType: "CAP",
          DocStatus: "Approved",
          TransactionStatus: "Pending"
      }
  ];

  const navigate = useNavigate();
  const navigateToDocVerification = () => {
    navigate("/documentverification");
  };

  const docVerificationPage = (name, applicationNumber) =>
    navigate("/documentverification ", { state: { name, applicationNumber } });

  return (
    <>
      <div className="title">
        <h2>Applicants list</h2>
      </div>

      <div className="search-container">
        <div className="row search-bar-row">
          <div className="col-1">
            <div className="col-1 search-bar-icon "> <b>Search</b></div>
          </div>
          <div className="col-10">
            <div className="row ">
              <div className="row admissionSelectButton">
                <div className="col-6 row1col1 ">
                  <div className="row">
                    <div className="col-4">Admission Type </div>
                    <div className="col-8">
                      <div className="dropdown dropdown-btn |">
                        <div className="dropdown SelectButton">
                          <button
                            className="btn btn-secondary dropdown-toggle typeSelect"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {AdmissionType}
                          </button>
                          <ul className="dropdown-menu">
                            <li
                              className="dropdown-item"
                              onClick={AdmissionTypeCAP}
                            >
                              CAP
                            </li>
                            <li
                              className="dropdown-item"
                              onClick={AdmissionTypeInstitute}
                            >
                              Institute Level
                            </li>
                            <li
                              className="dropdown-item"
                              onClick={AdmissionTypeAll}
                            >
                              All
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 row1col1">
                  <div className="row">
                    <div className="col-4">Select Class</div>
                    <div className="col-8">
                      <div className="dropdown dropdown-btn SelectButton">
                        <div className="dropdown SelectButton">
                          <button
                            className="btn btn-secondary dropdown-toggle typeSelect"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {Class}
                          </button>
                          <ul className="dropdown-menu">
                            <li
                              className="dropdown-item"
                              onClick={setClassFE}
                            >
                              FE
                            </li>
                            <li
                              className="dropdown-item"
                              onClick={setClassSE}
                            >
                              SE
                            </li>
                            <li
                              className="dropdown-item"
                              onClick={setClassTE}
                            >
                              TE
                            </li>
                            <li
                              className="dropdown-item"
                              onClick={setClassBE}
                            >
                              BE
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row ">
              <div className="row admissionSelectButton">
                <div className="col-6 row1col1 admission-type">
                  <div className="row">
                    <div className="col-4">Documents Approved</div>
                    <div className="col-8">
                      <div className="dropdown dropdown-btn ">
                        <div className="dropdown SelectButton">
                          <button
                            className="btn btn-secondary dropdown-toggle typeSelect"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {DocStatus}
                          </button>
                          <ul className="dropdown-menu">
                            <li
                              className="dropdown-item"
                              onClick={setDocStatusApproved}
                            >
                              Approved
                            </li>
                            <li
                              className="dropdown-item"
                              onClick={setDocStatusDisapproved}
                            >
                              Not Approved
                            </li>
                            
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 row1col1">
                  <div className="row">
                    <div className="col-4">Transaction approved</div>
                    <div className="col-8">
                      <div className="dropdown dropdown-btn ">
                        <div className="dropdown SelectButton">
                          <button
                            className="btn btn-secondary dropdown-toggle typeSelect"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {TransactionStatus}
                          </button>
                          <ul className="dropdown-menu">
                            <li
                              className="dropdown-item"
                              onClick={setTransactionStatusCompleted}
                            >
                              Completed
                            </li>
                            <li
                              className="dropdown-item"
                              onClick={setTransactionStatusPending}
                            >
                              Pending
                            </li>
                           
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">UID</th>
              <th scope="col">Name</th>
              <th scope="col">Application number</th>
              <th scope="col">Admission Type</th>
              <th scope="col">Document Status</th>
              <th scope="col">Transaction status</th>
              <th scope="col">Verify</th>
            </tr>
          </thead>
          <tbody>
            {data2.map((row, index) => {
              // if (AdmissionType === "All") {
                if(row.documentsApproved === DocStatus){
                  if(row.transactionApproved === TransactionStatus){
                    return (
                      <tr key={row.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{row.id}</td>
                        <td>{row.fullname}</td>
                        <td>{row.cet_application_id}</td>
                        <td>Brochure Institute Level</td>
                        <td>{row.documentsApproved}</td>
                        <td>{row.transactionApproved}</td>
                        
                        <td>
                          <button
                            type="button"
                            onClick={navigateToDocVerification}
                            className="btn verify-btn"
                          >
                            Verify
                          </button>
                        </td>
                      </tr>
                    );
                  }
                }
              // } 
              // else if (row.admissionType === AdmissionType) {
                else if(row.DocStatus === DocStatus){
                  if(row.TransactionStatus === TransactionStatus){
                    return (
                      <tr key={row.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{row.uid}</td>
                        <td>{row.name}</td>
                        <td>{row.applicationNumber}</td>
                        <td>{row.admissionType}</td>
                        <td>{row.DocStatus}</td>
                        <td>{row.TransactionStatus}</td>
                        
                        <td>
                          
                          <button
                            type="button"
                            onClick={navigateToDocVerification}
                            className="btn verify-btn"
                          >
                            Verify
                          </button>
                        </td>
                      </tr>
                    );
                  }
                }
                
              // }
              // else if (row.admissionType === "Institute Level") {
              //   return (
              //     <tr key={row.id}>
              //       <th scope="row">{index + 1}</th>
              //       <td>{row.name}</td>
              //       <td>{row.applicationNumber}</td>
              //       <td>{row.admissionType}</td>
              //       <td>
              //         <button
              //           type="button"
              //           onClick={navigateToDocVerification}
              //           className="btn verify-btn"
              //         >
              //           Verify
              //         </button>
              //       </td>
              //     </tr>
              //   );
              // }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ApplicantsList;
