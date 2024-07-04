import React, { useState, forwardRef, useImperativeHandle,useEffect } from 'react';

// KT Component
const KTComponent = ({ index, onChangeSubject, onChangeClearedDate }) => {
  return (
    <div  className="inputs ">
    <div className="input-field side-by-side">
    
    <label>
    Subject {index + 1}:
    <input type="text" onChange={(e) => onChangeSubject(index, e)} />
    </label>
    
    <div className="input-field ">
    <br />
    <label>
    Cleared Date(if active do no enter date):
    </label>
    <input  type="date" onChange={(e) => onChangeClearedDate(index, e)} />
    </div>
    </div>
    
    <br />
    </div>
  );
};

// SemesterForm Component
const KtDetails = forwardRef(({ setError }, ref) => {
  const [currentSemester, setCurrentSemester] = useState('');
  const [attemptsData, setAttemptsData] = useState({});
  
  const handleSemesterChange = (e) => {
    const sem = e.target.value;
    setCurrentSemester(sem);
    if (!attemptsData[sem]) {
      setAttemptsData({ ...attemptsData, [sem]: { attempts: 0, kts: [] } });
    }
  };
  
  const handleAttemptsChange = (sem, e) => {
    const attempts = parseInt(e.target.value);
    // console.log(sem);
    console.log(attemptsData)
    // const attempts = parseInt(e.target.value);
    
    // Validate attempts
    if (isNaN(attempts) || attempts < 0 || attempts > currentSemester - sem) {
      // Invalid attempts, do not update state
      //   return;
      // alert('invalid number of atempts');
      
      return;
    }
    setAttemptsData(prevData => {
      const updatedData = {
        ...prevData,
        [sem]: {
          ...prevData[sem],
          attempts: attempts
        }
      };
      // Reset kts array if attempts are 1 or less
      if (attempts <= 1) {
        updatedData[sem].kts = [];
      } else {
        // Ensure kts array exists and has correct length if attempts are increased
        if (!updatedData[sem].kts || updatedData[sem].kts.length !== attempts) {
          const kts = [];
          for (let i = 0; i < attempts; i++) {
            kts.push({ subject: '', clearedDate: '' });
          }
          updatedData[sem].kts = kts;
        }
      }
      return updatedData;
    });
  };
  
  const handleKtsChange = (sem, e) => {
    const numberOfKts = parseInt(e.target.value);
    // const numberOfKts = parseInt(e.target.value);
    // Validate number of kts
    if ((isNaN(numberOfKts) && numberOfKts !== "")  || numberOfKts < 0 || numberOfKts > 6) {
      // alert(`kt max can be 5 or 6 depending on sem `);
      // Invalid number of kts, do not update state
      return;
    }
    
    const kts = [];
    for (let i = 0; i < numberOfKts; i++) {
      kts.push({ subject: '', clearedDate: '' });
    }
    setAttemptsData(prevData => ({
      ...prevData,
      [sem]: {
        ...prevData[sem],
        kts: kts
      }
    }));
  };
  
  const handleKtSubjectChange = (sem, index, value) => {
    setAttemptsData(prevData => ({
      ...prevData,
      [sem]: {
        ...prevData[sem],
        kts: prevData[sem].kts.map((kt, idx) => idx === index ? { ...kt, subject: value } : kt)
      }
    }));
  };
  
  const handleKtClearedDateChange = (sem, index, value) => {
    setAttemptsData(prevData => ({
      ...prevData,
      [sem]: {
        ...prevData[sem],
        kts: prevData[sem].kts.map((kt, idx) => idx === index ? { ...kt, clearedDate: value } : kt)
      }
    }));
  };
  
  
  const renderKtInputs = (sem) => {
    // const renderKtInputs = (sem) => {
    const numberOfKts = attemptsData[sem]?.kts.length || 0;
    
    return (
      <div className="input-field ">
      <label>
      Number of KT subjects:
      <select className="dropdown-field " value={numberOfKts} onChange={(e) => handleKtsChange(sem, e)}>
      {[1, 2, 3, 4, 5, 6].map(num => (
        <option key={num} value={num}>{num}</option>
      ))}
      </select>
      </label>
      <br />
      {attemptsData[sem]?.kts.map((kt, index) => (
        <KTComponent
        key={index}
        index={index}
        onChangeSubject={(index, e) => handleKtSubjectChange(sem, index, e.target.value)}
        onChangeClearedDate={(index, e) => handleKtClearedDateChange(sem, index, e.target.value)}
        />
      ))}
      </div>
    );
    // };
    
  };
  

  const handleAttemptsDateChange = (sem, e) => {
    const dateValue = e.target.value; // Get the selected date value
    setAttemptsData(prevData => ({
      ...prevData,
      [sem]: {
        ...prevData[sem],
        attemptDate: dateValue // Update the attemptDate for the specific semester
      }
    }));
  };
  

  const renderSemesterInputs = () => {
    const inputs = [];
    for (let i = 1; i < currentSemester; i++) {
      inputs.push(
        <div key={i} className="input">
        <div >
        
        <h3>Semester {i}</h3>
        <div className="input-field side-by-side">
        <label>
        Attempts taken to clear Semester {i}:
        <input type="number" style={{ width: '150px', padding:'10px', fontSize: '16px' }}   value={attemptsData[i]?.attempts || ''} onChange={(e) => handleAttemptsChange(i, e)} />
        </label>
        
        </div>
        <div className="input-field side-by-side">
        <label>
        Attempts  date {i}:
        <input type="date" style={{ width: '350px', padding:'10px', fontSize: '16px' }}   onChange={(e) => handleAttemptsDateChange(i, e)} />
        </label> </div>

        </div>
        
        
        <br />
        {attemptsData[i]?.attempts > 1 && (
          <div>
          {/* <label>
            Number of KT subjects:
            <input type="number" onChange={(e) => handleKtsChange(i, e)} />
            </label> */}
            <br />
            {renderKtInputs(i)}
            </div>
        )}
        </div>
      );
    }
    return inputs;
  };
  useEffect(() => {
    // Call handleupdate() when currentSemester or attemptsData changes
    if (currentSemester && Object.keys(attemptsData).length > 0) {
      handleSubmit();
    }
  }, [currentSemester, attemptsData]);
  const handleSubmit = () => {
    // Prepare data to export
    const dataToExport = {
      currentSemester: currentSemester,
      attemptsData: attemptsData
    };
    
    // Convert to JSON string
    const jsonData = JSON.stringify(dataToExport, null, 2);
    // console.log(jsonData)
    // console.log(formData.attemptsData[1]?.kts[0]?.subject)
    // return jsonData;
    
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   personalDetails: {
    //     ...prevFormData.ktDetails,
    //     jsondata:jsonData
    //   },
      
    // }));
    // console.log(formData.ktDetails.jsondata)
    
  };
  
  
  // const handleSubmit = () => {
  //   // Prepare data to export
  //   const dataToExport = {
  //     currentSemester: currentSemester,
  //     attemptsData: attemptsData
  //   };
  
  //   // Convert to JSON string
  //   const jsonData = JSON.stringify(dataToExport, null, 2);
  
  //   // Create a Blob object to hold the JSON data
  //   const blob = new Blob([jsonData], { type: 'application/json' });
  
  //   // Create a temporary anchor element to trigger the download
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'semesterFormData.json';
  //   document.body.appendChild(a);
  //   a.click();
  
  //   // Clean up
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);
  // };
  
  const validate = () => {
    if (!currentSemester) {
      setError('Please select a current semester.');
      return false;
    }
    
    for (let i = 1; i < currentSemester; i++) {
      if (!attemptsData[i]?.attempts || attemptsData[i]?.attempts <= 0) {
        setError(`Please enter valid attempts for Semester ${i}.`);
        return false;
      }
      
      if (attemptsData[i]?.attempts > 1 && (!attemptsData[i]?.kts || attemptsData[i]?.kts.length !== attemptsData[i]?.attempts)) {
        setError(`Please enter all KT subjects for Semester ${i}.`);
        return false;
      }
    }
    
    setError('');
    return true;
  };
  
  // Expose validate function to parent component through ref
  useImperativeHandle(ref, () => ({
    validate
  }));
  
  
  



  const handleInsertData = async () => {
    try {
      const requestData = {
        id: '123654987', // Assuming `id` is defined somewhere in your component
        currentSemester: currentSemester.toString(), // Convert to string if necessary
        attemptsData: attemptsData
      };
  
      // Convert each clearedDate to a string format to avoid issues with empty values
      Object.values(requestData.attemptsData).forEach(semData => {
        semData.kts.forEach(kt => {
          kt.clearedDate = kt.clearedDate.toString();
        });
      });
  
      const response = await fetch('http://localhost:3001/insertData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to insert data');
      }
  
      const data = await response.json();
      console.log('Data inserted successfully:', data);
    } catch (error) {
      console.error('Error inserting data:', error);
      // Handle error
    }
  };
  





  return (
    <div className="inputs">
    <h2>Current Semester: {currentSemester}</h2>
    <label>
    Select Current Semester:</label>
    {/* <input type="number" value={currentSemester} onChange={handleSemesterChange} /> */}
    <select className="dropdown-field"
    id="currentSem" value={currentSemester} onChange={handleSemesterChange}>
    <option value="" disabled selected>Select Semester</option>
    <option value="3">Semester 3</option>
    <option value="5">Semester 5</option>
    <option value="7">Semester 7</option>
    </select>
    
    <br />
    {renderSemesterInputs()}
    {/* <button onClick={handleSubmit}>Submit</button> */}
    <div className="buttons">
        <button onClick={handleInsertData}>Add Data</button>
      </div>
    </div>

    
  );
});

export default KtDetails;
