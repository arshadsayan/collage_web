// Layout.jsx
import React from 'react';
import Header from './Header'; // Correct path to Header.jsx
import Footer from './Footer'; // Correct path to Footer.jsx
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
