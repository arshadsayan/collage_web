import React, { useState, useEffect, forwardRef } from 'react';

const initialOptions = [
  'Computer Engineering',
  'Information Technology',
  'Computer Science Engineering - Artificial Intelligence and Data Science',
  'Computer Science Engineering - Artificial Intelligence and Machine Learning',
  'Computer Science Engineering - Internet of Things',
  'Electronics and Telecommunication',
  'Computer Science Engineering - Electronics and Computer Science',
  'Mechanical Engineering'
];

const PreferenceFormAdmin = forwardRef(({ formData, setFormData, setError }) => {
  const [preference, setPreference] = useState(formData.preference || '');

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      preference
    }));
  }, [preference, setFormData]);

  const handlePreferenceChange = (value) => {
    setPreference(value);
  };

  const isFirstPreferenceEmpty = preference === '';

  return (
    <div className='container'>
      <div className='inputs'>
        <h1 className="center page-heading">Allotment Details</h1>
        <div className='input-field'>
          <label htmlFor="preference">Preference: </label>
          <select
            id="preference"
            className='dropdown-field'
            value={preference}
            onChange={(e) => handlePreferenceChange(e.target.value)}
          >
            <option value="">Select preference</option>
            {initialOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {isFirstPreferenceEmpty && <span className="error">Preference is required.</span>}
        </div>
      </div>
    </div>
  );
});

export default PreferenceFormAdmin;