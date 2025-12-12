/**
 * @fileoverview Parameter handling for Langmuir probe virtual instrument
 * @module lib/langmuir/params
 */

/**
 * Default parameters for Langmuir probe simulation
 */
export const DEFAULT_PARAMS = {
  mode: 'single', // single | double | triple | emissive
  gas: 'Xe',
  Te_eV: 3.0,
  ne_m3: 1e17,
  ne_exp: '1e17', // Scientific notation string for UI
  Vp_V: 15.0,
  Ti_eV: 0.5,
  
  // Emissive probe method
  emissiveMethod: 'floating', // floating | inflection
  
  // Probe geometry (fixed)
  diameter_mm: 0.5,
  length_mm: 3.0,
  
  // Scan parameters
  vmin_V: -40,
  vmax_V: 40,
  nPoints: 200,
  direction: 'forward', // forward | reverse | bidirectional
  
  // Triple probe time scan
  scanDuration_ms: 100,  // Total scan duration for triple probe
  samplingRate_kHz: 10,  // Sampling rate for triple probe
  
  // Realism toggles
  noisePct: 2.5, // Realistic experimental noise level (2-3% typical)
  driftPct: 0.5,
  rfOn: false,
  rfAmpPct: 2.0,
};

/**
 * Gas properties (mass in AMU, first ionization potential in eV)
 */
export const GAS_PROPERTIES = {
  Xe: { mass: 131.3, ionizationPotential: 12.13 },
  Ar: { mass: 39.95, ionizationPotential: 15.76 },
  Kr: { mass: 83.80, ionizationPotential: 14.00 },
  He: { mass: 4.00, ionizationPotential: 24.59 },
};

/**
 * Parse scientific notation string to number
 * @param {string|number} value - Value to parse
 * @returns {number} Parsed number
 */
export function parseScientific(value) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 1e17 : parsed;
  }
  return 1e17;
}

/**
 * Normalize and fill missing parameters with defaults
 * @param {Object} input - User input parameters
 * @returns {Object} Normalized parameters
 */
export function normalizeParams(input = {}) {
  const normalized = {
    ...DEFAULT_PARAMS,
    ...input,
  };
  
  // Parse ne_exp if provided
  if (input.ne_exp !== undefined) {
    normalized.ne_m3 = parseScientific(input.ne_exp);
  }
  
  return normalized;
}

/**
 * Validate parameters
 * @param {Object} p - Parameters to validate
 * @returns {{valid: boolean, errors: string[]}}
 */
export function validateParams(p) {
  const errors = [];
  
  if (!['single', 'double', 'triple', 'emissive'].includes(p.mode)) {
    errors.push('Invalid mode');
  }
  
  if (p.Te_eV <= 0 || p.Te_eV > 100) {
    errors.push('Te must be between 0 and 100 eV');
  }
  
  if (p.ne_m3 <= 0 || p.ne_m3 > 1e20) {
    errors.push('ne must be between 0 and 1e20 m^-3');
  }
  
  if (p.diameter_mm <= 0 || p.length_mm <= 0) {
    errors.push('Probe dimensions must be positive');
  }
  
  if (p.nPoints < 10 || p.nPoints > 1000) {
    errors.push('nPoints must be between 10 and 1000');
  }
  
  if (p.vmin_V >= p.vmax_V) {
    errors.push('vmin must be less than vmax');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Simple hash function for deterministic RNG seeding
 * @param {string} str - String to hash
 * @returns {number} Hash value
 */
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Encode parameters to URL query string (base64url JSON)
 * @param {Object} p - Parameters to encode
 * @returns {string} Encoded query string
 */
export function encodeParamsToQuery(p) {
  const json = JSON.stringify(p);
  const base64 = btoa(json);
  // Make URL-safe
  const base64url = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  return `?params=${base64url}`;
}

/**
 * Decode parameters from URL query string
 * @param {string} search - URL search string (e.g., window.location.search)
 * @returns {Object|null} Decoded parameters or null if invalid
 */
export function decodeParamsFromQuery(search) {
  try {
    const urlParams = new URLSearchParams(search);
    const encoded = urlParams.get('params');
    if (!encoded) return null;
    
    // Restore base64 padding
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    
    const json = atob(base64);
    return JSON.parse(json);
  } catch (e) {
    console.error('Failed to decode params:', e);
    return null;
  }
}

/**
 * Generate deterministic seed from parameters
 * @param {Object} p - Parameters
 * @returns {number} Seed value
 */
export function generateSeed(p) {
  // Create stable string representation (exclude realism params for determinism)
  const stable = JSON.stringify({
    mode: p.mode,
    gas: p.gas,
    Te_eV: p.Te_eV,
    ne_m3: p.ne_m3,
    Vp_V: p.Vp_V,
    Ti_eV: p.Ti_eV,
    diameter_mm: p.diameter_mm,
    length_mm: p.length_mm,
    vmin_V: p.vmin_V,
    vmax_V: p.vmax_V,
    nPoints: p.nPoints,
  });
  return simpleHash(stable);
}
