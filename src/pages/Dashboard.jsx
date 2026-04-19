// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { rotationsToLiters } from '../utils/waterCalculator';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell
} from 'recharts';
import { 
  Droplet, Activity, AlertTriangle, Thermometer, 
  Settings, Bell, AlertCircle, Info, ShieldCheck, X, Trash2, Plus, User, CheckCircle2, ChevronRight
} from 'lucide-react';

import { THEME } from '../constants/theme';
import { usageData, metricsHistory, alertHistory } from '../data/mockData';

import Gauge from '../components/Gauge';
import CustomTooltip from '../components/CustomTooltip';
import ParameterCard from '../components/ParameterCard';
import DetailedQualityChart from '../components/DetailedQualityChart';

export default function Dashboard({ setView }) {
  // --- DASHBOARD STATE ---
  const [usageTimeframe, setUsageTimeframe] = useState('week');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [visibleTiles, setVisibleTiles] = useState({
    ph: true, tds: true, turbidity: true, temperature: true
  });
  const [members, setMembers] = useState([{ id: 1, name: 'System Admin', age: 35 }]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberAge, setNewMemberAge] = useState('');
  const [liters, setLiters] = useState(0);

  const handleAddMember = () => {
    if (members.length >= 50) return;
    if (newMemberName.trim() && newMemberAge) {
      setMembers([...members, { id: Date.now(), name: newMemberName.trim(), age: newMemberAge }]);
      setNewMemberName(''); setNewMemberAge('');
    }
  };

  const handleRemoveMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const toggleTile = (tile) => {
    setVisibleTiles(prev => ({ ...prev, [tile]: !prev[tile] }));
  };

  const scrollToChart = (chartId) => {
    const element = document.getElementById(chartId);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const currentMetrics = {
    consumptionToday: liters,
    dailyLimit: 150,
    ph: 7.2,
    tds: 420,
    turbidity: 0.8,
    temperature: 22.4,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:5000/data')
        .then(res => res.json())
        .then(data => {
          if (data?.rotations !== undefined) {
            setLiters(rotationsToLiters(data.rotations));
          } else {
            setLiters(prev => prev + Math.floor(Math.random() * 5));
          }
        })
        .catch(() => {
          setLiters(prev => prev + Math.floor(Math.random() * 5));
        });
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  const isWithinLimit = currentMetrics.consumptionToday <= currentMetrics.dailyLimit;

  return (
    <div className="min-h-screen font-sans selection:bg-blue-200" style={{ backgroundColor: THEME.bgBlue }}>
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/50 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: THEME.bgBlue, color: THEME.primaryBlue }}>
              <Droplet size={20} />
            </div>
            <h1 className="text-lg font-bold tracking-wide" style={{ color: THEME.darkBlue }}>
              Flow<span style={{ color: THEME.primaryBlue }}>Alert</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="transition-colors relative hover:opacity-80" style={{ color: THEME.darkBlue }}>
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ backgroundColor: THEME.peach }}></span>
            </button>
            <button 
              className="transition-colors hover:opacity-80" 
              style={{ color: THEME.darkBlue }}
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings size={20} />
            </button>
            <button 
              onClick={() => setView('profile')}
              className="w-9 h-9 rounded-full ml-2 border-2 transition-transform hover:scale-105 overflow-hidden flex items-center justify-center" 
              style={{ borderColor: THEME.lightBlue, backgroundColor: THEME.bgBlue }}
              title="View Profile"
            >
               <User size={20} style={{ color: THEME.primaryBlue }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6 md:py-8">
        
        {/* Leak Detection Banner */}
        <div className="bg-white p-5 rounded-3xl mb-6 shadow-sm border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor: `${THEME.lightBlue}40` }}>
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full flex items-center justify-center relative z-10" style={{ backgroundColor: '#E8F5E9', color: '#10B981' }}>
                <ShieldCheck size={24} />
              </div>
              <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20"></div>
            </div>
            <div>
              <h2 className="text-lg font-bold" style={{ color: THEME.darkBlue }}>Smart Leak Detection</h2>
              <p className="text-sm font-medium mt-0.5" style={{ color: THEME.lightBlue }}>Continuous acoustic and flow-rate monitoring is active.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex-1 sm:flex-none sm:text-right">
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: THEME.lightBlue }}>Status</p>
              <div className="flex items-center sm:justify-end gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="font-bold text-emerald-600">Secure (No Leaks)</span>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 mx-4" style={{ backgroundColor: `${THEME.lightBlue}30` }}></div>
            <div className="flex-1 sm:flex-none text-right">
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: THEME.lightBlue }}>Last Scanned</p>
              <p className="font-bold text-sm" style={{ color: THEME.darkBlue }}>Live</p>
            </div>
          </div>
        </div>

        {/* Top Grid: Consumption & Quality Parameters */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 mb-6">
          <div className="bg-white p-4 md:p-6 rounded-3xl col-span-1 shadow-sm relative overflow-hidden flex flex-col justify-between" style={{ border: `1px solid ${THEME.lightBlue}40` }}>
            <h2 className="text-lg font-bold mb-2" style={{ color: THEME.darkBlue }}>Today's Usage</h2>
            <Gauge value={currentMetrics.consumptionToday} max={currentMetrics.dailyLimit} />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl p-3 text-center border" style={{ backgroundColor: THEME.bgBlue, borderColor: `${THEME.lightBlue}40` }}>
                <p className="text-xs font-medium mb-1" style={{ color: THEME.darkBlue }}>Status</p>
                <p className="font-bold text-sm" style={{ color: isWithinLimit ? THEME.primaryBlue : THEME.peach }}>
                  {isWithinLimit ? 'Within Limit' : 'Limit Exceeded'}
                </p>
              </div>
              <div className="rounded-xl p-3 text-center border" style={{ backgroundColor: THEME.bgBlue, borderColor: `${THEME.lightBlue}40` }}>
                <p className="text-xs font-medium mb-1" style={{ color: THEME.darkBlue }}>Avg Daily</p>
                <p className="font-bold text-sm" style={{ color: THEME.primaryBlue }}>125 L</p>
              </div>
            </div>
          </div>

          <div className="col-span-1 xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {visibleTiles.ph && <ParameterCard id="ph-card" title="pH Level" value={currentMetrics.ph} unit="pH" icon={Activity} status="good" data={metricsHistory.ph} onClick={() => scrollToChart('chart-ph')} />}
            {visibleTiles.tds && <ParameterCard id="tds-card" title="TDS" value={currentMetrics.tds} unit="ppm" icon={Droplet} status="warning" data={metricsHistory.tds} onClick={() => scrollToChart('chart-tds')} />}
            {visibleTiles.turbidity && <ParameterCard id="turbidity-card" title="Turbidity" value={currentMetrics.turbidity} unit="NTU" icon={AlertCircle} status="good" data={metricsHistory.turbidity} onClick={() => scrollToChart('chart-turbidity')} />}
            {visibleTiles.temperature && <ParameterCard id="temp-card" title="Temperature" value={currentMetrics.temperature} unit="°C" icon={Thermometer} status="good" data={metricsHistory.temperature} onClick={() => scrollToChart('chart-temperature')} />}
          </div>
        </div>

        {/* Middle Grid: Main Charts & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl col-span-1 lg:col-span-2 shadow-sm" style={{ border: `1px solid ${THEME.lightBlue}40` }}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-lg font-bold" style={{ color: THEME.darkBlue }}>Water Consumption Trend</h2>
                <p className="text-sm font-medium mt-1" style={{ color: THEME.lightBlue }}>Analyze your usage patterns over time</p>
              </div>
              <div className="p-1 rounded-xl flex text-sm font-medium" style={{ backgroundColor: THEME.bgBlue }}>
                {['daily', 'week', 'month'].map(tf => (
                  <button key={tf} onClick={() => setUsageTimeframe(tf)} className={`px-4 py-1.5 rounded-lg transition-all capitalize ${usageTimeframe === tf ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`} style={{ color: usageTimeframe === tf ? THEME.primaryBlue : THEME.darkBlue }}>{tf}</button>
                ))}
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData[usageTimeframe]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={`${THEME.lightBlue}40`} />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: THEME.darkBlue, fontSize: 12, fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: THEME.lightBlue, fontSize: 12, fontWeight: 500 }} />
                  <RechartsTooltip content={<CustomTooltip unit="L" />} cursor={{ fill: THEME.bgBlue }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={40}>
                    {usageData[usageTimeframe].map((entry, index) => {
                      const threshold = usageTimeframe === 'daily' ? 12 : 130; 
                      return <Cell key={`cell-${index}`} fill={entry.value > threshold ? THEME.primaryBlue : THEME.lightBlue} />
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl col-span-1 shadow-sm flex flex-col" style={{ border: `1px solid ${THEME.lightBlue}40` }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold" style={{ color: THEME.darkBlue }}>Alert History</h2>
              <button className="text-sm hover:underline font-bold" style={{ color: THEME.primaryBlue }}>View All</button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar" style={{ maxHeight: '300px' }}>
              {alertHistory.map((alert) => (
                <div key={alert.id} className="p-4 rounded-2xl transition-colors group" style={{ backgroundColor: THEME.bgBlue, border: `1px solid ${THEME.lightBlue}30` }}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {alert.type === 'critical' ? <AlertTriangle size={16} style={{ color: '#EF4444' }} /> : alert.type === 'warning' ? <AlertCircle size={16} style={{ color: THEME.peach }} /> : <Info size={16} style={{ color: THEME.primaryBlue }} />}
                      <span className="font-bold" style={{ color: THEME.darkBlue }}>{alert.parameter} {alert.status}</span>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: THEME.lightBlue }}>{alert.date}</span>
                  </div>
                  <div className="pl-6 text-sm">
                    <p className="font-semibold mb-1" style={{ color: THEME.darkBlue }}>Reading: <span style={{ color: alert.type === 'critical' ? '#EF4444' : THEME.peach }}>{alert.reading}</span></p>
                    <p className="text-xs font-medium" style={{ color: THEME.lightBlue }}>Threshold: {alert.threshold}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <Activity size={24} style={{ color: THEME.primaryBlue }} />
          <h2 className="text-xl font-bold" style={{ color: THEME.darkBlue }}>Detailed Water Quality Analysis</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {visibleTiles.ph && <DetailedQualityChart id="chart-ph" title="pH Level" parameterKey="ph" color={THEME.primaryBlue} />}
          {visibleTiles.tds && <DetailedQualityChart id="chart-tds" title="TDS (Total Dissolved Solids)" parameterKey="tds" color={THEME.peach} />}
          {visibleTiles.turbidity && <DetailedQualityChart id="chart-turbidity" title="Turbidity" parameterKey="turbidity" color={THEME.primaryBlue} />}
          {visibleTiles.temperature && <DetailedQualityChart id="chart-temperature" title="Temperature" parameterKey="temperature" color={THEME.lightBlue} />}
        </div>
      </main>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#0E4D92]/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-3xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden flex flex-col shadow-2xl absolute bottom-0 sm:relative">
            <div className="px-6 py-4 border-b flex justify-between items-center" style={{ borderColor: `${THEME.lightBlue}40` }}>
              <h2 className="text-xl font-bold" style={{ color: THEME.darkBlue }}>Dashboard Settings</h2>
              <button onClick={() => setIsSettingsOpen(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors" style={{ color: THEME.darkBlue }}>
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
              <section>
                <h3 className="text-lg font-bold mb-1" style={{ color: THEME.darkBlue }}>Widget Visibility</h3>
                <p className="text-sm mb-4 font-medium" style={{ color: THEME.lightBlue }}>Choose which parameters to display on your dashboard.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'ph', label: 'pH Level' },
                    { key: 'tds', label: 'TDS (Dissolved Solids)' },
                    { key: 'turbidity', label: 'Turbidity' },
                    { key: 'temperature', label: 'Temperature' }
                  ].map((tile) => (
                    <div key={tile.key} className="flex items-center justify-between p-4 rounded-2xl border" style={{ borderColor: `${THEME.lightBlue}40`, backgroundColor: THEME.bgBlue }}>
                      <span className="font-bold" style={{ color: THEME.darkBlue }}>{tile.label}</span>
                      <button
                        onClick={() => toggleTile(tile.key)}
                        className={`w-12 h-6 rounded-full relative transition-colors ${visibleTiles[tile.key] ? 'bg-[#1E88E5]' : 'bg-gray-300'}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${visibleTiles[tile.key] ? 'left-7' : 'left-1'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: THEME.darkBlue }}>Building Members</h3>
                    <p className="text-sm font-medium" style={{ color: THEME.lightBlue }}>Manage up to 50 members to track usage metrics.</p>
                  </div>
                  <span className="text-sm font-bold bg-blue-50 px-3 py-1 rounded-full" style={{ color: THEME.primaryBlue }}>
                    {members.length} / 50
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <input type="text" placeholder="Member Name" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} className="flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40`, backgroundColor: THEME.white, color: THEME.darkBlue }} disabled={members.length >= 50} />
                  <div className="flex gap-3">
                    <input type="number" placeholder="Age" value={newMemberAge} onChange={(e) => setNewMemberAge(e.target.value)} className="w-24 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40`, backgroundColor: THEME.white, color: THEME.darkBlue }} disabled={members.length >= 50} />
                    <button onClick={handleAddMember} disabled={members.length >= 50 || !newMemberName || !newMemberAge} className="px-5 py-2 rounded-xl text-white font-bold flex items-center justify-center gap-1 disabled:opacity-50 transition-opacity" style={{ backgroundColor: THEME.primaryBlue }}><Plus size={18} /> Add</button>
                  </div>
                </div>

                {members.length >= 50 && <p className="text-sm text-red-500 font-bold mb-4">Maximum member limit reached.</p>}

                <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-2">
                  {members.map(member => (
                    <div key={member.id} className="flex justify-between items-center p-3 rounded-xl border transition-colors hover:bg-slate-50" style={{ borderColor: `${THEME.lightBlue}30`, backgroundColor: THEME.white }}>
                      <div>
                        <span className="font-bold block" style={{ color: THEME.darkBlue }}>{member.name}</span>
                        <span className="text-xs font-semibold" style={{ color: THEME.lightBlue }}>Age: {member.age}</span>
                      </div>
                      <button onClick={() => handleRemoveMember(member.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove Member"><Trash2 size={18} /></button>
                    </div>
                  ))}
                  {members.length === 0 && <p className="text-center text-sm py-6 font-medium" style={{ color: THEME.lightBlue }}>No members added yet.</p>}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${THEME.lightBlue}80; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: ${THEME.primaryBlue}; }
        html { scroll-behavior: smooth; }
      `}} />
    </div>
  );
}