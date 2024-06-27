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
import AdmissionForm2 from './AdmissionForm2';
import Layout from './Layout';
import Documents from './Documents';
import PreferencesForm from './PreferencesForm'; // Import PreferencesForm
import PreferenceFormAdmin from './PreferenceFormAdmin'; // Import PreferencesForm
import KtDetails from './KtDetails';

const back_url = "https://views-covering-shaft-urw.trycloudflare.com";

export default function App() {
  const [currentSection, setCurrentSection] = useState(-2); // -2 for sign-in, -1 for signup, 0 for first form section
  const [error, setError] = useState('');
  const [formSelectionPage, setFormSelectionPage] = useState(false);
  const [formAlreadySubmitted, setFormAlreadySubmitted] = useState(false);

  const [formData, setFormData] = useState({
    personalDetails: {
      fullName: '',
      email: '',
      juniorCollege:'',
      class: 'FE',
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
      birthPlace: '',
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
      hscPercentage: '',
      otherBoard10: '',
      otherBoard12: '',
      admitCardId: ''
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
      cbse12admitcard:null,
      cetMarksheet: null,
      jeeMarksheet: null,
      domicilecert: null,
      castecertificate: null,
      castevalidity: null,
      noncreamylayer: null,
      income: null,
      transactionproof: null,
      fcregistrationcopy: null,
      other: null
    },
   
    preferences: ['', '', '', '', '', '', '', ''],
    formType: ''
  });
  
  const [formDataB, setFormDataB] = useState({
    personalDetails: {
      fullName: '',
      email: '',
      juniorCollege:'',
      class: 'FE',
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
      hscPercentage: '',
      otherBoard10: '',
      otherBoard12: '',
      admitCardId: ''
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
      cbse12admitcard:null,
      cetMarksheet: null,
      jeeMarksheet: null,
      domicilecert: null,
      castecertificate: null,
      castevalidity: null,
      noncreamylayer: null,
      income: null,
      transactionproof: null,
      fcregistrationcopy: null,
      other: null
    },
   
    preference: '',
    formType: ''
  });

  const [formDataC, setFormDataC] = useState({
    personalDetails: {
      fullName: '',
      email: '',
      juniordseCollege:'',
      class: '',
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
      cbse12admitcard: null,
      other: null
    },
   
    preference: '',
    formType: ''
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
  const preferenceFormAdminRef = useRef();
  const admissionForm2Ref = useRef();
  const ktdetailsRef = useRef();

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

  const sectionsB = [
    <Documents />,
    <PersonalDetails ref={personalDetailsRef} formData={formDataB} setFormData={setFormDataB} formDataB={formDataB} setFormDataB={setFormDataB} setError={setError} />,
    <AcademicDetails ref={academicDetailsRef} formData={formDataB} setFormData={setFormDataB} setError={setError} />,
    <CETDetails ref={cetDetailsRef} formData={formDataB} setFormData={setFormDataB} setError={setError} />,
    <PreferenceFormAdmin ref={preferenceFormAdminRef} formData={formDataB} setFormData={setFormDataB} setError={setError} />,
    <TransactionDetails ref={transactionDetailsRef} formData1={formData1} setFormData1={setFormData1} setError={setError} />,
    <DocumentUpload ref={documentUploadRef} formData={formDataB} setFormData={setFormDataB} filePreviews={filePreviews} setFilePreviews={setFilePreviews} setError={setError} />,
    <AdmissionForm2 ref={admissionForm2Ref} formDataB={formDataB} setFormDataB={setFormDataB} filePreviews={filePreviews} formData1={formData1} userId={userId} setError={setError}/>
  ];

  const sectionsC = [
    <Documents />,
    <PersonalDetails ref={personalDetailsRef} formData={formDataC} setFormData={setFormDataC} formDataC={formDataC} setFormDataC={setFormDataC} setError={setError} />,
    <AcademicDetails ref={academicDetailsRef} formData={formDataC} setFormData={setFormDataC} setError={setError} />,
    <CETDetails ref={cetDetailsRef} formData={formDataC} setFormData={setFormDataC} setError={setError} />,
    <PreferenceFormAdmin ref={preferenceFormAdminRef} formData={formDataC} setFormData={setFormDataC} setError={setError} />,
    <TransactionDetails ref={transactionDetailsRef} formData1={formData1} setFormData1={setFormData1} setError={setError} />,
    <DocumentUpload ref={documentUploadRef} formData={formDataC} setFormData={setFormDataC} filePreviews={filePreviews} setFilePreviews={setFilePreviews} setError={setError} />,
    <KtDetails ref={ktdetailsRef} formDataC={formDataC} setFormDataC={setFormDataC} setError={setError}/>,
    <AdmissionForm2 ref={admissionForm2Ref} formDataB={formDataC} setFormDataB={setFormDataC} filePreviews={filePreviews} formData1={formData1} userId={userId} setError={setError}/>
  ];
  

  const handleCheck = async (email, formType) => {
    try {
      const response = await fetch(`${back_url}/api/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, formType }),
      });
      const result = await response.json();
      if (result.key === 1) {
        return true;
      } else {
        // alert('User already submitted the form');
        setError(result.message);
        return false;
      }
    } catch (error) {
      setError('Network error: ' + error.message);
      return false;
    }
  };

  const nextSection = () => {
    if (!validateCurrentSection()) return;
    if (currentSection === 0) {
      // Display warning alert for section 0
      alert("Make sure to completely fill and submit the form before closing the website (Once submitted, can't be re-submitted)");
  
      // After OK is pressed, proceed to next section
      setCurrentSection(currentSection + 1);
      setError('');
    } else if (currentSection < sections.length - 1) {
      // Regular section advancement logic
      setCurrentSection(currentSection + 1);
      setError('');
    }
    window.scrollTo(0, 0);
  };

  const nextSectionB = () => {
    if (!validateCurrentSectionB()) return;
    if (currentSection < sectionsB.length - 1) {
      setCurrentSection(currentSection + 1);
      setError('');
    }
    window.scrollTo(0, 0);
  };

  const nextSectionC = () => {
    if (!validateCurrentSectionC()) return;
    if (currentSection < sectionsC.length - 1) {
      setCurrentSection(currentSection + 1);
      setError('');
    }
    window.scrollTo(0, 0);
  };

  // const prevSection = () => {
  //   if (currentSection > 0) {
  //     setCurrentSection(currentSection - 1);
  //     setError('');
  //   }
  // };

  // const prevSectionB = () => {
  //   if (currentSection > 0) {
  //     setCurrentSection(currentSection - 1);
  //     setError('');
  //   }
  // };

  const prevSection = () => {
    if (currentSection === 0) {
      window.location.reload(); // Reload the entire application
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setError('');
    }
  };
  
  const prevSectionB = () => {
    if (currentSection === 0) {
      window.location.reload(); // Reload the entire application
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setError('');
    }
  };

  const prevSectionC = () => {
    if (currentSection === 0) {
      window.location.reload(); // Reload the entire application
    } else if (currentSection > 0) {
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

  const validateCurrentSectionB = () => {

    if (currentSection === -2 || currentSection === -1 || currentSection === 4) {
      return true;
    }
    
    if (currentSection >= 0 && currentSection < sections.length) {
      const refs = [
        null,
        personalDetailsRef,
        academicDetailsRef,
        cetDetailsRef,
        preferenceFormAdminRef,
        documentUploadRef,
        admissionForm2Ref
      ];
  
      // Check if the ref is defined before calling validate
      if (refs[currentSection] && refs[currentSection].current) {
        return refs[currentSection].current.validate();
      }
    }
    return true; // Skip validation for sign-in and sign-up sections
  };
  
  const validateCurrentSectionC = () => {

    if (currentSection === -2 || currentSection === -1 || currentSection === 4) {
      return true;
    }
    
    if (currentSection >= 0 && currentSection < sectionsC.length) {
      const refs = [
        null,
        personalDetailsRef,
        academicDetailsRef,
        cetDetailsRef,
        preferenceFormAdminRef,
        documentUploadRef,
        admissionForm2Ref
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
  formDataToSend.append('formType', formData.formType);
  formDataToSend.append('formData1', JSON.stringify(formData1));


  
  
  // Append files
  Object.keys(formData.documentUpload).forEach(key => {
    formDataToSend.append(key, formData.documentUpload[key]);
  });

    try {
      const response = await fetch(`${back_url}/api/submit`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert(result.message); // Show success message
      // setCurrentSection(-2); // Reset to first section
      window.location.reload();
    } catch (error) {
      setError('Network error: ' + error.message);
    }
  };

  const handleSubmitB = async () => {
    const formDataToSend = new FormData();
  
  // Append personal, academic, and cet details as JSON string
  formDataToSend.append('personalDetails', JSON.stringify(formDataB.personalDetails));
  formDataToSend.append('academicDetails', JSON.stringify(formDataB.academicDetails));
  formDataToSend.append('cetDetails', JSON.stringify(formDataB.cetDetails));
  formDataToSend.append('preference', JSON.stringify(formDataB.preference));
  formDataToSend.append('formType', formData.formType); // Set the formType property
  formDataToSend.append('formData1', JSON.stringify(formData1));


  
  
  // Append files
  Object.keys(formDataB.documentUpload).forEach(key => {
    formDataToSend.append(key, formDataB.documentUpload[key]);
  });

    try {
      const response = await fetch(`${back_url}/api/submit2`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert(result.message); // Show success message
      // setCurrentSection(-2); // Reset to first section
      window.location.reload();
    } catch (error) {
      setError('Network error: ' + error.message);
    }
  };

  const handleSubmitC = async () => {
    const formDataToSend = new FormData();
  
  // Append personal, academic, and cet details as JSON string
  formDataToSend.append('personalDetails', JSON.stringify(formDataC.personalDetails));
  formDataToSend.append('academicDetails', JSON.stringify(formDataC.academicDetails));
  formDataToSend.append('cetDetails', JSON.stringify(formDataC.cetDetails));
  formDataToSend.append('preference', JSON.stringify(formDataC.preference));
  formDataToSend.append('formType', formData.formType); // Set the formType property
  formDataToSend.append('formData1', JSON.stringify(formData1));


  
  
  // Append files
  Object.keys(formDataC.documentUpload).forEach(key => {
    formDataToSend.append(key, formDataC.documentUpload[key]);
  });

    try {
      const response = await fetch(`${back_url}/api/submit3`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert(result.message); // Show success message
      // setCurrentSection(-2); // Reset to first section
      window.location.reload();
    } catch (error) {
      setError('Network error: ' + error.message);
    }
  };

  const handleFormSelection = async (formLabel) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      formType: formLabel
    }));

    const email = formData.personalDetails.email;
    const canProceed = await handleCheck(email, formLabel);
    if (!canProceed) {
      if (formAlreadySubmitted) {
        setFormSelectionPage(true); // If form already submitted, stay on form selection page
      } else {
        setFormAlreadySubmitted(true);
        setCurrentSection(0); // Proceed to the first section of the form
      }
    } else {
      setFormAlreadySubmitted(false);
      setFormSelectionPage(false); // Set formSelectionPage to false when form type is selected
      setCurrentSection(0); // Proceed to the first section of the form
    }
  };

  // const handleSignIn = (userData) => {
  //   setUserId(userData.userId);
  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     personalDetails: {
  //       ...prevFormData.personalDetails,
  //       email: userData.email,
  //       uniqueKey: userData.uniqueKey
  //     }
  //   }));
  //   setCurrentSection(0); // Proceed to the first section of the form
  // };

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
    setFormDataB(prevFormDataB => ({
     ...prevFormDataB,
      personalDetails: {
       ...prevFormDataB.personalDetails,
        email: userData.email,
        uniqueKey: userData.uniqueKey
      }
    }));
    setFormDataC(prevFormDataC => ({
      ...prevFormDataC,
       personalDetails: {
        ...prevFormDataC.personalDetails,
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
  
  // const section = formData.formType === 'A' ? sections : sectionsB;

  return (
    <Layout>
      <div className="container">
        {currentSection === -2 ? (
          <SignInPage onSignIn={handleSignIn} goToSignup={goToSignup} />
        ) : currentSection === -1 ? (
          <SignupPage onSignupComplete={handleSignupComplete} />
        ) : (
          <>
          {(formSelectionPage || !formData.formType) && !formAlreadySubmitted && (
            <div className="form-selection">
              <h1 className="center page-heading">Form Selection</h1>
              <div className='buttons1'>
                <br></br>
              <button onClick={() => handleFormSelection('Form A')}>SIES Brochure Form</button>
              <button onClick={() => handleFormSelection('Form B')}>FE Admission Form</button>
              <button onClick={() => handleFormSelection('Form C')}>SE Admission Form</button>
              {/* <button onClick={() => handleFormSelection('Form D')}>TE Admission Form</button>
              <button onClick={() => handleFormSelection('Form E')}>BE Admission Form</button> */}
              {/* <button onClick={() => handleFormSelection('Form F')}>Form F</button>
              <button onClick={() => handleFormSelection('Form G')}>Form G</button> */}
              </div>
            </div>
          )}
          
            {formAlreadySubmitted ? (
            
            <h3 className="center page-heading" style={{ color: 'green', fontSize: '20px'}}>
              You have already submitted this form!
            </h3>
              
              
            ) : (
            formData.formType === 'Form A' ? (
              <>
                {sections[currentSection]}
                {error && <p className="error">{error}</p>}
                <br />
                <div className="buttons">
                  <button onClick={prevSection} >BACK</button>
                  <button onClick={nextSection} disabled={currentSection === sections.length - 1}>NEXT</button>
                  {currentSection === sections.length - 1 && (
                    <button className="add-course" onClick={handleSubmit}><b>+ SUBMIT DATA</b></button>
                  )}
                </div>
              </>
            ) : (
              formData.formType === 'Form B' ? (
                <>
                {sectionsB[currentSection]}
                {error && <p className="error">{error}</p>}
                <br />
                <div className="buttons">
                  <button onClick={prevSectionB} >BACK</button>
                  <button onClick={nextSectionB} disabled={currentSection === sectionsB.length - 1}>NEXT</button>
                  {currentSection === sectionsB.length - 1 && (
                    <button className="add-course" onClick={handleSubmitB}><b>+ SUBMIT DATA</b></button>
                  )}
                </div>
              </>
              ) : (
                formData.formType === 'Form C' ? (
                  <>
                  {sectionsC[currentSection]}
                  {error && <p className="error">{error}</p>}
                  <br />
                  <div className="buttons">
                    <button onClick={prevSectionC} >BACK</button>
                    <button onClick={nextSectionC} disabled={currentSection === sectionsC.length - 1}>NEXT</button>
                    {currentSection === sectionsC.length - 1 && (
                      <button className="add-course" onClick={handleSubmitC}><b>+ SUBMIT DATA</b></button>
                    )}
                  </div>
                </>
                ) : (
                  <p></p>
                )
              )
            )
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
