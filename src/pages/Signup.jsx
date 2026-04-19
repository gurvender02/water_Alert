// src/pages/Signup.jsx
import React, { useState } from 'react';
import { Droplet, User, Hash, Mail, Phone, Package, Lock } from 'lucide-react';
import { THEME } from '../constants/theme';

export default function Signup({ setView, setRegisteredUser }) {
  const [signupForm, setSignupForm] = useState({
    name: '', customerId: '', email: '', phone: '', productId: '', password: ''
  });

  const handleSignup = (e) => {
    e.preventDefault();
    setRegisteredUser(signupForm);
    setView('dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans selection:bg-blue-200 p-6 py-12" style={{ backgroundColor: THEME.bgBlue }}>
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg border" style={{ borderColor: `${THEME.lightBlue}40` }}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: THEME.bgBlue, color: THEME.primaryBlue }}>
            <Droplet size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-wide" style={{ color: THEME.darkBlue }}>Create Account</h1>
          <p className="text-sm font-medium mt-1 text-center" style={{ color: THEME.lightBlue }}>Register your smart meter to start monitoring.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1" style={{ color: THEME.darkBlue }}>Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: THEME.lightBlue }} />
                <input 
                  type="text" value={signupForm.name} onChange={e => setSignupForm({...signupForm, name: e.target.value})}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40`, backgroundColor: THEME.white, color: THEME.darkBlue }} required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1" style={{ color: THEME.darkBlue }}>Customer ID</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: THEME.lightBlue }} />
                <input 
                  type="text" value={signupForm.customerId} onChange={e => setSignupForm({...signupForm, customerId: e.target.value})}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40`, backgroundColor: THEME.white, color: THEME.darkBlue }} required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1" style={{ color: THEME.darkBlue }}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: THEME.lightBlue }} />
                <input 
                  type="email" value={signupForm.email} onChange={e => setSignupForm({...signupForm, email: e.target.value})}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40`, backgroundColor: THEME.white, color: THEME.darkBlue }} required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1" style={{ color: THEME.darkBlue }}>Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: THEME.lightBlue }} />
                <input 
                  type="tel" value={signupForm.phone} onChange={e => setSignupForm({...signupForm, phone: e.target.value})}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40`, backgroundColor: THEME.white, color: THEME.darkBlue }} required
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-bold mb-1" style={{ color: THEME.darkBlue }}>Product ID / Serial Number</label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: THEME.lightBlue }} />
                <input 
                  type="text" value={signupForm.productId} onChange={e => setSignupForm({...signupForm, productId: e.target.value})}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40`, backgroundColor: THEME.white, color: THEME.darkBlue }} required
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-bold mb-1" style={{ color: THEME.darkBlue }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: THEME.lightBlue }} />
                <input 
                  type="password" value={signupForm.password} onChange={e => setSignupForm({...signupForm, password: e.target.value})}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40`, backgroundColor: THEME.white, color: THEME.darkBlue }} required
                />
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 mt-4 rounded-xl text-white font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: THEME.primaryBlue }}
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-6 text-sm font-medium" style={{ color: THEME.lightBlue }}>
          Already registered?{' '}
          <button onClick={() => setView('login')} className="font-bold hover:underline" style={{ color: THEME.primaryBlue }}>
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
}