// // backend/server.js

// const express = require('express');
// const cors = require('cors');
// const { SerialPort } = require('serialport');
// const { ReadlineParser } = require('@serialport/parser-readline');

// const app = express();
// app.use(cors());

// // 🔧 CHANGE THIS to your actual COM port
// const serialPort = new SerialPort({
//   path: 'COM12',   // ⚠️ CHANGE (COM3, COM4, etc.)
//   baudRate: 115200,
// });

// // Ensure full line parsing
// const parser = serialPort.pipe(
//   new ReadlineParser({ delimiter: '\r\n' })
// );

// let latestRotations = 0;

// // 🔥 SERIAL DATA HANDLER
// parser.on('data', (data) => {
//   console.log("RAW:", data);

//   // ✅ Robust regex for your STM32 output
//   const match = data.match(/Clockwise revolutions\s*=\s*(\d+)/);

//   if (match) {
//     latestRotations = parseInt(match[1], 10);
//     console.log("✅ Parsed rotations:", latestRotations);
//   }
// });

// // ❗ Handle errors
// serialPort.on('error', (err) => {
//   console.error("❌ Serial Port Error:", err.message);
// });

// // ✅ API for React
// app.get('/data', (req, res) => {
//   res.json({
//     rotations: latestRotations
//   });
// });


// function hexToFloat(hex) {
//   const buffer = Buffer.from(hex, "hex");
//   return buffer.readFloatBE(0); // BE = Big Endian
// }


// function parseVoltage(packetHex) {
//   try {
//     // find voltage part (example: 41300000)
//     const voltageHex = packetHex.substring(32, 40); 
//     // ⚠️ adjust index if needed

//     const voltage = hexToFloat(voltageHex);

//     console.log("Voltage:", voltage.toFixed(2), "V");

//     return voltage;
//   } catch (err) {
//     console.log("Parse error:", err);
//     return null;
//   }
// }
// // ✅ Start server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

// backend/server.js

const express = require('express');
const cors = require('cors');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();
app.use(cors());

// 🔧 CHANGE THIS to your actual COM port
const serialPort = new SerialPort({
  path: 'COM12',   // ⚠️ CHANGE if needed
  baudRate: 115200,
});

// Ensure full line parsing
const parser = serialPort.pipe(
  new ReadlineParser({ delimiter: '\r\n' })
);

// ================= STATE =================
let latestRotations = 0;
let latestVoltage = 0;   // ✅ NEW

// ================= HELPER FUNCTIONS =================

// Convert HEX → FLOAT
function hexToFloat(hex) {
  const buffer = Buffer.from(hex, "hex");
  return buffer.readFloatBE(0); // try LE if wrong
}

// Extract voltage from packet
function parseVoltage(packetHex) {
  try {
    // ⚠️ Adjust index if needed
    const voltageHex = packetHex.substring(32, 40);

    const voltage = hexToFloat(voltageHex);

    return voltage;
  } catch (err) {
    console.log("❌ Voltage Parse Error:", err);
    return null;
  }
}

// ================= SERIAL DATA HANDLER =================
parser.on('data', (data) => {
  console.log("RAW:", data);

  // ---------- ROTATIONS (UNCHANGED) ----------
  const match = data.match(/Clockwise revolutions\s*=\s*(\d+)/);

  if (match) {
    latestRotations = parseInt(match[1], 10);
    console.log("✅ Parsed rotations:", latestRotations);
  }

  // ---------- VOLTAGE (NEW) ----------
  const hexMatch = data.match(/[A-F0-9]{20,}/);

  if (hexMatch) {
    const packetHex = hexMatch[0];

    const voltage = parseVoltage(packetHex);

    if (voltage !== null && !isNaN(voltage)) {
      latestVoltage = voltage;
      console.log("⚡ Voltage:", voltage.toFixed(2), "V");
    }
  }
});

// ❗ Handle errors
serialPort.on('error', (err) => {
  console.error("❌ Serial Port Error:", err.message);
});

// ================= API =================
app.get('/data', (req, res) => {
  res.json({
    rotations: latestRotations,
    voltage: latestVoltage   // ✅ NEW
  });
});

// ================= START SERVER =================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});