// Header.jsx
import React from 'react';
import './Header.css';
import logo from './gstlogo.png';

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <img
          src={logo}
          alt="SIES Graduate School of Technology"
          className="logo"
        />
      </div>
      <div className="header-right">
        <h1>SIES Graduate School of Technology</h1>
        <p>www.siesgst.edu.in</p>
        <p>Accredited with NAAC A+ Grade and NBA Accredited</p>
      </div>
    </div>
  );
};

export default Header;
