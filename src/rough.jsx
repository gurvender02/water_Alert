// THIS IS THE SECOND ONE /


import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Menu, MapPin, Bell, Home, Droplet, Clock, AlertTriangle, 
  FileText, Settings, Info, Activity, Thermometer, 
  CheckCircle2, ChevronDown, AlertCircle, History, X 
} from 'lucide-react';

// --- MOCK DATA ---

const hourlyData = [
  { time: '00:00', value: 10 }, { time: '02:00', value: 6 },
  { time: '04:00', value: 16 }, { time: '06:00', value: 7 },
  { time: '08:00', value: 12 }, { time: '10:00', value: 24 },
  { time: '12:00', value: 19 }, { time: '14:00', value: 34 },
  { time: '16:00', value: 20 }, { time: '18:00', value: 39 },
  { time: '20:00', value: 48 }, { time: '22:00', value: 26 },
  { time: '24:00', value: 33 },
];

const weeklyData = [
  { day: 'Mon', value: 180 }, { day: 'Tue', value: 210 },
  { day: 'Wed', value: 195 }, { day: 'Thu', value: 240 },
  { day: 'Fri', value: 220 }, { day: 'Sat', value: 200 },
  { day: 'Sun', value: 245 },
];

const monthlyUsageData = [
  { month: 'Jan', value: 8500 }, { month: 'Feb', value: 7800 },
  { month: 'Mar', value: 9200 }, { month: 'Apr', value: 8800 },
  { month: 'May', value: 9500 }, { month: 'Jun', value: 10200 },
];

const wqDailyData = [
  { time: '00:00', ph: 7.1, tds: 410, turbidity: 2.1, temp: 24 },
  { time: '04:00', ph: 7.2, tds: 420, turbidity: 2.3, temp: 23 },
  { time: '08:00', ph: 7.0, tds: 450, turbidity: 3.1, temp: 25 },
  { time: '12:00', ph: 7.3, tds: 460, turbidity: 2.8, temp: 27 },
  { time: '16:00', ph: 7.2, tds: 435, turbidity: 2.4, temp: 26 },
  { time: '20:00', ph: 7.1, tds: 425, turbidity: 2.2, temp: 25 },
  { time: '24:00', ph: 7.2, tds: 415, turbidity: 2.0, temp: 24 },
];

const wqWeeklyData = [
  { time: 'Mon', ph: 7.2, tds: 420, turbidity: 2.2, temp: 25 },
  { time: 'Tue', ph: 7.1, tds: 430, turbidity: 2.4, temp: 26 },
  { time: 'Wed', ph: 7.3, tds: 410, turbidity: 2.1, temp: 24 },
  { time: 'Thu', ph: 7.0, tds: 440, turbidity: 2.8, temp: 25 },
  { time: 'Fri', ph: 7.2, tds: 425, turbidity: 2.3, temp: 26 },
  { time: 'Sat', ph: 7.1, tds: 415, turbidity: 2.0, temp: 24 },
  { time: 'Sun', ph: 7.2, tds: 420, turbidity: 2.1, temp: 25 },
];

const wqMonthlyData = [
  { time: 'Jan', ph: 7.2, tds: 415, turbidity: 2.1, temp: 22 },
  { time: 'Feb', ph: 7.1, tds: 420, turbidity: 2.2, temp: 24 },
  { time: 'Mar', ph: 7.3, tds: 425, turbidity: 2.4, temp: 26 },
  { time: 'Apr', ph: 7.2, tds: 430, turbidity: 2.5, temp: 28 },
  { time: 'May', ph: 7.1, tds: 440, turbidity: 2.8, temp: 30 },
  { time: 'Jun', ph: 7.2, tds: 435, turbidity: 2.6, temp: 31 },
];

const alertsData = [
  { id: 1, type: 'critical', title: 'High TDS detected', location: 'Lab Block', details: 'TDS: 520 ppm', time: '10:45 AM', icon: AlertCircle, color: 'text-cyan-500', bg: 'bg-cyan-100' },
  { id: 2, type: 'warning', title: 'Slight turbidity increase', location: 'Hostel Tank', details: 'Turbidity: 4 NTU', time: '09:20 AM', icon: Info, color: 'text-blue-500', bg: 'bg-blue-100' },
  { id: 3, type: 'warning', title: 'pH level abnormal', location: 'Building A', details: 'pH: 8.4', time: '08:05 AM', icon: AlertTriangle, color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: 4, type: 'info', title: 'Unusual water usage at night', location: 'Main Hostel', details: '02:00 - 04:00 AM', time: 'Yesterday', icon: History, color: 'text-blue-700', bg: 'bg-blue-100' },
  { id: 5, type: 'normal', title: 'All parameters normal', location: 'System Check', details: '', time: '2 days ago', icon: CheckCircle2, color: 'text-blue-500', bg: 'bg-blue-100' },
];

// --- COMPONENTS ---

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold text-lg text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full text-slate-500">
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
        <div className="p-4 border-t bg-slate-50 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('Day');
  const [alertTab, setAlertTab] = useState('All');
  
  const [usageTimeRange, setUsageTimeRange] = useState('Week');
  const [wqTimeRange, setWqTimeRange] = useState('Day');

  // Modal states
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', content: null });

  const openModal = (title, content) => setModalConfig({ isOpen: true, title, content });
  const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

  const navItems = [
    { name: 'Dashboard', icon: Home },
    { name: 'Water Quality', icon: Droplet },
    { name: 'Usage', icon: Clock },
    { name: 'Alerts', icon: AlertTriangle },
    { name: 'Reports', icon: FileText },
    { name: 'Settings', icon: Settings },
  ];

  const filteredAlerts = alertsData.filter(alert => {
    if (alertTab === 'All') return true;
    if (alertTab === 'Critical') return alert.type === 'critical';
    if (alertTab === 'Warning') return alert.type === 'warning';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex font-sans text-slate-800">
      
      {/* SIDEBAR (Desktop) & MOBILE MENU DRAWER */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-24 bg-[#0A2540] flex flex-col items-center py-6 transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:w-24
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="lg:hidden absolute top-4 right-[-48px] bg-[#0A2540] p-2 rounded-r-lg">
          <button onClick={() => setMobileMenuOpen(false)} className="text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-8 w-full mt-16 lg:mt-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.name;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setActivePage(item.name);
                  setMobileMenuOpen(false);
                }}
                className={`flex flex-col items-center gap-1 w-20 py-3 rounded-xl transition-all ${
                  isActive ? 'bg-[#1D7AEC] text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium text-center leading-tight px-1">{item.name}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
        
        {/* HEADER */}
        <header className="bg-[#0A2540] text-white h-16 flex items-center justify-between px-4 lg:px-6 shrink-0 z-30 shadow-md">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-1 hover:bg-white/10 rounded-lg"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold tracking-wide hidden sm:block">FlowAlert Dashboard</h1>
          </div>

          <div className="flex items-center gap-4 lg:gap-8 text-sm">
            <button 
              onClick={() => openModal('Select Location', <p>Location selection settings would go here.</p>)}
              className="hidden md:flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg transition-colors"
            >
              <MapPin size={18} className="text-slate-300" />
              <span>Building A / Hostel / Lab</span>
            </button>
            
            <div className="flex items-center gap-4 border-l border-white/20 pl-4 lg:pl-8">
              <button 
                onClick={() => openModal('Notifications', <p>You have 3 unread notifications.</p>)}
                className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#0A2540]"></span>
              </button>
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                <div className="w-8 h-8 rounded-full bg-cyan-400 border-2 border-white flex items-center justify-center text-[#0A2540] font-bold">
                  N
                </div>
                <span className="hidden sm:block font-medium">Normal</span>
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-auto p-4 lg:p-6">
          
          {/* DYNAMIC PAGE RENDERER */}
          {activePage === 'Water Quality' ? (
            <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <Droplet size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">Water Quality Analysis</h2>
                </div>
                <div className="flex bg-white shadow-sm border border-slate-100 p-1 rounded-lg">
                  {['Day', 'Week', 'Month'].map(t => (
                    <button
                      key={t}
                      onClick={() => setWqTimeRange(t)}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                        wqTimeRange === t ? 'bg-[#1D7AEC] text-white shadow' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* pH Graph */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-4">pH Levels ({wqTimeRange})</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={wqTimeRange === 'Day' ? wqDailyData : wqTimeRange === 'Week' ? wqWeeklyData : wqMonthlyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} domain={[6, 8]} />
                        <Tooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="ph" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={16} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* TDS Graph */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-4">TDS Levels (ppm)</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={wqTimeRange === 'Day' ? wqDailyData : wqTimeRange === 'Week' ? wqWeeklyData : wqMonthlyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} domain={[300, 500]} />
                        <Tooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="tds" fill="#06B6D4" radius={[4, 4, 0, 0]} barSize={16} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Turbidity Graph */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-4">Turbidity (NTU)</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={wqTimeRange === 'Day' ? wqDailyData : wqTimeRange === 'Week' ? wqWeeklyData : wqMonthlyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} />
                        <Tooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="turbidity" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={16} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Temperature Graph */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-4">Temperature (°C)</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={wqTimeRange === 'Day' ? wqDailyData : wqTimeRange === 'Week' ? wqWeeklyData : wqMonthlyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} domain={[20, 35]} />
                        <Tooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="temp" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={16} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          ) : activePage === 'Usage' ? (
            <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <Clock size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">Detailed Water Usage</h2>
                </div>
                <div className="flex bg-white shadow-sm border border-slate-100 p-1 rounded-lg">
                  {['Day', 'Week', 'Month'].map(t => (
                    <button
                      key={t}
                      onClick={() => setUsageTimeRange(t)}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                        usageTimeRange === t ? 'bg-[#1D7AEC] text-white shadow' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {/* Usage Trend */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-4">Usage Trend ({usageTimeRange})</h3>
                  <div className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={usageTimeRange === 'Day' ? hourlyData : usageTimeRange === 'Week' ? weeklyData : monthlyUsageData} 
                        margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis 
                          dataKey={usageTimeRange === 'Day' ? 'time' : usageTimeRange === 'Week' ? 'day' : 'month'} 
                          axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} dy={10} 
                        />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                        <Tooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="value" fill="#1D7AEC" radius={[4, 4, 0, 0]} barSize={usageTimeRange === 'Day' ? 16 : 32} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          ) : activePage === 'Alerts' ? (
            <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <AlertTriangle size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">System Alerts</h2>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  {/* Tabs */}
                  <div className="flex bg-slate-100 p-1 rounded-lg mb-6 max-w-md">
                    {['All', 'Critical', 'Warning'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setAlertTab(tab)}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                          alertTab === tab ? 'bg-[#1D7AEC] text-white shadow' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {filteredAlerts.length > 0 ? filteredAlerts.map((alert) => (
                      <div 
                        key={alert.id} 
                        className="flex gap-4 p-5 rounded-xl border border-slate-100 hover:shadow-md transition-shadow bg-white cursor-pointer"
                        onClick={() => openModal('Alert Details', (
                          <div className="space-y-2">
                            <p><strong>Title:</strong> {alert.title}</p>
                            <p><strong>Location:</strong> {alert.location}</p>
                            <p><strong>Time:</strong> {alert.time}</p>
                            <p><strong>Details:</strong> {alert.details || 'No additional details.'}</p>
                          </div>
                        ))}
                      >
                        <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center ${alert.bg} ${alert.color}`}>
                          <alert.icon size={24} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <h4 className="font-semibold text-slate-800 text-base">{alert.title}</h4>
                          <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                            <span>{alert.location}</span>
                            {alert.details && <span className="hidden sm:inline">• {alert.details}</span>}
                          </div>
                        </div>
                        <div className="text-xs font-medium text-slate-400 whitespace-nowrap flex items-center">
                          {alert.time}
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-10 text-slate-500">
                        No alerts found in this category.
                      </div>
                    )}
                  </div>
              </div>
            </div>
          ) : activePage === 'Reports' ? (
            <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <FileText size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Reports & Contact</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Contact Administrator</h3>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                      <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="E.g., Request detailed monthly report" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                      <textarea rows="4" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe your request..."></textarea>
                    </div>
                    <button className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                      Send Request
                    </button>
                  </form>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">System Information</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                      <span className="text-slate-500">FlowAlert Version</span>
                      <span className="font-medium text-slate-800">v1.4.2</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                      <span className="text-slate-500">Last System Update</span>
                      <span className="font-medium text-slate-800">10 Feb 2026</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                      <span className="text-slate-500">Active Sensors</span>
                      <span className="font-medium text-slate-800">24 / 24 Online</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                      <span className="text-slate-500">Support Email</span>
                      <span className="font-medium text-blue-600">support@flowalert.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activePage === 'Settings' ? (
            <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <Settings size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Profile & Settings</h2>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 max-w-3xl">
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                  <div className="w-24 h-24 bg-cyan-400 rounded-full flex items-center justify-center text-4xl text-[#0A2540] font-bold shadow-inner">
                    N
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-slate-800">Admin User</h3>
                    <p className="text-slate-500 mb-2">admin@flowalert.com</p>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider">Super Admin</span>
                  </div>
                  <div className="sm:ml-auto">
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                      Edit Profile
                    </button>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-slate-800 mb-4">Preferences</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <div className="font-medium text-slate-800">Email Notifications</div>
                      <div className="text-sm text-slate-500">Receive daily summary reports and alerts</div>
                    </div>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <div className="font-medium text-slate-800">SMS Alerts</div>
                      <div className="text-sm text-slate-500">Get critical alerts directly on your phone</div>
                    </div>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <div className="font-medium text-slate-800">Auto-Refresh Dashboard</div>
                      <div className="text-sm text-slate-500">Refresh live data every 60 seconds</div>
                    </div>
                    <div className="w-12 h-6 bg-slate-300 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activePage !== 'Dashboard' ? (
            <div className="h-full flex items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {React.createElement(navItems.find(i => i.name === activePage)?.icon || Info, { size: 32 })}
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{activePage} Page</h2>
                <p className="text-slate-500 mt-2">This module is part of the prototype navigation.</p>
                <button 
                  onClick={() => setActivePage('Dashboard')}
                  className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          ) : (
            
            // --- DASHBOARD GRID ---
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
              
              {/* COLUMN 1: Leak Monitor & Water Quality */}
              <div className="lg:col-span-3 flex flex-col gap-4">
                
                {/* NEW: Leak Monitor Status */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-lg text-slate-800">Leak Monitor</h2>
                    <button onClick={() => openModal('Leak Monitor Info', <p>Pipeline integrity and leak detection history.</p>)}>
                      <Info size={18} className="text-slate-400 hover:text-blue-500" />
                    </button>
                  </div>
                  <div className="bg-[#F0FDF4] border border-green-100 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-slate-800 leading-tight mb-1">No Leaks</div>
                      <div className="text-xs text-slate-500">System pressure normal</div>
                    </div>
                  </div>
                </div>

                {/* EXISTING: Water Quality (Live) */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-semibold text-lg text-slate-800">Water Quality (Live)</h2>
                    <button onClick={() => openModal('Water Quality Info', <p>Detailed sensor metrics.</p>)}>
                      <Info size={18} className="text-slate-400 hover:text-blue-500" />
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    {/* pH Card */}
                    <div className="bg-[#F8FAFC] rounded-xl p-4 flex items-center justify-between border border-slate-100">
                      <div>
                        <div className="text-sm font-medium text-slate-600 mb-1">pH</div>
                        <div className="text-3xl font-bold text-slate-800 mb-2">7.2</div>
                        <span className="px-3 py-1 bg-blue-400 text-white text-[10px] font-semibold rounded-full uppercase tracking-wider">Normal</span>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                        <Droplet size={24} />
                      </div>
                    </div>

                    {/* TDS Card */}
                    <div className="bg-[#F8FAFC] rounded-xl p-4 flex items-center justify-between border border-slate-100">
                      <div>
                        <div className="text-sm font-medium text-slate-600 mb-1">TDS</div>
                        <div className="text-3xl font-bold text-slate-800 mb-2 flex items-baseline gap-1">450 <span className="text-sm font-medium text-slate-500">ppm</span></div>
                        <span className="px-3 py-1 bg-blue-400 text-white text-[10px] font-semibold rounded-full uppercase tracking-wider">Normal</span>
                      </div>
                      <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-500">
                        <Activity size={24} />
                      </div>
                    </div>

                    {/* Turbidity Card */}
                    <div className="bg-[#F8FAFC] rounded-xl p-4 flex items-center justify-between border border-slate-100">
                      <div>
                        <div className="text-sm font-medium text-slate-600 mb-1">Turbidity</div>
                        <div className="text-3xl font-bold text-slate-800 mb-2 flex items-baseline gap-1">3 <span className="text-sm font-medium text-slate-500">NTU</span></div>
                        <span className="px-3 py-1 bg-blue-400 text-white text-[10px] font-semibold rounded-full uppercase tracking-wider">Normal</span>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                        <AlertCircle size={24} className="opacity-50" />
                      </div>
                    </div>

                    {/* Temperature Card */}
                    <div className="bg-[#F8FAFC] rounded-xl p-4 flex items-center justify-between border border-slate-100">
                      <div>
                        <div className="text-sm font-medium text-slate-600 mb-1">Temperature</div>
                        <div className="text-3xl font-bold text-slate-800 mb-2 flex items-baseline gap-1">26 <span className="text-sm font-medium text-slate-500">°C</span></div>
                        <span className="px-3 py-1 bg-blue-400 text-white text-[10px] font-semibold rounded-full uppercase tracking-wider">Normal</span>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                        <Thermometer size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* COLUMN 2: Charts & Stats */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Main Consumption Card */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h2 className="font-semibold text-lg text-slate-800">Today's Water Consumption</h2>
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                      {['Day', 'Week', 'Month'].map(t => (
                        <button
                          key={t}
                          onClick={() => setTimeRange(t)}
                          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                            timeRange === t ? 'bg-[#1D7AEC] text-white shadow' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                    <div>
                      <div className="text-5xl font-bold text-slate-800 flex items-baseline gap-2">
                        {timeRange === 'Day' ? '245' : timeRange === 'Week' ? '1,490' : '7,850'} 
                        <span className="text-xl font-medium text-slate-500">Litres</span>
                      </div>
                      <div className="text-sm text-slate-400 mt-2">Today, 12 Feb 2026 | Updated 10:32 AM</div>
                    </div>
                    <div className="flex items-center gap-3 bg-[#F8FAFC] px-4 py-3 rounded-xl border border-slate-100">
                      <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                        <Droplet size={20} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Compared to yesterday</div>
                        <div className="text-sm font-bold text-slate-800">+18%</div>
                      </div>
                    </div>
                  </div>

                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={timeRange === 'Week' ? weeklyData : hourlyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis 
                          dataKey={timeRange === 'Week' ? "day" : "time"} 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#94A3B8', fontSize: 10 }} 
                          dy={10}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#94A3B8', fontSize: 10 }} 
                        />
                        <Tooltip 
                          cursor={{ fill: '#F1F5F9' }}
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar 
                          dataKey="value" 
                          fill="#1D7AEC" 
                          radius={[4, 4, 0, 0]} 
                          barSize={16}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Bottom Row inside Middle Column */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* This Week Usage Mini Chart */}
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-800">This Week Usage <span className="text-sm font-normal text-slate-500">(Litres)</span></h3>
                      <button 
                        onClick={() => openModal('Weekly Usage Details', <p>Detailed breakdown for this week.</p>)}
                        className="text-sm text-blue-600 font-medium hover:underline"
                      >
                        View Details
                      </button>
                    </div>
                    <div className="h-40 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} dy={5} />
                          <Tooltip cursor={{ fill: '#F1F5F9' }} />
                          <Bar dataKey="value" fill="#1D7AEC" radius={[4, 4, 0, 0]} barSize={12}>
                             {/* Simple label simulation */}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-[#EAF3FC] rounded-2xl p-5 border border-blue-100 flex flex-col justify-between">
                    <h3 className="font-semibold text-slate-800 mb-4">Quick Stats</h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between bg-white/60 p-3 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Droplet size={18} className="text-blue-500" />
                          <span className="text-sm text-slate-600 font-medium">Avg. per hour</span>
                        </div>
                        <span className="font-bold text-slate-800">10.2 L</span>
                      </div>
                      <div className="flex items-center justify-between bg-white/60 p-3 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Clock size={18} className="text-blue-500" />
                          <span className="text-sm text-slate-600 font-medium">Peak hour</span>
                        </div>
                        <span className="font-bold text-slate-800">18:00</span>
                      </div>
                      <div className="flex items-center justify-between bg-white/60 p-3 rounded-xl">
                        <div className="flex items-center gap-3">
                          <FileText size={18} className="text-blue-500" />
                          <span className="text-sm text-slate-600 font-medium">Total this month</span>
                        </div>
                        <span className="font-bold text-slate-800">7,850 L</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* COLUMN 3: Alerts */}
              <div className="lg:col-span-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-semibold text-lg text-slate-800">Alert History</h2>
                    <button 
                      onClick={() => setActivePage('Alerts')}
                      className="text-sm text-blue-600 font-medium hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
                    {['All', 'Critical', 'Warning'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setAlertTab(tab)}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                          alertTab === tab ? 'bg-[#1D7AEC] text-white shadow' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Alert List */}
                  <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                    {filteredAlerts.length > 0 ? filteredAlerts.map((alert) => (
                      <div 
                        key={alert.id} 
                        className="flex gap-4 p-4 rounded-xl border border-slate-100 hover:shadow-md transition-shadow bg-white cursor-pointer"
                        onClick={() => openModal('Alert Details', (
                          <div className="space-y-2">
                            <p><strong>Title:</strong> {alert.title}</p>
                            <p><strong>Location:</strong> {alert.location}</p>
                            <p><strong>Time:</strong> {alert.time}</p>
                            <p><strong>Details:</strong> {alert.details || 'No additional details.'}</p>
                          </div>
                        ))}
                      >
                        <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${alert.bg} ${alert.color}`}>
                          <alert.icon size={20} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-800 text-sm truncate">{alert.title}</h4>
                          <div className="text-xs text-slate-500 mt-1">{alert.location}</div>
                          {alert.details && <div className="text-xs text-slate-600 mt-1">{alert.details}</div>}
                        </div>
                        <div className="text-[10px] font-medium text-slate-400 whitespace-nowrap pt-0.5">
                          {alert.time}
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-10 text-slate-500 text-sm">
                        No alerts in this category.
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>

      {/* REUSABLE MODAL COMPONENT */}
      <Modal 
        isOpen={modalConfig.isOpen} 
        onClose={closeModal} 
        title={modalConfig.title}
      >
        {modalConfig.content}
      </Modal>

    </div>
  );
}