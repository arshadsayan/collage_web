import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';

// KT Component
const KTComponent = ({ index, onChangeSubject, onChangeClearedDate }) => {
  return (
    <div className="inputs">
      <div className="input-field side-by-side">
        <label>
          Subject {index + 1}:
          <input type="text" onChange={(e) => onChangeSubject(index, e)} />
        </label>
        <div className="input-field">
          <br />
          <label>
            Cleared Date (if active do not enter date):
            <input type="date" onChange={(e) => onChangeClearedDate(index, e)} />
          </label>
        </div>
      </div>
      <br />
    </div>
  );
};

// KtDetails Component
const KtDetails = forwardRef(({ formDataC, setFormData, setError }, ref) => {
  const [currentSemester, setCurrentSemester] = useState('');
  const [attemptsData, setAttemptsData] = useState({});

  const handleSemesterChange = (e) => {
    const sem = parseInt(e.target.value);
    setCurrentSemester(sem.toString()); // Store as string to match option values
    if (!attemptsData[sem]) {
      setAttemptsData({ ...attemptsData, [sem]: { attempts: 0, kts: [] } });
    }
  };

  const handleAttemptsChange = (sem, e) => {
    const attempts = parseInt(e.target.value);

    // Validate attempts
    if (isNaN(attempts) || attempts < 0 || attempts > currentSemester - sem) {
      setError('Invalid number of attempts.');
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

    setError('');
  };

  const handleKtsChange = (sem, e) => {
    const numberOfKts = parseInt(e.target.value);

    // Validate number of kts
    if (isNaN(numberOfKts) || numberOfKts < 0 || numberOfKts > 6) {
      setError('Invalid number of KT subjects.');
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

    setError('');
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
    const numberOfKts = attemptsData[sem]?.kts.length || 0;

    return (
      <div className="input-field">
        <label>
          Number of KT subjects:
          <select className="dropdown-field" value={numberOfKts} onChange={(e) => handleKtsChange(sem, e)}>
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
  };

  const renderSemesterInputs = () => {
    const inputs = [];
    for (let i = 1; i < parseInt(currentSemester); i++) {
      inputs.push(
        <div key={i} className="input">
          <h3>Semester {i}</h3>
          <div className="input-field side-by-side">
            <label>
              Attempts taken to clear Semester {i}:
              <input
                type="number"
                style={{ width: '150px', padding: '10px', fontSize: '16px' }}
                value={attemptsData[i]?.attempts || ''}
                onChange={(e) => handleAttemptsChange(i, e)}
              />
            </label>
          </div>
          <br />
          {attemptsData[i]?.attempts > 1 && (
            <div>
              <br />
              {renderKtInputs(i)}
            </div>
          )}
        </div>
      );
    }
    return inputs;
  };


  const handleupdate = () => {
    // Validate before submitting
    if (!currentSemester) {
      setError('Please select a current semester.');
      return;
    }

    for (let i = 1; i < parseInt(currentSemester); i++) {
      if (!attemptsData[i]?.attempts || attemptsData[i]?.attempts <= 0) {
        setError(`Please enter valid attempts for Semester ${i}.`);
        return;
      }

      if (attemptsData[i]?.attempts > 1 && (!attemptsData[i]?.kts || attemptsData[i]?.kts.length !== attemptsData[i]?.attempts)) {
        setError(`Please enter all KT subjects for Semester ${i}.`);
        return;
      }
    }

    // Prepare data to export
    const dataToExport = {
      currentSemester: currentSemester,
      attemptsData: attemptsData
    };

    // Convert to JSON string
    const jsonData = JSON.stringify(dataToExport, null, 2);

    // Update form data state
    setFormData(prevFormData => ({
      ...prevFormData,
      ktDetails: {
        ...prevFormData.ktDetails,
        jsondata: jsonData
      }
    }));

    // Clear any existing errors
    setError('');
  };

  useEffect(() => {
    // Call handleupdate() when currentSemester or attemptsData changes
    if (currentSemester && Object.keys(attemptsData).length > 0) {
      handleupdate();
    }
  }, [currentSemester, attemptsData]);

  // Validate function to check form completeness
  const validate = () => {
    if (!currentSemester) {
      setError('Please select a current semester.');
      return false;
    }

    for (let i = 1; i < parseInt(currentSemester); i++) {
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

  return (
    <div className="inputs">
      <h2>Current Semester: {currentSemester}</h2>
      <label>Select Current Semester:</label>
      <select className="dropdown-field" value={currentSemester} onChange={handleSemesterChange}>
        <option value="" disabled>Select Semester</option>
        <option value="3">Semester 3</option>
        <option value="5">Semester 5</option>
        <option value="7">Semester 7</option>
      </select>
      <br />
      {renderSemesterInputs()}
      {/* {handleupdate()} */}
      {/* <button onClick={handleSubmit}>Submit</button> */}
    </div>
  );
});

export default KtDetails;
