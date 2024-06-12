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

  const personalDetailsRef = useRef();
  const academicDetailsRef = useRef();
  const cetDetailsRef = useRef();
  const jeeDetailsRef = useRef();
  const documentUploadRef = useRef();

  const sections = [
    <PersonalDetails ref={personalDetailsRef} setError={setError} />,
    <AcademicDetails ref={academicDetailsRef} setError={setError} />,
    <CETDetails ref={cetDetailsRef} setError={setError} />,
    <DocumentUpload ref={documentUploadRef} setError={setError} />
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

  return (
    <div className="container">
      {sections[currentSection]}
      {error && <p className="error">{error}</p>}
      <div className="buttons">
        <button onClick={prevSection} disabled={currentSection === 0}>BACK</button>
        <button onClick={nextSection} disabled={currentSection === sections.length - 1}>NEXT</button>
        {currentSection === sections.length - 1 && <button className="add-course"><b>+ SUBMIT DATA</b></button>}
      </div>
    </div>
  );
}
