import "bootstrap/dist/css/bootstrap.min.css";
import './Admin.css'
import React  from "react";
import { useNavigate } from 'react-router-dom';

function Admin() {
    // let Applicants = {1:["XYZ",12127812]}
    const navigate = useNavigate();
    const handleButtonClick = () => navigate('/documentverification')
  return (
    <>
    <div className="title">
        <h2>Applicants list</h2>
    </div>
    <div className="table-container">
    <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Application number</th>
            <th scope="col">Verify</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>218731982</td>
            <td> 
                <button type="button" onClick={handleButtonClick} class="btn btn-primary">Primary</button> 
            </td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>218731982</td>
            <td> 
                <button type="button" class="btn btn-primary">Primary</button> 
            </td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>218731982</td>
            <td> 
                <button type="button" class="btn btn-primary">Primary</button> 
            </td>
          </tr>
        </tbody>
      </table>
    </div>
      
    </>
  );
}

export default Admin;
