import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const styles = {
        navbar: {
          padding: '10px',
          backgroundColor: '#333',
          color: '#fff',
        },
        navLinks: {
          listStyleType: 'none',
          display: 'flex',
          justifyContent: 'space-around',
        },
        navItem: {
          margin: '0 10px',
        },
        navLink: {
          color: '#fff',
          textDecoration: 'none',
        },
      };
  return (
    <>
      <nav style={styles.navbar}>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/documentverification" style={styles.navLink}>Document Verification</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/activate" style={styles.navLink}>Activate Page</Link>
        </li>
      </ul>
    </nav>
    </>

  );
}
 export default Navbar;