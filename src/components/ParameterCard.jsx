// src/components/ParameterCard.jsx
import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { AlertTriangle, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { THEME } from '../constants/theme';

const ParameterCard = ({ id, title, value, unit, icon: Icon, status, data, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white border p-5 rounded-2xl flex flex-col justify-between shadow-sm transition-all hover:shadow-md cursor-pointer group hover:-translate-y-1" 
      style={{ borderColor: `${THEME.lightBlue}40` }}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 font-semibold" style={{ color: THEME.darkBlue }}>
          <div className="p-2 rounded-lg transition-colors group-hover:bg-blue-100" style={{ backgroundColor: THEME.bgBlue, color: THEME.primaryBlue }}>
            <Icon size={18} />
          </div>
          {title}
        </div>
        <div className="flex items-center gap-1">
          {status === 'warning' && <AlertTriangle size={18} style={{ color: '#F59E0B' }} />}
          {status === 'critical' && <AlertCircle size={18} style={{ color: '#EF4444' }} />}
          {status === 'good' && <CheckCircle2 size={18} style={{ color: THEME.primaryBlue }} />}
          <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: THEME.lightBlue }} />
        </div>
      </div>
      
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-3xl font-bold" style={{ color: THEME.darkBlue }}>{value}</span>
        <span className="text-sm font-medium" style={{ color: THEME.lightBlue }}>{unit}</span>
      </div>
        
      <div className="h-12 w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={status === 'warning' ? THEME.peach : THEME.primaryBlue} 
              strokeWidth={2.5} 
              dot={false} 
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ParameterCard;