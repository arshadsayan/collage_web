import React, {useState} from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomDateInput from './CustomDateInput';

export default function Adddept() {
  const [selectedDate, setDate] = useState(null);
  return (
    <div>
    <form id = "add-dept-cont">
    <div className="inputs">
      <div className="input-field">
        <label for="department-name">Full Name:</label>
        <input type="text" id="department-name" placeholder="Enter department name" />
      </div>
      <div className="input-field">
        <label for="semester">Email:</label>
        <input type="text" id="semester" placeholder="Enter semester" />
      </div>
      <div className="input-fields side-by-side">
        <div className="input-field">
          <label for="semester">Mobile number:</label>
          <input type="text" id="semester" placeholder="Enter semester" />
        </div>
        <div className="input-field">
          <label for="semester">Date of birth:</label>
          <Datepicker 
            selected={selectedDate} 
            onChange={date => setDate(date)} 
            customInput={<CustomDateInput />}
          />
        </div>
      </div>
      <div className="input-field">
        <label for="semester">Father's Name:</label>
        <input type="text" id="semester" placeholder="Enter semester" />
      </div>
      <div className="input-fields side-by-side">
        <div className="input-field">
          <label for="semester">Father's Occupation:</label>
          <input type="text" id="semester" placeholder="Enter semester" />
        </div>
        <div className="input-field">
          <label for="semester">Father's Mobile Number:</label>
          <input type="text" id="semester" placeholder="Enter semester" />
        </div>
      </div>
      <div className="input-field">
        <label for="semester">Mother's Name:</label>
        <input type="text" id="semester" placeholder="Enter semester" />
      </div>
      <div className="input-fields side-by-side">
        <div className="input-field">
          <label for="semester">Mother's Occupation:</label>
          <input type="text" id="semester" placeholder="Enter semester" />
        </div>
        <div className="input-field">
          <label for="semester">Mother's Mobile Number:</label>
          <input type="text" id="semester" placeholder="Enter semester" />
        </div>
      </div>
      <div className="input-fields side-by-side">
        <div className="input-field">
          <label for="sex">Sex:</label>
          <select id="sex" className="dropdown-field">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="input-field">
          <label for="semester">Annual Income:</label>
          <input type="text" id="semester" placeholder="Enter semester" />
        </div>
      </div>
      <div className="input-field">
        <label for="semester">Correspondence address:</label>
        <input type="text" id="semester" placeholder="Enter semester" />
      </div>
      <div className="input-field">
        <label for="semester">Permanent address:</label>
        <input type="text" id="semester" placeholder="Enter semester" />
      </div>
      <div className="input-field">
        <label for="sex">Area:</label>
        <select id="sex" className="dropdown-field">
          <option value="urban">Urban</option>
          <option value="rural">Rural</option>
        </select>
      </div>
      <div className="input-field">
          <label for="sex">Category:</label>
          <select id="sex" className="dropdown-field">
            <option value="male">General</option>
            <option value="other">OBC</option>
            <option value="female">SC</option>
            <option value="other">ST</option>
            <option value="other">EWS</option>
            <option value="other">EBC</option>
            <option value="other">MBC</option>
          </select>
      </div>
      <div className="input-fields side-by-side">
        <div className="input-field">
          <label for="semester">Nationality:</label>
          <input type="text" id="semester" placeholder="Enter semester" />
        </div>
        <div className="input-field">
          <label for="semester">Religion:</label>
          <input type="text" id="semester" placeholder="Enter semester" />
        </div>
      </div>
      <div className="input-fields side-by-side">
        <div className="input-field">
          <label for="semester">Domicile:</label>
          <input type="text" id="semester" placeholder="Enter semester" />
        </div>
        <div className="input-field">
          <label for="semester">Mother tongue:</label>
          <input type="text" id="semester" placeholder="Enter semester" />
        </div>
      </div>
    </div>
    <label id="course-details">Course Details: </label>
    <table className="course-table">
      <thead>
        <tr>
          <th>Exam Passed</th>
          <th>Board / University</th>
          <th>Year of passing</th>
          <th>Total marks</th>
          <th>Marks obtained</th>
          <th>Percentage</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>S.S.C(10th)</th>
          <td><input type="text" className="course-code" /></td>
          <td><input type="text" className="course-name" /></td>
          <td><input type="text" className="theory-time" /></td>
          <td><input type="text" className="practical-time" /></td>
          <td><input type="text" className="tutorial-time" /></td>
        </tr>
        <tr>
          <th>H.S.C(12th) / Diploma</th>
          <td><input type="text" className="course-code" /></td>
          <td><input type="text" className="course-name" /></td>
          <td><input type="text" className="theory-time" /></td>
          <td><input type="text" className="practical-time" /></td>
          <td><input type="text" className="tutorial-time" /></td>
        </tr>
      </tbody>
    </table>
    <br></br>
    <h1 className="center page-heading">CET Details</h1>
    <div className="center">
      <button className="add-course">+ SUBMIT DATA</button>
    </div>
    </form>
    </div>
  );
}
