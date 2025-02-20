import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import ConfirmReset from './components/ConfirmReset';
import Notification from './components/Notification';

function App() {
  const [notification, setNotification] = useState('');

  return (
    <Router>
      {notification && <Notification message={notification} onClose={() => setNotification('')} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword setNotification={setNotification} />} />
        <Route path="/confirm-reset/:token" element={<ConfirmReset setNotification={setNotification} />} />
      </Routes>
    </Router>
  );
}

export default App;
