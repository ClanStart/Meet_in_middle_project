import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import CreateMeeting from './pages/CreateMeeting';
import MeetingDetails from './pages/MeetingDetails';
import Suggestions from './pages/Suggestions';
import Navbar from './components/Navbar'; 

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      {user && <Navbar />} 
      <Routes>
        <Route path="/" element={user ? <Home /> : <Auth />} />
        <Route path="/create" element={user ? <CreateMeeting /> : <Auth />} />
        <Route path="/details" element={user ? <MeetingDetails /> : <Auth />} />
        <Route path="/suggestions/:meetingId" element={user ? <Suggestions /> : <Auth />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;