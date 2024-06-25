import React from 'react';
import './doc.css';

function Documents() {
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
                    <td> JEE –Main Score Card  </td>
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
        <h2 className="center page-heading" style={{ fontSize: '30px'}}>All the documents should be scanned (PDF) or in photo format (JPEG,PNG) and it should be under 250KB</h2>
        
    </div>
    
  )
}

export default Documents;