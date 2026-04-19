// import React, { useState, useEffect } from 'react';
// import { rotationsToLiters } from './utils/waterCalculator';

// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell,
//   LineChart, Line
// } from 'recharts';

// import { 
//   Droplet, Activity, AlertTriangle, Thermometer, 
//   Settings, Bell, CheckCircle2, AlertCircle, Info, ChevronRight, ShieldCheck, X, Trash2, Plus,
//   User, Mail, Phone, Hash, Package, LogOut, ArrowLeft, Lock
// } from 'lucide-react';

// // --- APPLICATION COLOR THEME ---
// const THEME = {
//   darkBlue: '#0E4D92',
//   primaryBlue: '#1E88E5',
//   lightBlue: '#79C7FF',
//   bgBlue: '#E8F6FF',
//   peach: '#FFD2A6',
//   white: '#FFFFFF'
// };

// // --- MOCK DATA GENERATORS ---
// const generateChartData = (timeframe, base, variance, isInteger = false) => {
//   const length = timeframe === 'daily' ? 24 : timeframe === 'week' ? 7 : 30;
  
//   const labels = timeframe === 'daily' 
//     ? Array.from({length: 24}, (_, i) => `${i}:00`)
//     : timeframe === 'week' 
//       ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//       : Array.from({length: 30}, (_, i) => `${i + 1}`);

//   return labels.map(label => {
//     let val = base + (Math.random() * variance * 2 - variance);
//     return {
//       label,
//       value: isInteger ? Math.round(val) : parseFloat(val.toFixed(2))
//     };
//   });
// };

// const usageData = {
//   daily: generateChartData('daily', 8, 5, true).map(d => ({ ...d, value: Math.max(0, d.value) })), // Liters per hour
//   week: generateChartData('week', 110, 40, true), // Liters per day
//   month: generateChartData('month', 110, 40, true),
// };

// const qualityDataConfigs = {
//   ph: { base: 7.2, variance: 0.5, unit: 'pH' },
//   tds: { base: 420, variance: 60, unit: 'ppm' },
//   turbidity: { base: 0.8, variance: 0.4, unit: 'NTU' },
//   temperature: { base: 22.4, variance: 2.0, unit: '°C' },
// };

// // Mock history data for the small cards (sparklines)
// const generateSparkline = (base, variance) => Array.from({ length: 14 }, () => ({
//   value: base + (Math.random() * variance * 2 - variance)
// }));

// const metricsHistory = {
//   ph: generateSparkline(7.2, 0.4),
//   tds: generateSparkline(420, 50),
//   turbidity: generateSparkline(0.8, 0.3),
//   temperature: generateSparkline(22.4, 1.5),
// };

// const alertHistory = [
//   { id: 1, date: 'Today, 14:30', parameter: 'TDS', status: 'High', reading: '950 ppm', threshold: '800 ppm', type: 'warning' },
//   { id: 2, date: 'Today, 09:15', parameter: 'pH', status: 'Low', reading: '5.8', threshold: '6.5', type: 'warning' },
//   { id: 3, date: 'Yesterday, 18:45', parameter: 'Turbidity', status: 'Elevated', reading: '4.2 NTU', threshold: '1.0 NTU', type: 'warning' },
//   { id: 4, date: '14 Apr, 02:00', parameter: 'Usage', status: 'Continuous Flow', reading: '15 L/h', threshold: '0 L/h', type: 'critical' },
//   { id: 5, date: '12 Apr, 10:20', parameter: 'Temperature', status: 'High', reading: '28°C', threshold: '25°C', type: 'info' },
// ];

// // --- COMPONENTS ---

// // Custom SVG Gauge for Water Consumption
// const Gauge = ({ value, max }) => {
//   const radius = 70;
//   const circumference = Math.PI * radius;
//   const percentage = Math.min(value / max, 1);
//   const strokeDashoffset = circumference - (percentage * circumference);

//   const isOverLimit = value > max;
//   const strokeColor = isOverLimit ? THEME.peach : THEME.primaryBlue; 

//   return (
//     <div className="relative flex flex-col items-center justify-center h-48">
//       <svg className="w-full h-full" viewBox="0 0 200 120">
//         <path
//           d="M 20 100 A 80 80 0 0 1 180 100"
//           fill="none"
//           stroke={THEME.bgBlue} 
//           strokeWidth="16"
//           strokeLinecap="round"
//         />
//         <path
//           d="M 20 100 A 80 80 0 0 1 180 100"
//           fill="none"
//           stroke={strokeColor}
//           strokeWidth="16"
//           strokeLinecap="round"
//           strokeDasharray={circumference}
//           strokeDashoffset={strokeDashoffset}
//           className="transition-all duration-1000 ease-out"
//         />
//       </svg>
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center">
//         <span className="text-4xl font-bold tracking-tight" style={{ color: THEME.darkBlue }}>{value}</span>
//         <span className="text-sm ml-1" style={{ color: THEME.lightBlue }}>L</span>
//         <p className="text-xs mt-1 font-medium" style={{ color: THEME.lightBlue }}>Daily Limit: {max} L</p>
//       </div>
//     </div>
//   );
// };

// // Parameter Card with Simple Graph (Clickable)
// const ParameterCard = ({ id, title, value, unit, icon: Icon, status, data, onClick }) => {
//   return (
//     <div 
//       onClick={onClick}
//       className="bg-white border p-5 rounded-2xl flex flex-col justify-between shadow-sm transition-all hover:shadow-md cursor-pointer group hover:-translate-y-1" 
//       style={{ borderColor: `${THEME.lightBlue}40` }}
//     >
//       <div className="flex justify-between items-start mb-2">
//         <div className="flex items-center gap-2 font-semibold" style={{ color: THEME.darkBlue }}>
//           <div className="p-2 rounded-lg transition-colors group-hover:bg-blue-100" style={{ backgroundColor: THEME.bgBlue, color: THEME.primaryBlue }}>
//             <Icon size={18} />
//           </div>
//           {title}
//         </div>
//         <div className="flex items-center gap-1">
//           {status === 'warning' && <AlertTriangle size={18} style={{ color: '#F59E0B' }} />}
//           {status === 'critical' && <AlertCircle size={18} style={{ color: '#EF4444' }} />}
//           {status === 'good' && <CheckCircle2 size={18} style={{ color: THEME.primaryBlue }} />}
//           <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: THEME.lightBlue }} />
//         </div>
//       </div>
      
//       <div className="flex items-baseline gap-1 mb-3">
//         <span className="text-3xl font-bold" style={{ color: THEME.darkBlue }}>{value}</span>
//         <span className="text-sm font-medium" style={{ color: THEME.lightBlue }}>{unit}</span>
//       </div>
        
//       <div className="h-12 w-full mt-auto">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <Line 
//               type="monotone" 
//               dataKey="value" 
//               stroke={status === 'warning' ? THEME.peach : THEME.primaryBlue} 
//               strokeWidth={2.5} 
//               dot={false} 
//               isAnimationActive={true}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// // Reusable Custom Tooltip
// const CustomTooltip = ({ active, payload, label, unit }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white border p-3 rounded-lg shadow-lg" style={{ borderColor: THEME.lightBlue }}>
//         <p className="text-sm mb-1 font-medium" style={{ color: THEME.lightBlue }}>{label}</p>
//         <p className="font-bold text-lg" style={{ color: THEME.primaryBlue }}>
//           {`${payload[0].value} ${unit}`}
//         </p>
//       </div>
//     );
//   }
//   return null;
// };

// // Detailed Quality Chart Component
// const DetailedQualityChart = ({ id, title, parameterKey, color }) => {
//   const [timeframe, setTimeframe] = useState('week');
//   const config = qualityDataConfigs[parameterKey];
  
//   const [chartData, setChartData] = useState({
//     daily: generateChartData('daily', config.base, config.variance),
//     week: generateChartData('week', config.base, config.variance),
//     month: generateChartData('month', config.base, config.variance)
//   });

//   return (
//     <div id={id} className="bg-white p-6 rounded-3xl shadow-sm" style={{ border: `1px solid ${THEME.lightBlue}40`, scrollMarginTop: '80px' }}>
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//         <div>
//           <h2 className="text-lg font-bold" style={{ color: THEME.darkBlue }}>{title} Trend</h2>
//           <p className="text-sm font-medium mt-1" style={{ color: THEME.lightBlue }}>Detailed {title.toLowerCase()} history</p>
//         </div>
        
//         {/* Tabs */}
//         <div className="p-1 rounded-xl flex text-sm font-medium" style={{ backgroundColor: THEME.bgBlue }}>
//           {['daily', 'week', 'month'].map(tf => (
//             <button 
//               key={tf}
//               onClick={() => setTimeframe(tf)}
//               className={`px-4 py-1.5 rounded-lg transition-all capitalize ${timeframe === tf ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
//               style={{ color: timeframe === tf ? THEME.primaryBlue : THEME.darkBlue }}
//             >
//               {tf}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="h-64 w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={chartData[timeframe]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={`${THEME.lightBlue}40`} />
//             <XAxis 
//               dataKey="label" 
//               axisLine={false} 
//               tickLine={false} 
//               tick={{ fill: THEME.darkBlue, fontSize: 12, fontWeight: 500 }} 
//               dy={10}
//             />
//             <YAxis 
//               domain={['auto', 'auto']}
//               axisLine={false} 
//               tickLine={false} 
//               tick={{ fill: THEME.lightBlue, fontSize: 12, fontWeight: 500 }} 
//             />
//             <RechartsTooltip content={<CustomTooltip unit={config.unit} />} cursor={{ stroke: THEME.lightBlue, strokeWidth: 1, strokeDasharray: '3 3' }} />
//             <Line 
//               type="monotone" 
//               dataKey="value" 
//               stroke={color} 
//               strokeWidth={3}
//               dot={{ r: 4, fill: color, strokeWidth: 2, stroke: THEME.white }}
//               activeDot={{ r: 6, strokeWidth: 0 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };


// // --- MAIN APP ---
// export default function App() {
//   // Navigation State: 'login', 'signup', 'dashboard', 'profile'

//   const [view, setView] = useState('login'); 


//   // --- AUTH & PROFILE STATE ---
//   const [registeredUser, setRegisteredUser] = useState({
//     name: 'Jane Doe',
//     customerId: 'CUST-8492',
//     email: 'jane.doe@example.com',
//     phone: '+1 234 567 8900',
//     productId: 'FLOW-X1-992',
//     password: 'password123'
//   });

//   const [loginInput, setLoginInput] = useState('');
//   const [loginPassword, setLoginPassword] = useState('');
//   const [loginError, setLoginError] = useState('');

//   const [signupForm, setSignupForm] = useState({
//     name: '', customerId: '', email: '', phone: '', productId: '', password: ''
//   });

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const isUserMatch = 
//       loginInput === registeredUser.email || 
//       loginInput === registeredUser.phone || 
//       loginInput === registeredUser.customerId;
    
//     if (isUserMatch && loginPassword === registeredUser.password) {
//       setLoginError('');
//       setView('dashboard');
//     } else {
//       setLoginError('Invalid credentials. Please check your details and password.');
//     }
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();
//     setRegisteredUser(signupForm);
//     setView('dashboard');
//   };

//   // --- DASHBOARD STATE ---
//   const [usageTimeframe, setUsageTimeframe] = useState('week');
//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);
//   const [visibleTiles, setVisibleTiles] = useState({
//     ph: true, tds: true, turbidity: true, temperature: true
//   });
//   const [members, setMembers] = useState([{ id: 1, name: 'System Admin', age: 35 }]);
//   const [newMemberName, setNewMemberName] = useState('');
//   const [newMemberAge, setNewMemberAge] = useState('');

//   const handleAddMember = () => {
//     if (members.length >= 50) return;
//     if (newMemberName.trim() && newMemberAge) {
//       setMembers([...members, { id: Date.now(), name: newMemberName.trim(), age: newMemberAge }]);
//       setNewMemberName(''); setNewMemberAge('');
//     }
//   };

//   const handleRemoveMember = (id) => {
//     setMembers(members.filter(m => m.id !== id));
//   };

//   const toggleTile = (tile) => {
//     setVisibleTiles(prev => ({ ...prev, [tile]: !prev[tile] }));
//   };

//   const scrollToChart = (chartId) => {
//     const element = document.getElementById(chartId);
//     if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   };


//   // ================= RENDERERS ================= //
//     // 🔥 STATE
//   const [liters, setLiters] = useState(0);

//  const currentMetrics = {
//     consumptionToday: liters,   // ✅ now works
//     dailyLimit: 150,
//     ph: 7.2,
//     tds: 420,
//     turbidity: 0.8,
//     temperature: 22.4,
//   };

//   // 🔥 FETCH DATA FROM BACKEND
//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     fetch('http://localhost:5000/data')
//   //       .then(res => res.json())
//   //       .then(data => {
//   //         if (data?.rotations !== undefined) {
//   //           setLiters(rotationsToLiters(data.rotations));
//   //         }
//   //       })
//   //       .catch(err => console.log(err));
//   //   }, 1000);

//   //   return () => clearInterval(interval);
//   // }, []);

//   useEffect(() => {
//   const interval = setInterval(() => {
//     fetch('http://localhost:5000/data')
//       .then(res => res.json())
//       .then(data => {
//         if (data?.rotations !== undefined) {
//           setLiters(rotationsToLiters(data.rotations));
//         } else {
//           // ⚡ fallback random data
//           setLiters(prev => prev + Math.floor(Math.random() * 5));
//         }
//       })
//       .catch(() => {
//         // ⚡ backend not working → simulate usage
//         setLiters(prev => prev + Math.floor(Math.random() * 5));
//       });
//   }, 1000);

//   return () => clearInterval(interval);
// }, []);


//   if (view === 'login') {
//     return (
//       <div className="min-h-screen flex items-center justify-center font-sans selection:bg-blue-200 p-6" style={{ backgroundColor: THEME.bgBlue }}>
//         <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border" style={{ borderColor: `${THEME.lightBlue}40` }}>
//           <div className="flex flex-col items-center mb-8">
//             <div className="w-14 h-14 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: THEME.bgBlue, color: THEME.primaryBlue }}>
//               <Droplet size={32} />
//             </div>
//             <h1 className="text-2xl font-bold tracking-wide" style={{ color: THEME.darkBlue }}>
//               Flow<span style={{ color: THEME.primaryBlue }}>Alert</span>
//             </h1>
//             <p className="text-sm font-medium mt-2" style={{ color: THEME.lightBlue }}>Welcome back to your dashboard</p>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-5">
//             <div>
//               <label className="block text-sm font-bold mb-2" style={{ color: THEME.darkBlue }}>Email, Phone, or Customer ID</label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: THEME.lightBlue }} />
//                 <input 
//                   type="text" 
//                   value={loginInput}
//                   onChange={(e) => setLoginInput(e.target.value)}
//                   placeholder="e.g. CUST-8492 or email@domain.com"
//                   className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent transition-all"
//                   style={{ borderColor: `${THEME.lightBlue}40`, color: THEME.darkBlue }}
//                   required
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-bold mb-2" style={{ color: THEME.darkBlue }}>Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: THEME.lightBlue }} />
//                 <input 
//                   type="password" 
//                   value={loginPassword}
//                   onChange={(e) => setLoginPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent transition-all"
//                   style={{ borderColor: `${THEME.lightBlue}40`, color: THEME.darkBlue }}
//                   required
//                 />
//               </div>
//             </div>
//             {loginError && <p className="text-red-500 text-sm font-semibold">{loginError}</p>}
//             <button 
//               type="submit" 
//               className="w-full py-3 rounded-xl text-white font-bold transition-opacity hover:opacity-90 flex justify-center items-center gap-2"
//               style={{ backgroundColor: THEME.primaryBlue }}
//             >
//               <Lock size={18} /> Sign In
//             </button>
//           </form>

//           <p className="text-center mt-6 text-sm font-medium" style={{ color: THEME.lightBlue }}>
//             Don't have an account?{' '}
//             <button onClick={() => setView('signup')} className="font-bold hover:underline" style={{ color: THEME.primaryBlue }}>
//               Sign up here
//             </button>
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (view === 'signup') {
//     return (
//       <div className="min-h-screen flex items-center justify-center font-sans selection:bg-blue-200 p-6 py-12" style={{ backgroundColor: THEME.bgBlue }}>
//         <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg border" style={{ borderColor: `${THEME.lightBlue}40` }}>
//           <div className="flex flex-col items-center mb-8">
//             <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: THEME.bgBlue, color: THEME.primaryBlue }}>
//               <Droplet size={24} />
//             </div>
//             <h1 className="text-xl font-bold tracking-wide" style={{ color: THEME.darkBlue }}>Create Account</h1>
//             <p className="text-sm font-medium mt-1 text-center" style={{ color: THEME.lightBlue }}>Register your smart meter to start monitoring.</p>
//           </div>

//           <form onSubmit={handleSignup} className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-bold mb-1" style={{ color: THEME.darkBlue }}>Full Name</label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: THEME.lightBlue }} />
//                   <input 
//                     type="text" value={signupForm.name} onChange={e => setSignupForm({...signupForm, name: e.target.value})}
//                     className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40` }} required
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-bold mb-1" style={{ color: THEME.darkBlue }}>Customer ID</label>
//                 <div className="relative">
//                   <Hash className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: THEME.lightBlue }} />
//                   <input 
//                     type="text" value={signupForm.customerId} onChange={e => setSignupForm({...signupForm, customerId: e.target.value})}
//                     className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40` }} required
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-bold mb-1" style={{ color: THEME.darkBlue }}>Email Address</label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: THEME.lightBlue }} />
//                   <input 
//                     type="email" value={signupForm.email} onChange={e => setSignupForm({...signupForm, email: e.target.value})}
//                     className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40` }} required
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-bold mb-1" style={{ color: THEME.darkBlue }}>Phone Number</label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: THEME.lightBlue }} />
//                   <input 
//                     type="tel" value={signupForm.phone} onChange={e => setSignupForm({...signupForm, phone: e.target.value})}
//                     className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40` }} required
//                   />
//                 </div>
//               </div>
//               <div className="sm:col-span-2">
//                 <label className="block text-sm font-bold mb-1" style={{ color: THEME.darkBlue }}>Product ID / Serial Number</label>
//                 <div className="relative">
//                   <Package className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: THEME.lightBlue }} />
//                   <input 
//                     type="text" value={signupForm.productId} onChange={e => setSignupForm({...signupForm, productId: e.target.value})}
//                     className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40` }} required
//                   />
//                 </div>
//               </div>
//               <div className="sm:col-span-2">
//                 <label className="block text-sm font-bold mb-1" style={{ color: THEME.darkBlue }}>Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: THEME.lightBlue }} />
//                   <input 
//                     type="password" value={signupForm.password} onChange={e => setSignupForm({...signupForm, password: e.target.value})}
//                     className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40` }} required
//                   />
//                 </div>
//               </div>
//             </div>
            
//             <button 
//               type="submit" 
//               className="w-full py-3 mt-4 rounded-xl text-white font-bold transition-opacity hover:opacity-90"
//               style={{ backgroundColor: THEME.primaryBlue }}
//             >
//               Create Account
//             </button>
//           </form>

//           <p className="text-center mt-6 text-sm font-medium" style={{ color: THEME.lightBlue }}>
//             Already registered?{' '}
//             <button onClick={() => setView('login')} className="font-bold hover:underline" style={{ color: THEME.primaryBlue }}>
//               Log in here
//             </button>
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (view === 'profile') {
//     return (
//       <div className="min-h-screen font-sans selection:bg-blue-200 flex flex-col" style={{ backgroundColor: THEME.bgBlue }}>
//         <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/50 shadow-sm">
//           <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
//             <button onClick={() => setView('dashboard')} className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity" style={{ color: THEME.darkBlue }}>
//               <ArrowLeft size={20} /> Back to Dashboard
//             </button>
//           </div>
//         </nav>

//         <main className="max-w-3xl mx-auto px-6 py-12 w-full flex-1">
//           <div className="bg-white rounded-3xl shadow-sm border overflow-hidden" style={{ borderColor: `${THEME.lightBlue}40` }}>
//             <div className="h-32 bg-gradient-to-r from-[#1E88E5] to-[#79C7FF]"></div>
            
//             <div className="px-8 pb-8 relative">
//               {/* Profile Photo */}
//               <div className="absolute -top-16 left-8">
//                 <div className="w-32 h-32 rounded-full border-4 border-white flex items-center justify-center overflow-hidden shadow-md" style={{ backgroundColor: THEME.bgBlue }}>
//                   <User size={64} style={{ color: THEME.primaryBlue }} />
//                 </div>
//               </div>

//               <div className="flex justify-end pt-4 mb-6">
//                 <button 
//                   onClick={() => setView('login')}
//                   className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors border border-red-200"
//                 >
//                   <LogOut size={16} /> Log Out
//                 </button>
//               </div>

//               <div className="mt-8">
//                 <h1 className="text-3xl font-bold mb-1" style={{ color: THEME.darkBlue }}>{registeredUser.name}</h1>
//                 <p className="text-sm font-bold uppercase tracking-wider mb-8" style={{ color: THEME.primaryBlue }}>Account Overview</p>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <div className="p-4 rounded-2xl" style={{ backgroundColor: THEME.bgBlue }}>
//                     <div className="flex items-center gap-2 mb-1">
//                       <Hash size={16} style={{ color: THEME.lightBlue }} />
//                       <p className="text-sm font-medium" style={{ color: THEME.lightBlue }}>Customer ID</p>
//                     </div>
//                     <p className="font-bold text-lg" style={{ color: THEME.darkBlue }}>{registeredUser.customerId}</p>
//                   </div>

//                   <div className="p-4 rounded-2xl" style={{ backgroundColor: THEME.bgBlue }}>
//                     <div className="flex items-center gap-2 mb-1">
//                       <Package size={16} style={{ color: THEME.lightBlue }} />
//                       <p className="text-sm font-medium" style={{ color: THEME.lightBlue }}>Product ID</p>
//                     </div>
//                     <p className="font-bold text-lg" style={{ color: THEME.darkBlue }}>{registeredUser.productId}</p>
//                   </div>

//                   <div className="p-4 rounded-2xl" style={{ backgroundColor: THEME.bgBlue }}>
//                     <div className="flex items-center gap-2 mb-1">
//                       <Mail size={16} style={{ color: THEME.lightBlue }} />
//                       <p className="text-sm font-medium" style={{ color: THEME.lightBlue }}>Email Address</p>
//                     </div>
//                     <p className="font-bold text-lg break-all" style={{ color: THEME.darkBlue }}>{registeredUser.email}</p>
//                   </div>

//                   <div className="p-4 rounded-2xl" style={{ backgroundColor: THEME.bgBlue }}>
//                     <div className="flex items-center gap-2 mb-1">
//                       <Phone size={16} style={{ color: THEME.lightBlue }} />
//                       <p className="text-sm font-medium" style={{ color: THEME.lightBlue }}>Phone Number</p>
//                     </div>
//                     <p className="font-bold text-lg" style={{ color: THEME.darkBlue }}>{registeredUser.phone}</p>
//                   </div>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   // DEFAULT VIEW: 'dashboard'
//   const isWithinLimit = currentMetrics.consumptionToday <= currentMetrics.dailyLimit;

//   return (
//     <div className="min-h-screen font-sans selection:bg-blue-200" style={{ backgroundColor: THEME.bgBlue }}>
      
//       {/* Top Navigation */}
//       <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/50 shadow-sm">
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//           <div className="w-full px-6 h-16"></div>
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: THEME.bgBlue, color: THEME.primaryBlue }}>
//               <Droplet size={20} />
//             </div>
//             <h1 className="text-lg font-bold tracking-wide" style={{ color: THEME.darkBlue }}>
//               Flow<span style={{ color: THEME.primaryBlue }}>Alert</span>
//             </h1>
//           </div>
//           <div className="flex items-center gap-4">
//             <button className="transition-colors relative hover:opacity-80" style={{ color: THEME.darkBlue }}>
//               <Bell size={20} />
//               <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ backgroundColor: THEME.peach }}></span>
//             </button>
//             <button 
//               className="transition-colors hover:opacity-80" 
//               style={{ color: THEME.darkBlue }}
//               onClick={() => setIsSettingsOpen(true)}
//             >
//               <Settings size={20} />
//             </button>
//             <button 
//               onClick={() => setView('profile')}
//               className="w-9 h-9 rounded-full ml-2 border-2 transition-transform hover:scale-105 overflow-hidden flex items-center justify-center" 
//               style={{ borderColor: THEME.lightBlue, backgroundColor: THEME.bgBlue }}
//               title="View Profile"
//             >
//                <User size={20} style={{ color: THEME.primaryBlue }} />
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-6 py-8">
        
//         {/* Leak Detection Banner */}
//         <div className="bg-white p-5 rounded-3xl mb-6 shadow-sm border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor: `${THEME.lightBlue}40` }}>
//           <div className="flex items-center gap-4">
//             <div className="relative flex-shrink-0">
//               <div className="w-12 h-12 rounded-full flex items-center justify-center relative z-10" style={{ backgroundColor: '#E8F5E9', color: '#10B981' }}>
//                 <ShieldCheck size={24} />
//               </div>
//               <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20"></div>
//             </div>
//             <div>
//               <h2 className="text-lg font-bold" style={{ color: THEME.darkBlue }}>Smart Leak Detection</h2>
//               <p className="text-sm font-medium mt-0.5" style={{ color: THEME.lightBlue }}>Continuous acoustic and flow-rate monitoring is active.</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 w-full sm:w-auto">
//             <div className="flex-1 sm:flex-none sm:text-right">
//               <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: THEME.lightBlue }}>Status</p>
//               <div className="flex items-center sm:justify-end gap-1.5">
//                 <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
//                 <span className="font-bold text-emerald-600">Secure (No Leaks)</span>
//               </div>
//             </div>
//             <div className="hidden sm:block w-px h-10 mx-4" style={{ backgroundColor: `${THEME.lightBlue}30` }}></div>
//             <div className="flex-1 sm:flex-none text-right">
//               <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: THEME.lightBlue }}>Last Scanned</p>
//               <p className="font-bold text-sm" style={{ color: THEME.darkBlue }}>Live</p>
//             </div>
//           </div>
//         </div>

//         {/* Top Grid: Consumption & Quality Parameters */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
//           {/* Today's Consumption Panel */}
//           <div className="bg-white p-6 rounded-3xl col-span-1 shadow-sm relative overflow-hidden flex flex-col justify-between" style={{ border: `1px solid ${THEME.lightBlue}40` }}>
//             <h2 className="text-lg font-bold mb-2" style={{ color: THEME.darkBlue }}>
//               Today's Usage
//             </h2>
            
//             <Gauge value={currentMetrics.consumptionToday} max={currentMetrics.dailyLimit} />
            
//             <div className="mt-4 grid grid-cols-2 gap-4">
//               <div className="rounded-xl p-3 text-center border" style={{ backgroundColor: THEME.bgBlue, borderColor: `${THEME.lightBlue}40` }}>
//                 <p className="text-xs font-medium mb-1" style={{ color: THEME.darkBlue }}>Status</p>
//                 <p className="font-bold text-sm" style={{ color: isWithinLimit ? THEME.primaryBlue : THEME.peach }}>
//                   {isWithinLimit ? 'Within Limit' : 'Limit Exceeded'}
//                 </p>
//               </div>
//               <div className="rounded-xl p-3 text-center border" style={{ backgroundColor: THEME.bgBlue, borderColor: `${THEME.lightBlue}40` }}>
//                 <p className="text-xs font-medium mb-1" style={{ color: THEME.darkBlue }}>Avg Daily</p>
//                 <p className="font-bold text-sm" style={{ color: THEME.primaryBlue }}>125 L</p>
//               </div>
//             </div>
//           </div>

//           {/* Water Quality Parameters Grid */}
//           <div className="col-span-1 lg:col-span-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {visibleTiles.ph && (
//               <ParameterCard 
//                 id="ph-card" title="pH Level" value={currentMetrics.ph} unit="pH" icon={Activity} 
//                 status="good" data={metricsHistory.ph} onClick={() => scrollToChart('chart-ph')}
//               />
//             )}
//             {visibleTiles.tds && (
//               <ParameterCard 
//                 id="tds-card" title="TDS" value={currentMetrics.tds} unit="ppm" icon={Droplet} 
//                 status="warning" data={metricsHistory.tds} onClick={() => scrollToChart('chart-tds')}
//               />
//             )}
//             {visibleTiles.turbidity && (
//               <ParameterCard 
//                 id="turbidity-card" title="Turbidity" value={currentMetrics.turbidity} unit="NTU" icon={AlertCircle} 
//                 status="good" data={metricsHistory.turbidity} onClick={() => scrollToChart('chart-turbidity')}
//               />
//             )}
//             {visibleTiles.temperature && (
//               <ParameterCard 
//                 id="temp-card" title="Temperature" value={currentMetrics.temperature} unit="°C" icon={Thermometer} 
//                 status="good" data={metricsHistory.temperature} onClick={() => scrollToChart('chart-temperature')}
//               />
//             )}
//           </div>
//         </div>

//         {/* Middle Grid: Main Charts & Alerts */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
//           {/* Water Usage Chart Section */}
//           <div className="bg-white p-6 rounded-3xl col-span-1 lg:col-span-2 shadow-sm" style={{ border: `1px solid ${THEME.lightBlue}40` }}>
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
//               <div>
//                 <h2 className="text-lg font-bold" style={{ color: THEME.darkBlue }}>Water Consumption Trend</h2>
//                 <p className="text-sm font-medium mt-1" style={{ color: THEME.lightBlue }}>Analyze your usage patterns over time</p>
//               </div>
              
//               {/* Tab Toggle */}
//               <div className="p-1 rounded-xl flex text-sm font-medium" style={{ backgroundColor: THEME.bgBlue }}>
//                 {['daily', 'week', 'month'].map(tf => (
//                   <button 
//                     key={tf}
//                     onClick={() => setUsageTimeframe(tf)}
//                     className={`px-4 py-1.5 rounded-lg transition-all capitalize ${usageTimeframe === tf ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
//                     style={{ color: usageTimeframe === tf ? THEME.primaryBlue : THEME.darkBlue }}
//                   >
//                     {tf}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="h-72 w-full">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={usageData[usageTimeframe]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={`${THEME.lightBlue}40`} />
//                   <XAxis 
//                     dataKey="label" 
//                     axisLine={false} 
//                     tickLine={false} 
//                     tick={{ fill: THEME.darkBlue, fontSize: 12, fontWeight: 500 }} 
//                     dy={10}
//                   />
//                   <YAxis 
//                     axisLine={false} 
//                     tickLine={false} 
//                     tick={{ fill: THEME.lightBlue, fontSize: 12, fontWeight: 500 }} 
//                   />
//                   <RechartsTooltip content={<CustomTooltip unit="L" />} cursor={{ fill: THEME.bgBlue }} />
//                   <Bar 
//                     dataKey="value" 
//                     radius={[6, 6, 0, 0]}
//                     maxBarSize={40}
//                   >
//                     {usageData[usageTimeframe].map((entry, index) => {
//                       const threshold = usageTimeframe === 'daily' ? 12 : 130; // Mock thresholds for colors
//                       return (
//                         <Cell key={`cell-${index}`} fill={entry.value > threshold ? THEME.primaryBlue : THEME.lightBlue} />
//                       )
//                     })}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Alert History Section */}
//           <div className="bg-white p-6 rounded-3xl col-span-1 shadow-sm flex flex-col" style={{ border: `1px solid ${THEME.lightBlue}40` }}>
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-lg font-bold" style={{ color: THEME.darkBlue }}>Alert History</h2>
//               <button className="text-sm hover:underline font-bold" style={{ color: THEME.primaryBlue }}>View All</button>
//             </div>
            
//             <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar" style={{ maxHeight: '300px' }}>
//               {alertHistory.map((alert) => (
//                 <div key={alert.id} className="p-4 rounded-2xl transition-colors group" style={{ backgroundColor: THEME.bgBlue, border: `1px solid ${THEME.lightBlue}30` }}>
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="flex items-center gap-2">
//                       {alert.type === 'critical' ? (
//                         <AlertTriangle size={16} style={{ color: '#EF4444' }} />
//                       ) : alert.type === 'warning' ? (
//                         <AlertCircle size={16} style={{ color: THEME.peach }} />
//                       ) : (
//                         <Info size={16} style={{ color: THEME.primaryBlue }} />
//                       )}
//                       <span className="font-bold" style={{ color: THEME.darkBlue }}>{alert.parameter} {alert.status}</span>
//                     </div>
//                     <span className="text-xs font-semibold" style={{ color: THEME.lightBlue }}>{alert.date}</span>
//                   </div>
                  
//                   <div className="pl-6 text-sm">
//                     <p className="font-semibold mb-1" style={{ color: THEME.darkBlue }}>
//                       Reading: <span style={{ color: alert.type === 'critical' ? '#EF4444' : THEME.peach }}>
//                         {alert.reading}
//                       </span>
//                     </p>
//                     <p className="text-xs font-medium" style={{ color: THEME.lightBlue }}>Threshold: {alert.threshold}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>

//         {/* Header for Detailed Metrics */}
//         <div className="mb-6 flex items-center gap-3">
//           <Activity size={24} style={{ color: THEME.primaryBlue }} />
//           <h2 className="text-xl font-bold" style={{ color: THEME.darkBlue }}>Detailed Water Quality Analysis</h2>
//         </div>

//         {/* Bottom Grid: Detailed Parameter Graphs */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {visibleTiles.ph && <DetailedQualityChart id="chart-ph" title="pH Level" parameterKey="ph" color={THEME.primaryBlue} />}
//           {visibleTiles.tds && <DetailedQualityChart id="chart-tds" title="TDS (Total Dissolved Solids)" parameterKey="tds" color={THEME.peach} />}
//           {visibleTiles.turbidity && <DetailedQualityChart id="chart-turbidity" title="Turbidity" parameterKey="turbidity" color={THEME.primaryBlue} />}
//           {visibleTiles.temperature && <DetailedQualityChart id="chart-temperature" title="Temperature" parameterKey="temperature" color={THEME.lightBlue} />}
//         </div>

//       </main>

//       {/* Settings Modal */}
//       {isSettingsOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#0E4D92]/40 backdrop-blur-sm transition-opacity">
//           <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
//             <div className="px-6 py-4 border-b flex justify-between items-center" style={{ borderColor: `${THEME.lightBlue}40` }}>
//               <h2 className="text-xl font-bold" style={{ color: THEME.darkBlue }}>Dashboard Settings</h2>
//               <button onClick={() => setIsSettingsOpen(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors" style={{ color: THEME.darkBlue }}>
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
              
//               {/* Tile Visibility Settings */}
//               <section>
//                 <h3 className="text-lg font-bold mb-1" style={{ color: THEME.darkBlue }}>Widget Visibility</h3>
//                 <p className="text-sm mb-4 font-medium" style={{ color: THEME.lightBlue }}>Choose which parameters to display on your dashboard.</p>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {[
//                     { key: 'ph', label: 'pH Level' },
//                     { key: 'tds', label: 'TDS (Dissolved Solids)' },
//                     { key: 'turbidity', label: 'Turbidity' },
//                     { key: 'temperature', label: 'Temperature' }
//                   ].map((tile) => (
//                     <div key={tile.key} className="flex items-center justify-between p-4 rounded-2xl border" style={{ borderColor: `${THEME.lightBlue}40`, backgroundColor: THEME.bgBlue }}>
//                       <span className="font-bold" style={{ color: THEME.darkBlue }}>{tile.label}</span>
//                       <button
//                         onClick={() => toggleTile(tile.key)}
//                         className={`w-12 h-6 rounded-full relative transition-colors ${visibleTiles[tile.key] ? 'bg-[#1E88E5]' : 'bg-gray-300'}`}
//                       >
//                         <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${visibleTiles[tile.key] ? 'left-7' : 'left-1'}`} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </section>

//               {/* Building Members Settings */}
//               <section>
//                 <div className="flex justify-between items-end mb-4">
//                   <div>
//                     <h3 className="text-lg font-bold" style={{ color: THEME.darkBlue }}>Building Members</h3>
//                     <p className="text-sm font-medium" style={{ color: THEME.lightBlue }}>Manage up to 50 members to track usage metrics.</p>
//                   </div>
//                   <span className="text-sm font-bold bg-blue-50 px-3 py-1 rounded-full" style={{ color: THEME.primaryBlue }}>
//                     {members.length} / 50
//                   </span>
//                 </div>
                
//                 {/* Add Member Form */}
//                 <div className="flex flex-col sm:flex-row gap-3 mb-4">
//                   <input 
//                     type="text" 
//                     placeholder="Member Name" 
//                     value={newMemberName}
//                     onChange={(e) => setNewMemberName(e.target.value)}
//                     className="flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2"
//                     style={{ borderColor: `${THEME.lightBlue}40`, backgroundColor: THEME.white, color: THEME.darkBlue }}
//                     disabled={members.length >= 50}
//                   />
//                   <div className="flex gap-3">
//                     <input 
//                       type="number" 
//                       placeholder="Age" 
//                       value={newMemberAge}
//                       onChange={(e) => setNewMemberAge(e.target.value)}
//                       className="w-24 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2"
//                       style={{ borderColor: `${THEME.lightBlue}40`, backgroundColor: THEME.white, color: THEME.darkBlue }}
//                       disabled={members.length >= 50}
//                     />
//                     <button 
//                       onClick={handleAddMember}
//                       disabled={members.length >= 50 || !newMemberName || !newMemberAge}
//                       className="px-5 py-2 rounded-xl text-white font-bold flex items-center justify-center gap-1 disabled:opacity-50 transition-opacity"
//                       style={{ backgroundColor: THEME.primaryBlue }}
//                     >
//                       <Plus size={18} /> Add
//                     </button>
//                   </div>
//                 </div>

//                 {members.length >= 50 && (
//                   <p className="text-sm text-red-500 font-bold mb-4">Maximum member limit reached.</p>
//                 )}

//                 {/* Member List */}
//                 <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-2">
//                   {members.map(member => (
//                     <div key={member.id} className="flex justify-between items-center p-3 rounded-xl border transition-colors hover:bg-slate-50" style={{ borderColor: `${THEME.lightBlue}30`, backgroundColor: THEME.white }}>
//                       <div>
//                         <span className="font-bold block" style={{ color: THEME.darkBlue }}>{member.name}</span>
//                         <span className="text-xs font-semibold" style={{ color: THEME.lightBlue }}>Age: {member.age}</span>
//                       </div>
//                       <button 
//                         onClick={() => handleRemoveMember(member.id)}
//                         className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                         title="Remove Member"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   ))}
//                   {members.length === 0 && (
//                     <p className="text-center text-sm py-6 font-medium" style={{ color: THEME.lightBlue }}>No members added yet.</p>
//                   )}
//                 </div>
//               </section>

//             </div>
//           </div>
//         </div>
//       )}

//       <style dangerouslySetInnerHTML={{__html: `
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: ${THEME.lightBlue}80;
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: ${THEME.primaryBlue};
//         }
//         html { scroll-behavior: smooth; }
//       `}} />
//     </div>
//   );
// }











///////////////////////////////////////////////////////////////////////



























// src/App.jsx
import React, { useState, useEffect } from 'react';
import { rotationsToLiters } from './utils/waterCalculator';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell
} from 'recharts';
import { 
  Droplet, Activity, AlertTriangle, Thermometer, 
  Settings, Bell, AlertCircle, Info, ShieldCheck, X, Trash2, Plus,
  User, Mail, Phone, Hash, Package, LogOut, ArrowLeft, Lock
} from 'lucide-react';

import { THEME } from './constants/theme';
import { usageData, metricsHistory, alertHistory } from './data/mockData';
import Gauge from './components/Gauge';
import CustomTooltip from './components/CustomTooltip';
import ParameterCard from './components/ParameterCard';
import DetailedQualityChart from './components/DetailedQualityChart';

export default function App() {
  const [view, setView] = useState('login'); 

  // --- AUTH & PROFILE STATE ---
  const [registeredUser, setRegisteredUser] = useState({
    name: 'Jane Doe',
    customerId: 'CUST-8492',
    email: 'jane.doe@example.com',
    phone: '+1 234 567 8900',
    productId: 'FLOW-X1-992',
    password: 'password123'
  });

  const [loginInput, setLoginInput] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [signupForm, setSignupForm] = useState({
    name: '', customerId: '', email: '', phone: '', productId: '', password: ''
  });

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

  const handleSignup = (e) => {
    e.preventDefault();
    setRegisteredUser(signupForm);
    setView('dashboard');
  };

  // --- DASHBOARD STATE ---
  const [usageTimeframe, setUsageTimeframe] = useState('week');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [visibleTiles, setVisibleTiles] = useState({
    ph: true, tds: true, turbidity: true, temperature: true
  });
  const [members, setMembers] = useState([{ id: 1, name: 'System Admin', age: 35 }]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberAge, setNewMemberAge] = useState('');

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

  const [liters, setLiters] = useState(0);

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

  if (view === 'login') {
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
                  style={{ borderColor: `${THEME.lightBlue}40`, color: THEME.darkBlue }}
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
                  style={{ borderColor: `${THEME.lightBlue}40`, color: THEME.darkBlue }}
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

  if (view === 'signup') {
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
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40` }} required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1" style={{ color: THEME.darkBlue }}>Customer ID</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: THEME.lightBlue }} />
                  <input 
                    type="text" value={signupForm.customerId} onChange={e => setSignupForm({...signupForm, customerId: e.target.value})}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40` }} required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1" style={{ color: THEME.darkBlue }}>Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: THEME.lightBlue }} />
                  <input 
                    type="email" value={signupForm.email} onChange={e => setSignupForm({...signupForm, email: e.target.value})}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40` }} required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1" style={{ color: THEME.darkBlue }}>Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: THEME.lightBlue }} />
                  <input 
                    type="tel" value={signupForm.phone} onChange={e => setSignupForm({...signupForm, phone: e.target.value})}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40` }} required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold mb-1" style={{ color: THEME.darkBlue }}>Product ID / Serial Number</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: THEME.lightBlue }} />
                  <input 
                    type="text" value={signupForm.productId} onChange={e => setSignupForm({...signupForm, productId: e.target.value})}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40` }} required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold mb-1" style={{ color: THEME.darkBlue }}>Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: THEME.lightBlue }} />
                  <input 
                    type="password" value={signupForm.password} onChange={e => setSignupForm({...signupForm, password: e.target.value})}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor: `${THEME.lightBlue}40` }} required
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

  if (view === 'profile') {
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
              {/* Profile Photo */}
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

  // DEFAULT VIEW: 'dashboard'
  const isWithinLimit = currentMetrics.consumptionToday <= currentMetrics.dailyLimit;

  return (
    <div className="min-h-screen font-sans selection:bg-blue-200" style={{ backgroundColor: THEME.bgBlue }}>
      
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="w-full px-6 h-16"></div>
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
      <main className="max-w-7xl mx-auto px-6 py-8">
        
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Today's Consumption Panel */}
          <div className="bg-white p-6 rounded-3xl col-span-1 shadow-sm relative overflow-hidden flex flex-col justify-between" style={{ border: `1px solid ${THEME.lightBlue}40` }}>
            <h2 className="text-lg font-bold mb-2" style={{ color: THEME.darkBlue }}>
              Today's Usage
            </h2>
            
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

          {/* Water Quality Parameters Grid */}
          <div className="col-span-1 lg:col-span-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {visibleTiles.ph && (
              <ParameterCard 
                id="ph-card" title="pH Level" value={currentMetrics.ph} unit="pH" icon={Activity} 
                status="good" data={metricsHistory.ph} onClick={() => scrollToChart('chart-ph')}
              />
            )}
            {visibleTiles.tds && (
              <ParameterCard 
                id="tds-card" title="TDS" value={currentMetrics.tds} unit="ppm" icon={Droplet} 
                status="warning" data={metricsHistory.tds} onClick={() => scrollToChart('chart-tds')}
              />
            )}
            {visibleTiles.turbidity && (
              <ParameterCard 
                id="turbidity-card" title="Turbidity" value={currentMetrics.turbidity} unit="NTU" icon={AlertCircle} 
                status="good" data={metricsHistory.turbidity} onClick={() => scrollToChart('chart-turbidity')}
              />
            )}
            {visibleTiles.temperature && (
              <ParameterCard 
                id="temp-card" title="Temperature" value={currentMetrics.temperature} unit="°C" icon={Thermometer} 
                status="good" data={metricsHistory.temperature} onClick={() => scrollToChart('chart-temperature')}
              />
            )}
          </div>
        </div>

        {/* Middle Grid: Main Charts & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Water Usage Chart Section */}
          <div className="bg-white p-6 rounded-3xl col-span-1 lg:col-span-2 shadow-sm" style={{ border: `1px solid ${THEME.lightBlue}40` }}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-lg font-bold" style={{ color: THEME.darkBlue }}>Water Consumption Trend</h2>
                <p className="text-sm font-medium mt-1" style={{ color: THEME.lightBlue }}>Analyze your usage patterns over time</p>
              </div>
              
              {/* Tab Toggle */}
              <div className="p-1 rounded-xl flex text-sm font-medium" style={{ backgroundColor: THEME.bgBlue }}>
                {['daily', 'week', 'month'].map(tf => (
                  <button 
                    key={tf}
                    onClick={() => setUsageTimeframe(tf)}
                    className={`px-4 py-1.5 rounded-lg transition-all capitalize ${usageTimeframe === tf ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
                    style={{ color: usageTimeframe === tf ? THEME.primaryBlue : THEME.darkBlue }}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData[usageTimeframe]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={`${THEME.lightBlue}40`} />
                  <XAxis 
                    dataKey="label" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: THEME.darkBlue, fontSize: 12, fontWeight: 500 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: THEME.lightBlue, fontSize: 12, fontWeight: 500 }} 
                  />
                  <RechartsTooltip content={<CustomTooltip unit="L" />} cursor={{ fill: THEME.bgBlue }} />
                  <Bar 
                    dataKey="value" 
                    radius={[6, 6, 0, 0]}
                    maxBarSize={40}
                  >
                    {usageData[usageTimeframe].map((entry, index) => {
                      const threshold = usageTimeframe === 'daily' ? 12 : 130; 
                      return (
                        <Cell key={`cell-${index}`} fill={entry.value > threshold ? THEME.primaryBlue : THEME.lightBlue} />
                      )
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Alert History Section */}
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
                      {alert.type === 'critical' ? (
                        <AlertTriangle size={16} style={{ color: '#EF4444' }} />
                      ) : alert.type === 'warning' ? (
                        <AlertCircle size={16} style={{ color: THEME.peach }} />
                      ) : (
                        <Info size={16} style={{ color: THEME.primaryBlue }} />
                      )}
                      <span className="font-bold" style={{ color: THEME.darkBlue }}>{alert.parameter} {alert.status}</span>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: THEME.lightBlue }}>{alert.date}</span>
                  </div>
                  
                  <div className="pl-6 text-sm">
                    <p className="font-semibold mb-1" style={{ color: THEME.darkBlue }}>
                      Reading: <span style={{ color: alert.type === 'critical' ? '#EF4444' : THEME.peach }}>
                        {alert.reading}
                      </span>
                    </p>
                    <p className="text-xs font-medium" style={{ color: THEME.lightBlue }}>Threshold: {alert.threshold}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Header for Detailed Metrics */}
        <div className="mb-6 flex items-center gap-3">
          <Activity size={24} style={{ color: THEME.primaryBlue }} />
          <h2 className="text-xl font-bold" style={{ color: THEME.darkBlue }}>Detailed Water Quality Analysis</h2>
        </div>

        {/* Bottom Grid: Detailed Parameter Graphs */}
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
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="px-6 py-4 border-b flex justify-between items-center" style={{ borderColor: `${THEME.lightBlue}40` }}>
              <h2 className="text-xl font-bold" style={{ color: THEME.darkBlue }}>Dashboard Settings</h2>
              <button onClick={() => setIsSettingsOpen(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors" style={{ color: THEME.darkBlue }}>
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
              
              {/* Tile Visibility Settings */}
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

              {/* Building Members Settings */}
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
                
                {/* Add Member Form */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <input 
                    type="text" 
                    placeholder="Member Name" 
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2"
                    style={{ borderColor: `${THEME.lightBlue}40`, backgroundColor: THEME.white, color: THEME.darkBlue }}
                    disabled={members.length >= 50}
                  />
                  <div className="flex gap-3">
                    <input 
                      type="number" 
                      placeholder="Age" 
                      value={newMemberAge}
                      onChange={(e) => setNewMemberAge(e.target.value)}
                      className="w-24 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2"
                      style={{ borderColor: `${THEME.lightBlue}40`, backgroundColor: THEME.white, color: THEME.darkBlue }}
                      disabled={members.length >= 50}
                    />
                    <button 
                      onClick={handleAddMember}
                      disabled={members.length >= 50 || !newMemberName || !newMemberAge}
                      className="px-5 py-2 rounded-xl text-white font-bold flex items-center justify-center gap-1 disabled:opacity-50 transition-opacity"
                      style={{ backgroundColor: THEME.primaryBlue }}
                    >
                      <Plus size={18} /> Add
                    </button>
                  </div>
                </div>

                {members.length >= 50 && (
                  <p className="text-sm text-red-500 font-bold mb-4">Maximum member limit reached.</p>
                )}

                {/* Member List */}
                <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-2">
                  {members.map(member => (
                    <div key={member.id} className="flex justify-between items-center p-3 rounded-xl border transition-colors hover:bg-slate-50" style={{ borderColor: `${THEME.lightBlue}30`, backgroundColor: THEME.white }}>
                      <div>
                        <span className="font-bold block" style={{ color: THEME.darkBlue }}>{member.name}</span>
                        <span className="text-xs font-semibold" style={{ color: THEME.lightBlue }}>Age: {member.age}</span>
                      </div>
                      <button 
                        onClick={() => handleRemoveMember(member.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove Member"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  {members.length === 0 && (
                    <p className="text-center text-sm py-6 font-medium" style={{ color: THEME.lightBlue }}>No members added yet.</p>
                  )}
                </div>
              </section>

            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${THEME.lightBlue}80;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${THEME.primaryBlue};
        }
        html { scroll-behavior: smooth; }
      `}} />
    </div>
  );
}