import React from 'react';
import './AdmissionForm.css';
import DownloadPDFButton from './DownloadPDFButton';


import DocumentUpload from './DocumentUpload';

const AdmissionForm = ({ formData, setFormData, filePreviews, setFilePreviews, formData1, userId, setFormData1 }) => {
  
  const dateOfBirth = formData.personalDetails.dateofBirth instanceof Date
    ? formData.personalDetails.dateofBirth.toLocaleDateString()
    : '';



    const formatDate = (date) => {
      const d = new Date(date);
      const day = d.getDate();
      const month = d.getMonth() + 1; // Month is zero based, so we add 1
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };
  
    // Get current system date in dd-mm-yyyy format
    const currentDate = formatDate(new Date());
  
  const {
    personalDetails = {},
    academicDetails = {},
    cetDetails = {},
    documentUpload = {},
    transactionDetails = {},
    preferences = []
  } = formData; 

  return (
    <div id="pdf-content">
      <form className="admission-form">
        <table className="form-table">
          <thead>
            <tr>
              <th colSpan="4">
                <div className="header">
                  <img src="/1.png" alt="SIES Logo" className="logo" />
                  <div className="header-left">
                    <div className="school-info">
                      <h2>SIES Graduate School of Technology</h2>
                      <p>Sri Chandrasekarendra Saraswati Vidyapuram Sector-V, Nerul, Navi Mumbai, Maharashtra 400706</p>
                      <p>Phone: 022 6108 2402</p>
                    </div>
                  </div>
                  <div className="header-right">
                    <img src={filePreviews.photo} alt="Profile" className="profile-photo" />
                    <p>{formData.personalDetails.fullName}</p>
                    <p>{currentDate}</p>
                  </div>
                </div>
              </th>
            </tr>
            <tr>
              <th colSpan="4" className="title">
                <h3>ADMISSIONS (2023-24)</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="label">Name</td>
              <td>{formData.personalDetails.fullName}</td>
              <td className="label">CET Application ID</td>
              <td>{formData.cetDetails.cetappId}</td>
            </tr>
            <tr>
              <td className="label">ID</td>
              <td>{userId}</td>
            </tr>
            <tr>
              <td className="label">Date of Birth</td>
              <td>{dateOfBirth}</td>
            </tr>
            <tr>
              <td className="label">Email Id</td>
              <td>{formData.personalDetails.email}</td>
            </tr>
            <tr>
              <td className="label">Mobile No.</td>
              <td>{formData.personalDetails.mobileNumber}</td>
            </tr>
            <tr>
              <td className="label">Father's Name</td>
              <td>{formData.personalDetails.fathersName}</td>
              <td className="label">Father's Occupation</td>
              <td>{formData.personalDetails.fathersOccupation}</td>
            </tr>
            <tr>
              <td className="label">Mobile No.</td>
              <td>{formData.personalDetails.fathersmobileNumber}</td>
            </tr>
            <tr>
              <td className="label">Mother's Name</td>
              <td>{formData.personalDetails.mothersName}</td>
              <td className="label">Mother's Occupation</td>
              <td>{formData.personalDetails.mothersOccupation}</td>
            </tr>
            <tr>
              <td className="label">Mobile No.</td>
              <td>{formData.personalDetails.mothersmobileNumber}</td>
            </tr>
            <tr>
              <td className="label">Annual Income</td>
              <td>{formData.personalDetails.annualIncome}</td>
            </tr>
            <tr>
              <td className="label">Gender</td>
              <td>{formData.personalDetails.sex}</td>
            </tr>
            <tr>
              <td className="label">Correspondence Address</td>
              <td colSpan="3">{formData.personalDetails.corrAddr}</td>
            </tr>
            <tr>
              <td className="label">State</td>
              <td colSpan="3">{formData.personalDetails.state}</td>
            </tr>
            <tr>
              <td className="label">Permanent Address</td>
              <td colSpan="3">{formData.personalDetails.perAddr}</td>
            </tr>
            <tr>
              <td className="label">State</td>
              <td colSpan="3">{formData.personalDetails.state}</td>
            </tr>
            <tr>
              <td className="label">Area</td>
              <td>{formData.personalDetails.area}</td>
              <td className="label">Nationality</td>
              <td>{formData.personalDetails.nationality}</td>
            </tr>
            <tr>
              <td className="label">Religion</td>
              <td>{formData.personalDetails.religion}</td>
              <td className="label">Category</td>
              <td>{formData.personalDetails.category}</td>
            </tr>
            <tr>
              <td className="label">Domicile</td>
              <td>{formData.personalDetails.domicile}</td>
              <td className="label">Mother Tongue</td>
              <td>{formData.personalDetails.mothersTongue}</td>
            </tr>
            <tr>
              <td className="label">JEE Application No</td>
              <td>{formData.cetDetails.jeeappNum}</td>
              <td className="label">JEE Percentile</td>
              <td>{formData.cetDetails.jeePer}</td>
            </tr>
            <tr className="sub-title">
              <td colSpan="4">CET Details</td>
            </tr>
            <tr>
              <td className="label">CET Roll No</td>
              <td>{formData.cetDetails.cetrollNo}</td>
              <td className="label">CET Maths Percentage</td>
              <td>{formData.cetDetails.cetmathsPer}</td>
            </tr>
            <tr>
              <td className="label">CET Physics Percentage</td>
              <td>{formData.cetDetails.cetphysicsPer}</td>
              <td className="label">CET Chemistry Percentage</td>
              <td>{formData.cetDetails.cetchemistryPer}</td>
            </tr>
            <tr>
              <td className="label">CET Percentile</td>
              <td>{formData.cetDetails.jeePer}</td>
            </tr>
            <tr className="sub-title">
              <td colSpan="4">HSC Details</td>
            </tr>
            <tr>
              <td className="label">HSC Maths Marks</td>
              <td>{formData.academicDetails.hscmathsMarks}</td>
              <td className="label">HSC Physics Marks</td>
              <td>{formData.academicDetails.hscphysicsMarks}</td>
            </tr>
            <tr>
              <td className="label">HSC Chemistry Marks</td>
              <td>{formData.academicDetails.hscchemistryMarks}</td>
              <td className="label">HSC PCM Percentage</td>
              <td>{formData.academicDetails.hscpcmPercentage}</td>
            </tr>
            <tr>
              <td className="label">HSC Vocational Subject Name</td>
              <td>{formData.academicDetails.hscvocationalSub}</td>
              <td className="label">HSC Vocational Subject Marks</td>
              <td>{formData.academicDetails.hscvocationalsubjectMarks}</td>
            </tr>
            <tr>
              <td className="label">HSC PMV Percentage</td>
              <td>{formData.academicDetails.hscvovationalsubjectPer}</td>
            </tr>
            <tr>
              <td className="label">Academic Qualification</td>
              <td colSpan="3">
                <table className="inner-table">
                  <tbody>
                    <tr>
                      <td>Exam Passed</td>
                      <td>Name of Board/University</td>
                      <td>Year of Passing</td>
                      <td>Total Marks</td>
                      <td>Marks Obtained</td>
                      <td>% of Marks</td>
                    </tr>
                    <tr>
                      <td>S.S.C(10th)</td>
                      <td>{formData.academicDetails.sscBoard}</td>
                      <td>{formData.academicDetails.sscyearofPass}</td>
                      <td>{formData.academicDetails.ssctotalMarks} </td>
                      <td>{formData.academicDetails.sscmarksObtained}</td>
                      <td>{formData.academicDetails.sscPercentage}</td>
                    </tr>
                    <tr>
                      <td>H.S.C(12th) / Diploma</td>
                      <td>{formData.academicDetails.hscBoard}</td>
                      <td>{formData.academicDetails.hscyearofPass}</td>
                      <td>{formData.academicDetails.hsctotalMarks}</td>
                      <td>{formData.academicDetails.hscmarksObtained}</td>
                      <td>{formData.academicDetails.hscPercentage}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td className="label">Branch Preference</td>
              <td colSpan="3">
                <table className="inner-table">
                  <tbody>
                    <tr>
                      <td>1 Preference</td>
                      <td>{formData.preferences[0]}</td>
                      <td>2 Preference</td>
                      <td>{formData.preferences[1]}</td>
                    </tr>
                    <tr>
                      <td>3 Preference</td>
                      <td>{formData.preferences[2]}</td>
                      <td>4 Preference</td>
                      <td>{formData.preferences[3]}</td>
                    </tr>
                    <tr>
                      <td>5 Preference</td>
                      <td>{formData.preferences[4]}</td>
                      <td>6 Preference</td>
                      <td>{formData.preferences[5]}</td>
                      </tr>
                    <tr>
                      <td>7 Preference</td>
                      <td>{formData.preferences[6]}</td>
                      <td>8 Preference</td>
                      <td>{formData.preferences[7]}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
                <td className="label">Signature</td>
                <td colSpan="3">
                  <img src={filePreviews.signature} alt="Signature" className="signature-img" />
                </td>
              </tr>
              <tr></tr>
            <tr>
              <td className="label">Transaction Details</td>
              <td colSpan="3">
                <table className="inner-table">
                  <tbody>
                    <tr>
                      <td>Payment Type</td>
                      <td>{formData1.paymentType}</td>
                      <td>Amount</td>
                      <td>{formData1.amount}</td>
                    </tr>
                    <tr>
                      <td>Bank Name</td>
                      <td>{formData1.bankName}</td>
                      <td>Transaction ID</td>
                      <td>{formData1.transactionId}</td>
                    </tr>
                    <tr>
                      <td>Transaction Date</td>
                      <td>{formData1.date}</td>
                      <td>Payment For</td>
                      <td>{formData1.paymentAgainst}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td className="label">Other Details</td>
              <td colSpan="3">{formData.otherDetails}</td>
            </tr>
          </tbody>
        </table>
      </form>
      <DownloadPDFButton />
    </div>
  );
};

export default AdmissionForm;

