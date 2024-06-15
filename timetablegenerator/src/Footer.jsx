// Footer.jsx
import React from 'react';
import './Footer.css';
import logo from './gstlogo.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <img
          src={logo}
          alt="SIES Graduate School of Technology"
          className="logo"
        />
      </div>
      <div className="footer-right">
        <h1>SIES Graduate School of Technology</h1>
        <p>www.siesgst.edu.in</p>
        <p>Accredited with NAAC A+ Grade and NBA Accredited</p>
      </div>
    </div>
  );
};

export default Footer;
