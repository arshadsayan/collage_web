import React, { useState } from 'react'
import './styles.css'
import './styles-import.css'
import Adddept from './adddept';
// import Importdept from './importdept';
// import './import';

// var departmentButton = false;
// var importButton = false;

export default function App() {

  // const [dept, setDept] = useState(false);
  // const [impr, setImpr] = useState(false);

  // function deptAdder() {
  //   setDept(true);
  //   setImpr(false);
  // }
  
  // function importAdder() {
  //   setImpr(true);
  //   setDept(false);
  // }
  

  return (
    <div className="container">
      <h1 className="center page-heading">Personal Details</h1>
      <Adddept />
      {/* <div className="buttons">
        <button id="add-department" onClick={deptAdder}>+ ADD DEPARTMENT</button>
        <button id="import-btn" onClick={importAdder}>+ IMPORT</button>
      </div> */}
      {/* {(dept === true) ? <Adddept /> : (impr === true) ? <Importdept /> : null} */}
    </div>
  );
}



