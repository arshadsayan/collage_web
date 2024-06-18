import React, { useState, forwardRef, useImperativeHandle } from 'react';

const CETDetails = forwardRef(({ formData, setFormData, setError }, ref) => {
//change1
  const handleChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;

    // Validate based on input id
    switch (id) {
      case 'cetappId':
      case 'cetrollNo':
      case 'jeeappNum':
        // Allow only integers
        // newValue = value.replace(/\D/g, '');
        newValue = value;
        break;
      case 'cetmathsPer':
      case 'cetphysicsPer':
      case 'cetchemistryPer':
      case 'cetPer':
      case 'jeePer':
        // Allow only floats with 2 digits after decimal
        newValue = value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters except dot
        const match = /^(\d*\.?\d{0,7})/.exec(newValue);
        if (match) {
          newValue = match[1];
        }
        
        break;
      default:
        break;
    }

    // Update formData state
    setFormData((prevFormData) => ({
      ...prevFormData,
      cetDetails: {
        ...prevFormData.cetDetails,
        [id]: newValue
      }
    }));
  };

  const validate = () => {
    const { cetappId, cetrollNo, cetmathsPer, cetphysicsPer, cetchemistryPer, cetPer, jeeappNum, jeePer } = formData.cetDetails;

    if (!cetappId || !cetrollNo || !cetmathsPer || !cetphysicsPer || !cetchemistryPer || !cetPer || !jeeappNum || !jeePer) {
      setError('Please fill out all fields.');
      return false;
    }

    const percentages = [cetmathsPer, cetphysicsPer, cetchemistryPer, cetPer, jeePer];
    for (const percentage of percentages) {
      if (isNaN(parseFloat(percentage)) || parseFloat(percentage) < 0 || parseFloat(percentage) > 100) {
        setError(<span style={{ color: 'red' }}>'Percentages and percentiles must be between 0 and 100.'</span>);
        return false;
      }
    }

    setError('');
    return true;
  };

  useImperativeHandle(ref, () => ({
    validate
  }));
//till here chnge1
  return (
    <div>
      <h1 className="center page-heading">CET Details</h1>

      <div className="input-fields side-by-side">
        <div className="input-field">
          <label for="cetappId">CET application ID:</label>
          <input type="text" id="cetappId" value={formData.cetDetails.cetappId} onChange={handleChange} placeholder="Enter semester" />
        </div>
        <div className="input-field">
          <label for="cetrollNo">CET roll number:</label>
          <input type="text" id="cetrollNo" value={formData.cetDetails.cetrollNo} onChange={handleChange} placeholder="Enter semester" />
        </div>
      </div>
      <div className="input-fields side-by-side">
        <div className="input-field">
          <label for="cetmathsPer">CET maths percentile:</label>
          <input type="text" id="cetmathsPer" value={formData.cetDetails.cetmathsPer} onChange={handleChange} placeholder="Enter semester" />
        </div>
        <div className="input-field">
          <label for="cetphysicsPer">CET physics percentile:</label>
          <input type="text" id="cetphysicsPer" value={formData.cetDetails.cetphysicsPer} onChange={handleChange} placeholder="Enter semester" />
        </div>
      </div>
      <div className="input-fields side-by-side">
        <div className="input-field">
          <label for="cetchemistryPer">CET chemistry percentile:</label>
          <input type="text" id="cetchemistryPer" value={formData.cetDetails.cetchemistryPer} onChange={handleChange} placeholder="Enter semester" />
        </div>
        <div className="input-field">
          <label for="cetPer">CET Percentile:</label>
          <input type="text" id="cetPer" value={formData.cetDetails.cetPer} onChange={handleChange} placeholder="Enter semester" />
        </div>
      </div>


      <h1 className="center page-heading">JEE Details</h1>
      <div className="input-fields side-by-side">
        <div className="input-field">
          <label for="jeeappNum">JEE application number:</label>
          <input type="text" id="jeeappNum" value={formData.cetDetails.jeeappNum} onChange={handleChange} placeholder="Enter semester" />
        </div>
        <div className="input-field">
          <label for="jeePer">JEE percentile:</label>
          <input type="text" id="jeePer" value={formData.cetDetails.jeePer} onChange={handleChange} placeholder="Enter semester" />
        </div>
      </div>
      <br></br>
      {/* Add your CET details form fields here */}
    </div>
  );
});

export default CETDetails;