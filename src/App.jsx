import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Voyages from './pages/Voyages.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import LandingPage from './pages/LandingPage.jsx';

function App() {
  return (
   
    <Router>
     <Header/>
      <Routes>
        <Route path="/voyages" element={<Voyages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<LandingPage/>}/>
      </Routes>
      <Footer/>
    </Router>   
  );
}

export default App;
