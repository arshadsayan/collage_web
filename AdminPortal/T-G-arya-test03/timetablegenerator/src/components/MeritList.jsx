import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle"; // bootstrap.bundle.min.js / bootstrap.bundle.js

import "./ApplicantsList.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import './MeritList.css'
const back_url = "https://lack-jp-conference-bomb.trycloudflare.com";

function MeritList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${back_url}/meritList`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'MeritList',
    pageStyle: `
      @page {
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
      }
    `,
  });

  return (
    <>
      <div className="title">
        <h2>Merit list</h2>
      </div>
      <div className="table-container" ref={componentRef}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Institute Rank</th>
              <th scope="col">Name</th>
              <th scope="col">CET percentile</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.meritNumber}</td>
                <td>{row.s_id}</td>
                <td>{row.s_cet_per}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col col-pdf">
        <div className="print-button-container">
        <button onClick={handlePrint} className="btn verify-btn ">Generate PDF</button>
      </div>
        </div>
      </div>
      
    </>
  );
}

export default MeritList;