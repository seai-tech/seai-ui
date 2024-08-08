import React, {useState} from 'react';




function Header(){

    const [navOpen, setNavOpen] = useState(false);

    const openNav = ()=>{
        setNavOpen(true);
    }

    const closeNav =()=>{
        setNavOpen(false);
    }

    return(
        <header>
    <nav>
       <div className="side-nav" style={{width:navOpen?'250px':'0'}}>
            <a href="javascript:void(0)" className="closebtn" onClick={() => closeNav()}>&times;</a>
            <a href="#">Smart scanner</a>
            <a href="#">Profile</a>
            <a href="#">Documents</a>
            <a href="#">Voyages</a>
            <a href="#">Booking</a>
            <a href="#">Chat</a>
            <a href="#">Events</a>
            <a href="#">Maritime Administration</a>
            <a href="#">Information</a>
            <a href="#">Logout</a>
            
       
       </div>
       <span className="openbtn" onClick={()=>openNav()}>&#9776;</span>
    </nav> 
    <div className="header-content" style={{marginLeft:navOpen?'250px':'0'}}>
        <h1 className="merriweather-black">Voyages</h1>
        <div className="button-container">
            <button className="button btn1">Scan</button>
            <button className="button">Add</button>
        </div>
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="wave wave4"></div>
    </div>
       

       </header>
    );

}

export default Header