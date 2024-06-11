import React, { useState } from 'react'
import './styles.css'
import './styles-import.css'
import Adddept from './adddept';
import Admin  from './components/Admin';
import DocVerification from './components/DocVerification';
import Activatation from './components/Activatation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
  

  // return (
  //   <div className="container">
  //     <h1 className="center page-heading">Personal Details</h1>
  //     <Adddept />
  //     {/* <div className="buttons">
  //       <button id="add-department" onClick={deptAdder}>+ ADD DEPARTMENT</button>
  //       <button id="import-btn" onClick={importAdder}>+ IMPORT</button>
  //     </div> */}
  //     {/* {(dept === true) ? <Adddept /> : (impr === true) ? <Importdept /> : null} */}
  //   </div>
  //);
  return (
    <>
      
      <Router>
        <Routes>
          <Route path="/" component={Admin} />
          <Route path="/documentverification" component={DocVerification} />
          <Route path="/activate" component={Activatation} />
        </Routes>
      </Router>
    </>
      
    
  )
}



