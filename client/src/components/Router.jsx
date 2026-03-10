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
import QuizQuestion from './details/QuizQuestion';
import Contact from '../pages/Contact';
import StarterGuide from '../pages/StarterGuide';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<AuthPage />} />
      <Route path='/signup' element={<AuthPage />} />
      <Route path="/adopt" element={<Adopt />} />
      <Route path="/services" element={<Services />} />
      <Route path="/rescue" element={<Rescue />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/askai" element={<AskAI />} />
      <Route path="/about" element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path="/nearby" element={<NearbyPlaces />} />
      <Route path='/quiz' element={<QuizQuestion />} />
      <Route path='/guides' element={<StarterGuide />} />
    </Routes>
  );
}

export default Router
