// src/utils/waterCalculator.js
// 🔧 CHANGE THIS based on your real sensor calibration
const LITERS_PER_ROTATION = 0.5; 

/**
 * Convert motor rotations to liters
 * @param {number} rotations
 * @returns {number} integer liters
 */
export function rotationsToLiters(rotations) {
  if (!rotations || rotations < 0) return 0;

  const liters = rotations * LITERS_PER_ROTATION;

  return Math.floor(liters); // integer value
}

/**
 * Get difference-based consumption (important for live data)
 * @param {number} current
 * @param {number} previous
 */
export function getIncrementalLiters(current, previous) {
  if (current < previous) return 0;

  const diff = current - previous;
  return rotationsToLiters(diff);
}