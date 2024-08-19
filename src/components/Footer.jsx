import React from 'react';

const Footer = () => {
  return (
    <footer>
     <div className='footer-container'>
      <div>
        <h1>SeAI</h1>
      </div>
      <div className="footer-content">
        <h3>Contact Us</h3>
        <p><a href="mailto:contacts@seai.co">contacts@seai.co</a></p>
        <p>00359 888 60 89 80</p>
      </div>
      
     </div>
     <div className="bottom-bar">
      <p>&copy; 2024 SeAI. All rights reserved</p>
     </div>
    </footer>

  );
};

export default Footer;
