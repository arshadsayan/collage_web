import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const styles = {
        navbar: {
          padding: '10px',
          backgroundColor: '#002566',
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
          <Link to="/" style={styles.navLink}>Student Details Approval</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/receitGeneration" style={styles.navLink}>Document Receipt Generator</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/transactionrejected" style={styles.navLink}>Transaction rejected list</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>CSV upload</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/reportgeneration" style={styles.navLink}>Report Generator</Link>
        </li>
      </ul>
    </nav>
    </>

  );
}
 export default Navbar;