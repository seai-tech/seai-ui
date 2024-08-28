import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components-redo/Header-redo';
import Footer from './components-redo/Footer-redo';
import Home from './pages-apis/base/Home';
import About from './pages-apis/base/About';
import Contact from './pages-apis/base/Contact';
import Login from './pages-apis/login-register/Login';
import Register from './pages-apis/login-register/Register';
import Profile from './pages-apis/profile/Profile';
import ProfileUpdate from './pages-apis/profile/ProfileUpdate';
import Voyages from './pages-apis/voyages/Voyages';
import VoyageCreate from './pages-apis/voyages/VoyageCreate';
import VoyageUpdate from './pages-apis/voyages/VoyageUpdate';
import Documents from './pages-apis/documents/Documents';
import DocumentDetails from './pages-apis/documents/DocumentDetails';
import DocumentUpdate from './pages-apis/documents/DocumentUpdate';
import DocumentCreate from './pages-apis/documents/DocumentCreate';
import PrivateRoute from './private-route/PrivateRoute';

function App() {
  return (
    <div>
      <Header />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/profile/:userId/edit" element={<PrivateRoute><ProfileUpdate /></PrivateRoute>} />

          <Route path="/voyages" element={<PrivateRoute><Voyages /></PrivateRoute>} />
          <Route path="/voyages/create" element={<PrivateRoute><VoyageCreate /></PrivateRoute>} />
          <Route path="/voyages/:voyageId/edit" element={<PrivateRoute><VoyageUpdate /></PrivateRoute>} />

          <Route path="/documents" element={<PrivateRoute><Documents /></PrivateRoute>} />
          <Route path="/documents/:documentId" element={<PrivateRoute><DocumentDetails /></PrivateRoute>} />
          <Route path="/documents/:documentId/edit" element={<PrivateRoute><DocumentUpdate /></PrivateRoute>} />
          <Route path="/documents/create" element={<PrivateRoute><DocumentCreate /></PrivateRoute>} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
