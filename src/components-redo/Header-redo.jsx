import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
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
    <>
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
      </nav>

      {/* Side navigation */}
      <div className={`side-nav ${navOpen ? 'open' : ''}`}>
        <button className="closebtn" onClick={closeNav}>
          <i className="fa-solid fa-x"></i>
        </button>
        <Link to="/documents" className="side-nav-link">Smart Scanner</Link>
        <Link to="/profile" className="side-nav-link">Profile</Link>
        <Link to="/documents" className="side-nav-link">Documents</Link>
        <Link to="/voyages" className="side-nav-link">Voyages</Link>
        <Link to="#" className="side-nav-link">Booking</Link>
        <Link to="#" className="side-nav-link">Chat</Link>
        <Link to="#" className="side-nav-link">Events</Link>
        <Link to="#" className="side-nav-link">Maritime Administration</Link>
        <Link to="#" className="side-nav-link">Information</Link>
        <div className="auth-links">
          {isAuthenticated ? (
            <button className="side-nav-link" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link className="side-nav-link" to="/login">Login</Link>
          )}
        </div>
        <Link to="/" className="logo-link">
          <img src={logo2} alt="logo" className="side-nav-logo" />
        </Link>
      </div>

      {/* Overlay */}
      <div className={`side-nav-overlay ${navOpen ? 'visible' : ''}`} onClick={closeNav}></div>
    </>
  );
};

export default Header;
