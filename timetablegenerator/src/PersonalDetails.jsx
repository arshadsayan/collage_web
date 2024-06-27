import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import CustomDateInput from './CustomDateInput';

const PersonalDetails = forwardRef(({ formData, setFormData, setError }, ref) => {
  const [selectedDate, setDate] = useState(null);
  const [sameAddress, setSameAddress] = useState(false); //change1
  const [isValidDate, setIsValidDate] = useState(false);
  const [formType, setFormType] = useState(formData.formType);
  const [selectedClass, setSelectedClass] = useState(formData.personalDetails.class);
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
  const CustomDateInput=(date,setIsValidDate)=>{
    const currDate =new Date();
    if (date instanceof Date && !isNaN(date)) {
      const age  = currDate.getFullYear() - date.getFullYear();
      if(age>=16){
        
        setFormData({
          ...formData,
          personalDetails: {
            ...formData.personalDetails,
            dateofBirth: date ,
          },
        });
        setIsValidDate(true);
      }else{
        setIsValidDate(false);
        // alert("age must be above 16 ");
      }

    } else {
      setIsValidDate(false); 
    }
  }

  const handleDateChange = (date) => {
    setDate(date); // Update selectedDate state with the new date
    CustomDateInput(date, setIsValidDate); // Validate the date and update isValidDate
  };

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

    if (id !== 'email' && id !== 'annualIncome' && id !== 'sex' && id !== 'area' && id !== 'category' && id !== 'state' && id !== 'nationality' && id !== 'religion') {
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

  // const handleDateChange = (date) => {
  //   setDate(date);
  //   setFormData((prevFormData) => ({...prevFormData, personalDetails: {...prevFormData.personalDetails, dateofBirth: date } }));
  // };

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
            <label htmlFor="fullName">Full Name (according to HSC marksheet):</label>
            <input type="text" id="fullName" value={formData.personalDetails.fullName} placeholder="Enter full name" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={formData.personalDetails.email} onChange={handleChange} placeholder="Enter email" />
        </div>
        {/* {formType === 'Form B' || formType === 'Form A' ? (
        <>
          <div className="input-field">
            <label htmlFor="class">Class:</label>
            <input type="text" id="class" value={formData.personalDetails.class} disabled />
          </div>
          <div className="input-field">
            <label htmlFor="juniorCollege">Enter your Junior College</label>
            <input
              type="text"
              id="juniorCollege"
              value={formData.personalDetails.juniorCollege}
              onChange={handleChange}
            />
          </div>
        </>
      ) : (
        <div className="input-field">
          <label htmlFor="class">Class:</label>
          <select id="class" className="dropdown-field" value={formData.personalDetails.class} onChange={handleChange}>
            <option value="null">Choose Class</option>
            <option value="SE">SE</option>
            <option value="TE">TE</option>
            <option value="BE">BE</option>
          </select>
        </div>
      )}
      {formData.personalDetails.class === 'SE' && (
        <div className="input-field">
          <label htmlFor="juniordseCollege">Enter your Junior College (For DSE only)</label>
          <input type="text" id="juniordseCollege" value={formData.personalDetails.juniordseCollege} onChange={handleChange} />
        </div>
      )} */}
        <div className="input-fields side-by-side">
          <div className="input-field">
            <label htmlFor="mobileNumber">Mobile number:</label>
            <input type="text" id="mobileNumber" value={formData.personalDetails.mobileNumber} onChange={handleChange} placeholder="Enter mobile no" />
          </div>
          <div className="input-field">
            <label htmlFor="dateofBirth">Date of birth(dd/mm/yyyy):</label>
            <Datepicker
              selected={formData.personalDetails.dateofBirth}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              customInput={<input type="text" value={selectedDate ? selectedDate.toLocaleDateString('en-GB') : ''} />}
            />
            {selectedDate != null && !isValidDate && (
        <p style={{ color: 'red', fontSize: '0.8em' }}>Please enter a valid date.</p>
      )}
          </div>
        </div>
        <div className="input-field">
        <label for="fathersName">Father's Name:</label>
        <input type="text" id="fathersName" value={formData.personalDetails.fathersName} onChange={handleChange} placeholder="Enter fathers name" />
      </div>
      <div className="input-field">
            <label htmlFor="birthPlace">Birth Place:</label>
            <input type="text" id="birthPlace" value={formData.personalDetails.birthPlace} placeholder="Enter birth place" onChange={handleChange} />
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
          <label for="sex">Gender:</label>
          <select id="sex" className="dropdown-field" value={formData.personalDetails.sex} onChange={handleChange}>
            <option value="" disabled selected>Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="input-field">
          <label for="annualIncome">Annual Income:</label>
          <select id="annualIncome" className="dropdown-field" value={formData.personalDetails.annualIncome} onChange={handleChange}>
            <option value="" disabled selected>Select income range</option>
            <option value="Upto ₹2.5 lakhs">Upto ₹2.5 lakhs</option>
            <option value="₹2.5 lakhs to ₹6 lakhs">₹2.5 lakhs to ₹6 lakhs</option>
            <option value="₹6 lakhs to ₹8 lakhs">₹6 lakhs to ₹8 lakhs</option>
            <option value="₹8 lakhs to ₹10 lakhs3">₹8 lakhs to ₹10 lakhs</option>
            <option value="₹10 lakhs to ₹15 lakhs">₹10 lakhs to ₹15 lakhs</option>
            <option value="Above ₹15 lakhs">Above ₹15 lakhs</option>
          </select>
        </div>
      </div>

      <div className="input-field">
        <label htmlFor="bloodGroup">Blood Group:</label>
        <select id="bloodGroup" className="dropdown-field" value={formData.personalDetails.bloodGroup} onChange={handleChange}>
        <option value="" disabled selected>Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
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
  <label htmlFor="state">State:</label>
  <select id="state" className="dropdown-field" value={formData.personalDetails.state} onChange={handleChange}>
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
    <option value="Assam">Assam</option>
    <option value="Bihar">Bihar</option>
    <option value="Chhattisgarh">Chhattisgarh</option>
    <option value="Goa">Goa</option>
    <option value="Gujarat">Gujarat</option>
    <option value="Haryana">Haryana</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Kerala">Kerala</option>
    <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharashtra">Maharashtra</option>
    <option value="Manipur">Manipur</option>
    <option value="Meghalaya">Meghalaya</option>
    <option value="Mizoram">Mizoram</option>
    <option value="Nagaland">Nagaland</option>
    <option value="Odisha">Odisha</option>
    <option value="Punjab">Punjab</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Sikkim">Sikkim</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Telangana">Telangana</option>
    <option value="Tripura">Tripura</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Uttarakhand">Uttarakhand</option>
    <option value="West Bengal">West Bengal</option>
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Delhi">Delhi</option>
    <option value="Puducherry">Puducherry</option>
  </select>
</div>

      <div className="input-field">
        <label for="area">Area:</label>
        <select id="area" className="dropdown-field" value={formData.personalDetails.area} onChange={handleChange}>
          <option value="" disabled selected>Enter area</option>
          <option value="Urban">Urban</option>
          <option value="Rural">Rural</option>
        </select>
      </div>

      <div className="input-field">
          <label for="category">Category:</label>
          <select id="category" className="dropdown-field" value={formData.personalDetails.category} onChange={handleChange}>
          <option value="" disabled selected>Select Category</option>
            <option value="GENERAL">GENERAL</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="EWS">EWS</option>
            <option value="NT">NT</option>
            <option value="SEBC">SEBC</option>
            <option value="MARATHA">MARATHA</option>
            <option value="SBC">SBC</option>
          </select>
      </div>

      <div className="input-fields side-by-side">
        <div className="input-field">
          <label for="nationality">Nationality:</label>
          <select id="nationality" className="dropdown-field" value={formData.personalDetails.nationality} onChange={handleChange}>
  <option value="Afghan">Afghan</option>
  <option value="Albanian">Albanian</option>
  <option value="Algerian">Algerian</option>
  <option value="American">American</option>
  <option value="Andorran">Andorran</option>
  <option value="Angolan">Angolan</option>
  <option value="Anguillan">Anguillan</option>
  <option value="Argentine">Argentine</option>
  <option value="Armenian">Armenian</option>
  <option value="Australian">Australian</option>
  <option value="Austrian">Austrian</option>
  <option value="Azerbaijani">Azerbaijani</option>
  <option value="Bahamian">Bahamian</option>
  <option value="Bahraini">Bahraini</option>
  <option value="Bangladeshi">Bangladeshi</option>
  <option value="Barbadian">Barbadian</option>
  <option value="Belarusian">Belarusian</option>
  <option value="Belgian">Belgian</option>
  <option value="Belizean">Belizean</option>
  <option value="Beninese">Beninese</option>
  <option value="Bermudian">Bermudian</option>
  <option value="Bhutanese">Bhutanese</option>
  <option value="Bolivian">Bolivian</option>
  <option value="Botswanan">Botswanan</option>
  <option value="Brazilian">Brazilian</option>
  <option value="British">British</option>
  <option value="British Virgin Islander">British Virgin Islander</option>
  <option value="Bruneian">Bruneian</option>
  <option value="Bulgarian">Bulgarian</option>
  <option value="Burkinan">Burkinan</option>
  <option value="Burmese">Burmese</option>
  <option value="Burundian">Burundian</option>
  <option value="Cambodian">Cambodian</option>
  <option value="Cameroonian">Cameroonian</option>
  <option value="Canadian">Canadian</option>
  <option value="Cape Verdean">Cape Verdean</option>
  <option value="Cayman Islander">Cayman Islander</option>
  <option value="Central African">Central African</option>
  <option value="Chadian">Chadian</option>
  <option value="Chilean">Chilean</option>
  <option value="Chinese">Chinese</option>
  <option value="Citizen of Antigua and Barbuda">Citizen of Antigua and Barbuda</option>
  <option value="Citizen of Bosnia and Herzegovina">Citizen of Bosnia and Herzegovina</option>
  <option value="Citizen of Guinea-Bissau">Citizen of Guinea-Bissau</option>
  <option value="Citizen of Kiribati">Citizen of Kiribati</option>
  <option value="Citizen of Seychelles">Citizen of Seychelles</option>
  <option value="Citizen of the Dominican Republic">Citizen of the Dominican Republic</option>
  <option value="Citizen of Vanuatu">Citizen of Vanuatu</option>
  <option value="Colombian">Colombian</option>
  <option value="Comoran">Comoran</option>
  <option value="Congolese (Congo)">Congolese (Congo)</option>
  <option value="Congolese (DRC)">Congolese (DRC)</option>
  <option value="Cook Islander">Cook Islander</option>
  <option value="Costa Rican">Costa Rican</option>
  <option value="Croatian">Croatian</option>
  <option value="Cuban">Cuban</option>
  <option value="Cymraes">Cymraes</option>
  <option value="Cymro">Cymro</option>
  <option value="Cypriot">Cypriot</option>
  <option value="Czech">Czech</option>
  <option value="Danish">Danish</option>
  <option value="Djiboutian">Djiboutian</option>
  <option value="Dominican">Dominican</option>
  <option value="Dutch">Dutch</option>
  <option value="East Timorese">East Timorese</option>
  <option value="Ecuadorean">Ecuadorean</option>
  <option value="Egyptian">Egyptian</option>
  <option value="Emirati">Emirati</option>
  <option value="English">English</option>
  <option value="Equatorial Guinean">Equatorial Guinean</option>
  <option value="Eritrean">Eritrean</option>
  <option value="Estonian">Estonian</option>
  <option value="Ethiopian">Ethiopian</option>
  <option value="Faroese">Faroese</option>
  <option value="Fijian">Fijian</option>
  <option value="Filipino">Filipino</option>
  <option value="Finnish">Finnish</option>
  <option value="French">French</option>
  <option value="Gabonese">Gabonese</option>
  <option value="Gambian">Gambian</option>
  <option value="Georgian">Georgian</option>
  <option value="German">German</option>
  <option value="Ghanaian">Ghanaian</option>
  <option value="Gibraltarian">Gibraltarian</option>
  <option value="Greek">Greek</option>
  <option value="Greenlandic">Greenlandic</option>
  <option value="Grenadian">Grenadian</option>
  <option value="Guamanian">Guamanian</option>
  <option value="Guatemalan">Guatemalan</option>
  <option value="Guinean">Guinean</option>
  <option value="Guyanese">Guyanese</option>
  <option value="Haitian">Haitian</option>
  <option value="Honduran">Honduran</option>
  <option value="Hong Konger">Hong Konger</option>
  <option value="Hungarian">Hungarian</option>
  <option value="Icelandic">Icelandic</option>
  <option value="Indian">Indian</option>
  <option value="Indonesian">Indonesian</option>
  <option value="Iranian">Iranian</option>
  <option value="Iraqi">Iraqi</option>
  <option value="Irish">Irish</option>
  <option value="Israeli">Israeli</option>
  <option value="Italian">Italian</option>
  <option value="Ivorian">Ivorian</option>
  <option value="Jamaican">Jamaican</option>
  <option value="Japanese">Japanese</option>
  <option value="Jordanian">Jordanian</option>
  <option value="Kazakh">Kazakh</option>
  <option value="Kenyan">Kenyan</option>
  <option value="Kittitian">Kittitian</option>
  <option value="Kosovan">Kosovan</option>
  <option value="Kuwaiti">Kuwaiti</option>
  <option value="Kyrgyz">Kyrgyz</option>
  <option value="Lao">Lao</option>
  <option value="Latvian">Latvian</option>
  <option value="Lebanese">Lebanese</option>
  <option value="Liberian">Liberian</option>
  <option value="Libyan">Libyan</option>
  <option value="Liechtenstein citizen">Liechtenstein citizen</option>
  <option value="Lithuanian">Lithuanian</option>
  <option value="Luxembourger">Luxembourger</option>
  <option value="Macanese">Macanese</option>
  <option value="Macedonian">Macedonian</option>
  <option value="Malagasy">Malagasy</option>
  <option value="Malawian">Malawian</option>
  <option value="Malaysian">Malaysian</option>
  <option value="Maldivian">Maldivian</option>
  <option value="Malian">Malian</option>
  <option value="Maltese">Maltese</option>
  <option value="Marshallese">Marshallese</option>
  <option value="Martiniquais">Martiniquais</option>
  <option value="Mauritanian">Mauritanian</option>
  <option value="Mauritian">Mauritian</option>
  <option value="Mexican">Mexican</option>
  <option value="Micronesian">Micronesian</option>
  <option value="Moldovan">Moldovan</option>
  <option value="Monegasque">Monegasque</option>
  <option value="Mongolian">Mongolian</option>
  <option value="Montenegrin">Montenegrin</option>
  <option value="Montserratian">Montserratian</option>
  <option value="Moroccan">Moroccan</option>
  <option value="Mosotho">Mosotho</option>
  <option value="Mozambican">Mozambican</option>
  <option value="Namibian">Namibian</option>
  <option value="Nauruan">Nauruan</option>
  <option value="Nepalese">Nepalese</option>
  <option value="New Zealander">New Zealander</option>
  <option value="Nicaraguan">Nicaraguan</option>
  <option value="Nigerian">Nigerian</option>
  <option value="Niuean">Niuean</option>
  <option value="North Korean">North Korean</option>
  <option value="Northern Irish">Northern Irish</option>
  <option value="Norwegian">Norwegian</option>
  <option value="Omani">Omani</option>
  <option value="Pakistani">Pakistani</option>
  <option value="Palauan">Palauan</option>
  <option value="Palestinian">Palestinian</option>
  <option value="Panamanian">Panamanian</option>
  <option value="Papua New Guinean">Papua New Guinean</option>
  <option value="Paraguayan">Paraguayan</option>
  <option value="Peruvian">Peruvian</option>
  <option value="Pitcairn Islander">Pitcairn Islander</option>
  <option value="Polish">Polish</option>
  <option value="Portuguese">Portuguese</option>
  <option value="Prydeinig">Prydeinig</option>
  <option value="Puerto Rican">Puerto Rican</option>
  <option value="Qatari">Qatari</option>
  <option value="Romanian">Romanian</option>
  <option value="Russian">Russian</option>
  <option value="Rwandan">Rwandan</option>
  <option value="Salvadorean">Salvadorean</option>
  <option value="Sammarinese">Sammarinese</option>
  <option value="Samoan">Samoan</option>
  <option value="Sao Tomean">Sao Tomean</option>
  <option value="Saudi Arabian">Saudi Arabian</option>
  <option value="Scottish">Scottish</option>
  <option value="Senegalese">Senegalese</option>
  <option value="Serbian">Serbian</option>
  <option value="Sierra Leonean">Sierra Leonean</option>
  <option value="Singaporean">Singaporean</option>
  <option value="Slovak">Slovak</option>
  <option value="Slovenian">Slovenian</option>
  <option value="Solomon Islander">Solomon Islander</option>
  <option value="Somali">Somali</option>
  <option value="South African">South African</option>
  <option value="South Korean">South Korean</option>
  <option value="South Sudanese">South Sudanese</option>
  <option value="Spanish">Spanish</option>
  <option value="Sri Lankan">Sri Lankan</option>
  <option value="St Helenian">St Helenian</option>
  <option value="St Lucian">St Lucian</option>
  <option value="Stateless">Stateless</option>
  <option value="Sudanese">Sudanese</option>
  <option value="Surinamese">Surinamese</option>
  <option value="Swazi">Swazi</option>
  <option value="Swedish">Swedish</option>
  <option value="Swiss">Swiss</option>
  <option value="Syrian">Syrian</option>
  <option value="Taiwanese">Taiwanese</option>
  <option value="Tajik">Tajik</option>
  <option value="Tanzanian">Tanzanian</option>
  <option value="Thai">Thai</option>
  <option value="Togolese">Togolese</option>
  <option value="Tongan">Tongan</option>
  <option value="Trinidadian">Trinidadian</option>
  <option value="Tristanian">Tristanian</option>
  <option value="Tunisian">Tunisian</option>
  <option value="Turkish">Turkish</option>
  <option value="Turkmen">Turkmen</option>
  <option value="Turks and Caicos Islander">Turks and Caicos Islander</option>
  <option value="Tuvaluan">Tuvaluan</option>
  <option value="Ugandan">Ugandan</option>
  <option value="Ukrainian">Ukrainian</option>
  <option value="Uruguayan">Uruguayan</option>
  <option value="Uzbek">Uzbek</option>
  <option value="Vatican citizen">Vatican citizen</option>
  <option value="Venezuelan">Venezuelan</option>
  <option value="Vietnamese">Vietnamese</option>
  <option value="Vincentian">Vincentian</option>
  <option value="Wallisian">Wallisian</option>
  <option value="Welsh">Welsh</option>
  <option value="Yemeni">Yemeni</option>
  <option value="Zambian">Zambian</option>
  <option value="Zimbabwean">Zimbabwean</option>
</select>

  </div>
        <div className="input-field">
          <label for="religion">Religion:</label>
          <select id="religion" className="dropdown-field" value={formData.personalDetails.religion} onChange={handleChange}>
          <option value="" disabled selected>Select Religion</option>
          <option value="Hinduism">Hinduism</option>
            <option value="Christianity">Christianity</option>
            <option value="Buddhism">Buddhism</option>
            <option value="Jainism">Jainism</option>
            <option value="Muslim">Muslim</option>
          </select>
        </div>
      </div>
      <div className="input-fields side-by-side">
        <div className="input-field">
          <label for="domicile">Domicile (state):</label>
          <input type="text" id="domicile" value={formData.personalDetails.domicile} onChange={handleChange} placeholder="Enter domicile state" />
        </div>
        <div className="input-field">
          <label for="mothersTongue">Mother tongue:</label>
          <input type="text" id="mothersTongue" value={formData.personalDetails.mothersTongue} onChange={handleChange} placeholder="Enter mother tongue" />
        </div>
      </div>
      </div>
      
    </div>
  );
});

export default PersonalDetails;