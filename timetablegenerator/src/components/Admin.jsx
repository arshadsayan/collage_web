import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle"; //bootstrap.bundle.min.js / bootstrap.bundle.js

import "./Admin.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
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
  const data = [
    {
      id: 1,
      name: "Mark",
      applicationNumber: "218731982",
      admissionType: "CAP",
    },
    {
      id: 2,
      name: "John",
      applicationNumber: "218731983",
      admissionType: "Institute-level",
    },
    {
      id: 3,
      name: "Jane",
      applicationNumber: "218731984",
      admissionType: "CAP",
    },
    {
      id: 4,
      name: "Alice",
      applicationNumber: "218731985",
      admissionType: "CAP",
    },
    {
      id: 5,
      name: "Bob",
      applicationNumber: "218731986",
      admissionType: "Institute-level",
    },
    {
      id: 6,
      name: "Charlie",
      applicationNumber: "218731987",
      admissionType: "Institute-level",
    },
    {
      id: 7,
      name: "David",
      applicationNumber: "218731988",
      admissionType: "CAP",
    },
    {
      id: 8,
      name: "Eve",
      applicationNumber: "218731989",
      admissionType: "CAP",
    },
    {
      id: 9,
      name: "Frank",
      applicationNumber: "218731990",
      admissionType: "Institute-level",
    },
    {
      id: 10,
      name: "Grace",
      applicationNumber: "218731991",
      admissionType: "CAP",
    },
    {
      id: 11,
      name: "Hannah",
      applicationNumber: "218731992",
      admissionType: "Institute-level",
    },
    {
      id: 12,
      name: "Ivy",
      applicationNumber: "218731993",
      admissionType: "Institute-level",
    },
    {
      id: 13,
      name: "Jack",
      applicationNumber: "218731994",
      admissionType: "Institute-level",
    },
    {
      id: 14,
      name: "Kevin",
      applicationNumber: "218731995",
      admissionType: "CAP",
    },
    {
      id: 15,
      name: "Laura",
      applicationNumber: "218731996",
      admissionType: "CAP",
    },
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

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Application number</th>
              <th scope="col">
                Admission Type :
                <div className="dropdown dropdown-btn admissionSelectButton">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle AdmissionSelect"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {AdmissionType}
                    </button>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item" onClick={AdmissionTypeCAP}>
                        CAP
                      </li>
                      <li
                        className="dropdown-item"
                        onClick={AdmissionTypeInstitute}
                      >
                        Institute Level
                      </li>
                      <li className="dropdown-item" onClick={AdmissionTypeAll}>
                        All
                      </li>
                    </ul>
                  </div>
                </div>
              </th>
              <th scope="col">Verify</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              if ( AdmissionType === "All") {
                return (
                  <tr key={row.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{row.name}</td>
                    <td>{row.applicationNumber}</td>
                    <td>{row.admissionType}</td>
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
              else if (row.admissionType === AdmissionType) {
                return (
                  <tr key={row.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{row.name}</td>
                    <td>{row.applicationNumber}</td>
                    <td>{row.admissionType}</td>
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
            }
            

            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Admin;
