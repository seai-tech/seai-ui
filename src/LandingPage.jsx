import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage=()=>{
    return(
        <>
        <div id="horizontalNav">
            <a href="./assets/seai_logo" id="logo"></a>
            <div id="navbar-right">
                <a className="active" href="#">Book Demo</a>
                <a href="#">Contact Us</a>
                <a href="#">Log In</a>
            </div>
        </div>
        </>

    );

};

export default LandingPage;