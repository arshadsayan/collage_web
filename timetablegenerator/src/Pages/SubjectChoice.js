import React from "react";

const SubjectChoice = () => {
  return (
    <div className="container">
      <h1>Subject Choice</h1>
      <table className="course-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Work Expreience</th>
            <th>Theory Time</th>
          </tr>
        </thead>
        <tbody>
          <td>
            <input
              type="text"
              name="CourseName"
              placeholder="Course Name"
              value={""}
              onChange={(e) => ""}
            />
          </td>
          <td>
            <input
              type="text"
              name="WorkExperience"
              placeholder="Work Experience"
              value={""}
              onChange={(e) => ""}
            />
          </td>
          <td>
            <input
              type="radio"
              name="ExpPS"
              placeholder="Course Name"
              value={""}
              onChange={(e) => ""}
            />
            <input
              type="radio"
              name="ExpPS"
              placeholder="Course Name"
              value={""}
              onChange={(e) => ""}
            />
          </td>
        </tbody>
      </table>
      <div>
        <button
        type="submit">
          + ASSIGN FACULTY 
        </button>
      </div>
    </div>
  );
};

export default SubjectChoice;
