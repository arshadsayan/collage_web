import React, { useState, useRef } from 'react';
import './styles.css';
import './styles-import.css';
import PersonalDetails from './PersonalDetails';
import AcademicDetails from './AcademicDetails';
import CETDetails from './CETDetails';
import DocumentUpload from './DocumentUpload';

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    personalDetails: {
      fullName: '',
      email: '',
      mobileNumber: '',
      fathersName: '',
      fathersmobileNumber: '',
      fathersOccupation: '',
      mothersName: '',
      mothersOccupation: '',
      mothersmobileNumber: '',
      annualIncome: '',
      sex: '',
      corrAddr: '',
      perAddr: '',
      area: '',
      category: '',
      nationality: '',
      religion: '',
      domicile: '',
      mothersTongue: '',
      dateofBirth: ''
    },
    academicDetails: {
      hscmathsMarks: '',
      hscphysicsMarks: '',
      hscchemistryMarks: '',
      hscpcmPercentage: '',
      hscvocationalSub: '',
      hscvocationalsubjectMarks: '',
      hscvovationalsubjectPer: '',
      sscBoard: '',
      sscyearofPass: '',
      ssctotalMarks: '',
      sscmarksObtained: '',
      sscPercentage: '',
      hscBoard: '',
      hscyearofPass: '',
      hsctotalMarks: '',
      hscmarksObtained: '',
      hscPercentage: ''
    },
    cetDetails: {
      cetappId: '',
      cetrollNo: '',
      cetmathsPer: '',
      cetphysicsPer: '',
      cetchemistryPer: '',
      jeeappNum: '',
      jeePer: ''
    },
    documentUpload: {}
  });

  const personalDetailsRef = useRef();
  const academicDetailsRef = useRef();
  const cetDetailsRef = useRef();
  const documentUploadRef = useRef();

  const sections = [
    <PersonalDetails ref={personalDetailsRef} formData={formData} setFormData={setFormData} setError={setError} />,
    <AcademicDetails ref={academicDetailsRef} formData={formData} setFormData={setFormData} setError={setError} />,
    <CETDetails ref={cetDetailsRef} formData={formData} setFormData={setFormData} setError={setError} />,
    <DocumentUpload ref={documentUploadRef} formData={formData} setFormData={setFormData} setError={setError} />
  ];

  const nextSection = () => {
    if (!validateCurrentSection()) return;
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setError('');
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setError('');
    }
  };

  const validateCurrentSection = () => {
    const refs = [personalDetailsRef, academicDetailsRef, cetDetailsRef, documentUploadRef];
    return refs[currentSection].current.validate();
  };

  const handleSubmit = async () => {
    if (!validateCurrentSection()) return;

    try {
      const response = await fetch('http://your-backend-url/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful submission
        alert('Form submitted successfully');
      } else {
        // Handle server errors
        const errorData = await response.json();
        setError(errorData.message || 'Submission failed');
      }
    } catch (error) {
      // Handle network errors
      setError('Network error: ' + error.message);
    }
  };

  return (
    <div className="container">
      {sections[currentSection]}
      {error && <p className="error">{error}</p>}
      <div className="buttons">
        <button onClick={prevSection} disabled={currentSection === 0}>BACK</button>
        <button onClick={nextSection} disabled={currentSection === sections.length - 1}>NEXT</button>
        {currentSection === sections.length - 1 && <button className="add-course" onClick={handleSubmit}><b>+ SUBMIT DATA</b></button>}
      </div>
    </div>
  );
}
