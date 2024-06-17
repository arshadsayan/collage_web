import React, { useState } from 'react';
import './AdmissionForm.css';
import DownloadPDFButton from './DownloadPDFButton';


const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    name: 'JASMEET KAUR',
    cetApplicationId: '123456',
    id: '987654',
    dob: '2000-01-01',
    email: 'jasmeet@example.com',
    mobile: '9876543210',
    fatherName: 'Father Name',
    fatherOccupation: 'Engineer',
    fatherMobile: '9876543211',
    motherName: 'Mother Name',
    motherOccupation: 'Doctor',
    motherMobile: '9876543212',
    annualIncome: '1000000',
    sex: 'Female',
    correspondenceAddress: '123, ABC Street, City - 400001',
    permanentAddress: '456, XYZ Street, City - 400002',
    area: 'Urban',
    nationality: 'Indian',
    religion: 'Hindu',
    category: 'General',
    domicile: 'Maharashtra',
    motherTongue: 'Punjabi',
    jeeApplicationNo: 'JEE123',
    jeePercentile: '90',
    cetRollNo: 'CET456',
    cetMathsPercentage: '95',
    cetPhysicsPercentage: '92',
    cetChemistryPercentage: '94',
    cetPercentile: '85',
    hscMathsMarks: '95',
    hscPhysicsMarks: '94',
    hscChemistryMarks: '93',
    hscPcmPercentage: '94',
    hscVocationalSubjectName: 'Vocational Subject',
    hscVocationalSubjectMarks: '90',
    hscPmvPercentage: '92',
    examPassed: 'HSC',
    boardUniversity: 'State Board',
    yearOfPassing: '2018',
    totalMarks: '600',
    marksObtained: '560',
    marksPercentage: '93',
    preference1: 'Computer Engineering',
    preference2: 'Electronics Engineering',
    preference3: 'Mechanical Engineering',
    preference4: '',
    preference5: '',
    preference6: '',
    preference7: '',
    preference8: '',
    signature: '/sign.png',
    profile:'/profile.png',
    transactiondate: '167326786327',
    transactionid: '167326786327',
    feeamount: '100000000',
    transactionapproved: 'approved',


  });
  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  
 
    }


  return (
    <div>
    <div id="pdf-content">
    <form className="admission-form" onSubmit={handleSubmit}>
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
                <img src={formData.profile} alt="Description of the " />
                  <p>JASMEET KAUR</p>
                  <p>10-06-2023</p>
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
            <td>{formData.name} </td>
            <td className="label">CET Application ID</td>
            <td>{formData.cetApplicationId}</td>
          </tr>
          <tr>
            <td className="label">ID</td>
            <td>{formData.id}</td>
          </tr>
          <tr>
            <td className="label">Date of Birth</td>
            <td>{formData.dob}</td>
          </tr>
          <tr>
            <td className="label">Email Id</td>
            <td> {formData.email}</td>
          </tr>
          <tr>
            <td className="label">Mobile No.</td>
            <td>{formData.mobile}</td>
          </tr>
          <tr>
            <td className="label">Father's Name</td>
            <td>{formData.fatherName}</td>
            <td className="label">Father's Occupation</td>
            <td>{formData.fatherOccupation} </td>
          </tr>
          <tr>
            <td className="label">Mobile No.</td>
            <td>{formData.fatherMobile}</td>
          </tr>
          <tr>
            <td className="label">Mother's Name</td>
            <td>{formData.motherName}</td>
            <td className="label">Mother's Occupation</td>
            <td>{formData.motherOccupation}</td>
          </tr>
          <tr>
            <td className="label">Mobile No.</td>
            <td>{formData.motherMobile}</td>
          </tr>
          <tr>
            <td className="label">Annual Income</td>
            <td>{formData.annualIncome}</td>
          </tr>
          <tr>
            <td className="label">Sex</td>
            <td>{formData.sex}</td>
          </tr>
          <tr>
            <td className="label">Correspondence Address</td>
            <td colSpan="3">{formData.correspondenceAddress}</td>
          </tr>
          <tr>
            <td className="label">Permanent Address</td>
            <td colSpan="3">{formData.permanentAddress}</td>
          </tr>
          <tr>
            <td className="label">Area</td>
            <td>{formData.area}</td>
            <td className="label">Nationality</td>
            <td>{formData.nationality} </td>
          </tr>
          <tr>
            <td className="label">Religion</td>
            <td>{formData.religion}</td>
            <td className="label">Category</td>
            <td>{formData.category}</td>
          </tr>
          <tr>
            <td className="label">Domicile</td>
            <td>{formData.domicile}</td>
            <td className="label">Mother Tongue</td>
            <td>{formData.motherTongue}</td>
          </tr>
          <tr>
            <td className="label">JEE Application No</td>
            <td>{formData.jeeApplicationNo}</td>
            <td className="label">JEE Percentile</td>
            <td>{formData.jeePercentile}</td>
          </tr>
          <tr className="sub-title">
            <td colSpan="4">CET Details</td>
          </tr>
          <tr>
            <td className="label">CET Roll No</td>
            <td>{formData.cetRollNo}</td>
            <td className="label">CET Maths Percentage</td>
            <td>{formData.cetMathsPercentage}</td>
          </tr>
          <tr>
            <td className="label">CET Physics Percentage</td>
            <td>{formData.cetPhysicsPercentage}</td>
            <td className="label">CET Chemistry Percentage</td>
            <td>{formData.cetChemistryPercentage}</td>
          </tr>
          <tr>
            <td className="label">CET Percentile</td>
            <td>{formData.cetPercentile}</td>
          </tr>
          <tr className="sub-title">
            <td colSpan="4">HSC Details</td>
          </tr>
          <tr>
            <td className="label">HSC Maths Marks</td>
            <td>{formData.hscMathsMarks}</td>
            <td className="label">HSC Physics Marks</td>
            <td>{formData.hscPhysicsMarks} </td>
          </tr>
          <tr>
            <td className="label">HSC Chemistry Marks</td>
            <td>{formData.hscChemistryMarks}</td>
            <td className="label">HSC PCM Percentage</td>
            <td>{formData.hscPcmPercentage}</td>
          </tr>
          <tr>
            <td className="label">HSC Vocational Subject Name</td>
            <td>{formData.hscVocationalSubjectName}</td>
            <td className="label">HSC Vocational Subject Marks</td>
            <td>{formData.hscVocationalSubjectMarks}</td>
          </tr>
          <tr>
            <td className="label">HSC PMV Percentage</td>
            <td>{formData.hscPmvPercentage}</td>
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
                    <td>{formData.examPassed}</td>
                    <td>{formData.boardUniversity}</td>
                    <td>{formData.yearOfPassing} </td>
                    <td>{formData.totalMarks}</td>
                    <td>{formData.marksObtained} </td>
                    <td>{formData.marksPercentage}</td>
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
                    <td>{formData.preference1}</td>
                    <td>2 Preference</td>
                    <td>{formData.preference2} </td>
                  </tr>
                  <tr>
                    <td>3 Preference</td>
                    <td>{formData.preference3}</td>
                    <td>4 Preference</td>
                    <td>{formData.preference4}</td>
                  </tr>
                  <tr>
                    <td>5 Preference</td>
                    <td>{formData.preference5}</td>
                    <td>6 Preference</td>
                    <td>{formData.preference6}</td>
                  </tr>
                  <tr>
                    <td>7 Preference</td>
                    <td>{formData.preference7}</td>
                    <td>8 Preference</td>
                    <td>{formData.preference8}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td className="label">Signature</td>
            <td colSpan="3">
            <img src={formData.signature} alt='signature' style={{width:'150px'}}/>
            </td>
          </tr>
          <tr>
            <td className="label">Transaction</td>
            <td colSpan="3">
              <table className="inner-table">
                <tbody>
                  <tr>
                    <td>Transaction Date</td>
                    <td>Transaction ID</td>
                    <td>Fee Amount</td>
                    <td>Transaction Approved</td>
                  </tr>
                  <tr>
                    <td>{formData.transactiondate}</td>
                    <td>{formData.transactionid}</td>
                    <td>{formData.feeamount} </td>
                    <td>{formData.transactionapproved}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th colSpan="4">
            <p style={{textAlign:"center"}}>** If TRANSACTION IS NOT APPROVED THEN CONTACT ADMISSIONS**</p>
            </th>
          </tr>
        </tbody>
      </table>
    </form>
    </div>
    <div style={{display:'flex' ,justifyContent:'center', margin:'50px'}}>
    <DownloadPDFButton formContent={'pdf-content'} />
    </div>
    </div>
  );
};

export default AdmissionForm;