// src/pages/Profile.jsx
import React from 'react';
import { User, Mail, Phone, Hash, Package, LogOut, ArrowLeft } from 'lucide-react';
import { THEME } from '../constants/theme';

export default function Profile({ setView, registeredUser }) {
  return (
    <div className="min-h-screen font-sans selection:bg-blue-200 flex flex-col" style={{ backgroundColor: THEME.bgBlue }}>
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/50 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => setView('dashboard')} className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity" style={{ color: THEME.darkBlue }}>
            <ArrowLeft size={20} /> Back to Dashboard
          </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12 w-full flex-1">
        <div className="bg-white rounded-3xl shadow-sm border overflow-hidden" style={{ borderColor: `${THEME.lightBlue}40` }}>
          <div className="h-32 bg-gradient-to-r from-[#1E88E5] to-[#79C7FF]"></div>
          
          <div className="px-8 pb-8 relative">
            <div className="absolute -top-16 left-8">
              <div className="w-32 h-32 rounded-full border-4 border-white flex items-center justify-center overflow-hidden shadow-md" style={{ backgroundColor: THEME.bgBlue }}>
                <User size={64} style={{ color: THEME.primaryBlue }} />
              </div>
            </div>

            <div className="flex justify-end pt-4 mb-6">
              <button 
                onClick={() => setView('login')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors border border-red-200"
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>

            <div className="mt-8">
              <h1 className="text-3xl font-bold mb-1" style={{ color: THEME.darkBlue }}>{registeredUser.name}</h1>
              <p className="text-sm font-bold uppercase tracking-wider mb-8" style={{ color: THEME.primaryBlue }}>Account Overview</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl" style={{ backgroundColor: THEME.bgBlue }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Hash size={16} style={{ color: THEME.lightBlue }} />
                    <p className="text-sm font-medium" style={{ color: THEME.lightBlue }}>Customer ID</p>
                  </div>
                  <p className="font-bold text-lg" style={{ color: THEME.darkBlue }}>{registeredUser.customerId}</p>
                </div>

                <div className="p-4 rounded-2xl" style={{ backgroundColor: THEME.bgBlue }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Package size={16} style={{ color: THEME.lightBlue }} />
                    <p className="text-sm font-medium" style={{ color: THEME.lightBlue }}>Product ID</p>
                  </div>
                  <p className="font-bold text-lg" style={{ color: THEME.darkBlue }}>{registeredUser.productId}</p>
                </div>

                <div className="p-4 rounded-2xl" style={{ backgroundColor: THEME.bgBlue }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Mail size={16} style={{ color: THEME.lightBlue }} />
                    <p className="text-sm font-medium" style={{ color: THEME.lightBlue }}>Email Address</p>
                  </div>
                  <p className="font-bold text-lg break-all" style={{ color: THEME.darkBlue }}>{registeredUser.email}</p>
                </div>

                <div className="p-4 rounded-2xl" style={{ backgroundColor: THEME.bgBlue }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Phone size={16} style={{ color: THEME.lightBlue }} />
                    <p className="text-sm font-medium" style={{ color: THEME.lightBlue }}>Phone Number</p>
                  </div>
                  <p className="font-bold text-lg" style={{ color: THEME.darkBlue }}>{registeredUser.phone}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}