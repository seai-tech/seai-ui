import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
/*import About from './pages/About.jsx';*/
import Contacts  from './pages/Contacts.jsx';


import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';

import Voyages from './pages/Voyages.jsx';
import VoyageCreate from './pages/VoyageCreate.jsx';
import VoyageUpdate from './pages/VoyageUpdate.jsx';

import Documents from './pages/Documents.jsx';
import DocumentCreate from './pages/DocumentCreate.jsx';
import DocumentDetails from './pages/DocumentDetails.jsx';
import DocumentUpdate from './pages/DocumentUpdate.jsx';




function App()
 {
 
  return (
   
    <Router>
     <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/contacts" element={<Contacts />} />


        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/voyages" element={<Voyages />} />
        <Route path="/voyages/create" element={<VoyageCreate />} />
        <Route path="/voyages/update" element={<VoyageUpdate />} />

        <Route path="/documents" element={<Documents />} />
        <Route path="/documents/create" element={<DocumentCreate />} />
        <Route path="/documents/details" element={<DocumentDetails />} />
        <Route path="/documents/update" element={<DocumentUpdate />} />
      </Routes>
      <Footer/>
    </Router>   
  );
}

export default App;
