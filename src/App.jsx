import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './private-route/PrivateRoute';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './user-pages/base/Home';

import About from './user-pages/base/About';
import Contact from './user-pages/base/Contact';

import Loading from './components/Loading';
import Error from './components/Error';

import Login from './user-pages/login-register/Login';
import Register from './user-pages/login-register/Register';

import Profile from './user-pages/profile/Profile';

import Voyages from './user-pages/voyages/Voyages';
import VoyageCreate from './user-pages/voyages/VoyageCreate';
import VoyageUpdate from './user-pages/voyages/VoyageUpdate';

import Documents from './user-pages/documents/Documents';
import DocumentScan from './user-pages/documents/DocumentScan';
import DocumentVerify from './user-pages/documents/DocumentVerify';
import DocumentUpdate from './user-pages/documents/DocumentUpdate';
import DocumentCreate from './user-pages/documents/DocumentCreate';


import TrainingCenterLogin from './training-center-pages/login-register/TrainingCenterLogin';
import TrainingCenterRegister from './training-center-pages/login-register/TrainingCenterRegister';

import Courses from './training-center-pages/courses/Courses';
import CourseCreate from './training-center-pages/courses/CourseCreate';
import CourseUpdate from './training-center-pages/courses/CourseUpdate';
import CourseAttendees from './training-center-pages/courses/CourseAttendees';
import AddAttendee from './training-center-pages/courses/AddAttendee';

import ApiCredentials from './user-pages/base/ApiCredentials';

import TCApiCredentials from './training-center-pages/TCApiCrecentials';

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

        <Route path="/login/user" element={<Login />} />
        <Route path="/register/user" element={<Register />} />

        <Route path="/profile" element={<PrivateRoute role="user"><Profile /></PrivateRoute>} />

        <Route path="/voyages" element={<PrivateRoute role="user"><Voyages /></PrivateRoute>} />
        <Route path="/voyages/create" element={<PrivateRoute role="user"><VoyageCreate /></PrivateRoute>} />
        <Route path="/voyages/:voyageId/update" element={<PrivateRoute role="user"><VoyageUpdate /></PrivateRoute>} />

        <Route path="/documents" element={<PrivateRoute role="user"><Documents /></PrivateRoute>} />
        <Route path="/documents/create" element={<PrivateRoute role="user"><DocumentCreate /></PrivateRoute>} />
        <Route path="/documents/:documentId/update" element={<PrivateRoute role="user"><DocumentUpdate /></PrivateRoute>} />
        <Route path="/documents/:documentId/verify" element={<PrivateRoute role="user"><DocumentVerify /></PrivateRoute>} />
        <Route path="/scanner" element={<PrivateRoute role="user"><DocumentScan /></PrivateRoute>} />

        <Route path="/login/training-center" element={<TrainingCenterLogin />} />
        <Route path="/register/training-center" element={<TrainingCenterRegister />} />

        <Route path="/tc-api" element={<PrivateRoute role="trainingCenter"><TCApiCredentials /></PrivateRoute>} />
        <Route path="/courses" element={<PrivateRoute role="trainingCenter"><Courses /></PrivateRoute>} />
        <Route path="/courses/create" element={<PrivateRoute role="trainingCenter"><CourseCreate /></PrivateRoute>} />
        <Route path="/courses/:courseId/update" element={<PrivateRoute role="trainingCenter"><CourseUpdate /></PrivateRoute>} />
        <Route path="/courses/:courseId/attendees" element={<PrivateRoute role="trainingCenter"><CourseAttendees /></PrivateRoute>} />
        <Route path="/courses/:courseId/add-attendee" element={<PrivateRoute role="trainingCenter"><AddAttendee /></PrivateRoute>} />

        <Route path="/*" element={<Error />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
