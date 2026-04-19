// src/App.jsx
import React, { useState } from 'react';

// Import all your isolated Page Views
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [view, setView] = useState('login'); 

  // --- GLOBAL AUTH STATE ---
  // If you later implement Context API or Redux, this is where you provide it.
  const [registeredUser, setRegisteredUser] = useState({
    name: 'Jane Doe',
    customerId: 'CUST-8492',
    email: 'jane.doe@example.com',
    phone: '+1 234 567 8900',
    productId: 'FLOW-X1-992',
    password: 'password123'
  });

  // --- ROUTING ENGINE ---
  if (view === 'login') {
    return <Login setView={setView} registeredUser={registeredUser} />;
  }

  if (view === 'signup') {
    return <Signup setView={setView} setRegisteredUser={setRegisteredUser} />;
  }

  if (view === 'profile') {
    return <Profile setView={setView} registeredUser={registeredUser} />;
  }

  // Dashboard acts as the default catch-all view
  return <Dashboard setView={setView} />;
}