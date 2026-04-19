// src/components/CustomTooltip.jsx
import React from 'react';
import { THEME } from '../constants/theme';

const CustomTooltip = ({ active, payload, label, unit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border p-3 rounded-lg shadow-lg" style={{ borderColor: THEME.lightBlue }}>
        <p className="text-sm mb-1 font-medium" style={{ color: THEME.lightBlue }}>{label}</p>
        <p className="font-bold text-lg" style={{ color: THEME.primaryBlue }}>
          {`${payload[0].value} ${unit}`}
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;