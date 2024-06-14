import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import CustomDateInput from './CustomDateInput';

const PersonalDetails = forwardRef(({ formData, setFormData, setError }, ref) => {
  const [selectedDate, setDate] = useState(null);
  const [sameAddress, setSameAddress] = useState(false); //change1
  // const [formData, setFormData] = useState({
  //   fullName: '',
  //   email: '',
  //   mobileNumber: '',
  //   fathersName: '',
  //   fathersmobileNumber: '',
  //   fathersOccupation: '',
  //   mothersName: '',
  //   mothersOccupation: '',
  //   mothersmobileNumber: '',
  //   annualIncome: '',
  //   sex: '',
  //   corrAddr: '',
  //   perAddr: '',
  //   area: '',
  //   category: '',
  //   nationality: '',
  //   religion: '',
  //   domicile: '',
  //   mothersTongue: '',
  // });

  const handleChange = (e) => {    //change2
    const { id, value, type, checked } = e.target;
    let newValue = value;

    if (type === 'checkbox') {
      setSameAddress(checked);
      if (checked) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          personalDetails: {
            ...prevFormData.personalDetails,
            perAddr: prevFormData.personalDetails.corrAddr,
          },
        }));
      }
      return;
    }

    if (id !== 'email' && id !== 'annualIncome' && id !== 'sex' && id !== 'area' && id !== 'category') {
      newValue = value.toUpperCase();
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      personalDetails: {
        ...prevFormData.personalDetails,
        [id]: newValue,
      },
    }));
  };

  const handleDateChange = (date) => {
    setDate(date);
    setFormData((prevFormData) => ({...prevFormData, personalDetails: {...prevFormData.personalDetails, dateofBirth: date } }));
  };

  const validate = () => {
    const { 
        fullName,
        email,
        mobileNumber,
        fathersName, 
        fathersmobileNumber,
        fathersOccupation,
        mothersName,
        mothersOccupation,
        mothersmobileNumber,
        annualIncome,
        sex,
        corrAddr,
        perAddr,
        area,
        category,
        nationality,
        religion,
        domicile,
        mothersTongue,
        dateofBirth } = formData.personalDetails;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobilePattern = /^[0-9]{10}$/;
    
        if (!fullName || fullName.trim() === '') {
          setError('Full Name is required.');
          return false;
        }
        if (!email || !emailPattern.test(email)) {
          setError('Valid Email is required.');
          return false;
        }
        if (!mobileNumber || !mobilePattern.test(mobileNumber)) {
          setError('Valid 10-digit Mobile Number is required.');
          return false;
        }
        if (!dateofBirth) {
          setError('Date of Birth is required.');
          return false;
        }
        if (!fathersName || fathersName.trim() === '') {
          setError("Father's Name is required.");
          return false;
        }
        if (!fathersOccupation || fathersOccupation.trim() === '') {
          setError("Father's Occupation is required.");
          return false;
        }
        if (!fathersmobileNumber || !mobilePattern.test(fathersmobileNumber)) {
          setError("Valid 10-digit Father's Mobile Number is required.");
          return false;
        }
        if (!mothersName || mothersName.trim() === '') {
          setError("Mother's Name is required.");
          return false;
        }
        if (!mothersOccupation || mothersOccupation.trim() === '') {
          setError("Mother's Occupation is required.");
          return false;
        }
        if (!mothersmobileNumber || !mobilePattern.test(mothersmobileNumber)) {
          setError("Valid 10-digit Mother's Mobile Number is required.");
          return false;
        }
        if (!annualIncome || annualIncome.trim() === '') {
          setError('Annual Income is required');
          return false;
        }
        if (!sex || sex.trim() === '') {
          setError('Sex is required.');
          return false;
        }
        if (!corrAddr || corrAddr.trim() === '') {
          setError('Correspondence Address is required.');
          return false;
        }
        if (!perAddr || perAddr.trim() === '') {
          setError('Permanent Address is required.');
          return false;
        }
        if (!area || area.trim() === '') {
          setError('Area is required.');
          return false;
        }
        if (!category || category.trim() === '') {
          setError('Category is required.');
          return false;
        }
        if (!nationality || nationality.trim() === '') {
          setError('Nationality is required.');
          return false;
        }
        if (!religion || religion.trim() === '') {
          setError('Religion is required.');
          return false;
        }
        if (!domicile || domicile.trim() === '') {
          setError('Domicile is required.');
          return false;
        }
        if (!mothersTongue || mothersTongue.trim() === '') {
          setError('Mother Tongue is required.');
          return false;
        }
    
    setError('');
    return true;
  };

  useImperativeHandle(ref, () => ({
    validate
  }));


  return (
    <div>
      <h1 className="center page-heading">Personal Details</h1>
      <div className="inputs">
        <div className="input-field">
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" id="fullName" value={formData.personalDetails.fullName} placeholder="Enter full name" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={formData.personalDetails.email} onChange={handleChange} placeholder="Enter email" />
        </div>
        <div className="input-fields side-by-side">
          <div className="input-field">
            <label htmlFor="mobileNumber">Mobile number:</label>
            <input type="text" id="mobileNumber" value={formData.personalDetails.mobileNumber} onChange={handleChange} placeholder="Enter mobile no" />
          </div>
          <div className="input-field">
            <label htmlFor="dateofBirth">Date of birth(dd/mm/yyyy):</label>
            <Datepicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>
        <div className="input-field">
        <label for="fathersName">Father's Name:</label>
        <input type="text" id="fathersName" value={formData.personalDetails.fathersName} onChange={handleChange} placeholder="Enter fathers name" />
      </div>
      <div className="input-fields side-by-side">
        <div className="input-field">
          <label for="fathersOccupation">Father's Occupation:</label>
          <input type="text" id="fathersOccupation" value={formData.personalDetails.fathersOccupation} onChange={handleChange} placeholder="Enter fathers Occupation" />
        </div>
        <div className="input-field">
          <label for="fathersmobileNumber">Father's Mobile Number:</label>
          <input type="text" id="fathersmobileNumber" value={formData.personalDetails.fathersmobileNumber} onChange={handleChange} placeholder="Enter mobile number" />
        </div>
      </div>
      <div className="input-field">
        <label for="mothersName">Mother's Name:</label>
        <input type="text" id="mothersName" value={formData.personalDetails.mothersName} onChange={handleChange} placeholder="Enter Mother's Name" />
      </div>
      <div className="input-fields side-by-side">
        <div className="input-field">
          <label for="mothersOccupation">Mother's Occupation:</label>
          <input type="text" id="mothersOccupation" value={formData.personalDetails.mothersOccupation} onChange={handleChange} placeholder="Enter Mother's occupation" />
        </div>
        <div className="input-field">
          <label for="mothersmobileNumber">Mother's Mobile Number:</label>
          <input type="text" id="mothersmobileNumber" value={formData.personalDetails.mothersmobileNumber} onChange={handleChange} placeholder="Enter Mobile Number" />
        </div>
      </div>
      <div className="input-fields side-by-side">
        <div className="input-field">
          <label for="sex">Sex:</label>
          <select id="sex" className="dropdown-field" value={formData.personalDetails.sex} onChange={handleChange}>
            <option value="enter">Enter gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="input-field">
          <label for="annualIncome">Annual Income:</label>
          <select id="annualIncome" className="dropdown-field" value={formData.personalDetails.annualIncome} onChange={handleChange}>
            <option value="default-income">Enter income range</option>
            <option value="below">Upto ₹2.5 lakhs</option>
            <option value="range1">₹2.5 lakhs to ₹6 lakhs</option>
            <option value="range2">₹6 lakhs to ₹8 lakhs</option>
            <option value="range3">₹8 lakhs to ₹10 lakhs</option>
            <option value="range4">₹10 lakhs to ₹15 lakhs</option>
            <option value="above">Above ₹15 lakhs</option>
          </select>
        </div>
      </div>
      <div className="input-field">
        <label for="corrAddr">Correspondence address:</label>
        <input type="text" id="corrAddr" value={formData.personalDetails.corrAddr} onChange={handleChange} placeholder="Enter correspondence address" />
      </div>
      {/* change3 */}
      <div className="input-field">     
          <label htmlFor="sameAddress">
            <input
              type="checkbox"
              id="sameAddress"
              checked={sameAddress}
              onChange={handleChange}
            />
            Permanent address is same as correspondence address
          </label>
        </div>

      <div className="input-field">
        <label for="perAddr">Permanent address:</label>
        <input type="text" id="perAddr" value={formData.personalDetails.perAddr} onChange={handleChange} placeholder="Enter Permanent address" />
      </div>
      <div className="input-field">
        <label for="area">Area:</label>
        <select id="area" className="dropdown-field" value={formData.personalDetails.area} onChange={handleChange}>
          <option value="default-income">Enter area</option>
          <option value="urban">Urban</option>
          <option value="rural">Rural</option>
        </select>
      </div>
      <div className="input-field">
          <label for="category">Category:</label>
          <select id="category" className="dropdown-field" value={formData.personalDetails.category} onChange={handleChange}>
            <option value="default-category">Enter category</option>
            <option value="general">General</option>
            <option value="obc">OBC</option>
            <option value="sc">SC</option>
            <option value="st">ST</option>
            <option value="ews">EWS</option>
            <option value="ebc">EBC</option>
            <option value="mbc">MBC</option>
          </select>
      </div>
      <div className="input-fields side-by-side">
        <div className="input-field">
          <label for="nationality">Nationality:</label>
          <input type="text" id="nationality" value={formData.personalDetails.nationality} onChange={handleChange} placeholder="Enter Nationality" />
        </div>
        <div className="input-field">
          <label for="religion">Religion:</label>
          <input type="text" id="religion" value={formData.personalDetails.religion} onChange={handleChange} placeholder="Enter Religion" />
        </div>
      </div>
      <div className="input-fields side-by-side">
        <div className="input-field">
          <label for="domicile">Domicile:</label>
          <input type="text" id="domicile" value={formData.personalDetails.domicile} onChange={handleChange} placeholder="Enter domicile number" />
        </div>
        <div className="input-field">
          <label for="mothersTongue">Mother tongue:</label>
          <input type="text" id="mothersTongue" value={formData.personalDetails.mothersTongue} onChange={handleChange} placeholder="Enter mother tongue" />
        </div>
      </div>
      </div>
      <br></br>
    </div>
  );
});

export default PersonalDetails;