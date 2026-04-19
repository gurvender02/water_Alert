// src/components/DetailedQualityChart.jsx
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { THEME } from '../constants/theme';
import { qualityDataConfigs, generateChartData } from '../data/mockData';
import CustomTooltip from './CustomTooltip';

const DetailedQualityChart = ({ id, title, parameterKey, color }) => {
  const [timeframe, setTimeframe] = useState('week');
  const config = qualityDataConfigs[parameterKey];
  
  const [chartData, setChartData] = useState({
    daily: generateChartData('daily', config.base, config.variance),
    week: generateChartData('week', config.base, config.variance),
    month: generateChartData('month', config.base, config.variance)
  });

  return (
    <div id={id} className="bg-white p-6 rounded-3xl shadow-sm" style={{ border: `1px solid ${THEME.lightBlue}40`, scrollMarginTop: '80px' }}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-lg font-bold" style={{ color: THEME.darkBlue }}>{title} Trend</h2>
          <p className="text-sm font-medium mt-1" style={{ color: THEME.lightBlue }}>Detailed {title.toLowerCase()} history</p>
        </div>
        
        {/* Tabs */}
        <div className="p-1 rounded-xl flex text-sm font-medium" style={{ backgroundColor: THEME.bgBlue }}>
          {['daily', 'week', 'month'].map(tf => (
            <button 
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-1.5 rounded-lg transition-all capitalize ${timeframe === tf ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
              style={{ color: timeframe === tf ? THEME.primaryBlue : THEME.darkBlue }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData[timeframe]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={`${THEME.lightBlue}40`} />
            <XAxis 
              dataKey="label" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: THEME.darkBlue, fontSize: 12, fontWeight: 500 }} 
              dy={10}
            />
            <YAxis 
              domain={['auto', 'auto']}
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: THEME.lightBlue, fontSize: 12, fontWeight: 500 }} 
            />
            <RechartsTooltip content={<CustomTooltip unit={config.unit} />} cursor={{ stroke: THEME.lightBlue, strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={3}
              dot={{ r: 4, fill: color, strokeWidth: 2, stroke: THEME.white }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DetailedQualityChart;