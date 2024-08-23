import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/seai_grey.png';
import styles from '../style/Header.module.css';

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to track the current route



  const openNav = () =>setNavOpen(true);
  const closeNav =()=>setNavOpen(false);

  useEffect(() => {
    // Check localStorage for userId and update state accordingly
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, [location]); // Re-run this effect every time the route changes

  const handleLogout = () => {
    localStorage.clear(); // Clear user data from localStorage
    navigate('/'); // Navigate to the home page after logging out
    closeNav(); //close the side nav when logging out
  };


  useEffect(()=>{
    //close the side menu if the user navigates to different page
   closeNav();
  }, [location]) //run this effect whenever the location changes




  return (
    <header>
      <img src={logo} alt="logo" className={styles.logo} /> 
      <nav>
        <ul className={styles.navLinks}>
          {userId ? (
            <>
              <li><Link to="/profile" className={styles.navButton}>Profile</Link></li>
              <li className={styles.navButton} onClick={openNav}>Menu</li>
              <li><a href="/" onClick={handleLogout} className={styles.navButton}>Logout</a></li>
            </>
          ) : (
            <>
              <li><Link to="#" className={styles.navButton}>Book Demo</Link></li>
              <li><Link to="/login" className={styles.navButton}>Log In</Link></li>
            </>
          )}
        </ul>
      </nav>

      {/*side navigation*/}
      <div className={styles.sideNav} style={{width:navOpen?'250px':'0'}}>
      <a href="javascript:void(0)" className={styles.closebtn} onClick={closeNav}>&times;</a>
      <Link to='/login'>Login</Link>
      <a href="#">Smart scanner</a>
      <Link to='/profile'>Profile</Link>
      <a href="/documents">Documents</a>
      <Link to='/voyages'>Voyages</Link>
      <a href="#">Booking</a>
      <a href="#">Chat</a>
      <a href="#">Events</a>
      <a href="#">Maritime Administration</a>
      <a href="#">Information</a>
      <a href="/" onClick={handleLogout}>Logout</a>
      </div>

      

    </header>
  );
};

export default Header;