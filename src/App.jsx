import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components-redo/Header-redo';
import Footer from './components-redo/Footer-redo';
import Home from './pages-apis/base/HomeRedo';
import ApiCredentials from './pages-apis/base/ApiCredentials';
import About from './pages-apis/base/About';
import Contact from './pages-apis/base/Contact';
import Login from './pages-apis/login-register/Login';
import Register from './pages-apis/login-register/Register';
import CrewMenu from './pages-apis/base/CrewMenu';
import ManningMenu from './/pages-apis/base/ManningMenu';
import TrainingCenterMenu from './/pages-apis/base/TrainingCenterMenu';
import Profile from './pages-apis/profile/Profile';
import Voyages from './pages-apis/voyages/Voyages';
import VoyageCreate from './pages-apis/voyages/VoyageCreate';
import VoyageUpdate from './pages-apis/voyages/VoyageUpdate';
import Documents from './pages-apis/documents/Documents';
import DocumentScan from './pages-apis/documents/DocumentScan';
import DocumentVerify from './pages-apis/documents/DocumentVerify';
import DocumentUpdate from './pages-apis/documents/DocumentUpdate';
import DocumentCreate from './pages-apis/documents/DocumentCreate';
import PrivateRoute from './private-route/PrivateRoute';

import Loading from './components-redo/Loading';
import Error from './components-redo/Error';

function App() {
  return (
    <div>
      <Header />
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/api" element={<ApiCredentials />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/loading" element={<Loading />} />


        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/crew-menu" element ={<PrivateRoute><CrewMenu/></PrivateRoute>}/>
        <Route path="/manning-menu" element ={<PrivateRoute><ManningMenu/></PrivateRoute>}/>
        <Route path="/training-center-menu" element ={<PrivateRoute><TrainingCenterMenu/></PrivateRoute>}/>

        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

        <Route path="/voyages" element={<PrivateRoute><Voyages /></PrivateRoute>} />
        <Route path="/voyages/create" element={<PrivateRoute><VoyageCreate /></PrivateRoute>} />
        <Route path="/voyages/:voyageId/update" element={<PrivateRoute><VoyageUpdate /></PrivateRoute>} />

        <Route path="/documents" element={<PrivateRoute><Documents /></PrivateRoute>} />
        <Route path="/documents/create" element={<PrivateRoute><DocumentCreate /></PrivateRoute>} />
        <Route path="/documents/:documentId/update" element={<PrivateRoute><DocumentUpdate /></PrivateRoute>} />
        <Route path="/documents/:documentId/verify" element={<PrivateRoute><DocumentVerify /></PrivateRoute>} />
        <Route path="/scanner" element={<PrivateRoute><DocumentScan /></PrivateRoute>} />
       
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
