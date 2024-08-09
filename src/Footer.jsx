import React from 'react';

const Footer = () => {
  return (
    <footer>
     <div className='footer-container'>
      <div className="footer-content">
        <h3>Contact Us</h3>
        <p>Email: contacts@seai.co</p>
        <p>Phone: 00359 888 60 89 80</p>
      </div>
      <div className="footer-content">
        <h3>Quick Links</h3>
        <ul className="footer-quickLinks">
          <li><a href="">Login</a></li>
          <li><a href="">Profile</a></li>
          <li><a href="">Documents</a></li>
          <li><a href="">Voyages</a></li>
          <li><a href="">Information</a></li>
        </ul>
        </div>
        <div className="footer-content">
          <h3>Follow Us</h3>
          <ul className="social-icons">
          <li><a href=""><i className="fab fa-facebook"></i></a></li>
          <li><a href=""><i className="fab fa-instagram"></i></a></li>
          <li><a href=""><i className="fab fa-linkedin"></i></a></li>
        
          </ul>
          
        </div>
     </div>
     <div className="bottom-bar">
      <p>&copy; 2024 SeAI. All rights reserved</p>
     </div>
    </footer>

  );
};

export default Footer;
