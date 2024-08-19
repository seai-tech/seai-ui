import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to track the current route

  useEffect(() => {
    // Check localStorage for userId and update state accordingly
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, [location]); // Re-run this effect every time the route changes

  const handleLogout = () => {
    localStorage.clear(); // Clear user data from localStorage
    navigate('/'); // Navigate to the home page after logging out
  };

  return (
    <header>
      <img src="test-seai/src/assets/seai_logo.PNG" alt="logo" /> 
      <nav>
        <ul className="nav-links">
          {userId ? (
            <>
              <li><Link to="/profile" className="nav-button">Profile</Link></li>
              <li className="nav-button">Menu</li>
              <li><a href="/" onClick={handleLogout} className="nav-button">Logout</a></li>
            </>
          ) : (
            <>
              <li><Link to="#" className="nav-button">Book Demo</Link></li>
              <li><Link to="/login" className="nav-button">Log In</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;