import logo from '../../assets/seai-blue-logo.png';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import React, { useContext } from 'react';

const TrainingCenterMenu = ()=>{
    const { isAuthenticated, logout } = useContext(AuthContext);

    return(
        <>
        <div className="menu-page-logo">
            <img src={logo} alt="seai-logo" />
        </div>
        <div className="menu-page-content">
            <Link to="/documents" className="menu-page-link">Smart Scanner</Link>
            <Link to="/profile" className="menu-page-link">Profile</Link>
            <Link to="#" className="menu-page-link">Course Management</Link>
            <Link to="#" className="menu-page-link">Reports</Link>
            <Link to="#" className="menu-page-link">Crew Pool (Participants)</Link>
            <Link to="#" className="menu-page-link">Chat</Link>
            <Link to="#" className="menu-page-link">Events</Link>
            <Link to="#" className="menu-page-link">Maritime Administration</Link>
            <Link to="#" className="menu-page-link">Information</Link>
           
            <button className="menu-page-logout" onClick={logout}>Logout</button>
                
            
            
        </div>
        </>
    )

};

export default TrainingCenterMenu;