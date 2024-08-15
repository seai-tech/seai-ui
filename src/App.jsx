import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import MainContent from './MainContent.jsx';
import Login from './Login.jsx';
import Profile from './Profile.jsx';
import LandingPage from './LandingPage.jsx';

function App() {
  return (
    <Router>
     {/*<Header/>*/}
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/landing" element={<LandingPage/>}/>
      </Routes>
      {/*<Footer/>*/}
    </Router>
  );
}

export default App;
