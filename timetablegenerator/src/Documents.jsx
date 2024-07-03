import React, {useState, useEffect} from 'react';
import './doc.css';

const back_url = "http://localhost:3001";

function Documents() {
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [feeStructure, setFeeStructure] = useState(null);
    const [dse, setDse] = useState('NO');

    useEffect(() => {
        // Fetch available years from the backend
        fetch(`${back_url}/api/years`)
          .then(response => response.json())
          .then(data => {
            //console.log('Years received from server:', data);
            setYears(data);
          })
          .catch(error => console.error('Error fetching years:', error));
    }, []);

    useEffect(() => {
        if (selectedYear) {
            const yearToFetch = dse === 'YES' ? selectedYear - 1 : selectedYear;
            fetch(`${back_url}/api/fee-structure/${yearToFetch}`)
              .then(response => response.json())
              .then(data => {
                //console.log('Fee structure received from server:', data);
                setFeeStructure(data);
              })
              .catch(error => {
                console.error('Error fetching fee structure:', error);
                setFeeStructure(null);
              });
        }
    }, [selectedYear, dse]);

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    const handleDseChange = (event) => {
        setDse(event.target.value);
    };

  return (
    <div className="container-doc">
        <h1 className="center page-heading">Documents Required</h1>

        <table className="doc-req">
            <thead>
            <tr>
                <th>Sr. No.</th>
                <th>Types of Candidates</th>
                <th>Copies of documents to be produced along with Application Form for Admission</th>
                <th>Required</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Passing of SSC/ICSE/CBSE/Std. X Examination</td>
                    <td>
                        <ul>
                            <li>Marksheet</li>
                            <li>Migration certificate</li>
                        </ul>
                    </td>
                    <td>MANDATORY</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Linguistic Minority(Tamil)</td>
                    <td>
                        <ul>
                            <li>Minority Affidavit</li>
                        </ul>
                    </td>
                    <td>(Only applicable if mother tongue is not mentioned on 12th LC as Tamil)</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Mark sheet at the qualifying examination HSC (Std. XII)</td>
                    <td>
                        <ul>
                            <li>Leaving certificate</li>
                            <li>Marksheet</li>

                        </ul>
                    </td>
                    <td>MANDATORY</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Mark sheet at the qualifying examination(Std. XII ICSE, CBSE, ISC)</td>
                    <td>
                        <ul>
                            <li>Leaving certificate</li>
                            <li>Migration Certificate</li>
                            <li>Marksheet</li>

                        </ul>
                    </td>
                    <td>MANDATORY</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>CET</td>
                    <td>MHT-CET Score Card </td>
                    <td>MANDATORY</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>JEE</td>
                    <td> JEE Main Score Card  </td>
                    <td>MANDATORY</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>CAP</td>
                    <td>CAP Allotment Letter </td>
                    <td>MANDATORY</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>Diploma (Direct Second Year Admission)</td>
                    <td>
                        <ul>
                            <li>Provisional Certificate</li>
                            <li>college leaving certificate</li>
                            <li>All Marksheets of Diploma</li>
                            <li>Migration Certificate</li>
                        </ul>
                    </td>
                    <td>MANDATORY</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>GAP</td>
                    <td>Affidavit Certificate Required</td>
                    <td>MANDATORY</td>
                </tr>
                <tr>
                    <td>10</td>
                    <td>Caste</td>
                    <td>Candidates belonging to S.C./S.T.
                    <ul>
                        <li>Caste/Tribe Certificate</li>
                        <li>Caste/Tribe Validity Certificate</li>
                        <li>Income Certificate</li>
                    </ul>
                    </td>
                    
                    <td>MANDATORY</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>Candidates belonging to VJ/DT-NT(A)/
NT(B) / NT(C) /NT(D) /O.B.C/ SBC
                    <ul>
                        <li>Caste Certificate</li>
                        <li>Caste Validity Certificate</li>
                        <li>Income Certificate</li>
                        <li>Non creamy layer certificate</li>
                    </ul>
                    </td>
                    
                    <td>MANDATORY</td>
                    </tr>
                
                <tr>
                    <td>11</td>
                    <td>Economically WeakerSection (EWS) Candidate </td>
                    <td>Eligibility Certificate for Economically Weaker Section</td>
                    <td>MANDATORY</td>
                </tr>
                <tr>
                    <td>12</td>
                    <td>TFWS candidates</td>
                    <td>Income certificate</td>
                    <td>MANDATORY</td>
                </tr>
                <tr>
                    <td>13</td>
                    <td>Domicile Certificate</td>
                    <td>Domicile Certificate</td>
                    <td>MANDATORY</td>
                </tr>
            </tbody>
        </table>
        <h2 className="center page-heading" style={{ fontSize: '20px'}}>All the documents should be scanned (PDF) or in photo format (JPEG,PNG) and it should be under 250KB</h2>
        <div>
        <h1 className="center page-heading">FEE Details</h1>
        <div className="input-field">
        <label>
          Select Year:
          <select className="dropdown-field" value={selectedYear} onChange={handleYearChange}>
            <option value="" disabled selected>Select Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
        </div>
        <div className="input-field">
        <label>
          Direct Second-Year Engineering(DSE):
          <select value={dse} className="dropdown-field" onChange={handleDseChange}>
            <option value="NO">NO</option>
            <option value="YES">YES</option>
          </select>
        </label>
        </div>
      </div>
      {feeStructure && (
        <div>
          <h2>Fee Structure for {dse === 'YES' ? selectedYear - 1 : selectedYear}</h2>
          <h5>(Note for DSE : DSE students are supposed to pay one year prior fee hence previous years fee is displayed.)</h5>
          <p>Tuition Fee: {feeStructure.tuition_fee}/-</p>
          <p>Development Fee: {feeStructure.development_fee}/-</p>
          <p>Exam Fee: {feeStructure.exam_fee}/-</p>
          <p>Miscellaneous Fee: {feeStructure.misc_fee}/-</p>
          <h3><b>Total Fee: {feeStructure.tuition_fee + feeStructure.development_fee + feeStructure.exam_fee + feeStructure.misc_fee}/-</b></h3>
        </div>
      )}
    </div>
    
  )
}

export default Documents;