import React from "react";
import "./SubjectChoice.css";

const SubjectChoice = () => {
  return (
    <div className="container">
      <h1 className="heading">Subject Choice</h1>
      <div className="tableDiv">
        <table className="course-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Work Expreience</th>
              <th>Theory Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
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
                  value={""}
                  onChange={(e) => ""}
                />
                <label>Yes</label>
                <input
                  type="radio"
                  name="ExpPS"
                  value={""}
                  onChange={(e) => ""}
                />
                <label>No</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="btnDiv">
        <button  type="submit" onClick={() => {}}>
          + ASSIGN FACULTY
        </button>
      </div>
    </div>
  );
};

export default SubjectChoice;
