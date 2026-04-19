// src/data/mockData.js
export const generateChartData = (timeframe, base, variance, isInteger = false) => {
  const length = timeframe === 'daily' ? 24 : timeframe === 'week' ? 7 : 30;
  
  const labels = timeframe === 'daily' 
    ? Array.from({length: 24}, (_, i) => `${i}:00`)
    : timeframe === 'week' 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : Array.from({length: 30}, (_, i) => `${i + 1}`);

  return labels.map(label => {
    let val = base + (Math.random() * variance * 2 - variance);
    return {
      label,
      value: isInteger ? Math.round(val) : parseFloat(val.toFixed(2))
    };
  });
};

export const usageData = {
  daily: generateChartData('daily', 8, 5, true).map(d => ({ ...d, value: Math.max(0, d.value) })), // Liters per hour
  week: generateChartData('week', 110, 40, true), // Liters per day
  month: generateChartData('month', 110, 40, true),
};

export const qualityDataConfigs = {
  ph: { base: 7.2, variance: 0.5, unit: 'pH' },
  tds: { base: 420, variance: 60, unit: 'ppm' },
  turbidity: { base: 0.8, variance: 0.4, unit: 'NTU' },
  temperature: { base: 22.4, variance: 2.0, unit: '°C' },
};

// Mock history data for the small cards (sparklines)
export const generateSparkline = (base, variance) => Array.from({ length: 14 }, () => ({
  value: base + (Math.random() * variance * 2 - variance)
}));

export const metricsHistory = {
  ph: generateSparkline(7.2, 0.4),
  tds: generateSparkline(420, 50),
  turbidity: generateSparkline(0.8, 0.3),
  temperature: generateSparkline(22.4, 1.5),
};

export const alertHistory = [
  { id: 1, date: 'Today, 14:30', parameter: 'TDS', status: 'High', reading: '950 ppm', threshold: '800 ppm', type: 'warning' },
  { id: 2, date: 'Today, 09:15', parameter: 'pH', status: 'Low', reading: '5.8', threshold: '6.5', type: 'warning' },
  { id: 3, date: 'Yesterday, 18:45', parameter: 'Turbidity', status: 'Elevated', reading: '4.2 NTU', threshold: '1.0 NTU', type: 'warning' },
  { id: 4, date: '14 Apr, 02:00', parameter: 'Usage', status: 'Continuous Flow', reading: '15 L/h', threshold: '0 L/h', type: 'critical' },
  { id: 5, date: '12 Apr, 10:20', parameter: 'Temperature', status: 'High', reading: '28°C', threshold: '25°C', type: 'info' },
];