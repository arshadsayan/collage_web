import React, { useState, useRef } from 'react';
import './styles.css';
import './styles-import.css';
import PersonalDetails from './PersonalDetails';
import AcademicDetails from './AcademicDetails';
import CETDetails from './CETDetails';
import DocumentUpload from './DocumentUpload';
import TransactionDetails from './TransactionDetails';
import SignupPage from './SignupPage';
import SignInPage from './SignInPage';
import AdmissionForm from './AdmissionForm';
import Layout from './Layout';
import Documents from './Documents';
import PreferencesForm from './PreferencesForm'; // Import PreferencesForm

export default function App() {
  const [currentSection, setCurrentSection] = useState(-2); // -2 for sign-in, -1 for signup, 0 for first form section
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
      nationality: 'Indian',
      religion: '',
      domicile: '',
      mothersTongue: '',
      dateofBirth: '',
      bloodGroup: '',
      state: 'Maharashtra'
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
      jeePer: '',
      cetPer: ''
    },
    documentUpload: {
      photo: null,
      signature: null,
      marksheet10: null,
      leavingCertificate12: null,
      marksheet12: null,
      cetMarksheet: null,
      jeeMarksheet: null,
      domicilecert: null,
      castecertificate: null,
      castevalidity: null,
      noncreamylayer: null,
      income: null,
      transactionproof: null,
      other: null
    },
   
    preferences: ['', '', '', '', '', '', '', '']
  });

  const [filePreviews, setFilePreviews] = useState({});

  const [formData1, setFormData1] = useState({
  
      date: '',
      amount: '2000/-',
      transactionId: '',
      file: null,
      paymentAgainst: ''
    
  });

  const [userId, setUserId] = useState('');

  const personalDetailsRef = useRef();
  const academicDetailsRef = useRef();
  const cetDetailsRef = useRef();
  const documentUploadRef = useRef();
  const transactionDetailsRef = useRef();
  const admissionFormRef = useRef();
  const preferencesFormRef = useRef();

  const sections = [
    <Documents />,
    <PersonalDetails ref={personalDetailsRef} formData={formData} setFormData={setFormData} setError={setError} />,
    <AcademicDetails ref={academicDetailsRef} formData={formData} setFormData={setFormData} setError={setError} />,
    <CETDetails ref={cetDetailsRef} formData={formData} setFormData={setFormData} setError={setError} />,
    <PreferencesForm ref={preferencesFormRef} formData={formData} setFormData={setFormData} setError={setError} />,
    <TransactionDetails ref={transactionDetailsRef}  formData1={formData1} setFormData1={setFormData1} setError={setError} />,
    <DocumentUpload ref={documentUploadRef} formData={formData} setFormData={setFormData} filePreviews={filePreviews} setFilePreviews={setFilePreviews} setError={setError} />,
    <AdmissionForm ref={admissionFormRef} formData={formData} setFormData={setFormData} filePreviews={filePreviews} formData1={formData1} userId={userId} setError={setError}/>
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

    if (currentSection === -2 || currentSection === -1 || currentSection === 4) {
      return true;
    }
    
    if (currentSection >= 0 && currentSection < sections.length) {
      const refs = [
        null,
        personalDetailsRef,
        academicDetailsRef,
        cetDetailsRef,
        preferencesFormRef,
        documentUploadRef,
        admissionFormRef
      ];
  
      // Check if the ref is defined before calling validate
      if (refs[currentSection] && refs[currentSection].current) {
        return refs[currentSection].current.validate();
      }
    }
    return true; // Skip validation for sign-in and sign-up sections
  };
  
  const handleSubmit = async () => {
    const formDataToSend = new FormData();
  
  // Append personal, academic, and cet details as JSON string
  formDataToSend.append('personalDetails', JSON.stringify(formData.personalDetails));
  formDataToSend.append('academicDetails', JSON.stringify(formData.academicDetails));
  formDataToSend.append('cetDetails', JSON.stringify(formData.cetDetails));
  formDataToSend.append('preferences', JSON.stringify(formData.preferences));

  formDataToSend.append('formData1', JSON.stringify(formData1));


  
  
  // Append files
  Object.keys(formData.documentUpload).forEach(key => {
    formDataToSend.append(key, formData.documentUpload[key]);
  });

    try {
      const response = await fetch('https://influences-assume-bizarre-forecasts.trycloudflare.com/api/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert(result.message); // Show success message
      setCurrentSection(0); // Reset to first section
    } catch (error) {
      setError('Network error: ' + error.message);
    }
  };

  const handleSignIn = (userData) => {
    setUserId(userData.userId);
    setFormData(prevFormData => ({
      ...prevFormData,
      personalDetails: {
        ...prevFormData.personalDetails,
        email: userData.email,
        uniqueKey: userData.uniqueKey
      }
    }));
    setCurrentSection(0); // Proceed to the first section of the form
  };

  const goToSignup = () => {
    setCurrentSection(-1); // Navigate to the signup page
  };

  const handleSignupComplete = (email) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      personalDetails: {
        ...prevFormData.personalDetails,
        email: email
      }
    }));
    setCurrentSection(-2); // Navigate back to the sign-in page after signup
  };

  return (
    <Layout>
    <div className="container">
      
      {currentSection === -2 ? (
        <SignInPage onSignIn={handleSignIn} goToSignup={goToSignup} />
      ) : currentSection === -1 ? (
        <SignupPage onSignupComplete={handleSignupComplete} />
      ) : (
        <>
          {sections[currentSection]}
          {error && <p className="error">{error}</p>}
          <br></br>
          <div className="buttons">
            <button onClick={prevSection} disabled={currentSection === 0}>BACK</button>
            <button onClick={nextSection} disabled={currentSection === sections.length - 1}>NEXT</button>
            {currentSection === sections.length - 1 && <button className="add-course" onClick={handleSubmit}><b>+ SUBMIT DATA</b></button>}
          </div>
        </>
      )}
    </div>
    </Layout>
  );
}
