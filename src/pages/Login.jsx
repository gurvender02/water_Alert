// src/pages/Login.jsx
import React, { useState } from 'react';
import { Droplet, User, Lock } from 'lucide-react';
import { THEME } from '../constants/theme';

export default function Login({ setView, registeredUser }) {
  const [loginInput, setLoginInput] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const isUserMatch = 
      loginInput === registeredUser.email || 
      loginInput === registeredUser.phone || 
      loginInput === registeredUser.customerId;
    
    if (isUserMatch && loginPassword === registeredUser.password) {
      setLoginError('');
      setView('dashboard');
    } else {
      setLoginError('Invalid credentials. Please check your details and password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans selection:bg-blue-200 p-6" style={{ backgroundColor: THEME.bgBlue }}>
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border" style={{ borderColor: `${THEME.lightBlue}40` }}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: THEME.bgBlue, color: THEME.primaryBlue }}>
            <Droplet size={32} />
          </div>
          <h1 className="text-2xl font-bold tracking-wide" style={{ color: THEME.darkBlue }}>
            Flow<span style={{ color: THEME.primaryBlue }}>Alert</span>
          </h1>
          <p className="text-sm font-medium mt-2" style={{ color: THEME.lightBlue }}>Welcome back to your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: THEME.darkBlue }}>Email, Phone, or Customer ID</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: THEME.lightBlue }} />
              <input 
                type="text" 
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                placeholder="e.g. CUST-8492 or email@domain.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ borderColor: `${THEME.lightBlue}40`, backgroundColor: THEME.white, color: THEME.darkBlue }}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: THEME.darkBlue }}>Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: THEME.lightBlue }} />
              <input 
                type="password" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ borderColor: `${THEME.lightBlue}40`, backgroundColor: THEME.white, color: THEME.darkBlue }}
                required
              />
            </div>
          </div>
          {loginError && <p className="text-red-500 text-sm font-semibold">{loginError}</p>}
          <button 
            type="submit" 
            className="w-full py-3 rounded-xl text-white font-bold transition-opacity hover:opacity-90 flex justify-center items-center gap-2"
            style={{ backgroundColor: THEME.primaryBlue }}
          >
            <Lock size={18} /> Sign In
          </button>
        </form>

        <p className="text-center mt-6 text-sm font-medium" style={{ color: THEME.lightBlue }}>
          Don't have an account?{' '}
          <button onClick={() => setView('signup')} className="font-bold hover:underline" style={{ color: THEME.primaryBlue }}>
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
}