import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import OptionPage from './OptionPage';
import Sidenav1 from './Sidenav1';
// import CapRoundForm from './CapRoundForm'; // Future component
// import SpotRoundForm from './SpotRoundForm'; // Future component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sidenav1 />} />
        <Route path="/options" element={<Layout><OptionPage /></Layout>} />
        {/* Future routes */}
        {/* <Route path="/cap-round" element={<Layout><CapRoundForm /></Layout>} /> */}
        {/* <Route path="/spot-round" element={<Layout><SpotRoundForm /></Layout>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
