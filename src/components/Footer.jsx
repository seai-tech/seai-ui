import React from 'react';
import styles from '../style/Footer.module.css';

const Footer = () => {
  return (
    <footer>
     <div className={styles.footerContainer}>
      <div>
        <h1>SeAI</h1>
      </div>
      <div className={styles.footerContent}>
        <h3>Contact Us</h3>
        <p><a href="mailto:contacts@seai.co">contacts@seai.co</a></p>
        <p>00359 888 60 89 80</p>
      </div>
      
     </div>
     <div className={styles.bottomBar}>
      <p>&copy; 2024 SeAI. All rights reserved</p>
     </div>
    </footer>

  );
};

export default Footer;
