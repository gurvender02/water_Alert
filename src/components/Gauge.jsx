// src/components/Gauge.jsx
import React from 'react';
import { THEME } from '../constants/theme';

const Gauge = ({ value, max }) => {
  const radius = 70;
  const circumference = Math.PI * radius;
  const percentage = Math.min(value / max, 1);
  const strokeDashoffset = circumference - (percentage * circumference);

  const isOverLimit = value > max;
  const strokeColor = isOverLimit ? THEME.peach : THEME.primaryBlue; 

  return (
    <div className="relative flex flex-col items-center justify-center h-48">
      <svg className="w-full h-full" viewBox="0 0 200 120">
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={THEME.bgBlue} 
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={strokeColor}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center">
        <span className="text-4xl font-bold tracking-tight" style={{ color: THEME.darkBlue }}>{value}</span>
        <span className="text-sm ml-1" style={{ color: THEME.lightBlue }}>L</span>
        <p className="text-xs mt-1 font-medium" style={{ color: THEME.lightBlue }}>Daily Limit: {max} L</p>
      </div>
    </div>
  );
};

export default Gauge;