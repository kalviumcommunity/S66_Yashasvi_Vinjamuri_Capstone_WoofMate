import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home';
import Adopt from '../pages/Adopt'
import Services from '../pages/Services'
import About from '../pages/About'
import Rescue from '../pages/Rescue';
import Chat from '../pages/Chat';
import Donate from '../pages/Donate';
import AskAI from '../pages/AskAI';
import AuthPage from '../pages/AuthPage';
import NearbyPlaces from '../pages/NearbyPlaces';
import DogBreedQuiz from './details/DogBreedQuiz';
import Contact from '../pages/Contact';
import StarterGuide from '../pages/StarterGuide';
import DogDetails from '../pages/DogDetails';
import PrivateRoute from './PrivateRoute';
import Profile from '../components/Profile';
import AdminDashboard from '../pages/AdminDashboard';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const RootRoute = () => {
  const { currentUser, loading } = useAuth();
  if (loading) return null;
  if (currentUser?.role === 'admin') return <Navigate to="/admin" replace />;
  return <Home />;
};

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<RootRoute />} />
      <Route path='/login' element={<AuthPage />} />
      <Route path='/signup' element={<AuthPage />} />
      <Route path="/about" element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path="/nearby" element={<NearbyPlaces />} />
      <Route path='/quiz' element={<DogBreedQuiz />} />
      <Route path='/guides' element={<StarterGuide />} />
      <Route path="/askai" element={<AskAI />} />

      {/* Protected Routes */}
      <Route path="/adopt" element={<PrivateRoute><Adopt /></PrivateRoute>} />
      <Route path="/adopt/:id" element={<PrivateRoute><DogDetails /></PrivateRoute>} />
      <Route path="/services" element={<PrivateRoute><Services /></PrivateRoute>} />
      <Route path="/rescue" element={<PrivateRoute><Rescue /></PrivateRoute>} />
      <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
      <Route path="/donate" element={<PrivateRoute><Donate /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      
      {/* Admin Route */}
      {/* Note: AdminDashboard component will be created shortly */}
      <Route path="/admin" element={<PrivateRoute requireAdmin={true}><AdminDashboard /></PrivateRoute>} />
    </Routes>
  );
}

export default Router
