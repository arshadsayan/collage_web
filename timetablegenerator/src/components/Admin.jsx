import "bootstrap/dist/css/bootstrap.min.css";
import './Admin.css'
import React  from "react";
import { useNavigate } from 'react-router-dom';

function Admin() {
  const data = [
    { id: 1, name: 'Mark', applicationNumber: '218731982' },
    { id: 2, name: 'John', applicationNumber: '218731983' },
    { id: 3, name: 'Jane', applicationNumber: '218731984' },
    { id: 4, name: 'Alice', applicationNumber: '218731985' },
    { id: 5, name: 'Bob', applicationNumber: '218731986' },
    { id: 6, name: 'Charlie', applicationNumber: '218731987' },
    { id: 7, name: 'David', applicationNumber: '218731988' },
    { id: 8, name: 'Eve', applicationNumber: '218731989' },
    { id: 9, name: 'Frank', applicationNumber: '218731990' },
    { id: 10, name: 'Grace', applicationNumber: '218731991' },
    { id: 11, name: 'Hannah', applicationNumber: '218731992' },
    { id: 12, name: 'Ivy', applicationNumber: '218731993' },
    { id: 13, name: 'Jack', applicationNumber: '218731994' },
    { id: 14, name: 'Kevin', applicationNumber: '218731995' },
    { id: 15, name: 'Laura', applicationNumber: '218731996' }
  ];

    const navigate = useNavigate();
    const docVerificationPage = (name, applicationNumber) => navigate('/documentverification ', {state : {name,applicationNumber}})
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
            <th scope="col">Verify</th>
          </tr>
        </thead>
        <tbody>
        {data.map((row, index) => (
          <tr key={row.id}>
            <th scope="row">{index + 1}</th>
            <td>{row.name}</td>
            <td>{row.applicationNumber}</td>
            <td>
              <button
                type="button"
                onClick={docVerificationPage(row.name,row.applicationNumber)}
                className="btn verify-btn"
              >
                Verify
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
      
    </>
  );
}

export default Admin;
