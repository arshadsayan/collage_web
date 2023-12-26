import React from 'react'

export default function adddept() {
  return (
    <div>
    <form id = "add-dept-cont">
    <div className="inputs">
      <div className="input-field">
        <label for="department-name">Department Name:</label>
        <input type="text" id="department-name" placeholder="Enter department name" />
      </div>
      <div className="input-field">
        <label for="semester">Semester:</label>
        <input type="text" id="semester" placeholder="Enter semester" />
      </div>
    </div>
    <label id="course-details">Course Details: </label>
    <table className="course-table">
      <thead>
        <tr>
          <th>Course Code</th>
          <th>Course Name</th>
          <th>Theory Time</th>
          <th>Practical Time</th>
          <th>Tutorial Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type="text" className="course-code" /></td>
          <td><input type="text" className="course-name" /></td>
          <td><input type="text" className="theory-time" /></td>
          <td><input type="text" className="practical-time" /></td>
          <td><input type="text" className="tutorial-time" /></td>
        </tr>
      </tbody>
    </table>
    <div className="center">
      <button className="add-course">+ ADD COURSE</button>
    </div>
    </form>
    </div>
  );
}
