import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/seai-white-logo.png';
import logo2 from '../assets/seai-blue-logo.png';

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true); // Add a state for collapsed sidebar
  const { isAuthenticated, logout } = useContext(AuthContext);
  const location = useLocation();

  const toggleNav = () => setNavOpen(!navOpen);
  const toggleCollapse = () => setCollapsed(!collapsed); // Toggle collapsed state

  useEffect(() => {
    // Close the side menu if the user navigates to a different page
    setNavOpen(false);
  }, [location]);

  return (
    <>
      <nav className="header">
        <ul className="nav-links">
          <li className="nav-button" onClick={toggleNav}>
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
      <div className={`side-nav ${navOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}>
        <button className="collapsebtn" onClick={toggleCollapse}>
          <i className={`fa-solid ${collapsed ? 'fa-arrow-right' : 'fa-arrow-left'}`}></i>
        </button>

        {/* Sidebar Links */}
        <Link to="/documents" className="side-nav-link">
          <i className="fa-solid fa-file-alt"></i> {!collapsed && 'Smart Scanner'}
        </Link>
        <Link to="/profile" className="side-nav-link">
          <i className="fa-solid fa-user"></i> {!collapsed && 'Profile'}
        </Link>
        <Link to="/documents" className="side-nav-link">
          <i className="fa-solid fa-folder"></i> {!collapsed && 'Documents'}
        </Link>
        <Link to="/voyages" className="side-nav-link">
          <i className="fa-solid fa-ship"></i> {!collapsed && 'Voyages'}
        </Link>
        <Link to="#" className="side-nav-link">
          <i className="fa-solid fa-calendar-check"></i> {!collapsed && 'Booking'}
        </Link>
        <Link to="#" className="side-nav-link">
          <i className="fa-solid fa-comments"></i> {!collapsed && 'Chat'}
        </Link>
        <Link to="#" className="side-nav-link">
          <i className="fa-solid fa-bullhorn"></i> {!collapsed && 'Events'}
        </Link>
        <Link to="#" className="side-nav-link">
          <i className="fa-solid fa-briefcase"></i> {!collapsed && 'Maritime Administration'}
        </Link>
        <Link to="#" className="side-nav-link">
          <i className="fa-solid fa-info-circle"></i> {!collapsed && 'Information'}
        </Link>

        <div className="auth-links">
          {isAuthenticated ? (
            <button className="side-nav-link" onClick={logout}>
              <i className="fa-solid fa-sign-out-alt"></i> {!collapsed && 'Logout'}
            </button>
          ) : (
            <Link className="side-nav-link" to="/login">
              <i className="fa-solid fa-sign-in-alt"></i> {!collapsed && 'Login'}
            </Link>
          )}
        </div>

        {/* Sidebar logo at the bottom */}
        <Link to="/" className="logo-link">
          <img src={logo2} alt="logo" className="side-nav-logo" />
        </Link>
      </div>

      {/* Overlay */}
      <div className={`side-nav-overlay ${navOpen ? 'visible' : ''}`} onClick={toggleNav}></div>
    </>
  );
};

export default Header;
