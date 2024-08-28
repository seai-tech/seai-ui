import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';  // Assuming the context is in a 'context' folder
import logo from '../assets/seai-white-logo.png';
import logo2 from '../assets/seai-blue-logo.png';

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const location = useLocation();

  const openNav = () => setNavOpen(true);
  const closeNav = () => setNavOpen(false);

  useEffect(() => {
    // Close the side menu if the user navigates to a different page
    closeNav();
  }, [location]);

  return (
    <nav className="header">
      <ul className="nav-links">
        <li className="nav-button" onClick={openNav}>
          <i className="fa-solid fa-bars menu-icon"></i>
        </li>
        <li className="logo-container">
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
        </li>
      </ul>

      {/* Side navigation */}
      <div className={`side-nav ${navOpen ? 'open' : ''}`}>
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
        <i class="fa-solid fa-x"></i>
        </a>
        <a href="/documents" className="side-nav-link">Smart Scanner</a>
        <Link to='/profile' className="side-nav-link">Profile</Link>
        <a href="/documents" className="side-nav-link">Documents</a>
        <Link to='/voyages' className="side-nav-link">Voyages</Link>
        <a href="#" className="side-nav-link">Booking</a>
        <a href="#" className="side-nav-link">Chat</a>
        <a href="#" className="side-nav-link">Events</a>
        <a href="#" className="side-nav-link">Maritime Administration</a>
        <a href="#" className="side-nav-link">Information</a>
        <div className="auth-links">
          {isAuthenticated ? (
            <button className="side-nav-link" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link className="side-nav-link" to="/login">Log In</Link>
          )}
        </div>
        <Link to="/" className="logo-link">
          <img src={logo2} alt="logo" className="side-nav-logo" />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
